'use client';
import type React from 'react';

import { useState } from 'react';
import Link from 'next/link';

// „Preis-Alarm“: E-Mail eintragen → Bestätigungs-Mail → Meldung, wenn der Duft günstiger wird.
export function PriceAlert({ slug, name, price }: { slug: string; name: string; price: string }) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error' | 'invalid'>('idle');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent || state === 'sending') return;
    setState('sending');
    try {
      const res = await fetch('/api/preis-alarm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, slug, consent: true })
      });
      setState(res.ok ? 'done' : res.status === 400 ? 'invalid' : 'error');
    } catch {
      setState('error');
    }
  }

  if (!open) {
    return (
      <button type="button" className="pa-open" onClick={() => setOpen(true)}>
        <span aria-hidden="true">🔔</span> Preis-Alarm: Bescheid sagen, wenn er günstiger wird
      </button>
    );
  }

  if (state === 'done') {
    return (
      <div className="pa-box" role="status">
        <p className="pa-title">📬 Fast geschafft!</p>
        <p className="pa-text">
          Wir haben dir eine E-Mail geschickt. Klick dort auf <strong>„Preis-Alarm bestätigen“</strong> – erst dann ist er aktiv.
          Nichts bekommen? Schau kurz im Spam-Ordner nach.
        </p>
      </div>
    );
  }

  return (
    <form className="pa-box" onSubmit={submit}>
      <p className="pa-title">🔔 Preis-Alarm für {name}</p>
      <p className="pa-text">
        Aktuell {price}. Wir schreiben dir eine E-Mail, sobald der Preis spürbar sinkt – kein Newsletter, nur dieser eine Duft.
      </p>
      <div className="pa-row">
        <input
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="deine@email.ch"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Deine E-Mail-Adresse"
          className="pa-input"
        />
        <button type="submit" className="pa-submit" disabled={!consent || state === 'sending'}>
          {state === 'sending' ? 'Wird gesendet …' : 'Alarm einschalten'}
        </button>
      </div>
      <label className="pa-consent">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
        <span>
          Ja, schickt mir eine E-Mail, wenn dieser Duft günstiger wird. Abmelden geht jederzeit per Link in jeder E-Mail.{' '}
          <Link href="/datenschutz">Datenschutz</Link>
        </span>
      </label>
      {state === 'invalid' && <p className="pa-error">Bitte prüf deine E-Mail-Adresse.</p>}
      {state === 'error' && <p className="pa-error">Das hat gerade nicht geklappt. Versuch es bitte später nochmals.</p>}
    </form>
  );
}
