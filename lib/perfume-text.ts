import type { Perfume } from './perfumes';
import { computeAccords } from './accords';

// Redaktionelle Texte für Duftseiten – aus den Duftdaten zusammengesetzt.
// Ziel: so klingen wie eine Duft-Redakteurin, nicht wie eine Vorlage.
// Darum: konkrete Noten statt Floskeln, keine Zahlen (die stehen oben schon),
// Schweizer Schreibweise (ss) und je Duft eine eigene, aber stabile Wortwahl.

const MAX_PRICE = 180;

// Stabile „Zufallszahl" je Duft: gleicher Duft = gleicher Text, aber
// verschiedene Düfte bekommen verschiedene Formulierungen.
function seed(p: Perfume): number {
  const key = p.slug || p.perfume_name || '';
  let h = 7;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
  return h;
}

function pick<T>(list: T[], s: number, offset = 0): T {
  return list[(s + offset * 7) % list.length];
}

function joinList(items: string[]): string {
  if (items.length <= 1) return items[0] || '';
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
}

// Mitten im Satz: Adjektive in Notennamen klein ("weisse Rose", "getrocknete Früchte").
function inSentence(note: string): string {
  const [first, ...rest] = note.split(' ');
  if (rest.length && /(e|er|es|en)$/.test(first)) return [first.toLowerCase(), ...rest].join(' ');
  return note;
}

function clean(notes: string[] | null, max = 3): string[] {
  return (notes || []).map((n) => n.trim()).filter(Boolean).slice(0, max).map(inSentence);
}

// ── Bausteine ────────────────────────────────────────────────────────────

const ACCORD_ADJ: Record<string, string> = {
  zitrisch: 'zitrischer',
  frisch: 'frischer',
  fruchtig: 'fruchtiger',
  blumig: 'blumiger',
  pudrig: 'pudriger',
  suess: 'süsser',
  wuerzig: 'würziger',
  holzig: 'holziger',
  warm: 'warmer'
};

const FAMILY_IMAGE: Record<string, string[]> = {
  clean: [
    'Er erinnert an frisch gewaschene Baumwolle und ein offenes Fenster am Morgen.',
    'Er riecht nach klarer Luft und sauberer Haut, ohne aufdringlich zu sein.',
    'Ein Duft, der eher nach Sommerwind als nach Parfümerie riecht.'
  ],
  gourmand: [
    'Er hat etwas Tröstliches, fast wie ein warmes Dessert an einem kalten Abend.',
    'Man denkt an Vanille, warme Haut und lange Abende.',
    'Er riecht weich und einladend, eher Kuschelpullover als Abendkleid.'
  ],
  woody: [
    'Er wirkt ruhig und selbstsicher, ohne laut zu werden.',
    'Er hat diese trockene, edle Tiefe, die man von guten Hölzern kennt.',
    'Ein Duft mit Ruhe und Haltung, der nicht gefallen will, sondern einfach da ist.'
  ],
  floral: [
    'Die Blumen wirken dabei modern und leicht, nicht altmodisch.',
    'Er riecht nach einem frischen Strauss, nicht nach Grossmutters Kommode.',
    'Feminin und weich, aber mit genug Charakter, um nicht beliebig zu sein.'
  ]
};

const GENDER_PHRASE: Record<string, string[]> = {
  Women: ['für Damen', 'für Frauen'],
  Men: ['für Herren', 'für Männer'],
  Unisex: ['für Damen und Herren', 'für Frauen wie Männer']
};

function seasonPhrase(season: string | null): string | null {
  if (!season) return null;
  const s = season.toLowerCase();
  if (s.includes('ganzj')) return 'das ganze Jahr über';
  const hasW = s.includes('winter');
  const hasH = s.includes('herbst');
  const hasS = s.includes('sommer');
  const hasF = s.includes('frühling') || s.includes('fruehling');
  if (hasH && hasW) return 'in der kalten Jahreszeit';
  if (hasF && hasS) return 'in den warmen Monaten';
  if (hasW) return 'an kalten Wintertagen';
  if (hasH) return 'im Herbst';
  if (hasS) return 'an warmen Sommertagen';
  if (hasF) return 'im Frühling';
  return null;
}

const OCCASION_PHRASE: Record<string, string> = {
  alltag: 'im Alltag',
  'büro': 'im Büro',
  buero: 'im Büro',
  date: 'beim Date',
  abend: 'am Abend',
  abendessen: 'beim Abendessen',
  party: 'auf einer Party',
  sport: 'nach dem Sport',
  freizeit: 'in der Freizeit'
};

const OCCASION_PURPOSE: Record<string, string> = {
  alltag: 'für jeden Tag',
  'büro': 'fürs Büro',
  buero: 'fürs Büro',
  date: 'fürs Date',
  abend: 'für den Abend',
  abendessen: 'fürs Abendessen',
  party: 'für Partys',
  sport: 'nach dem Sport',
  freizeit: 'für die Freizeit'
};

