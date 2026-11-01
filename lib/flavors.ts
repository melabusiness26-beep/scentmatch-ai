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
  // Kombi (z. B. Erdbeershake): der Duft braucht aus JEDER Liste mindestens eine Note.
  combo?: string[][];
  intro: string;
};

export const FLAVOR_GROUPS = [
  'Süsses & Desserts',
  'Dessert-Kombis & Spezialitäten',
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
  ['marzipan', 'Marzipan', 'nach Marzipan', 'Süsses & Desserts', null, '#EBD9B5', ['marzipan'], [], 'Süss, mandelig und weich – Marzipan riecht nach Confiserie und Feiertagen.'],
  ['mandel', 'Mandel', 'nach Mandel', 'Süsses & Desserts', null, '#D8B48A', ['mandel'], ['mandelblüte'], 'Warm, weich und leicht süss – Mandel macht Düfte gemütlich.'],
  ['haselnuss', 'Haselnuss', 'nach Haselnuss', 'Süsses & Desserts', null, '#A8743F', ['haselnuss', 'nougat'], [], 'Geröstet und cremig – wie Nougat oder Nuss-Schokolade.'],
  ['walnuss', 'Walnuss', 'nach Walnuss', 'Süsses & Desserts', null, '#8C6A45', ['walnuss'], [], 'Herb, nussig und warm – eine seltene, gemütliche Note.'],
  ['milch', 'Milch', 'nach Milch', 'Süsses & Desserts', null, '#F4EFE6', ['milch', 'milk'], [], 'Weich, cremig und beruhigend – Milchnoten wirken wie eine warme Umarmung.'],
  ['praline', 'Praliné & Nougat', 'nach Praliné', 'Süsses & Desserts', null, '#9A6A44', ['praline', 'praliné', 'nougat', 'gianduja'], [], 'Nussig, süss und schmelzend – wie eine Praline aus der Schachtel.'],
  ['creme', 'Crème brûlée & Pudding', 'nach Crème brûlée', 'Süsses & Desserts', null, '#EAC57E', ['brûlée', 'brulee', 'custard', 'pudding', 'vanillecreme', 'crème'], [], 'Cremig mit karamellisierter Kruste – ein klassisches Dessert im Flakon.'],
  ['macaron', 'Macaron', 'nach Macaron', 'Süsses & Desserts', null, '#F3C1CF', ['macaron'], [], 'Zart, mandelig und süss – wie ein Macaron aus der Pâtisserie.'],
  ['popcorn', 'Popcorn', 'nach Popcorn', 'Süsses & Desserts', null, '#F4E2A8', ['popcorn'], [], 'Buttrig, süss-salzig und verspielt – wie im Kino.'],
  ['zuckerwatte', 'Zuckerwatte', 'nach Zuckerwatte', 'Süsses & Desserts', null, '#F7C6DA', ['zuckerwatte', 'candy floss', 'cotton candy'], [], 'Luftig, zuckrig und verspielt – wie auf dem Jahrmarkt.'],
  ['bonbon', 'Bonbon', 'nach Bonbon', 'Süsses & Desserts', null, '#F59CC0', ['bonbon', 'lutscher', 'candy'], ['candy floss', 'cotton candy'], 'Bunt, süss und frech – Düfte für gute Laune.'],
  ['kaugummi', 'Kaugummi', 'nach Kaugummi', 'Süsses & Desserts', null, '#F7A8D0', ['kaugummi', 'bubblegum', 'bubble gum'], [], 'Rosa, süss und verspielt – der Duft von Bubblegum.'],
  ['lakritz', 'Lakritz', 'nach Lakritz', 'Süsses & Desserts', null, '#2F2A2A', ['lakritz', 'süssholz', 'süßholz'], [], 'Süss, würzig und ungewöhnlich – Lakritz polarisiert und macht Düfte spannend.'],
  ['ahornsirup', 'Ahornsirup', 'nach Ahornsirup', 'Süsses & Desserts', null, '#B5722E', ['ahorn', 'maple'], [], 'Warm, karamellig und leicht rauchig – wie Pancakes mit Sirup.'],
  ['marroni', 'Marroni', 'nach Marroni', 'Süsses & Desserts', null, '#7B4A2E', ['kastanie', 'marron'], ['rosskastanie'], 'Geröstet, süss und wintrig – wie heisse Marroni am Stand.'],
  ['gipfeli', 'Gipfeli & Croissant', 'nach Gipfeli', 'Süsses & Desserts', null, '#E2B36E', ['croissant', 'gipfel', 'brioche'], [], 'Buttrig, goldbraun und frisch gebacken – wie ein Gipfeli am Sonntagmorgen.'],
  // Dessert-Kombis & Spezialitäten (passen nur, wenn ALLE Bestandteile vorkommen)
  ['erdbeershake', 'Erdbeershake', 'nach Erdbeershake', 'Dessert-Kombis & Spezialitäten', null, '#F4A7B9', [], [], 'Erdbeere trifft Milch oder Sahne – fruchtig, cremig und verspielt.'],
  ['vanilleshake', 'Vanilleshake', 'nach Vanilleshake', 'Dessert-Kombis & Spezialitäten', null, '#F3E4C4', [], [], 'Vanille mit Milch oder Sahne – weich, süss und gemütlich.'],
  ['milchshake', 'Milchshake', 'nach Milchshake', 'Dessert-Kombis & Spezialitäten', null, '#F2D9E1', [], [], 'Milch oder Sahne mit etwas Süssem – wie ein Shake im Diner.'],
  ['mousse-au-chocolat', 'Mousse au Chocolat', 'nach Mousse au Chocolat', 'Dessert-Kombis & Spezialitäten', null, '#6B4430', [], [], 'Schokolade mit Sahne oder Vanille – luftig, cremig und dekadent.'],
  ['tiramisu', 'Tiramisu', 'nach Tiramisu', 'Dessert-Kombis & Spezialitäten', null, '#A57C5B', [], [], 'Kaffee mit Kakao oder Sahne – das italienische Dessert als Duft.'],
  ['schwarzwaelder', 'Schwarzwälder Kirsch', 'nach Schwarzwälder Kirsch', 'Dessert-Kombis & Spezialitäten', null, '#5A1E24', [], [], 'Kirsche trifft Schokolade – dunkel, fruchtig und verführerisch.'],
  ['apfelstrudel', 'Apfelstrudel', 'nach Apfelstrudel', 'Dessert-Kombis & Spezialitäten', null, '#C98B4E', [], [], 'Apfel und Zimt – warm, süss und gemütlich wie frisch aus dem Ofen.'],
  ['zimtstern', 'Zimtstern', 'nach Zimtstern', 'Dessert-Kombis & Spezialitäten', null, '#C7955E', [], [], 'Zimt und Mandel – das Schweizer Weihnachtsgebäck als Duft.'],
  ['magenbrot', 'Magenbrot', 'nach Magenbrot', 'Dessert-Kombis & Spezialitäten', null, '#6A3F2A', [], [], 'Würzige Gewürze mit Honig oder Schokolade – wie Magenbrot vom Herbstmarkt.'],
  ['lebkuchen', 'Lebkuchen', 'nach Lebkuchen', 'Dessert-Kombis & Spezialitäten', null, '#8E5A34', [], [], 'Zimt, Nelke & Co. mit Honig oder Mandel – würzig-süss wie Weihnachten.'],
  ['salted-caramel', 'Salted Caramel', 'nach Salted Caramel', 'Dessert-Kombis & Spezialitäten', null, '#C08A4A', [], [], 'Karamell mit einer Prise Salz – süss, salzig und süchtig machend.'],
  ['pina-colada', 'Piña Colada', 'nach Piña Colada', 'Dessert-Kombis & Spezialitäten', null, '#F4E3A1', [], [], 'Kokos und Ananas – Ferien im Glas.'],
  ['chai-latte', 'Chai Latte', 'nach Chai Latte', 'Dessert-Kombis & Spezialitäten', null, '#B98A62', [], [], 'Tee mit Zimt, Kardamom oder Ingwer – würzig, warm und cremig.'],
  ['panna-cotta', 'Panna Cotta', 'nach Panna Cotta', 'Dessert-Kombis & Spezialitäten', null, '#F5EBDD', [], [], 'Sahne und Vanille – zart, cremig und elegant.'],
  ['pistaziengipfel', 'Pistaziengipfel', 'nach Pistaziengipfel', 'Dessert-Kombis & Spezialitäten', null, '#B7C98A', [], [], 'Pistazie trifft buttriges Gebäck – nussig, cremig und frisch gebacken.'],
  ['zimtschnecke', 'Zimtschnecke', 'nach Zimtschnecke', 'Dessert-Kombis & Spezialitäten', null, '#C58B5A', [], [], 'Zimt mit Gebäck, Butter oder Karamell – warm und süss wie aus der Bäckerei.'],
  ['caramel-latte', 'Kaffee mit Karamell', 'nach Kaffee mit Karamell', 'Dessert-Kombis & Spezialitäten', null, '#A9744A', [], [], 'Kaffee trifft Karamell – wie ein Caramel Latte to go.'],
  // Früchte
  ['erdbeere', 'Erdbeere', 'nach Erdbeere', 'Früchte', null, '#E36A6A', ['erdbeer'], [], 'Saftig, süss und verspielt – Erdbeere wirkt fröhlich und jung.'],
  ['himbeere', 'Himbeere', 'nach Himbeere', 'Früchte', N + 'himbeere.jpg', '#C2415E', ['himbeer'], [], 'Fruchtig, leicht säuerlich und frech – Himbeere bringt Farbe in einen Duft.'],
  ['beeren', 'Beeren', 'nach Beeren', 'Früchte', N + 'cassis.jpg', '#6B2D4F', ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'cranberry', 'maulbeer', 'beere'], ['pfefferbeere', 'wacholderbeere'], 'Himbeere, Cassis, Brombeere & Co. – fruchtig, frisch und ein bisschen frech.'],
  ['blaubeere', 'Blaubeere', 'nach Blaubeere', 'Früchte', null, '#4D5FA3', ['heidelbeer', 'blaubeer', 'blueberry'], [], 'Fruchtig, leicht säuerlich und frisch – Blaubeere wirkt verspielt.'],
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
  ['passionsfrucht', 'Passionsfrucht', 'nach Passionsfrucht', 'Früchte', null, '#E5A33D', ['passionsfrucht', 'maracuja'], [], 'Exotisch, säuerlich-süss und saftig – tropische Frische.'],
  ['granatapfel', 'Granatapfel', 'nach Granatapfel', 'Früchte', null, '#B8323F', ['granatapfel'], [], 'Saftig, herb und leuchtend – Granatapfel wirkt edel und frisch.'],
  ['rhabarber', 'Rhabarber', 'nach Rhabarber', 'Früchte', null, '#D96C7B', ['rhabarber'], [], 'Säuerlich, grün und frisch – eine überraschende Note.'],
  // Zitrus
  ['zitrone', 'Zitrone', 'nach Zitrone', 'Zitrus', N + 'zitrone.jpg', '#F2D64B', ['zitrone', 'yuzu'], ['zitronengras', 'zitronenmelisse'], 'Spritzig, hell und frisch – Zitrone ist der Klassiker für warme Tage.'],
  ['limette', 'Limette', 'nach Limette', 'Zitrus', null, '#9CCB4F', ['limette', 'lime'], ['limettenblüte'], 'Grün, spritzig und erfrischend – wie ein Mojito an einem heissen Tag.'],
  ['orange', 'Orange', 'nach Orange', 'Zitrus', N + 'orange.jpg', '#F28C28', ['orange'], ['orangenblüte'], 'Saftig, sonnig und gut gelaunt – Orange macht Düfte fröhlich.'],
  ['mandarine', 'Mandarine', 'nach Mandarine', 'Zitrus', N + 'mandarine.jpg', '#F49A3A', ['mandarine'], [], 'Süss-zitrisch und weich – Mandarine ist die freundliche Zitrusfrucht.'],
  ['grapefruit', 'Grapefruit', 'nach Grapefruit', 'Zitrus', N + 'grapefruit.jpg', '#F07C6C', ['grapefruit', 'pampelmuse'], [], 'Herb, spritzig und frisch – Grapefruit weckt auf.'],
  ['bergamotte', 'Bergamotte', 'nach Bergamotte', 'Zitrus', N + 'bergamotte.jpg', '#C9D65A', ['bergamotte'], [], 'Frisch, leicht blumig und elegant – die beliebteste Kopfnote überhaupt.'],
  // Getränke
  ['kaffee', 'Kaffee', 'nach Kaffee', 'Getränke', null, '#6F4E37', ['kaffee', 'espresso', 'mokka'], [], 'Geröstet, warm und wach – Kaffee gibt süssen Düften Tiefe.'],
  ['tee', 'Tee', 'nach Tee', 'Getränke', null, '#9DB07A', ['tee', 'matcha', 'mate'], ['teer', 'tomate'], 'Ruhig, klar und leicht herb – Tee wirkt elegant und entspannt.'],
  ['matcha', 'Matcha', 'nach Matcha', 'Getränke', null, '#8DB255', ['matcha'], [], 'Grün, cremig und leicht herb – der Trend-Tee als Duft.'],
  ['rum', 'Rum', 'nach Rum', 'Getränke', null, '#7A4B2A', ['rum'], ['rumänisch'], 'Warm, süss und berauschend – Rum macht Düfte sinnlich.'],
  ['whisky', 'Whisky', 'nach Whisky', 'Getränke', null, '#A8682B', ['whisky', 'whiskey', 'bourbon'], [], 'Rauchig, warm und edel – für Abenddüfte mit Charakter.'],
  ['cognac', 'Cognac', 'nach Cognac', 'Getränke', null, '#9B5A2B', ['cognac', 'brandy'], [], 'Weich, fruchtig und edel – Cognac gibt Düften Tiefe.'],
  ['champagner', 'Champagner', 'nach Champagner', 'Getränke', null, '#EBDCA5', ['champagner', 'prosecco', 'sekt'], [], 'Prickelnd und festlich – ein Duft zum Anstossen.'],
  ['wein', 'Wein', 'nach Wein', 'Getränke', null, '#7B1E3A', ['wein'], ['weinblatt', 'weintraube'], 'Fruchtig, dunkel und elegant – Wein-Noten wirken erwachsen.'],
  // Blumen
  ['rose', 'Rose', 'nach Rose', 'Blumen', N + 'rose.jpg', '#D96A86', ['rose'], ['rosenholz', 'rosengeranie'], 'Die Königin der Blumen – mal frisch, mal samtig und tief.'],
  ['jasmin', 'Jasmin', 'nach Jasmin', 'Blumen', N + 'jasmin.jpg', '#F3EBD3', ['jasmin'], [], 'Weiss, blumig und sinnlich – Jasmin ist das Herz vieler Damendüfte.'],
  ['lavendel', 'Lavendel', 'nach Lavendel', 'Blumen', N + 'lavendel.jpg', '#9D8FC9', ['lavendel', 'lavandin'], [], 'Frisch, sauber und beruhigend – Lavendel ist ein Klassiker.'],
  ['iris', 'Iris', 'nach Iris', 'Blumen', N + 'iris.jpg', '#A99BC7', ['iris', 'veilchenwurzel'], [], 'Pudrig, kühl und edel – Iris wirkt wie teurer Puder.'],
  ['orangenbluete', 'Orangenblüte & Neroli', 'nach Orangenblüte', 'Blumen', N + 'neroli.jpg', '#F6E7C1', ['orangenblüte', 'neroli'], [], 'Hell, sauber und strahlend – Orangenblüte wirkt wie Sonne auf der Haut.'],
  ['frangipani', 'Frangipani', 'nach Frangipani', 'Blumen', N + 'frangipani.jpg', '#F7D9A8', ['frangipani', 'plumeria'], [], 'Tropisch, cremig und blumig – Frangipani riecht nach Inselurlaub.'],
  ['tuberose', 'Tuberose', 'nach Tuberose', 'Blumen', null, '#F6EFE3', ['tuberose'], [], 'Cremig, opulent und sinnlich – eine der kräftigsten weissen Blüten.'],
  ['pfingstrose', 'Pfingstrose', 'nach Pfingstrose', 'Blumen', null, '#F1A7BF', ['pfingstrose'], [], 'Frisch, rosig und verspielt – zarter als die Rose.'],
  ['veilchen', 'Veilchen', 'nach Veilchen', 'Blumen', null, '#8C6BB1', ['veilchen'], ['veilchenwurzel'], 'Pudrig, süss und ein bisschen nostalgisch.'],
  ['maigloeckchen', 'Maiglöckchen', 'nach Maiglöckchen', 'Blumen', null, '#E6F0D8', ['maiglöckchen'], [], 'Grün, hell und sauber – der Duft des Frühlings.'],
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
  ['kardamom', 'Kardamom', 'nach Kardamom', 'Gewürze & Hölzer', null, '#9AA86A', ['kardamom'], [], 'Frisch-würzig und warm – Kardamom macht Düfte lebendig.'],
  ['ingwer', 'Ingwer', 'nach Ingwer', 'Gewürze & Hölzer', null, '#D9A54A', ['ingwer'], [], 'Scharf, frisch und prickelnd – Ingwer weckt auf.'],
  ['safran', 'Safran', 'nach Safran', 'Gewürze & Hölzer', null, '#C8452E', ['safran'], [], 'Ledrig, warm und kostbar – Safran wirkt luxuriös.'],
  ['nelke', 'Gewürznelke', 'nach Gewürznelke', 'Gewürze & Hölzer', null, '#6E3A2A', ['gewürznelke'], [], 'Warm, würzig und weihnachtlich.'],
  // Frisch & sauber
  ['moschus', 'Moschus', 'nach Moschus', 'Frisch & sauber', N + 'moschus.jpg', '#EDE3DA', ['moschus', 'musk'], [], 'Sauber, weich und hautnah – wie frisch gewaschene Haut.'],
  ['amber', 'Amber', 'nach Amber', 'Frisch & sauber', N + 'amber.jpg', '#D9A04A', ['amber', 'ambra'], ['amberholz'], 'Warm, harzig und leicht süss – Amber macht Düfte golden und rund.'],
  ['minze', 'Minze', 'nach Minze', 'Frisch & sauber', N + 'minze.jpg', '#8FD1B0', ['minze'], [], 'Kühl, klar und belebend – Minze ist pure Frische.'],
  ['meer', 'Meer & Salz', 'nach Meer und Salz', 'Frisch & sauber', N + 'meersalz.jpg', '#7FB8D6', ['meer', 'ozean', 'salz', 'aquatisch'], [], 'Salzig, luftig und frisch – wie eine Brise am Strand.']
];

