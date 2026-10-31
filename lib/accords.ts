import type { Perfume } from './perfumes';

// Duftcharakter („Akkorde") – aus den Noten eines Dufts berechnet.
// Jede Note zählt für einen oder mehrere Akkorde; Basisnoten wiegen etwas
// mehr, weil sie den Duft am längsten prägen. Ergebnis 0–100 je Akkord,
// der stärkste Akkord = 100. Bewusst eigene, einfache Logik – keine
// übernommenen Daten von Duft-Datenbanken.

export type AccordCode =
  | 'zitrisch'
  | 'frisch'
  | 'aromatisch'
  | 'fruchtig'
  | 'blumig'
  | 'pudrig'
  | 'suess'
  | 'wuerzig'
  | 'holzig'
  | 'warm'
  // Nur aus der gespeicherten Duftrichtung (Parfumo), nicht aus Noten berechnet:
  | 'erdig'
  | 'aquatisch'
  | 'gruen'
  | 'rauchig'
  | 'ledrig'
  | 'orientalisch'
  | 'synthetisch'
  | 'cremig'
  | 'gourmand'
  | 'harzig'
  | 'animalisch'
  | 'seifig'
  | 'chypre'
  | 'fougere'
  | 'alkoholisch';

export type Accord = { code: AccordCode; label: string; color: string; value: number };

const ACCORD_META: Record<AccordCode, { label: string; color: string }> = {
  zitrisch: { label: 'Zitrisch', color: '#E3B53C' },
  frisch: { label: 'Frisch', color: '#6FA8BF' },
  aromatisch: { label: 'Aromatisch', color: '#7D8F5A' },
  fruchtig: { label: 'Fruchtig', color: '#D9776A' },
  blumig: { label: 'Blumig', color: '#C77A9E' },
  pudrig: { label: 'Pudrig', color: '#B9A0C4' },
  suess: { label: 'Süss', color: '#C98B5B' },
  wuerzig: { label: 'Würzig', color: '#B4563C' },
  holzig: { label: 'Holzig', color: '#8A6744' },
  warm: { label: 'Warm & Amber', color: '#A8742C' },
  erdig: { label: 'Erdig', color: '#7A6248' },
  aquatisch: { label: 'Aquatisch', color: '#4F9BC2' },
  gruen: { label: 'Grün', color: '#6E9E5A' },
  rauchig: { label: 'Rauchig', color: '#6B6560' },
  ledrig: { label: 'Ledrig', color: '#7B4B32' },
  orientalisch: { label: 'Orientalisch', color: '#A35A3A' },
  synthetisch: { label: 'Synthetisch', color: '#9A9FA8' },
  cremig: { label: 'Cremig', color: '#C9B08A' },
  gourmand: { label: 'Gourmand', color: '#B7794A' },
  harzig: { label: 'Harzig', color: '#9C6B30' },
  animalisch: { label: 'Animalisch', color: '#8C5A4A' },
  seifig: { label: 'Seifig', color: '#8FB4C6' },
  chypre: { label: 'Chypre', color: '#6F7B4E' },
  fougere: { label: 'Fougère', color: '#5F7F6B' },
  alkoholisch: { label: 'Alkoholisch', color: '#8E3B46' }
};

// Duftrichtung, wie sie die Parfumo-Community angibt (deutsch oder englisch),
// in der Reihenfolge nach Stärke. Optional mit Prozentwert aus dem Diagramm.
export type StoredAccord = { code: AccordCode; value?: number | null };

