'use client';

interface BottleProps {
  family: 'woody' | 'floral' | 'gourmand' | 'clean';
}

export function BottleIllustration({ family }: BottleProps) {
  const colors = {
    woody: {
      glass: '#4A3728',
      accent: '#8B6F47',
      cap: '#D4AF37'
    },
    floral: {
      glass: '#E8D4C8',
      accent: '#D4A5A0',
      cap: '#D4AF37'
    },
    gourmand: {
      glass: '#C9A066',
      accent: '#A67C52',
      cap: '#D4AF37'
    },
    clean: {
      glass: '#B8D4E8',
      accent: '#7FA3C4',
      cap: '#D4AF37'
    }
  };

  const col = colors[family];
  const gradId = `grad-${family}`;
  const patternId = `pattern-${family}`;

  return (
    <svg
      viewBox="0 0 120 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', maxWidth: '140px' }}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={col.accent} stopOpacity={0.3} />
          <stop offset="100%" stopColor={col.glass} stopOpacity={1} />
        </linearGradient>

        {family === 'floral' && (
          <symbol id="flower-small">
            <circle cx="0" cy="0" r="2.5" fill={col.accent} />
            <circle cx="3" cy="1.5" r="1.5" fill={col.accent} opacity={0.7} />
            <circle cx="3" cy="-1.5" r="1.5" fill={col.accent} opacity={0.7} />
            <circle cx="-3" cy="1.5" r="1.5" fill={col.accent} opacity={0.7} />
            <circle cx="-3" cy="-1.5" r="1.5" fill={col.accent} opacity={0.7} />
          </symbol>
        )}
      </defs>

      {/* Flakon-Körper (Hauptteil) */}
      <path
        d="M 35 50 L 30 70 Q 28 90 30 110 L 35 130 Q 50 140 60 140 Q 70 140 85 130 L 90 110 Q 92 90 90 70 L 85 50 Z"
        fill={`url(#${gradId})`}
        stroke={col.accent}
        strokeWidth="1"
      />

      {/* Flakon-Hals */}
      <rect x="50" y="25" width="20" height="25" fill={col.glass} stroke={col.accent} strokeWidth="0.8" />

      {/* Stopper/Deckel - Gold */}
      <rect x="48" y="15" width="24" height="12" fill={col.cap} stroke="#A0860D" strokeWidth="0.8" rx="2" />

      {/* Stopper-Highlight */}
      <line x1="49" y1="17" x2="71" y2="17" stroke="white" strokeWidth="0.6" opacity="0.5" />

      {/* Glanz-Effekt auf Flakon */}
      <ellipse cx="42" cy="80" rx="4" ry="20" fill="white" opacity="0.2" />

      {/* Familie-spezifische Details */}
      {family === 'floral' && (
        <>
          <use href="#flower-small" x="50" y="75" />
          <use href="#flower-small" x="45" y="100" />
          <use href="#flower-small" x="70" y="90" />
        </>
      )}

      {family === 'woody' && (
        <>
          <rect x="38" y="60" width="2" height="40" fill={col.accent} opacity="0.2" />
          <rect x="45" y="65" width="1.5" height="35" fill={col.accent} opacity="0.15" />
          <rect x="75" y="70" width="1.5" height="30" fill={col.accent} opacity="0.15" />
        </>
      )}

      {family === 'gourmand' && (
        <>
          <circle cx="50" cy="85" r="3" fill={col.accent} opacity="0.3" />
          <circle cx="65" cy="95" r="2.5" fill={col.accent} opacity="0.25" />
          <circle cx="55" cy="110" r="2" fill={col.accent} opacity="0.2" />
        </>
      )}

      {family === 'clean' && (
        <>
          <path d="M 45 75 L 50 70 L 55 75" fill="none" stroke={col.accent} strokeWidth="0.8" opacity="0.3" />
          <path d="M 50 90 L 55 85 L 60 90" fill="none" stroke={col.accent} strokeWidth="0.8" opacity="0.25" />
          <path d="M 48 105 L 53 100 L 58 105" fill="none" stroke={col.accent} strokeWidth="0.8" opacity="0.2" />
        </>
      )}
    </svg>
  );
}

export function FragranceBottleRow() {
  const families: Array<'woody' | 'floral' | 'gourmand' | 'clean'> = ['clean', 'gourmand', 'woody', 'floral'];

  return (
    <>
      {families.map((family) => (
        <div key={family} style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '180px' }}>
          <BottleIllustration family={family} />
        </div>
      ))}
    </>
  );
}
