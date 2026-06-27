import type { ReactNode } from 'react';
import { getScentNote } from '@/lib/notes-glossary';

// Hauseigene Duftnoten-Illustrationen im Stil edler botanischer Apotheker-Tafeln
// ("Variante A": rechtssicher, selbst erstellt, laden lokal – keine Fremdfotos).
// Design-Prinzip: EINE ruhige Pergament-Fläche für alle Karten (Kollektions-Look),
// feine Gold-Tusche, ein dezenter Etiketten-Rahmen und ein zarter Farbschimmer,
// der die jeweilige Note nur andeutet – statt acht bunter Kästchen.

const INK = '#9a7838';
const INK_SOFT = '#b29257';

// Nur ein zarter Schimmer hinter dem Motiv deutet die Note farblich an.
const NOTE_GLOW: Record<string, string> = {
  bergamotte: '#c7cf86',
  iris: '#c2b4d6',
  oud: '#caa977',
  vanille: '#e7c486',
  ambroxan: '#e4bd7a',
  vetiver: '#aebb84',
  jasmin: '#ead9c0',
  rose: '#e3a59c'
};

const DEFAULT_GLOW = '#e2c894';

// Ein Blütenblatt mehrfach um (cx,cy) gedreht ergibt eine Blüte.
function petals(cx: number, cy: number, r: number, count: number, key: string): ReactNode {
  const w = r * 0.36;
  const petal = `M${cx} ${cy} C${cx - w} ${cy - r * 0.5} ${cx - w} ${cy - r} ${cx} ${cy - r} C${cx + w} ${cy - r} ${cx + w} ${cy - r * 0.5} ${cx} ${cy} Z`;
  const step = 360 / count;
  return Array.from({ length: count }).map((_, i) => (
    <path key={`${key}-${i}`} d={petal} transform={`rotate(${i * step} ${cx} ${cy})`} />
  ));
}

function sparkle(x: number, y: number, s: number, key: string): ReactNode {
  const a = s * 0.2;
  return (
    <path
      key={key}
      d={`M${x} ${y - s} Q${x + a} ${y - a} ${x + s} ${y} Q${x + a} ${y + a} ${x} ${y + s} Q${x - a} ${y + a} ${x - s} ${y} Q${x - a} ${y - a} ${x} ${y - s} Z`}
    />
  );
}

// Hauptlinien (kräftiger) je Note.
function motif(slug: string): ReactNode {
  switch (slug) {
    case 'bergamotte':
      return (
        <>
          <circle cx="150" cy="100" r="40" />
          <path d="M150 60 q3 -9 12 -11" />
          <path d="M164 47 c18 -11 36 -3 44 9 c-17 13 -36 9 -45 -2 c-2 -3 -1 -5 1 -7 z" />
        </>
      );
    case 'iris':
      return (
        <>
          <path d="M160 132 C159 100 156 72 160 46 C164 72 161 100 161 132 Z" />
          <path d="M160 92 C139 76 118 84 122 106 C135 101 150 102 160 112" />
          <path d="M160 92 C181 76 202 84 198 106 C185 101 170 102 160 112" />
          <path d="M160 132 C151 142 138 144 131 137 M160 132 C169 142 182 144 189 137" />
        </>
      );
    case 'oud':
      return (
        <>
          <path d="M128 130 L150 121 L192 127 L188 146 L134 148 Z" />
          <path d="M158 118 C147 104 169 95 158 80 C149 68 167 58 157 44" />
          <path d="M180 124 C173 112 188 105 180 92 C174 83 186 76 179 66" />
        </>
      );
    case 'vanille':
      return (
        <>
          <path d="M112 132 C146 124 182 96 206 66 C211 73 210 82 203 88 C178 110 146 132 118 142 Z" />
          {petals(196, 66, 17, 5, 'va')}
          <circle cx="196" cy="66" r="3" fill={INK} stroke="none" />
        </>
      );
    case 'ambroxan':
      return (
        <>
          <ellipse cx="158" cy="96" rx="34" ry="44" />
          <circle cx="158" cy="96" r="4" fill={INK} stroke="none" />
          {sparkle(204, 58, 9, 'a1')}
          {sparkle(120, 64, 6, 'a2')}
        </>
      );
    case 'vetiver':
      return (
        <>
          <path d="M160 96 C150 74 150 58 140 42" />
          <path d="M160 96 C158 72 156 56 154 40" />
          <path d="M160 96 C166 72 172 56 180 44" />
          <path d="M160 96 C172 76 184 62 196 52" />
          <path d="M160 96 C148 76 136 62 126 54" />
          <path d="M150 98 C146 116 142 128 136 142" />
          <path d="M160 98 C160 118 160 132 160 148" />
          <path d="M170 98 C174 116 178 128 184 142" />
        </>
      );
    case 'jasmin':
      return (
        <>
          <path d="M116 142 C146 132 166 112 178 80" />
          {petals(176, 78, 18, 5, 'j1')}
          <circle cx="176" cy="78" r="3" fill={INK} stroke="none" />
          {petals(130, 124, 12, 5, 'j2')}
          <circle cx="130" cy="124" r="2.2" fill={INK} stroke="none" />
          <path d="M192 60 C198 52 206 52 210 60 C206 68 198 68 192 60 Z" />
        </>
      );
    case 'rose':
      return (
        <>
          <path d="M160 86 C160 80 168 79 170 85 C173 94 161 100 153 93 C142 83 156 68 173 72 C195 77 194 105 171 114 C143 125 116 99 129 73" />
          <path d="M120 90 C108 78 112 60 128 56" />
          <path d="M200 90 C212 78 208 60 192 56" />
          <path d="M160 120 V152" />
          <path d="M160 138 C172 132 184 136 190 148 C176 152 164 148 160 138 Z" />
        </>
      );
    default:
      return (
        <>
          <path d="M148 60 h24 v10 q14 8 14 30 v34 q0 14 -14 14 h-24 q-14 0 -14 -14 v-34 q0 -22 14 -30 z" />
          <path d="M142 110 h36" />
        </>
      );
  }
}

