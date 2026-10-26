'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Weihnachts-Hinweis: 1. November – 24. Dezember (Zeitzone Europe/Zurich).
// Mit ?banner=test auf Vorschau-Seiten jederzeit sichtbar.
export function GiftBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('banner') === 'test' && process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      setShow(true);
      return;
    }
    const zurich = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));
    const month = zurich.getMonth() + 1;
    setShow(month === 11 || (month === 12 && zurich.getDate() <= 24));
  }, []);

  if (!show) return null;
  return (
    <div className="hm-gift">
      <p>
        <strong>Geschenk gesucht?</strong> Der Geschenk-Finder zeigt dir in 4 Fragen passende Düfte.
      </p>
      <Link href="/geschenk-finder">Zum Geschenk-Finder →</Link>
    </div>
  );
}
