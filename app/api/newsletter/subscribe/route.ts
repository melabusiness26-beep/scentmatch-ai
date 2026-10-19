import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import {
  createOrUpdateContact,
  generateBrevoAttributes,
  updateContactAttributes,
} from '@/lib/brevo';


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

    // 2. Sende zu Brevo mit Personalisierung (nur wenn API-Keys konfiguriert sind)
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
      { success: true, message: 'Successfully subscribed to newsletter' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
