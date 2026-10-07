'use client';

import { useState } from 'react';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';
import { findSimilarPerfumes } from '@/lib/analysis-matcher';
import ImageAnalyzer from '@/app/components/ImageAnalyzer';
import AnalysisResultView from '@/app/components/AnalysisResultView';
import LoadingAnimation from '@/app/components/LoadingAnimation';

interface DuftScannerClientProps {
  allPerfumes: Perfume[];
}

type Stage = 'scanner' | 'results' | 'not-found';

export default function DuftScannerClient({ allPerfumes }: DuftScannerClientProps) {
  const [stage, setStage] = useState<Stage>('scanner');
  const [analysis, setAnalysis] = useState<ImageAnalysisResult['data'] | null>(null);
  const [similarPerfumes, setSimilarPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalysisComplete = (analysisData: ImageAnalysisResult['data']) => {
    setAnalysis(analysisData);
    setIsLoading(true);

    // Simuliere kurze Ladezeit
    setTimeout(() => {
      const similar = findSimilarPerfumes(analysisData, allPerfumes, 40, 7);

      if (similar.length === 0) {
        setStage('not-found');
      } else {
        setSimilarPerfumes(similar);
        setStage('results');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleNewSearch = () => {
    setStage('scanner');
    setAnalysis(null);
    setSimilarPerfumes([]);
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
      />
    );
  }

  if (stage === 'not-found' && analysis) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem', textAlign: 'center' }}>
        <div style={{ backgroundColor: '#f9f6f1', borderRadius: '12px', padding: '3rem 2rem', border: '1px solid #e8dcc8' }}>
          <h2
            style={{
              fontSize: '28px',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: '#2a1d12',
              marginBottom: '1rem',
            }}
          >
            Parfüm erkannt!
          </h2>
          <p style={{ fontSize: '16px', color: '#6b5a4e', marginBottom: '1.5rem', lineHeight: 1.6 }}>
            <strong>{analysis.perfumeName}</strong> von <strong>{analysis.brandName}</strong>
          </p>

          <p style={{ fontSize: '14px', color: '#9a8a7e', marginBottom: '2rem' }}>
            Leider haben wir keine ähnlichen Düfte in unserem Katalog gefunden, die dieser Beschreibung
            entsprechen. Schau dir aber den Duft selbst an!
          </p>

          <p style={{ fontSize: '14px', color: '#6b5a4e', marginBottom: '2rem', lineHeight: 1.6 }}>
            {analysis.generalDescription}
          </p>

          <button
            onClick={handleNewSearch}
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

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem 1rem' }}>
      <div style={{ backgroundColor: '#f9f6f1', borderRadius: '12px', padding: '2rem', border: '1px solid #e8dcc8' }}>
        <h2
          style={{
            fontSize: '24px',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Duft-Scanner
        </h2>
        <p style={{ fontSize: '14px', color: '#6b5a4e', textAlign: 'center', marginBottom: '2rem' }}>
          Fotografiere einen Parfüm-Flakon – wir analysieren ihn und zeigen dir ähnliche Düfte.
        </p>

        <ImageAnalyzer onAnalysisComplete={handleAnalysisComplete} />
      </div>
    </div>
  );
}
