import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { MOODS } from '@/lib/perfumes';

export const metadata: Metadata = {
  title: 'Duft nach Stimmung finden | Auressa',
  description:
    'Wähl deine Stimmung und finde sofort den passenden Duft – ob gemütlich, frisch, selbstbewusst, romantisch, sinnlich oder sommerlich. Schnell, persönlich und ohne Quiz.',
  alternates: { canonical: '/stimmungen' },
  openGraph: {
    title: 'Duft nach Stimmung finden | Auressa',
    description:
      'Wähl deine Stimmung und finde sofort den passenden Duft – gemütlich, frisch, selbstbewusst, romantisch, sinnlich oder sommerlich.',
    url: '/stimmungen',
    type: 'website'
  }
};

export default function StimmungenPage() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Duft nach Gefühl</p>
          <h1>Wonach ist dir heute?</h1>
          <p className="lead">
            Sag uns einfach, wie du dich gerade fühlst – Auressa zeigt dir Düfte, die dazu passen.
            Kein Quiz, kein Fachwissen nötig.
          </p>
          <p className="small mood-honest">
            Ehrlich gesagt: Ein Duft löst keine Probleme – aber er kann ein schöner kleiner Moment für dich sein.
          </p>

          <div className="grid mood-grid">
            {MOODS.map((m) => (
              <Link
                key={m.code}
                href={`/stimmungen/${m.code}`}
                className="tile-family mood-card"
                style={{ background: `linear-gradient(160deg, ${m.tone}26, rgba(255,255,255,.55))` }}
              >
                <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
                <span className="mood-title">{m.title}</span>
                <span className="small">{m.subtitle}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
