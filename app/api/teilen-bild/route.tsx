import { readFile } from 'node:fs/promises';
import { ImageResponse } from 'next/og';
import { concentrationLabel, getPerfumes } from '@/lib/perfumes';
import { PROFILE_COLORS, PROFILE_TEXT, isProfileKey } from '@/lib/quiz-profiles';

// Teilen-Bild fürs Quiz-Ergebnis im Story-Format (1080 × 1920) für Instagram, TikTok & WhatsApp.
// Sicherheit: Es werden nur bekannte Profile und echte Düfte aus dem Katalog angezeigt
// (Slugs werden gegen die Datenbank geprüft) – niemand kann eigene Texte mit dem
// Auressa-Logo erzeugen. Prozentwerte werden auf 0–100 begrenzt.
export const revalidate = 3600;

const W = 1080;
const H = 1920;

// Schriften der Webseite (Playfair Display & Inter, OFL-Lizenz – siehe app/fonts/LICENSE-*),
// als statische TTF-Dateien, weil der Bild-Generator kein woff2 lesen kann.
const fontsPromise = Promise.all([
  readFile(new URL('./playfair-600.ttf', import.meta.url)),
  readFile(new URL('./inter-400.ttf', import.meta.url))
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const profile = searchParams.get('p');
  if (!isProfileKey(profile)) {
    return new Response('Unbekanntes Profil', { status: 400 });
  }

  // Bis zu drei Düfte: m=slug1,slug2,slug3  s=Prozent1,Prozent2,Prozent3
  const slugs = (searchParams.get('m') || '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[a-z0-9-]{1,120}$/.test(s))
    .slice(0, 3);
  const scores = (searchParams.get('s') || '')
    .split(',')
    .map((v) => Math.max(0, Math.min(100, Math.round(Number(v) || 0))));

  const catalog = await getPerfumes(2000);
  const bySlug = new Map(catalog.filter((p) => p.slug).map((p) => [p.slug as string, p]));
  const matches = slugs
    .map((slug, i) => ({ perfume: bySlug.get(slug), score: scores[i] }))
    .filter((m): m is { perfume: NonNullable<typeof m.perfume>; score: number } => Boolean(m.perfume))
    .map((m, _i, all) => {
      // Gleicher Name zweimal (z. B. EdT und EdP)? Dann Konzentration anhängen.
      const twin = all.some((o) => o.perfume.slug !== m.perfume.slug && o.perfume.perfume_name === m.perfume.perfume_name);
      const conc = concentrationLabel(m.perfume.concentration);
      return { ...m, label: twin && conc ? `${m.perfume.perfume_name} ${conc}` : m.perfume.perfume_name };
    });

  const [playfair, inter] = await fontsPromise;
  const { title, text } = PROFILE_TEXT[profile];
  const [c1, c2] = PROFILE_COLORS[profile];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(170deg, #3A2A20 0%, #241912 55%, #1F1612 100%)',
          color: '#FBF3E6',
          fontFamily: 'Inter',
          // Oben/unten Platz lassen: Instagram/TikTok legen dort Profilname bzw. Antwortleiste darüber.
          padding: '200px 90px 220px'
        }}
      >
        {/* Marke */}
        <div style={{ display: 'flex', flexShrink: 0, fontFamily: 'Playfair', fontSize: 52, letterSpacing: 18, color: '#D8B277' }}>AURESSA</div>
        <div style={{ display: 'flex', flexShrink: 0, fontSize: 24, letterSpacing: 6, color: 'rgba(216,178,119,.75)', marginTop: 16 }}>
          DISCOVERY · FRAGRANCE · BOUTIQUE
        </div>

        {/* Flakon in Profilfarbe */}
        <div style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', alignItems: 'center', marginTop: 56 }}>
          <div style={{ display: 'flex', width: 64, height: 44, borderRadius: 14, background: 'linear-gradient(180deg, #E8D4A0, #B58E45)' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 190,
              height: 220,
              marginTop: 8,
              borderRadius: 46,
              background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)`,
              border: '3px solid rgba(255,255,255,.55)',
              boxShadow: '0 40px 80px rgba(0,0,0,.45)'
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '12px 18px',
                background: 'rgba(255,255,255,.85)',
                borderRadius: 8,
                fontSize: 20,
                letterSpacing: 6,
                color: '#1F1612'
              }}
            >
              AURESSA
            </div>
          </div>
        </div>

        {/* Profil */}
        <div style={{ display: 'flex', flexShrink: 0, fontSize: 30, letterSpacing: 8, color: '#D8B277', marginTop: 56 }}>MEIN DUFTPROFIL</div>
        <div style={{ display: 'flex', flexShrink: 0, justifyContent: 'center', fontFamily: 'Playfair', fontSize: 84, marginTop: 14, textAlign: 'center', lineHeight: 1.12, maxWidth: 900 }}>
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            flexShrink: 0,
            fontSize: 32,
            lineHeight: 1.45,
            color: 'rgba(251,243,230,.85)',
            textAlign: 'center',
            marginTop: 26,
            maxWidth: 860
          }}
        >
          {text}
        </div>

        {/* Top-Matches */}
        {matches.length > 0 && (
          <div style={{ display: 'flex', flexShrink: 0, flexDirection: 'column', width: '100%', marginTop: 48 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#D8B277', marginBottom: 18 }}>
              MEINE TOP-MATCHES
            </div>
            {matches.map((m, i) => (
              <div
                key={m.perfume.slug}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '18px 30px',
                  marginBottom: 14,
                  borderRadius: 26,
                  background: i === 0 ? 'rgba(216,178,119,.18)' : 'rgba(255,255,255,.06)',
                  border: `2px solid ${i === 0 ? 'rgba(216,178,119,.7)' : 'rgba(255,255,255,.12)'}`
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 680 }}>
                  <div style={{ display: 'flex', fontFamily: 'Playfair', fontSize: 38 }}>{m.label}</div>
                  <div style={{ display: 'flex', fontSize: 24, color: 'rgba(251,243,230,.7)', marginTop: 4, letterSpacing: 2 }}>
                    {(m.perfume.brands?.name || '').toUpperCase()}
                  </div>
                </div>
                {m.score > 0 && (
                  <div style={{ display: 'flex', fontFamily: 'Playfair', fontSize: 50, color: '#E8D4A0' }}>{m.score}%</div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Aufruf */}
        <div style={{ display: 'flex', flex: 1 }} />
        <div style={{ display: 'flex', flexShrink: 0, fontSize: 32, color: 'rgba(251,243,230,.85)' }}>Finde deinen Signature-Duft auf</div>
        <div style={{ display: 'flex', flexShrink: 0, fontFamily: 'Playfair', fontSize: 58, color: '#E8D4A0', marginTop: 6, letterSpacing: 2 }}>auressa.ch</div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts: [
        { name: 'Playfair', data: playfair, weight: 600, style: 'normal' },
        { name: 'Inter', data: inter, weight: 400, style: 'normal' }
      ],
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
    }
  );
}
