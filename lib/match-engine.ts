/* Match Engine – Scoring Algorithm für Duft-Empfehlungen */

import type { Perfume } from './perfumes';
import type { QuizState } from './quiz-types';

export interface MatchScore {
  perfumeId: string;
  perfumeName: string;
  totalScore: number;
  scores: {
    family: number;
    lovedNotes: number;
    dislikedNotes: number;
    occasion: number;
    season: number;
    sillage: number;
    budget: number;
  };
}

/* NOTE_THEMES: Keyword-Matching für Duftnoten */
const NOTE_THEMES: Record<string, string[]> = {
  bergamotte: ['bergamot', 'bergamotta', 'bergamote'],
  vanille: ['vanilla', 'vanillin', 'vanille'],
  moschus: ['musk', 'moschus', 'musc'],
  holz: ['wood', 'wooden', 'woody', 'holz'],
  blumig: ['floral', 'flower', 'blumig'],
  würzig: ['spice', 'spicy', 'würzig', 'cinnamon', 'pepper'],
  fruchtig: ['fruity', 'fruit', 'fruchtig', 'berry', 'citrus'],
  minz: ['mint', 'menthol', 'minze'],
  ambra: ['amber', 'ambra', 'ambroxan'],
  sandelholz: ['sandalwood', 'sandalholz'],
};

function noteMatchScore(
  perfumeNotes: string[],
  selectedNotes: string[],
  isLoved: boolean
): number {
  if (selectedNotes.length === 0) {
    return isLoved ? 12 : 4; /* Default score if no notes selected */
  }

  let matches = 0;
  for (const selected of selectedNotes) {
    const selectedLower = selected.toLowerCase();
    const themes = NOTE_THEMES[selectedLower] || [selectedLower];

    for (const note of perfumeNotes) {
      const noteLower = note.toLowerCase();
      if (
        themes.some((theme) => noteLower.includes(theme)) ||
        selectedLower.includes(noteLower)
      ) {
        matches++;
        break; /* Count each selected note once */
      }
    }
  }

  const matchRatio = matches / selectedNotes.length;

  if (isLoved) {
    return matchRatio >= 0.5 ? 20 : matchRatio >= 0.25 ? 10 : 4;
  } else {
    return matchRatio >= 0.5 ? 20 : 0; /* Disliked notes: harsh penalty */
  }
}

export function calculateMatchScore(
  perfume: Perfume,
  quizState: QuizState
): MatchScore {
  let totalScore = 0;
  const scores = {
    family: 0,
    lovedNotes: 0,
    dislikedNotes: 0,
    occasion: 0,
    season: 0,
    sillage: 0,
    budget: 0,
  };

  /* 1. Fragrance Family (30 points) */
  if (quizState.families.length > 0) {
    const familyLower = perfume.fragrance_family?.toLowerCase() || '';
    const selectedFamilies = quizState.families.filter(
      (f) => familyLower === f.toLowerCase()
    ).length;
    scores.family =
      (30 * selectedFamilies) / quizState.families.length;
  }
  totalScore += scores.family;

  /* 2. Loved Notes (20 points) */
  const allNotes = [
    ...(perfume.top_notes || []),
    ...(perfume.heart_notes || []),
    ...(perfume.base_notes || []),
  ];
  scores.lovedNotes = noteMatchScore(
    allNotes,
    quizState.lovedNotes,
    true
  );
  totalScore += scores.lovedNotes;

  /* 3. Disliked Notes (negative points) */
  const dislikedMatch = noteMatchScore(
    allNotes,
    quizState.dislikedNotes,
    false
  );
  if (dislikedMatch > 0) {
    totalScore -= 25; /* Hard penalty for disliked notes */
  }
  scores.dislikedNotes = dislikedMatch;

  /* 4. Occasion (13 points) */
  if (quizState.occasions.length > 0) {
    const occasion = (perfume.occasion || '').toLowerCase();
    const matchingOccasions = quizState.occasions.filter(
      (o) => occasion.includes(o) || o.includes(occasion)
    ).length;
    scores.occasion =
      (13 * matchingOccasions) / quizState.occasions.length;
  }
  totalScore += scores.occasion;

  /* 5. Season (12 points) */
  if (quizState.season) {
    const season = (perfume.season || '').toLowerCase();
    const seasonMatch =
      season === quizState.season.toLowerCase() ||
      season.includes(quizState.season.toLowerCase());
    scores.season = seasonMatch ? 12 : 0;
  }
  totalScore += scores.season;

  /* 6. Sillage / Intensity (10 points) */
  if (quizState.sillage) {
    const sillageMap: Record<string, number[]> = {
      light: [1, 2],
      moderate: [2, 3],
      intense: [3, 4, 5],
    };
    const targetSillage = sillageMap[quizState.sillage] || [];
    const perfumeSillage = perfume.sillage || 0;
    const sillageMatch = targetSillage.includes(Math.round(perfumeSillage));
    scores.sillage = sillageMatch ? 10 : perfumeSillage > 0 ? 5 : 0;
  }
  totalScore += scores.sillage;

  /* 7. Budget (15 points) */
  if (perfume.price_chf !== null) {
    const price = perfume.price_chf;
    const budgetMin = quizState.budgetMin;
    const budgetMax = quizState.budgetMax;

    if (price >= budgetMin && price <= budgetMax) {
      scores.budget = 15; /* Perfect budget match */
    } else if (price > budgetMax && price <= budgetMax * 1.3) {
      scores.budget = 7; /* Within 30% over budget */
    } else {
      scores.budget = 0; /* Over budget */
    }
  }
  totalScore += scores.budget;

  /* Clamp score to 0-100 */
  totalScore = Math.max(0, Math.min(100, totalScore));

  return {
    perfumeId: perfume.id,
    perfumeName: perfume.perfume_name,
    totalScore,
    scores,
  };
}