const CREAM = ['milch', 'sahne', 'rahm', 'joghurt', 'mascarpone', 'milk'];
const SPICE = ['zimt', 'gewürznelke', 'kardamom', 'ingwer', 'anis', 'muskat'];
const COMBOS: Record<string, string[][]> = {
  erdbeershake: [['erdbeer'], CREAM],
  vanilleshake: [['vanille'], CREAM],
  milchshake: [CREAM, ['vanille', 'erdbeer', 'kakao', 'schokolade', 'karamel', 'banane']],
  'mousse-au-chocolat': [['kakao', 'schokolade'], [...CREAM, 'vanille']],
  tiramisu: [['kaffee', 'espresso', 'mokka'], ['kakao', 'schokolade', ...CREAM]],
  schwarzwaelder: [['kirsch'], ['kakao', 'schokolade']],
  apfelstrudel: [['apfel'], ['zimt']],
  zimtstern: [['zimt'], ['mandel', 'marzipan']],
  magenbrot: [SPICE, ['honig', 'kakao', 'schokolade']],
  lebkuchen: [SPICE, ['honig', 'mandel', 'lebkuchen']],
  'salted-caramel': [['karamel', 'toffee'], ['salz']],
  'pina-colada': [['kokos'], ['ananas']],
  'chai-latte': [['tee', 'chai'], ['zimt', 'kardamom', 'ingwer']],
  'panna-cotta': [CREAM, ['vanille']],
  pistaziengipfel: [['pistazie'], ['croissant', 'gipfel', 'brioche', 'gebäck', 'butter', 'teig']],
  zimtschnecke: [['zimt'], ['gebäck', 'brioche', 'teig', 'butter', 'frosting', 'zuckerguss', 'karamel', 'sahne']],
  'caramel-latte': [['kaffee', 'espresso', 'mokka'], ['karamel', 'toffee']]
};
const COMBO_EXCLUDE = ['apfelblüte', 'granatapfel', 'muskatnuss', 'teer', 'tomate'];

