import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { guides } from '@/lib/guides';

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

export default function RatgeberIndex() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Magazin</p>
            <h1 className="detail-title">Duft-Ratgeber</h1>
            <p className="lead">
              Praktische Tipps rund um Parfüm: günstige Alternativen zu teuren Düften, die besten
              Sommerdüfte und welcher Duft zu welchem Anlass passt.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="perfume-list">
            {guides.map((guide) => (
              <Link className="tile tile-link" href={`/ratgeber/${guide.slug}`} key={guide.slug}>
                <h3>{guide.title}</h3>
                <p className="small">{guide.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
