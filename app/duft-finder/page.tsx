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
  let loadError = '';

  try {
    console.log('[DuftFinder Page] Loading perfumes...');
    perfumes = await getPerfumes(2000);
    console.log(`[DuftFinder Page] Successfully loaded ${perfumes.length} perfumes`);

    if (perfumes.length > 0) {
      console.log('[DuftFinder Page] First perfume:', {
        name: perfumes[0].perfume_name,
        family: perfumes[0].fragrance_family,
        gender: perfumes[0].gender,
        topNotes: perfumes[0].top_notes?.slice(0, 2),
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[DuftFinder Page] Failed to load perfumes:', message);
    loadError = `Fehler beim Laden der Düfte: ${message}`;
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
          {loadError && (
            <div style={{ padding: '16px', backgroundColor: '#8B4513', color: '#faf7f2', borderRadius: '8px', marginBottom: '16px' }}>
              <strong>⚠️ {loadError}</strong>
            </div>
          )}
          <DuftFinder allPerfumes={perfumes} perfumeCount={perfumes.length} />
        </section>
      </div>
    </main>
  );
}
