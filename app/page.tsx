import type { Metadata } from 'next';
import Link from 'next/link';
import HomeClient from './HomeClient';
import GuideTile from './GuideTile';
import { getPerfumes, getPerfumeCount, getBrandCount } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';
import { guides } from '@/lib/guides';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL }
};

// Die 3 aktuellsten / interessantesten Ratgeber für die Startseite
const FEATURED_GUIDE_SLUGS = [
  'parfum-trends-2026',
  'guenstige-alternativen-zu-teuren-dueften',
  'parfum-und-hauttyp-was-passt-zu-meiner-haut',
];

const GUIDE_EMOJIS: Record<string, string> = {
  'parfum-trends-2026': '📈',
  'guenstige-alternativen-zu-teuren-dueften': '💸',
  'parfum-und-hauttyp-was-passt-zu-meiner-haut': '🧴',
};

const HIGHLIGHT_SLUGS = ['baccarat-rouge-540', 'black-opium', 'tobacco-vanille', '1-million'];

export default async function Page() {
  // Server-seitiger Daten-Fetch für SEO & Social Media.
  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];
  let catalogCount = 0;
  let brandCount = 0;
  let highlightPerfumes: Awaited<ReturnType<typeof getPerfumes>> = [];

  try {
    // Höchste Priorität: echte Anzahlen direkt aus der Datenbank.
    const [count, brands] = await Promise.all([getPerfumeCount(), getBrandCount()]);
    catalogCount = count;
    brandCount = brands;

    // Für Highlights brauchen wir die Perfume-Objekte selbst (nicht nur Zählung).
    perfumes = await getPerfumes(2000);

    // Highlights: Zuerst die 4 echten Slugs, dann Fallback zu Top-Scores.
    // (Exclude fantasy perfumes with 'auressa' in the name)
    highlightPerfumes = perfumes
      .filter(p => HIGHLIGHT_SLUGS.includes(p.slug || ''))
      .filter(p => !p.perfume_name?.toLowerCase().includes('auressa'))
      .slice(0, 4);

    // Fallback: Wenn weniger als 4, mit Top-Scores auffüllen.
    if (highlightPerfumes.length < 4) {
      const topPerfumes = perfumes
        .filter(p => !p.perfume_name?.toLowerCase().includes('auressa'))
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 6 - highlightPerfumes.length);
      highlightPerfumes = [...highlightPerfumes, ...topPerfumes];
    }
  } catch (error) {
    console.error('Failed to load perfumes for SSR:', error);
    // Fallback: Leere Highlights, aber das UI bricht nicht.
  }

  const featuredGuides = FEATURED_GUIDE_SLUGS
    .map(slug => guides.find(g => g.slug === slug))
    .filter(Boolean);

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

      {/* Ratgeber-Teaser — Server-rendered, SEO-wirksam */}
      {featuredGuides.length > 0 && (
        <section style={{
          backgroundColor: '#F3EFEA',
          padding: '4rem 1.25rem',
          borderTop: '1.5px solid rgba(212,175,55,0.15)',
          boxShadow: 'inset 0 20px 50px rgba(32,24,16,0.04)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '12px', color: '#D4AF37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.8rem' }}>
                Ratgeber
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(24px, 4.5vw, 36px)',
                fontWeight: 700,
                color: '#1F1410',
                margin: '0 0 0.8rem 0',
                letterSpacing: '-0.01em',
              }}>
                Duft-Wissen, das wirklich hilft
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#6B5344', margin: 0, lineHeight: 1.6 }}>
                Ehrlich, ohne Fachjargon. Für alle, die einfach gut riechen wollen.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2rem',
            }}>
              {featuredGuides.map((guide) => (
                <GuideTile key={guide.slug} guide={guide} emoji={GUIDE_EMOJIS[guide.slug]} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/ratgeber" style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#1F1410',
                fontWeight: 700,
                padding: '0.75rem 1.75rem',
                borderRadius: '10px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                border: '1.5px solid rgba(212,175,55,0.30)',
                letterSpacing: '0.01em',
                transition: 'all 0.2s ease',
              }}>
                Alle {guides.length} Ratgeber ansehen →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
