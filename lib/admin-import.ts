// Import-Feld im Admin: Ein im Chat vorbereiteter und geprüfter Datenblock (JSON)
// füllt das Duft-Formular auf einmal aus. Ein Block kann einen Duft oder mehrere
// Versionen enthalten (Liste). Unbekannte oder ungültige Werte werden nicht
// übernommen, sondern als Hinweis angezeigt – es wird nichts geraten.

export const IMPORT_FAMILIES = ['clean', 'gourmand', 'woody', 'floral'] as const;
export const IMPORT_GENDERS = ['Women', 'Men', 'Unisex'] as const;
export const IMPORT_SEASONS = ['Frühling', 'Sommer', 'Herbst/Winter', 'Winter', 'Ganzjährig'] as const;
export const IMPORT_OCCASIONS = ['Alltag', 'Büro', 'Date', 'Abend'] as const;
export const IMPORT_CONCENTRATIONS = ['EdP', 'EdT', 'EdC', 'Extrait', 'Cologne', 'Spray'] as const;

// Formularfelder, die der Import setzen darf (alle als Text, wie im Formular).
export type ImportedFields = Partial<{
  perfume_name: string;
  brand: string;
  gender: string;
  fragrance_family: string;
  concentration: string;
  volume_ml: string;
  price_chf: string;
  longevity: string;
  sillage: string;
  season: string;
  occasion: string;
  release_year: string;
  perfumer: string;
  inspiration: string;
  top_notes: string;
  heart_notes: string;
  base_notes: string;
  good_to_know: string;
  image_url: string;
  affiliate_url: string;
}>;

export type ImportEntry = { label: string; fields: ImportedFields; warnings: string[] };
export type ImportResult = { entries: ImportEntry[]; error?: string };

// Diese Felder sollte jeder Import enthalten – sonst bliebe der Standardwert des
// Formulars stehen (z. B. „Ganzjährig") und würde wie eine echte Angabe gespeichert.
const EXPECTED: [keyof ImportedFields, string][] = [
  ['brand', 'Marke'],
  ['gender', 'Geschlecht'],
  ['fragrance_family', 'Duftfamilie'],
  ['concentration', 'Konzentration'],
  ['season', 'Saison'],
  ['occasion', 'Anlass']
];

function text(value: unknown): string | null {
  if (value == null) return null;
  const s = String(value).trim();
  return s ? s : null;
}

function list(value: unknown, separator: string): string | null {
  if (Array.isArray(value)) {
    const items = value.map((v) => String(v).trim()).filter(Boolean);
    return items.length ? items.join(separator) : null;
  }
  return text(value);
}

function numberIn(value: unknown, min: number, max: number): string | null | undefined {
  if (value == null || value === '') return null;
  const n = Number(String(value).replace(',', '.'));
  return Number.isFinite(n) && n >= min && n <= max ? String(n) : undefined;
}

function oneOf(value: unknown, allowed: readonly string[]): string | null | undefined {
  const s = text(value);
  if (s == null) return null;
  return allowed.find((a) => a.toLowerCase() === s.toLowerCase()) ?? undefined;
}

function parseEntry(raw: Record<string, unknown>, index: number): ImportEntry {
  const fields: ImportedFields = {};
  const warnings: string[] = [];

  const setText = (key: keyof ImportedFields) => {
    const v = text(raw[key]);
    if (v != null) fields[key] = v;
  };
  const setChoice = (key: keyof ImportedFields, allowed: readonly string[], label: string) => {
    const v = oneOf(raw[key], allowed);
    if (v === undefined) warnings.push(`${label} „${raw[key]}" ist ungültig – nicht übernommen.`);
    else if (v != null) fields[key] = v;
  };
  const setNumber = (key: keyof ImportedFields, min: number, max: number, label: string) => {
    const v = numberIn(raw[key], min, max);
    if (v === undefined) warnings.push(`${label} „${raw[key]}" ist ungültig – nicht übernommen.`);
    else if (v != null) fields[key] = v;
  };

  for (const key of ['perfume_name', 'brand', 'perfumer', 'inspiration', 'image_url', 'affiliate_url'] as const) setText(key);
  setChoice('gender', IMPORT_GENDERS, 'Geschlecht');
  setChoice('fragrance_family', IMPORT_FAMILIES, 'Duftfamilie');
  setChoice('concentration', IMPORT_CONCENTRATIONS, 'Konzentration');
  setChoice('season', IMPORT_SEASONS, 'Saison');
  setChoice('occasion', IMPORT_OCCASIONS, 'Anlass');
  setNumber('volume_ml', 1, 500, 'Volumen');
  setNumber('price_chf', 0, 5000, 'Preis');
  setNumber('longevity', 0, 10, 'Haltbarkeit');
  setNumber('sillage', 0, 10, 'Ausstrahlung');
  setNumber('release_year', 1700, new Date().getFullYear() + 1, 'Erscheinungsjahr');

  for (const key of ['top_notes', 'heart_notes', 'base_notes'] as const) {
    const v = list(raw[key], ', ');
    if (v != null) fields[key] = v;
  }
  const facts = list(raw.good_to_know, '\n');
  if (facts != null) fields.good_to_know = facts;

  if (!fields.perfume_name) warnings.push('Duftname fehlt.');
  for (const [key, label] of EXPECTED) {
    if (!fields[key] && !warnings.some((w) => w.startsWith(label))) {
      warnings.push(`${label} fehlt im Import – bitte im Formular selbst wählen.`);
    }
  }

  const label =
    [fields.perfume_name || `Duft ${index + 1}`, fields.concentration, fields.volume_ml ? `${fields.volume_ml} ml` : null]
      .filter(Boolean)
      .join(' · ');
  return { label, fields, warnings };
}

// Akzeptiert einen einzelnen Duft ({…}) oder mehrere Versionen ([{…}, {…}]).
// Text vor oder nach dem Block (z. B. beim Kopieren aus dem Chat) wird ignoriert.
export function parseImport(input: string): ImportResult {
  const start = input.search(/[[{]/);
  const end = Math.max(input.lastIndexOf('}'), input.lastIndexOf(']'));
  if (start < 0) return { entries: [], error: 'Kein Import-Block gefunden. Bitte den ganzen Block aus dem Chat einfügen.' };
  if (end < start) return { entries: [], error: 'Der Block ist unvollständig oder beschädigt. Bitte nochmals ganz kopieren.' };

  let data: unknown;
  try {
    data = JSON.parse(input.slice(start, end + 1));
  } catch {
    return { entries: [], error: 'Der Block ist unvollständig oder beschädigt. Bitte nochmals ganz kopieren.' };
  }

  const items = Array.isArray(data) ? data : [data];
  const objects = items.filter((x): x is Record<string, unknown> => Boolean(x) && typeof x === 'object' && !Array.isArray(x));
  if (!objects.length) return { entries: [], error: 'Im Block steht kein Duft.' };
  return { entries: objects.map(parseEntry) };
}
