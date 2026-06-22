import { ImageResponse } from 'next/og';

// Vorschaubild fürs Teilen auf Social Media (WhatsApp, Instagram, Facebook …).
// Next.js nutzt diese Datei automatisch als OpenGraph- und Twitter-Bild.
export const alt = 'ScentMatch – Finde deinen Signature-Duft';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #5a4131 0%, #3a2a20 48%, #241912 100%)',
          color: '#fbf3e6',
          fontFamily: 'serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            letterSpacing: 12,
            color: '#d8b277',
            marginBottom: 8
          }}
        >
          SCENTMATCH
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 78,
            fontWeight: 700,
            textAlign: 'center',
            padding: '0 90px',
            lineHeight: 1.1
          }}
        >
          Finde deinen Signature-Duft
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            color: 'rgba(243,233,218,0.85)',
            marginTop: 26,
            letterSpacing: 1
          }}
        >
          Duft-Quiz · intelligente Empfehlungen · kuratiert in der Schweiz
        </div>
      </div>
    ),
    { ...size }
  );
}
