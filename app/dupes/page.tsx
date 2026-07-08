import type { Metadata } from 'next';
import SiteHeader from '@/app/SiteHeader';
import DupeFinder, { type CuratedDupes } from './DupeFinder';
import { getPerfumes } from '@/lib/perfumes';
import { guides } from '@/lib/guides';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Dupe-Finder: die günstige Alternative zu deinem Lieblingsduft',
  description:
    'Gib den teuren Duft ein, den du liebst – von Creed Aventus bis Baccarat Rouge 540 – und finde sofort ähnlich riechende Alternativen, die deutlich weniger kosten. Mit Preisen in CHF.',
  alternates: { canonical: '/dupes' },
  openGraph: {
    title: 'Der Dupe-Finder | Auressa',
    description:
      'Teuren Lieblingsduft eingeben, günstigen Zwilling finden – ähnlich riechende Alternativen mit Preisen in CHF.',
    type: 'website',
    url: `${SITE_URL}/dupes`
  }
};

// Redaktionelle Duft-Paare aus allen Ratgebern einsammeln (teuer -> günstig).
// So zeigt der Finder bei bekannten Originalen zuerst die handverlesenen
// Empfehlungen mit eigenem Wortlaut – die Automatik ergänzt den Rest.
function collectCuratedDupes(): CuratedDupes {
  const curated: CuratedDupes = {};
  for (const guide of guides) {
    for (const section of guide.sections) {
      for (const pairing of section.pairings || []) {
        const list = (curated[pairing.expensive] ||= []);
        if (!list.some((e) => e.cheap === pairing.cheap)) {
          list.push({ cheap: pairing.cheap, note: pairing.note });
        }
      }
    }
  }
  return curated;
}

export default async function DupesPage() {
  const perfumes = await getPerfumes(2000);
  const curated = collectCuratedDupes();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Dupe-Finder', item: `${SITE_URL}/dupes` }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Spar-Werkzeug</p>
            <h1 className="detail-title">Der Dupe-Finder</h1>
            <p className="lead">
              Du liebst einen Duft, aber nicht seinen Preis? Gib ihn ein – wir zeigen
              dir sofort ähnlich riechende Alternativen, die oft hunderte Franken
              weniger kosten. Ehrlich eingeordnet, mit Duftprofil zu jedem Treffer.
            </p>
          </div>
        </section>
        <DupeFinder perfumes={perfumes} curated={curated} />
      </div>
    </main>
  );
}
