import type { Perfume } from '@/lib/perfumes';

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
  size = 'tile'
}: {
  perfume: Perfume;
  size?: 'tile' | 'hero';
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
  const brand = (perfume.brands?.name || '').toUpperCase();
  // Eindeutige IDs je Duft, damit mehrere SVGs auf einer Seite sich nicht stören.
  const uid = (perfume.slug || perfume.id).replace(/[^a-z0-9-]/gi, '');

  return (
    <div className={`pv pv-${size} pv-${fam}`} role="img" aria-label={`${label} – Auressa-Duftkarte`}>
      <span className="pv-glow pv-glow-a" aria-hidden="true" />
      <span className="pv-glow pv-glow-b" aria-hidden="true" />
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
        </g>
        {/* Glanzlicht */}
        <rect x="22" y="54" width="8" height="90" rx="4" fill="#fff" opacity="0.55" />
        {/* Etikett */}
        <rect x="30" y="98" width="60" height="34" rx="4" fill="#FFFDF8" opacity="0.92" />
        <text x="60" y="113" textAnchor="middle" className="pv-label-brand">
          {brand.length > 14 ? `${brand.slice(0, 13)}…` : brand || 'AURESSA'}
        </text>
        <line x1="44" y1="120" x2="76" y2="120" stroke="#C9A86A" strokeWidth="0.8" />
        <text x="60" y="127" textAnchor="middle" className="pv-label-sub">
          EAU DE PARFUM
        </text>
      </svg>
    </div>
  );
}
