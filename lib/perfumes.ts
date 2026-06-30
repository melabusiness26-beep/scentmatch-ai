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

// Erzeugt eine ausführliche, natürlich klingende Beschreibung aus den
// vorhandenen Daten eines Dufts. Wird genutzt, wenn keine manuelle
// Beschreibung hinterlegt ist – so wirkt jede Duftseite vollständig.
const FAMILY_DESC: Record<string, string> = {
  clean: 'frischer, sauberer',
  gourmand: 'warmer, süßlicher',
  woody: 'holziger, eleganter',
  floral: 'blumiger, femininer'
};
const GENDER_DESC: Record<string, string> = {
  Women: ' für Damen',
  Men: ' für Herren',
  Unisex: ', unisex tragbar'
};
// Geschmackvolle, bildhafte Stimmungssätze – emotional, aber nicht kitschig.
const FAMILY_MOOD: Record<string, string> = {
  clean: 'Er fühlt sich an wie ein frisch gelüfteter Morgen – klar, leicht und unbeschwert.',
  gourmand: 'Er legt sich warm und weich um dich, süß und vertraut wie ein gemütlicher Abend.',
  woody: 'Er umgibt dich mit ruhiger, selbstbewusster Eleganz – tief, edel und souverän.',
  floral: 'Er blüht zart auf der Haut auf – romantisch, weich und voller Charme.'
};
// Kleine „Szene" je Anlass – macht die Beschreibung greifbarer.
const OCCASION_MOOD: Record<string, string> = {
  Date: 'Wie geschaffen für Momente, in denen du in Erinnerung bleiben möchtest.',
  Abend: 'Gemacht für besondere Abende, an denen du auffallen darfst.',
  Alltag: 'Ein verlässlicher Begleiter, der dich unaufdringlich durch den Tag trägt.',
  'Büro': 'Dezent genug fürs Büro – und gepflegt genug, um Eindruck zu hinterlassen.'
};

function notesList(notes: string[] | null): string {
  return notes && notes.length ? notes.join(', ') : '';
}

export function describePerfume(p: Perfume): string {
  const brand = p.brands?.name ? ` von ${p.brands.name}` : '';
  const fam = p.fragrance_family ? FAMILY_DESC[p.fragrance_family] || '' : '';
  const gender = p.gender ? GENDER_DESC[p.gender] || '' : '';
  const sentences: string[] = [];

  sentences.push(`${p.perfume_name}${brand} ist ein ${fam ? `${fam} ` : ''}Duft${gender}.`);

  if (p.fragrance_family && FAMILY_MOOD[p.fragrance_family]) {
    sentences.push(FAMILY_MOOD[p.fragrance_family]);
  }

  const top = notesList(p.top_notes);
  const heart = notesList(p.heart_notes);
  const base = notesList(p.base_notes);
  const bits: string[] = [];
  if (top) bits.push(`öffnet mit ${top}`);
  if (heart) bits.push(`entfaltet im Herzen ${heart}`);
  if (base) bits.push(`klingt mit ${base} aus`);
  if (bits.length === 1) sentences.push(`Er ${bits[0]}.`);
  else if (bits.length > 1) sentences.push(`Er ${bits.slice(0, -1).join(', ')} und ${bits[bits.length - 1]}.`);

  const perf: string[] = [];
  if (p.longevity != null) {
    const word = p.longevity >= 8 ? 'sehr gut' : p.longevity >= 6 ? 'solide' : 'eher dezent';
    perf.push(`die Haltbarkeit ist ${word} (${p.longevity}/10)`);
  }
  if (p.sillage != null) {
    const word = p.sillage >= 8 ? 'kräftig' : p.sillage >= 6 ? 'ausgewogen' : 'nah an der Haut';
    perf.push(`die Sillage ist ${word} (${p.sillage}/10)`);
  }
  if (perf.length) {
    const joined = perf.join(' und ');
    sentences.push(`${joined.charAt(0).toUpperCase()}${joined.slice(1)}.`);
  }

  if (p.occasion && OCCASION_MOOD[p.occasion]) sentences.push(OCCASION_MOOD[p.occasion]);
  else if (p.occasion) sentences.push(`Ideal für ${p.occasion}.`);

  if (p.season) {
    sentences.push(
      p.season === 'Ganzjährig'
        ? 'Am schönsten trägt er sich das ganze Jahr über.'
        : `Am schönsten in der Saison ${p.season}.`
    );
  }

  if (p.price_chf != null) sentences.push(`Richtpreis: ca. CHF ${p.price_chf}.`);

  return sentences.join(' ');
}

