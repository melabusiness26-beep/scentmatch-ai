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

// Berechnet Ähnlichkeit mit asymmetrischer Abdeckung + Jaccard
function computeWeightedSimilarity(
  notes1: string[] | null,
  notes2: string[] | null,
  frequencies: Map<string, number>,
  totalPerfumes: number
): {
  score: number;
  coverage: number; // Asymmetrisch: wie viel von notes1 ist in notes2?
  shared: string[];
  different: string[];
  sharedWeight: number;
  weight1: number;
} {
  if (!notes1) notes1 = [];
  if (!notes2) notes2 = [];
  const set1 = new Set(notes1);
  const set2 = new Set(notes2);

  // Berechne Gewichte
  let weight1 = 0;
  let sharedWeight = 0;
  const shared: string[] = [];

  for (const note of set1) {
    const w = noteRarityWeight(note, frequencies, totalPerfumes);
    weight1 += w;
    if (set2.has(note)) {
      shared.push(note);
      sharedWeight += w;
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

  // Asymmetrische Abdeckung: wie viel von notes1 hat notes2?
  const coverage = weight1 > 0 ? (sharedWeight / weight1) : 0;

  // Jaccard für Symmetrie (bestraft lange Listen weniger wenn hohe coverage)
  const allNotes = new Set([...set1, ...set2]);
  if (allNotes.size === 0) return { score: 0, coverage: 0, shared, different, sharedWeight: 0, weight1: 0 };

  let allWeight = 0;
  for (const note of allNotes) {
    allWeight += noteRarityWeight(note, frequencies, totalPerfumes);
  }

  const jaccard = allWeight > 0 ? (sharedWeight / allWeight) : 0;

  // Kombiniere Coverage (dominant) mit Jaccard (Bias gegen lange Listen)
  const score = coverage * 0.65 + jaccard * 0.35;

  return { score, coverage, shared, different, sharedWeight, weight1 };
}

// Hauptfunktion: Berechne Ähnlichkeit zwischen zwei Düften
export function computeSimilarity(
  anchor: Perfume,
  target: Perfume,
  allPerfumes: Perfume[],
  frequencies?: Map<string, number>
): {
  level: 'sehr ähnlich' | 'ähnliche Richtung' | 'teilt einzelne Noten' | null;
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

  // Zähle Layer mit Übereinstimmungen
  const layersWithMatch = [topSim.shared.length > 0, heartSim.shared.length > 0, baseSim.shared.length > 0].filter(Boolean).length;

  // Identifiziere die 2-3 seltenen (wertvollsten) Noten des Anchors
  const allAnchorNotes = [...topA, ...heartA, ...baseA];
  const rareAnchorNotes = allAnchorNotes
    .sort((a, b) => {
      const weightA = noteRarityWeight(a, freq, totalPerfumes);
      const weightB = noteRarityWeight(b, freq, totalPerfumes);
      return weightB - weightA;
    })
    .slice(0, 3);

  const sharesRareNote = rareAnchorNotes.some(note => {
    const allTargetNotes = new Set([...topT, ...heartT, ...baseT]);
    return allTargetNotes.has(note);
  });

  // Gewichte Coverage statt Score für bessere Unterscheidung
  const baseCoverage = baseSim.coverage;
  const heartCoverage = heartSim.coverage;
  const topCoverage = topSim.coverage;
  const minCoverage = Math.min(baseCoverage, heartCoverage, topCoverage);
  const avgCoverage = (baseCoverage * 3 + heartCoverage * 2 + topCoverage * 1) / 6;

  // Berechne targetShare: Wieviel eindeutige Noten des Targets sind im Anchor vorhanden?
  // Ungewichtet, nach consolidateNotes. Prüft, dass Target nicht zu viele exklusive Noten hat.
  const anchorNoteSet = new Set(allAnchorNotes);
  const targetNoteSet = new Set([...topT, ...heartT, ...baseT]);
  let matchedTargetNotes = 0;
  for (const note of targetNoteSet) {
    if (anchorNoteSet.has(note)) {
      matchedTargetNotes++;
    }
  }
  const targetShare = targetNoteSet.size > 0 ? matchedTargetNotes / targetNoteSet.size : 0;

  // Gewichtet: Base 3x, Heart 2x, Top 1x mit Bonus für coverage
  const baseScore = baseSim.score * 40;
  const heartScore = heartSim.score * 35;
  const topScore = topSim.score * 20;

  let score = baseScore + heartScore + topScore; // max 95

  // Duftfamilie als kleiner Bonus (max 5)
  if (anchor.fragrance_family && anchor.fragrance_family === target.fragrance_family) {
    score += 5;
  }

  score = Math.min(99, score);

  // Bestimme Level: Asymmetrische, strengere Kriterien
  let level: 'sehr ähnlich' | 'ähnliche Richtung' | 'teilt einzelne Noten' | null = null;

  // "Sehr ähnlich": Hohe Coverage + mindestens 2 Layer + mindestens eine seltene Note + Target hat nicht zu viele exklusive Noten
  // targetShare >= 0.65 stellt sicher, dass Target keine zu vielen exklusiven Noten hat
  if (avgCoverage >= 0.65 && layersWithMatch >= 2 && sharesRareNote && targetShare >= 0.65) {
    level = 'sehr ähnlich';
  }
  // "Ähnliche Richtung": Moderate Coverage oder gute Jaccard-Ähnlichkeit
  else if (avgCoverage >= 0.45 || (layersWithMatch >= 2 && Math.max(baseSim.score, heartSim.score) >= 0.35)) {
    level = 'ähnliche Richtung';
  }
  // "Teilt einzelne Noten": Mindestens eine geteilte Note in einer Layer
  else if (topSim.shared.length > 0 || heartSim.shared.length > 0 || baseSim.shared.length > 0) {
    level = 'teilt einzelne Noten';
  }

  return {
    level,
    score: Math.round(score),
    sharedNotes: {
      top: topSim.shared.map(capitalizeNote),
      heart: heartSim.shared.map(capitalizeNote),
      base: baseSim.shared.map(capitalizeNote),
    },
    differentNotes: {
      top: topSim.different.map(capitalizeNote),
      heart: heartSim.different.map(capitalizeNote),
      base: baseSim.different.map(capitalizeNote),
    },
  };
}

// Kapitalisiere Noten für Anzeige (z.B. "Lavendel" statt "lavendel")
function capitalizeNote(note: string): string {
  return note.charAt(0).toUpperCase() + note.slice(1);
}

export type SimilarPerfumeV2 = {
  perfume: Perfume;
  level: 'sehr ähnlich' | 'ähnliche Richtung' | 'teilt einzelne Noten';
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
      const levelOrder = { 'sehr ähnlich': 3, 'ähnliche Richtung': 2, 'teilt einzelne Noten': 1 };
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
      const levelOrder = { 'sehr ähnlich': 3, 'ähnliche Richtung': 2, 'teilt einzelne Noten': 1 };
      const levelDiff = levelOrder[b.level] - levelOrder[a.level];
      if (levelDiff !== 0) return levelDiff;
      return b.score - a.score;
    })
    .slice(0, limit);
}
