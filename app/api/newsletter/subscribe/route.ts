import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  createOrUpdateContact,
  generateBrevoAttributes,
  sendTransactionalEmail,
} from '@/lib/brevo';

function generateConfirmationToken(email: string): string {
  return Buffer.from(`${email}:newsletter-confirm`).toString('base64');
}

function generateConfirmationLink(email: string): string {
  const token = generateConfirmationToken(email);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';
  return `${siteUrl}/api/newsletter/confirm?token=${token}&email=${encodeURIComponent(email)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, interest, behavior, source = 'footer' } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name ? name.trim() : null;
    const cleanInterest = interest && ['women', 'men', 'unisex'].includes(interest) ? interest : null;

    // 1. Speichere in Supabase (subscriber tracking)
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({
        email: cleanEmail,
        name: cleanName,
        interest: cleanInterest,
        source,
        consent: true,
        behavior: behavior ? JSON.stringify(behavior) : null,
      });

    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 2. Generiere Confirmation-Link
    const confirmationLink = generateConfirmationLink(cleanEmail);

    // 3. Sende Confirmation-Email über Brevo (wenn API-Key + Template-ID gesetzt)
    const templateId = process.env.BREVO_TEMPLATE_CONFIRM;

    if (templateId) {
      try {
        const result = await sendTransactionalEmail(
          cleanEmail,
          parseInt(templateId, 10),
          {
            FIRSTNAME: cleanName || 'Duft-Liebhaber',
            CONFIRMATION_LINK: confirmationLink,
          }
        );

        if (result.success) {
          console.log(`Confirmation email sent to ${cleanEmail}, messageId: ${result.messageId}`);
        } else {
          console.error('Confirmation email send failed:', result.error);
        }
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    } else {
      console.warn('BREVO_TEMPLATE_CONFIRM not configured, confirmation email not sent');
    }

    // 4. Erstelle/aktualisiere Kontakt in Brevo mit Personalisierung (nur wenn API-Keys konfiguriert sind)
    const brevoListId = process.env.BREVO_LIST_ID;

    if (brevoListId) {
      // Generiere Brevo-Attribute basierend auf Behavior + Demographics
      const brevoAttributes = generateBrevoAttributes({
        name: cleanName || undefined,
        interest: cleanInterest || undefined,
        source,
        viewedPerfumeIds: behavior?.viewedPerfumeIds?.slice(0, 10),
        viewedFamilies: behavior?.viewedFamilies?.slice(0, 5),
      });

      try {
        // Erstelle oder aktualisiere Kontakt in Brevo
        const brevoResult = await createOrUpdateContact(
          cleanEmail,
          brevoAttributes,
          [parseInt(brevoListId, 10)]
        );

        if (brevoResult.success) {
          console.log('Brevo contact created/updated successfully');
        } else {
          console.error('Brevo contact creation failed:', brevoResult.error);
        }
      } catch (brevoErr) {
        console.error('Brevo request error:', brevoErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to newsletter',
        confirmationLink: templateId ? undefined : confirmationLink, // nur für Testing ohne API-Key
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
