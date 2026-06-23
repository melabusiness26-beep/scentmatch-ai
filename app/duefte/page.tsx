import type { Metadata } from 'next';
import SiteHeader from '@/app/SiteHeader';
import PerfumeCatalog from './PerfumeCatalog';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Alle Düfte – die Auressa-Duftdatenbank',
  description:
    'Stöbere durch die kuratierte Auressa-Duftdatenbank: über 160 Düfte von Bestsellern bis zu seltenen Nischenperlen – suchbar nach Name, Marke, Note, Geschlecht und Anlass.',
  alternates: { canonical: '/duefte' },
  openGraph: {
    title: 'Alle Düfte | Auressa',
    description: 'Die kuratierte Duftdatenbank – über 160 Düfte, suchbar und filterbar.',
    type: 'website',
    url: `${SITE_URL}/duefte`
  }
};

export default function DueftePage() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Die Kollektion</p>
            <h1 className="detail-title">Alle Düfte</h1>
            <p className="lead">
              Über 160 kuratierte Düfte – von Bestsellern bis zu seltenen Nischenperlen. Suche nach Name,
              Marke, Note (z. B. „Schokolade"), Geschlecht oder Anlass und klicke einen Duft für sein volles Profil.
            </p>
          </div>
        </section>
        <PerfumeCatalog />
      </div>
    </main>
  );
}
