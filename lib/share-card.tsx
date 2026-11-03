// Teilen-Bilder pro Duft (Link-Vorschau, Pinterest-Pin, Instagram-Story) – alle aus
// demselben Baukasten, damit sie gleich aussehen wie die Duft-Seite: Farbwelt der
// Duftfamilie, gezeichneter Flakon (keine fremden Fotos/Logos), nur echte Duftdaten.
import { concentrationLabel, type Perfume } from './perfumes';
import { formatChf } from './price';

export type CardFormat = 'og' | 'pin' | 'story';

export const CARD_SIZES: Record<CardFormat, { width: number; height: number }> = {
  og: { width: 1200, height: 630 },
  pin: { width: 1000, height: 1500 },
  story: { width: 1080, height: 1920 }
};

type Tint = { bg1: string; bg2: string; glass: string; liquid: string; accent: string };

const TINTS: Record<string, Tint> = {
  clean: { bg1: '#F4FAFC', bg2: '#C9E2EC', glass: '#E6F2F6', liquid: '#8EC3D6', accent: '#3E7F98' },
  gourmand: { bg1: '#FCF5EE', bg2: '#E9C9AB', glass: '#F6E8DC', liquid: '#D29A6C', accent: '#9A5F33' },
  woody: { bg1: '#F8F2EA', bg2: '#D8C3A3', glass: '#EFE5D8', liquid: '#A07A52', accent: '#6F4F31' },
  floral: { bg1: '#FDF5F8', bg2: '#EBC6D8', glass: '#F7E6EE', liquid: '#D59AB8', accent: '#A04F78' }
};
const DEFAULT_TINT: Tint = { bg1: '#FBF8F3', bg2: '#E6D7BE', glass: '#F1ECE4', liquid: '#C9A86A', accent: '#8A6A2E' };

const FAMILY: Record<string, string> = {
  clean: 'Frisch',
  gourmand: 'Süss',
  woody: 'Holzig',
  floral: 'Blumig'
};

const INK = '#1F1712';
const INK_SOFT = '#4A3A2E';
const GOLD = '#B8923A';

export type CardData = {
  perfume: Perfume;
  score: number | null;
  /** z. B. „Notino“ – dann „CHF 75.90 bei Notino“. */
  shop: string | null;
};

function Bottle({ tint, brand, sub, scale }: { tint: Tint; brand: string; sub: string; scale: number }) {
  const s = (n: number) => Math.round(n * scale);
  const brandText = brand.length > 18 ? `${brand.slice(0, 17)}…` : brand;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Deckel */}
      <div
        style={{
          display: 'flex',
          width: s(78),
          height: s(62),
          borderRadius: s(10),
          background: 'linear-gradient(90deg, #A9832F 0%, #F1D58A 50%, #A9832F 100%)',
          boxShadow: `0 ${s(4)}px ${s(10)}px rgba(31,23,18,0.18)`
        }}
      />
      {/* Hals */}
      <div style={{ display: 'flex', width: s(40), height: s(18), background: 'linear-gradient(90deg, #B8923A, #E8C873, #B8923A)' }} />
      {/* Glas */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: s(230),
          height: s(270),
          borderRadius: s(44),
          overflow: 'hidden',
          background: `linear-gradient(140deg, #FFFFFF 0%, ${tint.glass} 100%)`,
          border: `${s(3)}px solid rgba(255,255,255,0.9)`,
          boxShadow: `0 ${s(30)}px ${s(60)}px rgba(31,23,18,0.22)`
        }}
      >
        {/* Füllung */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: '62%',
            display: 'flex',
            background: `linear-gradient(180deg, ${tint.liquid}99 0%, ${tint.liquid} 100%)`
          }}
        />
        {/* Glanz */}
        <div
          style={{
            position: 'absolute',
            left: s(22),
            top: s(26),
            width: s(16),
            height: s(200),
            borderRadius: s(10),
            display: 'flex',
            background: 'rgba(255,255,255,0.55)'
          }}
        />
        {/* Etikett */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: `${s(14)}px ${s(18)}px`,
            minWidth: s(140),
            borderRadius: s(8),
            background: 'rgba(255,255,255,0.94)',
            boxShadow: `0 ${s(4)}px ${s(12)}px rgba(31,23,18,0.08)`
          }}
        >
          <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: s(brandText.length > 12 ? 13 : 16), letterSpacing: s(3), color: INK }}>
            {brandText}
          </div>
          <div style={{ display: 'flex', width: s(46), height: s(2), margin: `${s(7)}px 0`, background: GOLD }} />
          <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: s(9), letterSpacing: s(2.5), color: INK_SOFT }}>{sub}</div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children, size }: { children: string; size: number }) {
  return (
    <div
      style={{
        display: 'flex',
        padding: `${Math.round(size * 0.45)}px ${Math.round(size * 0.9)}px`,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.82)',
        border: '1px solid rgba(31,23,18,0.08)',
        fontFamily: 'Inter',
        fontSize: size,
        color: INK
      }}
    >
      {children}
    </div>
  );
}

