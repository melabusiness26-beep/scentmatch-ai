'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import SiteHeader from '@/app/SiteHeader';
import { PerfumeTile } from '@/app/PerfumeTile';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duft-Vergleich – Perfumes Side-by-Side',
  description: 'Vergleiche bis zu 3 Düfte direkt nebeneinander. Sillage, Haltbarkeit, Noten, Familie – alle Details auf einen Blick.'
};

export default function PerfumeComparePage() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPerfumes, setFilteredPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPerfumes(500);
        setPerfumes(data.filter(p => p.slug));
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load perfumes:', error);
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    if (!q) {
      setFilteredPerfumes(perfumes);
    } else {
      setFilteredPerfumes(
        perfumes.filter(p =>
          (p.perfume_name?.toLowerCase().includes(q)) ||
          (p.brands?.name?.toLowerCase().includes(q))
        )
      );
    }
  }, [searchQuery, perfumes]);

  const selectedPerfumes = perfumes.filter(p => selectedSlugs.includes(p.slug || ''));
  const canAddMore = selectedSlugs.length < 3;

  const toggleSelection = (slug: string) => {
    if (selectedSlugs.includes(slug)) {
      setSelectedSlugs(selectedSlugs.filter(s => s !== slug));
    } else if (canAddMore) {
      setSelectedSlugs([...selectedSlugs, slug]);
    }
  };

  return (
    <main style={{ background: '#FAF7F2' }}>
      <SiteHeader />

      <div className="container" style={{ paddingTop: '40px' }}>
        <nav className="breadcrumb small" aria-label="Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Duft-Vergleich</span>
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
            Duft-Vergleich
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#6B5344',
            lineHeight: 1.6,
            maxWidth: '600px',
            marginBottom: '2rem',
          }}>
            Vergleiche bis zu 3 Düfte direkt nebeneinander. Schau alle Eigenschaften, Noten und Scores im Detail an – so findest du deinen perfekten Duft.
          </p>

          {/* Vergleichstabelle */}
          {selectedPerfumes.length > 0 && (
            <div style={{
              marginBottom: '3rem',
              padding: '2rem',
              background: 'white',
              borderRadius: '16px',
              border: '1px solid rgba(212,175,55,0.1)',
              overflowX: 'auto',
            }}>
              <h2 style={{
                fontSize: '1.3rem',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '1.5rem',
                color: '#1F1410',
              }}>
                Deine Auswahl ({selectedPerfumes.length}/3)
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${selectedPerfumes.length}, 1fr)`,
                gap: '1.5rem',
                minWidth: selectedPerfumes.length > 1 ? '100%' : 'auto',
              }}>
                {selectedPerfumes.map(p => (
                  <div key={p.slug} style={{
                    padding: '1.5rem',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                    borderRadius: '12px',
                    border: '1px solid rgba(212,175,55,0.15)',
                    position: 'relative',
                  }}>
                    <button
                      onClick={() => toggleSelection(p.slug!)}
                      style={{
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: '#D4AF37',
                        color: '#fff',
                        border: 'none',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 700,
                      }}
                    >
                      ✕
                    </button>

                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#1F1410',
                      marginBottom: '0.5rem',
                    }}>
                      {p.perfume_name}
                    </h3>
                    <p style={{
                      fontSize: '0.9rem',
                      color: '#8c7060',
                      marginBottom: '1rem',
                      fontWeight: 500,
                    }}>
                      {p.brands?.name || '–'}
                    </p>

                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.8rem',
                      fontSize: '0.9rem',
                    }}>
                      <div>
                        <span style={{ fontWeight: 600, color: '#D4AF37' }}>Familie:</span>
                        <span style={{ marginLeft: '8px', color: '#5d4b40' }}>
                          {p.fragrance_family || '–'}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#D4AF37' }}>Haltbarkeit:</span>
                        <span style={{ marginLeft: '8px', color: '#5d4b40' }}>
                          {p.longevity ? `${p.longevity}/10` : '–'}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#D4AF37' }}>Sillage:</span>
                        <span style={{ marginLeft: '8px', color: '#5d4b40' }}>
                          {p.sillage ? `${p.sillage}/10` : '–'}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#D4AF37' }}>Preis:</span>
                        <span style={{ marginLeft: '8px', color: '#5d4b40' }}>
                          {p.price_chf ? `ca. CHF ${p.price_chf}` : '–'}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontWeight: 600, color: '#D4AF37' }}>Score:</span>
                        <span style={{ marginLeft: '8px', color: '#5d4b40' }}>
                          {p.scentmatch_score ?? '–'}/100
                        </span>
                      </div>

                      {(p.top_notes || p.heart_notes || p.base_notes) && (
                        <div style={{
                          marginTop: '0.5rem',
                          paddingTop: '0.5rem',
                          borderTop: '1px solid rgba(212,175,55,0.2)',
                        }}>
                          {p.top_notes && (
                            <div style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                              <strong style={{ color: '#D4AF37' }}>Kopf:</strong> {p.top_notes.join(', ')}
                            </div>
                          )}
                          {p.heart_notes && (
                            <div style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                              <strong style={{ color: '#D4AF37' }}>Herz:</strong> {p.heart_notes.join(', ')}
                            </div>
                          )}
                          {p.base_notes && (
                            <div style={{ fontSize: '0.85rem' }}>
                              <strong style={{ color: '#D4AF37' }}>Basis:</strong> {p.base_notes.join(', ')}
                            </div>
                          )}
                        </div>
                      )}

                      <Link
                        href={`/duft/${p.slug}`}
                        style={{
                          marginTop: '0.5rem',
                          display: 'inline-block',
                          color: '#D4AF37',
                          textDecoration: 'none',
                          fontWeight: 600,
                          fontSize: '0.85rem',
                        }}
                      >
                        Zum Profil →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Suchbereich */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontSize: '1.3rem',
            fontFamily: "'Playfair Display', serif",
            marginBottom: '1rem',
            color: '#1F1410',
          }}>
            Düfte hinzufügen {selectedPerfumes.length > 0 && `(${selectedSlugs.length}/3)`}
          </h2>

          <div style={{
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '8px',
          }}>
            <input
              type="text"
              placeholder="Nach Duft oder Marke suchen…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(212,175,55,0.2)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                background: 'white',
              }}
            />
            {canAddMore && searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  padding: '12px 16px',
                  background: '#D4AF37',
                  color: '#1F1410',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Löschen
              </button>
            )}
          </div>

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#8B7355' }}>
              Lädt…
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.2rem',
            }}>
              {filteredPerfumes.slice(0, 30).map(p => (
                <div
                  key={p.slug}
                  onClick={() => toggleSelection(p.slug!)}
                  style={{
                    padding: '1rem',
                    background: selectedSlugs.includes(p.slug!) ? 'rgba(212,175,55,0.15)' : 'white',
                    border: selectedSlugs.includes(p.slug!)
                      ? '2px solid #D4AF37'
                      : '1px solid rgba(212,175,55,0.1)',
                    borderRadius: '10px',
                    cursor: canAddMore || selectedSlugs.includes(p.slug!) ? 'pointer' : 'not-allowed',
                    opacity: canAddMore || selectedSlugs.includes(p.slug!) ? 1 : 0.5,
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#1F1410',
                    marginBottom: '0.3rem',
                  }}>
                    {p.perfume_name}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: '#8c7060',
                  }}>
                    {p.brands?.name || '–'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {selectedPerfumes.length === 0 && !isLoading && (
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            color: '#8B7355',
          }}>
            <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
              Wähle bis zu 3 Düfte aus, um sie zu vergleichen.
            </p>
            <p style={{ fontSize: '0.95rem' }}>
              Schau dir alle Details nebeneinander an und finde deinen perfekten Match.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
