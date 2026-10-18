// Kuratierte, redaktionelle Querverweise zwischen einzelnen Düften.
// Bewusst getrennt von der automatischen "Günstige Alternativen"-Logik, damit
// wir einzelne Paare mit eigenem Wortlaut auszeichnen können – ohne neue
// Datenbankfelder. Der Partner-Duft muss im Katalog existieren, sonst wird der
// Abschnitt elegant ausgeblendet.

export type CuratedLink = {
  /** Slug des verknüpften Dufts. */
  partnerSlug: string;
  /** Überschrift des Abschnitts. */
  heading: string;
  /** Redaktioneller Text (bewusst ohne „Dupe"/„identisch"). */
  text: string;
};

export const curatedLinks: Record<string, CuratedLink> = {
  'tom-ford-oud-wood': {
    partnerSlug: 'lattafa-oud-for-glory',
    heading: 'Alternative mit ähnlicher Duftrichtung',
    text: 'Wer die warme Kombination aus Oud-, Holz- und Gewürznoten schätzt und nach einer günstigeren Alternative mit ähnlicher Duftcharakteristik sucht, kann sich Lattafa Oud for Glory ansehen.'
  },
  'lattafa-oud-for-glory': {
    partnerSlug: 'tom-ford-oud-wood',
    heading: 'Luxus-Inspiration',
    text: 'Dieser Duft richtet sich an Menschen, die warme Oud- und Holzkompositionen mögen. Viele Liebhaber vergleichen die allgemeine Duftrichtung mit Tom Ford Oud Wood, auch wenn beide Düfte ihre eigene Charakteristik besitzen.'
  },
  'baccarat-rouge-540': {
    partnerSlug: 'lattafa-ana-abiyedh',
    heading: 'Alternative mit ähnlicher Duftrichtung',
    text: 'Wer die warme Kombination aus Safran- und Amberholz-Noten liebt, aber deutlich weniger ausgeben möchte, kann sich Lattafa Ana Abiyedh Rouge ansehen – in der Duft-Community die bekannteste günstige Alternative. Kein exakter Klon, aber dieselbe warme Amber-Richtung.'
  },
  'lattafa-ana-abiyedh': {
    partnerSlug: 'baccarat-rouge-540',
    heading: 'Luxus-Inspiration',
    text: 'Dieser Duft richtet sich an Menschen, die warme Safran- und Amberholz-Kompositionen mögen. Viele Liebhaber vergleichen die allgemeine Duftrichtung mit Baccarat Rouge 540, auch wenn beide Düfte ihre eigene Charakteristik besitzen.'
  }
};

export function getCuratedLink(slug: string): CuratedLink | undefined {
  return curatedLinks[slug];
}
