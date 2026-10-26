import type { Perfume } from './perfumes';

// Duftcharakter („Akkorde") – aus den Noten eines Dufts berechnet.
// Jede Note zählt für einen oder mehrere Akkorde; Basisnoten wiegen etwas
// mehr, weil sie den Duft am längsten prägen. Ergebnis 0–100 je Akkord,
// der stärkste Akkord = 100. Bewusst eigene, einfache Logik – keine
// übernommenen Daten von Duft-Datenbanken.

export type AccordCode =
  | 'zitrisch'
  | 'frisch'
  | 'fruchtig'
  | 'blumig'
  | 'pudrig'
  | 'suess'
  | 'wuerzig'
  | 'holzig'
  | 'warm';

export type Accord = { code: AccordCode; label: string; color: string; value: number };

const ACCORD_META: Record<AccordCode, { label: string; color: string }> = {
  zitrisch: { label: 'Zitrisch', color: '#E3B53C' },
  frisch: { label: 'Frisch', color: '#6FA8BF' },
  fruchtig: { label: 'Fruchtig', color: '#D9776A' },
  blumig: { label: 'Blumig', color: '#C77A9E' },
  pudrig: { label: 'Pudrig', color: '#B9A0C4' },
  suess: { label: 'Süss', color: '#C98B5B' },
  wuerzig: { label: 'Würzig', color: '#B4563C' },
  holzig: { label: 'Holzig', color: '#8A6744' },
  warm: { label: 'Warm & Amber', color: '#A8742C' }
};

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
  ['minze', ['frisch']],
  ['lavendel', ['frisch', 'blumig']],
  ['rosmarin', ['frisch', 'wuerzig']],
  ['salbei', ['frisch', 'wuerzig']],
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

function matchNote(note: string): AccordCode[] {
  const n = fold(note);
  const hits = new Set<AccordCode>();
  for (const [kw, codes] of FOLDED_KEYWORDS) {
    if (n.includes(kw)) codes.forEach((c) => hits.add(c));
  }
  return [...hits];
}

export function computeAccords(p: Perfume, limit = 5): Accord[] {
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
