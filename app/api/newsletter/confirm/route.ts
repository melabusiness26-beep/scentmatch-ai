import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { createOrUpdateContact, sendTransactionalEmail } from '@/lib/brevo';
import { requireAdmin } from '@/lib/admin-auth';
import { normalizeEmail, verifyConfirmationToken } from '@/lib/newsletter-token';

// Bestätigung eines Newsletter-Abos (Double-Opt-in).
// Wird aufgerufen, wenn jemand auf den Link in der Bestätigungs-E-Mail klickt.
// Der Token ist signiert und 7 Tage gültig (lib/newsletter-token.ts).

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

// Die Tabelle subscribers ist für die Öffentlichkeit gesperrt (nur Eintragen erlaubt).
// Lesen/Ändern geht nur mit dem Server-Schlüssel.
function serviceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return serviceKey && supabaseUrl ? createClient(supabaseUrl, serviceKey) : null;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email || !verifyConfirmationToken(email, token)) {
      return NextResponse.redirect(`${SITE_URL}/newsletter-link-ungueltig`);
    }

    const cleanEmail = normalizeEmail(email);
    const today = new Date().toISOString().split('T')[0];

    // Erst jetzt in die Newsletter-Liste aufnehmen.
    const listId = process.env.BREVO_LIST_ID;
    const brevoResult = await createOrUpdateContact(
      cleanEmail,
      { CONFIRMED: true, CONFIRMED_DATE: today },
      listId ? [parseInt(listId, 10)] : undefined
    );
    if (!brevoResult.success) {
      console.error('Brevo update failed:', brevoResult.error);
    }

    // Bestätigung auch in Supabase vermerken.
    const admin = serviceClient();
    if (admin) {
      const { error: dbError } = await admin
        .from('subscribers')
        .update({ confirmed: true, confirmed_at: new Date().toISOString() })
        .eq('email', cleanEmail);
      if (dbError) console.error('Database update error:', dbError);
    } else {
      console.warn('SUPABASE_SERVICE_ROLE_KEY not configured, confirmation not stored in Supabase');
    }

    console.log(`Subscription confirmed for ${cleanEmail}`);
    return NextResponse.redirect(`${SITE_URL}/newsletter-confirmed`);
  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Manuelle Welcome-Email auslösen (für Admin/Testing)
// Nur für eingeloggte Admins – sonst könnte jeder beliebige E-Mails auslösen.
export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin(request);
    if (denied) return denied;

    const { email, templateId } = await request.json();

    if (!email || !templateId) {
      return NextResponse.json(
        { error: 'Missing email or templateId' },
        { status: 400 }
      );
    }

    // Überprüfe, dass Subscriber existiert und bestätigt ist
    const { data: subscriber } = await (serviceClient() ?? supabase)
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (!subscriber) {
      return NextResponse.json({ error: 'Subscriber not found' }, { status: 404 });
    }

    if (!subscriber.confirmed) {
      return NextResponse.json(
        { error: 'Subscription not confirmed yet' },
        { status: 400 }
      );
    }

    // Sende Welcome-Email
    const result = await sendTransactionalEmail(
      email,
      templateId,
      {
        FIRSTNAME: subscriber.name || 'Duft-Liebhaber',
        INTEREST: subscriber.interest || 'Alle',
      },
      {
        EMAIL_TYPE: 'welcome',
        SENT_DATE: new Date().toISOString().split('T')[0],
      }
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Welcome email sent',
      messageId: result.messageId,
    });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
