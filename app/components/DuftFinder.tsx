'use client';

import { useState } from 'react';
import { Perfume } from '@/lib/perfumes';
import { matchPerfumesByDescription } from '@/lib/duft-matcher';
import Link from 'next/link';

interface DuftFinderProps {
  allPerfumes: Perfume[];
}

function getScoreLabel(score: number): string {
  if (score > 85) return 'Sehr passend';
  if (score >= 70) return 'Passend';
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

export default function DuftFinder({ allPerfumes }: DuftFinderProps) {
  const [description, setDescription] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (!description.trim()) return;
    setLoading(true);
    setSearched(true);

    setTimeout(() => {
      const matches = matchPerfumesByDescription(description, allPerfumes);
      setResults(matches);
      setLoading(false);
    }, 300);
  };

  const handleReset = () => {
    setDescription('');
    setResults([]);
    setSearched(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="duft-finder" style={{ maxWidth: '100%' }}>
      {/* Input Section */}
      <div style={{ marginBottom: '3rem' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Duftname oder Beschreibung – z. B. Guess Seductive Noir oder frisch holzig männlich"
          style={{
            width: '100%',
            minHeight: '140px',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid #e8dcc8',
            fontSize: '16px',
            fontFamily: 'inherit',
            backgroundColor: '#ffffff',
            color: '#2a1d12',
            resize: 'vertical',
            boxSizing: 'border-box',
            marginBottom: '1.5rem',
          }}
        />

        <button
          onClick={handleSearch}
          disabled={!description.trim() || loading}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: !description.trim() || loading ? 'rgba(176, 139, 79, 0.6)' : '#b08b4f',
            color: '#1a1410',
            fontSize: '16px',
            fontWeight: 600,
            cursor: !description.trim() || loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => !description.trim() || loading ? null : (e.currentTarget.style.backgroundColor = '#c99a5b')}
          onMouseLeave={(e) => !description.trim() || loading ? null : (e.currentTarget.style.backgroundColor = '#b08b4f')}
        >
          {loading ? 'Suche läuft...' : 'Duft finden'}
        </button>
      </div>

      {/* Results Section */}
      {searched && (
        <div>
          {loading ? (
            <p
              style={{
                textAlign: 'center',
                color: '#6b5a4e',
                fontSize: '16px',
                padding: '2rem',
              }}
            >
              Suche nach passenden Düften...
            </p>
          ) : results.length > 0 ? (
            <div>
              <h2
                style={{
                  fontSize: '20px',
                  marginBottom: '2rem',
                  color: '#2a1d12',
                  fontWeight: 600,
                }}
              >
                {results.length} {results.length === 1 ? 'Duft gefunden' : 'Düfte gefunden'}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {results.map(({ perfume, score, matchedNotes }) => (
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

                        {/* Family & Gender */}
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

                        {/* Score Label */}
                        <div
                          style={{
                            display: 'inline-block',
                            fontSize: '11px',
                            fontWeight: 600,
                            color: '#b08b4f',
                            backgroundColor: 'rgba(176, 139, 79, 0.08)',
                            padding: '4px 10px',
                            borderRadius: '6px',
                          }}
                        >
                          {getScoreLabel(score)}
                        </div>
                      </div>
                    </div>

                    {/* Notes Section */}
                    {matchedNotes.length > 0 && (
                      <p
                        style={{
                          fontSize: '12px',
                          color: '#888888',
                          margin: '0',
                        }}
                      >
                        {matchedNotes.slice(0, 3).map(note => note.charAt(0).toUpperCase() + note.slice(1)).join(', ')}
                        {matchedNotes.length > 3 ? '...' : ''}
                      </p>
                    )}

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

              {/* Reset Button */}
              <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                <button
                  onClick={handleReset}
                  style={{
                    padding: '12px 32px',
                    borderRadius: '8px',
                    border: '1px solid #e8dcc8',
                    backgroundColor: 'transparent',
                    color: '#2a1d12',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor: 'rgba(232, 220, 200, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  Neue Suche
                </button>
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: '2rem',
                backgroundColor: '#f5f3f0',
                borderRadius: '12px',
                border: '0.5px solid #e8dcc8',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: '#6b5a4e',
                  marginBottom: '12px',
                  fontSize: '15px',
                }}
              >
                Keine passenden Düfte gefunden – versuch eine andere Beschreibung.
              </p>
              <p style={{ fontSize: '13px', color: '#6b5a4e' }}>
                Tipp: Probier konkrete Duftnoten wie „Vanille", „Zitrus" oder „Sandelholz".
              </p>
              <button
                onClick={handleReset}
                style={{
                  marginTop: '1rem',
                  padding: '10px 24px',
                  borderRadius: '6px',
                  border: '1px solid #e8dcc8',
                  backgroundColor: 'transparent',
                  color: '#2a1d12',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Neue Suche
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
