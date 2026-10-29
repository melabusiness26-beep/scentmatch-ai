import { supabase, isSupabaseConfigured } from './supabase';
import { computeAuressaScore } from './score';
import { cleanAlternatives, cleanSizes, type PerfumeExtras } from './perfume-extras';

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
  /** Flaschengrösse in ml, auf die sich price_chf bezieht. */
  volume_ml?: number | null;
  // Hintergrund für den automatischen Text (nur auf der Detailseite geladen).
  release_year?: number | null;
  perfumer?: string | null;
  inspiration?: string | null;
  good_to_know?: string | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  description: string | null;
  image_url: string | null;
  affiliate_url: string | null;
  is_featured?: boolean | null;
  top_notes: string[] | null;
  heart_notes: string[] | null;
  base_notes: string[] | null;
  ean_code?: string | null;
  brands?: PerfumeBrand | null;
  // Age & Lifestyle Targeting
  age_group?: string | null;
  lifestyle?: string | null;
  trend_vibe?: string | null;
  gender_nuance?: string | null;
  // Pro Status Fields (Scanner)
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[] | null;
  rating?: number | null;
  confidence_level?: string | null;
  data_sources?: Record<string, boolean> | null;
};

// ─── Preisgrenze ────────────────────────────────────────────────────────────
// Auressa-Grundsatz: Kein EMPFOHLENES Parfüm kostet mehr als CHF 180.–.
// Teurere Düfte dürfen im Katalog bleiben – als Referenz ("Dupe von …",
// "riecht ähnlich wie …") –, tauchen aber nie als Empfehlung auf.
// Düfte ohne Preisangabe werden nicht empfohlen, weil die Grenze für sie
// nicht garantiert werden kann.
export const MAX_PRICE_CHF = 180;

export function isWithinPriceCap(p: Pick<Perfume, 'price_chf'>): boolean {
  return p.price_chf != null && p.price_chf > 0 && p.price_chf <= MAX_PRICE_CHF;
}

// Ausgeschriebene Konzentration (im Admin als Kürzel gespeichert).
const CONCENTRATION_LABELS: Record<string, string> = {
  EdP: 'Eau de Parfum',
  EdT: 'Eau de Toilette',
  EdC: 'Eau de Cologne',
  Cologne: 'Eau de Cologne',
  Parfum: 'Parfum',
  Extrait: 'Extrait de Parfum'
};

export function concentrationLabel(code: string | null | undefined): string | null {
  if (!code) return null;
  return CONCENTRATION_LABELS[code] || null;
}

// Felder, die wir aus Supabase laden. Zentral definiert, damit Startseite und
// Detailseite garantiert dieselbe Struktur verwenden.
const PERFUME_FIELDS =
  'id, perfume_name, slug, gender, fragrance_family, price_chf, volume_ml, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, concentration, top_notes, heart_notes, base_notes, age_group, lifestyle, trend_vibe, gender_nuance, brands(name, slug, country)';

// Redaktionelle Duftbeschreibung – siehe lib/perfume-text.ts.
export { describePerfume } from './perfume-text';

// Ziel-Link für den „Jetzt ansehen"-Button. Liegt ein Affiliate-Link vor,
// wird dieser genutzt; sonst eine neutrale Such-Verlinkung (nie ein toter Button).
export function buyUrl(p: Perfume): string {
  if (p.affiliate_url) return p.affiliate_url;
  const query = encodeURIComponent(`${p.perfume_name} ${p.brands?.name || ''} Parfum`.trim());
  return `https://www.google.com/search?q=${query}`;
}

// Entfernt doppelte Düfte aus einer Liste. Ein Duft gilt als Duplikat, wenn
// Marke, Duftname UND Geschlecht (unabhängig von Gross-/Kleinschreibung,
// Leerzeichen und Umlauten) übereinstimmen. So verschwinden Doppel-Einträge
// zuverlässig aus ALLEN Ansichten – auch wenn in der Datenbank z. B. durch
// Direkt-Importe zwei Einträge desselben Dufts mit unterschiedlichem slug liegen.
//
// WICHTIG: Das Geschlecht gehört bewusst in den Schlüssel. So bleiben eine
// Herren- und eine Damen-Version desselben Dufts (gleicher Name, aber „Men" vs.
// „Women") als ZWEI eigenständige Einträge erhalten – sie sind keine Duplikate.
// Ebenso die Konzentration: Light Blue als Eau de Toilette und als Eau de
// Parfum sind zwei Versionen (siehe lib/versions.ts), keine Duplikate.
//
// Behalten wird der „beste" Eintrag: bevorzugt der mit einem slug (damit die
// Detailseite verlinkbar bleibt), sonst der mit dem höheren Auressa-Score. Da
// die Liste bereits nach Score absteigend sortiert hereinkommt, ist der zuerst
// gesehene i. d. R. schon der stärkere – wir korrigieren nur den slug-Fall.
function dedupeKey(p: Perfume): string {
  const norm = (s: string | null | undefined) =>
    (s || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // Kombinierende Akzentzeichen entfernen
      .replace(/\s+/g, ' ')
      .trim();
  return `${norm(p.brands?.name)}|||${norm(p.perfume_name)}|||${norm(p.gender)}|||${norm(p.concentration)}`;
}

export function dedupePerfumes(perfumes: Perfume[]): Perfume[] {
  const seen = new Map<string, number>(); // key -> Index im Ergebnis
  const out: Perfume[] = [];
  for (const p of perfumes) {
    const key = dedupeKey(p);
    const existingIdx = seen.get(key);
    if (existingIdx === undefined) {
      seen.set(key, out.length);
      out.push(p);
      continue;
    }
    // Duplikat gefunden: nur ersetzen, wenn der neue Eintrag einen slug hat und
    // der bereits behaltene keinen – so bleibt die Detailseite verlinkbar.
    const kept = out[existingIdx];
    if (!kept.slug && p.slug) out[existingIdx] = p;
  }
  return out;
}

// Der Auressa-Score wird aus den Duftdaten berechnet (lib/score.ts) und nicht mehr in
// der Datenbank gepflegt. Hier wird er beim Laden gesetzt, damit jede Seite denselben
// Wert zeigt wie die Duft-Detailseite.
export function withAuressaScore<T extends Perfume>(p: T): T {
  return { ...p, scentmatch_score: computeAuressaScore(p).total };
}

function withScores(perfumes: Perfume[]): Perfume[] {
  return perfumes.map(withAuressaScore).sort((a, b) => (b.scentmatch_score ?? 0) - (a.scentmatch_score ?? 0));
}

// Liste der Düfte, nach Auressa-Score sortiert (beste zuerst).
export async function getPerfumes(limit = 60): Promise<Perfume[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('perfumes')
    .select(PERFUME_FIELDS)
    .order('scentmatch_score', { ascending: false })
    .limit(limit);
  if (error) return [];
  return withScores(dedupePerfumes((data as unknown as Perfume[]) || []));
}

// Anzahl der Düfte im Katalog – für dynamische Texte wie „über X Düfte".
// „über 50", „über 100" … – erst ab 50 Düften, auf 50 abgerundet. So verspricht
// ein Text nie mehr Düfte, als wirklich im Katalog sind (darunter: null).
export function catalogCountLabel(count: number | null | undefined): string | null {
  return count != null && count >= 50 ? `über ${Math.floor(count / 50) * 50}` : null;
}

export async function getPerfumeCount(): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  const { count, error } = await supabase
    .from('perfumes')
    .select('id', { count: 'exact', head: true });
  if (error || count == null) return 0;
  return count;
}

