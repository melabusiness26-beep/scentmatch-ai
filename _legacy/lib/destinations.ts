import { type Perfume, type QuizAnswers, matchesGender } from './perfumes';

// ---------- Reise-Düfte ("Welcher Duft passt zu deinem Reiseziel?") ----------
// Jedes Reiseziel bekommt einen Duft-Charakter: bevorzugte Duftfamilien, typische
// Noten und – als Herzstück – kuratierte, wahrheitsgemäß geprüfte Top-Treffer aus
// dem eigenen Katalog (per slug). Die Ergebnisliste zeigt diese Picks zuerst und
// füllt danach automatisch mit weiteren, algorithmisch passenden Düften auf.
// Bewusst faktenbasiert: Die Noten unten stammen aus den echten Duftpyramiden.

export type DestinationCategory = 'stadt' | 'berg' | 'meer';

export type Destination = {
  slug: string;
  emoji: string; // Flaggen-/Themen-Emoji für Karte und Titel
  category: DestinationCategory;
  name: string; // "Rom"
  region: string; // "Italien"
  tagline: string; // kurze Zeile auf der Karte
  character: string; // Stimmung in Worten, z. B. "warm, sonnig und lebensfroh"
  intro: string; // längerer, ehrlicher Text im Hero (gut für SEO)
  tone: string; // Akzentfarbe (Hex) fürs atmosphärische Design
  families: Partial<Record<string, number>>; // Duftfamilie -> Gewicht (bis 40)
  noteKeywords: string[]; // typische Noten dieses Ortes (Bonus + Begründung)
  season?: string; // bevorzugte Saison (optional)
  picks: string[]; // kuratierte Top-Treffer (slugs), werden zuerst gezeigt
};

export const CATEGORY_LABELS: Record<DestinationCategory, string> = {
  stadt: 'Städtereisen',
  berg: 'Berge & Natur',
  meer: 'Meer & Strände'
};

export const CATEGORY_INTRO: Record<DestinationCategory, string> = {
  stadt: 'Von der Dolce Vita in Rom bis zum Luxus in Dubai – jede Stadt hat ihren eigenen Duft.',
  berg: 'Klare Bergluft, Nadelwald und Kaminfeuer – Düfte für Gipfel, Wald und Schnee.',
  meer: 'Salz, Sonne und Kokos – Düfte, die nach Strand, Küste und Ferien duften.'
};

export const CATEGORY_ORDER: DestinationCategory[] = ['stadt', 'berg', 'meer'];

