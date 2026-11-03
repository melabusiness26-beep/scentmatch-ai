// Preis-Alarm: Besucher tragen ihre E-Mail bei einem Duft ein, bestätigen per Link
// (Double-Opt-in) und bekommen eine E-Mail, wenn der Preis sinkt. Jede E-Mail hat einen
// Abmelde-Link. Alles läuft nur auf dem Server mit dem Server-Schlüssel – die Tabelle
// price_alerts ist für Besucher gesperrt (supabase/68_price_alerts.sql).
import { createHmac, timingSafeEqual } from 'crypto';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { cleanSizes, priceSource, type SizePrice } from './perfume-extras.ts';
import { formatChf } from './price.ts';

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

// Eine Meldung erst ab spürbarer Senkung: mindestens 3 % und CHF 1.
const MIN_DROP_RATIO = 0.03;
const MIN_DROP_CHF = 1;
// Schutz vor Missbrauch: höchstens so viele Bestätigungs-Mails pro Adresse und Stunde.
const MAX_CONFIRMATIONS_PER_HOUR = 3;

export type AlertAction = 'confirm' | 'off';

function secretKey(): string | null {
  return process.env.NEWSLETTER_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.BREVO_API_KEY || null;
}

export function alertToken(id: string, action: AlertAction): string | null {
  const key = secretKey();
  if (!key) return null;
  return createHmac('sha256', key).update(`price-alert|${action}|${id}`).digest('base64url');
}

export function verifyAlertToken(id: string, action: AlertAction, token: string): boolean {
  const expected = alertToken(id, action);
  if (!expected || typeof token !== 'string') return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function alertLink(id: string, action: AlertAction): string | null {
  const token = alertToken(id, action);
  return token ? `${SITE_URL()}/api/preis-alarm/${action === 'confirm' ? 'bestaetigen' : 'abmelden'}?id=${id}&t=${token}` : null;
}

export function serviceDb(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

/** Ist alles für den Versand eingerichtet? Sonst wird das Formular nicht gezeigt. */
export function priceAlertsEnabled(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL && process.env.SUPABASE_SERVICE_ROLE_KEY && secretKey());
}

// ── E-Mail ────────────────────────────────────────────────────────────────

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

function layout(title: string, body: string, unsubscribe: string | null): string {
  return `<!doctype html><html lang="de"><body style="margin:0;background:#FBF8F3;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1F1712">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px 26px;border:1px solid #EFE6D8">
<p style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#1F1712">Auressa</p>
<h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:26px;line-height:1.2;color:#1F1712">${title}</h1>
${body}
<p style="margin:26px 0 0;padding-top:16px;border-top:1px solid #EFE6D8;font-size:12px;line-height:1.5;color:#7A6A5C">
Auressa · Duft-Findung aus der Schweiz · <a href="${SITE_URL()}" style="color:#7A6A5C">auressa.ch</a>${
    unsubscribe ? `<br>Keine Preis-Alarme mehr für diesen Duft? <a href="${unsubscribe}" style="color:#7A6A5C">Hier abmelden</a>.` : ''
  }
</p></div></body></html>`;
}

function button(href: string, label: string): string {
  return `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#1F1712;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:12px">${label}</a></p>`;
}

async function sendMail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !sender) return false;
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { email: sender, name: process.env.BREVO_SENDER_NAME || 'Auressa' },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });
    if (!res.ok) console.error('[preis-alarm] Brevo:', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('[preis-alarm] Versand fehlgeschlagen:', err);
    return false;
  }
}

// ── Eintragen ─────────────────────────────────────────────────────────────

export type SignupResult = 'ok' | 'invalid' | 'unavailable';

