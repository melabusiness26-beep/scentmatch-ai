// Geschmacks- und Notengruppen für die Suche: Wer „Beeren", „Honig" oder „strawberry"
// sucht, findet alle Düfte, deren Noten dazu passen (z. B. Beeren → Erdbeere, Himbeere,
// Cassis …). Die Noten sind auf Deutsch gespeichert; Suchbegriffe dürfen Deutsch
// (Ein- oder Mehrzahl) oder Englisch sein.

type NoteGroup = { terms: string[]; notes: string[] };

export const NOTE_GROUPS: NoteGroup[] = [
  {
    terms: ['beere', 'beeren', 'beerig', 'berry', 'berries'],
    notes: ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'cranberry', 'maulbeer', 'goji', 'beere']
  },
  { terms: ['erdbeere', 'erdbeeren', 'strawberry', 'strawberries'], notes: ['erdbeer'] },
  { terms: ['himbeere', 'himbeeren', 'raspberry'], notes: ['himbeer'] },
  { terms: ['kirsche', 'kirschen', 'cherry'], notes: ['kirsch'] },
  { terms: ['honig', 'honey'], notes: ['honig'] },
  { terms: ['vanille', 'vanilla'], notes: ['vanille', 'vanilla'] },
  { terms: ['kaffee', 'coffee', 'espresso', 'mokka'], notes: ['kaffee', 'espresso', 'mokka'] },
  { terms: ['karamell', 'karamel', 'caramel', 'toffee'], notes: ['karamel', 'toffee', 'praline', 'praliné'] },
  { terms: ['schokolade', 'schoggi', 'chocolate', 'kakao', 'cacao'], notes: ['kakao', 'schokolade', 'praline', 'praliné'] },
  { terms: ['kokos', 'kokosnuss', 'coconut'], notes: ['kokos'] },
  { terms: ['nuss', 'nüsse', 'nuts', 'nutty'], notes: ['mandel', 'haselnuss', 'pistazie', 'walnuss', 'nuss'] },
  { terms: ['pistazie', 'pistazien', 'pistachio'], notes: ['pistazie'] },
  {
    terms: ['zitrus', 'zitrisch', 'citrus', 'zitrone', 'zitronen', 'lemon'],
    notes: ['zitrone', 'bergamotte', 'orange', 'mandarine', 'grapefruit', 'limette', 'yuzu', 'pomelo', 'zitrus']
  },
  { terms: ['pfirsich', 'peach'], notes: ['pfirsich'] },
  { terms: ['apfel', 'äpfel', 'apple'], notes: ['apfel'] },
  { terms: ['rose', 'rosen'], notes: ['rose'] },
  { terms: ['zimt', 'cinnamon'], notes: ['zimt'] },
  { terms: ['blaubeere', 'blaubeeren', 'heidelbeere', 'heidelbeeren', 'blueberry', 'blueberries'], notes: ['heidelbeer', 'blaubeer'] },
  { terms: ['gipfeli', 'gipfel', 'croissant', 'croissants'], notes: ['croissant', 'gipfel', 'brioche'] },
  { terms: ['limette', 'limetten', 'lime'], notes: ['limette'] },
  { terms: ['kaugummi', 'bubblegum'], notes: ['kaugummi', 'bubblegum'] },
  { terms: ['marroni', 'maroni', 'kastanie', 'kastanien', 'chestnut'], notes: ['kastanie', 'marron'] },
  { terms: ['waldbeeren', 'waldbeere'], notes: ['erdbeer', 'himbeer', 'brombeer', 'heidelbeer', 'blaubeer', 'johannisbeer', 'cassis', 'preiselbeer', 'beere'] },
  { terms: ['brombeere', 'brombeeren', 'blackberry'], notes: ['brombeer'] },
  { terms: ['eis', 'glace', 'glacé', 'eiscreme', 'ice cream', 'gelato'], notes: ['eiscreme', 'speiseeis', 'gelato', 'glace', 'sorbet'] },
  { terms: ['donut', 'donuts', 'doughnut', 'krapfen'], notes: ['donut', 'doughnut', 'krapfen'] },
  { terms: ['gummibärchen', 'gummibären', 'fruchtgummi'], notes: ['gummibär', 'fruchtgummi', 'gummy'] },
  { terms: ['erdnuss', 'erdnüsse', 'erdnussbutter', 'peanut'], notes: ['erdnuss', 'peanut'] },
  { terms: ['kürbis', 'pumpkin'], notes: ['kürbis', 'pumpkin'] },
  { terms: ['quitte', 'quince'], notes: ['quitte'] },
  { terms: ['spekulatius', 'speculoos', 'lotus keks'], notes: ['spekulatius', 'speculoos', 'karamellkeks', 'biscoff'] },
  { terms: ['zucker', 'sugar'], notes: ['zucker', 'kandis'] },
  { terms: ['dattel', 'datteln', 'dates'], notes: ['dattel'] },
  { terms: ['waffel', 'waffeln', 'waffle'], notes: ['waffel'] },
  { terms: ['joghurt', 'yoghurt', 'yogurt'], notes: ['joghurt', 'yoghurt', 'yogurt'] },
  { terms: ['eistee', 'ice tea', 'icetea'], notes: ['eistee', 'ice tea', 'iced tea'] },
  { terms: ['limonade', 'lemonade', 'limo'], notes: ['limonade', 'lemonade'] },
  { terms: ['maracuja', 'passionsfrucht', 'passion fruit'], notes: ['passionsfrucht', 'maracuja'] },
  { terms: ['holz', 'holzig', 'wood', 'woody'], notes: ['holz', 'zeder', 'sandel', 'oud', 'guajak', 'vetiver'] },
  { terms: ['gewürze', 'würzig', 'spicy'], notes: ['zimt', 'gewürz', 'pfeffer', 'kardamom', 'ingwer', 'safran', 'muskat', 'anis', 'nelke'] },
  { terms: ['ozean', 'meer', 'ocean'], notes: ['meer', 'ozean', 'aquatisch', 'marin'] },
  { terms: ['banana', 'bananen'], notes: ['banane'] },
  { terms: ['pineapple'], notes: ['ananas'] },
  { terms: ['melon', 'melonen', 'wassermelone', 'watermelon'], notes: ['melone'] },
  { terms: ['plum', 'pflaumen'], notes: ['pflaume'] },
  { terms: ['lychee', 'litchi'], notes: ['litschi', 'lychee', 'litchi'] },
  { terms: ['apricot', 'aprikosen'], notes: ['aprikose'] },
  { terms: ['pear', 'birnen'], notes: ['birne'] },
  { terms: ['mangos'], notes: ['mango'] },
  { terms: ['tea', 'tee'], notes: ['tee', 'matcha'] },
  { terms: ['musk'], notes: ['moschus'] },
  { terms: ['cupcake', 'cupcakes', 'kuchen', 'cake', 'frosting'], notes: ['cupcake', 'kuchen', 'torte', 'frosting', 'zuckerguss', 'glasur'] },
  { terms: ['keks', 'kekse', 'plätzchen', 'gebäck', 'cookie', 'cookies', 'biscuit'], notes: ['keks', 'biscuit', 'cookie', 'gebäck', 'kuchen', 'plätzchen', 'brioche'] },
  { terms: ['butter', 'sahne', 'rahm', 'milch', 'milk', 'cream'], notes: ['butter', 'sahne', 'rahm', 'milch'] }
];

// Notenteile, nach denen ein Suchbegriff zusätzlich sucht (leer = keine Gruppe).
export function noteGroupFor(term: string): string[] {
  const t = term.trim().toLowerCase();
  if (t.length < 3) return [];
  const out = new Set<string>();
  for (const g of NOTE_GROUPS) if (g.terms.includes(t)) g.notes.forEach((n) => out.add(n));
  return [...out];
}
