import type { Perfume } from './perfumes';
import { computeAccords, notesForAccord, type AccordCode } from './accords';

// Redaktionelle Texte für Duftseiten – aus den Duftdaten zusammengesetzt.
// Ziel: so klingen wie eine Duft-Redakteurin, nicht wie eine Vorlage.
// Darum: konkrete Noten statt Floskeln, keine Zahlen (die stehen oben schon),
// Schweizer Schreibweise (ss) und je Duft eine eigene, aber stabile Wortwahl.

const MAX_PRICE = 180;
// Platzhalter für einen Absatzwechsel im Duft-Text.
const PARAGRAPH = '\u0000';

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

// Stimmungsbilder: passend zum stärksten Duftcharakter innerhalb der Familie,
// damit z. B. ein zitrischer Sommerduft nicht wie „frische Wäsche" beschrieben wird.
const MOOD: Record<string, string[]> = {
  citrus: [
    'Er riecht nach Zitrusschale und Sommerluft, ein bisschen wie Ferien am Meer.',
    'Hell und spritzig, wie frisch aufgeschnittene Zitrusfrüchte an einem warmen Tag.'
  ],
  summer: [
    'Er riecht nach Sonne auf der Haut und einem leichten Wind im Sommer.',
    'Leicht und hell, genau das Richtige, wenn es draussen warm ist.'
  ],
  cotton: [
    'Er erinnert an frisch gewaschene Baumwolle und ein offenes Fenster am Morgen.',
    'Er riecht nach klarer Luft und sauberer Haut, ohne aufdringlich zu sein.'
  ],
  spicedSweet: [
    'Die Süsse wird von warmen Gewürzen getragen, ein bisschen wie Weihnachtsgebäck und Kaminfeuer.',
    'Süss, aber nicht zuckrig: Die Gewürze geben ihm Wärme und Tiefe.'
  ],
  dessert: [
    'Er hat etwas Tröstliches, fast wie ein warmes Dessert an einem kalten Abend.',
    'Man denkt an Vanille, warme Haut und lange Abende.'
  ],
  warmWood: [
    'Warm und umhüllend, wie ein Kaschmirschal an einem kühlen Abend.',
    'Die Hölzer wirken hier weich und warm statt trocken.'
  ],
  dryWood: [
    'Er wirkt ruhig und selbstsicher, ohne laut zu werden.',
    'Er hat diese trockene, edle Tiefe, die man von guten Hölzern kennt.'
  ],
  fruityFloral: [
    'Die Blüten werden von saftigen Früchten begleitet, das macht ihn fröhlich und leicht.',
    'Blumig mit einem fruchtigen Lächeln, verspielt, aber nicht kindlich.'
  ],
  powderyFloral: [
    'Die Blumen wirken weich und pudrig, wie ein Hauch von Puder auf warmer Haut.',
    'Elegant und sanft, mit einem pudrigen Schleier über den Blüten.'
  ],
  floral: [
    'Die Blumen wirken dabei modern und leicht, nicht altmodisch.',
    'Er riecht nach einem frischen Strauss, nicht nach Grossmutters Kommode.'
  ]
};

function moodKey(p: Perfume): string | null {
  // Gleiche Grundlage wie der erste Satz („ein frischer, blumiger Duft"),
  // damit sich Charakter und Stimmungsbild nie widersprechen.
  const all = computeAccords(p, 9);
  const top2 = all.slice(0, 2).map((a) => a.code as string);
  const has = (code: string) => top2.includes(code);
  const citrus = has('zitrisch') || (all.find((a) => a.code === 'zitrisch')?.value || 0) >= 50;
  const summer = /sommer/i.test(p.season || '');
  switch (p.fragrance_family) {
    case 'clean':
      if (citrus) return 'citrus';
      return summer ? 'summer' : 'cotton';
    case 'gourmand':
      return has('wuerzig') ? 'spicedSweet' : 'dessert';
    case 'woody':
      return has('warm') || has('suess') ? 'warmWood' : 'dryWood';
    case 'floral':
      if (has('fruchtig')) return 'fruityFloral';
      if (has('pudrig')) return 'powderyFloral';
      return 'floral';
    default:
      return null;
  }
}

// Kurze Zeile unter dem Duftnamen – gleiche Grundlage wie das Stimmungsbild.
const TAGLINE: Record<string, string> = {
  citrus: 'Spritzig, hell und sommerlich.',
  summer: 'Leicht, hell und sommerlich.',
  cotton: 'Klar, frisch und unkompliziert.',
  spicedSweet: 'Warm, süss und würzig.',
  dessert: 'Warm, süss und gemütlich.',
  warmWood: 'Weich, warm und holzig.',
  dryWood: 'Ruhig, edel und holzig.',
  fruityFloral: 'Blumig, fruchtig und fröhlich.',
  powderyFloral: 'Blumig, pudrig und elegant.',
  floral: 'Blumig, elegant und zeitlos.'
};

