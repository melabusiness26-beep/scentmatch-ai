import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

// ─── DB-Lookup: Ist der gescannte Duft in der Auressa-DB? ─────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function nameSimilarity(a: string, b: string): number {
  const sa = slugify(a);
  const sb = slugify(b);
  if (sa === sb) return 1;
  if (sa.includes(sb) || sb.includes(sa)) return 0.85;
  // Levenshtein-ähnliche Heuristik: Zeichenüberlappung
  const setA = new Set(sa.split(' '));
  const setB = new Set(sb.split(' '));
  const intersection = [...setA].filter(w => setB.has(w)).length;
  const union = new Set([...setA, ...setB]).size;
  return union > 0 ? intersection / union : 0;
}

/**
 * Sucht nach dem gescannten Duft in der Auressa-DB.
 *
 * Strategie (mehrere Stufen):
 * 1. Exakter Name+Marke Match (slugified)
 * 2. Name allein mit hoher Übereinstimmung (>= 0.8) — deckt Schreibfehler ab
 * 3. Marke allein mit hoher Übereinstimmung + Noten-Overlap >= 50 %
 *    — deckt den Fall ab, wo KI den Parfüm-Namen falsch erkennt
 */
export function findPerfumeInDB(
  perfumeName: string,
  brandName: string,
  analysisNotes: { top: string[]; heart: string[]; base: string[] },
  allPerfumes: Perfume[]
): Perfume | null {
  // Stufe 1 & 2: Name+Marke Matching
  let bestMatch: Perfume | null = null;
  let bestScore = 0;

  for (const p of allPerfumes) {
    const nameScore = nameSimilarity(perfumeName, p.perfume_name);
    const brandScore = nameSimilarity(brandName, p.brands?.name || '');
    const combined = nameScore * 0.6 + brandScore * 0.4;
    if (combined > bestScore) {
      bestScore = combined;
      bestMatch = p;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[scanner-matcher] Best name+brand match: "${bestMatch?.perfume_name}" by "${bestMatch?.brands?.name}" (score: ${bestScore.toFixed(2)})`);
  }

  // Stufe 1: Guter Name+Marke Match
  if (bestScore >= 0.6) return bestMatch;

  // Stufe 2: Nur Name sehr gut (KI hat Marke falsch geschrieben)
  let bestNameOnly: Perfume | null = null;
  let bestNameScore = 0;
  for (const p of allPerfumes) {
    const s = nameSimilarity(perfumeName, p.perfume_name);
    if (s > bestNameScore) { bestNameScore = s; bestNameOnly = p; }
  }
  if (bestNameScore >= 0.8) return bestNameOnly;

  // Stufe 3: Marke passt gut + Noten-Overlap hoch
  // (deckt den Fall ab: Marke erkannt, aber Name falsch z.B. "Comotù" → "Comoró")
  const allAnalysisNotes = [
    ...analysisNotes.top,
    ...analysisNotes.heart,
    ...analysisNotes.base,
  ].map(n => n.toLowerCase().trim());

  let bestNoteMatch: Perfume | null = null;
  let bestNoteScore = 0;

  for (const p of allPerfumes) {
    const brandScore = nameSimilarity(brandName, p.brands?.name || '');
    if (brandScore < 0.5) continue; // Marke muss halbwegs passen

    const dbNotes = [
      ...(p.top_notes || []),
      ...(p.heart_notes || []),
      ...(p.base_notes || []),
    ].map(n => n.toLowerCase().trim());

    if (dbNotes.length === 0) continue;

    const matches = allAnalysisNotes.filter(an =>
      dbNotes.some(dn => dn.includes(an) || an.includes(dn))
    ).length;
    const noteOverlap = matches / Math.max(allAnalysisNotes.length, 1);
    const combined = brandScore * 0.5 + noteOverlap * 0.5;

    if (combined > bestNoteScore) {
      bestNoteScore = combined;
      bestNoteMatch = p;
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[scanner-matcher] Best brand+notes match: "${bestNoteMatch?.perfume_name}" (score: ${bestNoteScore.toFixed(2)})`);
  }

  // Nur zurückgeben bei ausreichendem Combined-Score
  return bestNoteScore >= 0.45 ? bestNoteMatch : null;
}

// Hilfsfunktion: Noten-Strings normalisieren für Vergleich
function normalizeNote(note: string): string {
  return note.toLowerCase().trim();
}

