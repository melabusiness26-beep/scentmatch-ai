import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

export function findSimilarPerfumes(
  analysis: ImageAnalysisResult['data'],
  allPerfumes: Perfume[],
  threshold: number,
  limit: number
): Perfume[] {
  if (!analysis || !allPerfumes.length) {
    return [];
  }

  const scored = allPerfumes
    .map((perfume) => ({
      perfume,
      score: calculateSimilarityScore(analysis, perfume),
    }))
    .filter((item) => item.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return scored.map((item) => item.perfume);
}

function calculateSimilarityScore(
  analysis: ImageAnalysisResult['data'],
  perfume: Perfume
): number {
  let score = 0;

  // Match brand name (if detected)
  if (analysis.brandName && perfume.brands?.name && perfume.brands.name.toLowerCase().includes(analysis.brandName.toLowerCase())) {
    score += 30;
  }

  // Match fragrance family if detected
  if (analysis.family && perfume.fragrance_family === analysis.family) {
    score += 20;
  }

  // Match gender
  if (analysis.gender) {
    const genderMatch = analysis.gender.toLowerCase() === perfume.gender.toLowerCase() ||
      perfume.gender.toLowerCase() === 'unisex';
    if (genderMatch) {
      score += 15;
    }
  }

  // Base score for relevance
  score += 10;

  return score;
}