// Feinere Detail-/Schraffur-Linien je Note (dünner gezeichnet, geben Tiefe).
function detail(slug: string): ReactNode {
  switch (slug) {
    case 'bergamotte':
      return (
        <>
          <path d="M176 51 q10 6 26 9" />
          <path d="M150 64 C138 76 138 124 150 136 M150 64 C162 76 162 124 150 136" />
        </>
      );
    case 'iris':
      return <path d="M134 110 C150 118 170 118 186 110 M160 60 V120" />;
    case 'oud':
      return <path d="M150 121 L186 127 M138 134 L184 138 M144 128 L182 132" />;
    case 'vanille':
      return <path d="M128 142 C158 132 190 108 212 82 M150 116 L146 126 M168 100 L164 110" />;
    case 'ambroxan':
      return (
        <>
          <path d="M140 70 C132 86 132 106 142 122" />
          <path d="M176 74 C184 88 184 104 176 120" />
          <path d="M150 80 C146 92 147 104 152 114" />
        </>
      );
    case 'vetiver':
      return (
        <>
          <path d="M132 98 H188" />
          <path d="M160 120 C153 124 148 130 145 138 M160 126 C167 130 172 136 175 144" />
        </>
      );
    case 'jasmin':
      return <path d="M150 116 C160 108 172 110 178 120 C166 124 154 122 150 116 Z" />;
    case 'rose':
      return (
        <>
          <path d="M132 122 C120 130 106 128 100 118" />
          <path d="M188 122 C200 130 214 128 220 118" />
        </>
      );
    default:
      return <path d="M153 56 h14 v6 h-14 z" />;
  }
}

export default function NoteArt({ slug, className }: { slug: string; className?: string }) {
  // Ist für die Note ein echtes Foto hinterlegt, zeigen wir es (im gleichen
  // Etiketten-Rahmen). Sonst greift automatisch die Illustration.
  const photo = getScentNote(slug)?.photo;
  if (photo) {
    return (
      <div className={`note-art note-art--photo${className ? ` ${className}` : ''}`} aria-hidden="true">
        <img className="note-art-img" src={photo} alt="" loading="lazy" decoding="async" />
        <span className="note-art-frame" />
      </div>
    );
  }

  const glow = NOTE_GLOW[slug] || DEFAULT_GLOW;
  const bg = `na-bg-${slug}`;
  const halo = `na-halo-${slug}`;
  const sh = `na-sh-${slug}`;
  return (
    <div className={`note-art${className ? ` ${className}` : ''}`} aria-hidden="true">
      <svg viewBox="0 0 320 180" role="presentation" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8f1e3" />
            <stop offset="1" stopColor="#ecddc6" />
          </linearGradient>
          <radialGradient id={halo} cx="0.5" cy="0.46" r="0.6">
            <stop offset="0" stopColor={glow} stopOpacity="0.32" />
            <stop offset="0.55" stopColor={glow} stopOpacity="0.1" />
            <stop offset="1" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          <filter id={sh} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1.2" stdDeviation="1.3" floodColor="#5a4131" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Pergament-Fläche + zarter Farbschimmer der Note */}
        <rect width="320" height="180" fill={`url(#${bg})`} />
        <ellipse cx="160" cy="82" rx="78" ry="60" fill={`url(#${halo})`} />

        {/* Feiner Etiketten-Rahmen mit Eck-Strichen */}
        <g fill="none" stroke={INK} strokeOpacity="0.42" strokeWidth="1">
          <rect x="10" y="10" width="300" height="160" rx="14" />
          <path d="M22 14 H14 V22 M298 14 H306 V22 M22 166 H14 V158 M298 166 H306 V158" strokeOpacity="0.6" />
        </g>

        {/* Illustration: kräftige Hauptlinien + feine Details, mit weichem Schatten */}
        <g filter={`url(#${sh})`} transform="translate(0 -3)">
          <g fill="none" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            {motif(slug)}
          </g>
          <g fill="none" stroke={INK_SOFT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
            {detail(slug)}
          </g>
        </g>
      </svg>
    </div>
  );
}