// Ziel-Link für den „Jetzt ansehen"-Button. Liegt ein Affiliate-Link vor,
// wird dieser genutzt; sonst eine neutrale Such-Verlinkung (nie ein toter Button).
export function buyUrl(p: Perfume): string {
  if (p.affiliate_url) return p.affiliate_url;
  const query = encodeURIComponent(`${p.perfume_name} ${p.brands?.name || ''} Parfum`.trim());
  return `https://www.google.com/search?q=${query}`;
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
  return (data as unknown as Perfume[]) || [];
}

// Anzahl der Düfte im Katalog – für dynamische Texte wie „über X Düfte".
export async function getPerfumeCount(): Promise<number> {
  if (!isSupabaseConfigured) return 0;
  const { count, error } = await supabase
    .from('perfumes')
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
  longevity: 'low' | 'medium' | 'high' | ''; // gewünschte Haltbarkeit, '' = egal
  sweetness: 'low' | 'medium' | 'high' | ''; // gewünschte Süße, '' = egal
  pricePref: 'original' | 'alternative' | ''; // Original vs. günstige Alternative, '' = egal
};

export type RankedPerfume = { perfume: Perfume; score: number };

const DAILY_OCCASIONS = ['Alltag', 'Büro'];

// Duft-Themen für das Noten-Matching. Jede Auswahl deckt per Stichwort mehrere konkrete Noten ab.
export const NOTE_THEMES: { code: string; label: string; keywords: string[] }[] = [
  { code: 'vanille', label: 'Süß & gemütlich – Vanille, Karamell, Schokolade', keywords: ['Vanille', 'Karamell', 'Praline', 'Schokolade', 'Kakao', 'Honig', 'Tonkabohne'] },
  { code: 'zitrus', label: 'Frisch & spritzig – Zitrone, Bergamotte, Minze', keywords: ['Zitrone', 'Bergamotte', 'Grapefruit', 'Mandarine', 'Orange', 'Neroli', 'Minze', 'Apfel'] },
  { code: 'holz', label: 'Holzig & erdig – Sandelholz, Vetiver, Patchouli', keywords: ['Holz', 'Vetiver', 'Patchouli', 'Sandel', 'Zedern'] },
  { code: 'blumig', label: 'Blumig & zart – Rose, Jasmin, Veilchen', keywords: ['Rose', 'Jasmin', 'Tuberose', 'Veilchen', 'Orangenblüte', 'Maiglöckchen', 'Freesie', 'Pfingstrose', 'Magnolie', 'Gardenie', 'Ylang', 'Iris'] },
  { code: 'orient', label: 'Warm & würzig – Oud, Amber, Gewürze', keywords: ['Oud', 'Amber', 'Labdanum', 'Benzoe', 'Safran', 'Pfeffer', 'Zimt', 'Kardamom', 'Leder'] },
  { code: 'moschus', label: 'Weich & sauber – Moschus, Puder', keywords: ['Moschus', 'Puder', 'Ambrette', 'Cashmeran'] }
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
  // Süße-Schätzwert des Dufts: gourmand = sehr süß, Vanille-Thema = mittel.
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

export function matchScore(p: Perfume, a: QuizAnswers): number {
  const raw =
    familyComponent(p, a) +
    lovedNoteComponent(p, a) +
    occasionComponent(p, a) +
    seasonComponent(p, a) +
    sillageComponent(p, a) +
    budgetComponent(p, a) +
    longevityComponent(p, a) +
    sweetnessComponent(p, a) +
    pricePrefComponent(p, a) -
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

// ---------- Stimmungs-Finder ("Duft nach Stimmung") ----------
// Ordnet jeder Stimmung passende Duftfamilien, Noten und Eigenschaften zu.
// So kann die Seite Düfte rein nach Gefühl empfehlen – ohne Quiz, ohne Fachwissen.
// Bewusst einfach gehalten: Familie + Noten + (optional) Saison/Anlass/Intensität.

export type Mood = {
  code: string;
  emoji: string;
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
    title: 'Ich will mich verwöhnen',
    phrase: 'wenn dir nach Trost und Wärme ist',
    subtitle: 'Warm und weich, wenn dir nach Trost ist.',
    result: 'Diese warmen, weichen Düfte fühlen sich an wie eine Umarmung – ein kleiner schöner Moment für dich.',
    intro: 'An einem ruhigen oder schweren Tag kannst du dir mit einem Duft etwas Gutes tun: Vanille, Karamell, weicher Moschus. Ein Parfüm löst keine Probleme – aber warme, süße Noten können tröstend und behaglich wirken, wie ein gemütlicher Abend mit Decke und Tee.',
    tone: '#d8a48f',
    families: { gourmand: 40, floral: 10 },
    noteThemes: ['vanille', 'moschus'],
    sillage: 'low'
  },
  {
    code: 'stark',
    emoji: '🔥',
    title: 'Ich will mich stark fühlen',
    phrase: 'wenn du dir den Rücken stärken willst',
    subtitle: 'Edel und präsent, für mehr Selbstvertrauen.',
    result: 'Diese holzigen, tiefen Düfte wirken edel und souverän – ein Begleiter, der dir den Rücken stärkt.',
    intro: 'Vor einem wichtigen Termin oder wenn du dich unsicher fühlst, kann ein edler Duft wie ein vertrautes Kleidungsstück wirken: Sandelholz, Vetiver, ein Hauch Leder. Er macht dich nicht zu jemand anderem – aber er kann dir helfen, dich ein bisschen souveräner zu fühlen.',
    tone: '#7a6a55',
    families: { woody: 40 },
    noteThemes: ['holz', 'orient'],
    sillage: 'high'
  },
  {
    code: 'runterkommen',
    emoji: '🌿',
    title: 'Ich will runterkommen',
    phrase: 'wenn du zur Ruhe kommen willst',
    subtitle: 'Frisch und klar, zum Durchatmen.',
    result: 'Diese frischen, klaren Düfte schaffen ein Gefühl von Leichtigkeit – zum Durchatmen und Loslassen.',
    intro: 'Wenn der Tag stressig war, können frische, klare Düfte ein Gefühl von Ruhe schaffen: saubere Noten, weicher Moschus, etwas Grün. Kein Wundermittel – aber ein bewusster Wohlfühl-Moment nur für dich.',
    tone: '#7fb6c4',
    families: { clean: 40, floral: 5 },
    noteThemes: ['moschus'],
    sillage: 'low'
  },
  {
    code: 'durchstarten',
    emoji: '⚡',
    title: 'Ich will durchstarten',
    phrase: 'wenn du Energie für den Tag brauchst',
    subtitle: 'Spritzig und wach, für deinen Schwung.',
    result: 'Diese spritzigen, frischen Düfte wirken wie ein kleiner Energieschub – wach, klar und gut gelaunt.',
    intro: 'Wenn du müde bist oder Schwung brauchst, sind spritzige Zitrusdüfte ideal: Zitrone, Bergamotte, Grapefruit. Frische Noten wirken belebend und wach – ein guter Begleiter für den Start in einen vollen Tag.',
    tone: '#e8b65a',
    families: { clean: 40 },
    noteThemes: ['zitrus'],
    sillage: 'medium'
  },
  {
    code: 'verliebt',
    emoji: '🥰',
    title: 'Ich fühl mich verliebt',
    phrase: 'wenn du dich beschwingt und verliebt fühlst',
    subtitle: 'Zart und beschwingt, voller Gefühl.',
    result: 'Diese blumigen, zarten Düfte wirken charmant und beschwingt – wie Schmetterlinge im Bauch.',
    intro: 'Verliebt? Dann passen blumige, zarte Düfte: Rose, Jasmin, Veilchen. Sie wirken romantisch, weich und feminin – und tragen dein gutes Gefühl durch den Tag.',
    tone: '#e0a6c0',
    families: { floral: 40, gourmand: 10 },
    noteThemes: ['blumig'],
    sillage: 'medium'
  },
  {
    code: 'strahlen',
    emoji: '✨',
    title: 'Ich will strahlen',
    phrase: 'wenn du auffallen und in Erinnerung bleiben willst',
    subtitle: 'Warm und tief, für besondere Momente.',
    result: 'Diese warmen, tiefen Düfte bleiben in Erinnerung – gemacht für Dates und besondere Abende.',
    intro: 'Für ein Date oder einen besonderen Abend darf es ein Duft sein, der auffällt: Oud, Amber, Vanille, Gewürze. Warm, tief und vielschichtig – damit du dich rundum gut und besonders fühlst.',
    tone: '#9b6a8f',
    families: { woody: 25, gourmand: 25 },
    noteThemes: ['orient', 'vanille'],
    occasions: ['Date', 'Abend'],
    sillage: 'high'
  },
  {
    code: 'job',
    emoji: '💼',
    title: 'Ich will im Job überzeugen',
    phrase: 'wenn du im Job einen guten Eindruck machen willst',
    subtitle: 'Dezent und seriös, fürs Büro.',
    result: 'Diese gepflegten, dezenten Düfte wirken seriös – ideal fürs Büro und den Arbeitsalltag.',
    intro: 'Im Job zählt ein Duft, der gepflegt wirkt, ohne aufzudringen: frische, klare Noten und etwas Holz. Dezent dosiert bleibst du angenehm im Hintergrund – professionell und nicht zu präsent für enge Büros.',
    tone: '#9aa8a0',
    families: { clean: 25, woody: 20 },
    noteThemes: ['zitrus', 'holz', 'moschus'],
    occasions: ['Büro', 'Alltag'],
    sillage: 'low'
  },
  {
    code: 'urlaub',
    emoji: '☀️',
    title: 'Ich will Urlaubsgefühl',
    phrase: 'wenn du dir Sommer und Urlaub wünschst',
    subtitle: 'Leicht und fruchtig, wie Ferien.',
    result: 'Diese leichten, fruchtigen Düfte schmecken nach Urlaub – Sonne, Strand und gute Laune.',
    intro: 'Sehnsucht nach Sommer? Leichte, fruchtige Düfte mit Zitrus und frischen Blüten holen das Urlaubsgefühl auf die Haut. Spritzig, sonnig und gut gelaunt – ideal für warme Tage und freie Stunden.',
    tone: '#3fb8c4',
    families: { clean: 25, floral: 20 },
    noteThemes: ['zitrus'],
    season: 'Sommer',
    sillage: 'medium'
  },
  {
    code: 'abend',
    emoji: '🌙',
    title: 'Ich will den Abend genießen',
    phrase: 'wenn du den Abend gemütlich ausklingen lassen willst',
    subtitle: 'Warm und entspannt für den Abend.',
    result: 'Diese warmen, weichen Düfte machen den Abend gemütlich – zum Entspannen und Genießen.',
    intro: 'Ein ruhiger Abend für dich: warme, weiche Düfte mit Vanille und sanftem Moschus, dazu etwas Holz für Tiefe. Gemütlich und entspannt – wie Kerzenlicht und ein gutes Buch.',
    tone: '#6b5b8a',
    families: { gourmand: 30, woody: 15 },
    noteThemes: ['vanille', 'moschus'],
    occasions: ['Abend'],
    sillage: 'low'
  },
  {
    code: 'geschenk',
    emoji: '🎁',
    title: 'Ich suche ein Geschenk',
    phrase: 'wenn du ein Parfüm verschenken möchtest',
    subtitle: 'Beliebte Allrounder, die fast jedem gefallen.',
    result: 'Diese vielseitigen, beliebten Düfte sind sichere Geschenke – sie kommen fast immer gut an.',
    intro: 'Ein Parfüm zu verschenken ist heikel – darum zeigen wir hier vielseitige Allrounder mit hohem Auressa-Score: ganzjährig tragbar, angenehm dosiert und breit beliebt. So liegst du auch ohne genaue Vorlieben selten daneben.',
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
    'Achte auf Gourmand-Düfte mit Vanille, Tonka oder Karamell. Trag sie eher sparsam auf – warme, süße Noten wirken schnell intensiv. Für tagsüber reicht ein Sprüher, abends darf es etwas mehr sein.',
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
    'Im Büro gilt: dezent auftragen – lieber ein Sprüher auf die Kleidung als mehrere auf die Haut. Frische, klare Düfte mit wenig Sillage stören niemanden im Meeting. Schwere, süße Düfte hebst du dir besser für die Freizeit auf.',
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
  gourmand: 'Warme, süße Noten',
  woody: 'Holzige, tiefe Noten',
  floral: 'Blumige, zarte Noten'
};
const MOOD_THEME_WORDS: Record<string, string> = {
  vanille: 'Süße Vanille-Noten',
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
    label: t.label.split(' – ')[0], // Kurzform, z. B. "Süß & gemütlich"
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
  s += ((p.scentmatch_score ?? 80) / 100) * 5;
  return s;
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
    .map((p) => ({ p, s: moodScore(p, mood) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
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