export function getTopMatches(
  perfumes: Perfume[],
  quizState: QuizState,
  limit: number = 10
): MatchScore[] {
  /* Apply hard filters first */
  const filtered = perfumes.filter((perfume) => {
    /* Gender filter */
    const gender = (perfume.gender || '').toLowerCase();
    const selected = quizState.gender || '';

    if (selected === 'woman') {
      return gender === 'women' || gender === 'unisex';
    } else if (selected === 'man') {
      return gender === 'men' || gender === 'unisex';
    } else if (selected === 'unisex') {
      return gender === 'unisex' || gender !== 'women' && gender !== 'men';
    }

    return true;
  });

  /* Calculate scores for all filtered perfumes */
  const scored = filtered.map((perfume) =>
    calculateMatchScore(perfume, quizState)
  );

  /* Sort by score descending */
  scored.sort((a, b) => b.totalScore - a.totalScore);

  /* Return top matches */
  return scored.slice(0, limit);
}

/* Anchor Duft Ranking: Similarity + Score blending */
export function rankByAnchor(
  matches: MatchScore[],
  anchorPerfume: Perfume | null,
  allPerfumes: Perfume[]
): MatchScore[] {
  if (!anchorPerfume) {
    return matches;
  }

  const anchorNotes = [
    ...(anchorPerfume.top_notes || []),
    ...(anchorPerfume.heart_notes || []),
    ...(anchorPerfume.base_notes || []),
  ];

  return matches
    .map((match) => {
      const perfume = allPerfumes.find(
        (p) => p.id === match.perfumeId
      );

      if (!perfume) {
        return match;
      }

      /* Exclude anchor perfume from results */
      if (perfume.id === anchorPerfume.id) {
        return { ...match, totalScore: -999 };
      }

      const perfumeNotes = [
        ...(perfume.top_notes || []),
        ...(perfume.heart_notes || []),
        ...(perfume.base_notes || []),
      ];

      /* Calculate similarity score */
      let similarity = 0;

      /* Same family: +35 */
      if (
        perfume.fragrance_family ===
        anchorPerfume.fragrance_family
      ) {
        similarity += 35;
      }

      /* Shared notes: up to +45 */
      const sharedNotes = anchorNotes.filter((note) =>
        perfumeNotes.some(
          (pn) => pn.toLowerCase() === note.toLowerCase()
        )
      );
      similarity += Math.min(45, sharedNotes.length * 5);

      /* Same gender: +10 */
      if (perfume.gender === anchorPerfume.gender) {
        similarity += 10;
      }

      /* Similar sillage: +10 */
      if (
        perfume.sillage &&
        anchorPerfume.sillage &&
        Math.abs(perfume.sillage - anchorPerfume.sillage) <= 1
      ) {
        similarity += 10;
      }

      /* Blend: 55% similarity + 45% score */
      const blendedScore =
        0.55 * (similarity / 100) * 100 +
        0.45 * match.totalScore;

      return {
        ...match,
        totalScore: blendedScore,
      };
    })
    .filter((m) => m.totalScore >= -100) /* Remove excluded anchor */
    .sort((a, b) => b.totalScore - a.totalScore);
}
