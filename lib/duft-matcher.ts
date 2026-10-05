import { Perfume } from './perfumes';

interface MatchResult {
  perfume: Perfume;
  score: number;
  matchedNotes: string[];
  matchedFamily: boolean;
}

const NOTE_SYNONYMS: Record<string, string[]> = {
  bergamotte: ['bergamot', 'zitrone', 'citrus'],
  vanille: ['vanilla', 'vanille'],
  moschus: ['musk', 'muskat', 'moschus'],
  holz: ['holzy', 'woody', 'zedernholz', 'sandelholz', 'patchouli'],
  blume: ['blüte', 'floral', 'rose', 'jasmin', 'lilie'],
  kakao: ['kakao', 'schokolade', 'chocolate', 'kakao'],
  amber: ['ambra', 'amber', 'ambra'],
  pfeffer: ['pfeffer', 'pepper', 'gewürz', 'spice'],
  sandelholz: ['sandelholz', 'sandalwood'],
  oud: ['oud', 'ouds'],
  zitrus: ['zitrus', 'citrus', 'lemon', 'orange', 'grapefruit'],
  frisch: ['frisch', 'fresh', 'crisp', 'clean'],
  süss: ['süss', 'sweet', 'süsslich', 'gourmand'],
  warm: ['warm', 'wärmend', 'cozy', 'gemütlich'],
  würzig: ['würzig', 'spicy', 'würze'],
  grün: ['grün', 'green', 'grasig', 'herbal'],
};

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[äöü]/g, (char) => {
      const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue' };
      return map[char] || char;
    })
    .replace(/[^\w\s]/g, '')
    .trim();
}

function fuzzyMatch(text: string, keyword: string): boolean {
  const normalized = normalizeText(text);
  const normalizedKw = normalizeText(keyword);

  if (normalized.includes(normalizedKw)) return true;
  if (normalizedKw.includes(normalized)) return true;

  // Levenshtein-ähnlich: Wenn mindestens 70% der Zeichen übereinstimmen
  const common = Math.min(normalized.length, normalizedKw.length);
  let matches = 0;
  for (let i = 0; i < common; i++) {
    if (normalized[i] === normalizedKw[i]) matches++;
  }
  return matches / Math.max(normalized.length, normalizedKw.length) > 0.7;
}

function extractKeywords(description: string): string[] {
  return description
    .split(/[\s,.\-;:!?]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 2);
}

function inferFilters(keywords: string[]) {
  const normalizedKws = keywords.map((k) => normalizeText(k));
  let familyHints: Record<string, number> = {};
  let genderHint: string | null = null;

  for (const kw of normalizedKws) {
    // Gender
    if (['maennlich', 'herren', 'mann', 'male'].some((g) => fuzzyMatch(kw, g))) {
      genderHint = 'Men';
    } else if (['weiblich', 'damen', 'frau', 'female'].some((g) => fuzzyMatch(kw, g))) {
      genderHint = 'Women';
    }

    // Family hints
    if (['frisch', 'fresh', 'citrus', 'zitrus'].some((f) => fuzzyMatch(kw, f))) {
      familyHints['clean'] = (familyHints['clean'] || 0) + 1;
    }
    if (['holzig', 'holz', 'woody'].some((f) => fuzzyMatch(kw, f))) {
      familyHints['woody'] = (familyHints['woody'] || 0) + 1;
    }
    if (['blumig', 'blume', 'floral', 'rose'].some((f) => fuzzyMatch(kw, f))) {
      familyHints['floral'] = (familyHints['floral'] || 0) + 1;
    }
    if (['süss', 'sweet', 'gourmand', 'schokoladen'].some((f) => fuzzyMatch(kw, f))) {
      familyHints['gourmand'] = (familyHints['gourmand'] || 0) + 1;
    }
  }

  return { familyHints, genderHint };
}

function getNoteSynonyms(note: string): string[] {
  const normalized = normalizeText(note);
  for (const [key, synonyms] of Object.entries(NOTE_SYNONYMS)) {
    if (fuzzyMatch(normalized, key)) {
      return [key, ...synonyms];
    }
  }
  return [normalized];
}

function matchNotesInPerfume(
  perfume: Perfume,
  keywords: string[],
  normalizedKws: string[]
): { matched: string[]; score: number } {
  const matched: Set<string> = new Set();
  let score = 0;

  const allNotes = [
    ...(perfume.top_notes || []),
    ...(perfume.heart_notes || []),
    ...(perfume.base_notes || []),
  ];

  for (const note of allNotes) {
    const normalizedNote = normalizeText(note);
    const synonyms = getNoteSynonyms(normalizedNote);

    for (const kw of normalizedKws) {
      if (synonyms.some((syn) => fuzzyMatch(syn, kw))) {
        matched.add(normalizedNote);

        // Gewichte: base > heart > top
        if (perfume.base_notes?.some((n) => fuzzyMatch(normalizeText(n), normalizedNote))) {
          score += 20;
        } else if (perfume.heart_notes?.some((n) => fuzzyMatch(normalizeText(n), normalizedNote))) {
          score += 15;
        } else if (perfume.top_notes?.some((n) => fuzzyMatch(normalizeText(n), normalizedNote))) {
          score += 10;
        }
        break;
      }
    }
  }

  return { matched: Array.from(matched), score };
}

export function matchPerfumesByDescription(
  description: string,
  perfumes: Perfume[]
): MatchResult[] {
  if (!description.trim()) return [];

  const keywords = extractKeywords(description);
  const normalizedKws = keywords.map((k) => normalizeText(k));
  const { familyHints, genderHint } = inferFilters(keywords);

  const results: MatchResult[] = [];

  for (const perfume of perfumes) {
    let score = 0;
    const { matched, score: noteScore } = matchNotesInPerfume(perfume, keywords, normalizedKws);
    score += noteScore;

    // Family matching
    if (perfume.fragrance_family) {
      if (familyHints[perfume.fragrance_family]) {
        score += 25;
      }
    }

    // Gender matching
    if (genderHint && perfume.gender) {
      if (perfume.gender === genderHint || perfume.gender === 'Unisex') {
        score += 10;
      }
    }

    if (score > 0) {
      results.push({
        perfume,
        score,
        matchedNotes: matched,
        matchedFamily: !!familyHints[perfume.fragrance_family || ''],
      });
    }
  }

  // Sort descending, return top 5
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}
