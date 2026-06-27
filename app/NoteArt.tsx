import type { ReactNode } from 'react';

// Eigene, hauseigene Illustrationen für die Duftnoten ("Variante A": rechtssicher,
// selbst erstellt, laden lokal – keine fremden Fotos, kein externer Server).
// Jede Note bekommt eine zarte Farbfläche (zwei Gradient-Stops) im Auressa-Stil
// und ein goldenes Strich-Motiv, das die jeweilige Zutat klar erkennbar zeigt.

type Theme = { from: string; to: string; ink: string };

const NOTE_THEME: Record<string, Theme> = {
  bergamotte: { from: '#eef0d6', to: '#dde1ba', ink: '#8f7a3c' },
  iris: { from: '#efe9f1', to: '#ddd5e2', ink: '#7d6f8c' },
  oud: { from: '#d9c5a7', to: '#b69870', ink: '#6f5435' },
  vanille: { from: '#f6ecd6', to: '#eedcb8', ink: '#a07c43' },
  ambroxan: { from: '#f3e4c9', to: '#e7d0a4', ink: '#9c7b40' },
  vetiver: { from: '#e4e7cf', to: '#cdd2ab', ink: '#6f7a44' },
  jasmin: { from: '#f8f2e9', to: '#ece0d1', ink: '#9a8264' },
  rose: { from: '#f4ddd8', to: '#e8c3bc', ink: '#a85f59' }
};

const DEFAULT_THEME: Theme = { from: '#f3ead7', to: '#e3d3ac', ink: '#a07c43' };

// Eine Blüte: ein Blütenblatt wird mehrfach um (cx,cy) gedreht. Liefert die
// Blütenblätter; den Mittelpunkt setzt der Aufrufer separat.
function petals(cx: number, cy: number, r: number, count: number, key: string): ReactNode {
  const w = r * 0.36;
  const petal = `M${cx} ${cy} C${cx - w} ${cy - r * 0.5} ${cx - w} ${cy - r} ${cx} ${cy - r} C${cx + w} ${cy - r} ${cx + w} ${cy - r * 0.5} ${cx} ${cy} Z`;
  const step = 360 / count;
  return Array.from({ length: count }).map((_, i) => (
    <path key={`${key}-${i}`} d={petal} transform={`rotate(${i * step} ${cx} ${cy})`} />
  ));
}

// Kleines Funkeln (Vier-Zack-Stern).
function sparkle(x: number, y: number, s: number, key: string): ReactNode {
  const a = s * 0.2;
  return (
    <path
      key={key}
      d={`M${x} ${y - s} Q${x + a} ${y - a} ${x + s} ${y} Q${x + a} ${y + a} ${x} ${y + s} Q${x - a} ${y + a} ${x - s} ${y} Q${x - a} ${y - a} ${x} ${y - s} Z`}
    />
  );
}

