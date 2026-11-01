// Katalog-Dateien („Mergen = fertig"): Jeder Duft liegt als JSON-Datei in
// catalog/perfumes/<slug>.json – im gleichen Format wie der Import-Block im Admin,
// plus "slug". Beim Veröffentlichen (Production-Build) trägt scripts/sync-catalog.mts
// NEUE Düfte in die Datenbank ein. Bestehende Düfte werden nie geändert oder gelöscht;
// Korrekturen laufen weiter über den Admin.
//
// Diese Datei ist reine Logik ohne Datenbank, damit Admin, Build-Skript und Tests
// dieselbe Prüfung und Umwandlung nutzen.

import { parseImport, type ImportedFields } from './admin-import.ts';
import { parseAlternatives, parseSimilarNames, parseSizes } from './perfume-extras.ts';
import { parseAccordText } from './accords.ts';

// lowercase, Umlaute → ae/oe/ue/ss, übrige Akzente weg (Hermès → hermes), Rest → „-".
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// ── Quellenpflicht („felsenfest") ─────────────────────────────────────────────
// Jede belegpflichtige Angabe eines NEUEN Duftes braucht Quellen-Links im Feld
// "sources" der Katalog-Datei – sonst schlägt die Prüfung fehl (PR wird rot, nichts
// geht live). Wo zwei Quellen nötig sind, müssen sie von zwei verschiedenen
// Websites stammen. Die Links bleiben in der Datei als Nachweis (gelangen nicht in
// die Datenbank).
// Beispiel:
//   "sources": {
//     "identity": ["https://www.parfumo.com/…", "https://www.notino.ch/…"],
//     "release_year": ["https://www.parfumo.com/…", "https://www.nstperfume.com/…"],
//     "price": ["https://www.easycosmetic.ch/…"]
//   }
type RawPerfume = Record<string, unknown>;
const filled = (v: unknown) =>
  v != null && v !== '' && v !== false && !(Array.isArray(v) && v.length === 0);

export const SOURCE_RULES: { key: string; label: string; min: number; applies: (raw: RawPerfume) => boolean }[] = [
  { key: 'identity', label: 'Name, Marke und Konzentration', min: 2, applies: () => true },
  { key: 'release_year', label: 'Erscheinungsjahr', min: 2, applies: (r) => filled(r.release_year) },
  { key: 'perfumer', label: 'Parfümeur', min: 2, applies: (r) => filled(r.perfumer) },
  { key: 'notes', label: 'Duftnoten', min: 2, applies: (r) => filled(r.top_notes) || filled(r.heart_notes) || filled(r.base_notes) },
  { key: 'diagram', label: 'Duftrichtung, Jahreszeit und Anlass (Diagramm)', min: 1, applies: (r) => filled(r.accords) || filled(r.season) || filled(r.occasion) },
  { key: 'ratings', label: 'Haltbarkeit und Ausstrahlung', min: 1, applies: (r) => filled(r.longevity) || filled(r.sillage) },
  { key: 'price', label: 'Preis und Grössen', min: 1, applies: (r) => filled(r.price_chf) || filled(r.sizes) },
  { key: 'alternative_to', label: '„Alternative zu" (Dupe von …)', min: 2, applies: (r) => filled(r.alternative_to) },
  { key: 'similar_perfumes', label: 'Ähnliche Düfte', min: 1, applies: (r) => filled(r.similar_perfumes) },
  { key: 'discontinued', label: '„Nicht mehr erhältlich"', min: 2, applies: (r) => r.discontinued === true || r.discontinued === 'true' },
  { key: 'flacon', label: 'Flakon (Beschreibung/Designer)', min: 2, applies: (r) => filled(r.flacon_description) || filled(r.flacon_designer) },
  { key: 'good_to_know', label: '„Gut zu wissen"', min: 2, applies: (r) => filled(r.good_to_know) },
  { key: 'inspiration', label: 'Inspiration', min: 2, applies: (r) => filled(r.inspiration) }
];

// Düfte, die vor der Quellenpflicht (1. November 2026) eingetragen wurden. Ihre Quellen
// stehen in den Chat-Protokollen; sie werden nach und nach nachgetragen. NEUE Düfte
// dürfen hier nie ergänzt werden.
export const LEGACY_WITHOUT_SOURCES = new Set([
  'boss-bottled', 'boss-bottled-absolu', 'boss-bottled-eau-de-parfum', 'boss-bottled-elixir', 'boss-bottled-parfum',
  'cool-water', 'cool-water-intense', 'la-rive-donna', 'light-blue', 'light-blue-eau-de-parfum',
  'light-blue-eau-intense', 'light-blue-pour-homme', 'light-blue-pour-homme-eau-intense',
  'terre-d-hermes', 'terre-d-hermes-parfum'
]);

function hostOf(url: string): string | null {
  try {
    const u = new URL(url);
    return u.protocol === 'https:' ? u.hostname.replace(/^www\./, '').toLowerCase() : null;
  } catch {
    return null;
  }
}