// Synonyme für Noten
const NOTE_SYNONYMS: Record<string, string[]> = {
  'bergamot': ['bergamote', 'bergamotta'],
  'vanilla': ['vanille', 'vanillin'],
  'musk': ['moschus', 'musque'],
  'amber': ['ambre', 'ambroxan'],
  'cedar': ['cedarwood', 'zedernholz'],
  'rose': ['rosenöl', 'rosenduft'],
  'jasmine': ['jasminum', 'jasmin'],
  'sandalwood': ['sandal', 'santalholz'],
};

// Prüfe, ob zwei Noten ähnlich sind
function notesAreSimilar(note1: string, note2: string): boolean {
  const n1 = normalizeNote(note1);
  const n2 = normalizeNote(note2);

  if (n1 === n2) return true;

  // Prüfe Synonyme
  for (const [key, synonyms] of Object.entries(NOTE_SYNONYMS)) {
    const allVariants = [key, ...synonyms];
    if (allVariants.includes(n1) && allVariants.includes(n2)) {
      return true;
    }
  }

  // Substring-Check für Teilmatches
  if (n1.includes(n2) || n2.includes(n1)) {
    return true;
  }

  return false;
}

// Berechne Ähnlichkeitsscore zwischen Analyse und Perfume
function calculateSimilarityScore(analysis: ImageAnalysisResult['data'], perfume: Perfume): number {
  let score = 0;
  const maxScore = 100;

  // 1. Duftfamilie-Match (30 Punkte)
  if (analysis.family.toLowerCase() === (perfume.fragrance_family || '').toLowerCase()) {
    score += 30;
  } else if (
    analysis.family.toLowerCase().includes((perfume.fragrance_family || '').toLowerCase()) ||
    (perfume.fragrance_family || '').toLowerCase().includes(analysis.family.toLowerCase())
  ) {
    score += 15;
  }

  // 2. Noten-Übereinstimmung (35 Punkte)
  const analysisNotes = [
    ...analysis.notes.top,
    ...analysis.notes.heart,
    ...analysis.notes.base,
  ];
  const perfumeNotes = [
    ...(perfume.top_notes || []),
    ...(perfume.heart_notes || []),
    ...(perfume.base_notes || []),
  ];

  const matchingNotes = analysisNotes.filter((note) =>
    perfumeNotes.some((pNote) => notesAreSimilar(note, pNote))
  );

  if (matchingNotes.length > 0) {
    const noteScore = (matchingNotes.length / Math.max(analysisNotes.length, 1)) * 35;
    score += Math.min(noteScore, 35);
  }

  // 3. Intensität-Match (20 Punkte)
  if (analysis.intensity && perfume.sillage !== null && perfume.sillage !== undefined) {
    const intensityMap: Record<string, number> = {
      very_light: 1,
      light: 2,
      medium: 3,
      strong: 4,
      very_strong: 5,
    };

    // Konvertiere Sillage-Zahl (1-10) zu Skala (1-5)
    const sillageScale = Math.ceil((perfume.sillage as number) / 2);

    const analysisIntensity = intensityMap[analysis.intensity] || 3;
    const perfumeIntensity = Math.min(sillageScale, 5);

    const intensityDiff = Math.abs(analysisIntensity - perfumeIntensity);
    if (intensityDiff <= 1) {
      score += 20;
    } else if (intensityDiff === 2) {
      score += 10;
    }
  }

  // 4. Geschlecht-Match (15 Punkte)
  if (analysis.gender && perfume.gender) {
    const genderMatch =
      analysis.gender === perfume.gender ||
      perfume.gender === 'Unisex' ||
      (analysis.gender === 'woman' && perfume.gender === 'Women') ||
      (analysis.gender === 'man' && perfume.gender === 'Men');

    if (genderMatch) {
      score += 15;
    }
  }

  return Math.min(score, maxScore);
}

// Finde ähnliche Parfüme basierend auf Analyse
export function findSimilarPerfumes(
  analysis: ImageAnalysisResult['data'],
  allPerfumes: Perfume[],
  minScore: number = 40,
  maxResults: number = 7
): Perfume[] {
  const scores = allPerfumes.map((perfume) => ({
    perfume,
    score: calculateSimilarityScore(analysis, perfume),
  }));

  // Sortiere nach Score absteigend
  scores.sort((a, b) => b.score - a.score);

  // Filtere: minScore erfüllt UND nicht das gleiche Parfüm (Name/Marke)
  const filtered = scores
    .filter((s) => s.score >= minScore)
    .filter(
      (s) =>
        !(
          s.perfume.perfume_name.toLowerCase() === analysis.perfumeName.toLowerCase() &&
          analysis.brandName.toLowerCase().includes(s.perfume.brands?.name?.toLowerCase() || '')
        )
    )
    .slice(0, maxResults);

  return filtered.map((s) => s.perfume);
}
