import { supabase } from './supabase';
import type { Perfume } from './perfumes';

interface AnalysisNotes {
  top?: string[];
  heart?: string[];
  base?: string[];
}

// Brand-Aliases: KI nennt manchmal andere Namen als die DB
const BRAND_ALIASES: Record<string, string[]> = {
  'Chanel': ['chanel', 'n°5', 'coco chanel'],
  'Dior': ['dior', 'christian dior', 'parfums christian dior'],
  'Yves Saint Laurent': ['ysl', 'yves saint laurent', 'saint laurent', 'y.s.l'],
  'Giorgio Armani': ['armani', 'giorgio armani', 'emporio armani', 'armani beauty'],
  'Paco Rabanne': ['paco rabanne', 'rabanne'],
  'Viktor & Rolf': ['viktor & rolf', 'viktor and rolf', 'v&r'],
  'Thierry Mugler': ['mugler', 'thierry mugler'],
  'Tom Ford': ['tom ford', 'tf'],
  'Jo Malone': ['jo malone', 'jo malone london'],
  'Maison Francis Kurkdjian': ['mfk', 'maison francis kurkdjian', 'francis kurkdjian'],
  'Parfums de Marly': ['parfums de marly', 'pdm', 'de marly'],
  'Dolce & Gabbana': ['dolce & gabbana', 'd&g', 'dolce and gabbana', 'dolce gabbana'],
  'Jean Paul Gaultier': ['jean paul gaultier', 'jpgaultier', 'gaultier'],
  'Narciso Rodriguez': ['narciso rodriguez', 'narciso'],
  'Issey Miyake': ['issey miyake', 'miyake'],
  'Calvin Klein': ['calvin klein', 'ck'],
  'Hugo Boss': ['hugo boss', 'boss', 'hugo'],
  'Givenchy': ['givenchy', 'parfums givenchy'],
  'Gucci': ['gucci'],
  'Versace': ['versace', 'gianni versace'],
  'Burberry': ['burberry'],
  'Prada': ['prada'],
  'Hermès': ['hermes', 'hermès', 'hermes paris'],
  'Guerlain': ['guerlain'],
  'Lancôme': ['lancome', 'lancôme'],
  'Valentino': ['valentino'],
  'Carolina Herrera': ['carolina herrera', 'ch carolina herrera'],
  'Montblanc': ['montblanc', 'mont blanc'],
  'Creed': ['creed', 'house of creed'],
  'Byredo': ['byredo'],
  'Le Labo': ['le labo'],
  'Xerjoff': ['xerjoff'],
  'Amouage': ['amouage'],
  'Initio': ['initio', 'initio parfums privés'],
  'Mancera': ['mancera'],
  'Montale': ['montale'],
  'Lattafa': ['lattafa', 'lattafa perfumes'],
  'Armaf': ['armaf'],
};

// Parfum-Name-Normalisierungen
const NAME_NORMALIZATIONS: Record<string, string[]> = {
  'Sauvage': ['sauvage', 'savage'],
  'N°5': ['no5', 'n°5', 'number 5', 'chanel 5', 'n 5'],
  'La Vie Est Belle': ['la vie est belle', 'lavie est belle', 'la vie est belle'],
  'Black Opium': ['black opium', 'blackopium'],
  'Coco Mademoiselle': ['coco mademoiselle', 'coco mlle'],
  'Bleu de Chanel': ['bleu de chanel', 'bleu chanel'],
  'Y': ['y', 'y eau de parfum', 'y edp', 'y edt'],
  'Baccarat Rouge 540': ['baccarat rouge 540', 'br540', 'baccarat rouge'],
  'Aventus': ['aventus'],
  'Oud for Greatness': ['oud for greatness', 'oud greatness'],
};

/**
 * Finds a perfume in the Auressa DB that matches the scanned perfume.
 * Uses 5-stage matching:
 * 1. Exact brand + name match
 * 2. Brand alias + exact name
 * 3. Fuzzy brand + fuzzy name (smart scoring)
 * 4. Name-only fuzzy (brand irrelevant)
 * 5. Notes-based matching (fallback)
 */
