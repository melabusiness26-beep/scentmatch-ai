'use client';

import { useState } from 'react';
import { getPerfumes } from '@/lib/perfumes';

interface PerfumeManualInputProps {
  onPerfumeFound: (perfumeName: string, brandName: string) => void;
  isLoading?: boolean;
}

export default function PerfumeManualInput({
  onPerfumeFound,
  isLoading = false,
}: PerfumeManualInputProps) {
  const [brandInput, setBrandInput] = useState('');
  const [perfumeInput, setPerfumeInput] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ name: string; brand: string }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (input: string, isBrand: boolean) => {
    if (isBrand) {
      setBrandInput(input);
    } else {
      setPerfumeInput(input);
    }

    if (input.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const allPerfumes = await getPerfumes();
      const filtered = allPerfumes.filter((p) => {
        const brandMatch = p.brands?.name?.toLowerCase().includes(input.toLowerCase());
        const perfumeMatch = p.perfume_name.toLowerCase().includes(input.toLowerCase());
        return isBrand ? brandMatch : perfumeMatch;
      });

      setSuggestions(
        filtered.slice(0, 5).map((p) => ({
          name: p.perfume_name,
          brand: p.brands?.name || '',
        }))
      );
      setShowSuggestions(true);
    } catch (err) {
      console.error('[PerfumeManualInput] Fehler bei Vorschlägen:', err);
    }
  };

  const handleSubmit = () => {
    if (brandInput.trim() && perfumeInput.trim()) {
      onPerfumeFound(perfumeInput.trim(), brandInput.trim());
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', maxWidth: '400px' }}>
      <div style={{ position: 'relative' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: '#b08b4f', display: 'block', marginBottom: '0.5rem' }}>
          Marke
        </label>
        <input
          type="text"
          placeholder="z.B. Cacharel"
          value={brandInput}
          onChange={(e) => handleInputChange(e.target.value, true)}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #d4a566',
            fontSize: '13px',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <label style={{ fontSize: '12px', fontWeight: 700, color: '#b08b4f', display: 'block', marginBottom: '0.5rem' }}>
          Duftname
        </label>
        <input
          type="text"
          placeholder="z.B. Lou Lou"
          value={perfumeInput}
          onChange={(e) => handleInputChange(e.target.value, false)}
          disabled={isLoading}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: '8px',
            border: '1px solid #d4a566',
            fontSize: '13px',
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              border: '1px solid #d4a566',
              borderRadius: '8px',
              marginTop: '4px',
              zIndex: 10,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => {
                  setPerfumeInput(s.name);
                  setBrandInput(s.brand);
                  setShowSuggestions(false);
                }}
                style={{
                  padding: '8px 12px',
                  borderBottom: i < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  color: '#333',
                }}
              >
                <strong>{s.brand}</strong> – {s.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSubmit}
        disabled={!brandInput.trim() || !perfumeInput.trim() || isLoading}
        style={{
          padding: '12px 32px',
          borderRadius: '16px',
          border: 'none',
          backgroundColor: brandInput.trim() && perfumeInput.trim() ? '#b08b4f' : '#ccc',
          color: '#ffffff',
          fontSize: '13px',
          fontWeight: 700,
          cursor: brandInput.trim() && perfumeInput.trim() && !isLoading ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
        }}
      >
        🔍 Duft suchen
      </button>
    </div>
  );
}
