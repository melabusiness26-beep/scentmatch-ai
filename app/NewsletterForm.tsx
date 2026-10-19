'use client';

import { useState } from 'react';
import Link from 'next/link';

// Schlankes Newsletter-Anmeldefeld. Sendet E-Mail an /api/newsletter/subscribe,
// das die Einwilligung speichert. Einwilligung per Checkbox + Datenschutz-Link.
export default function NewsletterForm({
  source = 'footer',
  title = 'Duft-Tipps per E-Mail',
  text = 'Neue Düfte, Spar-Tipps und Empfehlungen. Ab und zu, nie Spam.'
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
    setStatus('loading');
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean, source }),
      });
      if (!response.ok) {
        setStatus('idle');
        setError('Etwas ging schief. Bitte versuch es später noch einmal.');
        return;
      }
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError('Anmeldung gerade nicht möglich. Bitte versuch es später erneut.');
    }
  }

  if (status === 'done') {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(28px, 5.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1F1410', lineHeight: 1.2 }}>Danke! 🌸</h3>
        <p style={{ fontSize: 'clamp(15px, 2.3vw, 17px)', lineHeight: 1.7, color: '#6B5344', margin: 0, fontWeight: 500 }}>Du bist auf der Liste. Wir melden uns mit Duft-Tipps, versprochen ohne Spam.</p>
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
