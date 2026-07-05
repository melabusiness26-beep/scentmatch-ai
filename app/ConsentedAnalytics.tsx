'use client';

import { Analytics } from '@vercel/analytics/react';

// Anonyme, cookielose Reichweiten-Statistik (Vercel Web Analytics).
// Sie speichert KEINE personenbezogenen Daten und KEINE Cookies auf dem Gerät,
// zählt aber alle Besucher. Da dafür keine Einwilligung nötig ist, läuft sie
// ohne Cookie-Gate – so sind die Besucherzahlen vollständig (statt nur die
// Besucher, die vorher „akzeptiert" haben).
export default function ConsentedAnalytics() {
  return <Analytics />;
}
