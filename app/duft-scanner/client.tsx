'use client';

import { useState } from 'react';
import { Perfume } from '@/lib/perfumes';
import { DetektivAnswers } from '@/lib/duft-detektiv-storage';
import { matchPerfumesDetektiv } from '@/lib/duft-detektiv-matcher';
import ImageAnalyzer from '@/app/components/ImageAnalyzer';
import ResultsView from '@/app/components/ResultsView';
import Link from 'next/link';

interface DuftScannerClientProps {
  allPerfumes: Perfume[];
}

export default function DuftScannerClient({ allPerfumes }: DuftScannerClientProps) {
  const [stage, setStage] = useState<'scanner' | 'results' | 'not-found'>('scanner');
  const [results, setResults] = useState<any[]>([]);
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [prefillAnswers, setPrefillAnswers] = useState<Partial<DetektivAnswers> | null>(null);

  const handleAnalysisComplete = (answers: DetektivAnswers) => {
    setAnalysisData(answers);

    if (
      answers.brand ||
      answers.bottle ||
      answers.description
    ) {
      // Confidence est élevée - on a reçu des données
      // Essayer de trouver une correspondance
      const matches = matchPerfumesDetektiv(answers, allPerfumes);

      if (matches.length > 0) {
        setResults(matches);
        setStage('results');
      } else {
        // Pas de correspondance exacte trouvée
        setStage('not-found');
        setPrefillAnswers(answers);
      }
    } else {
      // Pas de données - duft non reconnu
      setStage('not-found');
      setPrefillAnswers(answers);
    }
  };

  const handleStartDetektiv = () => {
    // Store answers in URL params and redirect
    const params = new URLSearchParams();
    if (prefillAnswers?.location) params.set('location', prefillAnswers.location);
    if (prefillAnswers?.gender) params.set('gender', prefillAnswers.gender);
    if (prefillAnswers?.feeling) params.set('feeling', prefillAnswers.feeling);
    if (prefillAnswers?.occasion) params.set('occasion', prefillAnswers.occasion);
    if (prefillAnswers?.strength) params.set('strength', prefillAnswers.strength);

    const queryString = params.toString();
    window.location.href = `/duft-detektiv${queryString ? '?' + queryString : ''}`;
  };

  const handleSearch = () => {
    // Redirect to main search with description
    const query = analysisData?.description || analysisData?.bottle || '';
    if (query) {
      window.location.href = `/?search=${encodeURIComponent(query)}`;
    }
  };

  const handleReset = () => {
    setStage('scanner');
    setResults([]);
    setAnalysisData(null);
    setPrefillAnswers(null);
  };

  if (stage === 'results') {
    return (
      <div>
        <ResultsView results={results} />
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
              e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Neuer Scan
          </button>
        </div>
      </div>
    );
  }

  if (stage === 'not-found') {
    return (
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            maxWidth: '500px',
            margin: '0 auto 2rem auto',
          }}
        >
          <p style={{
            fontSize: '16px',
            color: '#856404',
            margin: '0 0 1rem 0',
            fontWeight: 600,
          }}>
            ℹ️ Wir haben den Duft nicht genau erkannt
          </p>
          <p style={{
            fontSize: '14px',
            color: '#856404',
            margin: 0,
          }}>
            Trotzdem können wir dir helfen – wähle eine Option unten.
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          maxWidth: '400px',
          margin: '0 auto',
        }}>
          <button
            onClick={handleSearch}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: '#b08b4f',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#d4a566';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#b08b4f';
            }}
          >
            Trotzdem suchen
          </button>

          <button
            onClick={handleStartDetektiv}
            style={{
              width: '100%',
              padding: '14px 24px',
              borderRadius: '8px',
              border: '1px solid #b08b4f',
              backgroundColor: 'transparent',
              color: '#b08b4f',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(176, 139, 79, 0.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Duft-Detektiv starten
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: '0',
              borderRadius: '0',
              border: 'none',
              backgroundColor: 'transparent',
              color: '#b08b4f',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              textDecoration: 'none',
              marginTop: '0.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            ← Neuer Scan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <ImageAnalyzer
        onAnalysisComplete={handleAnalysisComplete}
        includeProductInfo={true}
      />
    </div>
  );
}