export const FLAVORS: Flavor[] = ROWS.map(([slug, title, phrase, group, image, color, notes, exclude, intro]) => {
  const combo = COMBOS[slug];
  return combo
    ? { slug, title, phrase, group, image, color, notes: combo.flat(), exclude: [...exclude, ...COMBO_EXCLUDE], combo, intro }
    : { slug, title, phrase, group, image, color, notes, exclude, intro };
});

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
function noteHits(note: string, parts: string[], exclude: string[] = []): boolean {
  const l = note.toLowerCase();
  return parts.some((x) => l.includes(x)) && !exclude.some((x) => l.includes(x));
}

export function matchesFlavor(p: Perfume, flavor: Flavor): boolean {
  const all = notesOf(p);
  if (!all.length) return false;
  if (flavor.combo) return flavor.combo.every((parts) => all.some((n) => noteHits(n, parts, flavor.exclude)));
  return all.some((n) => noteHits(n, flavor.notes, flavor.exclude));
}

export function perfumesForFlavor(perfumes: Perfume[], flavor: Flavor): Perfume[] {
  return perfumes.filter((p) => p.slug && isWithinPriceCap(p) && matchesFlavor(p, flavor));
}

// In Google erst ab 3 verschiedenen Düften (sonst „dünne" Seite).
export const MIN_FLAVOR_FOR_INDEX = 3;
export function flavorIndexable(list: Perfume[]): boolean {
  return distinctFragranceCount(list) >= MIN_FLAVOR_FOR_INDEX;
}
