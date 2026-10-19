'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import SiteHeader from '@/app/SiteHeader';
import { PerfumeTile } from '@/app/PerfumeTile';
import { useFavorites } from '@/app/FavoritesContext';

export default function WishlistPage() {
  const { favorites } = useFavorites();
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPerfumes(500);
        setPerfumes(data.filter(p => p.slug && favorites.includes(p.slug)));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load perfumes:', error);
        setIsLoading(false);
      }
    })();
  }, [favorites]);

  return (
    <main style={{ background: '#FAF7F2' }}>
      <SiteHeader />

      <div className="container" style={{ paddingTop: '40px' }}>
        <nav className="breadcrumb small" aria-label="Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Meine Wunschliste</span>
        </nav>

        <section style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1F1410',
            letterSpacing: '-0.01em',
          }}>
            Meine Wunschliste
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#6B5344',
            lineHeight: 1.6,
            maxWidth: '600px',
          }}>
            Düfte, die dich interessieren – einfach speichern und später wieder ansehen.
          </p>
        </section>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#8B7355' }}>
            Lädt…
          </div>
        ) : perfumes.length > 0 ? (
          <>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{
                fontSize: '1rem',
                color: '#6B5344',
                fontWeight: 500,
              }}>
                {perfumes.length} Duft{perfumes.length !== 1 ? 'e' : ''} gespeichert
              </p>
            </div>

            <div className="grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}>
              {perfumes.map(perfume => (
                <PerfumeTile key={perfume.id} perfume={perfume} />
              ))}
            </div>
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            background: 'white',
            borderRadius: '16px',
            border: '1px solid rgba(212,175,55,0.1)',
          }}>
            <p style={{
              fontSize: '1.2rem',
              color: '#1F1410',
              marginBottom: '1rem',
              fontWeight: 600,
            }}>
              Deine Wunschliste ist leer
            </p>
            <p style={{
              fontSize: '1rem',
              color: '#8B7355',
              marginBottom: '2rem',
            }}>
              Erkunde unseren Duft-Katalog und speichere deine Lieblings-Düfte.
            </p>
            <Link href="/duefte" style={{
              display: 'inline-block',
              background: '#D4AF37',
              color: '#1F1410',
              padding: '12px 28px',
              borderRadius: '10px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
            }}>
              Zum Katalog →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
