import { NextRequest, NextResponse } from 'next/server';
import { signupForAlert } from '@/lib/price-alerts';

// Preis-Alarm eintragen: { email, slug, consent: true }. Danach kommt eine Bestätigungs-Mail.
export async function POST(request: NextRequest) {
  try {
    const { email, slug, consent } = await request.json();
    if (consent !== true) return NextResponse.json({ error: 'consent' }, { status: 400 });
    const result = await signupForAlert(email, slug);
    if (result === 'invalid') return NextResponse.json({ error: 'invalid' }, { status: 400 });
    if (result === 'unavailable') return NextResponse.json({ error: 'unavailable' }, { status: 503 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }
}
