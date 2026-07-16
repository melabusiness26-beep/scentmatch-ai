import { matchesGender, perfumeHasTheme, type Perfume, type QuizAnswers } from './perfumes';

// ---------- Dufttyp-Persönlichkeitstest ----------
// 7 unterhaltsame Fragen ohne Parfüm-Fachwissen – am Ende steht ein "Dufttyp"
// (z. B. "Die Naschkatze"), der zu Duftfamilien und Noten übersetzt wird.
// Jeder Dufttyp hat eine eigene, teilbare Seite (/dufttyp/[slug]) – ideal für
// Social Media ("Welcher Dufttyp bist du?") und als SEO-Landingpage.

export type ScentType = {
  code: string; // slug der Ergebnis-Seite, z. B. "naschkatze"
  icon: string; // Linien-Icon-Name (siehe app/MoodIcon.tsx)
  emoji: string; // nur für Teilen-Texte (WhatsApp & Co.)
  title: string; // z. B. "Die Naschkatze"
  tagline: string; // eine Zeile unter dem Titel
  intro: string; // längerer, ehrlicher Text auf der Ergebnis-Seite (auch SEO)
  traits: string[]; // 4 kurze Eigenschafts-Chips
  scentText: string; // "So duftet dein Typ" – welche Noten/Familien passen
  tone: string; // Akzentfarbe (Hex) für das Karten-Design
  families: Partial<Record<string, number>>; // Duftfamilie -> Gewicht (bis 40)
  noteThemes: string[]; // passende NOTE_THEMES-Codes
  sillage: 'low' | 'medium' | 'high'; // typische Wunsch-Intensität
  occasions?: string[]; // passende Anlässe (optional)
  season?: string; // bevorzugte Saison (optional)
};

