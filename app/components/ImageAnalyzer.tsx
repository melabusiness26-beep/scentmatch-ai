'use client';

import { useState } from 'react';
import { ImageAnalysisResult } from '@/types/image-analysis';
import ImageUploadButton from './ImageUploadButton';
import LoadingAnimation from './LoadingAnimation';

interface ImageAnalyzerProps {
  onAnalysisComplete: (analysis: ImageAnalysisResult['data']) => void;
}

const TIPS = [
  '📷 Halte den Flakon ins Licht, das Etikett muss lesbar sein',
  '🔍 Fotografiere von vorne, damit Marke und Name sichtbar sind',
  '🌟 Auch Screenshots von Produktseiten funktionieren gut',
  '📦 Verpackungskarton scannen geht genauso',
];

export default function ImageAnalyzer({ onAnalysisComplete }: ImageAnalyzerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageSelected = async (base64: string) => {
    // Vorschau sofort anzeigen
    setPreviewUrl(base64);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/image-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64 }),
      });

      const data: ImageAnalysisResult = await response.json();

      if (!data.success || !data.data) {
        setError(data.error || 'Bild konnte nicht analysiert werden');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      // Timing-Info in die Daten einbinden
      const analysisWithTiming = {
        ...data.data,
        _timing: (data as any)._timing,
      };
      onAnalysisComplete(analysisWithTiming);
    } catch (err) {
      console.error('[ImageAnalyzer] Fehler:', err);
      setError('Fehler bei Bildanalyse. Bitte versuche es später erneut.');
      setIsLoading(false);
    }
  };

  // Ladebildschirm während KI analysiert — mit Vorschau oben
  if (isLoading) {
    return (
      <div style={{ width: '100%' }}>
        {previewUrl && (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: '90px',
              height: '90px',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '2px solid #d4af37',
              boxShadow: '0 0 16px rgba(212,175,55,0.3)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Gescanntes Parfüm"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        )}
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
      <ImageUploadButton onImageSelected={handleImageSelected} isLoading={isLoading} size="large" />

      {error && (
        <div style={{
          backgroundColor: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: '8px',
          padding: '0.75rem 1rem',
          fontSize: '13px',
          color: '#856404',
          maxWidth: '400px',
          textAlign: 'center',
          width: '100%',
        }}>
          ⚠️ {error}
          <div style={{ marginTop: '0.5rem', fontSize: '12px', color: '#6d5206' }}>
            Tipp: Fotografiere das Etikett direkt und sorge für gute Beleuchtung.
          </div>
        </div>
      )}

      <p style={{ fontSize: '13px', color: '#6b5a4e', textAlign: 'center', marginTop: '0.25rem' }}>
        Flakon, Verpackung oder Screenshot. Wir erkennen den Duft.
      </p>

      {/* Tipps für bessere Scans */}
      <div style={{
        backgroundColor: '#fdf9f0',
        border: '1px solid #e8dcc8',
        borderRadius: '10px',
        padding: '0.85rem 1rem',
        maxWidth: '400px',
        width: '100%',
      }}>
        <div style={{ fontSize: '11px', color: '#b08b4f', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
          💡 Für beste Ergebnisse
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {TIPS.map((tip, i) => (
            <div key={i} style={{ fontSize: '12px', color: '#7a6a5e', lineHeight: 1.5 }}>{tip}</div>
          ))}
        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#9a8a7e', textAlign: 'center', lineHeight: 1.5 }}>
        🔒 Dein Bild wird nur zur KI-Analyse gesendet und danach nicht gespeichert.
      </p>
    </div>
  );
}
