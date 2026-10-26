import type { Perfume } from './perfumes';

// Auressa-Score (0–100): nachvollziehbar aus den Duftdaten berechnet –
// passend zum Auressa-Grundsatz „guter Duft muss nicht teuer sein".
//
//   Preis-Leistung  40 %  halb Preis (CHF 30 = top, ab CHF 180 = 0),
//                         halb Haltbarkeit – viel Duft fürs Geld
//   Haltbarkeit     25 %  Haltbarkeit 0–10
//   Vielseitigkeit  20 %  wie viele Jahreszeiten und Anlässe passen
//   Ausstrahlung    15 %  Sillage – ausgewogen (6/10) ist ideal
//
// Fehlende Werte zählen neutral (5/10) und werden als Schätzung markiert.

export type ScorePart = { key: string; label: string; weight: number; points: number; hint: string };
export type AuressaScore = { total: number; parts: ScorePart[]; estimated: boolean };

const SEASONS = ['Frühling', 'Sommer', 'Herbst', 'Winter'];

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function countSeasons(season: string | null): number {
  if (!season) return 0;
  if (/ganzj/i.test(season)) return 4;
  return SEASONS.filter((s) => season.includes(s)).length;
}

function countOccasions(occasion: string | null): number {
  if (!occasion) return 0;
  return occasion.split(',').map((o) => o.trim()).filter(Boolean).length;
}

export function computeAuressaScore(p: Perfume): AuressaScore {
  const estimated = p.longevity == null || p.sillage == null || p.price_chf == null;
  const longevity = clamp01((p.longevity ?? 5) / 10);
  const price = p.price_chf ?? 105;
  const priceScore = clamp01((180 - price) / 150);
  const value = 0.5 * priceScore + 0.5 * longevity;

  const seasons = countSeasons(p.season);
  const occasions = countOccasions(p.occasion);
  const versatility = 0.3 + 0.7 * (0.6 * Math.min(seasons, 4) / 4 + 0.4 * Math.min(occasions, 4) / 4);

  const sillage = p.sillage ?? 5;
  const projection = clamp01(1 - Math.abs(sillage - 6) / 6);

  const parts: ScorePart[] = [
    {
      key: 'value',
      label: 'Preis-Leistung',
      weight: 40,
      points: value * 40,
      hint: p.price_chf != null ? `ca. CHF ${p.price_chf} bei Haltbarkeit ${p.longevity ?? '–'}/10` : 'Preis noch offen'
    },
    { key: 'longevity', label: 'Haltbarkeit', weight: 25, points: longevity * 25, hint: `${p.longevity ?? '–'}/10` },
    {
      key: 'versatility',
      label: 'Vielseitigkeit',
      weight: 20,
      points: versatility * 20,
      hint: `${seasons === 4 ? 'ganzjährig' : `${seasons} Jahreszeit${seasons === 1 ? '' : 'en'}`}, ${occasions} Anlass${occasions === 1 ? '' : 'e'}`
    },
    { key: 'projection', label: 'Ausstrahlung', weight: 15, points: projection * 15, hint: `${p.sillage ?? '–'}/10` }
  ];

  const total = Math.round(parts.reduce((sum, part) => sum + part.points, 0));
  return { total, parts, estimated };
}
