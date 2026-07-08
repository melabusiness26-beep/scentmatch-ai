import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { destinationsByCategory, CATEGORY_LABELS, CATEGORY_INTRO } from '@/lib/destinations';

export const metadata: Metadata = {
  title: 'Welcher Duft passt zu deinem Reiseziel?',
  description:
    'Rom, Karibik oder Schweizer Alpen? Finde den Duft, der zu deinem Traumziel passt. Passende Parfüms für Städtereisen, Berge und Strände – wahrheitsgemäß nach echten Duftnoten.',
  alternates: { canonical: '/reiseduefte' },
  openGraph: {
    title: 'Welcher Duft passt zu deinem Reiseziel? | Auressa',
    description:
      'Von Rom bis zur Karibik: Finde den Duft, der zu deinem Traumziel passt. Für Städtereisen, Berge und Strände.',
    url: '/reiseduefte',
    type: 'website'
  }
};

export default function ReisedueftePage() {
  const groups = destinationsByCategory();

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Reise & Duft</p>
          <h1>Welcher Duft passt zu deinem Reiseziel? ✈️</h1>
          <p className="lead">
            Jeder Ort hat seinen eigenen Duft-Charakter – warm wie Rom, frisch wie die Alpen,
            tropisch wie die Karibik. Wähl dein Traumziel und finde die Düfte, die dazu passen.
          </p>
          <p className="small mood-honest">
            Ehrlich ausgewählt: Jede Empfehlung basiert auf den echten Duftnoten aus unserer Datenbank.
          </p>
        </section>

        {groups.map(({ category, items }) => (
          <section className="section" key={category}>
            <p className="eyebrow">{CATEGORY_LABELS[category]}</p>
            <h2>{CATEGORY_INTRO[category]}</h2>
            <div className="grid mood-grid">
              {items.map((d) => (
                <Link
                  key={d.slug}
                  href={`/reiseduefte/${d.slug}`}
                  className="tile-family mood-card"
                  style={{ background: `linear-gradient(160deg, ${d.tone}26, rgba(255,255,255,.55))` }}
                >
                  <span
                    className="mood-icon dest-emoji"
                    style={{ background: `${d.tone}22`, borderColor: `${d.tone}55` }}
                  >
                    {d.emoji}
                  </span>
                  <span className="mood-title">{d.name}</span>
                  <span className="small">{d.tagline}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