const ACCORD_NAMES: Record<string, AccordCode> = {
  zitrus: 'zitrisch', zitrisch: 'zitrisch', citrus: 'zitrisch',
  frisch: 'frisch', fresh: 'frisch',
  aromatisch: 'aromatisch', aromatic: 'aromatisch',
  fruchtig: 'fruchtig', fruity: 'fruchtig',
  blumig: 'blumig', floral: 'blumig',
  pudrig: 'pudrig', powdery: 'pudrig',
  suss: 'suess', suess: 'suess', sweet: 'suess',
  wurzig: 'wuerzig', wuerzig: 'wuerzig', spicy: 'wuerzig',
  holzig: 'holzig', woody: 'holzig',
  amber: 'warm', warm: 'warm',
  erdig: 'erdig', earthy: 'erdig',
  aquatisch: 'aquatisch', aquatic: 'aquatisch',
  grun: 'gruen', gruen: 'gruen', green: 'gruen',
  rauchig: 'rauchig', smoky: 'rauchig',
  ledrig: 'ledrig', leathery: 'ledrig', leder: 'ledrig', leather: 'ledrig',
  orientalisch: 'orientalisch', oriental: 'orientalisch',
  synthetisch: 'synthetisch', synthetic: 'synthetisch',
  cremig: 'cremig', creamy: 'cremig',
  gourmand: 'gourmand',
  harzig: 'harzig', resinous: 'harzig',
  animalisch: 'animalisch', animalic: 'animalisch',
  seifig: 'seifig', soapy: 'seifig',
  chypre: 'chypre',
  fougere: 'fougere',
  alkoholisch: 'alkoholisch', boozy: 'alkoholisch'
};

function foldName(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z]/g, '');
}

export function accordCodeFor(name: string): AccordCode | null {
  return ACCORD_NAMES[foldName(name)] || null;
}

export function accordLabel(code: AccordCode): string {
  return ACCORD_META[code].label;
}

// Bereinigt gespeicherte Werte (Datenbank) – unbekannte Codes fallen weg.
export function cleanStoredAccords(input: unknown): StoredAccord[] {
  if (!Array.isArray(input)) return [];
  const out: StoredAccord[] = [];
  for (const item of input) {
    const code = item && typeof item === 'object' ? (item as Record<string, unknown>).code : null;
    if (typeof code !== 'string' || !(code in ACCORD_META) || out.some((a) => a.code === code)) continue;
    const raw = Number((item as Record<string, unknown>).value);
    out.push({ code: code as AccordCode, value: Number.isFinite(raw) && raw > 0 && raw <= 100 ? raw : null });
  }
  return out;
}

// Text „Holzig, Erdig 22, Zitrus" ↔ gespeicherte Liste. Unbekannte Namen werden gemeldet.
export function parseAccordText(text: string): { accords: StoredAccord[]; unknown: string[] } {
  const accords: StoredAccord[] = [];
  const unknown: string[] = [];
  for (const part of text.split(/[,;\n]/).map((s) => s.trim()).filter(Boolean)) {
    const m = part.match(/^(.*?)(?:\s*[:=]?\s*(\d+(?:[.,]\d+)?)\s*%?)?$/);
    const name = (m?.[1] || part).trim();
    const code = accordCodeFor(name);
    if (!code) {
      unknown.push(name);
      continue;
    }
    if (accords.some((a) => a.code === code)) continue;
    const value = m?.[2] ? Number(m[2].replace(',', '.')) : null;
    accords.push({ code, value: value != null && value > 0 && value <= 100 ? value : null });
  }
  return { accords, unknown };
}

export function accordsToText(list: StoredAccord[] | null | undefined): string {
  return (list || []).map((a) => (a.value ? `${accordLabel(a.code)} ${a.value}` : accordLabel(a.code))).join(', ');
}

// Balkenlänge ohne Prozentwerte: nur die Rangfolge ist bekannt.
const RANK_VALUES = [100, 82, 66, 52, 40, 30, 22];

