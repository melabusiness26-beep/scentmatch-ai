'use client';

import { useState } from 'react';

interface ScanCorrectionBannerProps {
  originalBrand: string | null;
  originalName: string | null;
  dbFound: boolean;
  onCorrect: (brand: string, name: string) => void;
}

export default function ScanCorrectionBanner({
  originalBrand,
  originalName,
  dbFound,
  onCorrect,
}: ScanCorrectionBannerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editBrand, setEditBrand] = useState(originalBrand || '');
  const [editName, setEditName] = useState(originalName || '');

  const handleSubmit = () => {
    if (editBrand.trim() && editName.trim()) {
      onCorrect(editBrand.trim(), editName.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditBrand(originalBrand || '');
    setEditName(originalName || '');
    setIsEditing(false);
  };

  return (
    <div
      style={{
        backgroundColor: dbFound ? '#e8f5e9' : '#fff3e0',
        borderLeft: `4px solid ${dbFound ? '#4caf50' : '#ff9800'}`,
        padding: '1rem',
        marginBottom: '1.5rem',
        borderRadius: '8px',
        fontSize: '14px',
      }}
    >
      {!isEditing ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div>
            <strong style={{ color: dbFound ? '#2e7d32' : '#e65100' }}>
              {dbFound ? '✓ In Auressa-DB gefunden!' : 'ℹ️ Stimmt das?'}
            </strong>
            <p style={{ margin: '0.25rem 0 0 0', color: '#555' }}>
              {originalBrand} – {originalName}
            </p>
          </div>
          <button
            onClick={() => {
              setIsEditing(true);
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#d4af37',
              color: '#2a1d12',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
            }}
          >
            {dbFound ? '✎ Ändern' : '✎ Korrigieren'}
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '0.25rem',
                color: '#333',
              }}
            >
              Marke:
            </label>
            <input
              type="text"
              value={editBrand}
              onChange={(e) => setEditBrand(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '13px',
                border: '1px solid #bbb',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12px',
                fontWeight: '600',
                marginBottom: '0.25rem',
                color: '#333',
              }}
            >
              Duftname:
            </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '13px',
                border: '1px solid #bbb',
                borderRadius: '4px',
                boxSizing: 'border-box',
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              ✓ Übernehmen
            </button>
            <button
              onClick={handleCancel}
              style={{
                flex: 1,
                padding: '0.5rem',
                backgroundColor: '#ccc',
                color: '#333',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