export const SCENT_TYPES: ScentType[] = [
  {
    code: 'sonnenschein',
    icon: 'sun',
    emoji: '☀️',
    title: 'Der Sonnenschein',
    tagline: 'Frisch, spritzig und gut gelaunt – du bringst Licht in jeden Raum.',
    intro:
      'Du bist unkompliziert, offen und ansteckend gut gelaunt – Menschen fühlen sich in deiner Nähe sofort wohl. Genau so soll auch dein Duft sein: frisch, spritzig und leicht, wie ein sonniger Morgen am Meer. Schwere, süße Düfte sind nichts für dich – du willst Leichtigkeit, die den ganzen Tag mitkommt.',
    traits: ['Gut gelaunt', 'Unkompliziert', 'Spontan', 'Voller Energie'],
    scentText:
      'Zu dir passen frische, zitrische Düfte: Bergamotte, Zitrone, Grapefruit und saubere, klare Noten. Leicht genug für jeden Tag – und trotzdem unverwechselbar.',
    tone: '#e8b65a',
    families: { clean: 40, floral: 10 },
    noteThemes: ['zitrus'],
    sillage: 'medium'
  },
  {
    code: 'romantische-seele',
    icon: 'heart',
    emoji: '🌸',
    title: 'Die romantische Seele',
    tagline: 'Verträumt, warmherzig und voller Gefühl – du liebst die schönen Momente.',
    intro:
      'Du hast ein Auge für die kleinen, schönen Dinge: frische Blumen, handgeschriebene Karten, goldenes Abendlicht. Dein Duft darf genauso sein – zart, blumig und voller Gefühl. Er soll nicht laut sein, sondern berühren: wie ein Strauß Pfingstrosen, den dir jemand einfach so mitbringt.',
    traits: ['Warmherzig', 'Verträumt', 'Aufmerksam', 'Feinfühlig'],
    scentText:
      'Zu dir passen blumige Düfte: Rose, Jasmin, Pfingstrose und zarte Veilchen-Noten. Weich, romantisch und wie gemacht für Frühlingstage und besondere Momente.',
    tone: '#e0a6c0',
    families: { floral: 40, gourmand: 5 },
    noteThemes: ['blumig'],
    sillage: 'medium'
  },
  {
    code: 'naschkatze',
    icon: 'mug',
    emoji: '🍦',
    title: 'Die Naschkatze',
    tagline: 'Gemütlich, herzlich und süß – bei dir fühlt sich jeder zu Hause.',
    intro:
      'Kuscheldecke, frisch gebackene Cookies, Serienabend – das ist deine Welt. Du bist herzlich, loyal und ein Genussmensch durch und durch. Dein Duft darf sich anfühlen wie eine Umarmung: warm, süß und gemütlich. Vanille und Karamell sind für dich kein Klischee, sondern ein Lebensgefühl.',
    traits: ['Herzlich', 'Loyal', 'Genussmensch', 'Gemütlich'],
    scentText:
      'Zu dir passen Gourmand-Düfte: Vanille, Karamell, Tonkabohne und ein Hauch Schokolade. Süß und warm – aber edel dosiert, damit es nie zu viel wird.',
    tone: '#d8a48f',
    families: { gourmand: 40 },
    noteThemes: ['vanille'],
    sillage: 'medium'
  },
  {
    code: 'stiller-luxus',
    icon: 'moon',
    emoji: '🤎',
    title: 'Der stille Luxus',
    tagline: 'Ruhig, stilvoll und souverän – Qualität statt Lautstärke.',
    intro:
      '„Weniger, aber besser" – das ist dein Motto. Du musst nicht auffallen, um Eindruck zu hinterlassen: Dein Stil ist zeitlos, deine Ausstrahlung ruhig und souverän. Dein Duft ist wie ein Cashmere-Mantel – dezent, hochwertig und unaufgeregt elegant. Wer dir nahekommt, merkt sofort: Das ist Klasse.',
    traits: ['Stilvoll', 'Ruhig', 'Souverän', 'Zeitlos'],
    scentText:
      'Zu dir passen holzige, saubere Düfte: Sandelholz, Zedernholz, Iris und weicher Moschus. Dezent im Auftritt, edel im Charakter – Düfte, die nah an der Haut bleiben.',
    tone: '#9aa8a0',
    families: { woody: 30, clean: 15 },
    noteThemes: ['holz', 'moschus'],
    sillage: 'low',
    occasions: ['Büro', 'Alltag']
  },
  {
    code: 'magnetische-aura',
    icon: 'sparkle',
    emoji: '✨',
    title: 'Die magnetische Aura',
    tagline: 'Selbstbewusst, intensiv und unvergesslich – du bleibst in Erinnerung.',
    intro:
      'Wenn du einen Raum betrittst, merkt man das. Du liebst besondere Abende, tiefe Gespräche und einen Auftritt mit Wirkung. Dein Duft soll genau das können: warm, würzig und geheimnisvoll – einer, nach dem sich Menschen umdrehen und später fragen: „Was hast du da getragen?"',
    traits: ['Selbstbewusst', 'Geheimnisvoll', 'Leidenschaftlich', 'Mutig'],
    scentText:
      'Zu dir passen warme, orientalische Düfte: Oud, Amber, Safran, Gewürze und dunkle Süße. Intensiv und langanhaltend – gemacht für Abende, die in Erinnerung bleiben.',
    tone: '#9b6a8f',
    families: { woody: 20, gourmand: 20 },
    noteThemes: ['orient'],
    sillage: 'high',
    occasions: ['Abend', 'Date']
  },
  {
    code: 'freier-geist',
    icon: 'leaf',
    emoji: '🌿',
    title: 'Der freie Geist',
    tagline: 'Naturverbunden, unabhängig und echt – du gehst deinen eigenen Weg.',
    intro:
      'Du brauchst Luft, Weite und Echtheit – Trends interessieren dich weniger als das, was sich richtig anfühlt. Barfuß im Gras, Wind in den Haaren, Kopf frei. Dein Duft soll genauso sein: natürlich, klar und unaufdringlich – wie ein Spaziergang durch den Wald nach dem Regen.',
    traits: ['Unabhängig', 'Naturverbunden', 'Echt', 'Entspannt'],
    scentText:
      'Zu dir passen grüne, holzig-frische Düfte: Vetiver, Zedernholz, Bergamotte und klare, saubere Noten. Unisex tragbar und angenehm unaufgeregt.',
    tone: '#8aa87a',
    families: { clean: 25, woody: 20 },
    noteThemes: ['zitrus', 'holz'],
    sillage: 'medium'
  }
];