// Stichworte (kleingeschrieben, Umlaute normalisiert) → Akkorde.
const KEYWORDS: [string, AccordCode[]][] = [
  ['bergamott', ['zitrisch', 'frisch']],
  ['zitrone', ['zitrisch', 'frisch']],
  ['limette', ['zitrisch', 'frisch']],
  ['mandarine', ['zitrisch', 'fruchtig']],
  ['orange', ['zitrisch', 'fruchtig']],
  ['grapefruit', ['zitrisch', 'frisch']],
  ['yuzu', ['zitrisch']],
  ['neroli', ['zitrisch', 'blumig']],
  ['petitgrain', ['zitrisch', 'frisch']],
  ['meer', ['frisch']],
  ['salz', ['frisch']],
  ['wasser', ['frisch']],
  ['aquat', ['frisch']],
  ['ozon', ['frisch']],
  ['minze', ['frisch', 'aromatisch']],
  // Lavendel, Rosmarin & Co. riechen kräuterig-aromatisch, nicht blumig.
  ['lavendel', ['aromatisch', 'frisch']],
  ['rosmarin', ['aromatisch', 'frisch']],
  ['salbei', ['aromatisch', 'frisch']],
  ['thymian', ['aromatisch']],
  ['basilikum', ['aromatisch', 'frisch']],
  ['wacholder', ['aromatisch', 'frisch']],
  ['koriander', ['wuerzig', 'aromatisch']],
  ['geranie', ['blumig', 'aromatisch']],
  ['tee', ['frisch']],
  ['gruen', ['frisch']],
  ['galbanum', ['frisch']],
  ['gurke', ['frisch']],
  ['birne', ['fruchtig']],
  ['apfel', ['fruchtig']],
  ['himbeer', ['fruchtig']],
  ['beere', ['fruchtig']],
  ['johannisbeer', ['fruchtig']],
  ['cassis', ['fruchtig']],
  ['kirsch', ['fruchtig', 'suess']],
  ['pfirsich', ['fruchtig']],
  ['aprikose', ['fruchtig']],
  ['litschi', ['fruchtig']],
  ['ananas', ['fruchtig']],
  ['melone', ['fruchtig', 'frisch']],
  ['mango', ['fruchtig']],
  ['pflaume', ['fruchtig', 'suess']],
  ['feige', ['fruchtig', 'holzig']],
  ['kokos', ['suess']],
  ['rose', ['blumig']],
  ['jasmin', ['blumig']],
  ['tuberose', ['blumig']],
  ['pfingstrose', ['blumig']],
  ['magnolie', ['blumig']],
  ['orangenbl', ['blumig']],
  ['ylang', ['blumig']],
  ['freesie', ['blumig']],
  ['maigl', ['blumig']],
  ['frangipani', ['blumig']],
  ['blume', ['blumig']],
  ['blute', ['blumig']],
  ['gardenie', ['blumig']],
  ['lilie', ['blumig']],
  ['veilchen', ['blumig', 'pudrig']],
  ['iris', ['pudrig', 'blumig']],
  ['heliotrop', ['pudrig', 'suess']],
  ['moschus', ['pudrig']],
  ['musk', ['pudrig']],
  ['aldehyd', ['pudrig', 'frisch']],
  ['vanille', ['suess', 'warm']],
  ['tonka', ['suess', 'warm']],
  ['karamell', ['suess']],
  ['praline', ['suess']],
  ['honig', ['suess']],
  ['kakao', ['suess']],
  ['schokolade', ['suess']],
  ['zucker', ['suess']],
  ['mandel', ['suess']],
  ['marshmallow', ['suess']],
  ['dattel', ['suess', 'fruchtig']],
  ['kaffee', ['suess', 'warm']],
  ['pfeffer', ['wuerzig']],
  ['kardamom', ['wuerzig']],
  ['zimt', ['wuerzig', 'warm']],
  ['safran', ['wuerzig', 'warm']],
  ['muskat', ['wuerzig']],
  ['ingwer', ['wuerzig', 'frisch']],
  ['nelke', ['wuerzig']],
  ['anis', ['wuerzig']],
  ['sandelholz', ['holzig']],
  ['zedern', ['holzig']],
  ['vetiver', ['holzig']],
  ['patchouli', ['holzig']],
  ['oud', ['holzig', 'warm']],
  ['guajak', ['holzig']],
  ['kaschmir', ['holzig', 'warm']],
  ['holz', ['holzig']],
  ['moos', ['holzig']],
  ['amber', ['warm']],
  ['ambra', ['warm']],
  ['ambrox', ['warm', 'holzig']],
  ['benzoe', ['warm', 'suess']],
  ['labdanum', ['warm']],
  ['weihrauch', ['warm', 'wuerzig']],
  ['myrrhe', ['warm']],
  ['leder', ['warm']],
  ['tabak', ['warm', 'suess']]
];

