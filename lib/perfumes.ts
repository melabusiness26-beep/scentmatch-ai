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
  affiliate_url: string | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  brands?: PerfumeBrand | null;
};

// Felder, die wir aus Supabase laden. Zentral definiert, damit Startseite und
// Detailseite garantiert dieselbe Struktur verwenden.
const PERFUME_FIELDS =
  'id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)';

// Ziel-Link für den „Jetzt ansehen"-Button. Liegt ein Affiliate-Link vor,
// wird dieser genutzt; sonst eine neutrale Such-Verlinkung (nie ein toter Button).
export function buyUrl(p: Perfume): string {
  if (p.affiliate_url) return p.affiliate_url;
  const query = encodeURIComponent(`${p.perfume_name} ${p.brands?.name || ''} Parfum`.trim());
  return `https://www.google.com/search?q=${query}`;
}

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
  lovedNote: string; // Theme-Code aus NOTE_THEMES, '' = egal
  dislikedNote: string; // Theme-Code aus NOTE_THEMES, '' = keine
  anchorId: string; // ID eines bereits geliebten Dufts, '' = keiner
};

export type RankedPerfume = { perfume: Perfume; score: number };

const DAILY_OCCASIONS = ['Alltag', 'Büro'];

// Duft-Themen für das Noten-Matching. Jede Auswahl deckt per Stichwort mehrere konkrete Noten ab.
export const NOTE_THEMES: { code: string; label: string; keywords: string[] }[] = [
  { code: 'vanille', label: 'Vanille & Süßes', keywords: ['Vanille', 'Karamell', 'Praline', 'Schokolade', 'Kakao', 'Honig', 'Tonkabohne'] },
  { code: 'zitrus', label: 'Zitrus & Frische', keywords: ['Zitrone', 'Bergamotte', 'Grapefruit', 'Mandarine', 'Orange', 'Neroli', 'Minze', 'Apfel'] },
  { code: 'holz', label: 'Holz & Erdiges', keywords: ['Holz', 'Vetiver', 'Patchouli', 'Sandel', 'Zedern'] },
  { code: 'blumig', label: 'Blumiges (Rose, Jasmin …)', keywords: ['Rose', 'Jasmin', 'Tuberose', 'Veilchen', 'Orangenblüte', 'Maiglöckchen', 'Freesie', 'Pfingstrose', 'Magnolie', 'Gardenie', 'Ylang', 'Iris'] },
  { code: 'orient', label: 'Oud, Amber & Gewürze', keywords: ['Oud', 'Amber', 'Labdanum', 'Benzoe', 'Safran', 'Pfeffer', 'Zimt', 'Kardamom', 'Leder'] },
  { code: 'moschus', label: 'Moschus & Pudriges', keywords: ['Moschus', 'Puder', 'Ambrette', 'Cashmeran'] }
];

function perfumeNotes(p: Perfume): string[] {
  return [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].map((n) => n.toLowerCase());
}

function perfumeHasTheme(p: Perfume, code: string): boolean {
  if (!code) return false;
  const theme = NOTE_THEMES.find((t) => t.code === code);
  if (!theme) return false;
  const notes = perfumeNotes(p);
  return theme.keywords.some((kw) => notes.some((n) => n.includes(kw.toLowerCase())));
}

// Gewichte (Summe 100): Duftrichtung 30, Lieblingsnote 20, Budget 15, Anlass 13, Saison 12, Intensität 10.
// Eine No-Go-Note zieht zusätzlich bis zu 25 Punkte ab.
function familyComponent(p: Perfume, a: QuizAnswers): number {
  // Anteil der Stimmen, die auf die Familie dieses Dufts entfallen.
  // Durch die GESAMTSTIMMEN teilen sorgt fuer Trennschaerfe: eine klare
  // Entscheidung (3x dieselbe Familie) gibt volle 30, eine gestreute
  // Auswahl (1/1/1) verteilt die Punkte fair auf die gewaehlten Familien.
  const total = Object.values(a.family).reduce((sum, v) => sum + v, 0);
  if (total === 0) return 15;
  const got = a.family[p.fragrance_family || ''] || 0;
  return 30 * (got / total);
}

function lovedNoteComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.lovedNote) return 12;
  return perfumeHasTheme(p, a.lovedNote) ? 20 : 4;
}

function occasionComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.occasion || a.occasion === 'any') return 10;
  const occ = p.occasion || '';
  if (a.occasion === 'daily') return DAILY_OCCASIONS.includes(occ) ? 13 : 4;
  if (a.occasion === 'date') return occ === 'Date' ? 13 : occ === 'Abend' ? 8 : 4;
  if (a.occasion === 'evening') return occ === 'Abend' ? 13 : occ === 'Date' ? 8 : 4;
  return 7;
}

