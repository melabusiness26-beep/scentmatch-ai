import { Perfume } from './perfumes';

// Sammelbegriffe, die nur halbes Gewicht zählen (wenig aussagekräftig)
const GENERIC_NOTES = new Set(['holz', 'hölzer', 'holznoten', 'fruchtnoten', 'früchte', 'beeren',
  'grüne noten', 'grüne note', 'wässrige noten', 'wassernoten', 'harze', 'rote früchte',
  'rote beeren', 'tropische früchte', 'blüten', 'weisse blüten', 'weiße blüten']);

// Synonym-Gruppen: Schreibvarianten derselben Note
const NOTE_SYNONYMS: Record<string, string[]> = {
  vanille: ['vanille', 'vanilla', 'bourbon-vanille', 'schwarze vanille', 'salzige vanille'],
  tonka: ['tonka', 'tonkabohne', 'tonka-bohne'],
  oud: ['oud', 'agarwood', 'oudh'],
  zeder: ['zeder', 'zedernholz', 'zedern', 'weiße zeder', 'atlas-zeder', 'virginische zeder'],
  sandelholz: ['sandelholz', 'sandel', 'sandalwood', 'östliches sandelholz', 'indisches sandelholz'],
  patchouli: ['patchouli'],
  veilchen: ['veilchen', 'violet'],
  moschus: ['moschus', 'musk', 'weißer moschus', 'pink moschus', 'kristallmoschus'],
  ambroxan: ['ambroxan', 'ambroxide'],
  labdanum: ['labdanum', 'labdana'],
  leder: ['leder', 'leather'],
  amber: ['amber', 'bernstein', 'weißer amber', 'bitterer amber'],
  weihrauch: ['weihrauch', 'olibanum', 'frankincense'],
  benzoe: ['benzoe', 'benzoin'],
  kakao: ['kakao', 'cocoa'],

  jasmin: ['jasmin', 'jasmine', 'jasminblüte', 'sambac-jasmin', 'jasmin sambac', 'wasserjasmin'],
  rose: ['rose', 'rosa', 'rosenblüte', 'türkische rose', 'bulgarische rose', 'damaszener rose',
    'grasse-rose', 'weiße rose', 'wildrose'],
  tuberose: ['tuberose', 'tuberose-blüte', 'tuberose-note'],
  ylang: ['ylang-ylang', 'ylang'],
  iris: ['iris', 'irispulver', 'orris-wurzel', 'iriswurzel'],
  neroli: ['neroli', 'neroliöl'],
  geranie: ['geranie', 'geranium', 'pelargonie'],
  orangenblüte: ['orangenblüte', 'orange blossom', 'orangenblüte', 'neroli-orange'],
  gardenie: ['gardenie', 'gardenia'],
  freesie: ['freesie', 'freesia'],
  maiglöckchen: ['maiglöckchen', 'muguet', 'lily of the valley'],
  flieder: ['flieder', 'lilac', 'grüner flieder'],
  pfingstrose: ['pfingstrose', 'peony', 'pfingstrose-blüte'],
  magnolie: ['magnolie', 'magnolia'],
  lilie: ['lilie', 'weiße lilie', 'casablanca-lilie'],

  bergamotte: ['bergamotte', 'bergamott', 'calabria-bergamotte'],
  zitrone: ['zitrone', 'lemon', 'zitronensaft'],
  grapefruit: ['grapefruit', 'pampelmuse'],
  mandarine: ['mandarine', 'mandarin', 'tangerine', 'grüne mandarine', 'sizilianische mandarine'],
  orange: ['orange', 'orange-schale', 'süßorange', 'blutorange'],
  bitterorange: ['bitterorange', 'seville orange'],
  minze: ['minze', 'peppermint', 'pfefferminze', 'grüne minze', 'spearmint'],
  zitronengras: ['zitronengras', 'lemongrass'],
  meeresnoten: ['meeresnoten', 'marine-noten', 'aquatic-noten', 'meeresnoten', 'wassernoten', 'wässrige noten'],
  rosa_pfeffer: ['rosa pfeffer', 'pink pfeffer'],
  schwarzer_pfeffer: ['schwarzer pfeffer', 'pfeffer', 'weißer pfeffer'],
};

// Verwandte Noten (zählen nur halb als Ähnlichkeit)
const RELATED_NOTES: Array<[string, string]> = [
  ['vanille', 'tonka'],
  ['kakao', 'schokolade'],
  ['geranie', 'rose'],
  ['zitrone', 'grapefruit'],
  ['orange', 'mandarine'],
  ['orange', 'bitterorange'],
  ['neroli', 'orangenblüte'],
  ['ylang', 'cananga'],
  ['minze', 'pfefferminze'],
  ['rosa_pfeffer', 'schwarzer_pfeffer'],
];

