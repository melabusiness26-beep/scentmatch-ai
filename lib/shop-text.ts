// Liest aus dem kopierten Text einer Shop-Seite (Strg+A, Strg+C) die Grössen und
// Preise heraus – im Admin unter „Preise aus dem Shop übernehmen“.
//
// Es wird nichts geraten: Was nicht eindeutig im Text steht, bleibt leer. Grössen,
// bei denen etwas auffällt (Nachfüllung, Set, fast gleicher Preis wie die kleinere
// Grösse), werden markiert und nicht automatisch übernommen.
// Reine Logik ohne Datenbank, damit sie leicht zu prüfen ist.

export type ShopSize = {
  ml: number;
  price_chf: number;
  /** Ausdrücklich als Nachfüllung/Refill bezeichnet. */
  refill: boolean;
  /** Kleiner Reise-Sprühflakon (bis 15 ml). */
  travel: boolean;
  /** Freundlicher Hinweis, warum diese Grösse geprüft werden sollte (sonst null). */
  doubt: string | null;
};

export type ShopReading = {
  shop: string | null;
  brand: string | null;
  name: string | null;
  /** Zeile wie „Eau de Parfum für Damen“. */
  type: string | null;
  gender: 'Women' | 'Men' | 'Unisex' | null;
  concentration: string | null;
  sizes: ShopSize[];
  /** Vom Hersteller empfohlener Preis (UVP) – nur zur Info, wird nie gespeichert. */
  listPrice: number | null;
};

const SHOPS: [RegExp, string][] = [
  [/notino/i, 'Notino'],
  [/easycosmetic/i, 'easyCOSMETIC'],
  [/marionnaud/i, 'Marionnaud'],
  [/\bimpo\b|impo\.ch/i, 'Impo'],
  [/douglas/i, 'Douglas'],
  [/manor/i, 'Manor'],
  [/flaconi/i, 'Flaconi'],
  [/makeup\.ch/i, 'Makeup.ch'],
  [/galaxus/i, 'Galaxus']
];

const CONCENTRATIONS: [RegExp, string][] = [
  [/extrait/i, 'Extrait'],
  [/eau de parfum/i, 'EdP'],
  [/eau de toilette/i, 'EdT'],
  [/eau de cologne/i, 'EdC'],
  [/\bparfum\b/i, 'Parfum'],
  [/\bcologne\b/i, 'Cologne']
];

const REFILL = /nachf[üu]llung|ersatzf[üu]llung|refill|recharge/i;
const NOT_A_BOTTLE = /\bset\b|geschenkset|duschgel|shower|deo|lotion|body|aftershave|after shave|probe|sample|tester/i;

function toPrice(raw: string): number | null {
  const n = Number(raw.replace(/['’\s]/g, '').replace(',', '.'));
  return Number.isFinite(n) && n > 0 && n < 5000 ? Math.round(n * 100) / 100 : null;
}

function detectGender(text: string): ShopReading['gender'] {
  if (/unisex/i.test(text)) return 'Unisex';
  if (/f[üu]r damen|for women|for her|damenparf/i.test(text)) return 'Women';
  if (/f[üu]r herren|for men|for him|herrenparf/i.test(text)) return 'Men';
  return null;
}

// Notino: nach der Brotkrumen-Zeile „Parfüms/Damen-Parfüm /Eau de Parfum für Damen“
// folgen Marke, Duftname und Produkttyp je auf einer eigenen Zeile.
function readTitle(lines: string[]): Pick<ShopReading, 'brand' | 'name' | 'type'> {
  const crumb = lines.findIndex((l) => /^\/?\s*Parf[üu]ms?\s*\//i.test(l));
  if (crumb >= 0) {
    const [brand, name, type] = lines.slice(crumb + 1, crumb + 4);
    if (brand && name && type && /eau de|parfum|cologne|extrait/i.test(type)) return { brand, name, type };
  }
  return { brand: null, name: null, type: null };
}

export function readShopText(text: string): ShopReading {
  const clean = text.replace(/\r/g, '').replace(/ /g, ' ');
  const lines = clean.split('\n').map((l) => l.trim()).filter(Boolean);
  const shop = SHOPS.find(([re]) => re.test(clean))?.[1] || null;
  const title = readTitle(lines);
  const typeText = title.type || '';

  // Grösse und Preis stehen untereinander („50 ml“ / „CHF75.90“) oder auf einer Zeile.
  // Der Grundpreis „CHF 151.80 / 100 ml“ wird übersprungen (steht vor dem ml).
  const found = new Map<number, ShopSize>();
  const pattern = /(\d{1,4}(?:[.,]\d+)?)\s*ml\b([^\n\d]{0,40})\n?\s*(?:CHF|Fr\.?)\s*(\d{1,4}(?:['’]\d{3})*(?:[.,]\d{1,2})?)/gi;
  for (const m of clean.matchAll(pattern)) {
    const ml = Number(m[1].replace(',', '.'));
    const price = toPrice(m[3]);
    const label = m[2] || '';
    if (!ml || ml > 1000 || price == null) continue;
    if (NOT_A_BOTTLE.test(label)) continue;
    const refill = REFILL.test(label);
    const prev = found.get(ml);
    // Dieselbe Grösse kommt oft doppelt vor (Überschrift + Auswahl) – Nachfüllung gewinnt.
    if (prev && (prev.refill || !refill)) continue;
    found.set(ml, { ml, price_chf: price, refill, travel: ml <= 15, doubt: null });
  }

  const sizes = [...found.values()].sort((a, b) => a.ml - b.ml);
  // Auffällig: eine grössere Flasche kostet kaum mehr als die nächstkleinere
  // (z. B. 150 ml für CHF 107 neben 100 ml für CHF 104) – fast immer eine Nachfüllung.
  for (let i = 1; i < sizes.length; i++) {
    const smaller = sizes[i - 1];
    const s = sizes[i];
    if (s.refill) s.doubt = 'Der Shop nennt diese Grösse eine Nachfüllung.';
    else if (s.ml >= smaller.ml * 1.3 && s.price_chf <= smaller.price_chf * 1.08) {
      s.doubt = `Kostet fast gleich viel wie ${smaller.ml} ml – oft ist das eine Nachfüllung. Klick im Shop kurz auf die Grösse und schau nach.`;
    }
  }
  if (sizes[0]?.refill) sizes[0].doubt = 'Der Shop nennt diese Grösse eine Nachfüllung.';

  const listMatch = clean.match(/(?:CHF|Fr\.?)\s*(\d{1,4}(?:[.,]\d{1,2})?)\s*\n?\s*\d{1,2}\s*%\s*g[üu]nstiger/i);

  return {
    shop,
    ...title,
    gender: detectGender(typeText) || null,
    concentration: CONCENTRATIONS.find(([re]) => re.test(typeText))?.[1] || null,
    sizes,
    listPrice: listMatch ? toPrice(listMatch[1]) : null
  };
}

// Welche Grösse als Hauptpreis vorgeschlagen wird: 50 ml, sonst die kleinste
// „normale“ Flasche ab 30 ml, sonst die kleinste überhaupt.
export function suggestMainSize(sizes: ShopSize[]): number | null {
  const usable = sizes.filter((s) => !s.refill && !s.doubt);
  const pick = usable.find((s) => s.ml === 50) || usable.find((s) => s.ml >= 30) || usable[0] || sizes[0];
  return pick ? pick.ml : null;
}
