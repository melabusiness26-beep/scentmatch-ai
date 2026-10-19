import { ImageResponse } from 'next/og';

// Favicon (Browser-Tab, Lesezeichen). Next.js nutzt diese Datei automatisch als
// Website-Icon. Zeigt das goldene Auressa-Flakon-/Gipfel-Emblem – identisch zum
// Logo im Menü – auf goldenem Grund.
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

// Gleiches Emblem wie im Logo (app/globals.css, .logo::before).
const EMBLEM =
  "data:image/svg+xml," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#2a1d12' stroke-width='1.7' stroke-linejoin='round' stroke-linecap='round'><path d='M6 18.5 L12 5 L18 18.5 M8.4 13.6 H15.6 M4.8 18.5 H7.4 M16.6 18.5 H19.2'/></svg>"
  );

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #d8b277, #b1894f)',
          borderRadius: 7
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={EMBLEM} width={22} height={22} alt="" />
      </div>
    ),
    { ...size }
  );
}
