'use client';

import Link from 'next/link';
import { useEffect } from 'react';

// Freundliche Fehlerseite, falls beim Anzeigen einer Seite etwas schiefgeht
// (z. B. kurze Störung der Datenbank). Kopfzeile und Footer bleiben sichtbar.
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Auressa] Seitenfehler:', error);
  }, [error]);

  return (
    <main className="container" style={{ padding: '4rem 1.25rem', textAlign: 'center', maxWidth: 640 }}>
      <p className="eyebrow" style={{ justifyContent: 'center' }}>Kurze Störung</p>
      <h1 style={{ fontSize: 'clamp(28px, 6vw, 40px)', margin: '0 0 1rem' }}>Da ist etwas schiefgegangen.</h1>
      <p className="lead" style={{ marginBottom: '2rem' }}>
        Diese Seite konnte gerade nicht geladen werden. Versuche es bitte gleich noch einmal – meistens
        klappt es beim zweiten Versuch.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button type="button" className="button" onClick={() => reset()}>
          Nochmals versuchen
        </button>
        <Link href="/" className="button secondary">
          Zur Startseite
        </Link>
      </div>
    </main>
  );
}
