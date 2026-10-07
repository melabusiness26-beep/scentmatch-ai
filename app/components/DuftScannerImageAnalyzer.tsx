'use client';

import { useState } from 'react';
import { ImageAnalysisResult } from '@/types/image-analysis';
import ImageUploadButton from './ImageUploadButton';

interface DuftScannerImageAnalyzerProps {
  onAnalysisComplete: (data: ImageAnalysisResult['data']) => void;
}

export default function DuftScannerImageAnalyzer({ onAnalysisComplete }: DuftScannerImageAnalyzerProps) {
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
          includeProductInfo: true,
        }),
      });

      const data = await response.json();

      if (!data.success || !data.data) {
        console.warn('[DuftScannerImageAnalyzer] Analyse fehlgeschlagen:', data.error);
        setError(data.error || 'Bild nicht erkannt');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onAnalysisComplete(data.data as ImageAnalysisResult['data']);
    } catch (err) {
      console.error('[DuftScannerImageAnalyzer] Fehler:', err);
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
