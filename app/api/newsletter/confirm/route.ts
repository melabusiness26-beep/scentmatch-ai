import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { updateContactAttributes, sendTransactionalEmail } from '@/lib/brevo';

// Bestätigung eines Newsletter-Abos
// Wird aufgerufen, wenn der User auf den Confirmation-Link klickt
// Token-Format: base64(email:timestamp)

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token || !email) {
      return NextResponse.json(
        { error: 'Missing token or email' },
        { status: 400 }
      );
    }

    // Email-Adresse dekodieren
    const decodedEmail = decodeURIComponent(email);

    // Überprüfe, dass der Token gültig ist (vereinfacht - in Produktion sollte das sicherer sein)
    const expectedToken = Buffer.from(`${decodedEmail}:newsletter-confirm`).toString('base64');

    if (token !== expectedToken) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 401 }
      );
    }

    // Aktualisiere Subscriber in Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .update({ confirmed: true, confirmed_at: new Date().toISOString() })
      .eq('email', decodedEmail);

    if (dbError) {
      console.error('Database update error:', dbError);
      return NextResponse.json(
        { error: 'Failed to confirm subscription' },
        { status: 500 }
      );
    }

    // Aktualisiere Kontakt in Brevo mit confirmed-Flag
    const brevoResult = await updateContactAttributes(decodedEmail, {
      CONFIRMED: true,
      CONFIRMED_DATE: new Date().toISOString().split('T')[0],
    });

    if (!brevoResult.success) {
      console.error('Brevo update failed:', brevoResult.error);
      // Nicht kritisch - DB wurde schon aktualisiert
    }

    // Sende Welcome-Email (Template-ID 2 - wird in Brevo konfiguriert)
    // Diese würde normalerweise von Brevo Automation getriggert werden
    // Aber wir können auch hier manuell senden für Testing

    console.log(`Subscription confirmed for ${decodedEmail}`);

    // Leite zu Danke-Seite weiter
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch'}/newsletter-confirmed`
    );
  } catch (error) {
    console.error('Confirmation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST: Manuelle Welcome-Email auslösen (für Admin/Testing)
export async function POST(request: NextRequest) {
  try {
    const { email, templateId } = await request.json();

    if (!email || !templateId) {
      return NextResponse.json(
        { error: 'Missing email or templateId' },
        { status: 400 }
      );
    }

    // Überprüfe, dass Subscriber existiert und bestätigt ist
    const { data: subscriber } = await supabase
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
