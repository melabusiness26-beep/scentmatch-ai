import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { guides, guideCategories, getGuide, type Guide } from '@/lib/guides';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Duft-Ratgeber: Tipps, Dupes & Empfehlungen | Auressa',
  description:
    'Praktische Duft-Ratgeber: günstige Alternativen zu teuren Parfüms, die besten Sommerdüfte und welcher Duft zu welchem Anlass passt.',
  alternates: { canonical: '/ratgeber' },
  openGraph: {
    title: 'Duft-Ratgeber | Auressa',
    description: 'Günstige Dupes, Sommerdüfte und Duft-Tipps für jeden Anlass.',
    type: 'website',
    url: `${SITE_URL}/ratgeber`
  }
};

function GuideTiles({ items }: { items: Guide[] }) {
  return (
    <div className="perfume-list">
      {items.map((guide) => (
        <Link className="tile tile-link" href={`/ratgeber/${guide.slug}`} key={guide.slug}>
          <h3>{guide.title}</h3>
          <p className="small">{guide.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default function RatgeberIndex() {
  // Kategorien mit ihren Artikeln auflösen.
  const categorized = guideCategories.map((cat) => ({
    title: cat.title,
    items: cat.slugs
      .map((s) => getGuide(s))
      .filter((g): g is Guide => Boolean(g))
  }));

  // Artikel, die in keiner Kategorie stehen, sammeln (Sicherheitsnetz).
  const inCategory = new Set(guideCategories.flatMap((c) => c.slugs));
  const weitere = guides.filter((g) => !inCategory.has(g.slug));

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="media-hero">
          <div className="media-hero-inner">
            <p className="eyebrow">Magazin</p>
            <h1 className="detail-title">Duft-Ratgeber</h1>
            <p className="lead">
              Praktische Tipps rund um Parfüm: günstige Alternativen zu teuren Düften, die besten
              Sommerdüfte und welcher Duft zu welchem Anlass passt.
            </p>
          </div>
        </section>

        {categorized.map((cat) =>
          cat.items.length > 0 ? (
            <section className="section" key={cat.title}>
              <h2>{cat.title}</h2>
              <GuideTiles items={cat.items} />
            </section>
          ) : null
        )}

        {weitere.length > 0 && (
          <section className="section">
            <h2>Weitere Ratgeber</h2>
            <GuideTiles items={weitere} />
          </section>
        )}
      </div>
    </main>
  );
}
