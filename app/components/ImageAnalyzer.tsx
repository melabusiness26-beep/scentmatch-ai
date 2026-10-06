'use client';

import { useState } from 'react';
import { DetektivAnswers } from '@/lib/duft-detektiv-storage';
import { AnalyzeImageResponse } from '@/types/image-analysis';
import ImageUploadButton from './ImageUploadButton';

interface ImageAnalyzerProps {
  onAnalysisComplete: (answers: DetektivAnswers) => void;
  includeProductInfo?: boolean; // für /duft-scanner
}

export default function ImageAnalyzer({ onAnalysisComplete, includeProductInfo }: ImageAnalyzerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64,
          includeProductInfo,
        }),
      });

      const data: AnalyzeImageResponse = await response.json();

      if (!data.success || !data.data) {
        // Fehler oder low confidence → Quiz mit leeren Answers starten
        console.warn('[ImageAnalyzer] Analyse fehlgeschlagen:', data.error);
        onAnalysisComplete({
          location: null,
          country: '',
          gender: null,
          age: null,
          timing: null,
          feeling: null,
          strength: null,
          occasion: null,
          price: null,
          brand: '',
          bottle: '',
          description: '',
        });
        setError('Bild nicht erkannt – beantworte die Fragen manuell');
        return;
      }

      // Erfolg: Vorbefüllte Answers aus Analyse
      const analysisResult = data.data;

      const prefilled: DetektivAnswers = {
        location: analysisResult.where || null,
        country: '',
        gender: analysisResult.gender || null,
        age: null,
        timing: null,
        feeling: analysisResult.feeling || null,
        strength: analysisResult.intensity || null,
        occasion: analysisResult.occasion || null,
        price: null,
        brand: analysisResult.brandName || '',
        bottle: analysisResult.bottleDescription || '',
        description: analysisResult.bottleDescription || '', // Verwende bottleDescription als Fallback
      };

      // Low confidence → auch starten, aber mit Hinweis
      if (analysisResult.confidence === 'low') {
        console.warn('[ImageAnalyzer] Low confidence – Quiz mit vorbefüllten Antworten');
      }

      onAnalysisComplete(prefilled);
    } catch (err) {
      console.error('[ImageAnalyzer] Fehler:', err);
      setError('Fehler bei Bildanalyse – versuche es später erneut');
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <ImageUploadButton onImageSelected={handleImageSelected} isLoading={isLoading} size="large" />

      {error && (
        <div
          style={{
            backgroundColor: '#fff3cd',
            border: '1px solid #ffc107',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontSize: '13px',
            color: '#856404',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
          ℹ️ {error}
        </div>
      )}

      <p style={{ fontSize: '13px', color: '#6b5a4e', textAlign: 'center', marginTop: '0.5rem' }}>
        Flakon, Outfit oder Stimmung – wir lesen das Bild
      </p>
    </div>
  );
}
