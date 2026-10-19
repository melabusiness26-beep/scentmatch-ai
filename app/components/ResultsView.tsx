'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';

interface MatchResult {
  perfume: Perfume;
  score: number;
  reasons: string[];
}

interface ResultsViewProps {
  results: MatchResult[];
}

function getScoreLabel(score: number): string {
  if (score > 30) return 'Sehr passend';
  if (score >= 15) return 'Passend';
  return 'Ähnliche Richtung';
}

function getBrandInitials(brandName: string | null | undefined): string {
  if (!brandName) return 'A';
  return brandName
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ResultsView({ results }: ResultsViewProps) {
  const topMatch = results[0];
  const otherMatches = results.slice(1);

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: 'clamp(24px, 5vw, 32px)',
        marginBottom: '3rem',
        color: '#2a1d12',
        fontWeight: 700,
        fontFamily: "'Playfair Display', serif",
        lineHeight: 1.2,
      }}>
        Dein Duft-Profil
      </h2>

      {/* Top Match - Highlighted */}
      {topMatch && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          borderRadius: '20px',
          border: '3px solid #b08b4f',
          backgroundColor: 'rgba(176, 139, 79, 0.04)',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          <div style={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#b08b4f',
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}>
            ⭐ Top Match
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '64px',
                height: '64px',
                minWidth: '64px',
                borderRadius: '14px',
                backgroundColor: '#b08b4f',
                border: '2px solid #b08b4f',
                fontSize: '24px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.5px',
              }}
            >
              {getBrandInitials(topMatch.perfume.brands?.name)}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                color: '#b08b4f',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
              }}>
                {topMatch.perfume.brands?.name || 'Unbekannt'}
              </div>

              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 28px)',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: '#2a1d12',
                marginBottom: '0.5rem',
                lineHeight: 1.2,
              }}>
                {topMatch.perfume.perfume_name}
              </h3>

              <div style={{
                fontSize: '14px',
                color: '#6b5a4e',
                marginBottom: '1rem',
                display: 'flex',
                gap: '1rem',
                alignItems: 'center',
              }}>
                <span>
                  {topMatch.perfume.fragrance_family && (
                    <>
                      {topMatch.perfume.fragrance_family.charAt(0).toUpperCase() + topMatch.perfume.fragrance_family.slice(1)}
                      {topMatch.perfume.gender && ' • '}
                    </>
                  )}
                  {topMatch.perfume.gender}
                </span>
                {topMatch.perfume.price_chf && (
                  <span style={{ fontWeight: 700, color: '#2a1d12' }}>
                    CHF {topMatch.perfume.price_chf}
                  </span>
                )}
              </div>

              <div
                style={{
                  display: 'inline-block',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: '#b08b4f',
                  padding: '6px 14px',
                  borderRadius: '20px',
                }}
              >
                {getScoreLabel(topMatch.score)}
              </div>
            </div>
          </div>

          <Link
            href={`/duft/${topMatch.perfume.slug}`}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#b08b4f',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4a566';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#b08b4f';
            }}
          >
            Zum Duftprofil →
          </Link>
        </div>
      )}

      {/* Other Matches */}
      {otherMatches.length > 0 && (
        <div>
          <p style={{
            fontSize: '13px',
            fontWeight: 600,
            color: '#6b5a4e',
            marginBottom: '1.5rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            Weitere passende Düfte
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {otherMatches.map(({ perfume, score, reasons }) => (
              <div
                key={perfume.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '1.25rem',
                  borderRadius: '16px',
                  border: '1px solid #e8dcc8',
                  backgroundColor: '#ffffff',
                  gap: '0.75rem',
                }}
          >
            {/* Top Section: Initials + Info */}
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              {/* Brand Initials Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  minWidth: '48px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(176, 139, 79, 0.15)',
                  border: '1px solid rgba(176, 139, 79, 0.3)',
                  fontSize: '15px',
                  fontWeight: 700,
                  color: '#b08b4f',
                  letterSpacing: '0.5px',
                }}
              >
                {getBrandInitials(perfume.brands?.name)}
              </div>

              {/* Info Container */}
              <div style={{ flex: 1, minWidth: 0 }}>
                {/* Brand Name */}
                <div
                  style={{
                    fontSize: '11px',
                    color: '#b08b4f',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    marginBottom: '0.25rem',
                    maxWidth: '100%',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {perfume.brands?.name || 'Unbekannt'}
                </div>

                {/* Perfume Name */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: '#2a1d12',
                    marginBottom: '0.25rem',
                    lineHeight: 1.2,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {perfume.perfume_name}
                </h3>

                {/* Family & Gender & Price */}
                <div
                  style={{
                    fontSize: '12px',
                    color: '#6b5a4e',
                    marginBottom: '0.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span>
                    {perfume.fragrance_family && (
                      <>
                        {perfume.fragrance_family.charAt(0).toUpperCase() + perfume.fragrance_family.slice(1)}
                        {perfume.gender && ' • '}
                      </>
                    )}
                    {perfume.gender}
                  </span>
                  {perfume.price_chf && (
                    <span style={{ fontWeight: 600, color: '#2a1d12', fontSize: '16px' }}>
                      CHF {perfume.price_chf}
                    </span>
                  )}
                </div>

                {/* Score Label with Reasoning */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div
                    style={{
                      display: 'inline-block',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: '#b08b4f',
                      backgroundColor: 'rgba(176, 139, 79, 0.08)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      width: 'fit-content',
                    }}
                  >
                    {getScoreLabel(score)}
                  </div>
                  {reasons.length > 0 && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#6b5a4e',
                        margin: '0',
                        fontStyle: 'italic',
                      }}
                    >
                      Passt weil: {reasons.slice(0, 3).map(r => r.charAt(0).toLowerCase() + r.slice(1)).join(', ')}
                      {reasons.length > 3 ? ', ...' : ''}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href={`/duft/${perfume.slug}`}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: '1px solid #b08b4f',
                  backgroundColor: 'transparent',
                  color: '#b08b4f',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(176, 139, 79, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Duftprofil
              </Link>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(`${perfume.perfume_name} ${perfume.brands?.name || ''} Parfum`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#6b5a4e',
                  fontSize: '13px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'visible',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(107, 90, 78, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Produkt suchen
              </a>
            </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
