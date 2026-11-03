import { NextRequest, NextResponse } from 'next/server';
import { unsubscribeAlert } from '@/lib/price-alerts';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

// Abmelde-Link aus jeder Preis-Alarm-Mail.
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id') || '';
  const token = request.nextUrl.searchParams.get('t') || '';
  const ok = await unsubscribeAlert(id, token);
  return NextResponse.redirect(`${SITE_URL}/preis-alarm?status=${ok ? 'abgemeldet' : 'ungueltig'}`);
}
