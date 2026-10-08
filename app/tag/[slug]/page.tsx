import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { getPerfumesByTag } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Slug → lesbares Label
function tagLabel(slug: string): string {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Beschreibung je Tag für SEO
function tagDescription(slug: string): string {
  const label = tagLabel(slug);
  return `Entdecke Parfüms mit dem Charakter „${label}" – kuratierte Duftempfehlungen von Auressa, der Schweizer KI-Duftberatung.`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const label = tagLabel(slug);
  return {
    title: `${label} Düfte – Parfüm-Empfehlungen | Auressa`,
    description: tagDescription(slug),
    alternates: { canonical: `/tag/${slug}` },
    openGraph: {
      title: `${label} Düfte | Auressa`,
      description: tagDescription(slug),
      type: 'website',
      url: `${SITE_URL}/tag/${slug}`,
    },
  };
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = tagLabel(slug);
  const perfumes = await getPerfumesByTag(slug);

  return (
    <>
      <SiteHeader />
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem 4rem' }}>

        {/* Breadcrumb */}
        <nav style={{ fontSize: '0.82rem', color: '#9a8a7e', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#b08b4f', textDecoration: 'none' }}>Startseite</Link>
          {' › '}
          <Link href="/duefte" style={{ color: '#b08b4f', textDecoration: 'none' }}>Alle Düfte</Link>
          {' › '}
          <span>{label}</span>
        </nav>

        {/* Hero */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: 'rgba(212,175,55,0.12)',
            border: '1px solid rgba(212,175,55,0.4)',
            color: '#b08b4f',
            padding: '0.25rem 0.85rem',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: '700',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            # {slug}
          </div>
          <h1 style={{
            fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
            fontFamily: "'Playfair Display', serif",
            color: '#2a1d12',
            margin: '0 0 0.5rem',
            lineHeight: 1.2,
          }}>
            {label} Düfte
          </h1>
          <p style={{ fontSize: '1rem', color: '#7a6a5e', maxWidth: '560px', lineHeight: 1.7 }}>
            {tagDescription(slug)}
          </p>
        </div>

        {/* Ergebnisse */}
        {perfumes.length > 0 ? (
          <>
            <p style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '1.25rem' }}>
              {perfumes.length} Düfte gefunden
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '0.85rem',
            }}>
              {perfumes.map((p) => (
                <PerfumeTile key={p.id} perfume={p} />
              ))}
            </div>
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#9a8a7e',
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Keine Düfte für „{label}" gefunden.
            </p>
            <Link href="/duefte" style={{
              display: 'inline-block',
              padding: '0.65rem 1.5rem',
              backgroundColor: '#d4af37',
              color: '#2a1d12',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
            }}>
              Alle Düfte entdecken
            </Link>
          </div>
        )}

        {/* CTA unten */}
        {perfumes.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e8dcc8' }}>
            <p style={{ fontSize: '0.95rem', color: '#7a6a5e', marginBottom: '1rem' }}>
              Den perfekten Duft für dich finden?
            </p>
            <Link href="/#quiz" style={{
              display: 'inline-block',
              padding: '0.75rem 2rem',
              backgroundColor: '#d4af37',
              color: '#2a1d12',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '0.95rem',
            }}>
              ✨ KI-Duftquiz starten
            </Link>
          </div>
        )}

      </main>
    </>
  );
}
