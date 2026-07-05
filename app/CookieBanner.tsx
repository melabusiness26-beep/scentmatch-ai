'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'auressa-cookie-consent';

/**
 * Kurzer Transparenz-Hinweis (revDSG / DSGVO-freundlich).
 *
 * Auressa nutzt nur technisch notwendige Cookies und eine anonyme, cookielose
 * Reichweiten-Statistik (Vercel Web Analytics) – ohne Speicherung
 * personenbezogener Daten. Da hierfür keine Einwilligung nötig ist, gibt es
 * keine Zustimmungs-Wahl mehr, sondern nur einen kurzen Hinweis, den die
 * Besucherin einmal bestätigt. Die Bestätigung wird lokal gespeichert, damit
 * der Hinweis nicht bei jedem Besuch erneut erscheint.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage blockiert (z. B. privater Modus) – Hinweis zeigen, nichts speichern.
      setVisible(true);
    }
  }, []);

  function acknowledge() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ seen: true, ts: Date.now() }));
    } catch {
      // Speicherfehler ignorieren – der Hinweis schliesst sich für diese Sitzung.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner" role="dialog" aria-modal="false" aria-label="Datenschutz-Hinweis">
      <div className="cookie-inner">
        <p className="cookie-text">
          Auressa nutzt nur technisch notwendige Cookies sowie eine anonyme,
          cookielose Besucherstatistik – ohne Speicherung persönlicher Daten.
          Mehr dazu in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
        <div className="cookie-actions">
          <button type="button" className="button cookie-btn" onClick={acknowledge}>
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
}
