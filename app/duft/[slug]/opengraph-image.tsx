import { readFile } from 'node:fs/promises';
import { ImageResponse } from 'next/og';
import { getPerfumeBySlug, getPerfumeExtras } from '@/lib/perfumes';
import { priceSource } from '@/lib/perfume-extras';
import { computeAuressaScore } from '@/lib/score';
import { CARD_SIZES, ShareCard } from '@/lib/share-card';

// Social-Vorschaubild pro Duft – erscheint, wenn jemand den Link teilt
// (WhatsApp, Facebook, iMessage …). Gleicher Baukasten wie Pin- und Story-Bild.
export const alt = 'Auressa · Duftprofil';
export const size = CARD_SIZES.og;
export const contentType = 'image/png';
export const revalidate = 3600;


export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);
  // Schriften erst beim Erzeugen laden (nicht beim Laden des Moduls).
  const [playfair, inter] = await Promise.all([
    readFile(new URL('../../api/teilen-bild/playfair-600.ttf', import.meta.url)),
    readFile(new URL('../../api/teilen-bild/inter-400.ttf', import.meta.url))
  ]);
  const fonts = [
    { name: 'Playfair', data: playfair, weight: 600 as const, style: 'normal' as const },
    { name: 'Inter', data: inter, weight: 400 as const, style: 'normal' as const }
  ];

  if (!perfume) {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FBF8F3', fontFamily: 'Playfair', fontSize: 80, color: '#1F1712' }}>
          Auressa
        </div>
      ),
      { ...size, fonts }
    );
  }

  const extras = await getPerfumeExtras(perfume.id);
  const shop = priceSource(extras.sizes || []).shop;
  return new ImageResponse(<ShareCard data={{ perfume, score: computeAuressaScore(perfume).total, shop }} format="og" />, { ...size, fonts });
}