export function getScentType(code: string): ScentType | undefined {
  return SCENT_TYPES.find((t) => t.code === code);
}

// ---------- Fragen ----------
// Jede Antwort verteilt Punkte auf einen oder zwei Dufttypen (2 = stark, 1 = leicht).

export type TypQuestion = {
  q: string;
  answers: { label: string; points: Partial<Record<string, number>> }[];
};

export const TYP_QUESTIONS: TypQuestion[] = [
  {
    q: 'Wie sieht dein perfekter Samstag aus?',
    answers: [
      { label: 'Frühstück draußen in der Sonne, danach ab an den See', points: { sonnenschein: 2, 'freier-geist': 1 } },
      { label: 'Blumenmarkt, ein hübsches Café und ein gutes Buch', points: { 'romantische-seele': 2 } },
      { label: 'Backen, Kuscheldecke und Serienmarathon', points: { naschkatze: 2 } },
      { label: 'Ausstellung, schönes Essen – und früh gemütlich zu Hause', points: { 'stiller-luxus': 2 } }
    ]
  },
  {
    q: 'Welches Getränk wärst du?',
    answers: [
      { label: 'Eiskalte Zitronenlimonade', points: { sonnenschein: 2 } },
      { label: 'Heiße Schokolade mit Rahm', points: { naschkatze: 2 } },
      { label: 'Ein Glas Rotwein bei Kerzenlicht', points: { 'magnetische-aura': 2, 'romantische-seele': 1 } },
      { label: 'Frisch aufgebrühter grüner Tee', points: { 'freier-geist': 2, 'stiller-luxus': 1 } }
    ]
  },
  {
    q: 'Dein Lieblingsstück im Kleiderschrank?',
    answers: [
      { label: 'Das luftige weiße Leinenhemd', points: { 'freier-geist': 2, sonnenschein: 1 } },
      { label: 'Der kuschelige Strickpullover', points: { naschkatze: 2 } },
      { label: 'Das kleine Schwarze bzw. der scharfe Blazer', points: { 'magnetische-aura': 2 } },
      { label: 'Der Cashmere-Mantel in Beige', points: { 'stiller-luxus': 2 } }
    ]
  },
  {
    q: 'Wohin geht deine Traumreise?',
    answers: [
      { label: 'Amalfiküste – Sonne, Meer und Zitronen', points: { sonnenschein: 2 } },
      { label: 'Paris – Spaziergänge und kleine Cafés', points: { 'romantische-seele': 2 } },
      { label: 'Marrakesch – Gewürze, Farben, 1001 Nacht', points: { 'magnetische-aura': 2 } },
      { label: 'Eine Berghütte, weit weg von allem', points: { 'freier-geist': 2, 'stiller-luxus': 1 } }
    ]
  },
  {
    q: 'Wie beschreiben dich deine Freunde am ehesten?',
    answers: [
      { label: 'Sonnig und unkompliziert', points: { sonnenschein: 2 } },
      { label: 'Warmherzig und verträumt', points: { 'romantische-seele': 2, naschkatze: 1 } },
      { label: 'Selbstbewusst und ein bisschen geheimnisvoll', points: { 'magnetische-aura': 2 } },
      { label: 'Ruhig und stilvoll', points: { 'stiller-luxus': 2 } }
    ]
  },
  {
    q: 'Der perfekte Abend endet …',
    answers: [
      { label: '… barfuß draußen, solange es irgendwie geht', points: { 'freier-geist': 2, sonnenschein: 1 } },
      { label: '… mit Kerzen und einem heißen Bad', points: { 'romantische-seele': 2 } },
      { label: '… auf einer Rooftop-Bar über der Stadt', points: { 'magnetische-aura': 2 } },
      { label: '… mit Dessert auf dem Sofa', points: { naschkatze: 2 } }
    ]
  },
  {
    q: 'Welcher Satz klingt am meisten nach dir?',
    answers: [
      { label: '„Das Leben ist zu kurz für Langeweile."', points: { 'magnetische-aura': 2 } },
      { label: '„Weniger, aber dafür besser."', points: { 'stiller-luxus': 2 } },
      { label: '„Hauptsache gemütlich."', points: { naschkatze: 2, 'romantische-seele': 1 } },
      { label: '„Ich brauche Luft und Freiheit."', points: { 'freier-geist': 2, sonnenschein: 1 } }
    ]
  }
];

