import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from './supabase';

// Schützt Admin-API-Routen: Nur wer im Admin-Bereich eingeloggt ist, darf sie
// aufrufen. Der Browser schickt dafür das Supabase-Login-Token im Header
// "Authorization: Bearer <token>" mit; hier wird es bei Supabase geprüft.
// Öffentliche Sign-ups sind deaktiviert → jeder gültige Login ist die Gründerin.
// Optional: ADMIN_EMAILS (kommagetrennt) in Vercel setzen, um zusätzlich auf
// bestimmte E-Mail-Adressen einzuschränken.
//
// Rückgabe: null = erlaubt, sonst eine fertige Fehler-Antwort (401/403/500).
export async function requireAdmin(request: NextRequest): Promise<NextResponse | null> {
  if (!isSupabaseConfigured) {
    return NextResponse.json({ error: 'Supabase ist nicht konfiguriert' }, { status: 500 });
  }

  const header = request.headers.get('authorization') || '';
  const token = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  if (!token) {
    return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) {
    return NextResponse.json({ error: 'Anmeldung ungültig oder abgelaufen' }, { status: 401 });
  }

  const allowed = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowed.length > 0 && !allowed.includes((data.user.email || '').toLowerCase())) {
    return NextResponse.json({ error: 'Keine Berechtigung' }, { status: 403 });
  }

  return null;
}
