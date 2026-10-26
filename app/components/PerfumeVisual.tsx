import { concentrationLabel, type Perfume } from '@/lib/perfumes';

// Eigene Auressa-Duftkarte: Farbwelt je Duftfamilie + gezeichneter Flakon.
// Wird gezeigt, solange kein echtes (lizenziertes) Produktbild in image_url
// hinterlegt ist. Keine fremden Flakons oder Logos – bewusst neutral.

const FAMILY_TINT: Record<string, { glass: string; liquid: string }> = {
  clean: { glass: '#E6F2F6', liquid: '#8EC3D6' },
  gourmand: { glass: '#F6E8DC', liquid: '#D29A6C' },
  woody: { glass: '#EFE5D8', liquid: '#A07A52' },
  floral: { glass: '#F7E6EE', liquid: '#D59AB8' }
};
const DEFAULT_TINT = { glass: '#F1ECE4', liquid: '#C9A86A' };

export function PerfumeVisual({
  perfume,
  size = 'tile',
  noteImages = {}
}: {
  perfume: Perfume;
  size?: 'tile' | 'hero';
  /** Optional: Fotos zu Duftnoten (Name → Bild), nur für die grosse Ansicht. */
  noteImages?: Record<string, string>;
}) {
  const fam = perfume.fragrance_family || '';
  const label = `${perfume.perfume_name}${perfume.brands?.name ? ` von ${perfume.brands.name}` : ''}`;

  if (perfume.image_url) {
    return (
      <div className={`pv pv-${size} pv-${fam} pv-has-image`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="pv-img" src={perfume.image_url} alt={`${label} – Duftflakon`} loading="lazy" />
      </div>
    );
  }

  const tint = FAMILY_TINT[fam] || DEFAULT_TINT;
  const brand = (perfume.brands?.name || '').toUpperCase() || 'AURESSA';
  // Lange Markennamen kleiner setzen statt abschneiden.
  const brandSize = brand.length <= 10 ? 7 : brand.length <= 14 ? 5.6 : 4.6;
  const brandText = brand.length > 20 ? `${brand.slice(0, 19)}…` : brand;
  const sub = concentrationLabel(perfume.concentration)?.toUpperCase();
  // Für die grosse Ansicht: bis zu 4 Noten, die sanft um den Flakon schweben.
  const floatingNotes = [...(perfume.top_notes || []), ...(perfume.heart_notes || []), ...(perfume.base_notes || [])]
    .filter((n, i, all) => all.indexOf(n) === i)
    .slice(0, 4);
  // Eindeutige IDs je Duft, damit mehrere SVGs auf einer Seite sich nicht stören.
  const uid = (perfume.slug || perfume.id).replace(/[^a-z0-9-]/gi, '');

  return (
    <div className={`pv pv-${size} pv-${fam}`} role="img" aria-label={`${label} – Auressa-Duftkarte`}>
      <span className="pv-glow pv-glow-a" aria-hidden="true" />
      <span className="pv-glow pv-glow-b" aria-hidden="true" />
      {size === 'hero' &&
        floatingNotes.map((note, i) => (
          <span className={`pv-note pv-note-${i}`} key={note} aria-hidden="true">
            {noteImages[note] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={noteImages[note]} alt="" />
            )}
            {note}
          </span>
        ))}
      <svg className="pv-flacon" viewBox="0 0 120 170" aria-hidden="true">
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="1" stopColor={tint.glass} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id={`l-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={tint.liquid} stopOpacity="0.55" />
            <stop offset="1" stopColor={tint.liquid} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`c-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#B8923A" />
            <stop offset="0.5" stopColor="#F1D58A" />
            <stop offset="1" stopColor="#B8923A" />
          </linearGradient>
          <clipPath id={`b-${uid}`}>
            <rect x="14" y="44" width="92" height="118" rx="20" />
          </clipPath>
        </defs>
        {/* Verschluss */}
        <rect x="40" y="6" width="40" height="26" rx="6" fill={`url(#c-${uid})`} />
        <rect x="50" y="30" width="20" height="16" rx="3" fill={`url(#c-${uid})`} opacity="0.85" />
        {/* Glaskörper */}
        <rect x="14" y="44" width="92" height="118" rx="20" fill={`url(#g-${uid})`} stroke="rgba(120,96,60,.28)" strokeWidth="1.2" />
        <g clipPath={`url(#b-${uid})`}>
          <path className="pv-liquid" d="M0 92 Q30 84 60 92 T120 92 V170 H0 Z" fill={`url(#l-${uid})`} />
          <g className="pv-shine">
            <rect x="-40" y="30" width="26" height="160" fill="#fff" opacity="0.45" transform="skewX(-18)" />
          </g>
        </g>
        {/* Glanzlicht */}
        <rect x="22" y="54" width="8" height="90" rx="4" fill="#fff" opacity="0.55" />
        {/* Etikett */}
        <rect x="26" y="98" width="68" height="34" rx="4" fill="#FFFDF8" opacity="0.92" />
        <text x="60" y={sub ? 113 : 117} textAnchor="middle" className="pv-label-brand" style={{ fontSize: brandSize }}>
          {brandText}
        </text>
        {sub && (
          <>
            <line x1="44" y1="120" x2="76" y2="120" stroke="#C9A86A" strokeWidth="0.8" />
            <text x="60" y="127" textAnchor="middle" className="pv-label-sub">
              {sub}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
