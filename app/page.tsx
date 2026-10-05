import type { Metadata } from 'next';
import HomeClient from './HomeClient';
import { getPerfumes, getPerfumeCount } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';

export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

const HIGHLIGHT_SLUGS = ['baccarat-rouge-540', 'black-opium', 'tobacco-vanille', '1-million'];

export default async function Page() {
  // Server-seitiger Daten-Fetch für SEO & Social Media.
  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];
  let catalogCount = 0;
  let brandCount = 0;
  let highlightPerfumes = [];

  try {
    // Höchste Priorität: echte Anzahl aus der Datenbank via getPerfumeCount().
    catalogCount = await getPerfumeCount();

    // Für Highlights brauchen wir die Perfume-Objekte selbst (nicht nur Zählung).
    perfumes = await getPerfumes(2000);

    // Markenanzahl aus den geladenen Düften berechnen.
    brandCount = new Set(perfumes.map((p) => p.brands?.name).filter(Boolean)).size;

    // Highlights: Zuerst die 4 echten Slugs, dann Fallback zu Top-Scores.
    highlightPerfumes = perfumes
      .filter(p => HIGHLIGHT_SLUGS.includes(p.slug || ''))
      .slice(0, 4);

    // Fallback: Wenn weniger als 4, mit Top-Scores auffüllen.
    if (highlightPerfumes.length < 4) {
      const topPerfumes = perfumes
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 6 - highlightPerfumes.length);
      highlightPerfumes = [...highlightPerfumes, ...topPerfumes];
    }
  } catch (error) {
    console.error('Failed to load perfumes for SSR:', error);
    // Fallback: Leere Highlights, aber das UI bricht nicht.
  }

  return (
    <>
      <link rel="preload" as="image" href="/hero-auressa-2.jpg" fetchPriority="high" />

      {/* Server-gerenderte Highlights für SEO */}
      {highlightPerfumes.length > 0 && (
        <div style={{ display: 'none' }} id="ssr-highlights" data-count={catalogCount} data-brands={brandCount}>
          {highlightPerfumes.map(p => (
            <div key={p.id} data-perfume-id={p.id} data-slug={p.slug}>
              {p.perfume_name}
            </div>
          ))}
        </div>
      )}

      <HomeClient initialCatalogCount={catalogCount} initialBrandCount={brandCount} initialHighlights={highlightPerfumes} />
    </>
  );
}