export async function signupForAlert(emailRaw: unknown, slugRaw: unknown): Promise<SignupResult> {
  const email = typeof emailRaw === 'string' ? emailRaw.trim().toLowerCase() : '';
  const slug = typeof slugRaw === 'string' ? slugRaw.trim() : '';
  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'invalid';
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return 'invalid';
  const db = serviceDb();
  if (!db || !priceAlertsEnabled()) return 'unavailable';

  const { data: perfume } = await db
    .from('perfumes')
    .select('slug, perfume_name, price_chf, volume_ml, discontinued, brands(name)')
    .eq('slug', slug)
    .maybeSingle();
  if (!perfume || perfume.price_chf == null || perfume.discontinued) return 'invalid';

  // Gibt es den Alarm schon? Dann still „ok“ – niemand soll herausfinden können, wer eingetragen ist,
  // und eine fremde Adresse lässt sich so nicht mit Mails überfluten.
  const { data: existing } = await db
    .from('price_alerts')
    .select('id, confirmed, unsubscribed')
    .eq('email', email)
    .eq('perfume_slug', slug)
    .maybeSingle();
  if (existing && existing.confirmed && !existing.unsubscribed) return 'ok';

  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count } = await db.from('price_alerts').select('id', { count: 'exact', head: true }).eq('email', email).gte('created_at', since);
  if ((count || 0) >= MAX_CONFIRMATIONS_PER_HOUR && !existing) return 'ok';

  let id = existing?.id as string | undefined;
  if (existing) {
    // Wieder anmelden nach Abmeldung: neu bestätigen lassen, Basis-Preis auffrischen.
    await db
      .from('price_alerts')
      .update({ base_price: perfume.price_chf, base_ml: perfume.volume_ml, confirmed: false, unsubscribed: false, notified_price: null })
      .eq('id', existing.id);
  } else {
    const { data: row, error } = await db
      .from('price_alerts')
      .insert({ email, perfume_slug: slug, base_price: perfume.price_chf, base_ml: perfume.volume_ml })
      .select('id')
      .single();
    if (error || !row) {
      console.error('[preis-alarm] Eintragen fehlgeschlagen:', error);
      return 'unavailable';
    }
    id = row.id as string;
  }

  const confirm = alertLink(id as string, 'confirm');
  if (!confirm) return 'unavailable';
  const brand = (perfume.brands as { name?: string } | null)?.name;
  const name = `${perfume.perfume_name}${brand ? ` von ${brand}` : ''}`;
  await sendMail(
    email,
    `Bitte bestätigen: Preis-Alarm für ${perfume.perfume_name}`,
    layout(
      'Fast geschafft!',
      `<p style="margin:0;font-size:15px;line-height:1.6;color:#4A3A2E">Du möchtest eine E-Mail bekommen, wenn <strong>${esc(name)}</strong> günstiger wird (aktuell CHF ${formatChf(perfume.price_chf)}${perfume.volume_ml ? ` für ${perfume.volume_ml} ml` : ''}). Bitte bestätige das mit einem Klick:</p>
${button(confirm, 'Preis-Alarm bestätigen')}
<p style="margin:0;font-size:13px;line-height:1.6;color:#7A6A5C">Warst du das nicht? Dann ignoriere diese E-Mail einfach – ohne Bestätigung schicken wir dir nichts.</p>`,
      null
    )
  );
  return 'ok';
}

export async function confirmAlert(id: string, token: string): Promise<boolean> {
  if (!/^[0-9a-f-]{36}$/i.test(id) || !verifyAlertToken(id, 'confirm', token)) return false;
  const db = serviceDb();
  if (!db) return false;
  const { error } = await db.from('price_alerts').update({ confirmed: true, confirmed_at: new Date().toISOString(), unsubscribed: false }).eq('id', id);
  return !error;
}

export async function unsubscribeAlert(id: string, token: string): Promise<boolean> {
  if (!/^[0-9a-f-]{36}$/i.test(id) || !verifyAlertToken(id, 'off', token)) return false;
  const db = serviceDb();
  if (!db) return false;
  const { error } = await db.from('price_alerts').update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() }).eq('id', id);
  return !error;
}

// ── Preise prüfen und melden ──────────────────────────────────────────────

