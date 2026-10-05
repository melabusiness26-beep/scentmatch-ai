import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import DuftFinder from '@/app/components/DuftFinder';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Duft-Finder – Dein Duft nach Beschreibung | Auressa',
  description: 'Beschreib einen Duft in deinen Worten – unser KI-Duft-Finder zeigt dir die besten Parfüm-Matches.',
};

export default async function DuftFinderPage() {
  let perfumes = [];

  try {
    perfumes = await getPerfumes(2000);
  } catch (error) {
    console.error('Failed to load perfumes for Duft-Finder:', error);
  }

  return (
    <main className="page-container">
      <section className="page-hero">
        <div className="hero-content">
          <div className="eyebrow">Duft-Finder</div>
          <h1>Finde deinen Duft nach Beschreibung</h1>
          <p className="hero-subtitle">
            Beschreib den Duft, den du suchst – unsere KI zeigt dir die besten Matches aus über 400 Düften.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <DuftFinder allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
