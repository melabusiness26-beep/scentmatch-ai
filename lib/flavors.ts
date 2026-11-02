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
  'Gebäck',
  'Milch & Cremiges',
  'Nüsse & Kerne',
  'Dessert-Kombis & Spezialitäten',
  'Früchte & Gemüse',
  'Zitrus',
  'Getränke',
  'Blumen',
  'Kräuter & Aromatisches',
  'Gewürze',
  'Hölzer & Erdiges',
  'Harze, Leder & Tabak',
  'Frisch & sauber'
] as const;
export type FlavorGroup = (typeof FLAVOR_GROUPS)[number];

const N = '/notes/';
// Kurzschreibweise: [slug, Titel, „nach …", Gruppe, Foto oder null, Farbe, Notenteile, Ausschlüsse, Einleitung]
type Row = [string, string, string, FlavorGroup, string | null, string, string[], string[], string];
const ROWS: Row[] = [
  // Süsses & Desserts
  ['vanille', 'Vanille', 'nach Vanille', 'Süsses & Desserts', N + 'vanille.jpg', '#E9D8B4', ['vanille', 'vanilla'], [], 'Vanille macht einen Duft weich und warm. Ideal, wenn du es gemütlich magst.'],
  ['honig', 'Honig', 'nach Honig', 'Süsses & Desserts', null, '#E7B54A', ['honig'], [], 'Honig riecht goldig und süss, oft mit einem leicht blumigen Unterton. Er gibt Düften Wärme.'],
  ['karamell', 'Karamell', 'nach Karamell', 'Süsses & Desserts', null, '#C07A3A', ['karamel', 'toffee', 'praline', 'praliné'], [], 'Gebrannter Zucker, Toffee und Praliné. Riecht ein bisschen wie in einer Confiserie.'],
  ['schokolade', 'Schokolade', 'nach Schokolade', 'Süsses & Desserts', null, '#5B3A29', ['kakao', 'schokolade'], [], 'Kakao und Schokolade machen einen Duft warm und genussvoll, manchmal auch ein bisschen dekadent.'],
  ['kekse', 'Kekse & Plätzchen', 'nach Keksen und Plätzchen', 'Süsses & Desserts', null, '#D9A86C', ['keks', 'biscuit', 'cookie', 'plätzchen', 'brioche', 'gebäck'], [], 'Düfte, die nach frischen Plätzchen und Bäckerei riechen. Perfekt für alle, die es süss und gemütlich mögen.'],
  ['cupcake', 'Cupcake & Kuchen', 'nach Cupcake und Kuchen', 'Süsses & Desserts', null, '#F2B8C6', ['cupcake', 'kuchen', 'torte', 'frosting', 'zuckerguss', 'glasur'], [], 'Süss und cremig, ein bisschen wie ein Cupcake mit Frosting obendrauf.'],
  ['butter', 'Butter & Sahne', 'nach Butter und Sahne', 'Süsses & Desserts', null, '#F2E3B3', ['butter', 'sahne', 'rahm', 'milch'], ['butterblume'], 'Butter und Sahne machen Düfte weich und cremig. Sie erinnern an ein warmes Dessert.'],
  ['marshmallow', 'Marshmallow', 'nach Marshmallow', 'Süsses & Desserts', null, '#F6D6E4', ['marshmallow', 'baiser', 'meringue'], [], 'Luftig und zuckrig, wie ein Marshmallow, das über dem Feuer geröstet wird.'],
  ['pistazie', 'Pistazie', 'nach Pistazie', 'Süsses & Desserts', null, '#A9C27A', ['pistazie'], [], 'Pistazie riecht nussig und cremig, mit einem kleinen grünen Einschlag. Sie ist gerade sehr beliebt.'],
  ['nuesse', 'Alle Nüsse', 'nach Nüssen', 'Süsses & Desserts', null, '#B98B5E', ['mandel', 'haselnuss', 'walnuss', 'nuss'], ['muskatnuss', 'kokosnuss'], 'Mandel, Haselnuss und Co. riechen geröstet und warm. Sie machen Düfte gemütlich.'],
  ['tonkabohne', 'Tonkabohne', 'nach Tonkabohne', 'Süsses & Desserts', N + 'tonkabohne.jpg', '#8B6B4A', ['tonka'], [], 'Tonka riecht nach Mandel und Vanille, dazu ein Hauch Heu. Sie macht Düfte warm und rund.'],
  ['marzipan', 'Marzipan', 'nach Marzipan', 'Süsses & Desserts', null, '#EBD9B5', ['marzipan'], [], 'Süss und mandelig. Marzipan riecht nach Confiserie und Feiertagen.'],
  ['mandel', 'Mandel', 'nach Mandel', 'Süsses & Desserts', null, '#D8B48A', ['mandel'], ['mandelblüte'], 'Mandel riecht warm, weich und leicht süss. Ein gemütlicher Duft.'],
  ['haselnuss', 'Haselnuss', 'nach Haselnuss', 'Süsses & Desserts', null, '#A8743F', ['haselnuss', 'nougat'], [], 'Geröstet und cremig, ein bisschen wie Nougat oder Nuss-Schokolade.'],
  ['walnuss', 'Walnuss', 'nach Walnuss', 'Süsses & Desserts', null, '#8C6A45', ['walnuss'], [], 'Walnuss ist herb und nussig. In Parfums findet man sie eher selten.'],
  ['milch', 'Milch', 'nach Milch', 'Süsses & Desserts', null, '#F4EFE6', ['milch', 'milk'], [], 'Milchnoten sind weich und cremig. Sie wirken beruhigend, fast wie eine warme Umarmung.'],
  ['praline', 'Praliné & Nougat', 'nach Praliné', 'Süsses & Desserts', null, '#9A6A44', ['praline', 'praliné', 'nougat', 'gianduja'], [], 'Nussig und süss, wie eine Praline, die langsam schmilzt.'],
  ['creme', 'Crème brûlée & Pudding', 'nach Crème brûlée', 'Süsses & Desserts', null, '#EAC57E', ['brûlée', 'brulee', 'custard', 'pudding', 'vanillecreme', 'crème'], [], 'Cremig mit einer Kruste aus karamellisiertem Zucker. Ein Klassiker unter den Desserts.'],
  ['macaron', 'Macaron', 'nach Macaron', 'Süsses & Desserts', null, '#F3C1CF', ['macaron'], [], 'Zart und mandelig, wie ein Macaron aus der Pâtisserie.'],
  ['popcorn', 'Popcorn', 'nach Popcorn', 'Süsses & Desserts', null, '#F4E2A8', ['popcorn'], [], 'Buttrig und süss-salzig, ein bisschen wie im Kino.'],
  ['zuckerwatte', 'Zuckerwatte', 'nach Zuckerwatte', 'Süsses & Desserts', null, '#F7C6DA', ['zuckerwatte', 'candy floss', 'cotton candy'], [], 'Luftig und zuckrig. Riecht nach Jahrmarkt.'],
  ['bonbon', 'Bonbon', 'nach Bonbon', 'Süsses & Desserts', null, '#F59CC0', ['bonbon', 'lutscher', 'candy'], ['candy floss', 'cotton candy'], 'Bunt und süss. Düfte für gute Laune.'],
  ['kaugummi', 'Kaugummi', 'nach Kaugummi', 'Süsses & Desserts', null, '#F7A8D0', ['kaugummi', 'bubblegum', 'bubble gum'], [], 'Rosa und süss, wie Bubblegum.'],
  ['lakritz', 'Lakritz', 'nach Lakritz', 'Süsses & Desserts', null, '#2F2A2A', ['lakritz', 'süssholz', 'süßholz'], [], 'Lakritz ist süss und würzig zugleich. Man liebt sie oder man mag sie gar nicht.'],
  ['ahornsirup', 'Ahornsirup', 'nach Ahornsirup', 'Süsses & Desserts', null, '#B5722E', ['ahorn', 'maple'], [], 'Warm und karamellig, mit einem leicht rauchigen Ton. Wie Pancakes mit Sirup.'],
  ['marroni', 'Marroni', 'nach Marroni', 'Süsses & Desserts', null, '#7B4A2E', ['kastanie', 'marron'], ['rosskastanie'], 'Geröstet und süss. Riecht nach heissen Marroni an einem kalten Tag.'],
  ['gipfeli', 'Gipfeli & Croissant', 'nach Gipfeli', 'Süsses & Desserts', null, '#E2B36E', ['croissant', 'gipfel', 'brioche'], [], 'Buttrig und goldbraun, wie ein frisches Gipfeli am Sonntagmorgen.'],
  ['zucker', 'Zucker', 'nach Zucker', 'Süsses & Desserts', null, '#F5EEE6', ['zucker', 'sugar', 'kandis'], ['zuckerrohr'], 'Süss und hell, wie karamellisierter Zucker auf einem Dessert.'],
  ['weisse-schokolade', 'Weisse Schokolade', 'nach weisser Schokolade', 'Süsses & Desserts', null, '#F3E8D2', ['weisse schokolade', 'weiße schokolade', 'white chocolate'], [], 'Weisse Schokolade riecht cremig und milchig. Sie ist sanfter als jede andere Schokolade.'],
  ['milchschokolade', 'Milchschokolade', 'nach Milchschokolade', 'Süsses & Desserts', null, '#8B5A3C', ['milchschokolade', 'milk chocolate'], [], 'Schmelzend und süss, wie ein Stück Milchschokolade.'],
  ['dunkle-schokolade', 'Dunkle Schokolade', 'nach dunkler Schokolade', 'Süsses & Desserts', null, '#3E2620', ['dunkle schokolade', 'bitterschokolade', 'zartbitter', 'dark chocolate'], [], 'Herb und tief. Dunkle Schokolade wirkt erwachsener als ihre süssen Geschwister.'],
  ['eiscreme', 'Eiscreme', 'nach Eiscreme', 'Süsses & Desserts', null, '#F6E1E6', ['eiscreme', 'speiseeis', 'gelato', 'glace', 'ice cream', 'sorbet'], [], 'Kühl und cremig, wie eine Kugel Glace im Sommer.'],
  ['donut', 'Donut', 'nach Donut', 'Süsses & Desserts', null, '#E9A6B8', ['donut', 'doughnut', 'krapfen'], [], 'Zuckrig und frittiert, wie ein frischer Donut mit Glasur.'],
  ['spekulatius', 'Spekulatius & Karamellkeks', 'nach Karamellkeks', 'Süsses & Desserts', null, '#B97A45', ['spekulatius', 'speculoos', 'karamellkeks', 'biscoff'], [], 'Karamellisiert und leicht würzig, wie ein Karamellkeks zum Kaffee.'],
  ['gummibaerchen', 'Gummibärchen', 'nach Gummibärchen', 'Süsses & Desserts', null, '#F28C8C', ['gummibär', 'fruchtgummi', 'gummy'], [], 'Fruchtig, bunt und verspielt. Düfte für das Kind in dir.'],
  ['erdnuss', 'Erdnuss & Erdnussbutter', 'nach Erdnuss', 'Süsses & Desserts', null, '#C89A5E', ['erdnuss', 'peanut'], [], 'Geröstet, cremig und ein bisschen salzig. Eine ungewöhnliche Note.'],
  ['waffel', 'Waffeln', 'nach Waffeln', 'Süsses & Desserts', null, '#E0B26E', ['waffel', 'waffle'], [], 'Knusprig und buttrig, wie frische Waffeln vom Eisen.'],
  ['joghurt', 'Joghurt', 'nach Joghurt', 'Süsses & Desserts', null, '#F5F1EA', ['joghurt', 'yoghurt', 'yogurt'], [], 'Frisch, cremig und leicht säuerlich. Sauber und weich zugleich.'],
  ['pinienkerne', 'Pinienkerne', 'nach Pinienkernen', 'Süsses & Desserts', null, '#E2C99A', ['pinienkern', 'pine nut'], [], 'Mild und nussig, mit einem leicht harzigen Ton. Eine feine, seltene Note.'],
  // Dessert-Kombis & Spezialitäten (passen nur, wenn ALLE Bestandteile vorkommen)
  ['erdbeershake', 'Erdbeershake', 'nach Erdbeershake', 'Getränke', null, '#F4A7B9', [], [], 'Erdbeere zusammen mit Milch oder Sahne. Fruchtig und cremig.'],
  ['vanilleshake', 'Vanilleshake', 'nach Vanilleshake', 'Getränke', null, '#F3E4C4', [], [], 'Vanille mit Milch oder Sahne. Weich, süss und gemütlich.'],
  ['milchshake', 'Milchshake', 'nach Milchshake', 'Getränke', null, '#F2D9E1', [], [], 'Milch oder Sahne mit etwas Süssem, wie ein Shake im Diner.'],
  ['mousse-au-chocolat', 'Mousse au Chocolat', 'nach Mousse au Chocolat', 'Dessert-Kombis & Spezialitäten', null, '#6B4430', [], [], 'Schokolade mit Sahne oder Vanille. Luftig, cremig und ziemlich dekadent.'],
  ['tiramisu', 'Tiramisu', 'nach Tiramisu', 'Dessert-Kombis & Spezialitäten', null, '#A57C5B', [], [], 'Kaffee mit Kakao oder Sahne, ganz wie das italienische Dessert.'],
  ['schwarzwaelder', 'Schwarzwälder Kirsch', 'nach Schwarzwälder Kirsch', 'Dessert-Kombis & Spezialitäten', null, '#5A1E24', [], [], 'Kirsche und Schokolade. Dunkel, fruchtig und verführerisch.'],
  ['apfelstrudel', 'Apfelstrudel', 'nach Apfelstrudel', 'Dessert-Kombis & Spezialitäten', null, '#C98B4E', [], [], 'Apfel und Zimt. Warm und süss, wie frisch aus dem Ofen.'],
  ['zimtstern', 'Zimtstern', 'nach Zimtstern', 'Dessert-Kombis & Spezialitäten', null, '#C7955E', [], [], 'Zimt und Mandel, wie das Schweizer Weihnachtsgebäck.'],
  ['magenbrot', 'Magenbrot', 'nach Magenbrot', 'Dessert-Kombis & Spezialitäten', null, '#6A3F2A', [], [], 'Gewürze mit Honig oder Schokolade, wie Magenbrot vom Herbstmarkt.'],
  ['lebkuchen', 'Lebkuchen', 'nach Lebkuchen', 'Dessert-Kombis & Spezialitäten', null, '#8E5A34', [], [], 'Zimt, Nelke und andere Gewürze mit Honig oder Mandel. Würzig und süss wie an Weihnachten.'],
  ['salted-caramel', 'Salted Caramel', 'nach Salted Caramel', 'Dessert-Kombis & Spezialitäten', null, '#C08A4A', [], [], 'Karamell mit einer Prise Salz. Süss, salzig und ziemlich verführerisch.'],
  ['pina-colada', 'Piña Colada', 'nach Piña Colada', 'Getränke', null, '#F4E3A1', [], [], 'Kokos und Ananas. Ferien im Glas.'],
  ['chai-latte', 'Chai Latte', 'nach Chai Latte', 'Getränke', null, '#B98A62', [], [], 'Tee mit Zimt, Kardamom oder Ingwer. Würzig und warm.'],
  ['panna-cotta', 'Panna Cotta', 'nach Panna Cotta', 'Dessert-Kombis & Spezialitäten', null, '#F5EBDD', [], [], 'Sahne und Vanille. Zart und cremig.'],
  ['pistaziengipfel', 'Pistaziengipfel', 'nach Pistaziengipfel', 'Dessert-Kombis & Spezialitäten', null, '#B7C98A', [], [], 'Pistazie mit buttrigem Gebäck. Nussig und frisch gebacken.'],
  ['zimtschnecke', 'Zimtschnecke', 'nach Zimtschnecke', 'Dessert-Kombis & Spezialitäten', null, '#C58B5A', [], [], 'Zimt mit Gebäck, Butter oder Karamell, wie direkt aus der Bäckerei.'],
  ['caramel-latte', 'Kaffee mit Karamell', 'nach Kaffee mit Karamell', 'Getränke', null, '#A9744A', [], [], 'Kaffee und Karamell, wie ein Caramel Latte zum Mitnehmen.'],
  ['fasnachtskuechlein', 'Fasnachtskuchen', 'nach Fasnachtskuchen', 'Dessert-Kombis & Spezialitäten', null, '#EED9B0', [], [], 'Knuspriges Gebäck mit viel Zucker, wie Fasnachtschüechli an der Fasnacht.'],
  ['haselnuss-waffel', 'Haselnuss-Waffel', 'nach Haselnuss-Waffel', 'Dessert-Kombis & Spezialitäten', null, '#C9935C', [], [], 'Haselnuss oder Nougat mit Waffel, Keks oder Milch. Knusprig und cremig.'],
  ['karamell-haselnuss', 'Karamell-Haselnuss', 'nach Karamell und Haselnuss', 'Dessert-Kombis & Spezialitäten', null, '#A06A3B', [], [], 'Karamell und Haselnuss, wie eine kleine Praline.'],
  ['apfelkuchen', 'Apfelkuchen', 'nach Apfelkuchen', 'Dessert-Kombis & Spezialitäten', null, '#D7A15F', [], [], 'Apfel mit Kuchen, Gebäck oder Butter. Wie bei Grossmutter am Sonntag.'],
  ['erdbeer-cheesecake', 'Erdbeer-Cheesecake', 'nach Erdbeer-Cheesecake', 'Dessert-Kombis & Spezialitäten', null, '#F3B4BE', [], [], 'Erdbeere mit Frischkäse, Sahne oder Keksboden. Fruchtig und cremig.'],
  ['brownie', 'Brownie', 'nach Brownie', 'Dessert-Kombis & Spezialitäten', null, '#4E3024', [], [], 'Schokolade mit Gebäck, Butter oder Nüssen. Saftig und dekadent.'],
  ['bananenbrot', 'Bananenbrot', 'nach Bananenbrot', 'Dessert-Kombis & Spezialitäten', null, '#C8955A', [], [], 'Banane mit Gebäck, Zimt oder Butter. Warm und gemütlich.'],
  ['zitronenkuchen', 'Zitronenkuchen', 'nach Zitronenkuchen', 'Dessert-Kombis & Spezialitäten', null, '#F1D77A', [], [], 'Zitrone mit Kuchen, Butter oder Zuckerguss. Frisch und süss zugleich.'],
  ['latte', 'Latte Macchiato', 'nach Latte Macchiato', 'Getränke', null, '#C9A27E', [], [], 'Kaffee mit Milch oder Sahne. Weich und warm.'],
  ['mojito', 'Mojito', 'nach Mojito', 'Getränke', null, '#9FD39B', [], [], 'Limette und Minze. Frisch und spritzig, wie ein Sommerabend.'],
  ['sangria', 'Sangria', 'nach Sangria', 'Getränke', null, '#8E2238', [], [], 'Wein mit Orange oder anderen Früchten. Fruchtig und sommerlich.'],
  // Früchte
  ['erdbeere', 'Erdbeere', 'nach Erdbeere', 'Früchte & Gemüse', null, '#E36A6A', ['erdbeer'], [], 'Erdbeere ist saftig und süss. Sie macht einen Duft fröhlich und jung.'],
  ['himbeere', 'Himbeere', 'nach Himbeere', 'Früchte & Gemüse', N + 'himbeere.jpg', '#C2415E', ['himbeer'], [], 'Himbeere ist fruchtig und ein bisschen säuerlich. Sie bringt Farbe in einen Duft.'],
  ['beeren', 'Beeren & Waldbeeren', 'nach Beeren und Waldbeeren', 'Früchte & Gemüse', N + 'cassis.jpg', '#6B2D4F', ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'cranberry', 'maulbeer', 'beere'], ['pfefferbeere', 'wacholderbeere'], 'Himbeere, Cassis, Brombeere und Co. Fruchtig, frisch und ein bisschen frech.'],
  ['blaubeere', 'Blaubeere', 'nach Blaubeere', 'Früchte & Gemüse', null, '#4D5FA3', ['heidelbeer', 'blaubeer', 'blueberry'], [], 'Fruchtig und leicht säuerlich. Blaubeere wirkt verspielt.'],
  ['brombeere', 'Brombeere', 'nach Brombeere', 'Früchte & Gemüse', null, '#3F2445', ['brombeer', 'blackberry'], [], 'Brombeere ist dunkel und saftig, mit einem herben Ton.'],
  ['kirsche', 'Kirsche', 'nach Kirsche', 'Früchte & Gemüse', null, '#9E1F35', ['kirsch'], [], 'Dunkel und saftig. Kirsche ist ein Liebling vieler süsser Düfte.'],
  ['pfirsich', 'Pfirsich', 'nach Pfirsich', 'Früchte & Gemüse', N + 'pfirsich.jpg', '#F4B183', ['pfirsich'], [], 'Pfirsich ist samtig und sanft süss. Er macht einen Duft weich.'],
  ['weisser-pfirsich', 'Weisser Pfirsich', 'nach weissem Pfirsich', 'Früchte & Gemüse', null, '#F7DCCB', ['weisser pfirsich', 'weißer pfirsich', 'white peach'], [], 'Zarter und heller als der gelbe Pfirsich. Samtig und elegant.'],
  ['aprikose', 'Aprikose', 'nach Aprikose', 'Früchte & Gemüse', null, '#F2A65A', ['aprikose'], [], 'Aprikose ist sonnig und samtig. Sie wirkt warm und fröhlich.'],
  ['mango', 'Mango', 'nach Mango', 'Früchte & Gemüse', null, '#F5B841', ['mango'], [], 'Tropisch und saftig. Mango bringt Ferienstimmung.'],
  ['ananas', 'Ananas', 'nach Ananas', 'Früchte & Gemüse', null, '#F2D14B', ['ananas'], [], 'Ananas ist spritzig, süss und tropisch.'],
  ['banane', 'Banane', 'nach Banane', 'Früchte & Gemüse', null, '#F3E07A', ['banane'], [], 'Cremig und süss. Banane macht Düfte weich und überraschend gourmandig.'],
  ['melone', 'Melone', 'nach Melone', 'Früchte & Gemüse', null, '#9ED79B', ['melone'], [], 'Melone ist wässrig und frisch. Gut für heisse Tage.'],
  ['wassermelone', 'Wassermelone', 'nach Wassermelone', 'Früchte & Gemüse', null, '#F07A86', ['wassermelone', 'watermelon'], [], 'Wässrig, süss und erfrischend. Der Sommer in einem Biss.'],
  ['honigmelone', 'Honigmelone', 'nach Honigmelone', 'Früchte & Gemüse', null, '#F2C27A', ['honigmelone', 'cantaloupe', 'zuckermelone'], [], 'Süss und saftig, etwas weicher als die Wassermelone.'],
  ['birne', 'Birne', 'nach Birne', 'Früchte & Gemüse', N + 'birne.jpg', '#C9D46A', ['birne'], [], 'Birne ist saftig und hell, mit einer leichten Süsse.'],
  ['apfel', 'Apfel', 'nach Apfel', 'Früchte & Gemüse', N + 'apfel.jpg', '#9BC46A', ['apfel'], ['apfelblüte', 'granatapfel'], 'Knackig und frisch. Apfel macht einen Duft lebendig.'],
  ['pflaume', 'Pflaume', 'nach Pflaume', 'Früchte & Gemüse', null, '#6E3B5C', ['pflaume'], [], 'Reif und dunkel. Pflaume gibt Düften Tiefe.'],
  ['kiwi', 'Kiwi', 'nach Kiwi', 'Früchte & Gemüse', null, '#8DB33A', ['kiwi'], [], 'Grün und säuerlich. Eine spritzige, eher seltene Note.'],
  ['quitte', 'Quitte', 'nach Quitte', 'Früchte & Gemüse', null, '#E7C74E', ['quitte', 'quince'], [], 'Herb und blumig zugleich. Eine alte Frucht mit viel Charakter.'],
  ['kuerbis', 'Kürbis', 'nach Kürbis', 'Früchte & Gemüse', null, '#E0782E', ['kürbis', 'pumpkin'], [], 'Warm und herbstlich, wie Pumpkin Spice im Oktober.'],
  ['litschi', 'Litschi', 'nach Litschi', 'Früchte & Gemüse', null, '#F0C9CF', ['litschi', 'lychee', 'litchi'], [], 'Zart, fruchtig und ein bisschen blumig.'],
  ['feige', 'Feige', 'nach Feige', 'Früchte & Gemüse', N + 'feige.jpg', '#7D5A7A', ['feige'], [], 'Feige riecht grün, milchig und leicht süss. Wie Sommer im Süden.'],
  ['kokos', 'Kokos', 'nach Kokos', 'Früchte & Gemüse', N + 'kokos.jpg', '#F1EBDD', ['kokos'], [], 'Cremig und sonnig. Kokos riecht nach Strand und Ferien.'],
  ['dattel', 'Datteln', 'nach Datteln', 'Früchte & Gemüse', null, '#7A4A2A', ['dattel'], [], 'Süss, weich und karamellig. Man findet sie oft in orientalischen Düften.'],
  ['passionsfrucht', 'Passionsfrucht', 'nach Passionsfrucht', 'Früchte & Gemüse', null, '#E5A33D', ['passionsfrucht', 'maracuja'], [], 'Exotisch, saftig und süss-säuerlich.'],
  ['granatapfel', 'Granatapfel', 'nach Granatapfel', 'Früchte & Gemüse', null, '#B8323F', ['granatapfel'], [], 'Saftig und leicht herb. Granatapfel wirkt frisch und edel.'],
  ['rhabarber', 'Rhabarber', 'nach Rhabarber', 'Früchte & Gemüse', null, '#D96C7B', ['rhabarber'], [], 'Säuerlich und grün. Eine Note, die überrascht.'],
  // Zitrus
  ['zitrone', 'Zitrone', 'nach Zitrone', 'Zitrus', N + 'zitrone.jpg', '#F2D64B', ['zitrone', 'yuzu'], ['zitronengras', 'zitronenmelisse'], 'Spritzig und hell. Zitrone ist der Klassiker für warme Tage.'],
  ['limette', 'Limette', 'nach Limette', 'Zitrus', null, '#9CCB4F', ['limette', 'lime'], ['limettenblüte'], 'Grün und spritzig, wie ein kühler Drink an einem heissen Tag.'],
  ['orange', 'Orange', 'nach Orange', 'Zitrus', N + 'orange.jpg', '#F28C28', ['orange'], ['orangenblüte'], 'Saftig und sonnig. Orange macht einen Duft fröhlich.'],
  ['bitterorange', 'Bitterorange', 'nach Bitterorange', 'Zitrus', null, '#E2742A', ['bitterorange', 'pomeranze'], [], 'Herber und grüner als die normale Orange. Elegant und klar.'],
  ['mandarine', 'Mandarine', 'nach Mandarine', 'Zitrus', N + 'mandarine.jpg', '#F49A3A', ['mandarine'], [], 'Süsser und weicher als andere Zitrusfrüchte.'],
  ['grapefruit', 'Grapefruit', 'nach Grapefruit', 'Zitrus', N + 'grapefruit.jpg', '#F07C6C', ['grapefruit', 'pampelmuse'], [], 'Herb und spritzig. Grapefruit weckt auf.'],
  ['bergamotte', 'Bergamotte', 'nach Bergamotte', 'Zitrus', N + 'bergamotte.jpg', '#C9D65A', ['bergamotte'], [], 'Frisch und leicht blumig. Bergamotte steckt in sehr vielen Düften ganz am Anfang.'],
  // Getränke
  ['kaffee', 'Kaffee', 'nach Kaffee', 'Getränke', null, '#6F4E37', ['kaffee', 'espresso', 'mokka'], [], 'Geröstet und warm. Kaffee gibt süssen Düften Tiefe.'],
  ['tee', 'Tee', 'nach Tee', 'Getränke', null, '#9DB07A', ['tee', 'matcha', 'mate'], ['teer', 'tomate'], 'Tee wirkt ruhig, klar und leicht herb.'],
  ['eistee', 'Eistee', 'nach Eistee', 'Getränke', null, '#D9A35A', ['eistee', 'ice tea', 'iced tea'], [], 'Kühl, fruchtig und ein bisschen herb, wie ein Glas Eistee im Sommer.'],
  ['cola', 'Cola', 'nach Cola', 'Getränke', null, '#5A2E1E', ['cola'], ['kolanuss', 'chocolat'], 'Spritzig, süss und leicht würzig. Eine verspielte Note.'],
  ['limonade', 'Limonade', 'nach Limonade', 'Getränke', null, '#F2E27A', ['limonade', 'lemonade'], [], 'Zitrus mit Zucker und Prickeln, wie eine kalte Limo.'],
  ['orangensaft', 'Orangensaft', 'nach Orangensaft', 'Getränke', null, '#F59B2C', ['orangensaft', 'orange juice'], [], 'Saftig, süss und sonnig, wie frisch gepresster Orangensaft.'],
  ['matcha', 'Matcha', 'nach Matcha', 'Getränke', null, '#8DB255', ['matcha'], [], 'Grün, cremig und leicht herb.'],
  ['rum', 'Rum', 'nach Rum', 'Getränke', null, '#7A4B2A', ['rum'], ['rumänisch'], 'Rum riecht warm und süss. Er macht Düfte sinnlich.'],
  ['whisky', 'Whisky', 'nach Whisky', 'Getränke', null, '#A8682B', ['whisky', 'whiskey', 'bourbon'], [], 'Rauchig und warm. Passt gut zu Abenddüften.'],
  ['cognac', 'Cognac', 'nach Cognac', 'Getränke', null, '#9B5A2B', ['cognac', 'brandy'], [], 'Weich und fruchtig. Cognac gibt Düften Tiefe.'],
  ['champagner', 'Champagner', 'nach Champagner', 'Getränke', null, '#EBDCA5', ['champagner', 'prosecco', 'sekt'], [], 'Prickelnd und festlich. Ein Duft zum Anstossen.'],
  ['wein', 'Wein', 'nach Wein', 'Getränke', null, '#7B1E3A', ['wein'], ['weinblatt', 'weintraube'], 'Fruchtig und dunkel. Weinnoten wirken erwachsen.'],
  // Blumen
  ['rose', 'Rose', 'nach Rose', 'Blumen', N + 'rose.jpg', '#D96A86', ['rose'], ['rosenholz', 'rosengeranie'], 'Die Rose kann ganz verschieden riechen, mal frisch und leicht, mal samtig und tief.'],
  ['rosenwasser', 'Rosenwasser', 'nach Rosenwasser', 'Blumen', null, '#F4C6CF', ['rosenwasser', 'rose water'], [], 'Zart und frisch. Heller und leichter als die Rose selbst.'],
  ['jasmin', 'Jasmin', 'nach Jasmin', 'Blumen', N + 'jasmin.jpg', '#F3EBD3', ['jasmin'], [], 'Jasmin ist blumig und sinnlich. Er steckt in sehr vielen Damendüften.'],
  ['lavendel', 'Lavendel', 'nach Lavendel', 'Blumen', N + 'lavendel.jpg', '#9D8FC9', ['lavendel', 'lavandin'], [], 'Frisch, sauber und beruhigend. Ein Klassiker.'],
  ['iris', 'Iris', 'nach Iris', 'Blumen', N + 'iris.jpg', '#A99BC7', ['iris', 'veilchenwurzel'], [], 'Iris riecht pudrig und kühl, ein bisschen wie edler Puder.'],
  ['orangenbluete', 'Orangenblüte & Neroli', 'nach Orangenblüte', 'Blumen', N + 'neroli.jpg', '#F6E7C1', ['orangenblüte', 'neroli'], [], 'Hell und sauber. Orangenblüte wirkt wie Sonne auf der Haut.'],
  ['frangipani', 'Frangipani', 'nach Frangipani', 'Blumen', N + 'frangipani.jpg', '#F7D9A8', ['frangipani', 'plumeria'], [], 'Cremig und tropisch. Riecht nach Inselurlaub.'],
  ['lilie', 'Lilie', 'nach Lilie', 'Blumen', null, '#F4EEE2', ['lilie', 'lily'], ['lily of the valley', 'maiglöckchen'], 'Eine grosse, weisse Blüte, edel und leicht würzig.'],
  ['nelke-bluete', 'Nelke (Blüte)', 'nach Nelkenblüte', 'Blumen', null, '#E46A7E', ['nelke', 'carnation'], ['gewürznelke', 'nelkenpfeffer'], 'Blumig mit einem würzigen Ton. Gemeint ist die Blüte, nicht das Gewürz.'],
  ['tuberose', 'Tuberose', 'nach Tuberose', 'Blumen', null, '#F6EFE3', ['tuberose'], [], 'Cremig, üppig und sinnlich. Eine der kräftigsten weissen Blüten.'],
  ['pfingstrose', 'Pfingstrose', 'nach Pfingstrose', 'Blumen', null, '#F1A7BF', ['pfingstrose'], [], 'Frisch und rosig, aber zarter als die Rose.'],
  ['veilchen', 'Veilchen', 'nach Veilchen', 'Blumen', null, '#8C6BB1', ['veilchen'], ['veilchenwurzel'], 'Pudrig, süss und ein bisschen nostalgisch.'],
  ['maigloeckchen', 'Maiglöckchen', 'nach Maiglöckchen', 'Blumen', null, '#E6F0D8', ['maiglöckchen'], [], 'Grün, hell und sauber. Riecht nach Frühling.'],
  // Kräuter & Aromatisches
  ['salbei', 'Salbei', 'nach Salbei', 'Kräuter & Aromatisches', null, '#9AAE8C', ['salbei', 'sage'], [], 'Krautig, würzig und leicht herb. Salbei wirkt klar und erwachsen.'],
  ['basilikum', 'Basilikum', 'nach Basilikum', 'Kräuter & Aromatisches', null, '#5E9B4A', ['basilikum', 'basil'], [], 'Grün und frisch mit einem pfeffrigen Ton, wie ein Kräutergarten im Sommer.'],
  ['rosmarin', 'Rosmarin', 'nach Rosmarin', 'Kräuter & Aromatisches', N + 'rosmarin.jpg', '#6F8F5B', ['rosmarin', 'rosemary'], [], 'Harzig und frisch. Rosmarin steckt in vielen mediterranen Düften.'],
  ['thymian', 'Thymian', 'nach Thymian', 'Kräuter & Aromatisches', null, '#7E9467', ['thymian', 'thyme'], [], 'Warm und würzig. Erinnert an die Provence.'],
  ['estragon', 'Estragon', 'nach Estragon', 'Kräuter & Aromatisches', null, '#8FAF6A', ['estragon', 'tarragon'], [], 'Grün, frisch und leicht anisartig. Eine seltene Note.'],
  ['koriander', 'Koriander', 'nach Koriander', 'Kräuter & Aromatisches', N + 'koriander.jpg', '#A7B57A', ['koriander', 'coriander'], [], 'Würzig und frisch, mit einem zitronigen Ton.'],
  ['kuemmel', 'Kümmel & Kreuzkümmel', 'nach Kümmel', 'Kräuter & Aromatisches', null, '#9C7B4A', ['kümmel', 'cumin', 'caraway'], [], 'Würzig und warm. Eine mutige Note mit viel Charakter.'],
  ['anis', 'Anis & Sternanis', 'nach Anis', 'Kräuter & Aromatisches', null, '#6B4A3A', ['anis', 'sternanis', 'star anise'], ['anisch'], 'Süsslich und würzig, ein bisschen wie Lakritz. Sternanis kennt man aus dem Glühwein.'],
  ['wacholder', 'Wacholder', 'nach Wacholder', 'Kräuter & Aromatisches', N + 'wacholder.jpg', '#4F6B7A', ['wacholder', 'juniper'], [], 'Frisch und harzig, ein bisschen wie Gin.'],
  ['tanne', 'Tanne & Nadelholz', 'nach Tanne', 'Kräuter & Aromatisches', null, '#3F6A4E', ['tanne', 'fichte', 'kiefer', 'pinie', 'nadel', 'fir', 'pine'], ['pinienkern', 'pine nut', 'pineapple'], 'Harzig, grün und frisch, wie ein Spaziergang im Winterwald.'],
  // Gewürze & Hölzer
  ['zimt', 'Zimt', 'nach Zimt', 'Gewürze', N + 'zimt.jpg', '#A0522D', ['zimt'], [], 'Zimt ist warm, würzig und süss. Er erinnert an Herbst und Weihnachten.'],
  ['pfeffer', 'Pfeffer', 'nach Pfeffer', 'Gewürze', N + 'pfeffer.jpg', '#5E4B3C', ['pfeffer'], ['pfefferminz'], 'Pfeffer prickelt und macht einen Duft lebendig.'],
  ['muskatnuss', 'Muskatnuss', 'nach Muskatnuss', 'Gewürze', null, '#8A5A3B', ['muskat'], ['muskatell'], 'Warm und würzig, mit einer leichten Süsse. Ein typisches Wintergewürz.'],
  ['gewuerze', 'Alle Gewürze', 'nach Gewürzen', 'Gewürze', null, '#9C4A2A', ['zimt', 'gewürz', 'pfeffer', 'kardamom', 'ingwer', 'safran', 'muskat', 'anis', 'kümmel', 'koriander', 'gewürznelke'], ['pfefferminz', 'anisch', 'muskatell'], 'Zimt, Pfeffer, Kardamom und Co. Würzige Düfte mit Wärme und Charakter.'],
  ['holz', 'Alle Hölzer', 'nach Holz', 'Gewürze', N + 'zedernholz.jpg', '#8A6744', ['holz', 'zeder', 'sandel', 'oud', 'guajak', 'kaschmeran', 'vetiver'], [], 'Zedernholz, Sandelholz, Oud und Co. Holz macht Düfte warm und ruhig.'],
  ['sandelholz', 'Sandelholz', 'nach Sandelholz', 'Gewürze', N + 'sandelholz.jpg', '#C9A27A', ['sandel'], [], 'Sandelholz ist cremig, weich und warm.'],
  ['zedernholz', 'Zedernholz', 'nach Zedernholz', 'Gewürze', N + 'zedernholz.jpg', '#9C7A55', ['zeder'], [], 'Trocken und klar. Zeder gibt einem Duft Halt.'],
  ['oud', 'Oud', 'nach Oud', 'Gewürze', N + 'oud.jpg', '#4A3324', ['oud', 'adlerholz'], [], 'Dunkel, rauchig und intensiv. Oud ist ein kostbares Holz aus dem Orient.'],
  ['leder', 'Leder', 'nach Leder', 'Gewürze', N + 'leder.jpg', '#6B4530', ['leder'], [], 'Leder riecht weich, leicht rauchig und selbstbewusst.'],
  ['tabak', 'Tabak', 'nach Tabak', 'Gewürze', N + 'tabak.jpg', '#8A6239', ['tabak'], [], 'Warm, süsslich und würzig, wie getrocknete Tabakblätter.'],
  ['weihrauch', 'Weihrauch', 'nach Weihrauch', 'Gewürze', N + 'weihrauch.jpg', '#B7A88E', ['weihrauch', 'olibanum'], [], 'Harzig, rauchig und ein bisschen geheimnisvoll.'],
  ['patchouli', 'Patchouli', 'nach Patchouli', 'Gewürze', N + 'patchouli.jpg', '#5F5A3A', ['patchouli'], [], 'Erdig und dunkel. Patchouli macht einen Duft markant.'],
  ['vetiver', 'Vetiver', 'nach Vetiver', 'Gewürze', N + 'vetiver.jpg', '#7C7A4E', ['vetiver'], [], 'Erdig und grün, mit einem rauchigen Ton. Elegant und trocken.'],
  ['kardamom', 'Kardamom', 'nach Kardamom', 'Gewürze', null, '#9AA86A', ['kardamom'], [], 'Frisch und würzig zugleich. Kardamom macht Düfte lebendig.'],
  ['ingwer', 'Ingwer', 'nach Ingwer', 'Gewürze', null, '#D9A54A', ['ingwer'], [], 'Scharf, frisch und prickelnd. Ingwer weckt auf.'],
  ['safran', 'Safran', 'nach Safran', 'Gewürze', null, '#C8452E', ['safran'], [], 'Warm und leicht ledrig. Safran wirkt kostbar.'],
  ['nelke', 'Gewürznelke', 'nach Gewürznelke', 'Gewürze', null, '#6E3A2A', ['gewürznelke'], [], 'Warm, würzig und ein bisschen weihnachtlich.'],
  // Frisch & sauber
  ['moschus', 'Moschus', 'nach Moschus', 'Frisch & sauber', N + 'moschus.jpg', '#EDE3DA', ['moschus', 'musk'], ['muskat'], 'Sauber, weich und nah an der Haut, wie frisch gewaschen.'],
  ['amber', 'Amber', 'nach Amber', 'Frisch & sauber', N + 'amber.jpg', '#D9A04A', ['amber', 'ambra'], ['amberholz'], 'Warm, harzig und leicht süss. Amber macht Düfte golden und rund.'],
  ['moos', 'Moos', 'nach Moos', 'Frisch & sauber', N + 'eichenmoos.jpg', '#6F7F4A', ['moos'], [], 'Erdig und grün, wie ein Spaziergang im Wald.'],
  ['gruen', 'Grün', 'nach Grün', 'Frisch & sauber', N + 'gruene-noten.jpg', '#7FA65A', ['grüne note', 'gras', 'blätter', 'blatt', 'grün'], ['grasse', 'grüner apfel', 'grüne mandarine'], 'Frisch geschnittenes Gras und grüne Blätter. Natürlich und lebendig.'],
  ['salz', 'Salz', 'nach Salz', 'Frisch & sauber', null, '#E6E8EA', ['salz', 'salt'], [], 'Salzig und hautnah. Salz macht süsse und frische Düfte spannender.'],
  ['minze', 'Minze', 'nach Minze', 'Frisch & sauber', N + 'minze.jpg', '#8FD1B0', ['minze'], [], 'Kühl und klar. Minze ist pure Frische.'],
  ['meer', 'Meer & Ozean', 'nach Meer und Ozean', 'Frisch & sauber', N + 'meersalz.jpg', '#7FB8D6', ['meer', 'ozean', 'aquatisch', 'marin'], ['marinade', 'rosmarin'], 'Salzig und luftig, wie eine Brise am Strand.']
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
  'caramel-latte': [['kaffee', 'espresso', 'mokka'], ['karamel', 'toffee']],
  fasnachtskuechlein: [['gebäck', 'teig', 'kuchen', 'brioche', 'krapfen', 'donut'], ['zucker', 'puderzucker']],
  'haselnuss-waffel': [['haselnuss', 'nougat'], ['waffel', 'keks', 'biscuit', 'milch', 'sahne']],
  'karamell-haselnuss': [['karamel', 'toffee'], ['haselnuss', 'nougat']],
  apfelkuchen: [['apfel'], ['kuchen', 'gebäck', 'teig', 'butter', 'brioche', 'keks']],
  'erdbeer-cheesecake': [['erdbeer'], ['käse', 'cheesecake', 'frischkäse', 'sahne', 'rahm', 'keks', 'biscuit']],
  brownie: [['kakao', 'schokolade', 'brownie'], ['gebäck', 'kuchen', 'teig', 'butter', 'brownie', 'walnuss', 'haselnuss']],
  bananenbrot: [['banane'], ['gebäck', 'brot', 'kuchen', 'teig', 'zimt', 'butter']],
  zitronenkuchen: [['zitrone'], ['kuchen', 'gebäck', 'teig', 'butter', 'keks', 'zuckerguss', 'frosting']],
  latte: [['kaffee', 'espresso'], CREAM],
  mojito: [['limette'], ['minze']],
  sangria: [['wein', 'sangria'], ['orange', 'zitrone', 'beere', 'apfel', 'pfirsich', 'sangria']]
};
const COMBO_EXCLUDE = ['apfelblüte', 'granatapfel', 'muskatell', 'teer', 'tomate', 'anisch'];

