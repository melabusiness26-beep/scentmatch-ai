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
  if (score > 70) return 'Sehr passend';
  if (score >= 50) return 'Passend';
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
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '20px',
        marginBottom: '2rem',
        color: '#2a1d12',
        fontWeight: 600,
      }}>
        {results.length} {results.length === 1 ? 'Duft gefunden' : 'Düfte gefunden'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {results.map(({ perfume, score, reasons }) => (
          <div
            key={perfume.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1.25rem',
              borderRadius: '16px',
              border: '0.5px solid #e8dcc8',
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
  );
}