// ─── Marken-Typen & Abfragen ────────────────────────────────────────────────

export type Brand = {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  description: string | null;
};

// Alle Marken alphabetisch – für den Marken-Index.
export async function getAllBrands(): Promise<Brand[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('brands')
    .select('id, name, slug, country, description')
    .order('name', { ascending: true });
  if (error || !data) return [];
  return (data as Brand[]).filter((b) => b.slug);
}

// Alle Brand-Slugs – für generateStaticParams.
export async function getAllBrandSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('brands')
    .select('slug');
  if (error || !data) return [];
  return (data as { slug: string | null }[])
    .map((r) => r.slug)
    .filter((s): s is string => Boolean(s));
}

// Einzelne Marke per Slug.
export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (!isSupabaseConfigured) return null;
  const { data, error } = await supabase
    .from('brands')
    .select('id, name, slug, country, description')
    .eq('slug', slug)
    .maybeSingle();
  if (error || !data) return null;
  return data as Brand;
}

// Alle Düfte einer bestimmten Marke.
export async function getPerfumesByBrand(brandSlug: string): Promise<Perfume[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('perfumes')
    .select(PERFUME_FIELDS)
    .eq('brands.slug', brandSlug)
    .order('scentmatch_score', { ascending: false });
  if (error || !data) return [];
  // Filter client-side, weil Supabase den Join-Filter nicht immer korrekt umsetzt
  const all = (data as unknown as Perfume[]);
  return withScores(dedupePerfumes(all.filter((p) => p.brands?.slug === brandSlug)));
}

// ─── Brand-Statistiken ───────────────────────────────────────────────────────

// Echte Anzahl der Marken im Katalog – aus der brands-Tabelle, nicht aus geladenen Düften.
export async function getBrandCount(): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  const { count, error } = await supabase
    .from('brands')
    .select('id', { count: 'exact', head: true });
  if (error || count == null) return 0;
  return count;
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
  return data ? withAuressaScore(data as unknown as Perfume) : null;
}

// Hintergrund-Infos (Jahr, Parfümeur, Inspiration, „Gut zu wissen") für die Detailseite.
// Bewusst separat geladen: Fehlen Spalten noch (SQL 58/60 nicht ausgeführt),
// bleibt der Rest der Seite unberührt – es fehlen nur diese Angaben.
export type PerfumeBackground = Pick<Perfume, 'release_year' | 'perfumer' | 'inspiration' | 'good_to_know'>;

export async function getPerfumeBackground(id: string): Promise<PerfumeBackground> {
  if (!isSupabaseConfigured) return {};
  for (const fields of [
    'release_year, perfumer, inspiration, good_to_know',
    'release_year, perfumer, inspiration',
    'release_year'
  ]) {
    const { data, error } = await supabase.from('perfumes').select(fields).eq('id', id).maybeSingle();
    if (!error) return (data as PerfumeBackground) || {};
  }
  return {};
}

