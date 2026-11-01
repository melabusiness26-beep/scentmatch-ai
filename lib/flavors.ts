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
  group: FlavorGroup;
  image: string | null;
  color: string;
  notes: string[];
  exclude?: string[];
  intro: string;
};

export const FLAVOR_GROUPS = [
  'Süsses & Desserts',
  'Früchte',
  'Zitrus',
  'Getränke',
  'Blumen',
  'Gewürze & Hölzer',
  'Frisch & sauber'
] as const;
export type FlavorGroup = (typeof FLAVOR_GROUPS)[number];

const N = '/notes/';
// Kurzschreibweise: [slug, Titel, „nach …", Gruppe, Foto oder null, Farbe, Notenteile, Ausschlüsse, Einleitung]
type Row = [string, string, string, FlavorGroup, string | null, string, string[], string[], string];
const ROWS: Row[] = [
  // Süsses & Desserts
  ['vanille', 'Vanille', 'nach Vanille', 'Süsses & Desserts', N + 'vanille.jpg', '#E9D8B4', ['vanille', 'vanilla'], [], 'Warm, cremig und gemütlich – Vanille macht Düfte weich und einladend.'],
  ['honig', 'Honig', 'nach Honig', 'Süsses & Desserts', null, '#E7B54A', ['honig'], [], 'Goldig, süss und leicht blumig – Honig gibt Düften Wärme und Tiefe.'],
  ['karamell', 'Karamell', 'nach Karamell', 'Süsses & Desserts', null, '#C07A3A', ['karamel', 'toffee', 'praline', 'praliné'], [], 'Gebrannter Zucker, Toffee und Praliné – süss wie aus der Confiserie.'],
  ['schokolade', 'Schokolade', 'nach Schokolade', 'Süsses & Desserts', null, '#5B3A29', ['kakao', 'schokolade'], [], 'Kakao und Schokolade – genussvoll, warm und ein bisschen dekadent.'],
  ['kekse', 'Kekse & Plätzchen', 'nach Keksen und Plätzchen', 'Süsses & Desserts', null, '#D9A86C', ['keks', 'biscuit', 'cookie', 'plätzchen', 'brioche', 'gebäck'], [], 'Frisch aus dem Ofen – Düfte, die nach Bäckerei und Plätzchen riechen.'],
  ['cupcake', 'Cupcake & Kuchen', 'nach Cupcake und Kuchen', 'Süsses & Desserts', null, '#F2B8C6', ['cupcake', 'kuchen', 'torte', 'frosting', 'zuckerguss', 'glasur'], [], 'Süss, cremig und verspielt – wie ein Cupcake mit Frosting.'],
  ['butter', 'Butter & Sahne', 'nach Butter und Sahne', 'Süsses & Desserts', null, '#F2E3B3', ['butter', 'sahne', 'rahm', 'milch'], ['butterblume'], 'Cremig, weich und milchig – für Düfte, die wie ein warmes Dessert wirken.'],
  ['marshmallow', 'Marshmallow & Zuckerwatte', 'nach Marshmallow und Zuckerwatte', 'Süsses & Desserts', null, '#F6D6E4', ['marshmallow', 'zuckerwatte', 'baiser', 'meringue'], [], 'Luftig, zuckrig und verspielt – wie auf dem Jahrmarkt.'],
  ['pistazie', 'Pistazie', 'nach Pistazie', 'Süsses & Desserts', null, '#A9C27A', ['pistazie'], [], 'Nussig, cremig und leicht grün – Pistazie ist ein moderner Gourmand-Liebling.'],
  ['nuesse', 'Mandel & Nüsse', 'nach Mandel und Nüssen', 'Süsses & Desserts', null, '#B98B5E', ['mandel', 'haselnuss', 'walnuss', 'nuss'], ['muskatnuss', 'kokosnuss'], 'Geröstet und warm – Mandel und Haselnuss machen Düfte gemütlich.'],
  ['tonkabohne', 'Tonkabohne', 'nach Tonkabohne', 'Süsses & Desserts', N + 'tonkabohne.jpg', '#8B6B4A', ['tonka'], [], 'Mandelig, vanillig und ein Hauch Heu – Tonka macht Düfte warm und rund.'],
  // Früchte
  ['erdbeere', 'Erdbeere', 'nach Erdbeere', 'Früchte', null, '#E36A6A', ['erdbeer'], [], 'Saftig, süss und verspielt – Erdbeere wirkt fröhlich und jung.'],
  ['himbeere', 'Himbeere', 'nach Himbeere', 'Früchte', N + 'himbeere.jpg', '#C2415E', ['himbeer'], [], 'Fruchtig, leicht säuerlich und frech – Himbeere bringt Farbe in einen Duft.'],
  ['beeren', 'Beeren', 'nach Beeren', 'Früchte', N + 'cassis.jpg', '#6B2D4F', ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'cranberry', 'maulbeer', 'beere'], ['pfefferbeere', 'wacholderbeere'], 'Himbeere, Cassis, Brombeere & Co. – fruchtig, frisch und ein bisschen frech.'],
  ['kirsche', 'Kirsche', 'nach Kirsche', 'Früchte', null, '#9E1F35', ['kirsch'], [], 'Dunkel, saftig und verführerisch – Kirsche ist ein Liebling der süssen Düfte.'],
  ['pfirsich', 'Pfirsich', 'nach Pfirsich', 'Früchte', N + 'pfirsich.jpg', '#F4B183', ['pfirsich'], [], 'Samtig, saftig und sanft süss – Pfirsich wirkt weich und freundlich.'],
  ['aprikose', 'Aprikose', 'nach Aprikose', 'Früchte', null, '#F2A65A', ['aprikose'], [], 'Sonnig, samtig und süss – Aprikose wirkt warm und fröhlich.'],
  ['mango', 'Mango', 'nach Mango', 'Früchte', null, '#F5B841', ['mango'], [], 'Tropisch, saftig und süss – Mango bringt Ferienstimmung.'],
  ['ananas', 'Ananas', 'nach Ananas', 'Früchte', null, '#F2D14B', ['ananas'], [], 'Spritzig, süss und tropisch – Ananas macht Düfte strahlend.'],
  ['banane', 'Banane', 'nach Banane', 'Früchte', null, '#F3E07A', ['banane'], [], 'Cremig und süss – Banane wirkt weich und überraschend gourmandig.'],
  ['melone', 'Melone', 'nach Melone', 'Früchte', null, '#9ED79B', ['melone'], [], 'Wässrig, frisch und leicht süss – Melone ist ideal für heisse Tage.'],
  ['birne', 'Birne', 'nach Birne', 'Früchte', N + 'birne.jpg', '#C9D46A', ['birne'], [], 'Saftig, hell und leicht süss – Birne wirkt frisch und elegant.'],
  ['apfel', 'Apfel', 'nach Apfel', 'Früchte', N + 'apfel.jpg', '#9BC46A', ['apfel'], ['apfelblüte', 'granatapfel'], 'Knackig, frisch und spritzig – Apfel macht Düfte lebendig.'],
  ['pflaume', 'Pflaume', 'nach Pflaume', 'Früchte', null, '#6E3B5C', ['pflaume'], [], 'Dunkel, reif und süss – Pflaume gibt Düften Tiefe.'],
  ['litschi', 'Litschi', 'nach Litschi', 'Früchte', null, '#F0C9CF', ['litschi', 'lychee', 'litchi'], [], 'Blumig-fruchtig und zart – Litschi wirkt frisch und feminin.'],
  ['feige', 'Feige', 'nach Feige', 'Früchte', N + 'feige.jpg', '#7D5A7A', ['feige'], [], 'Grün, milchig und leicht süss – Feige riecht nach Sommer im Süden.'],
  ['kokos', 'Kokos', 'nach Kokos', 'Früchte', N + 'kokos.jpg', '#F1EBDD', ['kokos'], [], 'Cremig und sonnig – Kokos riecht nach Ferien und Strand.'],
  // Zitrus
  ['zitrone', 'Zitrone', 'nach Zitrone', 'Zitrus', N + 'zitrone.jpg', '#F2D64B', ['zitrone', 'limette', 'yuzu'], ['zitronengras', 'zitronenmelisse'], 'Spritzig, hell und frisch – Zitrone ist der Klassiker für warme Tage.'],
  ['orange', 'Orange', 'nach Orange', 'Zitrus', N + 'orange.jpg', '#F28C28', ['orange'], ['orangenblüte'], 'Saftig, sonnig und gut gelaunt – Orange macht Düfte fröhlich.'],
  ['mandarine', 'Mandarine', 'nach Mandarine', 'Zitrus', N + 'mandarine.jpg', '#F49A3A', ['mandarine'], [], 'Süss-zitrisch und weich – Mandarine ist die freundliche Zitrusfrucht.'],
  ['grapefruit', 'Grapefruit', 'nach Grapefruit', 'Zitrus', N + 'grapefruit.jpg', '#F07C6C', ['grapefruit', 'pampelmuse'], [], 'Herb, spritzig und frisch – Grapefruit weckt auf.'],
  ['bergamotte', 'Bergamotte', 'nach Bergamotte', 'Zitrus', N + 'bergamotte.jpg', '#C9D65A', ['bergamotte'], [], 'Frisch, leicht blumig und elegant – die beliebteste Kopfnote überhaupt.'],
  // Getränke
  ['kaffee', 'Kaffee', 'nach Kaffee', 'Getränke', null, '#6F4E37', ['kaffee', 'espresso', 'mokka'], [], 'Geröstet, warm und wach – Kaffee gibt süssen Düften Tiefe.'],
  ['tee', 'Tee', 'nach Tee', 'Getränke', null, '#9DB07A', ['tee', 'matcha', 'mate'], ['teer', 'tomate'], 'Ruhig, klar und leicht herb – Tee wirkt elegant und entspannt.'],
  // Blumen
  ['rose', 'Rose', 'nach Rose', 'Blumen', N + 'rose.jpg', '#D96A86', ['rose'], ['rosenholz', 'rosengeranie'], 'Die Königin der Blumen – mal frisch, mal samtig und tief.'],
  ['jasmin', 'Jasmin', 'nach Jasmin', 'Blumen', N + 'jasmin.jpg', '#F3EBD3', ['jasmin'], [], 'Weiss, blumig und sinnlich – Jasmin ist das Herz vieler Damendüfte.'],
  ['lavendel', 'Lavendel', 'nach Lavendel', 'Blumen', N + 'lavendel.jpg', '#9D8FC9', ['lavendel', 'lavandin'], [], 'Frisch, sauber und beruhigend – Lavendel ist ein Klassiker.'],
  ['iris', 'Iris', 'nach Iris', 'Blumen', N + 'iris.jpg', '#A99BC7', ['iris', 'veilchenwurzel'], [], 'Pudrig, kühl und edel – Iris wirkt wie teurer Puder.'],
  ['orangenbluete', 'Orangenblüte & Neroli', 'nach Orangenblüte', 'Blumen', N + 'neroli.jpg', '#F6E7C1', ['orangenblüte', 'neroli'], [], 'Hell, sauber und strahlend – Orangenblüte wirkt wie Sonne auf der Haut.'],
  ['frangipani', 'Frangipani', 'nach Frangipani', 'Blumen', N + 'frangipani.jpg', '#F7D9A8', ['frangipani', 'plumeria'], [], 'Tropisch, cremig und blumig – Frangipani riecht nach Inselurlaub.'],
  // Gewürze & Hölzer
  ['zimt', 'Zimt', 'nach Zimt', 'Gewürze & Hölzer', N + 'zimt.jpg', '#A0522D', ['zimt'], [], 'Würzig, warm und süss – Zimt erinnert an Herbst und Weihnachten.'],
  ['pfeffer', 'Pfeffer', 'nach Pfeffer', 'Gewürze & Hölzer', N + 'pfeffer.jpg', '#5E4B3C', ['pfeffer'], ['pfefferminz'], 'Prickelnd und lebendig – Pfeffer gibt Düften Spannung.'],
  ['sandelholz', 'Sandelholz', 'nach Sandelholz', 'Gewürze & Hölzer', N + 'sandelholz.jpg', '#C9A27A', ['sandel'], [], 'Cremig, weich und warm – das sanfteste aller Hölzer.'],
  ['zedernholz', 'Zedernholz', 'nach Zedernholz', 'Gewürze & Hölzer', N + 'zedernholz.jpg', '#9C7A55', ['zeder'], [], 'Trocken, klar und holzig – Zeder gibt Düften Halt.'],
  ['oud', 'Oud', 'nach Oud', 'Gewürze & Hölzer', N + 'oud.jpg', '#4A3324', ['oud', 'adlerholz'], [], 'Dunkel, rauchig und intensiv – das kostbare Holz des Orients.'],
  ['leder', 'Leder', 'nach Leder', 'Gewürze & Hölzer', N + 'leder.jpg', '#6B4530', ['leder'], [], 'Weich, rauchig und edel – Leder wirkt selbstbewusst.'],
  ['tabak', 'Tabak', 'nach Tabak', 'Gewürze & Hölzer', N + 'tabak.jpg', '#8A6239', ['tabak'], [], 'Warm, süsslich und würzig – wie getrocknete Tabakblätter.'],
  ['weihrauch', 'Weihrauch', 'nach Weihrauch', 'Gewürze & Hölzer', N + 'weihrauch.jpg', '#B7A88E', ['weihrauch', 'olibanum'], [], 'Harzig, rauchig und geheimnisvoll.'],
  ['patchouli', 'Patchouli', 'nach Patchouli', 'Gewürze & Hölzer', N + 'patchouli.jpg', '#5F5A3A', ['patchouli'], [], 'Erdig, dunkel und tief – Patchouli macht Düfte markant.'],
  ['vetiver', 'Vetiver', 'nach Vetiver', 'Gewürze & Hölzer', N + 'vetiver.jpg', '#7C7A4E', ['vetiver'], [], 'Erdig, grün und leicht rauchig – elegant und trocken.'],
  // Frisch & sauber
  ['moschus', 'Moschus', 'nach Moschus', 'Frisch & sauber', N + 'moschus.jpg', '#EDE3DA', ['moschus', 'musk'], [], 'Sauber, weich und hautnah – wie frisch gewaschene Haut.'],
  ['amber', 'Amber', 'nach Amber', 'Frisch & sauber', N + 'amber.jpg', '#D9A04A', ['amber', 'ambra'], ['amberholz'], 'Warm, harzig und leicht süss – Amber macht Düfte golden und rund.'],
  ['minze', 'Minze', 'nach Minze', 'Frisch & sauber', N + 'minze.jpg', '#8FD1B0', ['minze'], [], 'Kühl, klar und belebend – Minze ist pure Frische.'],
  ['meer', 'Meer & Salz', 'nach Meer und Salz', 'Frisch & sauber', N + 'meersalz.jpg', '#7FB8D6', ['meer', 'ozean', 'salz', 'aquatisch'], [], 'Salzig, luftig und frisch – wie eine Brise am Strand.']
];

export const FLAVORS: Flavor[] = ROWS.map(([slug, title, phrase, group, image, color, notes, exclude, intro]) => ({
  slug, title, phrase, group, image, color, notes, exclude, intro
}));

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