export const DESTINATIONS: Destination[] = [
  // ============ Städte ============
  {
    slug: 'rom',
    emoji: '🇮🇹',
    category: 'stadt',
    name: 'Rom',
    region: 'Italien',
    tagline: 'Warme Sonne & Zitrusgärten',
    character: 'warm, sonnig und lebensfroh',
    intro:
      'Rom riecht nach warmer Sonne auf altem Stein, nach Espresso und Zitrusgärten. Diese Düfte fangen die italienische Dolce Vita ein – elegant, sonnig und lebensfroh.',
    tone: '#c98a3f',
    families: { clean: 30, gourmand: 14 },
    noteKeywords: ['Zitrone', 'Bergamotte', 'Neroli', 'Feige', 'Kaffee', 'Orange'],
    picks: ['adp-colonia', 'valentino-uomo', 'lb-roma']
  },
  {
    slug: 'paris',
    emoji: '🇫🇷',
    category: 'stadt',
    name: 'Paris',
    region: 'Frankreich',
    tagline: 'Blumiger Chic & Romantik',
    character: 'elegant, blumig und romantisch',
    intro:
      'Paris ist Eleganz pur: zarte Blüten, ein Hauch Puder und Romantik an jeder Ecke. Diese Düfte tragen den blumigen Chic der Stadt der Liebe.',
    tone: '#e0a6c0',
    families: { floral: 38, gourmand: 8 },
    noteKeywords: ['Rose', 'Jasmin', 'Iris', 'Veilchen', 'Vanille'],
    picks: ['dior-jadore', 'ysl-la-nuit-de-lhomme', 'chanel-n5-leau']
  },
  {
    slug: 'london',
    emoji: '🇬🇧',
    category: 'stadt',
    name: 'London',
    region: 'England',
    tagline: 'Edel, herb & souverän',
    character: 'edel, herb und souverän',
    intro:
      'London ist edel und herb – Regen auf Kopfsteinpflaster, Vetiver und ein Hauch Leder. Diese Düfte wirken souverän und gepflegt wie ein englischer Gentleman.',
    tone: '#6b7a6a',
    families: { woody: 36, clean: 12 },
    noteKeywords: ['Vetiver', 'Salbei', 'Iris', 'Leder', 'Grapefruit'],
    picks: ['tf-grey-vetiver', 'creed-green-irish-tweed']
  },
  {
    slug: 'madrid',
    emoji: '🇪🇸',
    category: 'stadt',
    name: 'Madrid',
    region: 'Spanien',
    tagline: 'Sinnlich & voller Lebenslust',
    character: 'warm, sinnlich und lebensfroh',
    intro:
      'Madrid ist warm, lebendig und sinnlich – Orangenblüten in lauen Nächten. Diese Düfte fangen die spanische Lebenslust und Wärme ein.',
    tone: '#d97b52',
    families: { floral: 30, gourmand: 14 },
    noteKeywords: ['Orangenblüte', 'Jasmin', 'Safran', 'Vanille', 'Amber'],
    picks: ['pr-lady-million-empire', 'carolina-herrera-212-sexy']
  },
  {
    slug: 'new-york',
    emoji: '🇺🇸',
    category: 'stadt',
    name: 'New York',
    region: 'USA',
    tagline: 'Urban, modern & cool',
    character: 'urban, modern und selbstbewusst',
    intro:
      'New York ist urban, modern und rastlos – klare Linien, kühles Holz und ein grüner Apfel. Diese Düfte riechen nach Großstadt und Selbstbewusstsein.',
    tone: '#7f8a99',
    families: { woody: 28, clean: 16 },
    noteKeywords: ['Apfel', 'Zedernholz', 'Iso E', 'Moschus', 'Ambrette'],
    picks: ['dkny-be-delicious', 'le-labo-santal-33', 'le-labo-another-13']
  },
  {
    slug: 'dubai',
    emoji: '🇦🇪',
    category: 'stadt',
    name: 'Dubai',
    region: 'VAE',
    tagline: 'Luxus, Oud & Gold',
    character: 'opulent, warm und luxuriös',
    intro:
      'Dubai ist Luxus in Reinform – Oud, Safran und flüssiges Gold. Diese Düfte sind opulent, warm und unvergesslich.',
    tone: '#c9a24a',
    families: { gourmand: 26, woody: 18 },
    noteKeywords: ['Oud', 'Safran', 'Amber', 'Amberholz', 'Weihrauch'],
    picks: ['mfk-br540-extrait', 'lattafa-asad', 'al-haramain-amber-oud-gold']
  },
  {
    slug: 'istanbul',
    emoji: '🇹🇷',
    category: 'stadt',
    name: 'Istanbul',
    region: 'Türkei',
    tagline: 'Gewürzbasar & Rosen',
    character: 'würzig, orientalisch und elegant',
    intro:
      'Istanbul ist ein Fest für die Sinne – Gewürzbasar, Rosen und Tee am Bosporus. Diese Düfte verbinden Orient und Eleganz.',
    tone: '#a35c6f',
    families: { woody: 26, gourmand: 18 },
    noteKeywords: ['Rose', 'Oud', 'Safran', 'Zimt', 'Leder', 'Tee'],
    picks: ['penhaligons-halfeti', 'masque-russian-tea']
  },
  {
    slug: 'tokio',
    emoji: '🇯🇵',
    category: 'stadt',
    name: 'Tokio',
    region: 'Japan',
    tagline: 'Puristisch & klar',
    character: 'klar, modern und minimalistisch',
    intro:
      'Tokio ist futuristisch und klar – puristische Linien, kühles Holz und ein Hauch Zen. Diese Düfte wirken modern, minimalistisch und rein.',
    tone: '#8aa0b4',
    families: { woody: 28, clean: 16 },
    noteKeywords: ['Iso E', 'Zedernholz', 'Yuzu', 'Holz', 'Moschus'],
    picks: ['em-molecule-01', 'leau-dissey-homme']
  },
  {
    slug: 'marrakesch',
    emoji: '🇲🇦',
    category: 'stadt',
    name: 'Marrakesch',
    region: 'Marokko',
    tagline: 'Exotisch & geheimnisvoll',
    character: 'exotisch, warm und geheimnisvoll',
    intro:
      'Marrakesch riecht nach Gewürzsouk, warmem Leder und Rosenwasser. Diese Düfte sind exotisch, warm und geheimnisvoll.',
    tone: '#b5652f',
    families: { woody: 28, gourmand: 16 },
    noteKeywords: ['Oud', 'Leder', 'Safran', 'Kardamom', 'Rose'],
    picks: ['memo-african-leather', 'lattafa-raghba']
  },
  {
    slug: 'havanna',
    emoji: '🇨🇺',
    category: 'stadt',
    name: 'Havanna',
    region: 'Kuba',
    tagline: 'Rum, Tabak & Musik',
    character: 'warm, verraucht und lebensfroh',
    intro:
      'Havanna ist Rum, Tabak und Musik in lauen Nächten. Diese Düfte sind warm, verraucht und voller Lebensfreude.',
    tone: '#9a6b4a',
    families: { gourmand: 34, woody: 10 },
    noteKeywords: ['Rum', 'Tabak', 'Vanille', 'Zimt', 'Kaffee'],
    picks: ['initio-side-effect', 'replica-jazz-club']
  },

  // ============ Berge & Natur ============
  {
    slug: 'schweizer-alpen',
    emoji: '🏔️',
    category: 'berg',
    name: 'Schweizer Alpen',
    region: 'Schweiz',
    tagline: 'Frische Bergluft',
    character: 'frisch, klar und belebend',
    intro:
      'Die Alpen riechen nach klarer, kühler Bergluft, Tannennadeln und frischem Schnee. Diese Düfte wirken frisch, sauber und belebend.',
    tone: '#7fb6c4',
    families: { clean: 38 },
    noteKeywords: ['Minze', 'Lavendel', 'Wacholder', 'Salbei', 'Bergamotte'],
    picks: ['luna-rossa', 'creed-silver-mountain-water']
  },
  {
    slug: 'norwegen-fjorde',
    emoji: '🇳🇴',
    category: 'berg',
    name: 'Norwegen & Fjorde',
    region: 'Skandinavien',
    tagline: 'Kühl & mineralisch',
    character: 'kühl, tief und mineralisch',
    intro:
      'Die Fjorde sind rau, kühl und mineralisch – Fels, Salzwasser und weites Grau. Diese Düfte sind tief, kühl und geheimnisvoll.',
    tone: '#5f7d8a',
    families: { woody: 28, clean: 14 },
    noteKeywords: ['Mineralnoten', 'Salz', 'Zedernholz', 'Vetiver', 'Amber'],
    picks: ['barrois-ganymede', 'orto-megamare']
  },
  {
    slug: 'skandinavien-wald',
    emoji: '🌲',
    category: 'berg',
    name: 'Skandinavischer Wald',
    region: 'Skandinavien',
    tagline: 'Nadelwald & Lagerfeuer',
    character: 'grün, harzig und frei',
    intro:
      'Skandinavien ist Nadelwald, stiller See und Lagerfeuer-Rauch. Diese Düfte riechen nach Wald, Harz und Freiheit.',
    tone: '#5f7a55',
    families: { woody: 38 },
    noteKeywords: ['Wacholderbeere', 'Kiefernnadel', 'Weihrauch', 'Zedernholz', 'Vetiver'],
    picks: ['byredo-gypsy-water', 'lalique-encre-noire']
  },
  {
    slug: 'dolomiten',
    emoji: '⛰️',
    category: 'berg',
    name: 'Dolomiten',
    region: 'Almwiesen',
    tagline: 'Kräuterwiesen & Sonne',
    character: 'grün, aromatisch und leicht',
    intro:
      'Die Almwiesen der Dolomiten duften nach Sonne, Kräutern und frischem Heu. Diese Düfte sind grün, aromatisch und leicht.',
    tone: '#9bb06a',
    families: { woody: 22, clean: 20 },
    noteKeywords: ['Lavendel', 'Salbei', 'Basilikum', 'Geranie', 'Vetiver'],
    picks: ['azzaro-pour-homme']
  },
  {
    slug: 'winterchalet',
    emoji: '🎿',
    category: 'berg',
    name: 'Winterchalet',
    region: 'Après-Ski',
    tagline: 'Kaminfeuer & Vanille',
    character: 'gemütlich, süß und behaglich',
    intro:
      'Ein Chalet nach dem Skitag: Kaminfeuer, Kastanien und warme Vanille. Diese Düfte sind gemütlich, süß und behaglich.',
    tone: '#b07a52',
    families: { gourmand: 34, woody: 10 },
    noteKeywords: ['Kastanie', 'Vanille', 'Gewürznelke', 'Zimt', 'Tonkabohne'],
    season: 'Herbst/Winter',
    picks: ['replica-fireplace', 'lattafa-khamrah']
  },

  // ============ Meer & Strände ============
  {
    slug: 'karibik',
    emoji: '🌴',
    category: 'meer',
    name: 'Karibik',
    region: 'Traumstrand',
    tagline: 'Kokos & Sonnencreme',
    character: 'tropisch, süß und sommerlich',
    intro:
      'Die Karibik riecht nach Kokos, Sonnencreme und warmem Sand. Diese Düfte sind tropisch, süß und sommerlich.',
    tone: '#3fb8c4',
    families: { floral: 22, gourmand: 20 },
    noteKeywords: ['Kokosnuss', 'Vanille', 'Amber', 'Monoi', 'Tiaré'],
    season: 'Sommer',
    picks: ['bronze-goddess', 'replica-beach-walk']
  },
  {
    slug: 'spanien-kueste',
    emoji: '🏖️',
    category: 'meer',
    name: 'Spanische Küste',
    region: 'Costa / Mittelmeer',
    tagline: 'Zitrus & Meeresbrise',
    character: 'frisch, spritzig und leicht',
    intro:
      'Die spanische Küste ist Zitrus, Meeresbrise und Sonne auf der Haut. Diese Düfte sind frisch, spritzig und leicht.',
    tone: '#e8b65a',
    families: { clean: 38 },
    noteKeywords: ['Zitrone', 'Bergamotte', 'Meeresnoten', 'Rosmarin', 'Grapefruit'],
    season: 'Sommer',
    picks: ['light-blue-homme', 'armani-acqua-di-gio-homme', 'chance-eau-fraiche']
  },
  {
    slug: 'griechenland',
    emoji: '🇬🇷',
    category: 'meer',
    name: 'Griechenland',
    region: 'Ägäis',
    tagline: 'Meersalz & Kräuter',
    character: 'frisch, mineralisch und mediterran',
    intro:
      'Die Ägäis riecht nach Meersalz, wilden Kräutern und sonnengewärmtem Treibholz. Diese Düfte sind frisch, mineralisch und mediterran.',
    tone: '#5aa6c4',
    families: { woody: 22, clean: 20 },
    noteKeywords: ['Meeresalge', 'Meeresalz', 'Salz', 'Wacholder', 'Feige', 'Treibholz'],
    season: 'Sommer',
    picks: ['tf-costa-azzurra', 'jo-malone-wood-sage-sea-salt']
  },
  {
    slug: 'malediven',
    emoji: '🏝️',
    category: 'meer',
    name: 'Malediven',
    region: 'Trauminsel',
    tagline: 'Reines Wasser & Sand',
    character: 'sauber, luftig und luxuriös',
    intro:
      'Die Malediven sind reines, türkisfarbenes Wasser und weißer Sand. Diese Düfte sind sauber, luftig und luxuriös.',
    tone: '#4fc4c0',
    families: { clean: 38 },
    noteKeywords: ['Salz', 'Meeresalge', 'Moschus', 'Neroli', 'Mineralnoten'],
    season: 'Sommer',
    picks: ['orto-megamare', 'tf-neroli-portofino', 'creed-millesime-imperial']
  },
  {
    slug: 'amalfi-capri',
    emoji: '🍋',
    category: 'meer',
    name: 'Amalfi & Capri',
    region: 'Italien',
    tagline: 'Zitronenhaine am Meer',
    character: 'spritzig, frisch und italienisch-leicht',
    intro:
      'Die Amalfiküste duftet nach Zitronenhainen und Meer unter der Sonne. Diese Düfte sind spritzig, frisch und italienisch-leicht.',
    tone: '#e8c65a',
    families: { clean: 38 },
    noteKeywords: ['Zitrone', 'Mandarine', 'Basilikum', 'Neroli', 'Bergamotte'],
    season: 'Sommer',
    picks: ['guerlain-aqua-mandarine-basilic', 'dg-light-blue-intense']
  },
  {
    slug: 'tahiti-suedsee',
    emoji: '🌊',
    category: 'meer',
    name: 'Tahiti & Südsee',
    region: 'Polynesien',
    tagline: 'Monoi & Tiaré-Blüten',
    character: 'cremig, blumig und sonnig',
    intro:
      'Die Südsee riecht nach Monoi, Tiaré-Blüten und Kokosöl. Diese Düfte sind cremig, blumig und sonnenverwöhnt.',
    tone: '#e0a86a',
    families: { gourmand: 24, floral: 18 },
    noteKeywords: ['Kokosnuss', 'Tiaré', 'Ylang', 'Monoi', 'Tuberose'],
    season: 'Sommer',
    picks: ['tf-soleil-blanc', 'nuxe-prodigieux', 'mugler-aura']
  },
  {
    slug: 'brasilien-rio',
    emoji: '🇧🇷',
    category: 'meer',
    name: 'Brasilien & Rio',
    region: 'Copacabana',
    tagline: 'Salzkaramell am Strand',
    character: 'süß, sonnig und einladend',
    intro:
      'Rio ist warme Haut am Strand, Salzkaramell und pure Lebensfreude. Diese Düfte sind süß, sonnig und einladend.',
    tone: '#d98f6a',
    families: { gourmand: 34 },
    noteKeywords: ['Salzkaramell', 'Pistazie', 'Vanille', 'Kokosnuss', 'Amber'],
    season: 'Sommer',
    picks: ['sdj-cheirosa-62']
  },
  {
    slug: 'thailand',
    emoji: '🇹🇭',
    category: 'meer',
    name: 'Thailand',
    region: 'Tropen',
    tagline: 'Mango & tropische Blüten',
    character: 'fruchtig, exotisch und warm',
    intro:
      'Thailand riecht nach saftigen Mangos, tropischen Blüten und Nachtmarkt. Diese Düfte sind fruchtig, exotisch und warm.',
    tone: '#e08a4a',
    families: { gourmand: 26, floral: 14 },
    noteKeywords: ['Mango', 'Osmanthus', 'Litschi', 'Tropische Früchte', 'Cassis'],
    season: 'Sommer',
    picks: ['vilhelm-mango-skin', 'lattafa-yara-moi']
  },
  {
    slug: 'bali',
    emoji: '🇮🇩',
    category: 'meer',
    name: 'Bali',
    region: 'Indonesien',
    tagline: 'Frangipani & Paradies',
    character: 'blumig, exotisch und paradiesisch',
    intro:
      'Bali ist ein tropischer Garten – Frangipani, Ylang-Ylang und reife Früchte. Diese Düfte sind blumig, exotisch und paradiesisch.',
    tone: '#d98fb0',
    families: { floral: 32, gourmand: 12 },
    noteKeywords: ['Frangipani', 'Ylang', 'Mango', 'Tuberose', 'Orchidee'],
    season: 'Sommer',
    picks: ['dolce-shine', 'prada-la-femme']
  }
];

