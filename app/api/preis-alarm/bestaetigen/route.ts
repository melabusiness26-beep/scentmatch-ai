import { NextRequest, NextResponse } from 'next/server';
import { confirmAlert } from '@/lib/price-alerts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

// Klick auf den Link in der Bestätigungs-Mail (Double-Opt-in).
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') || '';
  const token = request.nextUrl.searchParams.get('t') || '';
  const ok = await confirmAlert(id, token);
  return NextResponse.redirect(`${SITE_URL}/preis-alarm?status=${ok ? 'bestaetigt' : 'ungueltig'}`);
}
