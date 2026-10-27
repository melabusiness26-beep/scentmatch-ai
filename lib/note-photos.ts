// Zusätzliche Duftnoten-Fotos (in /public/notes) für Noten, die (noch)
// keinen eigenen Lexikon-Eintrag haben. Wird von noteImage() genutzt.
// Erkennung über Stichworte im Notennamen (kleingeschrieben).
// priority: Foto hat Vorrang vor dem Lexikon-Foto (z. B. Neroli gehört im
// Lexikon zu „Orange", ist aber eine Blüte und braucht ein eigenes Bild).
export const NOTE_PHOTOS: { image: string; keywords: string[]; exclude?: string[]; priority?: boolean }[] = [
  { image: '/notes/zitrone.jpg', keywords: ['zitrone', 'lemon', 'limone'], exclude: ['zitronengras', 'zitronenmelisse'] },
  { image: '/notes/apfel.jpg', keywords: ['apfel', 'apple'], exclude: ['apfelblüte', 'granatapfel'] },
  { image: '/notes/glockenblume.jpg', keywords: ['glockenblume', 'bluebell', 'campanula'] },
  { image: '/notes/bambus.jpg', keywords: ['bambus', 'bamboo'] },
  { image: '/notes/mandarine.jpg', keywords: ['mandarine', 'mandarin', 'clementine', 'klementine', 'tangerine'] },
  { image: '/notes/grapefruit.jpg', keywords: ['grapefruit', 'pampelmuse', 'pomelo'] },
  { image: '/notes/birne.jpg', keywords: ['birne', 'pear'] },
  { image: '/notes/pfirsich.jpg', keywords: ['pfirsich', 'peach'] },
  { image: '/notes/cassis.jpg', keywords: ['johannisbeere', 'cassis', 'blackcurrant', 'black currant'], exclude: ['rote johannisbeere', 'weisse johannisbeere', 'weiße johannisbeere', 'redcurrant', 'red currant'] },
  { image: '/notes/himbeere.jpg', keywords: ['himbeer', 'raspberr', 'framboise'] },
  { image: '/notes/kokos.jpg', keywords: ['kokos', 'coconut', 'noix de coco'] },
  { image: '/notes/feige.jpg', keywords: ['feige', 'fig'] },
  { image: '/notes/koriander.jpg', keywords: ['koriander', 'coriander', 'cilantro'] },
  { image: '/notes/minze.jpg', keywords: ['minze', 'mint', 'menthe'] },
  { image: '/notes/gruene-noten.jpg', keywords: ['grüne note', 'gruene note', 'green note', 'grünnote', 'gras', 'grass', 'blätter', 'leaves'], exclude: ['grasse'] },
  { image: '/notes/rosmarin.jpg', keywords: ['rosmarin', 'rosemary', 'romarin'] },
  { image: '/notes/geranie.jpg', keywords: ['geranie', 'geranium', 'pelargonie', 'pelargonium'] },
  { image: '/notes/frangipani.jpg', keywords: ['frangipani', 'plumeria'] },
  { image: '/notes/ringelblume.jpg', keywords: ['ringelblume', 'calendula', 'marigold', 'souci'] },
  { image: '/notes/benzoe.jpg', keywords: ['benzoe', 'benzoin', 'benjoin'] },
  { image: '/notes/rosenholz.jpg', keywords: ['rosenholz', 'rosewood', 'bois de rose', 'palisander'] },
  { image: '/notes/weihrauch.jpg', keywords: ['weihrauch', 'olibanum', 'frankincense', 'incense', 'encens'] },
  { image: '/notes/wacholder.jpg', keywords: ['wacholder', 'juniper', 'genièvre', 'genievre'] },
  { image: '/notes/meersalz.jpg', keywords: ['meersalz', 'meerwasser', 'sea salt', 'sea water', 'seawater', 'marine', 'aquatisch', 'aquatic', 'ozean', 'ocean'] },
  { image: '/notes/eichenmoos.jpg', keywords: ['eichenmoos', 'oakmoss', 'oak moss', 'mousse de chêne', 'moos', 'moss'] },
  // Amberholz ist im Lexikon bei Ambroxan eingeordnet, bekommt aber ein eigenes Foto
  // (Holz + Harz statt weisser Kristalle, die wie Meersalz wirkten).
  {
    image: '/notes/amberholz.jpg',
    keywords: ['amberholz', 'amber-holz', 'amberwood', 'amber wood', 'ambery wood', 'ambraholz', 'amberbaum'],
    priority: true
  },
  {
    image: '/notes/neroli.jpg',
    keywords: ['neroli', 'orangenblüte', 'orangenblute', 'orange blossom', "fleur d'oranger"],
    priority: true
  }
];

export function extraNotePhoto(note: string, priorityOnly = false): string | null {
  const n = note.toLowerCase();
  const hit = NOTE_PHOTOS.find(
    (p) =>
      (!priorityOnly || p.priority) &&
      p.keywords.some((k) => n.includes(k)) &&
      !p.exclude?.some((x) => n.includes(x))
  );
  return hit?.image ?? null;
}
