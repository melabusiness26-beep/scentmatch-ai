import { readFile } from 'node:fs/promises';
import { ImageResponse } from 'next/og';
import { getPerfumeBySlug, getPerfumeExtras } from '@/lib/perfumes';
import { priceSource } from '@/lib/perfume-extras';
import { computeAuressaScore } from '@/lib/score';
import { CARD_SIZES, ShareCard, type CardFormat } from '@/lib/share-card';

// Teilen-Bild eines Duftes: ?format=pin (Pinterest, 2:3) oder ?format=story (Instagram/TikTok, 9:16).
// Sicherheit: nur echte Düfte aus dem Katalog (slug wird geprüft) – niemand kann eigene
// Texte mit dem Auressa-Logo erzeugen.
export const revalidate = 3600;

const fontsPromise = Promise.all([
  readFile(new URL('../../teilen-bild/playfair-600.ttf', import.meta.url)),
  readFile(new URL('../../teilen-bild/inter-400.ttf', import.meta.url))
]);

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const format = new URL(request.url).searchParams.get('format');
  if (format !== 'pin' && format !== 'story') return new Response('Unbekanntes Format', { status: 400 });
  if (!/^[a-z0-9-]{1,120}$/.test(slug)) return new Response('Nicht gefunden', { status: 404 });

  const perfume = await getPerfumeBySlug(slug);
  if (!perfume) return new Response('Nicht gefunden', { status: 404 });
  const extras = await getPerfumeExtras(perfume.id);
  const shop = priceSource(extras.sizes || []).shop;
  const [playfair, inter] = await fontsPromise;
  const f = format as CardFormat;

  return new ImageResponse(<ShareCard data={{ perfume, score: computeAuressaScore(perfume).total, shop }} format={f} />, {
    ...CARD_SIZES[f],
    fonts: [
      { name: 'Playfair', data: playfair, weight: 600, style: 'normal' },
      { name: 'Inter', data: inter, weight: 400, style: 'normal' }
    ],
    headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=86400' }
  });
}
