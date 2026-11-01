'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'auressa-cookie-consent';

type Consent = { choice: 'all' | 'necessary'; ts: number };

/**
 * Opt-in cookie consent banner (revDSG / GDPR friendly).
 *
 * No optional/marketing cookies are loaded until the visitor explicitly
 * accepts. The choice is stored in localStorage so the banner does not
 * reappear on every visit. Other components can read `auressa-cookie-consent`
 * later to conditionally enable analytics once it is added.
 */
export default function CookieBanner() {
  // Standardmässig sichtbar (wird mit der Seite ausgeliefert). Wer schon entschieden hat,
  // sieht ihn dank der Klasse „consent-set" (siehe layout.tsx) gar nicht; hier wird er dann
  // auch aus der Seite entfernt.
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) setVisible(false);
    } catch {
      // localStorage gesperrt (z. B. privater Modus) – Hinweis bleibt sichtbar, nichts wird gespeichert.
    }
  }, []);

  function decide(choice: Consent['choice']) {
    try {
      const value: Consent = { choice, ts: Date.now() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch {
      // Ignore storage errors – the dialog still closes for this session.
    }
    // Andere Komponenten (z. B. die anonyme Statistik) über die Wahl informieren,
    // damit sie ohne Neuladen sofort reagieren können.
    try {
      window.dispatchEvent(new Event('auressa-consent-changed'));
    } catch {
      // Ältere Browser ohne Event-Konstruktor – kein Problem, beim nächsten
      // Seitenaufruf wird die Zustimmung ohnehin aus localStorage gelesen.
    }
    setVisible(false);
    try {
      document.documentElement.classList.add('consent-set');
    } catch {
      // ignorieren
    }
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-label="Cookie-Hinweis">
      <div className="cookie-inner">
        <p className="cookie-text">
          Keine Werbe-Cookies. Eine anonyme Besucher-Statistik (ohne Cookies) starten wir nur mit
          deiner Zustimmung. <Link href="/datenschutz">Datenschutz</Link>
        </p>
        <div className="cookie-actions">
          <button type="button" className="cookie-btn" onClick={() => decide('necessary')}>
            Ablehnen
          </button>
          <button type="button" className="cookie-btn" onClick={() => decide('all')}>
            Statistik erlauben
          </button>
        </div>
      </div>
    </div>
  );
}