// Zusatzangaben (Grössen, Alternative zu, ähnliche Düfte, Flakon). Die neuen Spalten
// gibt es erst nach SQL 62 – fehlen sie noch, werden nur die älteren geladen.
export async function getPerfumeExtras(id: string): Promise<PerfumeExtras> {
  if (!isSupabaseConfigured) return {};
  for (const fields of [
    'sizes, alternative_to, similar_perfumes, flacon_description, flacon_designer',
    'similar_perfumes, flacon_description'
  ]) {
    const { data, error } = await supabase.from('perfumes').select(fields).eq('id', id).maybeSingle();
    if (error) continue;
    const row = (data || {}) as Record<string, unknown>;
    return {
      sizes: cleanSizes(row.sizes),
      alternative_to: cleanAlternatives(row.alternative_to),
      similar_perfumes: Array.isArray(row.similar_perfumes)
        ? (row.similar_perfumes as unknown[]).map((s) => String(s).trim()).filter(Boolean)
        : [],
      flacon_description: typeof row.flacon_description === 'string' ? row.flacon_description.trim() || null : null,
      flacon_designer: typeof row.flacon_designer === 'string' ? row.flacon_designer.trim() || null : null
    };
  }
  return {};
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

// Düfte anhand eines Tags (occasion, season, fragrance_family, oder Noten-Suche) laden.
// Abstrakte Charakter-Tags → konkrete Suchbegriffe die in der DB vorkommen
const TAG_KEYWORD_MAP: Record<string, string[]> = {
  'selbstbewusst':  ['oud', 'amber', 'moschus', 'leder', 'holz', 'vetiver', 'patchouli'],
  'verführerisch':  ['amber', 'moschus', 'vanille', 'sandelholz', 'jasmin', 'ylang'],
  'romantisch':     ['rose', 'jasmin', 'pfingstrose', 'veilchen', 'iris', 'floral'],
  'frisch':         ['bergamotte', 'zitrone', 'limette', 'grapefruit', 'minze', 'aquatisch'],
  'kraftvoll':      ['oud', 'leder', 'vetiver', 'zeder', 'pfeffer', 'rauch'],
  'elegant':        ['iris', 'jasmin', 'rose', 'sandelholz', 'moschus', 'aldehyde'],
  'verspielt':      ['frucht', 'beere', 'apfel', 'birne', 'vanille', 'praline'],
  'geheimnisvoll':  ['oud', 'amber', 'weihrauch', 'myrrhe', 'rauch', 'leder'],
  'sportlich':      ['zitrus', 'bergamotte', 'aquatisch', 'holz', 'minze'],
  'suess':          ['vanille', 'praline', 'karamell', 'schokolade', 'tonkabohne', 'gourmand'],
  'warm':           ['amber', 'vanille', 'sandelholz', 'tonkabohne', 'benzoe'],
  'kuehl':          ['minze', 'eukalyptus', 'bergamotte', 'zitrus', 'aquatisch'],
  'natuerlich':     ['vetiver', 'zeder', 'fichte', 'moos', 'erde', 'woody'],
  'luxurioes':      ['oud', 'rose', 'iris', 'jasmin', 'amber', 'sandelholz'],
  'entspannt':      ['lavendel', 'kamille', 'vanille', 'sandelholz', 'moschus'],
  'jugendlich':     ['zitrus', 'bergamotte', 'apfel', 'beere', 'frucht', 'clean', 'floral'],
  'feminin':        ['rose', 'jasmin', 'pfingstrose', 'floral', 'iris', 'veilchen'],
  'maskulin':       ['holz', 'leder', 'vetiver', 'zeder', 'pfeffer', 'amber'],
  'zeitlos':        ['rose', 'jasmin', 'sandelholz', 'moschus', 'amber', 'iris'],
  'aufregend':      ['pfeffer', 'ingwer', 'kardamom', 'oud', 'leder', 'rauch'],
  'sauber':         ['moschus', 'clean', 'aquatisch', 'zitrus', 'lavendel'],
  'blumig':         ['rose', 'jasmin', 'pfingstrose', 'floral', 'iris', 'maiglöckchen'],
  'holzig':         ['zeder', 'sandelholz', 'vetiver', 'holz', 'woody', 'patchouli'],
  'orientalisch':   ['oud', 'amber', 'weihrauch', 'moschus', 'vanille', 'benzoe'],
  'zitrusig':       ['bergamotte', 'zitrone', 'limette', 'grapefruit', 'orange', 'mandarine'],
  'moschusartig':   ['moschus', 'amber', 'sandelholz', 'benzoe', 'tonkabohne'],
  'intensiv':       ['oud', 'amber', 'leder', 'patchouli', 'weihrauch', 'rauch'],
  'leicht':         ['zitrus', 'bergamotte', 'clean', 'aquatisch', 'maiglöckchen', 'minze'],
  'sommerlich':     ['zitrus', 'bergamotte', 'aquatisch', 'floral', 'frucht', 'Sommer'],
  'winterlich':     ['vanille', 'amber', 'oud', 'weihrauch', 'zimt', 'Winter'],
};

export async function getPerfumesByTag(tag: string, limit = 40): Promise<Perfume[]> {
  if (!isSupabaseConfigured) return [];
  const tagLower = tag.toLowerCase();

  // Keyword-Map: abstrakte Tags auf konkrete Suchbegriffe mappen
  const keywords = TAG_KEYWORD_MAP[tagLower] ?? [];

  // Alle Suchbegriffe in EINER einzigen OR-Abfrage zusammenführen
  const terms = [tagLower, ...keywords];

  // Text-Felder: ilike-Suche
  const textParts = terms.flatMap((t) => [
    `occasion.ilike.%${t}%`,
    `season.ilike.%${t}%`,
    `fragrance_family.ilike.%${t}%`,
    `description.ilike.%${t}%`,
    `perfume_name.ilike.%${t}%`,
  ]);

  // Array-Felder (top_notes, heart_notes, base_notes): cs (contains) mit case-insensitive Suche
  // Supabase unterstützt kein ilike auf Arrays – wir nutzen .ilike auf dem Array-Element via
  // PostgreSQL-Syntax: top_notes.cs.{term} funktioniert nur bei exaktem Match.
  // Daher: description enthält oft die Noten als Text → reicht für die meisten Fälle.
  // Zusätzlich suchen wir die Noten als Text über eine separate Abfrage und mergen.
  const { data: textData, error: textError } = await supabase
    .from('perfumes')
    .select(PERFUME_FIELDS)
    .or(textParts.join(','))
    .order('scentmatch_score', { ascending: false })
    .limit(limit);

  // Parallel: Array-Felder mit cs (contains) – jeder Begriff in Varianten (klein + Grossschreibung)
  // cs ist case-sensitive → wir suchen sowohl 'bergamotte' als auch 'Bergamotte'
  const arrayTermVariants = terms.flatMap((t) => [
    t,
    t.charAt(0).toUpperCase() + t.slice(1),
  ]);
  const arrayResults = await Promise.all(
    arrayTermVariants.map((t) =>
      supabase
        .from('perfumes')
        .select(PERFUME_FIELDS)
        .or(`top_notes.cs.{${t}},heart_notes.cs.{${t}},base_notes.cs.{${t}}`)
        .order('scentmatch_score', { ascending: false })
        .limit(20)
    )
  );

  const allData: Perfume[] = [];
  if (!textError && textData) allData.push(...(textData as unknown as Perfume[]));
  for (const res of arrayResults) {
    if (!res.error && res.data) allData.push(...(res.data as unknown as Perfume[]));
  }

  if (allData.length === 0) return [];
  return withScores(dedupePerfumes(allData)).slice(0, limit);
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
  longevity: 'low' | 'medium' | 'high' | ''; // gewünschte Haltbarkeit, '' = egal
  sweetness: 'low' | 'medium' | 'high' | ''; // gewünschte Süsse, '' = egal
  pricePref: 'original' | 'alternative' | ''; // Original vs. günstige Alternative, '' = egal
};

export type RankedPerfume = { perfume: Perfume; score: number };

// ─── Quiz-Typen & Abfragen ──────────────────────────────────────────────────

export type QuizQuestionDB = {
  id: string;
  position: number;
  question_text: string;
  hint_text: string | null;
  question_type: string;
  answers: Array<{
    id: string;
    label: string;
    value: string;
    position: number;
  }>;
};

// Lädt alle Quiz-Fragen mit ihren Antworten von Supabase.
export async function getQuizQuestions(): Promise<QuizQuestionDB[]> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from('quiz_questions')
    .select(`
      id,
      position,
      question_text,
      hint_text,
      question_type,
      quiz_answers(id, answer_label, answer_value, position)
    `)
    .order('position', { ascending: true });
  if (error) return [];

  // Remap quiz_answers to answers, answer_label to label, answer_value to value
  return ((data as any[]) || []).map((q: any) => ({
    id: q.id,
    position: q.position,
    question_text: q.question_text,
    hint_text: q.hint_text,
    question_type: q.question_type,
    answers: (q.quiz_answers || []).map((a: any) => ({
      id: a.id,
      label: a.answer_label,
      value: a.answer_value,
      position: a.position
    }))
  })) as QuizQuestionDB[];
}

