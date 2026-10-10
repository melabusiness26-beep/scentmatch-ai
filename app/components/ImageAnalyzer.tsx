'use client';

import { useState } from 'react';
import { ImageAnalysisResult } from '@/types/image-analysis';
import ImageUploadButton from './ImageUploadButton';

interface ImageAnalyzerProps {
  onAnalysisComplete: (analysis: ImageAnalysisResult['data'], imageBase64?: string) => void;
}

export default function ImageAnalyzer({ onAnalysisComplete }: ImageAnalyzerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('[ImageAnalyzer] Starte Bildanalyse...');

      const response = await fetch('/api/image-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      console.log('[ImageAnalyzer] API-Antwort erhalten:', response.status);
      const data: ImageAnalysisResult = await response.json();
      console.log('[ImageAnalyzer] API-Daten geparst:', data);

      if (!data.success || !data.data) {
        const errorMsg = data.error || 'Das Bild konnte leider nicht analysiert werden.';
        console.warn('[ImageAnalyzer] Analyse fehlgeschlagen:', errorMsg);
        setError(errorMsg);
        setIsLoading(false);
        return;
      }

      console.log('[ImageAnalyzer] Analyse erfolgreich');
      setIsLoading(false);
      onAnalysisComplete(data.data, base64);
    } catch (err) {
      console.error('[ImageAnalyzer] Fehler:', err);
      setError('Fehler bei der Bildanalyse – bitte versuche es später erneut.');
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
        Parfümflakon fotografieren – wir erkennen den Duft.
      </p>
    </div>
  );
}
