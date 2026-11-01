// Duftprofile des Quiz – gemeinsam genutzt von der Quiz-Seite und dem Teilen-Bild.
export type ProfileKey = 'clean' | 'gourmand' | 'woody' | 'floral';

export const PROFILE_TEXT: Record<ProfileKey, { title: string; text: string }> = {
  clean: { title: 'Frisch & Klar', text: 'Du liebst frische, saubere Düfte. Deine Signatur wirkt gepflegt, leicht und modern.' },
  gourmand: { title: 'Warm & Sinnlich', text: 'Du passt zu warmen, weichen und leicht süssen Düften. Deine Duftsignatur wirkt gemütlich und sinnlich.' },
  woody: { title: 'Holzig & Elegant', text: 'Du magst elegante, holzige und würzige Düfte. Deine Signatur wirkt hochwertig und selbstbewusst.' },
  floral: { title: 'Blumig & Romantisch', text: 'Du passt zu blumigen, fruchtigen und zarten Düften. Deine Signatur wirkt charmant und weich.' }
};

// Farben je Profil (wie die gezeichneten Flakons auf der Seite).
export const PROFILE_COLORS: Record<ProfileKey, [string, string]> = {
  clean: ['#F2F8FA', '#BFDCE7'],
  gourmand: ['#FBF3EC', '#E6C3A6'],
  woody: ['#F6F0E7', '#D2BC9D'],
  floral: ['#FCF3F6', '#E7C4D6']
};

export function isProfileKey(v: string | null | undefined): v is ProfileKey {
  return v === 'clean' || v === 'gourmand' || v === 'woody' || v === 'floral';
}