// Ein Reiseziel anhand seines slug finden (für die Detailseiten).
export function getDestination(slug: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.slug === slug);
}

// Reiseziele nach Kategorie gruppiert – in fester Reihenfolge (für die Übersicht).
export function destinationsByCategory(): { category: DestinationCategory; items: Destination[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: DESTINATIONS.filter((d) => d.category === category)
  }));
}

function notesOf(p: Perfume): string[] {
  return [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].map((n) => n.toLowerCase());
}

// Welche der typischen Orts-Noten kommen im Duft vor? (für Bewertung & Begründung)
function noteHits(p: Perfume, dest: Destination): string[] {
  const notes = notesOf(p);
  return dest.noteKeywords.filter((kw) => notes.some((n) => n.includes(kw.toLowerCase())));
}

// Bewertet, wie gut ein Duft zu einem Reiseziel passt (höher = besser).
export function destinationScore(p: Perfume, dest: Destination): number {
  let s = 0;
  // Duftfamilie (bis 40)
  s += dest.families[p.fragrance_family || ''] || 0;
  // Typische Noten des Ortes (bis 30)
  s += Math.min(30, noteHits(p, dest).length * 12);
  // Saison (bis 8)
  if (dest.season && p.season === dest.season) s += 8;
  else if (p.season === 'Ganzjährig') s += 4;
  // Leichter Qualitäts-Tiebreaker über den Auressa-Score (bis 5)
  s += ((p.scentmatch_score ?? 80) / 100) * 5;
  return s;
}

