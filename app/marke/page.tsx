import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';
import { getAllBrands, getPerfumes, type Brand } from '@/lib/perfumes';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Parfum-Marken von A bis Z',
  description:
    'Alle Parfum-Marken bei Auressa: Von Chanel und Dior bis Lattafa und Armaf. Entdecke die Düfte jeder Marke mit Preisen, Noten und Duftprofilen.',
  alternates: { canonical: `${SITE_URL}/marke` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Parfum-Marken | Auressa',
    description: 'Alle Parfum-Marken bei Auressa – vom Luxus-Original bis zum günstigen Dupe.',
    type: 'website',
    url: `${SITE_URL}/marke`,
  },
};

export default async function MarkenIndex() {
  const [brands, allPerfumes] = await Promise.all([
    getAllBrands(),
    getPerfumes(2000),
  ]);

  // Anzahl Düfte je Marke zählen
  const countByBrand: Record<string, number> = {};
  for (const p of allPerfumes) {
    const bSlug = p.brands?.slug;
    if (bSlug) countByBrand[bSlug] = (countByBrand[bSlug] || 0) + 1;
  }

  // Marken mit mindestens 1 Duft filtern
  const brandsWithPerfumes = brands.filter((b) => (countByBrand[b.slug] || 0) > 0);

  // Alphabetisch nach erstem Buchstaben gruppieren
  const grouped: Record<string, Brand[]> = {};
  for (const b of brandsWithPerfumes) {
    const letter = b.name?.[0]?.toUpperCase() ?? '#';
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(b);
  }
  const letters = Object.keys(grouped).sort();

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Parfum-Marken', href: '/marke' }]} />

      {/* Hero */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '240px',
        padding: '2.5rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '620px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Marken
          </p>
          <h1 style={{
            fontSize: 'clamp(26px, 6vw, 42px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Parfum-Marken von A bis Z
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: '0 0 1.5rem 0' }}>
            {brandsWithPerfumes.length} Marken im Katalog. Vom Luxus-Original bis zum günstigen Dupe.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              display: 'inline-block',
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}>Quiz starten</Link>
            <Link href="/duefte" style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Alle Düfte</Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 1.25rem' }}>

        {/* Alphabet-Sprungmarken */}
        <nav aria-label="Alphabet-Navigation" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '2.5rem',
        }}>
          {letters.map((letter) => (
            <a
              key={letter}
              href={`#letter-${letter}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2rem',
                height: '2rem',
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#4a3020',
                textDecoration: 'none',
              }}
            >
              {letter}
            </a>
          ))}
        </nav>

        {/* Marken-Liste nach Buchstaben */}
        {letters.map((letter) => (
          <section key={letter} id={`letter-${letter}`} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.6rem',
              fontWeight: 700,
              color: '#d4af37',
              marginBottom: '1rem',
              paddingBottom: '0.4rem',
              borderBottom: '1px solid rgba(212,175,55,0.2)',
            }}>
              {letter}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}>
              {grouped[letter].map((brand) => {
                const count = countByBrand[brand.slug] || 0;
                return (
                  <Link
                    key={brand.slug}
                    href={`/marke/${brand.slug}`}
                    className="guide-tile"
                    style={{ padding: '1rem 1.25rem' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                      <span style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1rem',
                        fontWeight: 700,
                        color: '#2a1d12',
                        lineHeight: 1.3,
                      }}>
                        {brand.name}
                      </span>
                      <span style={{
                        flexShrink: 0,
                        background: 'rgba(212,175,55,0.12)',
                        color: '#8a6a20',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '10px',
                      }}>
                        {count} {count === 1 ? 'Duft' : 'Düfte'}
                      </span>
                    </div>
                    {brand.country && (
                      <span style={{ fontSize: '0.75rem', color: '#8c7060' }}>{brand.country}</span>
                    )}
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: '#d4af37',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      marginTop: 'auto',
                    }}>
                      Entdecken →
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
          marginTop: '1rem',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Keine Lieblingsmarke?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.75rem' }}>
            Lass dich persönlich beraten
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Unser Duft-Quiz findet deinen perfekten Signature-Duft in wenigen Minuten.
          </p>
          <Link href="/quiz" style={{
            background: '#d4af37',
            color: '#2a1d12',
            fontWeight: 700,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
            display: 'inline-block',
          }}>Quiz starten</Link>
        </section>
      </div>
    </main>
  );
}