export function perfumeTagline(p: Perfume): string | null {
  const key = moodKey(p);
  return key ? TAGLINE[key] : null;
}

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
  if (price <= 60) {
    // „Viel Duft fürs Geld" nur, wenn er auch lange hält – sonst wäre es übertrieben.
    if ((p.longevity ?? 0) >= 7) {
      return pick([`Für rund CHF ${price} bekommt man hier erstaunlich viel Duft fürs Geld.`, `Bei rund CHF ${price} und dieser Haltbarkeit stimmt das Preis-Leistungs-Verhältnis.`], s);
    }
    return `Bei rund CHF ${price} ist er ein Duft, den man ohne schlechtes Gewissen täglich tragen kann.`;
  }
  if (price <= 110) return `Mit rund CHF ${price} liegt er im mittleren Preisbereich.`;
  return `Mit rund CHF ${price} gehört er zu den edleren Düften in unserer Auswahl.`;
}

// Hintergrund aus den freiwilligen Feldern Jahr, Parfümeur und Inspiration.
// „komponiert von" statt „Parfümeur/in", damit nichts über die Person angenommen wird.
function backgroundSentences(p: Perfume, who: string): string[] {
  const year = p.release_year && p.release_year > 1800 ? p.release_year : null;
  const perfumer = p.perfumer?.trim() || null;
  const inspiration = p.inspiration?.trim().replace(/[.!]+$/, '') || null;
  if (!year && !perfumer && !inspiration) return [];
  // „inspiriert von …" passt direkt in den Satz, alles andere bekommt einen eigenen.
  const inline = inspiration && /^inspiriert\b/i.test(inspiration) ? inspiration.charAt(0).toLowerCase() + inspiration.slice(1) : null;
  const facts: string[] = [];
  if (year) facts.push(`kam ${year} auf den Markt`);
  if (perfumer) facts.push(`wurde von ${perfumer} komponiert`);
  const out: string[] = [];
  if (facts.length) {
    out.push(`${who} ${facts.join(' und ')}${inline ? `, ${inline}` : ''}.`);
  } else if (inline) {
    out.push(`${who} ist ${inline}.`);
  }
  if (inspiration && !inline) {
    out.push(`Die Idee dahinter: ${inspiration.charAt(0).toUpperCase() + inspiration.slice(1)}.`);
  }
  return out;
}

// ── Beschreibung ─────────────────────────────────────────────────────────

export type DescribeOptions = {
  /** Andere Versionen desselben Duftes, z. B. { name: 'Light Blue', labels: ['Eau de Parfum', 'Eau Intense'] }. */
  versions?: { name: string; labels: string[] };
};

