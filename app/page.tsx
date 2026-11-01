import type { Metadata } from 'next';
import Link from 'next/link';
import HomeClient from './HomeClient';
import HeroHome from './HeroHome';
import ThreeWaysSection from './ThreeWaysSection';
import GuideTile from './GuideTile';
import { FeaturedPerfumes } from '@/app/FeaturedPerfumes';
import { getPerfumes, getPerfumeCount, getBrandCount } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';
import { guides } from '@/lib/guides';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL }
};

// Alle 10 Minuten neu erzeugen statt bei jedem Aufruf – die Startseite lädt so
// deutlich schneller; neue Düfte erscheinen trotzdem rasch.
export const revalidate = 600;

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

const HIGHLIGHT_SLUGS: string[] = []; // Empty - database reset, no highlights

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

  // Featured highlights: Empty for now - database reset
  const allFeatured: any[] = [];

  return (
    <>
      {/* Neuer Hero + 3-Wege-Grid */}
      <HeroHome />
      <ThreeWaysSection catalogCount={catalogCount} />

      <HomeClient initialCatalogCount={catalogCount} initialBrandCount={brandCount} initialHighlights={[]} />

      {/* Ratgeber-Teaser — Premium Section mit Top Content */}
      {featuredGuides.length > 0 && (
        <section style={{
          background: 'linear-gradient(180deg, #F3EFEA 0%, #FBF7F2 100%)',
          padding: 'clamp(3rem, 8vw, 5.5rem) 1.25rem',
          borderTop: '2px solid rgba(212,175,55,0.2)',
          boxShadow: 'inset 0 40px 80px rgba(32,24,16,0.04), inset 0 -40px 80px rgba(32,24,16,0.02)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle Background Element */}
          <div style={{
            position: 'absolute',
            top: '-20%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(212,175,55,0.08), transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />

          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 5vw, 3rem)' }}>
              <p style={{
                fontSize: 'clamp(11px, 2vw, 13px)',
                color: '#D4AF37',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                marginBottom: '1rem',
                margin: '0 0 1rem 0'
              }}>
                ✨ Duft-Expertise ✨
              </p>
              <h2 style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: 'clamp(32px, 5vw, 44px)',
                fontWeight: 700,
                color: '#1F1410',
                margin: '0 0 1.2rem 0',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
              }}>
                Wissen, das deinen Duft verändert
              </h2>
              <p style={{
                fontSize: 'clamp(15px, 2.5vw, 17px)',
                color: '#6B5344',
                margin: 0,
                lineHeight: 1.7,
                maxWidth: '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                Von Noten-Pairing bis günstige Dupes: Alles was du brauchst, um deinen Signature-Duft zu finden und zu lieben.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2rem)',
              marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            }}>
              {featuredGuides.map((guide) => (
                <GuideTile key={guide.slug} guide={guide} emoji={GUIDE_EMOJIS[guide.slug]} />
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Link href="/ratgeber" style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
                color: '#1F1410',
                fontWeight: 700,
                padding: 'clamp(12px, 2.5vw, 15px) clamp(24px, 5vw, 32px)',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: 'clamp(14px, 2.2vw, 16px)',
                letterSpacing: '0.05em',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
                border: 'none',
                cursor: 'pointer',
              }}>
                Alle {guides.length} Premium-Ratgeber →
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
