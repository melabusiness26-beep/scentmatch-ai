'use client';

import { useState } from 'react';
import { Perfume } from '@/lib/perfumes';
import { matchPerfumesByDescription } from '@/lib/duft-matcher';
import { PerfumeTile } from '@/app/PerfumeTile';
import Link from 'next/link';

interface DuftFinderProps {
  allPerfumes: Perfume[];
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

    // Simulate brief processing
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
      <div
        className="duft-finder-input-section"
        style={{
          padding: '24px',
          backgroundColor: 'var(--dt-card-bg, rgba(255, 255, 255, 0.08))',
          borderRadius: '12px',
          border: '1px solid var(--dt-border, rgba(212, 175, 55, 0.2))',
          marginBottom: '24px',
        }}
      >
        <label
          htmlFor="duft-description"
          style={{
            display: 'block',
            marginBottom: '12px',
            fontWeight: 600,
            fontSize: '15px',
          }}
        >
          Beschreib einen Duft, den du suchst
        </label>

        <textarea
          id="duft-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="z.B. frisch, etwas holzig, süssliche Basis, habe ich an einer Person gerochen"
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            fontSize: '14px',
            fontFamily: 'inherit',
            backgroundColor: 'var(--dt-bg, #2a1d12)',
            color: 'var(--dt-text, #faf7f2)',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
        />

        <p
          style={{
            fontSize: '12px',
            color: 'var(--dt-text-secondary, #d4cfc3)',
            marginTop: '8px',
            marginBottom: '16px',
          }}
        >
          Nutze einfache Worte: Duftrichtung (frisch, holzig, blumig, süss), Noten (Vanille, Zitrus,
          Sandelholz), oder Gefühle (warm, elegant, frech).
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={handleSearch}
            disabled={!description.trim() || loading}
            className="button"
            style={{
              opacity: !description.trim() || loading ? 0.6 : 1,
              cursor: !description.trim() || loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Suche läuft...' : 'Duft finden'}
          </button>

          {searched && (
            <button
              onClick={handleReset}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid var(--dt-border, rgba(212, 175, 55, 0.2))',
                backgroundColor: 'transparent',
                color: 'var(--dt-text, #faf7f2)',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              Neue Suche
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div>
          {loading ? (
            <p
              style={{
                textAlign: 'center',
                color: 'var(--dt-text-secondary, #d4cfc3)',
                fontSize: '14px',
            }}
            >
              Suche nach passenden Düften...
            </p>
          ) : results.length > 0 ? (
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  marginBottom: '16px',
                  color: 'var(--dt-text, #faf7f2)',
                  fontWeight: 600,
                }}
              >
                Wir haben {results.length} passende {results.length === 1 ? 'Duft' : 'Düfte'} gefunden
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                  gap: '16px',
                }}
              >
                {results.map(({ perfume, matchedNotes }) => (
                  <div key={perfume.id}>
                    <PerfumeTile perfume={perfume} />
                    {matchedNotes.length > 0 && (
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--dt-accent-soft, #e8d5a8)',
                          marginTop: '8px',
                          fontStyle: 'italic',
                        }}
                      >
                        Gemeinsam: {matchedNotes.slice(0, 2).join(', ')}
                        {matchedNotes.length > 2 ? '...' : ''}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                padding: '24px',
                backgroundColor: 'var(--dt-card-bg, rgba(255, 255, 255, 0.08))',
                borderRadius: '12px',
                border: '1px solid var(--dt-border, rgba(212, 175, 55, 0.2))',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  color: 'var(--dt-text-secondary, #d4cfc3)',
                  marginBottom: '12px',
                  fontSize: '14px',
                }}
              >
                Keine passenden Düfte gefunden – versuch eine andere Beschreibung.
              </p>
              <p style={{ fontSize: '12px', color: 'var(--dt-text-secondary, #d4cfc3)' }}>
                Tipp: Probier konkrete Duftnoten wie „Vanille", „Zitrus" oder „Sandelholz".
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
