'use client';

import { useEffect, useState } from 'react';
import { Analytics } from '@vercel/analytics/react';

const STORAGE_KEY = 'auressa-cookie-consent';

// Lädt die anonyme Besucher-Statistik (Vercel Analytics) NUR, wenn die Besucherin
// im Cookie-Banner ausdrücklich „Alle akzeptieren" gewählt hat. So hält die Seite
// das Versprechen aus dem Banner und der Datenschutzerklärung ein (revDSG / DSGVO).
// Der CookieBanner sendet beim Klick das Ereignis „auressa-consent-changed", damit
// die Statistik direkt nach der Zustimmung startet – ohne Neuladen der Seite.
function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return JSON.parse(raw)?.choice === 'all';
  } catch {
    return false;
  }
}

export default function ConsentedAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const update = () => setAllowed(hasAnalyticsConsent());
    update();
    window.addEventListener('auressa-consent-changed', update);
    return () => window.removeEventListener('auressa-consent-changed', update);
  }, []);

  if (!allowed) return null;
  return <Analytics />;
}
