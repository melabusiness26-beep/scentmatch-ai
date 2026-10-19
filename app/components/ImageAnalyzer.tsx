'use client';

import { useState } from 'react';
import { ImageAnalysisResult } from '@/types/image-analysis';
import ImageUploadButton from './ImageUploadButton';
import LoadingAnimation from './LoadingAnimation';
import BarcodeScanner from './BarcodeScanner';
import PerfumeManualInput from './PerfumeManualInput';

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
  const [mode, setMode] = useState<'barcode' | 'photo' | 'manual'>('barcode');
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

  const handleBarcodeDetected = async (barcode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/barcode-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode }),
      });

      const data: ImageAnalysisResult = await response.json();

      if (!data.success || !data.data) {
        setError(data.error || 'Barcode konnte nicht gefunden werden. Versuche das Flakon-Foto stattdessen.');
        setIsLoading(false);
        setMode('photo');
        return;
      }

      setIsLoading(false);
      onAnalysisComplete(data.data);
    } catch (err) {
      console.error('[ImageAnalyzer] Barcode-Fehler:', err);
      setError('Fehler bei der Barcode-Abfrage.');
      setIsLoading(false);
    }
  };

  const handleManualInput = async (perfumeName: string, brandName: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/manual-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ perfumeName, brandName }),
      });

      const data: ImageAnalysisResult = await response.json();

      if (!data.success || !data.data) {
        setError(data.error || 'Duft konnte nicht gefunden werden.');
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      onAnalysisComplete(data.data);
    } catch (err) {
      console.error('[ImageAnalyzer] Suche-Fehler:', err);
      setError('Fehler bei der Suche.');
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

  const tabStyle = (active: boolean) => ({
    padding: '10px 16px',
    borderRadius: '12px 12px 0 0',
    border: 'none',
    backgroundColor: active ? '#b08b4f' : '#f0f0f0',
    color: active ? '#ffffff' : '#666',
    fontSize: '12px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
      {/* Mode Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
        <button onClick={() => setMode('barcode')} style={tabStyle(mode === 'barcode')}>
          📱 Barcode
        </button>
        <button onClick={() => setMode('photo')} style={tabStyle(mode === 'photo')}>
          📷 Flakon
        </button>
        <button onClick={() => setMode('manual')} style={tabStyle(mode === 'manual')}>
          ⌨️ Manuell
        </button>
      </div>

      {/* Content Area */}
      <div
        style={{
          backgroundColor: '#fafafa',
          borderRadius: '0 12px 12px 12px',
          padding: '1.5rem',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {mode === 'barcode' && (
          <>
            <BarcodeScanner onBarcodeDetected={handleBarcodeDetected} isLoading={isLoading} />
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
              Barcode auf der Verpackung scannen
            </p>
          </>
        )}

        {mode === 'photo' && (
          <>
            <ImageUploadButton onImageSelected={handleImageSelected} isLoading={isLoading} size="large" />
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
              Flakon oder Etikett fotografieren
            </p>
          </>
        )}

        {mode === 'manual' && (
          <>
            <PerfumeManualInput onPerfumeFound={handleManualInput} isLoading={isLoading} />
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center' }}>
              Marke und Name eingeben
            </p>
          </>
        )}

        {error && (
          <div
            style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '0.75rem 1rem',
              fontSize: '12px',
              color: '#856404',
              textAlign: 'center',
              width: '100%',
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Tips */}
      <div
        style={{
          backgroundColor: '#fdf9f0',
          border: '1px solid #e8dcc8',
          borderRadius: '10px',
          padding: '0.85rem 1rem',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            color: '#b08b4f',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            marginBottom: '0.5rem',
          }}
        >
          💡 So funktioniert's
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div style={{ fontSize: '12px', color: '#7a6a5e', lineHeight: 1.5 }}>
            1️⃣ Versuche zuerst den <strong>Barcode zu scannen</strong> (schnellste Methode)
          </div>
          <div style={{ fontSize: '12px', color: '#7a6a5e', lineHeight: 1.5 }}>
            2️⃣ Oder fotografiere den <strong>Flakon/Text</strong> (für lesbare Etiketten)
          </div>
          <div style={{ fontSize: '12px', color: '#7a6a5e', lineHeight: 1.5 }}>
            3️⃣ Oder <strong>gib Marke & Name</strong> manuell ein (sicher & zuverlässig)
          </div>
        </div>
      </div>

      <p style={{ fontSize: '11px', color: '#9a8a7e', textAlign: 'center', lineHeight: 1.5 }}>
        🔒 Dein Bild wird nur zur KI-Analyse gesendet und danach nicht gespeichert.
      </p>
    </div>
  );
}
