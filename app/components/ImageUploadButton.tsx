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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validiere Dateigröße
    const maxSizeMB = 5;
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`Bild zu gross (max ${maxSizeMB}MB)`);
      return;
    }

    // Validiere MIME-Type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('Nur JPEG, PNG oder WebP akzeptiert');
      return;
    }

    // Konvertiere zu Base64
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onImageSelected(result);
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

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        disabled={isLoading}
      />
      <button
        onClick={() => inputRef.current?.click()}
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
        {isLoading ? 'Analysiere...' : '📷 Foto analysieren'}
      </button>
    </>
  );
}