function occasionPurposes(occasion: string | null): string[] {
  if (!occasion) return [];
  return occasion
    .split(',')
    .map((o) => OCCASION_PURPOSE[o.trim().toLowerCase()])
    .filter((o): o is string => Boolean(o))
    .filter((o, i, all) => all.indexOf(o) === i)
    .slice(0, 2);
}

function occasionPhrases(occasion: string | null): string[] {
  if (!occasion) return [];
  return occasion
    .split(',')
    .map((o) => OCCASION_PHRASE[o.trim().toLowerCase()])
    .filter((o): o is string => Boolean(o))
    .filter((o, i, all) => all.indexOf(o) === i)
    .slice(0, 2);
}

function performanceSentence(p: Perfume, s: number): string | null {
  const l = p.longevity;
  const si = p.sillage;
  if (l == null && si == null) return null;
  const long = l != null && l >= 8;
  const short = l != null && l <= 4;
  const loud = si != null && si >= 8;
  const soft = si != null && si <= 4;

  if (long && loud) return pick(['Er hält lange und ist auch nach Stunden noch gut wahrnehmbar, sparsam dosieren lohnt sich.', 'Zwei Sprühstösse reichen: Er hält bis in den Abend und wird von anderen bemerkt.'], s);
  if (long && soft) return 'Er bleibt nah an der Haut, hält aber erstaunlich lange.';
  if (long) return pick(['Auf der Haut hält er gut und begleitet dich problemlos durch den Tag.', 'Er hält lange, ohne dabei schwer zu werden.'], s);
  if (short && soft) return 'Er ist eher leise und verfliegt schneller, ein kleiner Flakon in der Tasche hilft.';
  if (short) return 'Er verfliegt etwas schneller, tagsüber nachsprühen lohnt sich.';
  if (loud) return 'Er hat eine deutliche Ausstrahlung, im Büro reicht ein Sprühstoss.';
  if (soft) return 'Er bleibt dezent und eher etwas für dich selbst als für den ganzen Raum.';
  return pick(
    [
      'Haltbarkeit und Ausstrahlung sind ausgewogen, weder zu leise noch zu laut.',
      'Er hält ordentlich und bleibt angenehm präsent, ohne zu dominieren.',
      'Er bleibt einige Stunden schön wahrnehmbar, ohne andere zu überfordern.',
      'Man riecht ihn gut, aber er drängt sich nicht auf.'
    ],
    s,
    6
  );
}

function priceSentence(p: Perfume, s: number): string | null {
  if (p.price_chf == null) return null;
  const price = p.price_chf;
  if (price > MAX_PRICE) {
    return `Mit rund CHF ${price} liegt er über unserer Empfehlungsgrenze von CHF ${MAX_PRICE}. Günstigere Düfte mit ähnlichem Charakter findest du weiter unten.`;
  }
  if (price <= 60) return pick([`Für rund CHF ${price} bekommt man hier erstaunlich viel Duft fürs Geld.`, `Bei rund CHF ${price} ist er ein Duft, den man ohne schlechtes Gewissen täglich tragen kann.`], s);
  if (price <= 110) return `Mit rund CHF ${price} liegt er im mittleren Preisbereich.`;
  return `Mit rund CHF ${price} gehört er zu den edleren Düften in unserer Auswahl.`;
}

// ── Beschreibung ─────────────────────────────────────────────────────────

