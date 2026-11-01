import { isWithinPriceCap, type Perfume } from './perfumes';
import { distinctFragranceCount } from './versions';

// „Duft nach Geschmack": Kacheln mit Bild (Vanille, Honig, Erdbeere, Kekse …) –
// ein Klick zeigt alle Düfte, deren Noten dazu passen. Erkennung über Teile der
// (deutschen) Notennamen, kleingeschrieben. Fotos liegen in /public/notes bzw.
// /public/geschmack; ohne Foto zeigt die Kachel eine Farbfläche.

export type Flavor = {
  slug: string;
  title: string; // „Vanille"
  phrase: string; // „nach Vanille"
  image: string | null;
  color: string;
  notes: string[];
  exclude?: string[];
  intro: string;
};

export const FLAVORS: Flavor[] = [
  { slug: 'vanille', title: 'Vanille', phrase: 'nach Vanille', image: '/notes/vanille.jpg', color: '#E9D8B4', notes: ['vanille'], intro: 'Warm, cremig und gemütlich – Vanille macht Düfte weich und einladend.' },
  { slug: 'honig', title: 'Honig', phrase: 'nach Honig', image: null, color: '#E7B54A', notes: ['honig'], intro: 'Goldig, süss und leicht blumig – Honig gibt Düften Wärme und Tiefe.' },
  { slug: 'erdbeere', title: 'Erdbeere', phrase: 'nach Erdbeere', image: null, color: '#E36A6A', notes: ['erdbeer'], intro: 'Saftig, süss und verspielt – Erdbeere wirkt fröhlich und jung.' },
  { slug: 'beeren', title: 'Beeren', phrase: 'nach Beeren', image: '/notes/himbeere.jpg', color: '#B8445E', notes: ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'cranberry', 'maulbeer', 'beere'], exclude: ['pfefferbeere', 'wacholderbeere'], intro: 'Himbeere, Cassis, Brombeere & Co. – fruchtig, frisch und ein bisschen frech.' },
  { slug: 'kirsche', title: 'Kirsche', phrase: 'nach Kirsche', image: null, color: '#9E1F35', notes: ['kirsch'], intro: 'Dunkel, saftig und verführerisch – Kirsche ist ein Liebling der süssen Düfte.' },
  { slug: 'karamell', title: 'Karamell', phrase: 'nach Karamell', image: null, color: '#C07A3A', notes: ['karamel', 'toffee', 'praline', 'praliné'], intro: 'Gebrannter Zucker, Toffee und Praliné – süss wie aus der Confiserie.' },
  { slug: 'schokolade', title: 'Schokolade', phrase: 'nach Schokolade', image: null, color: '#5B3A29', notes: ['kakao', 'schokolade'], intro: 'Kakao und Schokolade – genussvoll, warm und ein bisschen dekadent.' },
  { slug: 'kaffee', title: 'Kaffee', phrase: 'nach Kaffee', image: null, color: '#6F4E37', notes: ['kaffee', 'espresso', 'mokka'], intro: 'Geröstet, warm und wach – Kaffee gibt süssen Düften Tiefe.' },
  { slug: 'kekse', title: 'Kekse & Gebäck', phrase: 'nach Keksen und Gebäck', image: null, color: '#D9A86C', notes: ['keks', 'biscuit', 'cookie', 'gebäck', 'kuchen', 'plätzchen', 'brioche'], intro: 'Frisch aus dem Ofen – Düfte, die nach Bäckerei und Plätzchen riechen.' },
  { slug: 'butter', title: 'Butter & Sahne', phrase: 'nach Butter und Sahne', image: null, color: '#F2E3B3', notes: ['butter', 'sahne', 'rahm', 'milch'], exclude: ['butterblume'], intro: 'Cremig, weich und milchig – für Düfte, die wie ein warmes Dessert wirken.' },
  { slug: 'kokos', title: 'Kokos', phrase: 'nach Kokos', image: '/notes/kokos.jpg', color: '#F1EBDD', notes: ['kokos'], intro: 'Cremig und sonnig – Kokos riecht nach Ferien und Strand.' },
  { slug: 'pfirsich', title: 'Pfirsich', phrase: 'nach Pfirsich', image: '/notes/pfirsich.jpg', color: '#F4B183', notes: ['pfirsich', 'aprikose'], intro: 'Samtig, saftig und sanft süss – Pfirsich wirkt weich und freundlich.' },
  { slug: 'apfel', title: 'Apfel', phrase: 'nach Apfel', image: '/notes/apfel.jpg', color: '#9BC46A', notes: ['apfel'], exclude: ['apfelblüte', 'granatapfel'], intro: 'Knackig, frisch und spritzig – Apfel macht Düfte lebendig.' },
  { slug: 'zitrone', title: 'Zitrone & Zitrus', phrase: 'nach Zitrone und Zitrus', image: '/notes/zitrone.jpg', color: '#F2D64B', notes: ['zitrone', 'bergamotte', 'orange', 'mandarine', 'grapefruit', 'limette', 'yuzu', 'pomelo', 'zitrus'], exclude: ['zitronengras', 'zitronenmelisse', 'orangenblüte'], intro: 'Spritzig, hell und frisch – Zitrusfrüchte sind der Klassiker für warme Tage.' },
  { slug: 'zimt', title: 'Zimt', phrase: 'nach Zimt', image: '/notes/zimt.jpg', color: '#A0522D', notes: ['zimt'], intro: 'Würzig, warm und süss – Zimt erinnert an Herbst und Weihnachten.' },
  { slug: 'tonkabohne', title: 'Tonkabohne', phrase: 'nach Tonkabohne', image: '/notes/tonkabohne.jpg', color: '#8B6B4A', notes: ['tonka'], intro: 'Mandelig, vanillig und ein Hauch Heu – Tonka macht Düfte warm und rund.' }
];

export function getFlavor(slug: string): Flavor | undefined {
  return FLAVORS.find((f) => f.slug === slug);
}

function notesOf(p: Perfume): string[] {
  return [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].map((n) => n.toLowerCase());
}

// Passende Noten eines Duftes zu einem Geschmack (z. B. ["Himbeere", "Cassis"]).
export function flavorNotes(p: Perfume, flavor: Flavor): string[] {
  const all = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])];
  return all.filter((n) => {
    const l = n.toLowerCase();
    return flavor.notes.some((x) => l.includes(x)) && !(flavor.exclude || []).some((x) => l.includes(x));
  });
}

// Empfehlbare Düfte (bis CHF 180, erhältlich) mit diesem Geschmack, beste zuerst.
export function perfumesForFlavor(perfumes: Perfume[], flavor: Flavor): Perfume[] {
  return perfumes.filter((p) => p.slug && isWithinPriceCap(p) && notesOf(p).length > 0 && flavorNotes(p, flavor).length > 0);
}

// In Google erst ab 3 verschiedenen Düften (sonst „dünne" Seite).
export const MIN_FLAVOR_FOR_INDEX = 3;
export function flavorIndexable(list: Perfume[]): boolean {
  return distinctFragranceCount(list) >= MIN_FLAVOR_FOR_INDEX;
}
