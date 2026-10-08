import { supabase } from './supabase';
import type { Perfume } from './perfumes';

// Finds a perfume in the Auressa DB that matches the scanned perfume
// Uses fuzzy matching on brand name and perfume name
export async function findPerfumeInDB(
  scannedBrand: string | null,
  scannedName: string | null
): Promise<Perfume | null> {
  if (!scannedBrand || !scannedName) return null;

  try {
    // Normalize search strings
    const brandLower = scannedBrand.toLowerCase().trim();
    const nameLower = scannedName.toLowerCase().trim();

    // Query perfumes with brand info
    const { data, error } = await supabase
      .from('perfumes')
      .select(
        'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)'
      )
      .limit(50); // Load a reasonable sample

    if (error) {
      console.error('[scanner-matcher] DB query error:', error);
      return null;
    }

    if (!data || data.length === 0) return null;

    // Score each result and find the best match
    let bestMatch: Perfume | null = null;
    let bestScore = 0;

    for (const perfume of data) {
      const brandName = (perfume.brands as any)?.name || '';
      const perfumeName = perfume.perfume_name || '';

      const brandMatch = calculateSimilarity(brandLower, brandName.toLowerCase());
      const nameMatch = calculateSimilarity(nameLower, perfumeName.toLowerCase());

      // Weighted score: name match is more important (60%) than brand (40%)
      const score = nameMatch * 0.6 + brandMatch * 0.4;

      // Minimum threshold: 0.6 (60% match)
      if (score > 0.6 && score > bestScore) {
        bestScore = score;
        bestMatch = perfume;
      }
    }

    if (bestMatch) {
      console.log(
        `[scanner-matcher] Found match: ${(bestMatch.brands as any)?.name} ${bestMatch.perfume_name} (score: ${bestScore.toFixed(2)})`
      );
    }

    return bestMatch;
  } catch (err) {
    console.error('[scanner-matcher] Error finding perfume:', err);
    return null;
  }
}

// Levenshtein distance-based similarity calculation (0-1)
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;

  if (longer.length === 0) return 1.0;

  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

// Calculate Levenshtein distance between two strings
function levenshteinDistance(str1: string, str2: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
}
