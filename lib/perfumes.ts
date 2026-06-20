import { supabase, isSupabaseConfigured } from './supabase';

export type PerfumeBrand = {
  name: string | null;
  slug?: string | null;
  country?: string | null;
};

export type Perfume = {
  id: string;
  perfume_name: string;
  slug: string | null;
  gender: string | null;
  fragrance_family: string | null;
  price_chf: number | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  description: string | null;
  image_url: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  brands?: PerfumeBrand | null;
};

// Felder, die wir aus Supabase laden. Zentral definiert, damit Startseite und
// Detailseite garantiert dieselbe Struktur verwenden.
const PERFUME_FIELDS =
  'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, top_notes, heart_notes, base_notes, brands(name, slug, country)';

// Liste der Düfte, nach ScentMatch-Score sortiert (beste zuerst).
export async function getPerfumes(limit = 60): Promise<Perfume[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('perfumes')
    .select(PERFUME_FIELDS)
    .order('scentmatch_score', { ascending: false })
    .limit(limit);
  if (error) return [];
  return (data as unknown as Perfume[]) || [];
}

// Einzelnen Duft anhand seines slug laden (für die Detailseite).
export async function getPerfumeBySlug(slug: string): Promise<Perfume | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('perfumes')
    .select(PERFUME_FIELDS)
    .eq('slug', slug)
    .maybeSingle();
  if (error) return null;
  return (data as unknown as Perfume) || null;
}

// Alle slugs – für die Sitemap und das Vorab-Generieren der Detailseiten.
export async function getAllPerfumeSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase.from('perfumes').select('slug');
  if (error || !data) return [];
  return (data as { slug: string | null }[])
    .map((row) => row.slug)
    .filter((slug): slug is string => Boolean(slug));
}

// ---------- Matching-Engine ----------
// Bewertet jeden Duft gewichtet gegen alle Quiz-Antworten (0–100 % Match).

export type QuizAnswers = {
  gender: 'women' | 'men' | 'unisex' | '';
  family: Record<string, number>; // clean | gourmand | woody | floral
  occasion: 'daily' | 'date' | 'evening' | 'any' | '';
  season: 'Frühling' | 'Sommer' | 'Herbst/Winter' | 'Ganzjährig' | '';
  sillage: 'low' | 'medium' | 'high' | '';
  budgetMax: number | null; // null = Budget egal
};

export type RankedPerfume = { perfume: Perfume; score: number };

const DAILY_OCCASIONS = ['Alltag', 'Büro'];

// Gewichte (Summe = 100): Duftrichtung ist am wichtigsten, dann Budget, Anlass, Saison, Intensität.
function familyComponent(p: Perfume, a: QuizAnswers): number {
  const max = Math.max(1, ...Object.values(a.family));
  const got = a.family[p.fragrance_family || ''] || 0;
  return 35 * (got / max);
}

function occasionComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.occasion || a.occasion === 'any') return 12;
  const occ = p.occasion || '';
  if (a.occasion === 'daily') return DAILY_OCCASIONS.includes(occ) ? 15 : 5;
  if (a.occasion === 'date') return occ === 'Date' ? 15 : occ === 'Abend' ? 9 : 5;
  if (a.occasion === 'evening') return occ === 'Abend' ? 15 : occ === 'Date' ? 9 : 5;
  return 8;
}

function seasonComponent(p: Perfume, a: QuizAnswers): number {
  const s = p.season || '';
  if (!a.season || a.season === 'Ganzjährig') return s === 'Ganzjährig' ? 15 : 11;
  if (s === a.season) return 15;
  if (a.season === 'Herbst/Winter' && s === 'Winter') return 13;
  if (s === 'Ganzjährig') return 12;
  return 4;
}

function sillageComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.sillage) return 10;
  const target = a.sillage === 'low' ? 4 : a.sillage === 'high' ? 9 : 6;
  const sill = p.sillage ?? 6;
  return Math.max(0, 15 * (1 - Math.abs(sill - target) / 9));
}

function budgetComponent(p: Perfume, a: QuizAnswers): number {
  if (a.budgetMax == null) return 20;
  const price = p.price_chf ?? 0;
  if (price <= a.budgetMax) return 20;
  if (price <= a.budgetMax * 1.3) return 9;
  return 0;
}

export function matchScore(p: Perfume, a: QuizAnswers): number {
  const raw =
    familyComponent(p, a) +
    occasionComponent(p, a) +
    seasonComponent(p, a) +
    sillageComponent(p, a) +
    budgetComponent(p, a);
  return Math.round(Math.max(0, Math.min(100, raw)));
}

export function matchesGender(p: Perfume, gender: QuizAnswers['gender']): boolean {
  if (gender === 'women') return p.gender === 'Women' || p.gender === 'Unisex';
  if (gender === 'men') return p.gender === 'Men' || p.gender === 'Unisex';
  return true;
}

export function rankPerfumes(perfumes: Perfume[], a: QuizAnswers): RankedPerfume[] {
  return perfumes
    .filter((p) => matchesGender(p, a.gender))
    .map((p) => ({ perfume: p, score: matchScore(p, a) }))
    .sort((x, y) =>
      y.score !== x.score
        ? y.score - x.score
        : (y.perfume.scentmatch_score || 0) - (x.perfume.scentmatch_score || 0)
    );
}
