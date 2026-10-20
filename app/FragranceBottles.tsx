'use client';

interface BottleProps {
  family: 'woody' | 'floral' | 'gourmand' | 'clean';
}

const BottleIllustration = ({ family }: BottleProps) => {
  const styles = {
    woody: {
      capColor: '#D4AF37',
      glassColor: '#4A3728',
      glassLight: '#6B5344',
      accentColor: '#8B6F47',
      pattern: 'woody'
    },
    floral: {
      capColor: '#D4AF37',
      glassColor: '#E8D4C8',
      glassLight: '#F5E6DC',
      accentColor: '#D4A5A0',
      pattern: 'floral'
    },
    gourmand: {
      capColor: '#D4AF37',
      glassColor: '#C9A066',
      glassLight: '#E6C89F',
      accentColor: '#A67C52',
      pattern: 'gourmand'
    },
    clean: {
      capColor: '#D4AF37',
      glassColor: '#B8D4E8',
      glassLight: '#D4E8F5',
      accentColor: '#7FA3C4',
      pattern: 'clean'
    }
  };

  const style = styles[family];

  return (
    <svg viewBox="0 0 120 200" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', maxWidth: '140px' }}>
      <defs>
        <linearGradient id={`grad-${family}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: style.glassLight, stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: style.glassColor, stopOpacity: 1 }} />
        </linearGradient>

        {family === 'woody' && (
          <pattern id="woody-pattern" x="0" y="0" width="8" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="#3D2B1A" strokeWidth="1" opacity="0.3" />
            <line x1="4" y1="5" x2="4" y2="25" stroke="#3D2B1A" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        )}

        {family === 'floral' && (
          <g id="flower">
            <circle cx="0" cy="0" r="3" fill="#D4A5A0" opacity="0.6" />
            <circle cx="4" cy="2" r="2" fill="#E8B8B1" opacity="0.5" />
            <circle cx="4" cy="-2" r="2" fill="#E8B8B1" opacity="0.5" />
            <circle cx="-4" cy="2" r="2" fill="#E8B8B1" opacity="0.5" />
            <circle cx="-4" cy="-2" r="2" fill="#E8B8B1" opacity="0.5" />
          </g>
        )}

        {family === 'gourmand' && (
          <pattern id="gourmand-pattern" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="3" fill="#A67C52" opacity="0.3" />
            <path d="M 3 3 Q 6 2 9 3" stroke="#8B6F47" strokeWidth="0.5" fill="none" opacity="0.2" />
          </pattern>
        )}

        {family === 'clean' && (
          <pattern id="clean-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 0 5 L 5 0 L 10 5 L 5 10 Z" fill="none" stroke="#7FA3C4" strokeWidth="0.5" opacity="0.2" />
          </pattern>
        )}
      </defs>

      {/* Flakon-Körper */}
      <path
        d="M 35 40 L 30 60 Q 28 80 30 110 L 35 130 Q 50 140 60 140 Q 70 140 85 130 L 90 110 Q 92 80 90 60 L 85 40 Z"
        fill={`url(#grad-${family})`}
        stroke={style.accentColor}
        strokeWidth="0.8"
      />

      {/* Muster im Flakon */}
      {family === 'woody' && (
        <path
          d="M 35 40 L 30 60 Q 28 80 30 110 L 35 130 Q 50 140 60 140 Q 70 140 85 130 L 90 110 Q 92 80 90 60 L 85 40 Z"
          fill="url(#woody-pattern)"
        />
      )}

      {family === 'floral' && (
        <>
          <use href="#flower" x="50" y="70" />
          <use href="#flower" x="45" y="95" />
          <use href="#flower" x="70" y="85" />
        </>
      )}

      {family === 'gourmand' && (
        <path
          d="M 35 40 L 30 60 Q 28 80 30 110 L 35 130 Q 50 140 60 140 Q 70 140 85 130 L 90 110 Q 92 80 90 60 L 85 40 Z"
          fill="url(#gourmand-pattern)"
        />
      )}

      {family === 'clean' && (
        <path
          d="M 35 40 L 30 60 Q 28 80 30 110 L 35 130 Q 50 140 60 140 Q 70 140 85 130 L 90 110 Q 92 80 90 60 L 85 40 Z"
          fill="url(#clean-pattern)"
        />
      )}

      {/* Glanzeffekt auf der Flasche */}
      <ellipse cx="42" cy="70" rx="5" ry="15" fill="white" opacity="0.25" />

      {/* Flakon-Hals */}
      <rect x="50" y="20" width="20" height="20" fill={style.glassColor} stroke={style.accentColor} strokeWidth="0.8" />

      {/* Stopper/Deckel */}
      <rect x="48" y="15" width="24" height="8" fill={style.capColor} stroke="#A0860D" strokeWidth="0.8" rx="2" />

      {/* Stopper-Details */}
      <circle cx="60" cy="15" r="2" fill="#A0860D" opacity="0.5" />

      {/* Glas-Highlight auf Stopper */}
      <line x1="49" y1="16" x2="71" y2="16" stroke="white" strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
};

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

export { BottleIllustration };
