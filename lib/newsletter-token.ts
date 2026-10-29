import { createHmac, timingSafeEqual } from 'crypto';

// Bestätigungs-Link für den Newsletter (Double-Opt-in).
// Der Token ist mit einem geheimen Server-Schlüssel signiert (HMAC-SHA256) und
// 7 Tage gültig. Ohne den Schlüssel kann niemand einen gültigen Link für eine
// fremde E-Mail-Adresse erzeugen.

const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

// Am besten eigenes NEWSLETTER_SECRET in Vercel setzen. Sonst wird ein ohnehin
// vorhandener Server-Schlüssel genutzt – alle drei sind nie im Browser sichtbar.
function secretKey(): string | null {
  return process.env.NEWSLETTER_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.BREVO_API_KEY || null;
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function sign(email: string, issuedAt: string, key: string): string {
  return createHmac('sha256', key).update(`${normalizeEmail(email)}|${issuedAt}`).digest('base64url');
}

// Token im Format „<Zeitpunkt>.<Signatur>". null, wenn kein Schlüssel konfiguriert ist.
export function createConfirmationToken(email: string, now = Date.now()): string | null {
  const key = secretKey();
  if (!key) return null;
  const issuedAt = String(now);
  return `${issuedAt}.${sign(email, issuedAt, key)}`;
}

export function verifyConfirmationToken(email: string, token: string, now = Date.now()): boolean {
  const key = secretKey();
  if (!key) return false;
  const [issuedAt, signature] = token.split('.');
  if (!issuedAt || !signature || !/^\d+$/.test(issuedAt)) return false;
  const age = now - Number(issuedAt);
  if (age < 0 || age > MAX_AGE_MS) return false;
  const expected = Buffer.from(sign(email, issuedAt, key));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
