'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Schlankes Newsletter-Anmeldefeld. Speichert die E-Mail in der Supabase-Tabelle
// `subscribers` (nur Insert für anonyme Besucher). Einwilligung per Checkbox +
// Datenschutz-Link. Kein Tracking, keine Drittanbieter.
export default function NewsletterForm({
  source = 'footer',
  title = 'Duft-Tipps per E-Mail',
  text = 'Neue Düfte, Spar-Tipps und Empfehlungen – ab und zu, nie Spam.'
}: {
  source?: string;
  title?: string;
  text?: string;
}) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const clean = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean)) {
      setError('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    if (!consent) {
      setError('Bitte stimme der Datenschutzerklärung zu.');
      return;
    }
    if (!isSupabaseConfigured) {
      setError('Anmeldung gerade nicht möglich. Bitte versuch es später erneut.');
      return;
    }
    setStatus('loading');
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert({ email: clean, source, consent: true });
    // 23505 = E-Mail bereits eingetragen -> trotzdem als Erfolg behandeln.
    if (dbError && dbError.code !== '23505') {
      setStatus('idle');
      setError('Etwas ging schief. Bitte versuch es später noch einmal.');
      return;
    }
    setStatus('done');
  }

  if (status === 'done') {
    return (
      <div className="newsletter">
        <h3 className="newsletter-title">Danke! 🌸</h3>
        <p className="small">Du bist auf der Liste – wir melden uns mit Duft-Tipps, versprochen ohne Spam.</p>
      </div>
    );
  }

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <h3 className="newsletter-title">{title}</h3>
      <p className="small">{text}</p>
      <div className="newsletter-row">
        <input
          type="email"
          className="search newsletter-input"
          placeholder="deine@email.ch"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
        />
        <button type="submit" className="button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Einen Moment…' : 'Anmelden'}
        </button>
      </div>
      <label className="newsletter-consent small">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Ich möchte den Auressa-Newsletter erhalten und stimme der{' '}
          <Link href="/datenschutz">Datenschutzerklärung</Link> zu. Abmeldung jederzeit möglich.
        </span>
      </label>
      {error && <p className="small newsletter-error">{error}</p>}
    </form>
  );
}
