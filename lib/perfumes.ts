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
  title: string;
  subtitle: string; // kurze Zeile auf der Stimmungs-Kachel
  result: string; // Einleitungssatz über den Ergebnissen
  intro: string; // längerer SEO-Text auf der eigenen Stimmungs-Seite
  tone: string; // Akzentfarbe für das atmosphärische Design (Hex)
  families: Partial<Record<string, number>>; // Duftfamilie -> Gewicht (bis 40)
  noteThemes: string[]; // passende NOTE_THEMES-Codes (Bonus)
  season?: string; // bevorzugte Saison (optional)
  occasions?: string[]; // passende Anlässe (optional)
  sillage?: 'low' | 'medium' | 'high'; // gewünschte Intensität (optional)
};

export const MOODS: Mood[] = [
  {
    code: 'cozy',
    emoji: '🤍',
    title: 'Geborgen & gemütlich',
    subtitle: 'Warm, weich, wie eine Umarmung.',
    result: 'Diese Düfte legen sich warm und weich um dich – süß, vertraut und gemütlich.',
    intro: 'Wenn dir nach Geborgenheit ist, passen warme, leicht süße Düfte am besten: Vanille, Karamell, weicher Moschus. Sie fühlen sich an wie eine Umarmung und ein gemütlicher Abend auf dem Sofa.',
    tone: '#d8a48f',
    families: { gourmand: 40, floral: 10 },
    noteThemes: ['vanille', 'moschus'],
    sillage: 'low'
  },
  {
    code: 'fresh',
    emoji: '⚡',
    title: 'Frisch & wach',
    subtitle: 'Spritzig, klar, voller Energie.',
    result: 'Diese Düfte wirken wie klare Morgenluft – frisch, sauber und belebend.',
    intro: 'Für einen wachen, energiegeladenen Tag sind frische, spritzige Düfte ideal: Zitrone, Bergamotte, klare Luft. Sie wirken gepflegt, modern und sofort belebend – perfekt für Alltag und Büro.',
    tone: '#7fb6c4',
    families: { clean: 40 },
    noteThemes: ['zitrus'],
    sillage: 'medium'
  },
  {
    code: 'confident',
    emoji: '🔥',
    title: 'Selbstbewusst & stark',
    subtitle: 'Edel, tief, präsent.',
    result: 'Diese Düfte umgeben dich mit ruhiger, selbstbewusster Eleganz – tief und souverän.',
    intro: 'Wenn du Eindruck hinterlassen willst, sind holzige, tiefe Düfte deine Wahl: Sandelholz, Vetiver, ein Hauch Leder. Sie wirken edel, souverän und selbstbewusst – ohne aufdringlich zu sein.',
    tone: '#7a6a55',
    families: { woody: 40 },
    noteThemes: ['holz', 'orient'],
    sillage: 'high'
  },
  {
    code: 'romantic',
    emoji: '💕',
    title: 'Romantisch & verliebt',
    subtitle: 'Zart, charmant, voller Gefühl.',
    result: 'Diese Düfte blühen zart auf der Haut auf – romantisch, weich und voller Charme.',
    intro: 'In romantischer Stimmung passen blumige, zarte Düfte: Rose, Jasmin, Veilchen. Sie wirken charmant, weich und feminin – wie ein Frühlingstag voller Schmetterlinge im Bauch.',
    tone: '#e0a6c0',
    families: { floral: 40, gourmand: 10 },
    noteThemes: ['blumig'],
    sillage: 'medium'
  },
  {
    code: 'sensual',
    emoji: '✨',
    title: 'Sinnlich & verführerisch',
    subtitle: 'Warm, tief, magnetisch.',
    result: 'Diese Düfte sind gemacht für Nähe – warm, tief und unwiderstehlich.',
    intro: 'Für Dates und besondere Abende sind warme, sinnliche Düfte gemacht: Oud, Amber, Vanille, Gewürze. Sie wirken magnetisch, tief und unwiderstehlich – und bleiben in Erinnerung.',
    tone: '#9b6a8f',
    families: { woody: 25, gourmand: 25 },
    noteThemes: ['orient', 'vanille'],
    occasions: ['Date', 'Abend'],
    sillage: 'high'
  },
  {
    code: 'summer',
    emoji: '🌴',
    title: 'Verspielt & sommerlich',
    subtitle: 'Fruchtig, leicht, wie Urlaub.',
    result: 'Diese Düfte schmecken nach Urlaub – fruchtig, leicht und gut gelaunt.',
    intro: 'Sommer, Sonne, gute Laune: Hier passen fruchtige, leichte Düfte mit Zitrus und frischen Noten. Sie schmecken nach Urlaub, Strand und Leichtigkeit – ideal für warme Tage.',
    tone: '#e8b65a',
    families: { clean: 25, floral: 20 },
    noteThemes: ['zitrus'],
    season: 'Sommer',
    sillage: 'medium'
  }
];

// Eine einzelne Stimmung anhand ihres Codes finden (für die Detailseiten).
export function getMood(code: string): Mood | undefined {
  return MOODS.find((m) => m.code === code);
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
