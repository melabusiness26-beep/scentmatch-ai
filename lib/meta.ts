// Google zeigt von der Meta-Beschreibung nur ca. 155 Zeichen. Längere Texte werden
// bevorzugt am Ende eines ganzen Satzes gekürzt, sonst an einem Wortende mit „…".
export function metaDescription(text: string, max = 155): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const sentenceEnd = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('! '), cut.lastIndexOf('? '));
  if (sentenceEnd >= 90) return cut.slice(0, sentenceEnd + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).replace(/[,;:–-]+$/, '').trim()}…`;
}
