'use client';

import { useRef, useState } from 'react';

interface BarcodeScannerProps {
  onBarcodeDetected: (barcode: string) => void;
  isLoading?: boolean;
}

export default function BarcodeScanner({
  onBarcodeDetected,
  isLoading = false,
}: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScanning = async () => {
    setError(null);
    setIsScanning(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();

        // Versuche native BarcodeDetector API
        if ('BarcodeDetector' in window) {
          const barcodeDetector = new (window as any).BarcodeDetector({
            formats: ['ean_13', 'ean_8', 'code_128'],
          });

          scanIntervalRef.current = setInterval(async () => {
            if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
              try {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes.length > 0) {
                  const barcode = barcodes[0].rawValue;
                  stopScanning();
                  onBarcodeDetected(barcode);
                }
              } catch (err) {
                console.error('[BarcodeScanner] Erkennungsfehler:', err);
              }
            }
          }, 500);
        } else {
          // Fallback: jsQR (QR-Codes nur)
          setError('Native Barcode-Erkennung nicht verfügbar. Verwende QR-Code-Fallback.');
          console.warn('[BarcodeScanner] BarcodeDetector nicht verfügbar');
        }
      }
    } catch (err) {
      console.error('[BarcodeScanner] Kamerafehler:', err);
      setError('Kamerazugriff verweigert');
      setIsScanning(false);
    }
  };

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    setIsScanning(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', width: '100%' }}>
      {!isScanning ? (
        <button
          onClick={startScanning}
          disabled={isLoading}
          style={{
            padding: '12px 32px',
            borderRadius: '16px',
            border: '2px solid #b08b4f',
            backgroundColor: 'transparent',
            color: '#b08b4f',
            fontSize: '13px',
            fontWeight: 700,
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease',
          }}
        >
          📱 Barcode scannen
        </button>
      ) : (
        <>
          <video
            ref={videoRef}
            style={{
              width: '100%',
              maxWidth: '400px',
              borderRadius: '12px',
              border: '2px solid #b08b4f',
            }}
          />
          <button
            onClick={stopScanning}
            style={{
              padding: '8px 24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: '#d4a566',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ✕ Abbrechen
          </button>
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
            maxWidth: '400px',
            textAlign: 'center',
            width: '100%',
          }}
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}
