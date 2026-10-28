'use client';

import { useRef } from 'react';

interface ImageUploadButtonProps {
  onImageSelected: (base64: string) => void;
  isLoading?: boolean;
  size?: 'small' | 'large';
}

export default function ImageUploadButton({
  onImageSelected,
  isLoading = false,
  size = 'large',
}: ImageUploadButtonProps) {
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  // Komprimiere Bild auf max 2MB für schnellere API-Anfrage
  const compressImage = (dataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // Skaliere Bild auf max 1280px
        const maxDim = 1280;
        if (width > height) {
          if (width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // Komprimiere mit 70% Qualität
          resolve(canvas.toDataURL('image/jpeg', 0.7));
        } else {
          resolve(dataUrl); // Fallback
        }
      };
      img.src = dataUrl;
    });
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Bild zu gross (max ${maxSizeMB}MB)`);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Nur JPEG, PNG oder WebP akzeptiert');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const result = reader.result as string;
        // Komprimiere Bild für schnelleren Upload
        const compressed = await compressImage(result);
        console.log(`[ImageUploadButton] Original: ${result.length}, Komprimiert: ${compressed.length}`);
        onImageSelected(compressed);
      } catch (err) {
        console.error('[ImageUploadButton] Komprimierungs-Fehler:', err);
        // Fallback: nutze Original wenn Komprimierung fehlschlägt
        onImageSelected(reader.result as string);
      }
    };
    reader.onerror = () => {
      console.error('[ImageUploadButton] Fehler beim Lesen der Datei');
      alert('Fehler beim Lesen der Datei');
    };
    reader.readAsDataURL(file);
  };

  const buttonStyle: React.CSSProperties = {
    padding: size === 'large' ? '16px 48px' : '12px 32px',
    borderRadius: '16px',
    border: 'none',
    backgroundColor: '#b08b4f',
    color: '#ffffff',
    fontSize: size === 'large' ? '15px' : '13px',
    fontWeight: 700,
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: isLoading ? 0.6 : 1,
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(176, 139, 79, 0.2)',
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <>
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
      <div style={containerStyle}>
        <button
          onClick={() => cameraInputRef.current?.click()}
          disabled={isLoading}
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#d4a566';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(176, 139, 79, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = '#b08b4f';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(176, 139, 79, 0.2)';
            }
          }}
        >
          {isLoading ? 'Analysiere...' : '📷 Kamera'}
        </button>
        <button
          onClick={() => galleryInputRef.current?.click()}
          disabled={isLoading}
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            border: '2px solid #b08b4f',
            color: '#b08b4f',
          }}
          onMouseEnter={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'rgba(176, 139, 79, 0.05)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isLoading) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          🖼️ Galerie wählen
        </button>
      </div>
    </>
  );
}