function motif(slug: string): ReactNode {
  switch (slug) {
    case 'bergamotte':
      // Ganze Zitrusfrucht mit Blatt und feinen Schalen-Pünktchen.
      return (
        <>
          <circle cx="150" cy="100" r="40" />
          <path d="M150 60 q3 -9 12 -11" />
          <path d="M164 47 c18 -11 36 -3 44 9 c-17 13 -36 9 -45 -2 c-2 -3 -1 -5 1 -7 z" />
          <path d="M176 51 q10 6 26 9" />
          <circle cx="138" cy="92" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="158" cy="108" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="146" cy="118" r="2.4" fill="currentColor" stroke="none" />
          <circle cx="166" cy="90" r="2.4" fill="currentColor" stroke="none" />
        </>
      );
    case 'iris':
      // Schwertlilie als elegante Lilien-/Fleur-de-Lis-Blüte.
      return (
        <>
          <path d="M160 132 C159 100 156 72 160 46 C164 72 161 100 161 132 Z" />
          <path d="M160 92 C139 76 118 84 122 106 C135 101 150 102 160 112" />
          <path d="M160 92 C181 76 202 84 198 106 C185 101 170 102 160 112" />
          <path d="M134 110 C150 118 170 118 186 110" />
          <path d="M160 132 C151 142 138 144 131 137 M160 132 C169 142 182 144 189 137" />
        </>
      );
    case 'oud':
      // Stück Agarholz mit aufsteigenden Rauchschwaden (Räucher-Oud).
      return (
        <>
          <path d="M128 130 L150 121 L192 127 L188 146 L134 148 Z" />
          <path d="M150 121 L186 127 M138 134 L184 138" />
          <path d="M158 118 C147 104 169 95 158 80 C149 68 167 58 157 44" />
          <path d="M180 124 C173 112 188 105 180 92 C174 83 186 76 179 66" />
        </>
      );
    case 'vanille':
      // Vanille-Orchidee mit zwei schlanken Schoten.
      return (
        <>
          <path d="M112 132 C146 124 182 96 206 66 C211 73 210 82 203 88 C178 110 146 132 118 142 Z" />
          <path d="M128 142 C158 132 190 108 212 82" />
          {petals(196, 66, 17, 5, 'va')}
          <circle cx="196" cy="66" r="3" fill="currentColor" stroke="none" />
        </>
      );
    case 'ambroxan':
      // Amber-Edelstein (warmes Bernstein-Molekül) mit Glanz und Funkeln.
      return (
        <>
          <ellipse cx="158" cy="96" rx="34" ry="44" />
          <path d="M140 70 C132 86 132 106 142 122" />
          <path d="M176 74 C184 88 184 104 176 120" />
          <circle cx="158" cy="96" r="4" fill="currentColor" stroke="none" />
          {sparkle(204, 58, 9, 'a1')}
          {sparkle(120, 64, 6, 'a2')}
        </>
      );
    case 'vetiver':
      // Vetivergras mit Halmen oben und Wurzeln unten (Wurzelgras).
      return (
        <>
          <path d="M160 96 C150 74 150 58 140 42" />
          <path d="M160 96 C158 72 156 56 154 40" />
          <path d="M160 96 C166 72 172 56 180 44" />
          <path d="M160 96 C172 76 184 62 196 52" />
          <path d="M160 96 C148 76 136 62 126 54" />
          <path d="M132 98 H188" />
          <path d="M150 98 C146 116 142 128 136 142" />
          <path d="M160 98 C160 118 160 132 160 148" />
          <path d="M170 98 C174 116 178 128 184 142" />
          <path d="M160 120 C153 124 148 130 145 138 M160 126 C167 130 172 136 175 144" />
        </>
      );
    case 'jasmin':
      // Jasmin-Zweig: zwei weiße Blüten, eine Knospe und ein Blatt.
      return (
        <>
          <path d="M116 142 C146 132 166 112 178 80" />
          {petals(176, 78, 18, 5, 'j1')}
          <circle cx="176" cy="78" r="3" fill="currentColor" stroke="none" />
          {petals(130, 124, 12, 5, 'j2')}
          <circle cx="130" cy="124" r="2.2" fill="currentColor" stroke="none" />
          <path d="M192 60 C198 52 206 52 210 60 C206 68 198 68 192 60 Z" />
          <path d="M150 116 C160 108 172 110 178 120 C166 124 154 122 150 116 Z" />
        </>
      );
    case 'rose':
      // Volle Rosenblüte mit gedrehten Blütenblättern, Stiel und Blatt.
      return (
        <>
          <path d="M160 86 C160 80 168 79 170 85 C173 94 161 100 153 93 C142 83 156 68 173 72 C195 77 194 105 171 114 C143 125 116 99 129 73" />
          <path d="M120 90 C108 78 112 60 128 56" />
          <path d="M200 90 C212 78 208 60 192 56" />
          <path d="M132 122 C120 130 106 128 100 118" />
          <path d="M188 122 C200 130 214 128 220 118" />
          <path d="M160 120 V152" />
          <path d="M160 138 C172 132 184 136 190 148 C176 152 164 148 160 138 Z" />
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
        <circle cx="160" cy="90" r="76" fill="rgba(255,255,255,.28)" />
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