export async function findPerfumeInDB(
  scannedBrand: string | null,
  scannedName: string | null,
  scannedNotes?: AnalysisNotes
): Promise<Perfume | null> {
  if (!scannedName) return null;

  try {
    const brandRaw = (scannedBrand || '').toLowerCase().trim();
    const nameRaw = scannedName.toLowerCase().trim();

    console.log(`[scanner-matcher] Searching: "${brandRaw}" / "${nameRaw}"`);

    // Load all perfumes from DB
    const { data, error } = await supabase
      .from('perfumes')
      .select(
        'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)'
      )
      .limit(600);

    if (error || !data || data.length === 0) {
      console.error('[scanner-matcher] DB error or empty:', error);
      return null;
    }

    console.log(`[scanner-matcher] ${data.length} perfumes loaded`);

    // Normalize scanned inputs
    const brandNorm = normalizeBrand(brandRaw);
    const nameNorm = normalizeName(nameRaw);

    // --- STAGE 1: Exact match ---
    for (const p of data) {
      const dbBrand = ((p.brands as any)?.name || '').toLowerCase().trim();
      const dbName = (p.perfume_name || '').toLowerCase().trim();
      if (dbBrand === brandRaw && dbName === nameRaw) {
        console.log(`[scanner-matcher] ✓ Stage 1 (Exact): ${dbBrand} ${dbName}`);
        return p as unknown as Perfume;
      }
    }

    // --- STAGE 2: Brand alias + exact/normalized name ---
    for (const p of data) {
      const dbBrand = ((p.brands as any)?.name || '').toLowerCase().trim();
      const dbName = (p.perfume_name || '').toLowerCase().trim();
      const dbNameNorm = normalizeName(dbName);

      if (isBrandMatch(brandRaw, dbBrand) && (dbName === nameRaw || dbNameNorm === nameNorm)) {
        console.log(`[scanner-matcher] ✓ Stage 2 (Alias+Name): ${dbBrand} ${dbName}`);
        return p as unknown as Perfume;
      }
    }

    // --- STAGE 3: Smart fuzzy matching (brand + name combined) ---
    let bestFuzzy: Perfume | null = null;
    let bestFuzzyScore = 0;

    for (const p of data) {
      const dbBrand = ((p.brands as any)?.name || '').toLowerCase().trim();
      const dbName = (p.perfume_name || '').toLowerCase().trim();

      const brandScore = getBrandScore(brandRaw, dbBrand);
      const nameScore = getNameScore(nameRaw, nameNorm, dbName);

      // Weighted: name matters more than brand
      const combined = nameScore * 0.65 + brandScore * 0.35;

      if (combined > bestFuzzyScore) {
        bestFuzzyScore = combined;
        bestFuzzy = p as unknown as Perfume;
      }
    }

    if (bestFuzzy && bestFuzzyScore >= 0.72) {
      const b = (bestFuzzy.brands as any)?.name || '';
      console.log(`[scanner-matcher] ✓ Stage 3 (Smart Fuzzy): ${b} ${bestFuzzy.perfume_name} (${bestFuzzyScore.toFixed(3)})`);
      return bestFuzzy;
    }

    // --- STAGE 4: Name-only match (ignore brand) ---
    let bestNameOnly: Perfume | null = null;
    let bestNameScore = 0;

    for (const p of data) {
      const dbName = (p.perfume_name || '').toLowerCase().trim();
      const score = getNameScore(nameRaw, nameNorm, dbName);

      if (score > bestNameScore) {
        bestNameScore = score;
        bestNameOnly = p as unknown as Perfume;
      }
    }

    if (bestNameOnly && bestNameScore >= 0.85) {
      const b = (bestNameOnly.brands as any)?.name || '';
      console.log(`[scanner-matcher] ✓ Stage 4 (Name-Only): ${b} ${bestNameOnly.perfume_name} (${bestNameScore.toFixed(3)})`);
      return bestNameOnly;
    }

    // --- STAGE 5: Notes-based fallback ---
    if (scannedNotes) {
      const notesMatch = findByNotes(data, scannedNotes);
      if (notesMatch) return notesMatch;
    }

    console.log(`[scanner-matcher] ✗ No match (best fuzzy: ${bestFuzzyScore.toFixed(3)}, name-only: ${bestNameScore.toFixed(3)})`);
    return null;
  } catch (err) {
    console.error('[scanner-matcher] Error:', err);
    return null;
  }
}

// --- Brand matching helpers ---

