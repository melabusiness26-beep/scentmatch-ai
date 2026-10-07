'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

interface AnalysisResultViewProps {
  analysis: ImageAnalysisResult['data'];
  similarPerfumes: Perfume[];
  onNewSearch: () => void;
}

export default function AnalysisResultView({
  analysis,
  similarPerfumes,
  onNewSearch,
}: AnalysisResultViewProps) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Erkannter Duft */}
      <div style={{ backgroundColor: '#f9f6f1', borderRadius: '12px', padding: '2rem', marginBottom: '2rem', border: '1px solid #e8dcc8' }}>
        <h2 style={{ fontSize: '28px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
          {analysis.perfumeName} von {analysis.brandName}
        </h2>

        {analysis.generalDescription && (
          <p style={{ fontSize: '16px', color: '#6b5a4e', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            {analysis.generalDescription}
          </p>
        )}

        <div style={{ fontSize: '14px', color: '#9a8a7e', marginBottom: '1.5rem' }}>
          <p>Erkannt mit <strong>{analysis.confidence || 'medium'}</strong> Konfidenz</p>
        </div>
      </div>

      {/* Ähnliche Düfte */}
      {similarPerfumes.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '20px', fontFamily: "'Playfair Display', serif", fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Ähnliche Düfte in unserem Katalog
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {similarPerfumes.map((perfume) => (
              <Link key={perfume.id} href={`/duft/${perfume.slug}`}>
                <div style={{
                  backgroundColor: '#f9f6f1',
                  borderRadius: '8px',
                  padding: '1.5rem',
                  border: '1px solid #e8dcc8',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}>
                  <h4 style={{ fontSize: '16px', fontWeight: 600, color: '#2a1d12', marginBottom: '0.5rem' }}>
                    {perfume.perfume_name}
                  </h4>
                  <p style={{ fontSize: '14px', color: '#9a8a7e', marginBottom: '0.75rem' }}>
                    {perfume.brands?.name || 'Unbekannte Marke'}
                  </p>
                  {perfume.fragrance_family && (
                    <p style={{ fontSize: '12px', color: '#c4b5a0', marginBottom: '0.75rem' }}>
                      {perfume.fragrance_family}
                    </p>
                  )}
                  {perfume.price_chf && (
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#d4af37' }}>
                      CHF {perfume.price_chf}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Neue Suche Button */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={onNewSearch}
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
            e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          Neue Suche
        </button>
      </div>
    </div>
  );
}
