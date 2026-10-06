import { Perfume } from './perfumes';
import { DetektivAnswers } from './duft-detektiv-storage';

interface MatchResult {
  perfume: Perfume;
  score: number;
  reasons: string[];
}

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[äöü]/g, (char) => {
    const map: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue' };
    return map[char] || char;
  });
}

function fuzzyMatch(text: string, keyword: string): boolean {
  const normalized = normalizeText(text);
  const normalizedKw = normalizeText(keyword);
  if (normalized === normalizedKw) return true;
  if (normalized.includes(normalizedKw)) return true;
  if (normalizedKw.includes(normalized)) return true;
  return false;
}

function getFamilyFromFeeling(feeling: string): string[] {
  const mapping: Record<string, string[]> = {
    fresh: ['clean'],
    warm: ['gourmand'],
    woody: ['woody'],
    floral: ['floral'],
    oriental: ['gourmand', 'woody'],
    spicy: ['woody'],
  };
  return mapping[feeling] || [];
}

function getOccasionMatch(occasion: string, perfume: Perfume): number {
  if (occasion === 'unknown') return 0;

  const perfumeOccasion = perfume.occasion?.toLowerCase() || '';
  const seasonMap: Record<string, string[]> = {
    daily: ['Ganzjährig', 'Frühling'],
    evening: ['Herbst', 'Winter'],
    office: ['Ganzjährig', 'Frühling'],
    special: ['Winter', 'Herbst'],
  };

  return seasonMap[occasion]?.some(s => perfumeOccasion.includes(s)) ? 10 : 0;
}

function getPriceMatch(priceRange: string, perfume: Perfume): number {
  if (priceRange === 'unknown' || !perfume.price_chf) return 0;

  const price = perfume.price_chf;
  const ranges: Record<string, [number, number]> = {
    '<50': [0, 50],
    '50-150': [50, 150],
    '>150': [150, 10000],
  };

  const [min, max] = ranges[priceRange] || [0, 0];
  if (price >= min && price <= max) return 15;
  if (price >= min * 0.8 && price <= max * 1.2) return 7;
  return 0;
}

function getCountryBonus(country: string, perfume: Perfume): [number, string[]] {
  const reasons: string[] = [];
  let bonus = 0;

  const normalizedCountry = normalizeText(country);

  if (normalizedCountry.includes('dubai') || normalizedCountry.includes('vae')) {
    if (fuzzyMatch(perfume.description || '', 'oud')) {
      bonus = 8;
      reasons.push('Oud-Duft');
    }
  }

  if (normalizedCountry.includes('france') || normalizedCountry.includes('paris')) {
    if (fuzzyMatch(perfume.brands?.country || '', 'france')) {
      bonus = 8;
      reasons.push('Französische Marke');
    }
  }

  return [bonus, reasons];
}

function extractNotesFromText(text: string): string[] {
  return text
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 2);
}

function getNotesMatch(description: string, perfume: Perfume): [number, string[]] {
  if (!description.trim()) return [0, []];

  const keywords = extractNotesFromText(description);
  const allNotes = [
    ...(perfume.top_notes || []),
    ...(perfume.heart_notes || []),
    ...(perfume.base_notes || []),
  ];

  let score = 0;
  const matchedNotes: string[] = [];

  for (const note of allNotes) {
    for (const kw of keywords) {
      if (fuzzyMatch(normalizeText(note), normalizeText(kw))) {
        score += 3;
        matchedNotes.push(note);
        break;
      }
    }
  }

  return [Math.min(score, 10), matchedNotes];
}

export function matchPerfumesDetektiv(
  answers: DetektivAnswers,
  perfumes: Perfume[]
): MatchResult[] {
  const targetFamilies = getFamilyFromFeeling(answers.feeling);
  const results: MatchResult[] = [];

  for (const perfume of perfumes) {
    let score = 0;
    const reasons: string[] = [];

    // Gender (30%)
    if (answers.gender !== 'unknown') {
      const genderMatch =
        (answers.gender === 'woman' && ['Women', 'Unisex'].includes(perfume.gender)) ||
        (answers.gender === 'man' && ['Men', 'Unisex'].includes(perfume.gender)) ||
        (answers.gender === 'unisex' && perfume.gender === 'Unisex');

      if (genderMatch) {
        score += 30;
        reasons.push(perfume.gender);
      } else if (perfume.gender === 'Unisex') {
        score += 15;
        reasons.push('Unisex');
      }
    }

    // Family (25%)
    if (targetFamilies.length > 0 && perfume.fragrance_family) {
      if (targetFamilies.includes(perfume.fragrance_family)) {
        score += 25;
        reasons.push(perfume.fragrance_family.charAt(0).toUpperCase() + perfume.fragrance_family.slice(1));
      }
    }

    // Occasion (15%)
    const occasionScore = getOccasionMatch(answers.occasion, perfume);
    score += occasionScore;
    if (occasionScore > 0) {
      const occasionLabels: Record<string, string> = {
        daily: 'für Alltag',
        office: 'für Büro',
        evening: 'für Abend',
        special: 'für Spezial',
      };
      reasons.push(occasionLabels[answers.occasion] || answers.occasion);
    }

    // Price (15%)
    const priceScore = getPriceMatch(answers.price, perfume);
    score += priceScore;
    if (priceScore > 0 && perfume.price_chf) {
      reasons.push(`CHF ${perfume.price_chf}`);
    }

    // Country Bonus (5%)
    const [countryBonus, countryReasons] = getCountryBonus(answers.country, perfume);
    score += countryBonus;
    reasons.push(...countryReasons);

    // Notes from Description (10%)
    const [notesScore, matchedNotes] = getNotesMatch(answers.description, perfume);
    score += notesScore;
    if (matchedNotes.length > 0) {
      reasons.push(...matchedNotes.slice(0, 2));
    }

    if (score > 0) {
      results.push({ perfume, score, reasons });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, 8);
}