const DAILY_OCCASIONS = ['Alltag', 'Büro'];

// Duft-Themen für das Noten-Matching. Jede Auswahl deckt per Stichwort mehrere konkrete Noten ab.
export const NOTE_THEMES: { code: string; label: string; keywords: string[] }[] = [
  { code: 'vanille', label: 'Süss & gemütlich – Vanille, Karamell, Schokolade', keywords: ['Vanille', 'Karamell', 'Praline', 'Schokolade', 'Kakao', 'Honig', 'Tonkabohne'] },
  { code: 'zitrus', label: 'Frisch & spritzig – Zitrone, Bergamotte, Minze', keywords: ['Zitrone', 'Bergamotte', 'Grapefruit', 'Mandarine', 'Orange', 'Neroli', 'Minze', 'Apfel'] },
  { code: 'holz', label: 'Holzig & erdig – Sandelholz, Vetiver, Patchouli', keywords: ['Holz', 'Vetiver', 'Patchouli', 'Sandel', 'Zedern'] },
  { code: 'blumig', label: 'Blumig & zart – Rose, Jasmin, Veilchen', keywords: ['Rose', 'Jasmin', 'Tuberose', 'Veilchen', 'Orangenblüte', 'Maiglöckchen', 'Freesie', 'Pfingstrose', 'Magnolie', 'Gardenie', 'Ylang', 'Iris'] },
  { code: 'orient', label: 'Warm & würzig – Oud, Amber, Gewürze', keywords: ['Oud', 'Amber', 'Labdanum', 'Benzoe', 'Safran', 'Pfeffer', 'Zimt', 'Kardamom', 'Leder'] },
  { code: 'moschus', label: 'Weich & sauber – Moschus, Puder', keywords: ['Moschus', 'Puder', 'Ambrette', 'Cashmeran'] }
];

function perfumeNotes(p: Perfume): string[] {
  return [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].map((n) => n.toLowerCase());
}

// Noten, die ein Stichwort nur zufällig enthalten: „Rosenholz" ist keine Rose,
// „Pfefferminze" kein Pfeffer, „Orangenblüte" keine Orange.
const FALSE_FRIENDS: Record<string, string[]> = {
  rose: ['rosenholz', 'rosengeranie', 'tuberose'],
  pfeffer: ['pfefferminz'],
  orange: ['orangenblüte', 'orangenbluete']
};

export function noteHasKeyword(note: string, keyword: string): boolean {
  const n = note.toLowerCase();
  const kw = keyword.toLowerCase();
  if (!n.includes(kw)) return false;
  return !(FALSE_FRIENDS[kw] || []).some((f) => n.includes(f));
}

export function perfumeHasTheme(p: Perfume, code: string): boolean {
  if (!code) return false;
  const theme = NOTE_THEMES.find((t) => t.code === code);
  if (!theme) return false;
  const notes = perfumeNotes(p);
  return theme.keywords.some((kw) => notes.some((n) => noteHasKeyword(n, kw)));
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

// Zusatz-Dimensionen: nur wirksam, wenn beantwortet (sonst 0 = neutral).
// Als Bonus oben drauf, damit die bestehende 100er-Gewichtung unangetastet bleibt.
function longevityComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.longevity) return 0;
  const target = a.longevity === 'low' ? 4 : a.longevity === 'high' ? 9 : 6;
  const lon = p.longevity ?? 6;
  return 8 * (1 - Math.abs(lon - target) / 9);
}

function sweetnessComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.sweetness) return 0;
  // Süsse-Schätzwert des Dufts: gourmand = sehr süss, Vanille-Thema = mittel.
  const sweetVal = p.fragrance_family === 'gourmand' ? 9 : perfumeHasTheme(p, 'vanille') ? 6 : 2;
  const target = a.sweetness === 'low' ? 2 : a.sweetness === 'high' ? 9 : 5;
  return 6 * (1 - Math.abs(sweetVal - target) / 9);
}

function pricePrefComponent(p: Perfume, a: QuizAnswers): number {
  if (!a.pricePref) return 0;
  const price = p.price_chf ?? 100;
  // Günstige Alternative -> Bonus für preiswerte Düfte (Dupes).
  if (a.pricePref === 'alternative') return price <= 60 ? 6 : price <= 100 ? 3 : 0;
  // Original -> leichter Bonus für hochwertigere/teurere Düfte.
  return price >= 120 ? 5 : price >= 80 ? 3 : 1;
}

export type ScoreBreakdown = {
  family: number;
  lovedNote: number;
  occasion: number;
  season: number;
  sillage: number;
  budget: number;
  longevity: number;
  sweetness: number;
  pricePreference: number;
  dislikedNotePenalty: number;
  total: number;
};

