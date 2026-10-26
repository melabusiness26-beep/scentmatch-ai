// Zusätzliche Duftnoten-Fotos (in /public/notes) für Noten, die (noch)
// keinen eigenen Lexikon-Eintrag haben. Wird von noteImage() genutzt.
// Erkennung über Stichworte im Notennamen (kleingeschrieben).
export const NOTE_PHOTOS: { image: string; keywords: string[]; exclude?: string[] }[] = [
  { image: '/notes/zitrone.jpg', keywords: ['zitrone', 'lemon', 'limone'], exclude: ['zitronengras', 'zitronenmelisse'] },
  { image: '/notes/apfel.jpg', keywords: ['apfel', 'apple'], exclude: ['apfelblüte', 'granatapfel'] },
  { image: '/notes/glockenblume.jpg', keywords: ['glockenblume', 'bluebell', 'campanula'] },
  { image: '/notes/bambus.jpg', keywords: ['bambus', 'bamboo'] },
  { image: '/notes/mandarine.jpg', keywords: ['mandarine', 'mandarin', 'clementine', 'klementine', 'tangerine'] }
];

export function extraNotePhoto(note: string): string | null {
  const n = note.toLowerCase();
  const hit = NOTE_PHOTOS.find(
    (p) => p.keywords.some((k) => n.includes(k)) && !p.exclude?.some((x) => n.includes(x))
  );
  return hit?.image ?? null;
}
