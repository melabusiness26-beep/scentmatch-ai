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

export interface PerfumeMatch {
  perfume: Perfume;
  score: number;
  matchType: 'exact' | 'name' | 'brand+notes';
}

/**
 * Sucht nach dem gescannten Duft in der Auressa-DB.
 *
 * Returniert Top 3 Matches mit detaillierter Scoring-Info.
 *
 * Strategie (mehrere Stufen):
 * 1. Exakter Name+Marke Match (slugified)
 * 2. Name allein mit hoher Übereinstimmung (>= 0.85) — deckt Schreibfehler ab
 * 3. Marke allein mit hoher Übereinstimmung + Noten-Overlap >= 60 %
 *    — deckt den Fall ab, wo KI den Parfüm-Namen falsch erkennt
 */
export function findPerfumeInDB(
  perfumeName: string,
  brandName: string,
  analysisNotes: { top: string[]; heart: string[]; base: string[] },
  allPerfumes: Perfume[]
): PerfumeMatch[] {
  const matches: PerfumeMatch[] = [];

  // Stufe 1: Name+Marke Matching
  const nameMatches: Array<{ perfume: Perfume; score: number }> = [];

  for (const p of allPerfumes) {
    const nameScore = nameSimilarity(perfumeName, p.perfume_name);
    const brandScore = nameSimilarity(brandName, p.brands?.name || '');
    const combined = nameScore * 0.65 + brandScore * 0.35;

    if (combined >= 0.65) {
      nameMatches.push({ perfume: p, score: combined });
      matches.push({
        perfume: p,
        score: combined,
        matchType: 'exact'
      });
    }
  }

  // Sortiere Name+Marke Matches nach Score
  nameMatches.sort((a, b) => b.score - a.score);

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[scanner-matcher] Name+Brand matches: ${nameMatches.slice(0, 3).map(m => `"${m.perfume.perfume_name}" (${m.score.toFixed(2)})`).join(', ')}`);
  }

  // Wenn gute Name+Marke Matches gefunden: Top 3 zurückgeben
  if (matches.length >= 3) return matches.slice(0, 3);
  if (matches.length > 0) {
    // Ergänze mit anderen Match-Typen falls nötig

    // Stufe 2: Nur Name sehr gut (KI hat Marke falsch geschrieben)
    const nameOnlyMatches: Array<{ perfume: Perfume; score: number }> = [];
    for (const p of allPerfumes) {
      const s = nameSimilarity(perfumeName, p.perfume_name);
      if (s >= 0.85 && !matches.some(m => m.perfume.id === p.id)) {
        nameOnlyMatches.push({ perfume: p, score: s });
      }
    }

    nameOnlyMatches.sort((a, b) => b.score - a.score);
    for (const m of nameOnlyMatches.slice(0, 3 - matches.length)) {
      matches.push({ perfume: m.perfume, score: m.score, matchType: 'name' });
    }
  }

  // Stufe 3: Marke passt gut + Noten-Overlap hoch
  if (matches.length < 3) {
    const allAnalysisNotes = [
      ...analysisNotes.top,
      ...analysisNotes.heart,
      ...analysisNotes.base,
    ].map(n => n.toLowerCase().trim());

    const noteMatches: Array<{ perfume: Perfume; score: number }> = [];

    for (const p of allPerfumes) {
      if (matches.some(m => m.perfume.id === p.id)) continue;

      const brandScore = nameSimilarity(brandName, p.brands?.name || '');
      if (brandScore < 0.55) continue;

      const dbNotes = [
        ...(p.top_notes || []),
        ...(p.heart_notes || []),
        ...(p.base_notes || []),
      ].map(n => n.toLowerCase().trim());

      if (dbNotes.length === 0) continue;

      const matchedNotes = allAnalysisNotes.filter(an =>
        dbNotes.some(dn => dn.includes(an) || an.includes(dn))
      ).length;
      const noteOverlap = matchedNotes / Math.max(allAnalysisNotes.length, 1);
      const combined = brandScore * 0.5 + noteOverlap * 0.5;

      if (combined >= 0.55) {
        noteMatches.push({ perfume: p, score: combined });
      }
    }

    noteMatches.sort((a, b) => b.score - a.score);
    for (const m of noteMatches.slice(0, 3 - matches.length)) {
      matches.push({ perfume: m.perfume, score: m.score, matchType: 'brand+notes' });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[scanner-matcher] Brand+Notes matches: ${noteMatches.slice(0, 3).map(m => `"${m.perfume.perfume_name}" (${m.score.toFixed(2)})`).join(', ')}`);
    }
  }

  return matches.slice(0, 3);
}

// Hilfsfunktion für Rückwärtskompatibilität
export function findPerfumeInDBFirst(
  perfumeName: string,
  brandName: string,
  analysisNotes: { top: string[]; heart: string[]; base: string[] },
  allPerfumes: Perfume[]
): Perfume | null {
  const matches = findPerfumeInDB(perfumeName, brandName, analysisNotes, allPerfumes);
  return matches.length > 0 ? matches[0].perfume : null;
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
