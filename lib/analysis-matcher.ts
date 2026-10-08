import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

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