const FAMILY_WORD: Record<string, string> = {
  clean: 'Frische, klare Noten',
  gourmand: 'Warme, süße Noten',
  woody: 'Holzige, tiefe Noten',
  floral: 'Blumige, zarte Noten'
};

// Kurze, ehrliche Begründung, warum ein Duft zum Reiseziel passt.
// Nutzt nur echte Daten (getroffene Noten oder Duftfamilie).
export function destinationReason(p: Perfume, dest: Destination): string {
  const hits = noteHits(p, dest);
  if (hits.length) return `${hits.slice(0, 3).join(', ')} – passt zu ${dest.name}.`;
  const fam = FAMILY_WORD[p.fragrance_family || ''];
  if (fam) return `${fam} – passt zur Stimmung von ${dest.name}.`;
  return `Passt zur Stimmung von ${dest.name}.`;
}

// Liefert die am besten zum Reiseziel passenden Düfte. Die kuratierten Picks
// stehen zuerst, danach die algorithmisch besten weiteren Treffer.
// Optional nach Geschlecht gefiltert (wie beim Stimmungs-Ranking).
export function rankByDestination(
  perfumes: Perfume[],
  dest: Destination,
  gender: QuizAnswers['gender'] = '',
  limit = 30
): Perfume[] {
  const bySlug = new Map(perfumes.map((p) => [p.slug || '', p]));
  const picks = dest.picks
    .map((slug) => bySlug.get(slug))
    .filter((p): p is Perfume => Boolean(p));
  const pickIds = new Set(picks.map((p) => p.id));

  const rest = perfumes
    .filter((p) => !pickIds.has(p.id))
    .map((p) => ({ p, s: destinationScore(p, dest) }))
    .sort((a, b) => (b.s !== a.s ? b.s - a.s : (b.p.scentmatch_score || 0) - (a.p.scentmatch_score || 0)))
    .map((x) => x.p);

  return [...picks, ...rest].filter((p) => matchesGender(p, gender)).slice(0, limit);
}