type AlertRow = { id: string; email: string; perfume_slug: string; base_price: number; base_ml: number | null; notified_price: number | null };
type PerfumeRow = { slug: string; perfume_name: string; price_chf: number | null; volume_ml: number | null; discontinued?: boolean | null; sizes?: unknown; brands?: { name?: string } | null };

// Preis auf die Grösse beim Eintragen umrechnen (falls sich die Hauptgrösse geändert hat).
function comparablePrice(p: PerfumeRow, ml: number | null): number | null {
  const sizes: SizePrice[] = cleanSizes(p.sizes);
  if (ml) {
    const same = sizes.find((s) => s.ml === ml);
    if (same) return same.price_chf;
    if (p.volume_ml === ml && p.price_chf != null) return Number(p.price_chf);
    return null;
  }
  return p.price_chf != null ? Number(p.price_chf) : null;
}

/**
 * Prüft alle bestätigten Alarme (optional nur für bestimmte Düfte) und schickt eine E-Mail,
 * wenn der Preis spürbar unter den Basis- bzw. zuletzt gemeldeten Preis gefallen ist.
 * Gibt die Anzahl verschickter E-Mails zurück.
 */
export async function runPriceAlerts(db: SupabaseClient, onlySlugs?: string[]): Promise<number> {
  if (!priceAlertsEnabled()) return 0;
  let query = db
    .from('price_alerts')
    .select('id, email, perfume_slug, base_price, base_ml, notified_price')
    .eq('confirmed', true)
    .eq('unsubscribed', false);
  if (onlySlugs?.length) query = query.in('perfume_slug', onlySlugs);
  const { data: alerts, error } = await query;
  if (error || !alerts?.length) return 0;

  const slugs = [...new Set((alerts as AlertRow[]).map((a) => a.perfume_slug))];
  const { data: perfumes } = await db
    .from('perfumes')
    .select('slug, perfume_name, price_chf, volume_ml, discontinued, sizes, brands(name)')
    .in('slug', slugs);
  const bySlug = new Map(((perfumes || []) as unknown as PerfumeRow[]).map((p) => [p.slug, p]));

  let sent = 0;
  for (const a of alerts as AlertRow[]) {
    const p = bySlug.get(a.perfume_slug);
    if (!p || p.discontinued) continue;
    const now = comparablePrice(p, a.base_ml);
    const reference = Number(a.notified_price ?? a.base_price);
    if (now == null || !(reference > 0)) continue;
    const drop = reference - now;
    if (drop < MIN_DROP_CHF || drop / reference < MIN_DROP_RATIO) continue;

    const source = priceSource(cleanSizes(p.sizes));
    const page = `${SITE_URL()}/duft/${p.slug}`;
    const off = alertLink(a.id, 'off');
    const brand = p.brands?.name;
    const name = `${p.perfume_name}${brand ? ` von ${brand}` : ''}`;
    const ok = await sendMail(
      a.email,
      `${p.perfume_name} ist jetzt günstiger: CHF ${formatChf(now)}`,
      layout(
        `${esc(p.perfume_name)} ist günstiger geworden`,
        `<p style="margin:0;font-size:15px;line-height:1.6;color:#4A3A2E"><strong>${esc(name)}</strong> kostet jetzt <strong>CHF ${formatChf(now)}</strong>${a.base_ml ? ` für ${a.base_ml} ml` : ''}${source.shop ? ` bei ${esc(source.shop)}` : ''} – vorher CHF ${formatChf(reference)}. Das sind CHF ${formatChf(Math.round(drop * 100) / 100)} weniger.</p>
${button(page, 'Duft ansehen')}
<p style="margin:0;font-size:13px;line-height:1.6;color:#7A6A5C">Preise ändern sich schnell – im Shop kann der Preis inzwischen anders sein.</p>`,
        off
      )
    );
    if (ok) {
      sent++;
      await db.from('price_alerts').update({ notified_price: now, last_notified_at: new Date().toISOString() }).eq('id', a.id);
    }
  }
  return sent;
}
