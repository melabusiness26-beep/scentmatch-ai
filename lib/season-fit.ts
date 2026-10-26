import { isWithinPriceCap, type Perfume } from './perfumes';
import { computeAuressaScore } from './score';

// „Passt jetzt": Jahreszeiten eines Duftes und Vorschläge je Jahreszeit.
// Die aktuelle Jahreszeit bestimmt erst der Browser (die Seite ist zwischengespeichert).

export const SEASONS = ['Frühling', 'Sommer', 'Herbst', 'Winter'] as const;
export type Season = (typeof SEASONS)[number];
export type SeasonPick = { slug: string; name: string; brand: string | null };

export function perfumeSeasons(season: string | null): Season[] {
  if (!season) return [];
  if (/ganzj/i.test(season)) return [...SEASONS];
  return SEASONS.filter((s) => season.toLowerCase().includes(s.toLowerCase()));
}

// Bis zu drei Düfte je Jahreszeit: passend zum Geschlecht, bis CHF 180,
// gleiche Duftfamilie zuerst, dann nach Auressa-Score.
export function seasonPicks(perfume: Perfume, pool: Perfume[], exclude: Set<string>): Record<Season, SeasonPick[]> {
  const genderOk = (p: Perfume) =>
    !perfume.gender || perfume.gender === 'Unisex' || p.gender === perfume.gender || p.gender === 'Unisex';
  const candidates = pool
    .filter((p) => p.slug && p.id !== perfume.id && !exclude.has(p.id) && genderOk(p) && isWithinPriceCap(p))
    .map((p) => ({
      p,
      seasons: perfumeSeasons(p.season),
      rank: (p.fragrance_family === perfume.fragrance_family ? 1000 : 0) + computeAuressaScore(p).total
    }))
    .sort((a, b) => b.rank - a.rank);
  const out = {} as Record<Season, SeasonPick[]>;
  for (const season of SEASONS) {
    out[season] = candidates
      .filter((c) => c.seasons.includes(season))
      .slice(0, 3)
      .map(({ p }) => ({ slug: p.slug as string, name: p.perfume_name, brand: p.brands?.name || null }));
  }
  return out;
}