// Genaue Einordnung (wie in Duft-Datenbanken üblich): Nüsse sind „nussig", nicht süss;
// Milchnoten sind cremig; Harze, Leder und Tabak sind weder Gewürz noch Holz.
const GROUP_OF: Record<string, FlavorGroup> = {
  kekse: 'Gebäck', cupcake: 'Gebäck', waffel: 'Gebäck', donut: 'Gebäck', spekulatius: 'Gebäck', gipfeli: 'Gebäck',
  milch: 'Milch & Cremiges', butter: 'Milch & Cremiges', joghurt: 'Milch & Cremiges',
  mandel: 'Nüsse & Kerne', haselnuss: 'Nüsse & Kerne', walnuss: 'Nüsse & Kerne', nuesse: 'Nüsse & Kerne',
  pistazie: 'Nüsse & Kerne', erdnuss: 'Nüsse & Kerne', pinienkerne: 'Nüsse & Kerne', marroni: 'Nüsse & Kerne',
  zimt: 'Gewürze', pfeffer: 'Gewürze', kardamom: 'Gewürze', ingwer: 'Gewürze', safran: 'Gewürze', nelke: 'Gewürze',
  muskatnuss: 'Gewürze', gewuerze: 'Gewürze',
  holz: 'Hölzer & Erdiges', sandelholz: 'Hölzer & Erdiges', zedernholz: 'Hölzer & Erdiges', oud: 'Hölzer & Erdiges',
  patchouli: 'Hölzer & Erdiges', vetiver: 'Hölzer & Erdiges', moos: 'Hölzer & Erdiges',
  minze: 'Kräuter & Aromatisches',
  weihrauch: 'Harze, Leder & Tabak', amber: 'Harze, Leder & Tabak', leder: 'Harze, Leder & Tabak', tabak: 'Harze, Leder & Tabak'
};

export const FLAVORS: Flavor[] = ROWS.map(([slug, title, phrase, rowGroup, image, color, notes, exclude, intro]) => {
  const group = GROUP_OF[slug] ?? rowGroup;
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
