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

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Bild zu groß (max ${maxSizeMB}MB)`);
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Nur JPEG, PNG oder WebP akzeptiert');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageSelected(result);
    };
    reader.readAsDataURL(file);
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
    maxWidth: '400px',
  };

  // Loading state: replace buttons with a visible scanning animation
  if (isLoading) {
    return (
      <>
        <style>{`
          @keyframes ib-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes ib-pulse-ring {
            0% { transform: scale(0.85); opacity: 0.9; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          @keyframes ib-dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80%, 100% { content: '...'; }
          }
        `}</style>
        <div style={containerStyle}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem',
            padding: '1.5rem 1rem',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(176,139,79,0.04))',
            border: '1.5px solid rgba(212,175,55,0.2)',
          }}>
            {/* Spinning scanner icon */}
            <div style={{ position: 'relative', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {/* Outer pulse ring */}
              <div style={{
                position: 'absolute',
                inset: '-14px',
                borderRadius: '50%',
                border: '1.5px solid rgba(212,175,55,0.3)',
                animation: 'ib-pulse-ring 1.6s ease-out infinite',
              }} />
              {/* Inner pulse ring */}
              <div style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                border: '1.5px solid rgba(212,175,55,0.5)',
                animation: 'ib-pulse-ring 1.6s ease-out 0.5s infinite',
              }} />
              {/* Spinning ring */}
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '2px solid transparent',
                borderTopColor: '#d4af37',
                borderRightColor: 'rgba(212,175,55,0.3)',
                animation: 'ib-spin 1s linear infinite',
              }} />
              {/* Center icon */}
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))',
                border: '1.5px solid rgba(212,175,55,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.3rem',
              }}>
                🔍
              </div>
            </div>

            {/* Status text */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontSize: size === 'large' ? '15px' : '13px',
                fontWeight: 700,
                color: '#b08b4f',
                margin: '0 0 0.25rem',
                letterSpacing: '0.3px',
              }}>
                KI analysiert deinen Duft
              </p>
              <p style={{
                fontSize: '12px',
                color: '#9a8a7e',
                margin: 0,
              }}>
                Dauert meist 5–10 Sekunden …
              </p>
            </div>

            {/* Progress dots bar */}
            <div style={{
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            }}>
              {[0, 0.3, 0.6].map((delay, i) => (
                <div key={i} style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#d4af37',
                  animation: `ib-pulse-ring 1.2s ease-in-out ${delay}s infinite`,
                  opacity: 0.8,
                }} />
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  const buttonStyle: React.CSSProperties = {
    padding: size === 'large' ? '16px 48px' : '12px 32px',
    borderRadius: '16px',
    border: 'none',
    backgroundColor: '#b08b4f',
    color: '#ffffff',
    fontSize: size === 'large' ? '15px' : '13px',
    fontWeight: 700,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 12px rgba(176, 139, 79, 0.2)',
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
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <div style={containerStyle}>
        <button
          onClick={() => cameraInputRef.current?.click()}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#d4a566';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 16px rgba(176, 139, 79, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#b08b4f';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(176, 139, 79, 0.2)';
          }}
        >
          📷 Kamera
        </button>
        <button
          onClick={() => galleryInputRef.current?.click()}
          style={{
            ...buttonStyle,
            backgroundColor: 'transparent',
            border: '2px solid #b08b4f',
            color: '#b08b4f',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(176, 139, 79, 0.05)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          🖼️ Galerie wählen
        </button>
      </div>
    </>
  );
}
