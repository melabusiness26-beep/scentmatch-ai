import { supabase } from './supabase';
import type { Perfume } from './perfumes';

// Finds a perfume in the Auressa DB that matches the scanned perfume
// Uses multi-stage matching: exact → fuzzy → partial
export async function findPerfumeInDB(
  scannedBrand: string | null,
  scannedName: string | null
): Promise<Perfume | null> {
  if (!scannedBrand || !scannedName) return null;

  try {
    // Normalize search strings
    const brandLower = scannedBrand.toLowerCase().trim();
    const nameLower = scannedName.toLowerCase().trim();

    console.log(`[scanner-matcher] Searching for: "${brandLower}" / "${nameLower}"`);

    // Query ALL perfumes with brand info (load more for better matching)
    const { data, error } = await supabase
      .from('perfumes')
      .select(
        'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)'
      )
      .limit(500); // Load more perfumes for comprehensive search

    if (error) {
      console.error('[scanner-matcher] DB query error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.log('[scanner-matcher] No perfumes found in DB');
      return null;
    }

    console.log(`[scanner-matcher] Loaded ${data.length} perfumes from DB`);

    // Stage 1: Try exact matches
    for (const perfume of data) {
      const brandName = (perfume.brands as any)?.name || '';
      const perfumeName = perfume.perfume_name || '';

      if (
        brandName.toLowerCase() === brandLower &&
        perfumeName.toLowerCase() === nameLower
      ) {
        console.log(`[scanner-matcher] Exact match found: ${brandName} ${perfumeName}`);
        return perfume;
      }
    }

    // Stage 2: Fuzzy matching with relaxed threshold
    let bestMatch: Perfume | null = null;
    let bestScore = 0;

    for (const perfume of data) {
      const brandName = (perfume.brands as any)?.name || '';
      const perfumeName = perfume.perfume_name || '';

      // Calculate similarity scores
      const brandSim = calculateSimilarity(brandLower, brandName.toLowerCase());
      const nameSim = calculateSimilarity(nameLower, perfumeName.toLowerCase());

      // Weighted score: perfume name is more critical (70%) than brand (30%)
      const score = nameSim * 0.7 + brandSim * 0.3;

      if (score > bestScore) {
        bestScore = score;
        bestMatch = perfume;
      }
    }

    // Lower threshold to 0.5 (50% match) for better results
    if (bestMatch && bestScore >= 0.5) {
      console.log(
        `[scanner-matcher] Fuzzy match found: ${(bestMatch.brands as any)?.name} ${bestMatch.perfume_name} (score: ${bestScore.toFixed(3)})`
      );
      return bestMatch;
    }

    console.log(`[scanner-matcher] No match found (best score: ${bestScore.toFixed(3)})`);
    return null;
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