// Wertet die gesammelten Punkte aus und liefert den Gewinner-Typ.
// Bei Gleichstand entscheidet die Reihenfolge in SCENT_TYPES (deterministisch).
export function evaluateTyp(pointsList: Partial<Record<string, number>>[]): ScentType {
  const totals: Record<string, number> = {};
  for (const points of pointsList) {
    for (const [code, value] of Object.entries(points)) {
      totals[code] = (totals[code] || 0) + (value || 0);
    }
  }
  let winner = SCENT_TYPES[0];
  let best = -1;
  for (const t of SCENT_TYPES) {
    const score = totals[t.code] || 0;
    if (score > best) {
      best = score;
      winner = t;
    }
  }
  return winner;
}

// ---------- Duft-Empfehlungen je Dufttyp ----------
// Gleiche bewährte Logik wie beim Stimmungs-Finder: Familie + Noten +
// (optional) Anlass/Saison/Intensität + Auressa-Score als Tiebreaker.

export function typScore(p: Perfume, t: ScentType): number {
  let s = 0;
  // Duftfamilie (bis 40)
  s += t.families[p.fragrance_family || ''] || 0;
  // Passende Noten (bis 25)
  if (t.noteThemes.some((code) => perfumeHasTheme(p, code))) s += 25;
  // Saison (bis 10)
  if (t.season && p.season && (p.season === t.season || p.season === 'Ganzjährig')) s += 10;
  // Anlass (bis 10)
  if (t.occasions && p.occasion && t.occasions.includes(p.occasion)) s += 10;
  // Intensität (bis 10)
  const target = t.sillage === 'low' ? 4 : t.sillage === 'high' ? 9 : 6;
  const sill = p.sillage ?? 6;
  s += 10 * (1 - Math.abs(sill - target) / 9);
  // Leichter Qualitäts-Tiebreaker über den Auressa-Score (bis 5)
  s += ((p.scentmatch_score ?? 80) / 100) * 5;
  return s;
}

export function rankByTyp(
  perfumes: Perfume[],
  t: ScentType,
  gender: QuizAnswers['gender'] = '',
  limit = 12
): Perfume[] {
  return perfumes
    .filter((p) => matchesGender(p, gender))
    .map((p) => ({ p, s: typScore(p, t) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
}

// Kurze, ehrliche Begründung, warum ein Duft zum Dufttyp passt.
const TYP_FAMILY_WORDS: Record<string, string> = {
  clean: 'Frische, klare Noten',
  gourmand: 'Warme, süße Noten',
  woody: 'Holzige, tiefe Noten',
  floral: 'Blumige, zarte Noten'
};
const TYP_THEME_WORDS: Record<string, string> = {
  vanille: 'Süße Vanille-Noten',
  zitrus: 'Spritzige Zitrus-Noten',
  holz: 'Edle Holznoten',
  blumig: 'Zarte Blütennoten',
  orient: 'Warme, würzige Noten',
  moschus: 'Weiche, saubere Noten'
};

export function typReason(p: Perfume, t: ScentType): string {
  const theme = t.noteThemes.find((code) => perfumeHasTheme(p, code));
  if (theme && TYP_THEME_WORDS[theme]) return `${TYP_THEME_WORDS[theme]} – wie gemacht für deinen Typ.`;
  const fam = p.fragrance_family || '';
  if (TYP_FAMILY_WORDS[fam]) return `${TYP_FAMILY_WORDS[fam]} – wie gemacht für deinen Typ.`;
  return 'Passt zu deinem Dufttyp.';
}
