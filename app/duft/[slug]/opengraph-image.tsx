import { ImageResponse } from 'next/og';
import { concentrationLabel, getPerfumeBySlug } from '@/lib/perfumes';
import { computeAuressaScore } from '@/lib/score';

// Social-Vorschaubild pro Duft – erscheint, wenn jemand den Link teilt
// (WhatsApp, Pinterest, Instagram, Facebook). Nur echte Duftdaten.
export const alt = 'Auressa · Duftprofil';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const revalidate = 3600;

const FAMILY: Record<string, string> = {
  clean: 'Clean / Frisch',
  gourmand: 'Gourmand / Süss',
  woody: 'Woody / Holzig',
  floral: 'Floral / Blumig'
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  const name = perfume?.perfume_name ?? 'Duftprofil';
  const brand = (perfume?.brands?.name ?? '').toUpperCase();
  const facts = [
    perfume?.fragrance_family ? FAMILY[perfume.fragrance_family] : null,
    concentrationLabel(perfume?.concentration),
    perfume?.price_chf != null ? `ca. CHF ${perfume.price_chf}` : null
  ].filter(Boolean) as string[];
  const notes = (perfume?.top_notes || []).slice(0, 4);
  const score = perfume ? computeAuressaScore(perfume).total : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #5a4131 0%, #3a2a20 48%, #241912 100%)',
          color: '#fbf3e6',
          fontFamily: 'serif',
          padding: 72
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 10, color: '#d8b277' }}>AURESSA</div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              padding: '10px 24px',
              borderRadius: 999,
              border: '2px solid #d8b277',
              color: '#d8b277',
              fontFamily: 'sans-serif',
              letterSpacing: 2
            }}
          >
            DUFTPROFIL
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 820 }}>
            {brand && (
              <div style={{ display: 'flex', fontSize: 28, letterSpacing: 6, color: '#d8b277', fontFamily: 'sans-serif' }}>
                {brand}
              </div>
            )}
            <div style={{ display: 'flex', fontSize: name.length > 26 ? 70 : 88, fontWeight: 700, lineHeight: 1.05, marginTop: 10 }}>
              {name}
            </div>
            {facts.length > 0 && (
              <div style={{ display: 'flex', fontSize: 30, marginTop: 22, color: 'rgba(243,233,218,0.9)', fontFamily: 'sans-serif' }}>
                {facts.join('  ·  ')}
              </div>
            )}
          </div>
          {score != null && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: 170,
                height: 170,
                borderRadius: 999,
                border: '6px solid #d8b277',
                fontFamily: 'sans-serif'
              }}
            >
              <div style={{ display: 'flex', fontSize: 64, fontWeight: 700, color: '#fbf3e6' }}>{score}</div>
              <div style={{ display: 'flex', fontSize: 18, letterSpacing: 3, color: '#d8b277' }}>SCORE</div>
            </div>
          )}
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(243,233,218,0.8)', fontFamily: 'sans-serif' }}>
          {notes.length > 0 ? `Kopfnoten: ${notes.join(', ')}` : 'auressa.ch · finde deinen Duft'}
        </div>
      </div>
    ),
    { ...size }
  );
}