function normalizeBrand(brand: string): string {
  return brand
    .replace(/\s+/g, ' ')
    .replace(/[&]/g, 'and')
    .replace(/[°'"]/g, '')
    .trim();
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[°'"éèêëàâùûüôöîï]/g, (c) =>
      ({ é: 'e', è: 'e', ê: 'e', ë: 'e', à: 'a', â: 'a', ù: 'u', û: 'u', ü: 'u', ô: 'o', ö: 'o', î: 'i', ï: 'i', '°': '' }[c] || c)
    )
    .replace(/\bno\.?\s*/g, 'no')
    .replace(/\beau de parfum\b/g, 'edp')
    .replace(/\beau de toilette\b/g, 'edt')
    .replace(/\bparfum\b/g, 'parfum')
    .trim();
}

function isBrandMatch(scanned: string, dbBrand: string): boolean {
  if (scanned === dbBrand) return true;

  for (const [canonical, aliases] of Object.entries(BRAND_ALIASES)) {
    if (canonical.toLowerCase() === dbBrand) {
      if (aliases.some((a) => scanned.includes(a) || a.includes(scanned))) {
        return true;
      }
    }
  }

  // Fuzzy brand check
  const sim = similarity(scanned, dbBrand);
  return sim >= 0.75;
}

function getBrandScore(scanned: string, dbBrand: string): number {
  if (!scanned) return 0.3; // no brand given → neutral
  if (isBrandMatch(scanned, dbBrand)) return 1.0;

  // Check aliases
  for (const [canonical, aliases] of Object.entries(BRAND_ALIASES)) {
    if (canonical.toLowerCase() === dbBrand) {
      const bestAlias = aliases.reduce((best, a) => Math.max(best, similarity(scanned, a)), 0);
      if (bestAlias > 0.6) return bestAlias;
    }
  }

  return similarity(scanned, dbBrand);
}

function getNameScore(rawName: string, normName: string, dbName: string): number {
  const dbNorm = normalizeName(dbName);

  // Exact
  if (rawName === dbName || normName === dbNorm) return 1.0;

  // Check known aliases
  for (const [canonical, aliases] of Object.entries(NAME_NORMALIZATIONS)) {
    if (canonical.toLowerCase() === dbName.toLowerCase()) {
      if (aliases.some((a) => rawName === a || normName === a)) return 0.98;
    }
  }

  // Contains check (e.g. "Sauvage Elixir" matches "Sauvage")
  if (dbNorm.includes(normName) || normName.includes(dbNorm)) {
    const lenRatio = Math.min(dbNorm.length, normName.length) / Math.max(dbNorm.length, normName.length);
    return 0.7 + lenRatio * 0.2;
  }

  // Levenshtein
  const s1 = similarity(normName, dbNorm);
  const s2 = similarity(rawName, dbName);
  return Math.max(s1, s2);
}

// --- Notes-based fallback ---

function findByNotes(data: any[], scannedNotes: AnalysisNotes): Perfume | null {
  const allScanned = [
    ...(scannedNotes.top || []),
    ...(scannedNotes.heart || []),
    ...(scannedNotes.base || []),
  ].map((n) => n.toLowerCase());

  if (allScanned.length < 3) return null; // too few notes for reliable match

  let bestMatch: Perfume | null = null;
  let bestScore = 0;

  for (const p of data) {
    const dbNotes = [
      ...(p.top_notes || []),
      ...(p.heart_notes || []),
      ...(p.base_notes || []),
    ].map((n: string) => n.toLowerCase());

    if (dbNotes.length === 0) continue;

    let matchCount = 0;
    for (const sNote of allScanned) {
      for (const dNote of dbNotes) {
        if (similarity(sNote, dNote) >= 0.75) {
          matchCount++;
          break;
        }
      }
    }

    const score = matchCount / allScanned.length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = p as unknown as Perfume;
    }
  }

  if (bestMatch && bestScore >= 0.55) {
    const b = (bestMatch.brands as any)?.name || '';
    console.log(`[scanner-matcher] ✓ Stage 5 (Notes): ${b} ${bestMatch.perfume_name} (${(bestScore * 100).toFixed(0)}%)`);
    return bestMatch;
  }

  return null;
}

// --- String similarity (Levenshtein-based, 0–1) ---

function similarity(a: string, b: string): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  if (longer.length === 0) return 1.0;
  return (longer.length - levenshtein(longer, shorter)) / longer.length;
}

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]);
    }
  }
  return dp[m][n];
}
