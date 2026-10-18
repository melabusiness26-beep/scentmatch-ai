'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import { storage, SavedPerfume } from '@/lib/duft-detektiv-storage';

interface SavedPerfumesProps {
  allPerfumes: Perfume[];
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

export default function SavedPerfumes({ allPerfumes }: SavedPerfumesProps) {
  const [savedList, setSavedList] = useState<SavedPerfume[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = storage.getSavedPerfumes();
    setSavedList(saved);
    setLoaded(true);
  }, []);

  const perfumesMap = new Map(allPerfumes.map(p => [p.id, p]));
  const savedPerfumes = savedList
    .map(s => perfumesMap.get(s.perfumeId))
    .filter((p) => p !== undefined) as Perfume[];

  const handleRemove = (perfumeId: string) => {
    storage.removePerfume(perfumeId);
    setSavedList(prev => prev.filter(p => p.perfumeId !== perfumeId));
  };

  if (!loaded) {
    return (
      <p style={{ textAlign: 'center', color: '#6b5a4e' }}>
        Lädt...
      </p>
    );
  }

  if (savedPerfumes.length === 0) {
    return (
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
            marginBottom: '1rem',
            fontSize: '15px',
          }}
        >
          Du hast noch keine Düfte gesammelt.
        </p>
        <Link
          href="/duft-detektiv"
          style={{
            display: 'inline-block',
            padding: '10px 24px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#b08b4f',
            color: '#1a1410',
            fontSize: '14px',
            fontWeight: 600,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#c99a5b';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b08b4f';
          }}
        >
          Starte den Duft-Detektiv
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '20px',
          marginBottom: '2rem',
          color: '#2a1d12',
          fontWeight: 600,
        }}
      >
        {savedPerfumes.length} {savedPerfumes.length === 1 ? 'Duft gesammelt' : 'Düfte gesammelt'}
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {savedPerfumes.map(perfume => (
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
              <button
                onClick={() => handleRemove(perfume.id)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: '#6b5a4e',
                  fontSize: '13px',
                  fontWeight: 600,
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
                Aus der Liste entfernen
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
