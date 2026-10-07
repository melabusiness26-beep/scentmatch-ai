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
  if (!analysis) return null;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Analyseergebnis Header */}
      <div
        style={{
          backgroundColor: '#f9f6f1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #e8dcc8',
        }}
      >
        <div style={{ marginBottom: '1.5rem' }}>
          <h1
            style={{
              fontSize: '32px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#2a1d12',
              margin: '0 0 0.5rem 0',
            }}
          >
            {analysis.perfumeName}
          </h1>
          <p style={{ fontSize: '18px', color: '#6b5a4e', margin: '0', fontWeight: 600 }}>
            von {analysis.brandName}
          </p>
        </div>

        {/* Konfidenz-Indicator */}
        <div
          style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '1rem',
            backgroundColor:
              analysis.confidence === 'high'
                ? 'rgba(76, 175, 80, 0.1)'
                : analysis.confidence === 'medium'
                  ? 'rgba(255, 193, 7, 0.1)'
                  : 'rgba(244, 67, 54, 0.1)',
            color:
              analysis.confidence === 'high'
                ? '#4CAF50'
                : analysis.confidence === 'medium'
                  ? '#FFC107'
                  : '#F44336',
          }}
        >
          {analysis.confidence === 'high'
            ? '✓ Hochsicher erkannt'
            : analysis.confidence === 'medium'
              ? '~ Wahrscheinlich'
              : '? Unsicher'}
        </div>

        {/* Beschreibung */}
        <p style={{ fontSize: '15px', color: '#6b5a4e', lineHeight: 1.6, margin: '1rem 0 0 0' }}>
          {analysis.generalDescription}
        </p>
      </div>

      {/* Duftpyramide */}
      <div
        style={{
          backgroundColor: '#f9f6f1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #e8dcc8',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '1.5rem',
          }}
        >
          Duftpyramide
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {/* Kopfnoten */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Kopfnoten
            </h3>
            <div>
              {analysis.notes.top.length > 0 ? (
                analysis.notes.top.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(176, 139, 79, 0.05)',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      fontSize: '13px',
                      color: '#2a1d12',
                    }}
                  >
                    {note}
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</p>
              )}
            </div>
          </div>

          {/* Herznoten */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Herznoten
            </h3>
            <div>
              {analysis.notes.heart.length > 0 ? (
                analysis.notes.heart.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(176, 139, 79, 0.05)',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      fontSize: '13px',
                      color: '#2a1d12',
                    }}
                  >
                    {note}
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</p>
              )}
            </div>
          </div>

          {/* Basisnoten */}
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Basisnoten
            </h3>
            <div>
              {analysis.notes.base.length > 0 ? (
                analysis.notes.base.map((note, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.5rem 0.75rem',
                      backgroundColor: 'rgba(176, 139, 79, 0.05)',
                      borderRadius: '6px',
                      marginBottom: '0.5rem',
                      fontSize: '13px',
                      color: '#2a1d12',
                    }}
                  >
                    {note}
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Entwicklung */}
      <div
        style={{
          backgroundColor: '#f9f6f1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #e8dcc8',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '1.5rem',
          }}
        >
          Duftentwicklung
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Anfang (0-5 min)
            </h3>
            <p style={{ fontSize: '14px', color: '#6b5a4e', lineHeight: 1.6 }}>
              {analysis.development.opening}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Herz (1-2 h)
            </h3>
            <p style={{ fontSize: '14px', color: '#6b5a4e', lineHeight: 1.6 }}>
              {analysis.development.middleGame}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Abend (6+ h)
            </h3>
            <p style={{ fontSize: '14px', color: '#6b5a4e', lineHeight: 1.6 }}>
              {analysis.development.drydown}
            </p>
          </div>
        </div>
      </div>

      {/* Spezifikationen */}
      <div
        style={{
          backgroundColor: '#f9f6f1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #e8dcc8',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '1.5rem',
          }}
        >
          Spezifikationen
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.5rem' }}>
              Duftfamilie
            </h3>
            <p style={{ fontSize: '14px', color: '#2a1d12', margin: 0 }}>{analysis.family}</p>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.5rem' }}>
              Geschlecht
            </h3>
            <p style={{ fontSize: '14px', color: '#2a1d12', margin: 0 }}>
              {analysis.gender === 'woman'
                ? 'Damen'
                : analysis.gender === 'man'
                  ? 'Herren'
                  : analysis.gender === 'unisex'
                    ? 'Unisex'
                    : 'Nicht angegeben'}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.5rem' }}>
              Intensität
            </h3>
            <p style={{ fontSize: '14px', color: '#2a1d12', margin: 0 }}>
              {analysis.intensity === 'very_light'
                ? 'Sehr leicht'
                : analysis.intensity === 'light'
                  ? 'Leicht'
                  : analysis.intensity === 'medium'
                    ? 'Mittel'
                    : analysis.intensity === 'strong'
                      ? 'Kräftig'
                      : analysis.intensity === 'very_strong'
                        ? 'Sehr kräftig'
                        : 'Nicht angegeben'}
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.5rem' }}>
              Herkunft
            </h3>
            <p style={{ fontSize: '14px', color: '#2a1d12', margin: 0 }}>
              {analysis.origin || 'Nicht angegeben'}
            </p>
          </div>
        </div>
      </div>

      {/* Verwendungsempfehlungen */}
      <div
        style={{
          backgroundColor: '#f9f6f1',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '3rem',
          border: '1px solid #e8dcc8',
        }}
      >
        <h2
          style={{
            fontSize: '20px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '1.5rem',
          }}
        >
          Empfohlen für
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Anlässe
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.usageRecommendations.occasions.length > 0 ? (
                analysis.usageRecommendations.occasions.map((occ, idx) => (
                  <span key={idx} style={{ fontSize: '13px', color: '#6b5a4e' }}>
                    • {occ}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Jahreszeiten
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.usageRecommendations.seasons.length > 0 ? (
                analysis.usageRecommendations.seasons.map((season, idx) => (
                  <span key={idx} style={{ fontSize: '13px', color: '#6b5a4e' }}>
                    • {season}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#b08b4f', marginBottom: '0.75rem' }}>
              Tageszeiten
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.usageRecommendations.timeOfDay.length > 0 ? (
                analysis.usageRecommendations.timeOfDay.map((time, idx) => (
                  <span key={idx} style={{ fontSize: '13px', color: '#6b5a4e' }}>
                    • {time}
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '13px', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ähnliche Parfüme */}
      {similarPerfumes.length > 0 && (
        <div
          style={{
            backgroundColor: '#f9f6f1',
            borderRadius: '12px',
            padding: '2rem',
            marginBottom: '3rem',
            border: '1px solid #e8dcc8',
          }}
        >
          <h2
            style={{
              fontSize: '20px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#2a1d12',
              marginBottom: '1.5rem',
            }}
          >
            Ähnliche Düfte aus unserem Katalog
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {similarPerfumes.map((perfume) => (
              <Link
                key={perfume.id}
                href={`/duft/${perfume.slug}`}
                style={{
                  display: 'block',
                  padding: '1rem',
                  backgroundColor: '#ffffff',
                  borderRadius: '8px',
                  border: '1px solid #e8dcc8',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(176, 139, 79, 0.2)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#2a1d12', margin: '0 0 0.25rem 0' }}>
                  {perfume.perfume_name}
                </h3>
                <p style={{ fontSize: '12px', color: '#9a8a7e', margin: '0 0 0.5rem 0' }}>
                  {perfume.brands?.name || 'Unbekannte Marke'}
                </p>
                <p style={{ fontSize: '12px', color: '#6b5a4e', lineHeight: 1.4 }}>
                  {perfume.fragrance_family}
                </p>
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