// Grundton je Duftfamilie, damit auch Düfte mit wenigen Noten ein Profil haben.
const FAMILY_BASE: Record<string, Partial<Record<AccordCode, number>>> = {
  clean: { frisch: 2, zitrisch: 1 },
  gourmand: { suess: 2, warm: 1 },
  woody: { holzig: 2, warm: 1 },
  floral: { blumig: 2, pudrig: 1 }
};

// Vereinheitlicht Schreibweisen, damit „Grüne Noten", „Gruene Noten" und
// „gruen" gleich erkannt werden.
function fold(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/ß/g, 'ss')
    .replace(/ae/g, 'a')
    .replace(/oe/g, 'o')
    .replace(/ue/g, 'u');
}

const FOLDED_KEYWORDS = KEYWORDS.map(([kw, codes]) => [fold(kw), codes] as const);

// Eigenschaftswörter auf „-anisch" (sizilianisch, toskanisch, marokkanisch …)
// enthalten „anis", sind aber keine Anis-Note.
function withoutAdjectives(n: string): string {
  return n.replace(/anisch/g, '');
}

function matchNote(note: string): AccordCode[] {
  const n = withoutAdjectives(fold(note));
  const hits = new Set<AccordCode>();
  for (const [kw, codes] of FOLDED_KEYWORDS) {
    if (n.includes(kw)) codes.forEach((c) => hits.add(c));
  }
  return [...hits];
}

// Ist eine Duftrichtung gespeichert, gilt sie – sonst wird aus den Noten berechnet.
export function computeAccords(p: Perfume, limit = 5): Accord[] {
  const stored = cleanStoredAccords(p.accords);
  if (stored.length) {
    const withValues = stored.every((a) => a.value);
    const max = withValues ? Math.max(...stored.map((a) => a.value as number)) : 100;
    return stored.slice(0, limit).map((a, i) => ({
      code: a.code,
      ...ACCORD_META[a.code],
      value: withValues ? Math.max(18, Math.round(((a.value as number) / max) * 100)) : RANK_VALUES[i] ?? 18
    }));
  }
  const score: Partial<Record<AccordCode, number>> = { ...FAMILY_BASE[p.fragrance_family || ''] };
  const layers: [string[] | null, number][] = [
    [p.top_notes, 1],
    [p.heart_notes, 1.3],
    [p.base_notes, 1.5]
  ];
  for (const [notes, weight] of layers) {
    for (const note of notes || []) {
      for (const code of matchNote(note)) score[code] = (score[code] || 0) + weight;
    }
  }
  const entries = Object.entries(score) as [AccordCode, number][];
  const max = Math.max(0, ...entries.map(([, v]) => v));
  if (max === 0) return [];
  return entries
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([code, v]) => ({
      code,
      ...ACCORD_META[code],
      // Mindestens 18 %, damit auch schwache Akkorde sichtbar bleiben.
      value: Math.max(18, Math.round((v / max) * 100))
    }));
}

// Die Noten eines Dufts, die zu einem Akkord beitragen (Kopf → Basis, ohne Doppelte).
// Für persönliche Texte wie „Zitrusnoten wie Zitrone und Apfel".
export function notesForAccord(p: Perfume, code: AccordCode): string[] {
  const all = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].map((n) => n.trim()).filter(Boolean);
  return all.filter((n, i) => all.findIndex((m) => m.toLowerCase() === n.toLowerCase()) === i && matchNote(n).includes(code));
}