export function getScoreBreakdown(p: Perfume, a: QuizAnswers): ScoreBreakdown {
  const family = familyComponent(p, a);
  const lovedNote = lovedNoteComponent(p, a);
  const occasion = occasionComponent(p, a);
  const season = seasonComponent(p, a);
  const sillage = sillageComponent(p, a);
  const budget = budgetComponent(p, a);
  const longevity = longevityComponent(p, a);
  const sweetness = sweetnessComponent(p, a);
  const pricePreference = pricePrefComponent(p, a);
  const dislikedPenalty = dislikedNotePenalty(p, a);

  const raw = family + lovedNote + occasion + season + sillage + budget + longevity + sweetness + pricePreference - dislikedPenalty;
  const total = Math.round(Math.max(0, Math.min(100, raw)));

  return { family, lovedNote, occasion, season, sillage, budget, longevity, sweetness, pricePreference, dislikedNotePenalty: dislikedPenalty, total };
}

export function matchScore(p: Perfume, a: QuizAnswers): number {
  return getScoreBreakdown(p, a).total;
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
    .filter(isWithinPriceCap)
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
    .filter((p) => isWithinPriceCap(p) && p.price_chf! <= targetPrice * 0.8)
    .map((p) => ({ perfume: p, similarity: noteSimilarity(target, p) }))
    .filter((s) => s.similarity >= 25)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit);
}

// ---------- Stimmungs-Finder ("Duft nach Stimmung") ----------
// Ordnet jeder Stimmung passende Duftfamilien, Noten und Eigenschaften zu.
// So kann die Seite Düfte rein nach Gefühl empfehlen – ohne Quiz, ohne Fachwissen.
// Bewusst einfach gehalten: Familie + Noten + (optional) Saison/Anlass/Intensität.

export type Mood = {
  code: string;
  emoji: string; // wird nur noch für Teilen-Texte (WhatsApp/Zwischenablage) genutzt
  icon: string; // Linien-Icon-Name für das Seiten-Design (siehe app/MoodIcon.tsx)
  title: string; // die Absicht/das Gefühl, z. B. "Ich will mich verwöhnen"
  phrase: string; // ehrliche Kurzform für Texte, z. B. "wenn dir nach Trost ist"
  subtitle: string; // kurze Zeile auf der Stimmungs-Kachel
  result: string; // Einleitungssatz über den Ergebnissen
  intro: string; // längerer, ehrlicher SEO-Text auf der eigenen Stimmungs-Seite
  tone: string; // Akzentfarbe für das atmosphärische Design (Hex)
  families: Partial<Record<string, number>>; // Duftfamilie -> Gewicht (bis 40)
  noteThemes: string[]; // passende NOTE_THEMES-Codes (Bonus)
  season?: string; // bevorzugte Saison (optional)
  occasions?: string[]; // passende Anlässe (optional)
  sillage?: 'low' | 'medium' | 'high'; // gewünschte Intensität (optional)
};

