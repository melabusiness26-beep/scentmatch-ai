import { ImageResponse } from 'next/og';
import { getGuide } from '@/lib/guides';

// Social-Vorschaubild pro Ratgeber-Artikel – zeigt den Artikel-Titel.
// Bessere Klickrate, wenn jemand den Link teilt oder Google ihn anzeigt.
export const alt = 'Auressa Duft-Ratgeber';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  const title = guide?.title ?? 'Duft-Ratgeber';

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
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 10, color: '#d8b277' }}>
          AURESSA
        </div>
        <div style={{ display: 'flex', fontSize: 62, fontWeight: 700, lineHeight: 1.15 }}>
          {title}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: 'rgba(243,233,218,0.85)' }}>
          auressa.ch · Duft-Ratgeber
        </div>
      </div>
    ),
    { ...size }
  );
}
