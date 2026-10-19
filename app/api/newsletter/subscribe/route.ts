import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_LIST_ID = process.env.BREVO_LIST_ID || '2';

interface BrevoContactBody {
  email: string;
  attributes?: {
    FIRSTNAME?: string;
    LASTNAME?: string;
  };
  listIds?: number[];
  updateEnabled?: boolean;
}

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json(
      { error: 'Gültige E-Mail-Adresse erforderlich' },
      { status: 400 }
    );
  }

  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not configured');
    return NextResponse.json(
      { error: 'Newsletter-Service ist nicht konfiguriert' },
      { status: 500 }
    );
  }

  try {
    const body: BrevoContactBody = {
      email: email.toLowerCase(),
      listIds: [parseInt(BREVO_LIST_ID)],
      updateEnabled: true,
    };

    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.status === 201) {
      return NextResponse.json(
        { success: true, message: 'Erfolgreich angemeldet!' },
        { status: 200 }
      );
    }

    if (response.status === 204) {
      return NextResponse.json(
        { success: true, message: 'Erfolgreich angemeldet!' },
        { status: 200 }
      );
    }

    const responseData = await response.json();
    console.error('Brevo API error:', responseData);

    if (response.status === 400) {
      return NextResponse.json(
        { error: 'Diese E-Mail-Adresse ist bereits angemeldet' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Fehler bei der Anmeldung. Versuche es später erneut.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Versuche es später erneut.' },
      { status: 500 }
    );
  }
}
