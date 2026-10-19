'use client';

import type { Perfume } from '@/lib/perfumes';

export function OlfactoryPyramid({ perfume }: { perfume: Perfume }) {
  const hasAnyNotes = (perfume.top_notes?.length ?? 0) > 0 ||
                      (perfume.heart_notes?.length ?? 0) > 0 ||
                      (perfume.base_notes?.length ?? 0) > 0;

  if (!hasAnyNotes) return null;

  return (
    <div style={{
      marginTop: '2rem',
      marginBottom: '2rem',
      padding: '2rem',
      background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
      border: '1px solid rgba(212,175,55,0.1)',
      borderRadius: '16px',
    }}>
      <h4 style={{
        fontSize: '1rem',
        fontWeight: 700,
        fontFamily: "'Playfair Display', serif",
        color: '#1F1410',
        margin: '0 0 1.5rem 0',
        letterSpacing: '-0.01em',
        textAlign: 'center',
      }}>
        Die Duftpyramide
      </h4>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        {/* Kopfnoten */}
        {perfume.top_notes && perfume.top_notes.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '0.3rem',
            }}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #e5c158)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                fontWeight: 700,
                color: '#fff',
              }}>
                1
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#D4AF37',
              }}>
                Kopfnoten (0–15 Min)
              </span>
            </div>
            <div style={{
              padding: '1rem',
              background: 'rgba(212,175,55,0.08)',
              borderRadius: '10px',
              border: '1px solid rgba(212,175,55,0.15)',
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: 1.5,
                color: '#6b5344',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
              }}>
                {perfume.top_notes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(212,175,55,0.12)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 500,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* Herznoten */}
        {perfume.heart_notes && perfume.heart_notes.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '0.3rem',
            }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #e5c158)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '13px',
                fontWeight: 700,
                color: '#fff',
              }}>
                2
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#D4AF37',
              }}>
                Herznoten (15 Min–2 Std)
              </span>
            </div>
            <div style={{
              padding: '1.2rem',
              background: 'rgba(212,175,55,0.12)',
              borderRadius: '10px',
              border: '1.5px solid rgba(212,175,55,0.2)',
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: '#5d4b40',
                fontWeight: 500,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                {perfume.heart_notes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(212,175,55,0.15)',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}

        {/* Basisnoten */}
        {perfume.base_notes && perfume.base_notes.length > 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '0.3rem',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #d4af37, #e5c158)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: 700,
                color: '#fff',
              }}>
                3
              </div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: '#D4AF37',
              }}>
                Basisnoten (2+ Std)
              </span>
            </div>
            <div style={{
              padding: '1.4rem',
              background: 'rgba(212,175,55,0.16)',
              borderRadius: '10px',
              border: '2px solid rgba(212,175,55,0.25)',
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.9rem',
                lineHeight: 1.7,
                color: '#5d4b40',
                fontWeight: 600,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}>
                {perfume.base_notes.map((note, idx) => (
                  <span
                    key={idx}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(212,175,55,0.18)',
                      padding: '7px 14px',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    {note}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>

      <p style={{
        marginTop: '1.2rem',
        fontSize: '0.8rem',
        color: '#8B7355',
        textAlign: 'center',
        fontStyle: 'italic',
        margin: '1.2rem 0 0 0',
      }}>
        Die Duftpyramide zeigt, wie sich der Duft entwickelt: schnelle Kopfnoten,
        mittlere Herznoten und langfristige Basisnoten.
      </p>
    </div>
  );
}
