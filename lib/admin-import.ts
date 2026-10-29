// Import-Feld im Admin: Ein im Chat vorbereiteter und geprüfter Datenblock (JSON)
// füllt das Duft-Formular auf einmal aus. Ein Block kann einen Duft oder mehrere
// Versionen enthalten (Liste). Unbekannte oder ungültige Werte werden nicht
// übernommen, sondern als Hinweis angezeigt – es wird nichts geraten.

import {
  alternativesToText,
  cleanAlternatives,
  cleanSizes,
  parseSimilarNames,
  sizesToText
} from './perfume-extras';

export const IMPORT_FAMILIES = ['clean', 'gourmand', 'woody', 'floral'] as const;
export const IMPORT_GENDERS = ['Women', 'Men', 'Unisex'] as const;
export const IMPORT_SEASONS = ['Frühling', 'Sommer', 'Herbst/Winter', 'Winter', 'Ganzjährig'] as const;
export const IMPORT_OCCASIONS = ['Alltag', 'Büro', 'Date', 'Abend'] as const;
export const IMPORT_CONCENTRATIONS = ['EdP', 'EdT', 'EdC', 'Parfum', 'Extrait', 'Cologne', 'Spray'] as const;
// Codes wie im Admin ("18-25" ist der bestehende Datenbank-Code für die Gruppe 16–25).
export const IMPORT_AGE_GROUPS = ['18-25', '25-35', '35-40', 'all'] as const;
export const IMPORT_LIFESTYLES = ['student', 'professional', 'party', 'casual', 'sporty'] as const;
export const IMPORT_TREND_VIBES = ['trendy', 'classic', 'niche', 'popular'] as const;
export const IMPORT_GENDER_NUANCES = ['masculine', 'feminine', 'androgynous'] as const;

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
  age_group: string;
  lifestyle: string;
  trend_vibe: string;
  gender_nuance: string;
  flacon_description: string;
  flacon_designer: string;
  similar_perfumes: string;
  sizes: string;
  alternative_to: string;
}>;

// warnings: ungültige Werte (immer anzeigen). missing: fehlende Pflichtangaben – nur
// wichtig bei einem neuen Duft. partial: Block ohne Duftnamen = Korrektur für einen
// bestehenden Duft, darf nur beim Bearbeiten übernommen werden.
export type ImportEntry = { label: string; fields: ImportedFields; warnings: string[]; missing: string[]; partial: boolean };
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

function parseEntry(input: Record<string, unknown>, index: number): ImportEntry {
  let raw = input;
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

  for (const key of ['perfume_name', 'brand', 'perfumer', 'inspiration', 'image_url', 'affiliate_url', 'flacon_description', 'flacon_designer'] as const) setText(key);
  setChoice('gender', IMPORT_GENDERS, 'Geschlecht');
  setChoice('fragrance_family', IMPORT_FAMILIES, 'Duftfamilie');
  setChoice('concentration', IMPORT_CONCENTRATIONS, 'Konzentration');
  setChoice('season', IMPORT_SEASONS, 'Saison');
  setChoice('occasion', IMPORT_OCCASIONS, 'Anlass');
  // „16-25" ist die Anzeige im Admin, gespeichert wird der Code „18-25".
  if (text(raw.age_group) === '16-25') raw = { ...raw, age_group: '18-25' };
  setChoice('age_group', IMPORT_AGE_GROUPS, 'Altersgruppe');
  setChoice('lifestyle', IMPORT_LIFESTYLES, 'Lifestyle');
  setChoice('trend_vibe', IMPORT_TREND_VIBES, 'Trend-Vibe');
  setChoice('gender_nuance', IMPORT_GENDER_NUANCES, 'Gender-Nuance');
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

  // Ähnliche Düfte: „Name – Marke" oder {"name": …, "brand": …}.
  if (Array.isArray(raw.similar_perfumes)) {
    const similar = parseSimilarNames(
      raw.similar_perfumes
        .map((s) => (s && typeof s === 'object' ? [(s as any).name, (s as any).brand].filter(Boolean).join(' – ') : String(s)))
        .join('\n')
    );
    if (similar.length) fields.similar_perfumes = similar.join('\n');
  } else if (raw.similar_perfumes != null) {
    warnings.push('Ähnliche Düfte bitte als Liste angeben – nicht übernommen.');
  }
  // Grössen & Preise: [{"ml": 40, "price_chf": 14.99}, …]
  if (raw.sizes != null) {
    const sizes = cleanSizes(raw.sizes);
    if (sizes.length) fields.sizes = sizesToText(sizes);
    else warnings.push('Grössen & Preise sind ungültig – nicht übernommen.');
  }
  // Alternative zu: [{"name": …, "brand": …, "price_chf": …, "note": …}]
  if (raw.alternative_to != null) {
    const alternatives = cleanAlternatives(Array.isArray(raw.alternative_to) ? raw.alternative_to : [raw.alternative_to]);
    if (alternatives.length) fields.alternative_to = alternativesToText(alternatives);
    else warnings.push('„Alternative zu" ist ungültig – nicht übernommen.');
  }

  const missing: string[] = [];
  if (!fields.perfume_name) missing.push('Duftname fehlt.');
  for (const [key, label] of EXPECTED) {
    if (!fields[key] && !warnings.some((w) => w.startsWith(label))) {
      missing.push(`${label} fehlt im Import – bitte im Formular selbst wählen.`);
    }
  }

  const partial = !fields.perfume_name;
  const label =
    [fields.perfume_name || (partial ? 'Korrektur' : `Duft ${index + 1}`), fields.concentration, fields.volume_ml ? `${fields.volume_ml} ml` : null]
      .filter(Boolean)
      .join(' · ');
  return { label, fields, warnings, missing, partial };
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
