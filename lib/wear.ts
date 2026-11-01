import type { Perfume } from './perfumes';

// „So trägst du ihn": praktische Tipps, berechnet aus Ausstrahlung (Sillage)
// und Haltbarkeit. Bewusst allgemein gehalten – nur was aus den Werten folgt.
export function wearTips(p: Perfume): string[] {
  const tips: string[] = [];
  const si = p.sillage;
  const lo = p.longevity;
  const occasion = (p.occasion || '').toLowerCase();
  // Ohne Werte gäbe es nur den allgemeinen Tipp – dann lieber keinen Kasten.
  if (si == null && lo == null) return [];

  if (si != null) {
    if (si >= 8) tips.push('1–2 Sprühstösse reichen, er strahlt deutlich aus.');
    else if (si >= 6) tips.push('2–3 Sprühstösse auf Hals und Handgelenke.');
    else if (si >= 5) tips.push('3 Sprühstösse auf Hals und Handgelenke.');
    else tips.push('3–4 Sprühstösse auf Hals, Handgelenke und Nacken, er bleibt eher nah an der Haut.');
  }

  if (lo != null) {
    if (lo >= 8) tips.push('Er hält bis in den Abend, nachsprühen ist kaum nötig.');
    else if (lo >= 7) tips.push('Er hält gut durch den Tag, für den Abend kannst du kurz nachsprühen.');
    else if (lo >= 6) tips.push('Er hält mehrere Stunden – für den Abend hilft eine kleine Reisegrösse zum Nachsprühen.');
    else tips.push('Für den ganzen Tag am Nachmittag nachsprühen, eine kleine Reisegrösse in der Tasche hilft.');
  }

  if (si != null && si >= 7 && (occasion.includes('büro') || occasion.includes('alltag'))) {
    tips.push('Im Büro oder im Zug lieber sparsam dosieren.');
  }

  tips.push('Nicht verreiben, sondern kurz trocknen lassen, so hält der Duft länger.');
  return tips;
}