// Ehrliche Gefühls-Variante: Wir fragen, WONACH der/dem Nutzer:in gerade ist –
// und ordnen passende Düfte zu. Bewusst KEINE Heilversprechen ("heilt Traurigkeit"),
// sondern warme, wahre Sprache ("kann guttun"). Duft wirkt nachweislich aufs Gefühl,
// aber er ist ein schöner Moment, kein Wundermittel.
export const MOODS: Mood[] = [
  {
    code: 'verwoehnen',
    emoji: '💙',
    icon: 'mug',
    title: 'Ich will mich verwöhnen',
    phrase: 'wenn dir nach Trost und Wärme ist',
    subtitle: 'Vanille & Trost – wenn dir nach Kuscheln ist.',
    result: 'Warme, süsse Düfte wie eine Umarmung – Vanille, Karamell, Tonka. Sie schaffen sofort Geborgenheit und Wärme.',
    intro: 'Schwerer Tag? Ruhiger Moment? Dann holst du dir Comfort: Vanille (süss, beruhigend), Karamell (warm, einladend), Tonka (samtig, wärmend). Ein Parfüm löst keine Probleme – aber diese Noten sind wie Tee und Decke: Sie tun einfach gut.',
    tone: '#d8a48f',
    families: { gourmand: 40, floral: 10 },
    noteThemes: ['vanille', 'moschus'],
    sillage: 'low'
  },
  {
    code: 'stark',
    emoji: '🔥',
    icon: 'shield',
    title: 'Ich will mich stark fühlen',
    phrase: 'wenn du dir den Rücken stärken willst',
    subtitle: 'Vetiver & Kraft – für deinen souveränen Auftritt.',
    result: 'Holzige, tiefe Düfte wie ein fester Handschlag – Vetiver, Sandelholz, ein Hauch Leder. Sie strahlen Ruhe und Selbstvertrauen aus.',
    intro: 'Vor einem wichtigen Gespräch oder wenn Unsicherheit klopft: ein holziger, eleganter Duft kann wie Rüstung wirken. Vetiver (erdig, kraftvoll), Sandelholz (warm, edel), Leder (präsent, souverän) – nicht um dich zu verändern, sondern um dir selbst näher zu stehen.',
    tone: '#7a6a55',
    families: { woody: 40 },
    noteThemes: ['holz', 'orient'],
    sillage: 'high'
  },
  {
    code: 'runterkommen',
    emoji: '🌿',
    icon: 'leaf',
    title: 'Ich will runterkommen',
    phrase: 'wenn du zur Ruhe kommen willst',
    subtitle: 'Frisch & Grün – wenn du klare Gedanken brauchst.',
    result: 'Frische, helle Düfte mit sauberen Noten und sanftem Moschus – sie klären den Kopf wie eine tiefe Atemzug.',
    intro: 'Der Tag war zu viel? Frische Noten sind wie Reset für deine Gedanken: klare, saubere Noten (minzig, grün), Moschus (weich, beruhigend), vielleicht ein Hauch Kräuter. Sie lösen keine Probleme – aber sie machen den Kopf wieder leicht.',
    tone: '#7fb6c4',
    families: { clean: 40, floral: 5 },
    noteThemes: ['moschus'],
    sillage: 'low'
  },
  {
    code: 'durchstarten',
    emoji: '⚡',
    icon: 'bolt',
    title: 'Ich will durchstarten',
    phrase: 'wenn du Energie für den Tag brauchst',
    subtitle: 'Zitrus & Energie – dein Wach-Kick für morgens.',
    result: 'Spritzig, frische Zitrusdüfte wie ein Energieschub – Zitrone, Bergamotte, Grapefruit. Sie machen sofort wach und gut gelaunt.',
    intro: 'Du brauchst Schwung? Zitrusdüfte sind der beste Kick für den Morgen: Bergamotte (frisch, belebend), Zitrone (spritzig, klar), Grapefruit (sonnig, optimistisch). Sie wirken nicht wie Koffein – aber sie holen dich sofort aus der Müdigkeit.',
    tone: '#e8b65a',
    families: { clean: 40 },
    noteThemes: ['zitrus'],
    sillage: 'medium'
  },
  {
    code: 'verliebt',
    emoji: '🥰',
    icon: 'heart',
    title: 'Ich fühl mich verliebt',
    phrase: 'wenn du dich beschwingt und verliebt fühlst',
    subtitle: 'Rose & Jasmin – wenn Schmetterlinge tanzen.',
    result: 'Blumige, zarte Düfte die sanft und romantisch wirken – Rose, Jasmin, Veilchen. Sie tragen dein Glücksgefühl in die Welt.',
    intro: 'Das Herz geht schneller? Blumige Düfte passen perfekt zu diesem Gefühl: Rose (romantisch, zeitlos), Jasmin (sinnlich, warm), Veilchen (zart, elegant). Sie verstärken nicht das Gefühl – sie machen es einfach sichtbar für dich selbst.',
    tone: '#e0a6c0',
    families: { floral: 40, gourmand: 10 },
    noteThemes: ['blumig'],
    sillage: 'medium'
  },
  {
    code: 'strahlen',
    emoji: '✨',
    icon: 'sparkle',
    title: 'Ich will strahlen',
    phrase: 'wenn du auffallen und in Erinnerung bleiben willst',
    subtitle: 'Amber & Oud – dein Glanz für besondere Nächte.',
    result: 'Warme, intensive Düfte die Aufmerksamkeit erregen und hängen bleiben – Oud, Amber, Vanille. Sie machen dich unvergesslich.',
    intro: 'Du möchtest im Gedächtnis bleiben? Dann brauchst du Kraft: Oud (exotisch, intensiv), Amber (warm, sinnlich), Vanille (süss, luxuriös). Ein bis zwei Sprüher reichen – diese Düfte brauchen keine Menge, um zu wirken.',
    tone: '#9b6a8f',
    families: { woody: 25, gourmand: 25 },
    noteThemes: ['orient', 'vanille'],
    occasions: ['Date', 'Abend'],
    sillage: 'high'
  },
  {
    code: 'job',
    emoji: '💼',
    icon: 'briefcase',
    title: 'Ich will im Job überzeugen',
    phrase: 'wenn du im Job einen guten Eindruck machen willst',
    subtitle: 'Frisch & Kompetenz – für den professionellen Eindruck.',
    result: 'Frische, klare Düfte mit einem Hauch Holz – diskret, kompetent, angenehm. Sie sprechen für dich, ohne abzulenken.',
    intro: 'Im Meeting muss dein Duft unsichtbar arbeiten: er soll dich unterstützen, nicht ablenken. Frische Noten (Zitrus, klar) mit edlem Holz (Vetiver, Sandelholz) und Moschus (sauber, zurückhaltend) – ein Sprüher reicht völlig.',
    tone: '#9aa8a0',
    families: { clean: 25, woody: 20 },
    noteThemes: ['zitrus', 'holz', 'moschus'],
    occasions: ['Büro', 'Alltag'],
    sillage: 'low'
  },
  {
    code: 'urlaub',
    emoji: '☀️',
    icon: 'sun',
    title: 'Ich will Urlaubsgefühl',
    phrase: 'wenn du dir Sommer und Urlaub wünschst',
    subtitle: 'Zitrus & Freiheit – dein Sommer im Flacon.',
    result: 'Leichte, sonnige Düfte wie Sonne auf der Haut – Zitrus, frische Blüten, Leichtigkeit. Sie riechen nach Urlaub.',
    intro: 'Träumst du von Sommer? Leichte Zitrusdüfte holen die Urlaubsgefühle auf die Haut: Bergamotte (sonnig, frisch), Kokos oder tropische Noten (warm, weich), leichte Blüten (spielerisch). Sie sind dein Ticket zum Strand im Kopf.',
    tone: '#3fb8c4',
    families: { clean: 25, floral: 20 },
    noteThemes: ['zitrus'],
    season: 'Sommer',
    sillage: 'medium'
  },
  {
    code: 'abend',
    emoji: '🌙',
    icon: 'moon',
    title: 'Ich will den Abend geniessen',
    phrase: 'wenn du den Abend gemütlich ausklingen lassen willst',
    subtitle: 'Vanille & Moschus – deine Gemütlichkeit im Flacon.',
    result: 'Warme, weiche Düfte wie ein Moment nur für dich – Vanille, Moschus, ein Hauch Holz. Sie machen den Abend geborgen.',
    intro: 'Der Feierabend ist für dich: warme, süsse Düfte mit Vanille (behaglich, beruhigend), Moschus (sanft, sauber), ein Hauch Holz (warm, reif). Zünde eine Kerze an, mach es dir bequem – dieser Duft tut das Gleiche.',
    tone: '#6b5b8a',
    families: { gourmand: 30, woody: 15 },
    noteThemes: ['vanille', 'moschus'],
    occasions: ['Abend'],
    sillage: 'low'
  },
  {
    code: 'geschenk',
    emoji: '🎁',
    icon: 'gift',
    title: 'Ich suche ein Geschenk',
    phrase: 'wenn du ein Parfüm verschenken möchtest',
    subtitle: 'Die sichersten Favoriten – für jeden Geschmack.',
    result: 'Vielseitige, beliebte Düfte mit hohem Auressa-Score – ganzjährig tragbar und universell geliebt. Sichere Geschenke.',
    intro: 'Ein Parfüm zu schenken braucht nicht kompliziert zu sein: Zeige hier die beliebtesten, vielseitigsten Düfte – die, die wirklich fast jede und jeder gerne trägt. Ganzjährig passend, mittlere Intensität, kein Risiko – einfach sicher.',
    tone: '#c9a24a',
    families: { clean: 10, gourmand: 10, woody: 10, floral: 10 },
    noteThemes: [],
    season: 'Ganzjährig',
    sillage: 'medium'
  }
];

