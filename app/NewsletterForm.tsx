'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBehavior, getPreferredInterest } from '@/lib/tracking';

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
  const [name, setName] = useState('');
  const [interest, setInterest] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    // Auf Client-Seite: Lade getrackte Behavior und setze Default Interest
    const preferredInterest = getPreferredInterest();
    if (preferredInterest && !interest) {
      setInterest(preferredInterest);
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const clean = email.trim().toLowerCase();
    const cleanName = name.trim();
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
      const behavior = getBehavior();
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: clean,
          name: cleanName || undefined,
          interest: interest || undefined,
          behavior: {
            viewedPerfumeIds: behavior.viewedPerfumeIds.slice(0, 10),
            viewedCategories: behavior.viewedCategories,
            viewedFamilies: behavior.viewedFamilies.slice(0, 5),
          },
          source
        }),
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
        <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(28px, 5.5vw, 40px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1F1410', lineHeight: 1.2 }}>Danke! 🌸</h2>
        <p style={{ fontSize: 'clamp(15px, 2.3vw, 17px)', lineHeight: 1.7, color: '#6B5344', margin: 0, fontWeight: 500 }}>Du bist auf der Liste. Wir melden uns mit Duft-Tipps, versprochen ohne Spam.</p>
      </div>
    );
  }

  return (
    <form style={{ margin: 0, padding: 0 }} onSubmit={onSubmit}>
      <h2 style={{ margin: '0 0 12px', fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1F1410', lineHeight: 1.2 }}>{title}</h2>
      <p style={{ fontSize: 'clamp(15px, 2.3vw, 17px)', lineHeight: 1.7, color: '#6B5344', margin: '0 0 20px', fontWeight: 500 }}>{text}</p>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '20px', alignItems: 'flex-start' }}>
        <input
          type="text"
          placeholder="Dein Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-label="Name"
          style={{
            flex: '1 1 200px',
            minWidth: 0,
            padding: 'clamp(13px, 2.5vw, 16px) clamp(16px, 3vw, 20px)',
            border: '2px solid #D4AF37',
            borderRadius: '10px',
            background: '#FFFFFF',
            color: '#1F1410',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            fontFamily: 'var(--font-sans), Arial, sans-serif',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />

        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          aria-label="Interessenskategorie"
          style={{
            flex: '1 1 200px',
            minWidth: 0,
            padding: 'clamp(13px, 2.5vw, 16px) clamp(16px, 3vw, 20px)',
            border: '2px solid #D4AF37',
            borderRadius: '10px',
            background: '#FFFFFF',
            color: '#1F1410',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            fontFamily: 'var(--font-sans), Arial, sans-serif',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            cursor: 'pointer',
          }}
        >
          <option value="">Kategorie (optional)</option>
          <option value="women">Frauendüfte</option>
          <option value="men">Männerdüfte</option>
          <option value="unisex">Unisex</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px', alignItems: 'flex-start' }}>
        <input
          type="email"
          placeholder="deine@email.ch"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="E-Mail-Adresse"
          style={{
            flex: '1 1 240px',
            minWidth: 0,
            padding: 'clamp(13px, 2.5vw, 16px) clamp(16px, 3vw, 20px)',
            border: '2px solid #D4AF37',
            borderRadius: '10px',
            background: '#FFFFFF',
            color: '#1F1410',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            fontFamily: 'var(--font-sans), Arial, sans-serif',
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        />
        <button type="submit" disabled={status === 'loading'} style={{
          background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
          color: '#1F1410',
          fontWeight: 700,
          letterSpacing: '.06em',
          padding: 'clamp(13px, 2.5vw, 16px) clamp(28px, 6vw, 40px)',
          borderRadius: '10px',
          flex: '0 1 auto',
          boxShadow: '0 8px 24px rgba(212,175,55,.3)',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
          border: 'none',
          cursor: 'pointer',
          fontSize: 'clamp(14px, 2.4vw, 16px)',
        }}>
          {status === 'loading' ? 'Einen Moment…' : 'Anmelden'}
        </button>
      </div>
      <label style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '16px', cursor: 'pointer', lineHeight: 1.6, fontSize: 'clamp(13px, 2.1vw, 15px)', color: '#6B5344' }}>
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} style={{ marginTop: '4px', flex: 'none', width: '18px', height: '18px', cursor: 'pointer', accentColor: '#D4AF37' }} />
        <span>
          Ich möchte den Auressa-Newsletter erhalten und stimme der{' '}
          <Link href="/datenschutz" style={{ color: '#8A6D1A', textDecoration: 'underline', fontWeight: 600 }}>Datenschutzerklärung</Link> zu. Abmeldung jederzeit möglich.
        </span>
      </label>
      {error && <p style={{ color: '#EF4444', marginTop: '12px', fontSize: 'clamp(13px, 2.1vw, 14px)', fontWeight: 500 }}>{error}</p>}
    </form>
  );
}