export function describePerfume(p: Perfume, opts: DescribeOptions = {}): string {
  const s = seed(p);
  const name = p.perfume_name;
  const brand = p.brands?.name;
  const sentences: string[] = [];

  // 1) Hintergrund (falls eingetragen) und Charakter aus den stärksten Akkorden
  const accords = computeAccords(p, 2);
  const adjectives = accords.map((a) => ACCORD_ADJ[a.code]).filter(Boolean);
  const character = adjectives.length === 2 ? `${adjectives[0]}, ${adjectives[1]}` : adjectives[0];
  const gender = p.gender && GENDER_PHRASE[p.gender] ? pick(GENDER_PHRASE[p.gender], s) : null;
  const g = gender ? ` ${gender}` : '';
  const who = brand ? `${name} von ${brand}` : name;
  const intro = backgroundSentences(p, who);
  if (intro.length) {
    sentences.push(...intro);
    if (character) {
      sentences.push(pick([`Herausgekommen ist ein ${character} Duft${g}.`, `Das Ergebnis ist ein ${character} Duft${g}.`], s));
    }
  } else if (character) {
    sentences.push(
      pick(
        [`${who} ist ein ${character} Duft${g}.`, `Ein ${character} Duft${g}: das ist ${who}.`, `Mit ${who} bekommt man einen ${character.replace(/r$/, 'n').replace(/r, /, 'n, ')} Duft${g}.`],
        s
      )
    );
  } else {
    sentences.push(`${who} ist ein Duft${g}.`);
  }

  // 2) Stimmungsbild passend zum Charakter
  const mood = moodKey(p);
  if (mood) sentences.push(pick(MOOD[mood], s, 1));

  // 3) Verlauf der Noten (neuer Absatz)
  sentences.push(PARAGRAPH);
  // Jede Note nur einmal nennen (z. B. Zedernholz in Kopf- und Basisnote).
  const seen = new Set<string>();
  const firstTime = (notes: string[] | null) =>
    (notes || []).filter((n) => {
      const key = n.trim().toLowerCase();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const top = clean(firstTime(p.top_notes));
  const heart = clean(firstTime(p.heart_notes));
  const base = clean(firstTime(p.base_notes));
  if (top.length || heart.length || base.length) {
    const parts: string[] = [];
    // Nur Satzbauten, in denen die Noten im Nominativ stehen – so stimmen auch
    // Adjektive („sizilianische Zitrone", „grüner Apfel") ohne Deklination.
    if (top.length) {
      const one = top.length === 1;
      parts.push(
        pick(
          [
            `den Auftakt ${one ? 'macht' : 'machen'} ${joinList(top)}`,
            `zu Beginn ${one ? 'duftet' : 'duften'} vor allem ${joinList(top)}`,
            `am Anfang ${one ? 'ist' : 'sind'} vor allem ${joinList(top)} zu riechen`
          ],
          s,
          2
        )
      );
    }
    if (heart.length) {
      const one = heart.length === 1;
      parts.push(
        pick(
          [
            `danach ${one ? 'tritt' : 'treten'} ${joinList(heart)} in den Vordergrund`,
            `im Herzen ${one ? 'zeigt' : 'zeigen'} sich ${joinList(heart)}`,
            `nach einer Weile ${one ? 'kommt' : 'kommen'} ${joinList(heart)} dazu`
          ],
          s,
          3
        )
      );
    }
    if (base.length) {
      const verb = base.length === 1 ? 'bleibt' : 'bleiben';
      parts.push(
        pick([`auf der Haut ${verb} am Ende ${joinList(base)}`, `zum Schluss ${verb} ${joinList(base)} zurück`, `später ${verb} ${joinList(base)} auf der Haut`], s, 4)
      );
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
    if (season && where) {
      sentences.push(
        pick(
          [
            `Am schönsten trägt er sich ${season}, besonders ${where}.`,
            `Er passt ${season} und macht sich ${where} besonders gut.`,
            `Seine Stärken zeigt er ${season}, vor allem ${where}.`
          ],
          s,
          5
        )
      );
    }
    else if (season) sentences.push(`Am schönsten trägt er sich ${season}.`);
    else sentences.push(`Er macht sich ${where} besonders gut.`);
  }

  // 5) Haltbarkeit/Ausstrahlung in Worten
  const perf = performanceSentence(p, s);
  if (perf) sentences.push(perf);

  // 6) Preis-Einordnung (neuer Absatz)
  const price = priceSentence(p, s);
  sentences.push(PARAGRAPH);
  if (price) sentences.push(price);

  // 7) Weitere Versionen
  if (opts.versions && opts.versions.labels.length) {
    const als = joinList(opts.versions.labels.map((l) => `als ${l}`));
    sentences.push(
      pick(
        [
          `${opts.versions.name} gibt es auch ${als}; die Unterschiede zeigt der Versionen-Vergleich.`,
          `Übrigens: ${opts.versions.name} gibt es auch ${als}.`
        ],
        s,
        8
      )
    );
  }

  // Absätze mit Leerzeile trennen; leere Absätze entfallen.
  return sentences
    .join(' ')
    .split(PARAGRAPH)
    .map((part) => part.trim())
    .filter(Boolean)
    .join('\n\n');
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

// Akkord → Wortgruppe für „… wie X und Y". Die Noten stehen im Nominativ
// („dir Zitrusnoten wie sizilianische Zitrone gefallen"), damit Adjektive stimmen.
const ACCORD_GROUP: Record<AccordCode, string> = {
  zitrisch: 'Zitrusnoten',
  frisch: 'frische Noten',
  fruchtig: 'fruchtige Noten',
  blumig: 'Blumennoten',
  pudrig: 'weiche, pudrige Noten',
  suess: 'süsse Noten',
  wuerzig: 'würzige Noten',
  holzig: 'Hölzer',
  warm: 'warme Noten'
};

// Akkorde, die manche Menschen bewusst meiden – geeignet für „Eher nicht, wenn …".
const POLARIZING: AccordCode[] = ['blumig', 'suess', 'wuerzig', 'holzig', 'warm', 'pudrig'];

// Verwandte Richtungen: Wer die eine mag, stört sich kaum an der anderen
// (z. B. süss und warm bei Vanille/Tonka) – darum nie gegeneinander ausspielen.
const RELATED: Partial<Record<AccordCode, AccordCode[]>> = {
  zitrisch: ['frisch'],
  frisch: ['zitrisch'],
  suess: ['warm'],
  warm: ['suess', 'holzig'],
  holzig: ['warm'],
  blumig: ['pudrig'],
  pudrig: ['blumig']
};

function exampleNotes(p: Perfume, code: AccordCode, skip: string[] = []): string[] {
  const lower = skip.map((n) => n.toLowerCase());
  return notesForAccord(p, code)
    // Sammelbegriffe wie „Holznoten" taugen nicht als Beispiel („Hölzer wie Holznoten").
    .filter((n) => !lower.includes(n.toLowerCase()) && !/noten$/i.test(n.trim()))
    .slice(0, 2);
}

export function fitAdvice(p: Perfume): FitAdvice {
  const fits: string[] = [];
  const notFits: string[] = [];
  const fam = p.fragrance_family || '';
  const season = (p.season || '').toLowerCase();
  const occasions = occasionPurposes(p.occasion);
  const accords = computeAccords(p, 5).map((a) => a.code);

  // 1) Was man an ihm mögen muss – mit seinen eigenen Noten.
  let main: AccordCode | undefined = accords[0];
  if ((main === 'frisch' || main === 'zitrisch') && notesForAccord(p, 'zitrisch').length) main = 'zitrisch';
  const mainNotes = main ? exampleNotes(p, main) : [];
  if (main && mainNotes.length) fits.push(`dir ${ACCORD_GROUP[main]} wie ${joinList(mainNotes.map(inSentence))} gefallen`);
  else if (FITS_FAMILY[fam]) fits.push(FITS_FAMILY[fam]);

  // 2) Wofür – „leicht", wenn er wenig ausstrahlt.
  const light = p.sillage != null && p.sillage <= 5;
  const seasonText = seasonPhrase(p.season);
  if (occasions.length) fits.push(`du einen ${light ? 'leichten ' : ''}Duft ${joinList(occasions)} suchst`);
  else if (seasonText) fits.push(`du einen ${light ? 'leichten ' : ''}Duft ${seasonText} suchst`);

  // 3) Leistung oder Preis.
  if (p.longevity != null && p.longevity >= 8) fits.push('er den ganzen Tag halten soll');
  else if (p.sillage != null && p.sillage <= 4) fits.push('du es dezent magst');
  else if (p.sillage != null && p.sillage >= 8) fits.push('man dich ruhig bemerken darf');
  if (p.price_chf != null && p.price_chf <= 70 && fits.length < 3) fits.push('du nicht viel ausgeben möchtest');

  // 1) Welche seiner Noten jemanden stören könnten – nie dieselben Noten wie oben,
  //    sonst widerspräche sich die Einschätzung.
  const other = accords.find(
    (c) =>
      c !== main &&
      POLARIZING.includes(c) &&
      !(main && RELATED[main]?.includes(c)) &&
      exampleNotes(p, c, mainNotes).length > 0
  );
  if (other) notFits.push(`dich ${ACCORD_GROUP[other]} wie ${joinList(exampleNotes(p, other, mainNotes).map(inSentence))} stören`);
  else if (NOT_FAMILY[fam]) notFits.push(NOT_FAMILY[fam]);

  // 2) Jahreszeit.
  if (season.includes('sommer') && !season.includes('winter') && !season.includes('ganzj')) {
    notFits.push('du einen Duft für kalte Wintertage suchst');
  } else if ((season.includes('winter') || season.includes('herbst')) && !season.includes('sommer') && !season.includes('ganzj')) {
    notFits.push('du etwas für heisse Sommertage suchst');
  }

  // 3) Ausstrahlung, Haltbarkeit, Preis.
  if (p.sillage != null && p.sillage >= 8) notFits.push('du im Büro oder im Zug dezent bleiben willst');
  else if (p.sillage != null && p.sillage <= 4) notFits.push('der Duft den ganzen Raum füllen soll');
  if (p.longevity != null && p.longevity <= 5 && notFits.length < 3) notFits.push('er ohne Nachsprühen den ganzen Tag halten soll');
  if (p.price_chf != null && p.price_chf > MAX_PRICE && notFits.length < 3) notFits.push(`dein Budget unter CHF ${MAX_PRICE} liegt`);

  return { fits: fits.slice(0, 3), notFits: notFits.slice(0, 3) };
}
