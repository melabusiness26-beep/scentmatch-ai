import { ImageResponse } from 'next/og';
import { getMood } from '@/lib/perfumes';

// Social-Vorschaubild pro Stimmung – zeigt Stimmung + Akzentfarbe.
// Sorgt beim Teilen (TikTok, Instagram, WhatsApp) für edle, klickstarke Vorschauen.
export const alt = 'Auressa · Duft nach Stimmung';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ mood: string }> }) {
  const { mood: code } = await params;
  const mood = getMood(code);
  const title = mood?.title ?? 'Duft nach Stimmung';
  const subtitle = mood?.subtitle ?? 'Finde deinen Signature-Duft';
  const tone = mood?.tone ?? '#d8b277';

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
          padding: 80
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 30, letterSpacing: 10, color: '#d8b277' }}>
            AURESSA
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              padding: '10px 24px',
              borderRadius: 999,
              background: tone,
              color: '#241912',
              fontFamily: 'sans-serif',
              letterSpacing: 2
            }}
          >
            DUFT NACH STIMMUNG
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 1.1, color: tone }}>
            {title}
          </div>
          <div style={{ display: 'flex', fontSize: 38, marginTop: 18, color: 'rgba(243,233,218,0.9)' }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(243,233,218,0.8)' }}>
          auressa.ch · finde deinen Duft nach Gefühl
        </div>
      </div>
    ),
    { ...size }
  );
}
