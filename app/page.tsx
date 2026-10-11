import type { Metadata } from 'next';
import Link from 'next/link';
import HomeClient from './HomeClient';
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
          backgroundColor: '#faf7f2',
          padding: '3.5rem 1.25rem',
          borderTop: '1px solid rgba(212,175,55,0.15)',
        }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '11px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>
                Ratgeber
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(22px, 4vw, 32px)',
                fontWeight: 700,
                color: '#2a1d12',
                margin: '0 0 0.5rem 0',
              }}>
                Duft-Wissen, das wirklich hilft
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                Ehrlich, ohne Fachjargon – für alle, die einfach gut riechen wollen.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}>
              {featuredGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={`/ratgeber/${guide.slug}`}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    background: '#fff',
                    border: '1px solid rgba(212,175,55,0.18)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{GUIDE_EMOJIS[guide.slug] ?? '📖'}</span>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#2a1d12',
                    margin: 0,
                    lineHeight: 1.35,
                  }}>{guide.title}</h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#6b5344',
                    lineHeight: 1.55,
                    margin: '0 0 auto 0',
                  }}>{guide.description}</p>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#d4af37',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    marginTop: '0.5rem',
                  }}>Lesen →</span>
                </Link>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/ratgeber" style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#2a1d12',
                fontWeight: 600,
                padding: '0.65rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.875rem',
                border: '1px solid rgba(42,29,18,0.2)',
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
