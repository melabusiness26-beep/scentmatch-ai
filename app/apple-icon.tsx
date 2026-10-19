import { ImageResponse } from 'next/og';

// Icon fürs iPhone/iPad, wenn die Seite auf den Startbildschirm gelegt wird
// („Zum Home-Bildschirm"). Next.js liefert diese Datei automatisch als
// apple-touch-icon aus. Goldenes Auressa-Emblem auf dunklem Marken-Verlauf;
// iOS rundet die Ecken selbst ab.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Gleiches Emblem wie im Logo (app/globals.css, .logo::before) – hier in Gold.
const EMBLEM =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#e6c78e' stroke-width='1.6' stroke-linejoin='round' stroke-linecap='round'><path d='M6 18.5 L12 5 L18 18.5 M8.4 13.6 H15.6 M4.8 18.5 H7.4 M16.6 18.5 H19.2'/></svg>"
  );

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5a4131 0%, #3a2a20 48%, #241912 100%)'
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EMBLEM} width={112} height={112} alt="" />
      </div>
    ),
    { ...size }
  );
}