export function describePerfume(p: Perfume): string {
  const s = seed(p);
  const name = p.perfume_name;
  const brand = p.brands?.name;
  const sentences: string[] = [];

  // 1) Charakter aus den stärksten Akkorden
  const accords = computeAccords(p, 2);
  const adjectives = accords.map((a) => ACCORD_ADJ[a.code]).filter(Boolean);
  const character = adjectives.length === 2 ? `${adjectives[0]}, ${adjectives[1]}` : adjectives[0];
  const gender = p.gender && GENDER_PHRASE[p.gender] ? pick(GENDER_PHRASE[p.gender], s) : null;
  const who = brand ? `${name} von ${brand}` : name;
  if (character) {
    const g = gender ? ` ${gender}` : '';
    sentences.push(
      pick([`${who} ist ein ${character} Duft${g}.`, `Ein ${character} Duft${g}: das ist ${who}.`], s)
    );
  } else {
    sentences.push(`${who} ist ein Duft${gender ? ` ${gender}` : ''}.`);
  }

  // 2) Bild/Stimmung der Familie
  const images = FAMILY_IMAGE[p.fragrance_family || ''];
  if (images) sentences.push(pick(images, s, 1));

  // 3) Verlauf der Noten
  const top = clean(p.top_notes);
  const heart = clean(p.heart_notes);
  const base = clean(p.base_notes);
  if (top.length || heart.length || base.length) {
    const parts: string[] = [];
    if (top.length) parts.push(pick([`Zu Beginn riecht man vor allem ${joinList(top)}`, `Er öffnet mit ${joinList(top)}`], s, 2));
    if (heart.length) {
      const one = heart.length === 1;
      parts.push(
        pick(
          [`danach ${one ? 'tritt' : 'treten'} ${joinList(heart)} in den Vordergrund`, `im Herzen ${one ? 'zeigt' : 'zeigen'} sich ${joinList(heart)}`],
          s,
          3
        )
      );
    }
    if (base.length) {
      const verb = base.length === 1 ? 'bleibt' : 'bleiben';
      parts.push(pick([`auf der Haut ${verb} am Ende ${joinList(base)}`, `zum Schluss ${verb} ${joinList(base)} zurück`], s, 4));
    }
    const first = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    if (parts.length === 1) sentences.push(`${first}.`);
    else if (parts.length === 2) sentences.push(`${first}, ${parts[1]}.`);
    else sentences.push(`${first}, ${parts[1]}, und ${parts[2]}.`);
  }

  // 4) Wann und wo
  const season = seasonPhrase(p.season);
  const occasions = occasionPhrases(p.occasion);
  if (season || occasions.length) {
    const where = occasions.length ? joinList(occasions) : '';
    if (season && where) sentences.push(pick([`Am schönsten trägt er sich ${season}, besonders ${where}.`, `Er passt ${season} und macht sich ${where} besonders gut.`], s, 5));
    else if (season) sentences.push(`Am schönsten trägt er sich ${season}.`);
    else sentences.push(`Er macht sich ${where} besonders gut.`);
  }

  // 5) Haltbarkeit/Ausstrahlung in Worten
  const perf = performanceSentence(p, s);
  if (perf) sentences.push(perf);

  // 6) Preis-Einordnung
  const price = priceSentence(p, s);
  if (price) sentences.push(price);

  return sentences.join(' ');
}

// ── Passt zu dir / Eher nicht ────────────────────────────────────────────

const FITS_FAMILY: Record<string, string> = {
  clean: 'du frische, saubere Düfte magst',
  floral: 'du Blumen magst, die modern statt altmodisch riechen',
  gourmand: 'du warme, süsse Düfte wie Vanille oder Karamell magst',
  woody: 'du ruhige, holzige Düfte mit Tiefe magst'
};

const NOT_FAMILY: Record<string, string> = {
  clean: 'du es lieber süss und schwer magst',
  floral: 'du mit Blumennoten generell wenig anfangen kannst',
  gourmand: 'du etwas Leichtes und Frisches suchst',
  woody: 'du einen verspielten, fruchtigen Duft suchst'
};

export type FitAdvice = { fits: string[]; notFits: string[] };

export function fitAdvice(p: Perfume): FitAdvice {
  const fits: string[] = [];
  const notFits: string[] = [];
  const fam = p.fragrance_family || '';
  const season = (p.season || '').toLowerCase();
  const occasions = occasionPurposes(p.occasion);

  if (FITS_FAMILY[fam]) fits.push(FITS_FAMILY[fam]);
  const seasonText = seasonPhrase(p.season);
  if (occasions.length) fits.push(`du einen Duft ${joinList(occasions)} suchst`);
  else if (seasonText) fits.push(`du einen Duft ${seasonText} suchst`);
  if (p.longevity != null && p.longevity >= 8) fits.push('er den ganzen Tag halten soll');
  else if (p.sillage != null && p.sillage <= 4) fits.push('du es dezent magst');
  else if (p.sillage != null && p.sillage >= 8) fits.push('man dich ruhig bemerken darf');
  if (p.price_chf != null && p.price_chf <= 70 && fits.length < 3) fits.push('du nicht viel ausgeben möchtest');

  if (NOT_FAMILY[fam]) notFits.push(NOT_FAMILY[fam]);
  if (season.includes('sommer') && !season.includes('winter') && !season.includes('ganzj')) {
    notFits.push('du einen Duft für kalte Wintertage suchst');
  } else if ((season.includes('winter') || season.includes('herbst')) && !season.includes('sommer') && !season.includes('ganzj')) {
    notFits.push('du etwas für heisse Sommertage suchst');
  }
  if (p.sillage != null && p.sillage >= 8) notFits.push('du im Büro oder im Zug dezent bleiben willst');
  else if (p.sillage != null && p.sillage <= 4) notFits.push('der Duft den ganzen Raum füllen soll');
  if (p.longevity != null && p.longevity <= 5 && notFits.length < 3) notFits.push('er ohne Nachsprühen den ganzen Tag halten soll');
  if (p.price_chf != null && p.price_chf > MAX_PRICE && notFits.length < 3) notFits.push(`dein Budget unter CHF ${MAX_PRICE} liegt`);

  return { fits: fits.slice(0, 3), notFits: notFits.slice(0, 3) };
}
