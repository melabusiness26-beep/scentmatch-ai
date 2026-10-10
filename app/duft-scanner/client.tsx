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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [similarPerfumes, setSimilarPerfumes] = useState<Perfume[]>([]);
  const [dbMatch, setDbMatch] = useState<Perfume | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ScanHistoryEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  // Load history on mount (client-only)
  useEffect(() => {
    setHistory(getScanHistory());
  }, []);

  const handleScanningChange = (scanning: boolean) => {
    setIsLoading(scanning);
  };

  const handleAnalysisComplete = (analysisData: ImageAnalysisResult['data'], image: string) => {
    setIsLoading(false);
    setAnalysis(analysisData);
    setUploadedImage(image);

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
  };

  const handleNewSearch = () => {
    setStage('scanner');
    setAnalysis(null);
    setSimilarPerfumes([]);
    setDbMatch(null);
  };

  const handleLoadFromHistory = (entry: ScanHistoryEntry) => {
    setIsLoading(true);
    setShowHistory(false);
    // Use rAF to let the loading screen render before heavy computation
    requestAnimationFrame(() => {
      const found = findPerfumeInDB(entry.analysis.perfumeName, entry.analysis.brandName, entry.analysis.notes, allPerfumes);
      const similar = findSimilarPerfumes(entry.analysis, allPerfumes, 40, 7);
      setAnalysis(entry.analysis);
      setUploadedImage(null); // no image for history entries
      setSimilarPerfumes(similar);
      setDbMatch(found);
      setIsLoading(false);
      setStage(similar.length > 0 || found ? 'results' : 'not-found');
    });
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
        uploadedImage={uploadedImage}
      />
    );
  }

  if (stage === 'not-found' && analysis) {
    // Try with a much lower threshold to find at least some fallback suggestions
    const fallbackSuggestions = findSimilarPerfumes(analysis, allPerfumes, 15, 4);
    // Also try family-based fallback if still empty
    const familySuggestions = fallbackSuggestions.length > 0 ? fallbackSuggestions : (
      analysis.family
        ? allPerfumes
            .filter(p => (p.fragrance_family || '').toLowerCase() === (analysis.family || '').toLowerCase())
            .slice(0, 4)
        : allPerfumes.slice(0, 4)
    );

    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ backgroundColor: C.cream, borderRadius: '14px', padding: '2rem', border: `1px solid ${C.sand}`, marginBottom: '1.5rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <h2 style={{
              fontSize: '24px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: C.dark,
              marginBottom: '0.5rem',
            }}>
              Erkannt: {analysis.perfumeName}
            </h2>
            <p style={{ fontSize: '14px', color: C.textMuted }}>
              von <strong>{analysis.brandName}</strong>
            </p>
          </div>

          {/* Analysis info pills */}
          {(analysis.family || analysis.intensity || analysis.gender) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.25rem' }}>
              {analysis.family && (
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: 'rgba(212,175,55,0.12)', color: C.text, fontSize: '12px', fontWeight: 600 }}>
                  {analysis.family}
                </span>
              )}
              {analysis.intensity && (
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: 'rgba(212,175,55,0.08)', color: C.textMuted, fontSize: '12px' }}>
                  {analysis.intensity.replace('_', ' ')}
                </span>
              )}
              {analysis.gender && (
                <span style={{ padding: '0.25rem 0.75rem', borderRadius: '99px', backgroundColor: 'rgba(212,175,55,0.08)', color: C.textMuted, fontSize: '12px' }}>
                  {analysis.gender === 'woman' ? 'Damen' : analysis.gender === 'man' ? 'Herren' : 'Unisex'}
                </span>
              )}
            </div>
          )}

          {/* Description */}
          {analysis.generalDescription && (
            <p style={{ fontSize: '14px', color: C.textMuted, lineHeight: 1.7, textAlign: 'center', marginBottom: '1.25rem' }}>
              {analysis.generalDescription}
            </p>
          )}

          {/* Notes */}
          {analysis.notes && (analysis.notes.top?.length > 0 || analysis.notes.heart?.length > 0 || analysis.notes.base?.length > 0) && (
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '0.9rem 1.1rem', border: `1px solid ${C.sand}`, marginBottom: '1.25rem' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Erkannte Duftnoten</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {[...(analysis.notes.top || []), ...(analysis.notes.heart || []), ...(analysis.notes.base || [])].map((note, i) => (
                  <span key={i} style={{ padding: '0.2rem 0.55rem', borderRadius: '6px', backgroundColor: C.cream, border: `1px solid ${C.sand}`, fontSize: '12px', color: C.text }}>
                    {note}
                  </span>
                ))}
              </div>
            </div>
          )}

          <p style={{ fontSize: '13px', color: C.textLight, textAlign: 'center', marginBottom: '1.5rem' }}>
            Dieser Duft ist noch nicht in unserem Katalog – aber du könntest diese ähnlichen Düfte mögen:
          </p>
        </div>

        {/* Fallback suggestions */}
        {familySuggestions.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
              {fallbackSuggestions.length > 0 ? 'Ähnliche Düfte' : `Düfte aus der Familie: ${analysis.family || 'Alle'}`}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {familySuggestions.map(p => (
                <a
                  key={p.id}
                  href={`/duft/${p.slug}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    backgroundColor: C.cream, borderRadius: '10px', padding: '0.9rem 1.1rem',
                    border: `1px solid ${C.sand}`, textDecoration: 'none', gap: '0.75rem',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: 700, color: C.dark, margin: 0 }}>{p.perfume_name}</p>
                    <p style={{ fontSize: '12px', color: C.textMuted, margin: '0.15rem 0 0' }}>{p.brands?.name}</p>
                    {p.fragrance_family && (
                      <span style={{ fontSize: '11px', color: C.textLight }}>{p.fragrance_family}</span>
                    )}
                  </div>
                  {p.price_chf && (
                    <span style={{ fontSize: '14px', fontWeight: 600, color: C.gold, whiteSpace: 'nowrap' }}>
                      CHF {p.price_chf}
                    </span>
                  )}
                </a>
              ))}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleNewSearch}
            style={{
              padding: '12px 32px', borderRadius: '8px', border: `1px solid ${C.sand}`,
              backgroundColor: 'transparent', color: C.dark, fontSize: '14px', fontWeight: 600, cursor: 'pointer',
            }}
          >
            Neue Suche
          </button>
          <a
            href="/duefte"
            style={{
              padding: '12px 32px', borderRadius: '8px', border: `1px solid ${C.gold}`,
              backgroundColor: C.gold, color: C.dark, fontSize: '14px', fontWeight: 700,
              cursor: 'pointer', textDecoration: 'none', display: 'inline-block',
            }}
          >
            Alle Düfte
          </a>
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

        <ImageAnalyzer
          onAnalysisComplete={(data: ImageAnalysisResult['data'], img?: string) => handleAnalysisComplete(data, img || '')}
          onLoadingChange={handleScanningChange}
        />
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