// Normalisierung: Groß-/Kleinschreibung, ß→ss, Leerzeichen
function normalizeNote(note: string): string {
  return note
    .toLowerCase()
    .replace(/ß/g, 'ss')
    .replace(/\s+/g, ' ')
    .trim();
}

// Findet die Synonym-Gruppe einer Note
function findSynonymGroup(normalizedNote: string): string | null {
  for (const [groupKey, variants] of Object.entries(NOTE_SYNONYMS)) {
    if (variants.includes(normalizedNote)) return groupKey;
  }
  return null;
}

// Konsolidiert Noten (mehrere Schreibvarianten → eine repräsentative)
function consolidateNotes(notes: string[] | null): string[] {
  if (!notes) return [];
  const consolidated = new Map<string, string>(); // group -> canonical note

  for (const note of notes) {
    const normalized = normalizeNote(note);
    const group = findSynonymGroup(normalized);

    if (group) {
      consolidated.set(group, normalized); // Schreibvariante des Katalogs behalten
    } else {
      consolidated.set(normalized, normalized); // Einzelnote unverändert
    }
  }

  return Array.from(consolidated.values());
}

// Berechnet die Häufigkeit aller Noten im Katalog
export function calculateNoteFrequencies(allPerfumes: Perfume[]): Map<string, number> {
  const frequencies = new Map<string, number>();

  for (const p of allPerfumes) {
    const all = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])];
    for (const note of consolidateNotes(all)) {
      frequencies.set(note, (frequencies.get(note) || 0) + 1);
    }
  }

  return frequencies;
}

// Inverse Häufigkeit als Gewicht: seltene Noten zählen mehr
function noteRarityWeight(note: string, frequencies: Map<string, number>, totalPerfumes: number): number {
  const frequency = frequencies.get(note) || 0;
  const percent = frequency / totalPerfumes;

  // log(totalPerfumes / frequency) mit Undergrenze, damit häufige Noten nicht ganz wegfallen
  const rarity = Math.max(0.3, Math.log(totalPerfumes / Math.max(1, frequency)));

  // Sammelbegriffe: halbes Gewicht
  const isGeneric = GENERIC_NOTES.has(note);
  return isGeneric ? rarity * 0.5 : rarity;
}

// Berechnet Jaccard-Ähnlichkeit zweier Note-Arrays mit Gewichtung
function computeWeightedSimilarity(
  notes1: string[] | null,
  notes2: string[] | null,
  frequencies: Map<string, number>,
  totalPerfumes: number
): { score: number; shared: string[]; different: string[] } {
  if (!notes1) notes1 = [];
  if (!notes2) notes2 = [];
  const set1 = new Set(notes1);
  const set2 = new Set(notes2);

  // Gemeinsame Noten
  const shared: string[] = [];
  let sharedWeight = 0;
  for (const note of set1) {
    if (set2.has(note)) {
      shared.push(note);
      sharedWeight += noteRarityWeight(note, frequencies, totalPerfumes);
    }
  }

  // Unterschiedliche Noten
  const different: string[] = [];
  for (const note of set1) {
    if (!set2.has(note)) different.push(note);
  }
  for (const note of set2) {
    if (!set1.has(note)) different.push(note);
  }

  // Jaccard: gemeinsam / (insgesamt ohne Duplikate)
  const allNotes = new Set([...set1, ...set2]);
  if (allNotes.size === 0) return { score: 0, shared, different };

  let allWeight = 0;
  for (const note of allNotes) {
    allWeight += noteRarityWeight(note, frequencies, totalPerfumes);
  }

  const similarity = allWeight > 0 ? (sharedWeight / allWeight) : 0;
  return { score: similarity, shared, different };
}

