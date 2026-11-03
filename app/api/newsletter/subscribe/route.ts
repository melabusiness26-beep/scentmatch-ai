import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  createOrUpdateContact,
  generateBrevoAttributes,
  sendTransactionalEmail,
} from '@/lib/brevo';
import { createConfirmationToken, normalizeEmail } from '@/lib/newsletter-token';
import { builtInEmailEnabled, emailButton, emailLayout, escapeHtml, sendHtmlEmail } from '@/lib/email';

// Signierter Bestätigungs-Link (siehe lib/newsletter-token.ts). null ohne Server-Schlüssel.
function generateConfirmationLink(email: string): string | null {
  const token = createConfirmationToken(email);
  if (!token) return null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';
  return `${siteUrl}/api/newsletter/confirm?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, interest, behavior, source = 'footer' } = await request.json();

    if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const cleanEmail = normalizeEmail(email);
    // Name nur als kurzer Text (er landet in der Bestätigungs-E-Mail) – keine Links.
    const rawName = typeof name === 'string' ? name.trim().slice(0, 50) : '';
    const cleanName = rawName && !/(https?:|www\.|\/\/|<|>)/i.test(rawName) ? rawName : null;
    const cleanSource = typeof source === 'string' && /^[a-z0-9-]{1,30}$/.test(source) ? source : 'footer';
    const cleanInterest = interest && ['women', 'men', 'unisex'].includes(interest) ? interest : null;

    // 1. Speichere in Supabase (subscriber tracking)
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({
        email: cleanEmail,
        name: cleanName,
        interest: cleanInterest,
        source: cleanSource,
        consent: true,
        // Interessen nur in vernünftiger Grösse speichern.
        behavior: behavior && JSON.stringify(behavior).length <= 5000 ? JSON.stringify(behavior) : null,
      });

    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // Adresse ist schon eingetragen: keine weitere E-Mail und keine Änderung in Brevo.
    // Sonst könnte jemand eine fremde Adresse mit Bestätigungs-Mails überfluten oder
    // bestätigte Kontakte wieder auf „unbestätigt“ setzen. Gleiche Antwort wie sonst,
    // damit niemand herausfinden kann, wer schon angemeldet ist.
    if (dbError?.code === '23505') {
      return NextResponse.json({ success: true, message: 'Successfully subscribed to newsletter' }, { status: 200 });
    }

    // 2. Generiere Confirmation-Link
    const confirmationLink = generateConfirmationLink(cleanEmail);

    // 3. Bestätigungs-Mail senden: mit eigener Brevo-Vorlage, wenn BREVO_TEMPLATE_CONFIRM
    //    gesetzt ist – sonst die eingebaute Auressa-Mail (braucht nur BREVO_API_KEY und
    //    BREVO_SENDER_EMAIL). So funktioniert der Newsletter auch ohne Vorlage.
    const templateId = Number(process.env.BREVO_TEMPLATE_CONFIRM);
    if (confirmationLink) {
      try {
        let sent = false;
        if (Number.isInteger(templateId) && templateId > 0) {
          const result = await sendTransactionalEmail(cleanEmail, templateId, {
            FIRSTNAME: cleanName || 'Duft-Liebhaber',
            CONFIRMATION_LINK: confirmationLink,
          });
          sent = result.success;
          if (!result.success) console.error('Confirmation email (template) failed:', result.error);
        }
        if (!sent && builtInEmailEnabled()) {
          sent = await sendHtmlEmail(
            cleanEmail,
            'Bitte bestätige deine Anmeldung bei Auressa',
            emailLayout(
              cleanName ? `Hallo ${escapeHtml(cleanName)}!` : 'Fast geschafft!',
              `<p style="margin:0;font-size:15px;line-height:1.6;color:#4A3A2E">Schön, dass du dabei sein möchtest. Mit dem Auressa-Newsletter bekommst du ab und zu neue Düfte, Spar-Tipps und Empfehlungen – nie Spam. Bitte bestätige deine Anmeldung mit einem Klick:</p>
${emailButton(confirmationLink, 'Anmeldung bestätigen')}
<p style="margin:0;font-size:13px;line-height:1.6;color:#7A6A5C">Der Link ist 7 Tage gültig. Warst du das nicht? Dann ignoriere diese E-Mail einfach – ohne Bestätigung schicken wir dir nichts.</p>`
            )
          );
        }
        if (!sent) console.warn('Newsletter: Bestätigungs-Mail nicht verschickt (Brevo nicht eingerichtet?)');
      } catch (emailErr) {
        console.error('Email send error:', emailErr);
      }
    } else {
      console.warn('Newsletter: kein Server-Schlüssel für den Bestätigungs-Link – Mail nicht verschickt');
    }

    // 4. Kontakt in Brevo anlegen (mit Personalisierung) – aber noch NICHT in die
    // Newsletter-Liste: Das passiert erst nach dem Klick auf den Bestätigungs-Link
    // (Double-Opt-in, siehe /api/newsletter/confirm).
    if (process.env.BREVO_API_KEY) {
      // Generiere Brevo-Attribute basierend auf Behavior + Demographics
      const brevoAttributes = generateBrevoAttributes({
        name: cleanName || undefined,
        interest: cleanInterest || undefined,
        source: cleanSource,
        viewedPerfumeIds: behavior?.viewedPerfumeIds?.slice(0, 10),
        viewedFamilies: behavior?.viewedFamilies?.slice(0, 5),
      });

      try {
        const brevoResult = await createOrUpdateContact(cleanEmail, { ...brevoAttributes, CONFIRMED: false });

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
      // Der Bestätigungs-Link geht nur per E-Mail raus – nie in der Antwort,
      // sonst könnte jemand fremde Adressen selbst bestätigen.
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
