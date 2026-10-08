import { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import GiftFinder from '@/app/components/GiftFinder';
import SiteHeader from '@/app/SiteHeader';

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: 'Parfum Geschenk finden: der Geschenk-Finder für Weihnachten | Auressa',
  description:
    'Den perfekten Duft als Geschenk finden: Unser Quiz zeigt dir in 4 Fragen die besten Parfüm-Empfehlungen. Für Frauen, Männer und jedes Budget.',
  openGraph: {
    title: 'Parfum Geschenk finden | Auressa',
    description: 'Den perfekten Duft als Geschenk entdecken – schnell, einfach und für jedes Budget.',
    type: 'website',
  },
};

export default async function GiftFinderPage() {
  const perfumes = await getPerfumes(1000); // Load all perfumes (not just 60) for complete Gift Finder results

  return (
    <main>
      <SiteHeader />
      <section className="page-hero gift-finder-hero">
        <div className="hero-content">
          <h1>Parfum-Geschenk finden</h1>
          <p className="hero-subtitle">
            Der richtige Duft für die richtige Person – in 4 Fragen. Unser Geschenk-Finder zeigt dir die
            besten Empfehlungen für Frauen, Männer und jedes Budget.
          </p>
        </div>
      </section>

      <section className="section-content">
        <GiftFinder allPerfumes={perfumes} />
      </section>
    </main>
  );
}