function seasonComponent(p: Perfume, a: QuizAnswers): number {
  const s = p.season || '';
  if (!a.season || a.season === 'Ganzjährig') return s === 'Ganzjährig' ? 12 : 9;
  if (s === a.season) return 12;
  if (a.season === 'Herbst/Winter' && s === 'Winter') return 10;
  if (s === 'Ganzjährig') return 9;
  return 3;
}

function sillageComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.sillage) return 7;
  const target = a.sillage === 'low' ? 4 : a.sillage === 'high' ? 9 : 6;
  const sill = p.sillage ?? 6;
  return Math.max(0, 10 * (1 - Math.abs(sill - target) / 9));
}

function budgetComponent(p: Perfume, a: QuizAnswers): number {
  if (a.budgetMax == null) return 15;
  const price = p.price_chf ?? 0;
  if (price <= a.budgetMax) return 15;
  if (price <= a.budgetMax * 1.3) return 7;
  return 0;
}

function dislikedNotePenalty(p: Perfume, a: QuizAnswers): number {
  if (!a.dislikedNote) return 0;
  return perfumeHasTheme(p, a.dislikedNote) ? 25 : 0;
}

export function matchScore(p: Perfume, a: QuizAnswers): number {
  const raw =
    familyComponent(p, a) +
    lovedNoteComponent(p, a) +
    occasionComponent(p, a) +
    seasonComponent(p, a) +
    sillageComponent(p, a) +
    budgetComponent(p, a) -
    dislikedNotePenalty(p, a);
  return Math.round(Math.max(0, Math.min(100, raw)));
}

export function matchesGender(p: Perfume, gender: QuizAnswers['gender']): boolean {
  if (gender === 'women') return p.gender === 'Women' || p.gender === 'Unisex';
  if (gender === 'men') return p.gender === 'Men' || p.gender === 'Unisex';
  return true;
}

// Ähnlichkeit zu einem bereits geliebten Duft (0–100): gleiche Duftfamilie,
// geteilte Noten, gleiches Geschlecht und ähnliche Intensität.
function noteSimilarity(anchor: Perfume, p: Perfume): number {
  if (anchor.id === p.id) return 100;
  let s = 0;
  if (anchor.fragrance_family && anchor.fragrance_family === p.fragrance_family) s += 35;
  const anchorNotes = new Set(perfumeNotes(anchor));
  const shared = perfumeNotes(p).filter((n) => anchorNotes.has(n)).length;
  s += Math.min(45, shared * 12);
  if (anchor.gender && anchor.gender === p.gender) s += 10;
  const diff = Math.abs((anchor.sillage ?? 6) - (p.sillage ?? 6));
  s += 10 * (1 - diff / 9);
  return Math.round(Math.min(100, Math.max(0, s)));
}

// Findet die Düfte, die einem gegebenen Duft am ähnlichsten riechen.
// Nutzt dieselbe Ähnlichkeits-Logik wie der Anker-Duft im Quiz.
export type SimilarPerfume = { perfume: Perfume; similarity: number };

export function findSimilarPerfumes(target: Perfume, pool: Perfume[], limit = 4): SimilarPerfume[] {
  return pool
    .filter((p) => p.id !== target.id)
    .map((p) => ({ perfume: p, similarity: noteSimilarity(target, p) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

// Günstige Alternativen: ähnlich riechende Düfte, die spürbar weniger kosten
// (mindestens 20 % günstiger). Ideal für preisbewusste Käufer ("Dupes").
export function findCheaperAlternatives(target: Perfume, pool: Perfume[], limit = 3): SimilarPerfume[] {
  const targetPrice = target.price_chf;
  if (targetPrice == null) return [];
  return pool
    .filter((p) => p.id !== target.id)
    .filter((p) => p.price_chf != null && p.price_chf <= targetPrice * 0.8)
    .map((p) => ({ perfume: p, similarity: noteSimilarity(target, p) }))
    .filter((s) => s.similarity >= 25)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

export function rankPerfumes(perfumes: Perfume[], a: QuizAnswers): RankedPerfume[] {
  const anchor = a.anchorId ? perfumes.find((p) => p.id === a.anchorId) || null : null;
  return perfumes
    .filter((p) => matchesGender(p, a.gender))
    .filter((p) => !anchor || p.id !== anchor.id)
    .map((p) => {
      const base = matchScore(p, a);
      const score = anchor ? Math.round(0.55 * noteSimilarity(anchor, p) + 0.45 * base) : base;
      return { perfume: p, score };
    })
    .sort((x, y) =>
      y.score !== x.score
        ? y.score - x.score
        : (y.perfume.scentmatch_score || 0) - (x.perfume.scentmatch_score || 0)
    );
}
