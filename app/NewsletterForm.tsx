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
      <div className="newsletter">
        <h3 className="newsletter-title">Danke! 🌸</h3>
        <p className="small">Du bist auf der Liste. Wir melden uns mit Duft-Tipps, versprochen ohne Spam.</p>
      </div>
    );
  }

  return (
    <form className="newsletter" onSubmit={onSubmit}>
      <h3 className="newsletter-title" style={{ color: '#1F1410', fontSize: 'clamp(24px, 5vw, 36px)' }}>{title}</h3>
      <p className="small" style={{ color: '#6B5344', fontSize: 'clamp(15px, 2.3vw, 17px)', fontWeight: 500 }}>{text}</p>
      <div className="newsletter-row">
        <input
          type="email"
          className="search newsletter-input"
          placeholder="deine@email.ch"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
          style={{
            color: '#1F1410',
            borderColor: '#D4AF37',
            backgroundColor: '#FFFFFF',
          }}
        />
        <button type="submit" className="button" disabled={status === 'loading'}>
          {status === 'loading' ? 'Einen Moment…' : 'Anmelden'}
        </button>
      </div>
      <label className="newsletter-consent small" style={{ color: '#6B5344' }}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
        <span>
          Ich möchte den Auressa-Newsletter erhalten und stimme der{' '}
          <Link href="/datenschutz" style={{ color: '#D4AF37', fontWeight: 600 }}>Datenschutzerklärung</Link> zu. Abmeldung jederzeit möglich.
        </span>
      </label>
      {error && <p className="small newsletter-error" style={{ color: '#EF4444' }}>{error}</p>}
    </form>
  );
}