function ScoreRing({ score, size }: { score: number; size: number }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: 999,
        background: 'rgba(255,255,255,0.88)',
        border: `${Math.round(size * 0.05)}px solid ${GOLD}`
      }}
    >
      <div style={{ display: 'flex', fontFamily: 'Playfair', fontSize: Math.round(size * 0.38), color: INK, lineHeight: 1 }}>{score}</div>
      <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: Math.round(size * 0.1), letterSpacing: 2, color: INK_SOFT, marginTop: 4 }}>
        SCORE
      </div>
    </div>
  );
}

export function ShareCard({ data, format }: { data: CardData; format: CardFormat }) {
  const { perfume, score, shop } = data;
  const tint = TINTS[perfume.fragrance_family || ''] || DEFAULT_TINT;
  const brand = (perfume.brands?.name || '').toUpperCase();
  const name = perfume.perfume_name || 'Duftprofil';
  const conc = concentrationLabel(perfume.concentration) || '';
  const family = FAMILY[perfume.fragrance_family || ''];
  const notes = [...(perfume.top_notes || []), ...(perfume.heart_notes || []), ...(perfume.base_notes || [])]
    .filter((n, i, all) => n && all.indexOf(n) === i)
    .slice(0, format === 'og' ? 3 : 5);
  const price =
    perfume.price_chf != null
      ? `${shop ? '' : 'ca. '}CHF ${formatChf(perfume.price_chf)}${perfume.volume_ml ? ` · ${perfume.volume_ml} ml` : ''}${shop ? ` bei ${shop}` : ''}`
      : null;
  const meta = [conc, family, perfume.season].filter(Boolean).join('  ·  ');
  const { width, height } = CARD_SIZES[format];
  const vertical = format !== 'og';
  const k = vertical ? width / 1000 : 1;
  const nameSize = vertical ? Math.round((name.length > 24 ? 74 : 92) * k) : name.length > 26 ? 56 : 70;

  const background = `linear-gradient(150deg, ${tint.bg1} 0%, ${tint.bg2} 100%)`;

  const wordmark = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: Math.round(46 * k),
          height: Math.round(46 * k),
          borderRadius: Math.round(12 * k),
          background: 'linear-gradient(135deg, #E8C873, #B8923A)',
          fontFamily: 'Playfair',
          fontSize: Math.round(28 * k),
          color: INK
        }}
      >
        A
      </div>
      <div style={{ display: 'flex', fontFamily: 'Playfair', fontSize: Math.round(34 * k), color: INK }}>Auressa</div>
    </div>
  );

  const textBlock = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: vertical ? 'center' : 'flex-start', textAlign: vertical ? 'center' : 'left' }}>
      {brand && (
        <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: Math.round(24 * k), letterSpacing: 6, color: tint.accent }}>{brand}</div>
      )}
      <div
        style={{
          display: 'flex',
          fontFamily: 'Playfair',
          fontSize: nameSize,
          lineHeight: 1.05,
          color: INK,
          marginTop: Math.round(10 * k),
          maxWidth: vertical ? Math.round(880 * k) : 640,
          justifyContent: vertical ? 'center' : 'flex-start',
          textAlign: vertical ? 'center' : 'left'
        }}
      >
        {name}
      </div>
      {meta && (
        <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: Math.round(24 * k), color: INK_SOFT, marginTop: Math.round(14 * k) }}>{meta}</div>
      )}
      {notes.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: Math.round(10 * k),
            marginTop: Math.round(22 * k),
            justifyContent: vertical ? 'center' : 'flex-start',
            maxWidth: vertical ? Math.round(860 * k) : 640
          }}
        >
          {notes.map((n) => (
            <Pill key={n} size={Math.round(22 * k)}>
              {n}
            </Pill>
          ))}
        </div>
      )}
    </div>
  );

  const priceBlock = price ? (
    <div
      style={{
        display: 'flex',
        padding: `${Math.round(14 * k)}px ${Math.round(24 * k)}px`,
        borderRadius: Math.round(16 * k),
        background: INK,
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontSize: Math.round((vertical ? 26 : 24) * k),
        whiteSpace: 'nowrap'
      }}
    >
      {price}
    </div>
  ) : null;

  const footer = (
    <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: Math.round(22 * k), letterSpacing: 1, color: INK_SOFT }}>
      auressa.ch · Finde deinen Duft
    </div>
  );

  if (!vertical) {
    return (
      <div style={{ width, height, display: 'flex', background, padding: 56 }}>
        <div style={{ display: 'flex', width: 360, alignItems: 'center', justifyContent: 'center' }}>
          <Bottle tint={tint} brand={brand || 'AURESSA'} sub={(conc || '').toUpperCase()} scale={1.25} />
        </div>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'space-between', paddingLeft: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {wordmark}
            {score != null && <ScoreRing score={score} size={112} />}
          </div>
          {textBlock}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {priceBlock || <div style={{ display: 'flex' }} />}
            <div style={{ display: 'flex', fontFamily: 'Inter', fontSize: 22, color: INK_SOFT }}>auressa.ch</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        background,
        padding: `${Math.round((format === 'story' ? 120 : 70) * k)}px ${Math.round(70 * k)}px`
      }}
    >
      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        {wordmark}
        {score != null && <ScoreRing score={score} size={Math.round(120 * k)} />}
      </div>
      <Bottle tint={tint} brand={brand || 'AURESSA'} sub={(conc || '').toUpperCase()} scale={(format === 'story' ? 1.7 : 1.45) * k} />
      {textBlock}
      {priceBlock}
      {footer}
    </div>
  );
}
