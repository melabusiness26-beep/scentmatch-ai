// Jahreszeiten und Anlässe können mehrere Werte haben, gespeichert als Text mit Komma:
// season: „Frühling, Herbst“ · „Ganzjährig“ · (alt) „Herbst/Winter“
// occasion: „Alltag, Büro“
// Hier liegt die eine Stelle, die solche Werte liest, prüft und schreibt.

export const SEASON_NAMES = ['Frühling', 'Sommer', 'Herbst', 'Winter'] as const;
export type SeasonName = (typeof SEASON_NAMES)[number];
export const OCCASION_NAMES = ['Alltag', 'Büro', 'Date', 'Abend'] as const;

/** Einzelne Jahreszeiten eines Duftes (ganzjährig = alle vier). */
export function seasonsOf(value: string | null | undefined): SeasonName[] {
  if (!value) return [];
  if (/ganzj/i.test(value)) return [...SEASON_NAMES];
  const v = value.toLowerCase();
  return SEASON_NAMES.filter((s) => v.includes(s.toLowerCase()));
}

export function isAllYear(value: string | null | undefined): boolean {
  return seasonsOf(value).length === SEASON_NAMES.length;
}

/** Anlässe eines Duftes. */
export function occasionsOf(value: string | null | undefined): string[] {
  return (value || '')
    .split(',')
    .map((o) => o.trim())
    .filter((o, i, all) => o && all.indexOf(o) === i);
}

/** Jahreszeiten sauber als Text (alle vier → „Ganzjährig“). */
export function seasonsToText(list: readonly string[]): string {
  const set = SEASON_NAMES.filter((s) => list.includes(s));
  if (set.length === SEASON_NAMES.length) return 'Ganzjährig';
  return set.join(', ');
}

export function occasionsToText(list: readonly string[]): string {
  return OCCASION_NAMES.filter((o) => list.includes(o)).join(', ');
}

/** Prüft einen Import-Wert. undefined = ungültig, null = leer, sonst der saubere Text. */
export function parseSeasonValue(raw: unknown): string | null | undefined {
  if (raw == null || raw === '') return null;
  const parts = (Array.isArray(raw) ? raw : String(raw).split(',')).map((x) => String(x).trim()).filter(Boolean);
  if (!parts.length) return null;
  if (parts.length === 1 && /^ganzj[äa]hrig$/i.test(parts[0])) return 'Ganzjährig';
  const out: string[] = [];
  for (const p of parts) {
    if (p === 'Herbst/Winter') out.push('Herbst', 'Winter');
    else if ((SEASON_NAMES as readonly string[]).includes(p)) out.push(p);
    else return undefined;
  }
  return seasonsToText(out);
}

export function parseOccasionValue(raw: unknown): string | null | undefined {
  if (raw == null || raw === '') return null;
  const parts = (Array.isArray(raw) ? raw : String(raw).split(',')).map((x) => String(x).trim()).filter(Boolean);
  if (!parts.length) return null;
  if (!parts.every((p) => (OCCASION_NAMES as readonly string[]).includes(p))) return undefined;
  return occasionsToText(parts);
}
