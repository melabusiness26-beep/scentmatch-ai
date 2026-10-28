import type { Metadata } from 'next';
import Breadcrumb from '@/app/Breadcrumb';
import PerfumeCatalog from './PerfumeCatalog';
import { catalogCountLabel, getPerfumeCount, getPerfumes } from '@/lib/perfumes';

export const revalidate = 0;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';


export async function generateMetadata(): Promise<Metadata> {
  const approx = catalogCountLabel(await getPerfumeCount());
  return {
    title: 'Parfüm-Datenbank: alle Düfte durchsuchen (Schweiz)',
    description:
      `Die Parfüm-Datenbank aus der Schweiz: ${approx ? `${approx} Düfte` : 'geprüfte Düfte'} von Bestsellern bis zu seltenen Nischenperlen – suchbar nach Name, Marke, Note, Geschlecht und Anlass.`,
    alternates: { canonical: '/duefte' },
    openGraph: {
      title: 'Alle Düfte | Auressa',
      description: `Die kuratierte Duftdatenbank – ${approx ? `${approx} Düfte, ` : ''}suchbar und filterbar.`,
      type: 'website',
      url: `${SITE_URL}/duefte`
    }
  };
}

export default async function DueftePage() {
  const [approx, perfumes] = await Promise.all([
    getPerfumeCount().then(catalogCountLabel),
    getPerfumes(2000)
  ]);

  // Strukturierte Daten: Brotkrümel + eine ItemList der ersten Düfte,
  // damit Google die Katalogseite als Duftliste versteht (Rich Results).
  const listed = perfumes.filter((p) => p.slug).slice(0, 24);
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Düfte', item: `${SITE_URL}/duefte` }
    ]
  };
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: listed.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.perfume_name,
      url: `${SITE_URL}/duft/${p.slug}`
    }))
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <Breadcrumb items={[{ label: 'Düfte', href: '/duefte' }]} />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Die Kollektion</p>
            <h1 className="detail-title">Alle Düfte</h1>
            <p className="lead">
              {approx ? `${approx.replace('über', 'Über')} kuratierte Düfte – von Bestsellern bis zu seltenen Nischenperlen.` : 'Sorgfältig geprüfte Düfte – unser Katalog wächst laufend.'} Suche nach Name,
              Marke, Note (z. B. „Schokolade"), Geschlecht oder Anlass und klicke einen Duft für sein volles Profil.
            </p>
          </div>
        </section>
        <PerfumeCatalog initialPerfumes={perfumes} />
      </div>
    </main>
  );
}
