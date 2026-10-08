'use client';

import { useState, useEffect } from 'react';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';
import { findSimilarPerfumes } from '@/lib/analysis-matcher';
import { getScanHistory, addScanToHistory, clearScanHistory, ScanHistoryEntry, formatRelativeTime } from '@/lib/scan-history';
import { findPerfumeInDB } from '@/lib/analysis-matcher';
import ImageAnalyzer from '@/app/components/ImageAnalyzer';
import AnalysisResultView from '@/app/components/AnalysisResultView';
import LoadingAnimation from '@/app/components/LoadingAnimation';

interface DuftScannerClientProps {
  allPerfumes: Perfume[];
}

type Stage = 'scanner' | 'results' | 'not-found';

const C = {
  dark: '#2a1d12',
  gold: '#d4af37',
  goldMuted: '#b08b4f',
  cream: '#f9f6f1',
  sand: '#e8dcc8',
  text: '#3d2e22',
  textMuted: '#7a6a5e',
  textLight: '#9a8a7e',
} as const;

export default function DuftScannerClient({ allPerfumes }: DuftScannerClientProps) {
  const [stage, setStage] = useState<Stage>('scanner');
  const [analysis, setAnalysis] = useState<ImageAnalysisResult['data'] | null>(null);
  const [similarPerfumes, setSimilarPerfumes] = useState<Perfume[]>([]);
  const [dbMatch, setDbMatch] = useState<Perfume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history on mount (client-only)
  useEffect(() => {
    setHistory(getScanHistory());
  }, []);

  const handleAnalysisComplete = (analysisData: ImageAnalysisResult['data']) => {
    setAnalysis(analysisData);
    setIsLoading(true);

    // DB-Lookup: Ist der Duft in Auressa? (Name + Marke + Noten)
    const found = findPerfumeInDB(analysisData.perfumeName, analysisData.brandName, analysisData.notes, allPerfumes);
    setDbMatch(found);

    const similar = findSimilarPerfumes(analysisData, allPerfumes, 40, 7);

    // Save to history
    addScanToHistory(analysisData);
    setHistory(getScanHistory());

    if (similar.length === 0 && !found) {
      setStage('not-found');
    } else {
      setSimilarPerfumes(similar);
      setStage('results');
    }
    setIsLoading(false);
  };

  const handleNewSearch = () => {
    setStage('scanner');
    setAnalysis(null);
    setSimilarPerfumes([]);
    setDbMatch(null);
  };

  const handleLoadFromHistory = (entry: ScanHistoryEntry) => {
    const found = findPerfumeInDB(entry.analysis.perfumeName, entry.analysis.brandName, entry.analysis.notes, allPerfumes);
    const similar = findSimilarPerfumes(entry.analysis, allPerfumes, 40, 7);
    setAnalysis(entry.analysis);
    setSimilarPerfumes(similar);
    setDbMatch(found);
    setStage(similar.length > 0 || found ? 'results' : 'not-found');
    setShowHistory(false);
  };

  const handleClearHistory = () => {
    clearScanHistory();
    setHistory([]);
  };

  if (isLoading) {
    return <LoadingAnimation />;
  }

  if (stage === 'results' && analysis) {
    return (
      <AnalysisResultView
        analysis={analysis}
        similarPerfumes={similarPerfumes}
        onNewSearch={handleNewSearch}
        dbMatch={dbMatch}
      />
    );
  }

  if (stage === 'not-found' && analysis) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ backgroundColor: C.cream, borderRadius: '12px', padding: '3rem 2rem', border: `1px solid ${C.sand}` }}>
          <h2 style={{
            fontSize: '28px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: C.dark,
            marginBottom: '1rem',
          }}>
            Parfüm erkannt!
          </h2>
          <p style={{ fontSize: '16px', color: C.textMuted, marginBottom: '1.5rem', lineHeight: 1.6 }}>
            <strong>{analysis.perfumeName}</strong> von <strong>{analysis.brandName}</strong>
          </p>
          <p style={{ fontSize: '14px', color: C.textLight, marginBottom: '2rem' }}>
            Leider haben wir keine ähnlichen Düfte in unserem Katalog gefunden, die dieser Beschreibung
            entsprechen. Schau dir aber den Duft selbst an!
          </p>
          <p style={{ fontSize: '14px', color: C.textMuted, marginBottom: '2rem', lineHeight: 1.6 }}>
            {analysis.generalDescription}
          </p>
          <button
            onClick={handleNewSearch}
            style={{
              padding: '12px 32px',
              borderRadius: '8px',
              border: `1px solid ${C.sand}`,
              backgroundColor: 'transparent',
              color: C.dark,
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Neue Suche
          </button>
        </div>
      </div>
    );
  }

  // ── SCANNER STAGE ──────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1rem' }}>

      {/* Main scanner card */}
      <div style={{ backgroundColor: C.cream, borderRadius: '14px', padding: '2rem', border: `1px solid ${C.sand}`, marginBottom: '1.5rem' }}>
        <h2 style={{
          fontSize: '24px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: C.dark,
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}>
          Duft-Scanner
        </h2>
        <p style={{ fontSize: '14px', color: C.textMuted, textAlign: 'center', marginBottom: '2rem', lineHeight: 1.6 }}>
          Fotografiere einen Parfüm-Flakon – wir analysieren ihn und zeigen dir ähnliche Düfte.
        </p>

        <ImageAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      </div>

      {/* Scan history */}
      {history.length > 0 && (
        <div style={{ backgroundColor: C.cream, borderRadius: '14px', border: `1px solid ${C.sand}`, overflow: 'hidden' }}>
          {/* Header toggle */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: C.text,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <span style={{ fontSize: '1rem' }}>🕐</span>
              <span style={{ fontSize: '0.95rem', fontWeight: '700', color: C.dark }}>
                Zuletzt gescannte Düfte
              </span>
              <span style={{
                backgroundColor: C.gold,
                color: C.dark,
                fontSize: '0.7rem',
                fontWeight: '700',
                padding: '0.15rem 0.5rem',
                borderRadius: '10px',
              }}>
                {history.length}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: C.textLight, transform: showHistory ? 'rotate(180deg)' : 'none', transition: 'transform 0.25s ease' }}>
              ▼
            </span>
          </button>

          {showHistory && (
            <div style={{ borderTop: `1px solid ${C.sand}` }}>
              {history.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleLoadFromHistory(entry)}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: `1px solid ${C.sand}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#faf6ef'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '700', color: C.dark, marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {entry.perfumeName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: C.goldMuted, fontWeight: '600' }}>
                      {entry.brandName}
                      {entry.family ? ` · ${entry.family}` : ''}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, fontSize: '0.75rem', color: C.textLight }}>
                    {formatRelativeTime(entry.scannedAt)}
                  </div>
                </button>
              ))}

              {/* Clear button */}
              <div style={{ padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  onClick={handleClearHistory}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.8rem',
                    color: C.textLight,
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#c0392b'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.textLight; }}
                >
                  Verlauf löschen
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
