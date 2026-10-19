import { Perfume } from './perfumes';

interface MatchResult {
  perfume: Perfume;
  score: number;
  matchedNotes: string[];
  matchedFamily: boolean;
}

const NOTE_SYNONYMS: Record<string, string[]> = {
  bergamotte: ['bergamot', 'zitrone', 'citrus', 'frisch', 'fresh', 'clean', 'crisp'],
  vanille: ['vanilla', 'vanille', 'süss', 'sweet'],
  moschus: ['musk', 'muskat', 'moschus', 'warm'],
  holz: ['holzy', 'woody', 'zedernholz', 'sandelholz', 'patchouli', 'würzig'],
  blume: ['blüte', 'floral', 'rose', 'jasmin', 'lilie', 'elegant'],
  kakao: ['kakao', 'schokolade', 'chocolate', 'süss', 'sweet', 'gourmand'],
  amber: ['ambra', 'amber', 'ambra', 'warm', 'würzig'],
  pfeffer: ['pfeffer', 'pepper', 'gewürz', 'spice', 'würzig'],
  sandelholz: ['sandelholz', 'sandalwood', 'warm', 'würzig', 'holz', 'woody'],
  oud: ['oud', 'ouds', 'warm', 'würzig', 'holz'],
  zitrus: ['zitrus', 'citrus', 'lemon', 'orange', 'grapefruit', 'limette', 'frisch', 'fresh', 'clean', 'crisp'],
  frisch: ['frisch', 'fresh', 'crisp', 'clean', 'zitrus', 'citrus', 'bergamotte', 'limette'],
  süss: ['süss', 'sweet', 'süsslich', 'gourmand', 'vanille', 'kakao', 'chocolate'],
  warm: ['warm', 'wärmend', 'cozy', 'gemütlich', 'moschus', 'holz', 'amber'],
  würzig: ['würzig', 'spicy', 'würze', 'pfeffer', 'holz', 'warm'],
  grün: ['grün', 'green', 'grasig', 'herbal', 'frisch', 'crisp'],
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

  if (normalized === normalizedKw) return true;
  if (normalized.includes(normalizedKw)) return true;
  if (normalizedKw.includes(normalized)) return true;

  // Echte Levenshtein-Distanz für Näherungen
  const maxLen = Math.max(normalized.length, normalizedKw.length);
  const distance = levenshteinDistance(normalized, normalizedKw);
  const similarity = 1 - distance / maxLen;

  return similarity > 0.65;
}

function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
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

  return matrix[b.length][a.length];
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