// Hauptfunktion: Berechne Ähnlichkeit zwischen zwei Düften
export function computeSimilarity(
  anchor: Perfume,
  target: Perfume,
  allPerfumes: Perfume[],
  frequencies?: Map<string, number>
): {
  level: 'sehr ähnlich' | 'ähnliche Richtung' | 'gleiche Duftfamilie' | null;
  score: number;
  sharedNotes: { top: string[]; heart: string[]; base: string[] };
  differentNotes: { top: string[]; heart: string[]; base: string[] };
} {
  if (anchor.id === target.id) {
    return { level: 'sehr ähnlich', score: 100, sharedNotes: { top: [], heart: [], base: [] }, differentNotes: { top: [], heart: [], base: [] } };
  }

  const freq = frequencies || calculateNoteFrequencies(allPerfumes);
  const totalPerfumes = allPerfumes.length;

  // Konsolidierte Noten pro Layer
  const topA = consolidateNotes(anchor.top_notes);
  const heartA = consolidateNotes(anchor.heart_notes);
  const baseA = consolidateNotes(anchor.base_notes);

  const topT = consolidateNotes(target.top_notes);
  const heartT = consolidateNotes(target.heart_notes);
  const baseT = consolidateNotes(target.base_notes);

  // Ähnlichkeit pro Layer
  const topSim = computeWeightedSimilarity(topA, topT, freq, totalPerfumes);
  const heartSim = computeWeightedSimilarity(heartA, heartT, freq, totalPerfumes);
  const baseSim = computeWeightedSimilarity(baseA, baseT, freq, totalPerfumes);

  // Gewichtet: Base 3x, Heart 2x, Top 1x
  const baseScore = baseSim.score * 40; // 40 Punkte max
  const heartScore = heartSim.score * 35; // 35 Punkte max
  const topScore = topSim.score * 20; // 20 Punkte max

  let score = baseScore + heartScore + topScore; // max 95

  // Duftfamilie als kleiner Bonus (max 5)
  if (anchor.fragrance_family && anchor.fragrance_family === target.fragrance_family) {
    score += 5;
  }

  score = Math.min(99, score); // Nie 100%

  // Bestimme Level
  let level: 'sehr ähnlich' | 'ähnliche Richtung' | 'gleiche Duftfamilie' | null = null;
  if (score >= 45) level = 'sehr ähnlich';
  else if (score >= 30) level = 'ähnliche Richtung';
  else if (score >= 15) level = 'gleiche Duftfamilie';

  return {
    level,
    score: Math.round(score),
    sharedNotes: {
      top: topSim.shared,
      heart: heartSim.shared,
      base: baseSim.shared,
    },
    differentNotes: {
      top: topSim.different,
      heart: heartSim.different,
      base: baseSim.different,
    },
  };
}

export type SimilarPerfumeV2 = {
  perfume: Perfume;
  level: 'sehr ähnlich' | 'ähnliche Richtung' | 'gleiche Duftfamilie';
  score: number;
  sharedNotes: { top: string[]; heart: string[]; base: string[] };
  differentNotes: { top: string[]; heart: string[]; base: string[] };
};

// Findet ähnliche Düfte
export function findSimilarPerfumesV2(target: Perfume, pool: Perfume[], limit = 4): SimilarPerfumeV2[] {
  const frequencies = calculateNoteFrequencies(pool);

  return pool
    .filter((p) => p.id !== target.id)
    .map((p) => {
      const sim = computeSimilarity(target, p, pool, frequencies);
      return { perfume: p, ...sim };
    })
    .filter((s): s is SimilarPerfumeV2 => s.level !== null) // Nur Treffer anzeigen
    .sort((a, b) => {
      // Sortiere nach Level, dann nach Score
      const levelOrder = { 'sehr ähnlich': 3, 'ähnliche Richtung': 2, 'gleiche Duftfamilie': 1 };
      const levelDiff = levelOrder[b.level] - levelOrder[a.level];
      if (levelDiff !== 0) return levelDiff;
      return b.score - a.score;
    })
    .slice(0, limit);
}

// Findet günstige Alternativen (mind. "ähnliche Richtung" + 30% günstiger)
export function findCheaperAlternativesV2(target: Perfume, pool: Perfume[], limit = 3): SimilarPerfumeV2[] {
  const targetPrice = target.price_chf;
  if (targetPrice == null) return [];

  const frequencies = calculateNoteFrequencies(pool);

  return pool
    .filter((p) => p.id !== target.id)
    .filter((p) => p.price_chf != null && p.price_chf <= targetPrice * 0.7) // 30% günstiger
    .map((p) => {
      const sim = computeSimilarity(target, p, pool, frequencies);
      return { perfume: p, ...sim };
    })
    .filter((s): s is SimilarPerfumeV2 => s.level === 'sehr ähnlich' || s.level === 'ähnliche Richtung') // Nur "ähnliche Richtung" oder besser
    .sort((a, b) => {
      const levelOrder = { 'sehr ähnlich': 3, 'ähnliche Richtung': 2, 'gleiche Duftfamilie': 1 };
      const levelDiff = levelOrder[b.level] - levelOrder[a.level];
      if (levelDiff !== 0) return levelDiff;
      return b.score - a.score;
    })
    .slice(0, limit);
}