// Gibt die fehlenden/ungültigen Quellen eines Duftes zurück (leer = alles belegt).
export function checkSources(raw: RawPerfume): string[] {
  const problems: string[] = [];
  const sources = (raw.sources && typeof raw.sources === 'object' && !Array.isArray(raw.sources)
    ? raw.sources
    : {}) as Record<string, unknown>;
  for (const rule of SOURCE_RULES) {
    if (!rule.applies(raw)) continue;
    const list = Array.isArray(sources[rule.key]) ? (sources[rule.key] as unknown[]).map((x) => String(x).trim()) : [];
    const bad = list.filter((u) => !hostOf(u));
    const hosts = new Set(list.map(hostOf).filter((h): h is string => Boolean(h)));
    if (bad.length) problems.push(`Quelle für ${rule.label} ist kein https-Link: ${bad.join(', ')}.`);
    if (hosts.size < rule.min) {
      problems.push(
        rule.min > 1
          ? `${rule.label}: ${rule.min} Quellen von verschiedenen Websites nötig (sources.${rule.key}), vorhanden: ${hosts.size}.`
          : `${rule.label}: Quelle fehlt (sources.${rule.key}).`
      );
    }
  }
  return problems;
}

export type CatalogEntry = {
  file: string;
  slug: string;
  brand: string;
  fields: ImportedFields;
};

export type CatalogCheck = { entries: CatalogEntry[]; errors: string[] };

// Prüft alle Katalog-Dateien. Für einen neuen Duft müssen alle Pflichtangaben da sein
// und kein Wert darf ungültig sein – sonst wird nichts eingetragen.
export function checkCatalog(files: { name: string; text: string }[]): CatalogCheck {
  const entries: CatalogEntry[] = [];
  const errors: string[] = [];
  const slugs = new Set<string>();

  for (const { name, text } of files) {
    let raw: Record<string, unknown>;
    try {
      raw = JSON.parse(text);
    } catch {
      errors.push(`${name}: kein gültiges JSON.`);
      continue;
    }
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
      errors.push(`${name}: muss genau einen Duft ({…}) enthalten.`);
      continue;
    }
    const result = parseImport(text);
    const entry = result.entries[0];
    if (result.error || !entry) {
      errors.push(`${name}: ${result.error || 'leer'}`);
      continue;
    }
    const problems = [...entry.warnings, ...entry.missing];
    const slug = typeof raw.slug === 'string' ? raw.slug.trim() : '';
    if (!slug) problems.push('slug fehlt.');
    else if (slug !== slugify(slug)) problems.push(`slug „${slug}" ist nicht sauber (erwartet „${slugify(slug)}").`);
    else if (`${slug}.json` !== name) problems.push(`Dateiname muss „${slug}.json" heissen.`);
    else if (slugs.has(slug)) problems.push(`slug „${slug}" kommt doppelt vor.`);
    if (slug && !LEGACY_WITHOUT_SOURCES.has(slug)) problems.push(...checkSources(raw));
    if (problems.length) {
      errors.push(`${name}: ${problems.join(' ')}`);
      continue;
    }
    slugs.add(slug);
    entries.push({ file: name, slug, brand: entry.fields.brand as string, fields: entry.fields });
  }
  return { entries, errors };
}

const toNumber = (s: string | undefined) => (s == null || s === '' ? null : Number(s));
const toList = (s: string | undefined) => (s || '').split(',').map((x) => x.trim()).filter(Boolean);
const toText = (s: string | undefined) => (s && s.trim() ? s.trim() : null);

// Wandelt die (textförmigen) Felder in eine Datenbank-Zeile um – wie „Hinzufügen" im Admin.
// Felder, die im Katalog fehlen, bleiben leer (null) statt einen Standardwert zu raten.
export function toPerfumeRow(f: ImportedFields, brandId: string, slug: string): Record<string, unknown> {
  return {
    slug,
    brand_id: brandId,
    perfume_name: f.perfume_name,
    gender: f.gender,
    fragrance_family: f.fragrance_family,
    concentration: f.concentration,
    season: f.season,
    occasion: f.occasion,
    price_chf: toNumber(f.price_chf),
    volume_ml: toNumber(f.volume_ml),
    longevity: toNumber(f.longevity),
    sillage: toNumber(f.sillage),
    release_year: toNumber(f.release_year),
    top_notes: toList(f.top_notes),
    heart_notes: toList(f.heart_notes),
    base_notes: toList(f.base_notes),
    image_url: toText(f.image_url),
    affiliate_url: toText(f.affiliate_url),
    age_group: f.age_group || 'all',
    lifestyle: toText(f.lifestyle),
    trend_vibe: toText(f.trend_vibe),
    gender_nuance: toText(f.gender_nuance),
    description: toText(f.description),
    perfumer: toText(f.perfumer),
    inspiration: toText(f.inspiration),
    good_to_know: toText(f.good_to_know),
    flacon_description: toText(f.flacon_description),
    flacon_designer: toText(f.flacon_designer),
    similar_perfumes: parseSimilarNames(f.similar_perfumes || ''),
    sizes: parseSizes(f.sizes || ''),
    alternative_to: parseAlternatives(f.alternative_to || ''),
    // Nur mitschicken, wenn vorhanden – so klappt das Eintragen auch ohne die Spalte.
    ...(f.accords ? { accords: parseAccordText(f.accords).accords } : {}),
    // Nur bei eingestellten Düften mitschicken (Spalte gibt es erst nach SQL 65).
    ...(f.discontinued === 'true' ? { discontinued: true } : {})
  };
}
