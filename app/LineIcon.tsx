// Feine Linien-Symbole im Auressa-Stil (statt Emojis). Farbe über `color` bzw. currentColor.
import type { ReactNode } from 'react';

const PATHS: Record<string, ReactNode> = {
  // Duft-Quiz: Kompass
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" />
    </>
  ),
  // Suche / Datenbank
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),
  // Flakon
  bottle: (
    <>
      <path d="M10 3h4v3h-4z" />
      <path d="M9 6h6l2 4v9a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-9l2-4z" />
      <path d="M7 12h10" />
    </>
  ),
  // Dupes: zwei Flakons
  bottles: (
    <>
      <path d="M5.5 7h3v2h-3z" />
      <path d="M5 9h4l1.2 2.5V19a1.5 1.5 0 0 1-1.5 1.5H5.3A1.5 1.5 0 0 1 3.8 19v-7.5L5 9z" />
      <path d="M15.5 4.5h3v2.5h-3z" />
      <path d="M15 7h4l1.5 3v9a1.5 1.5 0 0 1-1.5 1.5h-4a1.5 1.5 0 0 1-1.5-1.5v-9L15 7z" />
    </>
  ),
  // Schweiz: Kreuz im Quadrat
  swiss: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M12 7.5v9M7.5 12h9" />
    </>
  ),
  // Treffer / Match
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" />
    </>
  ),
  // Preis / Sparen
  tag: (
    <>
      <path d="M3.5 12.5V4.5a1 1 0 0 1 1-1h8l8 8-9 9-8-8z" />
      <circle cx="8" cy="8" r="1.3" />
    </>
  ),
  // Geprüft
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.3l2.7 2.7L16 9.7" />
    </>
  ),
  // Geschenk
  gift: (
    <>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5v7.5h14v-7.5M12 8.5v11.5" />
      <path d="M12 8.5C10.5 5 7 5 7.5 7.2 8 8.5 12 8.5 12 8.5zM12 8.5c1.5-3.5 5-3.5 4.5-1.3-.5 1.3-4.5 1.3-4.5 1.3z" />
    </>
  ),
  // Buch / Ratgeber
  book: (
    <>
      <path d="M4 5.5A1.5 1.5 0 0 1 5.5 4H11v15H5.5A1.5 1.5 0 0 0 4 20.5z" />
      <path d="M20 5.5A1.5 1.5 0 0 0 18.5 4H13v15h5.5a1.5 1.5 0 0 1 1.5 1.5z" />
    </>
  ),
  // Funkeln (Hinweis/Highlight)
  sparkle: <path d="M12 3.5l1.8 6.7 6.7 1.8-6.7 1.8L12 20.5l-1.8-6.7L3.5 12l6.7-1.8L12 3.5z" />,
  // Jahreszeiten
  flower: (
    <>
      <circle cx="12" cy="12" r="2.2" />
      <path d="M12 9.8c-1.8-3.6 1.8-6.3 0-6.3s1.8 2.7 0 6.3zM12 14.2c1.8 3.6-1.8 6.3 0 6.3s-1.8-2.7 0-6.3zM9.8 12c-3.6 1.8-6.3-1.8-6.3 0s2.7-1.8 6.3 0zM14.2 12c3.6-1.8 6.3 1.8 6.3 0s-2.7 1.8-6.3 0z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14z" />
      <path d="M5 19l8-8" />
    </>
  ),
  snow: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M10 4.5l2 2 2-2M10 19.5l2-2 2 2" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </>
  )
};

export type LineIconName = keyof typeof PATHS;

export default function LineIcon({ name, size = 28, color, className }: { name: string; size?: number; color?: string; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: color || 'currentColor', flexShrink: 0 }}
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] || PATHS.sparkle}
    </svg>
  );
}

// Passendes Symbol für einen Ratgeber anhand seines Themas (Slug).
export function guideIcon(slug: string): string {
  const s = slug.toLowerCase();
  if (/sommer|zitrus|aquatisch|reise|handgepaeck/.test(s)) return 'sun';
  if (/winter/.test(s)) return 'snow';
  if (/herbst|holz|oud|vegan|nachhaltig/.test(s)) return 'leaf';
  if (/fruehling|blum|hochzeit|erdbeer|romant/.test(s)) return 'flower';
  if (/geschenk/.test(s)) return 'gift';
  if (/dupe|guenstig|alternativ|franken|lattafa|armaf|zara|aventus/.test(s)) return 'tag';
  if (/schweiz/.test(s)) return 'swiss';
  if (/sternzeichen|trend|nische|persoenlich/.test(s)) return 'sparkle';
  if (/haltbar|lange|edt|edp|inhalt|allergen|hauttyp|chemie|fehler|mythen|lager/.test(s)) return 'check';
  if (/kombin|layering|sammlung|kollektion|proben/.test(s)) return 'bottles';
  return 'bottle';
}
