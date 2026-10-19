'use client';

import React, { useState, ReactElement } from 'react';

export default function NewsletterSignup(): ReactElement {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('✓ Danke für deine Anmeldung! Überprüfe dein E-Mail-Postfach.');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setMessage(data.error || 'Fehler bei der Anmeldung. Versuche es später erneut.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Etwas ist schief gelaufen. Bitte versuche es später erneut.');
      console.error('Newsletter subscription error:', error);
    }
  };

  return (
    <div className="newsletter-signup">
      <div className="newsletter-inner">
        <div className="newsletter-text">
          <h3>Duft-Tipps & exklusive Angebote</h3>
          <p>Erhalte wöchentliche Duft-Empfehlungen, Tipps & Insider-Informationen direkt in dein Postfach.</p>
        </div>

        <form onSubmit={handleSubmit} className="newsletter-form">
          <div className="form-group">
            <input
              type="email"
              placeholder="Deine E-Mail-Adresse"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading'}
              aria-label="E-Mail für Newsletter"
            />
            <button
              type="submit"
              className="button button-primary"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </div>

          {status === 'success' && (
            <p className="form-message success" role="status">
              {message}
            </p>
          )}
          {status === 'error' && (
            <p className="form-message error" role="alert">
              {message}
            </p>
          )}
        </form>

        <p className="newsletter-disclaimer">
          Wir versenden maximal 1 E-Mail pro Woche. Keine Spam, jederzeit abmeldbar.
        </p>
      </div>
    </div>
  );
}
