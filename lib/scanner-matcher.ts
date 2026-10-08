import { supabase } from './supabase';
import type { Perfume } from './perfumes';

interface AnalysisNotes {
  top?: string[];
  heart?: string[];
  base?: string[];
}

// Finds a perfume in the Auressa DB that matches the scanned perfume
// Uses multi-stage matching: exact name → fuzzy name → notes-based
export async function findPerfumeInDB(
  scannedBrand: string | null,
  scannedName: string | null,
  scannedNotes?: AnalysisNotes
): Promise<Perfume | null> {
  if (!scannedBrand || !scannedName) return null;

  try {
    // Normalize search strings
    const brandLower = scannedBrand.toLowerCase().trim();
    const nameLower = scannedName.toLowerCase().trim();

    console.log(`[scanner-matcher] Searching for: "${brandLower}" / "${nameLower}"`);
    if (scannedNotes) {
      console.log(
        `[scanner-matcher] Notes: ${scannedNotes.top?.join(',')} / ${scannedNotes.heart?.join(',')} / ${scannedNotes.base?.join(',')}`
      );
    }

    // Query ALL perfumes with brand info
    const { data, error } = await supabase
      .from('perfumes')
      .select(
        'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)'
      )
      .limit(500);

    if (error) {
      console.error('[scanner-matcher] DB query error:', error);
      return null;
    }

    if (!data || data.length === 0) {
      console.log('[scanner-matcher] No perfumes found in DB');
      return null;
    }

    console.log(`[scanner-matcher] Loaded ${data.length} perfumes from DB`);

    // Stage 1: Exact name + brand match
    for (const perfume of data) {
      const brandName = (perfume.brands as any)?.name || '';
      const perfumeName = perfume.perfume_name || '';

      if (
        brandName.toLowerCase() === brandLower &&
        perfumeName.toLowerCase() === nameLower
      ) {
        console.log(`[scanner-matcher] ✓ Stage 1 (Exact): ${brandName} ${perfumeName}`);
        return perfume as unknown as Perfume;
      }
    }

    // Stage 2: Fuzzy name matching
    let bestFuzzyMatch: Perfume | null = null;
    let bestFuzzyScore = 0;

    for (const perfume of data) {
      const brandName = (perfume.brands as any)?.name || '';
      const perfumeName = perfume.perfume_name || '';

      const brandSim = calculateSimilarity(brandLower, brandName.toLowerCase());
      const nameSim = calculateSimilarity(nameLower, perfumeName.toLowerCase());
      const score = nameSim * 0.7 + brandSim * 0.3;

      if (score > bestFuzzyScore) {
        bestFuzzyScore = score;
        bestFuzzyMatch = perfume as unknown as Perfume;
      }
    }

    if (bestFuzzyMatch && bestFuzzyScore >= 0.5) {
      console.log(
        `[scanner-matcher] ✓ Stage 2 (Fuzzy): ${(bestFuzzyMatch.brands as any)?.name} ${bestFuzzyMatch.perfume_name} (${bestFuzzyScore.toFixed(3)})`
      );
      return bestFuzzyMatch;
    }

    // Stage 3: Notes-based matching (when names don't match but notes do)
    if (scannedNotes && (scannedNotes.top || scannedNotes.heart || scannedNotes.base)) {
      let bestNotesMatch: Perfume | null = null;
      let bestNotesScore = 0;

      for (const perfume of data) {
        const dbNotes = [
          ...(perfume.top_notes || []),
          ...(perfume.heart_notes || []),
          ...(perfume.base_notes || []),
        ].map((n) => n.toLowerCase());

        const scannedNotesAll = [
          ...(scannedNotes.top || []),
          ...(scannedNotes.heart || []),
          ...(scannedNotes.base || []),
        ].map((n) => n.toLowerCase());

        // Count matching notes (with fuzzy matching)
        let matchCount = 0;
        for (const scannedNote of scannedNotesAll) {
          for (const dbNote of dbNotes) {
            const noteSim = calculateSimilarity(scannedNote, dbNote);
            if (noteSim >= 0.7) {
              matchCount++;
              break;
            }
          }
        }

        // Score based on matching notes ratio
        const notesScore = scannedNotesAll.length > 0 ? matchCount / scannedNotesAll.length : 0;

        if (notesScore > bestNotesScore) {
          bestNotesScore = notesScore;
          bestNotesMatch = perfume as unknown as Perfume;
        }
      }

      // Accept notes match if at least 50% of notes match
      if (bestNotesMatch && bestNotesScore >= 0.5) {
        const brandName = (bestNotesMatch.brands as any)?.name || '';
        const perfumeName = bestNotesMatch.perfume_name || '';
        console.log(
          `[scanner-matcher] ✓ Stage 3 (Notes): ${brandName} ${perfumeName} (${(bestNotesScore * 100).toFixed(0)}% notes match)`
        );
        return bestNotesMatch;
      }
    }

    console.log(`[scanner-matcher] ✗ No match found (fuzzy: ${bestFuzzyScore.toFixed(3)})`);
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