// Echte, hilfreiche Praxis-Tipps je Stimmung ("Worauf du achten kannst").
// Bewusst nützlich statt Fülltext – gut für Leser UND für Google.
export const MOOD_TIPS: Record<string, string> = {
  verwoehnen:
    'Achte auf Gourmand-Düfte mit Vanille, Tonka oder Karamell. Trag sie eher sparsam auf – warme, süsse Noten wirken schnell intensiv. Für tagsüber reicht ein Sprüher, abends darf es etwas mehr sein.',
  stark:
    'Holzige Düfte mit Vetiver, Zedernholz oder einem Hauch Leder wirken souverän. Sie entfalten sich oft erst nach 10–15 Minuten – gib ihnen Zeit. Ein bis zwei Sprüher genügen, um präsent zu sein.',
  runterkommen:
    'Greif zu klaren, frischen Düften mit Moschus oder leichten grünen Noten. Sie halten meist etwas kürzer – ein Nachsprühen am Abend ist völlig okay. Hier gilt: weniger ist mehr.',
  durchstarten:
    'Zitrusdüfte mit Zitrone, Bergamotte oder Grapefruit machen sofort wach. Sie verfliegen schneller als andere – ideal als Frische-Kick am Morgen, bei Bedarf mittags auffrischen.',
  verliebt:
    'Blumige Düfte mit Rose, Jasmin oder Pfingstrose wirken zart und beschwingt. Auf warmer Haut (Handgelenk, Hals) entfalten sie sich am schönsten. Nicht verreiben – das bricht den Duft.',
  strahlen:
    'Für besondere Abende sind intensive Düfte mit Amber, Oud oder Vanille gemacht. Sie halten lang und tragen weit – ein, zwei Sprüher reichen völlig. Am besten ca. 20 Minuten vor dem Rausgehen auftragen.',
  job:
    'Im Büro gilt: dezent auftragen – lieber ein Sprüher auf die Kleidung als mehrere auf die Haut. Frische, klare Düfte mit wenig Sillage stören niemanden im Meeting. Schwere, süsse Düfte hebst du dir besser für die Freizeit auf.',
  urlaub:
    'Leichte Zitrus- und Blütendüfte passen perfekt zu Hitze – schwere Düfte wirken in der Sonne schnell zu viel. Sie halten kürzer, also ruhig nachsprühen. Auf eingecremter Haut duften sie besonders lang.',
  abend:
    'Warme Düfte mit Vanille, Moschus und etwas Holz schaffen Gemütlichkeit. Sprüh sie eher nah an die Haut statt in den ganzen Raum. Nach einem warmen Bad hält der Duft besonders gut.',
  geschenk:
    'Sicher schenkst du mit vielseitigen Düften: ganzjährig tragbar und mittlere Intensität passen den meisten. Kennst du den Geschmack nicht genau, ist ein Unisex-Duft eine gute Wahl. Ein bekannter, beliebter Duft kommt fast immer gut an.'
};

// Eine einzelne Stimmung anhand ihres Codes finden (für die Detailseiten).
export function getMood(code: string): Mood | undefined {
  return MOODS.find((m) => m.code === code);
}

// Kurze, ehrliche Begründung, warum ein Duft zu einer Stimmung passt.
// Nutzt nur vorhandene Daten (Notenthema oder Duftfamilie) – kein Heilversprechen.
const MOOD_FAMILY_WORDS: Record<string, string> = {
  clean: 'Frische, klare Noten',
  gourmand: 'Warme, süsse Noten',
  woody: 'Holzige, tiefe Noten',
  floral: 'Blumige, zarte Noten'
};
const MOOD_THEME_WORDS: Record<string, string> = {
  vanille: 'Süsse Vanille-Noten',
  zitrus: 'Spritzige Zitrus-Noten',
  holz: 'Edle Holznoten',
  blumig: 'Zarte Blütennoten',
  orient: 'Warme, würzige Noten',
  moschus: 'Weiche, saubere Noten'
};

export function moodReason(p: Perfume, mood: Mood): string {
  const theme = mood.noteThemes.find((code) => perfumeHasTheme(p, code));
  if (theme && MOOD_THEME_WORDS[theme]) return `${MOOD_THEME_WORDS[theme]} – genau das Richtige dafür.`;
  const fam = p.fragrance_family || '';
  if (MOOD_FAMILY_WORDS[fam]) return `${MOOD_FAMILY_WORDS[fam]} – genau das Richtige dafür.`;
  return 'Passt zu deinem Gefühl.';
}

// "Duft-DNA" einer Stimmung: zeigt, welche Notenthemen in den Treffern dominieren.
// Liefert prozentuale Balken (relativ zum häufigsten Thema) – ideal als Grafik.
export function moodNoteProfile(
  perfumes: Perfume[],
  limit = 5
): { code: string; label: string; pct: number }[] {
  if (!perfumes.length) return [];
  const counts = NOTE_THEMES.map((t) => ({
    code: t.code,
    label: t.label.split(' – ')[0], // Kurzform, z. B. "Süss & gemütlich"
    count: perfumes.filter((p) => perfumeHasTheme(p, t.code)).length
  })).filter((c) => c.count > 0);
  const max = Math.max(1, ...counts.map((c) => c.count));
  return counts
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map((c) => ({ code: c.code, label: c.label, pct: Math.round((c.count / max) * 100) }));
}

// Bewertet, wie gut ein Duft zu einer Stimmung passt (höher = besser).
export function moodScore(p: Perfume, mood: Mood): number {
  let s = 0;
  // Duftfamilie (bis 40)
  s += mood.families[p.fragrance_family || ''] || 0;
  // Passende Noten (bis 25)
  if (mood.noteThemes.some((code) => perfumeHasTheme(p, code))) s += 25;
  // Saison (bis 10)
  if (mood.season && p.season && (p.season === mood.season || p.season === 'Ganzjährig')) s += 10;
  // Anlass (bis 10)
  if (mood.occasions && p.occasion && mood.occasions.includes(p.occasion)) s += 10;
  // Intensität (bis 10)
  if (mood.sillage) {
    const target = mood.sillage === 'low' ? 4 : mood.sillage === 'high' ? 9 : 6;
    const sill = p.sillage ?? 6;
    s += 10 * (1 - Math.abs(sill - target) / 9);
  }
  // Leichter Qualitäts-Tiebreaker über den Auressa-Score (bis 5)
  s += (computeAuressaScore(p).total / 100) * 5;
  return s;
}

