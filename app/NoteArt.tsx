import type { ReactNode } from 'react';

// Eigene, hauseigene Illustrationen für die Duftnoten ("Variante A": rechtssicher,
// selbst erstellt, laden lokal – keine fremden Fotos, kein externer Server).
// Jede Note bekommt eine zarte Farbfläche (zwei Gradient-Stops) im Auressa-Stil
// und ein goldenes Strich-Motiv, das die Zutat andeutet.

type Theme = { from: string; to: string; ink: string };

const NOTE_THEME: Record<string, Theme> = {
  bergamotte: { from: '#eef0d6', to: '#dde1ba', ink: '#8f7a3c' },
  iris: { from: '#efe9f1', to: '#ddd5e2', ink: '#7d6f8c' },
  oud: { from: '#d9c5a7', to: '#b69870', ink: '#6f5435' },
  vanille: { from: '#f6ecd6', to: '#eedcb8', ink: '#a07c43' },
  ambroxan: { from: '#f3e4c9', to: '#e7d0a4', ink: '#9c7b40' },
  vetiver: { from: '#e4e7cf', to: '#cdd2ab', ink: '#6f7a44' },
  jasmin: { from: '#f8f2e9', to: '#ece0d1', ink: '#a08a6a' },
  rose: { from: '#f4ddd8', to: '#e8c3bc', ink: '#a85f59' }
};

const DEFAULT_THEME: Theme = { from: '#f3ead7', to: '#e3d3ac', ink: '#a07c43' };

// Fünf-/Sechs-blättrige Blüte: ein Blütenblatt wird mehrfach um die Mitte gedreht.
function flower(count: number, petal: string): ReactNode {
  const step = 360 / count;
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <path key={i} d={petal} transform={`rotate(${i * step} 160 92)`} />
      ))}
    </>
  );
}

function motif(slug: string): ReactNode {
  switch (slug) {
    case 'bergamotte':
      // Aufgeschnittene Zitrusfrucht (Strahlen) mit Blättchen.
      return (
        <>
          <circle cx="160" cy="92" r="46" />
          <circle cx="160" cy="92" r="32" />
          <path d="M160 60 V124 M128 92 H192 M137 69 L183 115 M183 69 L137 115" />
          <path d="M171 49 q15 -11 28 -1 q-11 16 -28 1 z" />
        </>
      );
    case 'iris':
      // Sechsblättrige, edle Blüte (Schwertlilie, stilisiert).
      return (
        <>
          {flower(6, 'M160 92 C150 70 151 54 160 44 C169 54 170 70 160 92 Z')}
          <circle cx="160" cy="92" r="6" fill="currentColor" stroke="none" />
        </>
      );
    case 'oud':
      // Holz-Querschnitt (Jahresringe) mit feinen Maserungslinien.
      return (
        <>
          <ellipse cx="160" cy="92" rx="14" ry="30" />
          <ellipse cx="160" cy="92" rx="26" ry="46" />
          <ellipse cx="160" cy="92" rx="38" ry="60" />
          <path d="M160 32 V152 M132 50 q6 42 0 84 M188 50 q-6 42 0 84" />
        </>
      );
    case 'vanille':
      // Zwei schlanke Vanilleschoten mit Blättchen.
      return (
        <>
          <path d="M118 126 C150 118 188 84 208 58" />
          <path d="M134 134 C166 122 200 94 216 72" />
          <path d="M126 124 l-7 12 M142 132 l-7 12" />
          <path d="M204 54 q14 -8 24 2 q-10 14 -24 -1 z" />
        </>
      );
    case 'ambroxan':
      // Geschliffener Kristall (Amber-Molekül, modern) mit Funkeln.
      return (
        <>
          <path d="M160 50 L198 84 L160 138 L122 84 Z" />
          <path d="M122 84 L160 70 L198 84 M160 70 V138" />
          <path d="M210 54 l4 9 9 4 -9 4 -4 9 -4 -9 -9 -4 9 -4 z" />
        </>
      );
    case 'vetiver':
      // Aufstrebende Grashalme (Wurzelgras) über einer Bodenlinie.
      return (
        <>
          <path d="M160 142 C150 112 150 82 138 56" />
          <path d="M160 142 C158 110 156 80 154 52" />
          <path d="M160 142 C166 110 172 80 180 58" />
          <path d="M160 142 C172 114 186 94 198 74" />
          <path d="M160 142 C148 114 134 94 124 76" />
          <path d="M130 142 H190" />
        </>
      );
    case 'jasmin':
      // Fünfblättrige weiße Blüte.
      return (
        <>
          {flower(5, 'M160 92 C149 72 151 55 160 47 C169 55 171 72 160 92 Z')}
          <circle cx="160" cy="92" r="5" fill="currentColor" stroke="none" />
        </>
      );
    case 'rose':
      // Spiralige Rosenblüte mit angedeuteten äußeren Blättern.
      return (
        <>
          <path d="M160 92 C160 85 170 84 172 91 C175 102 160 110 149 100 C133 87 151 67 173 71 C202 77 200 117 170 129 C136 143 102 110 117 78" />
          <path d="M112 92 C103 80 107 66 120 62 M208 92 C217 80 213 66 200 62" />
          <path d="M134 134 C124 142 110 142 102 134 M186 134 C196 142 210 142 218 134" />
        </>
      );
    default:
      // Schlichter Flakon als allgemeines Motiv.
      return (
        <>
          <path d="M148 60 h24 v10 q14 8 14 30 v34 q0 14 -14 14 h-24 q-14 0 -14 -14 v-34 q0 -22 14 -30 z" />
          <path d="M153 56 h14 v6 h-14 z" />
          <path d="M142 110 h36" />
        </>
      );
  }
}

export default function NoteArt({ slug, className }: { slug: string; className?: string }) {
  const theme = NOTE_THEME[slug] || DEFAULT_THEME;
  const gid = `na-${slug}`;
  return (
    <div className={`note-art${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg viewBox="0 0 320 180" role="presentation" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={theme.from} />
            <stop offset="1" stopColor={theme.to} />
          </linearGradient>
        </defs>
        <rect width="320" height="180" fill={`url(#${gid})`} />
        <circle cx="160" cy="90" r="74" fill="rgba(255,255,255,.26)" />
        <circle cx="36" cy="34" r="3" fill={theme.ink} opacity="0.5" />
        <circle cx="286" cy="150" r="3" fill={theme.ink} opacity="0.5" />
        <g
          transform="translate(0 -2)"
          fill="none"
          stroke={theme.ink}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          color={theme.ink}
        >
          {motif(slug)}
        </g>
      </svg>
    </div>
  );
}
