import type { Metadata } from 'next';
import SiteHeader from '@/app/SiteHeader';
import PerfumeCatalog from './PerfumeCatalog';
import { getPerfumeCount, getPerfumes } from '@/lib/perfumes';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Auf 50 abgerundete „über X"-Zahl – so verspricht der Text nie mehr Düfte als wirklich vorhanden sind.
function approxCount(count: number): number {
  return Math.max(50, Math.floor(count / 50) * 50);
}

export async function generateMetadata(): Promise<Metadata> {
  const approx = approxCount(await getPerfumeCount());
  return {
    title: 'Parfüm-Datenbank: alle Düfte durchsuchen (Schweiz)',
    description:
      `Die grosse Parfüm-Datenbank aus der Schweiz: über ${approx} Düfte von Bestsellern bis zu seltenen Nischenperlen – suchbar nach Name, Marke, Note, Geschlecht und Anlass.`,
    alternates: { canonical: '/duefte' },
    openGraph: {
      title: 'Alle Düfte | Auressa',
      description: `Die kuratierte Duftdatenbank – über ${approx} Düfte, suchbar und filterbar.`,
      type: 'website',
      url: `${SITE_URL}/duefte`
    }
  };
}

export default async function DueftePage() {
  const [approx, perfumes] = await Promise.all([
    getPerfumeCount().then(approxCount),
    getPerfumes(2000)
  ]);
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Die Kollektion</p>
            <h1 className="detail-title">Alle Düfte</h1>
            <p className="lead">
              Über {approx} kuratierte Düfte – von Bestsellern bis zu seltenen Nischenperlen. Suche nach Name,
              Marke, Note (z. B. „Schokolade"), Geschlecht oder Anlass und klicke einen Duft für sein volles Profil.
            </p>
          </div>
        </section>
        <PerfumeCatalog initialPerfumes={perfumes} />
      </div>
    </main>
  );
}
