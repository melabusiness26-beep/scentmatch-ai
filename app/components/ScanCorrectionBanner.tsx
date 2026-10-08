'use client';

import { useState } from 'react';
import { ImageAnalysisResult } from '@/types/image-analysis';

interface ScanCorrectionBannerProps {
  analysis: ImageAnalysisResult['data'];
  onCorrected: (updated: ImageAnalysisResult['data']) => void;
}

const C = {
  dark: '#2a1d12',
  gold: '#d4af37',
  cream: '#f9f6f1',
  sand: '#e8dcc8',
  text: '#3d2e22',
  textMuted: '#7a6a5e',
  textLight: '#9a8a7e',
} as const;

export default function ScanCorrectionBanner({ analysis, onCorrected }: ScanCorrectionBannerProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(analysis.perfumeName);
  const [brand, setBrand] = useState(analysis.brandName);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!name.trim() || !brand.trim()) return;
    onCorrected({ ...analysis, perfumeName: name.trim(), brandName: brand.trim() });
    setSaved(true);
    setOpen(false);
  };

  if (saved) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        backgroundColor: '#f0faf3', border: '1px solid #b7e4c7',
        borderRadius: '8px', padding: '0.6rem 1rem',
        fontSize: '0.85rem', color: '#1a7a3e', marginBottom: '1.5rem',
      }}>
        <span>✅</span>
        <span>Korrektur gespeichert – Ergebnisse wurden aktualisiert.</span>
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {/* Banner */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: '0.75rem',
        backgroundColor: '#fffbf0',
        border: `1px solid ${C.sand}`,
        borderLeft: `3px solid ${C.gold}`,
        borderRadius: '8px',
        padding: '0.75rem 1.25rem',
        fontSize: '0.875rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: C.textMuted }}>
          <span>🤔</span>
          <span>
            Erkannt als <strong style={{ color: C.dark }}>{analysis.perfumeName}</strong> von{' '}
            <strong style={{ color: C.dark }}>{analysis.brandName}</strong> – stimmt das?
          </span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          style={{
            padding: '0.35rem 0.9rem',
            borderRadius: '6px',
            border: `1px solid ${C.gold}`,
            backgroundColor: open ? C.gold : 'transparent',
            color: open ? C.dark : C.text,
            fontSize: '0.82rem',
            fontWeight: '600',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease',
          }}
        >
          ✏️ Korrigieren
        </button>
      </div>

      {/* Inline edit form */}
      {open && (
        <div style={{
          backgroundColor: C.cream,
          border: `1px solid ${C.sand}`,
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '1.25rem 1.25rem 1rem',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Parfüm-Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%', padding: '0.55rem 0.8rem',
                  border: `1px solid ${C.sand}`, borderRadius: '6px',
                  fontSize: '0.9rem', color: C.dark, backgroundColor: '#fff',
                  outline: 'none', boxSizing: 'border-box',
                }}
                placeholder="z.B. THE ROSE"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: C.textLight, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Marke
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{
                  width: '100%', padding: '0.55rem 0.8rem',
                  border: `1px solid ${C.sand}`, borderRadius: '6px',
                  fontSize: '0.9rem', color: C.dark, backgroundColor: '#fff',
                  outline: 'none', boxSizing: 'border-box',
                }}
                placeholder="z.B. Comotù"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setOpen(false)}
              style={{
                padding: '0.45rem 1rem', borderRadius: '6px',
                border: `1px solid ${C.sand}`, backgroundColor: 'transparent',
                color: C.textMuted, fontSize: '0.85rem', cursor: 'pointer',
              }}
            >
              Abbrechen
            </button>
            <button
              onClick={handleSave}
              disabled={!name.trim() || !brand.trim()}
              style={{
                padding: '0.45rem 1.25rem', borderRadius: '6px',
                border: `1px solid ${C.gold}`,
                backgroundColor: name.trim() && brand.trim() ? C.gold : C.sand,
                color: C.dark, fontSize: '0.85rem', fontWeight: '700',
                cursor: name.trim() && brand.trim() ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
              }}
            >
              Speichern
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
