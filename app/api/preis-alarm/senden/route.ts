import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { runPriceAlerts, serviceDb } from '@/lib/price-alerts';

// Preise prüfen und Preis-Alarme verschicken – nur für eingeloggte Admins
// (wird nach dem Speichern im Admin automatisch aufgerufen).
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const db = serviceDb();
  if (!db) return NextResponse.json({ sent: 0 });
  let slugs: string[] | undefined;
  try {
    const body = await request.json();
    if (Array.isArray(body?.slugs)) slugs = body.slugs.filter((s: unknown) => typeof s === 'string' && /^[a-z0-9-]{1,120}$/.test(s)).slice(0, 50);
  } catch {
    // Ohne Angabe: alle Düfte prüfen.
  }
  const sent = await runPriceAlerts(db, slugs);
  return NextResponse.json({ sent });
}