// Passt ein Duft überhaupt? Nur mit passender Duftfamilie – einzelne Noten wie Moschus
// oder Zedernholz stecken in fast jedem Duft und würden sonst jeden Duft zulassen.
// Passt nur, wenn die Duftfamilie eine Hauptfamilie der Stimmung ist – oder eine
// Nebenfamilie und der Duft zusätzlich passende Noten hat. Sonst landet z. B. ein
// frisch-blumiger Duft als „Top-Treffer" bei „Vanille & Trost".
export function fitsMood(p: Perfume, mood: Mood): boolean {
  const weight = mood.families[p.fragrance_family || ''] || 0;
  if (weight <= 0) return false;
  const top = Math.max(...Object.values(mood.families).map((w) => w || 0));
  if (weight >= 15 || weight === top) return true;
  return mood.noteThemes.some((code) => perfumeHasTheme(p, code));
}

// Liefert die am besten zur Stimmung passenden Düfte – optional nach Geschlecht gefiltert.
export function rankByMood(
  perfumes: Perfume[],
  mood: Mood,
  gender: QuizAnswers['gender'] = '',
  limit = 12
): Perfume[] {
  return perfumes
    .filter((p) => matchesGender(p, gender))
    .filter(isWithinPriceCap)
    .filter((p) => fitsMood(p, mood))
    .map((p) => ({ p, s: moodScore(p, mood) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
}

export function rankPerfumes(perfumes: Perfume[], a: QuizAnswers): RankedPerfume[] {
  const anchor = a.anchorId ? perfumes.find((p) => p.id === a.anchorId) || null : null;
  return perfumes
    .filter((p) => matchesGender(p, a.gender))
    .filter(isWithinPriceCap)
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

// Auto-Tagging Logik für Altersgruppen und Lifestyle
type AgeGroupTags = {
  age_group: string;
  lifestyle: string;
  trend_vibe: string;
  gender_nuance: string | null;
};

export function autoTagPerfume(p: Perfume): AgeGroupTags {
  const price = p.price_chf || 80;
  const sillage = p.sillage || 6;
  const family = (p.fragrance_family || '').toLowerCase();
  const allNotes = [
    ...(p.top_notes || []),
    ...(p.heart_notes || []),
    ...(p.base_notes || [])
  ].map((n) => n.toLowerCase());

  const tags: AgeGroupTags = {
    age_group: 'all',
    lifestyle: 'all',
    trend_vibe: 'classic',
    gender_nuance: null
  };

  // Intelligente Regeln für Altersgruppen
  if (family === 'gourmand') {
    if (
      (allNotes.some((n) => n.includes('vanille') || n.includes('karamell')) && price >= 70 && price <= 150) ||
      sillage >= 6
    ) {
      tags.age_group = '25-35';
      tags.lifestyle = 'professional';
      tags.trend_vibe = 'popular';
    } else if (price <= 60) {
      tags.age_group = '18-25';
      tags.lifestyle = 'student';
    }
  } else if (family === 'woody') {
    if (price >= 100) {
      tags.age_group = '35-40';
      tags.lifestyle = 'professional';
      tags.trend_vibe = 'classic';
    } else if (allNotes.some((n) => n.includes('zedernholz') || n.includes('sandelholz'))) {
      tags.age_group = '25-35';
      tags.lifestyle = 'professional';
    } else {
      tags.age_group = '18-25';
      tags.lifestyle = 'casual';
    }
  } else if (family === 'clean') {
    if (price <= 50) {
      tags.age_group = '18-25';
      tags.lifestyle = 'student';
      tags.trend_vibe = 'trendy';
    } else if (allNotes.some((n) => n.includes('zitrus') || n.includes('bergamotte'))) {
      tags.age_group = '25-35';
      tags.lifestyle = 'professional';
      tags.trend_vibe = 'popular';
    } else {
      tags.age_group = '25-35';
      tags.lifestyle = 'casual';
    }
  } else if (family === 'floral') {
    if (sillage >= 8 && price >= 100) {
      tags.age_group = '25-35';
      tags.lifestyle = 'party';
      tags.trend_vibe = 'trendy';
    } else {
      tags.age_group = '18-25';
      tags.lifestyle = 'casual';
    }
  }

  // Gender Nuance
  if (p.gender === 'Women') {
    tags.gender_nuance = 'feminine';
  } else if (p.gender === 'Men') {
    tags.gender_nuance = 'masculine';
  } else if (p.gender === 'Unisex') {
    tags.gender_nuance = 'androgynous';
  }

  return tags;
}

// Batch-Update für alle Düfte (wird vom Admin-Panel oder Backend aufgerufen)
export async function autoTagAllPerfumes(): Promise<{
  success: number;
  failed: number;
}> {
  if (!isSupabaseConfigured) {
    return { success: 0, failed: 0 };
  }

  const { data: perfumes, error: fetchError } = await supabase
    .from('perfumes')
    .select('*')
    .limit(1000);

  if (fetchError || !perfumes) {
    console.error('Failed to fetch perfumes:', fetchError);
    return { success: 0, failed: perfumes?.length || 0 };
  }

  let success = 0;
  let failed = 0;

  for (const p of perfumes) {
    const tags = autoTagPerfume(p);
    const { error } = await supabase
      .from('perfumes')
      .update({
        age_group: tags.age_group,
        lifestyle: tags.lifestyle,
        trend_vibe: tags.trend_vibe,
        gender_nuance: tags.gender_nuance
      })
      .eq('id', p.id);

    if (error) {
      failed++;
      console.error(`Failed to tag perfume ${p.id}:`, error);
    } else {
      success++;
    }
  }

  console.log(
    `Auto-tagging complete: ${success} successful, ${failed} failed`
  );
  return { success, failed };
}
