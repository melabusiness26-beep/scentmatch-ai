import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

interface BrevoContact {
  email: string;
  attributes?: Record<string, string | number | boolean>;
  listIds?: number[];
  updateEnabled?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'footer' } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Speichere in Supabase (subscriber tracking) mit Server-Side Client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase configuration missing');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({ email: cleanEmail, source, consent: true });

    if (dbError && dbError.code !== '23505') {
      console.error('Supabase error:', dbError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 2. Sende zu Brevo (optional, falls API-Keys konfiguriert)
    const brevoApiKey = process.env.BREVO_API_KEY;
    const brevoListId = process.env.BREVO_LIST_ID;

    if (brevoApiKey && brevoListId) {
      const contact: BrevoContact = {
        email: cleanEmail,
        attributes: {
          REGISTRATION_SOURCE: source,
          REGISTRATION_DATE: new Date().toISOString().split('T')[0],
        },
        listIds: [parseInt(brevoListId, 10)],
        updateEnabled: true,
      };

      try {
        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': brevoApiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        });

        if (!brevoResponse.ok) {
          const brevoError = await brevoResponse.text();
          console.error('Brevo error:', brevoResponse.status, brevoError);
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
