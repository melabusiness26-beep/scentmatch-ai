import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { OPERATOR } from '@/lib/operator';

// Server-Route für die Newsletter-Anmeldung.
// 1) Speichert die E-Mail in der Supabase-Tabelle `subscribers`.
// 2) Benachrichtigt die Betreiberin per E-Mail (Resend) über jede neue Anmeldung.
// 3) Schickt der Abonnentin optional ein Willkommens-Mail (nur mit verifizierter
//    Absender-Domain, d. h. wenn RESEND_FROM gesetzt ist).
// Der E-Mail-Versand ist rein optional: Fehlt der Schlüssel oder klappt der
// Versand nicht, wird die Anmeldung trotzdem gespeichert (kein Abbruch).

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string)
  );
}

async function sendEmail(payload: { from: string; to: string; subject: string; html: string; replyTo?: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: payload.from,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
        ...(payload.replyTo ? { reply_to: payload.replyTo } : {})
      })
    });
  } catch {
    // Mailversand ist optional – Fehler dürfen die Anmeldung nicht abbrechen.
  }
}

export async function POST(request: Request) {
  let email = '';
  let source = 'footer';
  try {
    const body = await request.json();
    email = String(body?.email || '').trim().toLowerCase();
    source = String(body?.source || 'footer').slice(0, 40);
  } catch {
    return NextResponse.json({ error: 'invalid' }, { status: 400 });
  }

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'invalid-email' }, { status: 400 });
  }
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'not-configured' }, { status: 503 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { error } = await supabase.from('subscribers').insert({ email, source, consent: true });

  // 23505 = E-Mail bereits eingetragen -> als Erfolg behandeln, aber keine Mail
  // (kein neuer Kontakt, keine doppelte Benachrichtigung).
  const isDuplicate = error?.code === '23505';
  if (error && !isDuplicate) {
    return NextResponse.json({ error: 'db' }, { status: 500 });
  }

  if (!isDuplicate) {
    const from = process.env.RESEND_FROM || 'Auressa <onboarding@resend.dev>';
    const notifyTo = process.env.NEWSLETTER_NOTIFY_TO || OPERATOR.email;
    const safeEmail = escapeHtml(email);
    const safeSource = escapeHtml(source);

    // 1) Benachrichtigung an die Betreiberin (funktioniert bereits mit dem
    //    Resend-Test-Absender, sofern notifyTo die eigene Resend-Konto-Adresse ist).
    await sendEmail({
      from,
      to: notifyTo,
      subject: '🌸 Neue Newsletter-Anmeldung bei Auressa',
      html: `<div style="font-family:Arial,sans-serif;color:#241a12">
        <p>Es gibt eine neue Anmeldung für den Auressa-Newsletter:</p>
        <p><strong>${safeEmail}</strong><br>Quelle: ${safeSource}</p>
      </div>`
    });

    // 2) Willkommens-Mail an die Abonnentin – nur mit verifizierter Domain
    //    (RESEND_FROM gesetzt). Vorher lässt Resend keinen Versand an Fremde zu.
    if (process.env.RESEND_FROM) {
      await sendEmail({
        from,
        to: email,
        replyTo: OPERATOR.email,
        subject: 'Willkommen bei Auressa 🌸',
        html: `<div style="font-family:Georgia,serif;color:#241a12;line-height:1.6">
          <h2 style="color:#43301f">Willkommen bei Auressa</h2>
          <p>Schön, dass du dabei bist! Ab und zu senden wir dir Duft-Tipps,
          Empfehlungen und clevere günstige Alternativen – versprochen ohne Spam.</p>
          <p>Entdecke deinen Signature-Duft: <a href="https://auressa.ch" style="color:#b08b4f">auressa.ch</a></p>
          <p style="color:#6d5a4d;font-size:13px">Du kannst dich jederzeit abmelden – eine kurze Antwort auf diese Mail genügt.</p>
        </div>`
      });
    }
  }

  return NextResponse.json({ ok: true });
}
