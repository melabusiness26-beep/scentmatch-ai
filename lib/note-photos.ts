// Zusätzliche Duftnoten-Fotos (in /public/notes) für Noten, die (noch)
// keinen eigenen Lexikon-Eintrag haben. Wird von noteImage() genutzt.
// Erkennung über Stichworte im Notennamen (kleingeschrieben).
export const NOTE_PHOTOS: { image: string; keywords: string[]; exclude?: string[] }[] = [
  { image: '/notes/zitrone.jpg', keywords: ['zitrone', 'lemon', 'limone'], exclude: ['zitronengras', 'zitronenmelisse'] }
];

export function extraNotePhoto(note: string): string | null {
  const n = note.toLowerCase();
  const hit = NOTE_PHOTOS.find(
    (p) => p.keywords.some((k) => n.includes(k)) && !p.exclude?.some((x) => n.includes(x))
  );
  return hit?.image ?? null;
}
