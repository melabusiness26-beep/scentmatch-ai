/**
 * 10-Fragen Quiz für Auressa.ch – v2
 * Kundenorientiert, hilfreich, transparent
 *
 * Änderungen gegenüber v1 (13 Fragen):
 * - Familie: 1 Single-Select Frage (statt 3)
 * - Sweetness & pricePref: entfernt
 * - Alle Fragen: bessere kundenorientierte Erklärungen
 */

import { NOTE_THEMES } from './perfumes';

export type QuestionKind =
  | 'gender'
  | 'anchor'
  | 'family'
  | 'lovedNote'
  | 'dislikedNote'
  | 'occasion'
  | 'season'
  | 'sillage'
  | 'budget'
  | 'longevity';

export interface QuizQuestion {
  q: string;
  hint?: string;
  why?: string; // Kundenorientiert: warum wir das fragen
  kind: QuestionKind;
  a: [string, string, string?][]; // [label, value, emoji?]
}

/**
 * Die 10 optimierten Kern-Fragen
 * - Alle kritischen Scoring-Faktoren erfasst
 * - Kundenorientierte Hinweise & Erklärungen
 * - Reduziert von 13 auf 10 durch Familie-Konsolidation
 */
export const quizQuestions: QuizQuestion[] = [
  // ===== 1. GESCHLECHT =====
  {
    q: 'Für wen suchen wir den passenden Duft?',
    hint: '💡 So zeigen wir dir nur, was wirklich passt. Kein Suchen im Heuhaufen.',
    why: 'Das bestimmt, welche Düfte für dich grundsätzlich passen.',
    kind: 'gender',
    a: [
      ['Für Damen', 'women', '👩'],
      ['Für Herren', 'men', '👨'],
      ['Egal, zeig mir alles', 'unisex', '✨']
    ]
  },

  // ===== 2. DUFTFAMILIE (CONSOLIDIERT: nur 1 Frage!) =====
  {
    q: 'Welche Duft-Familie magst du am liebsten?',
    hint: '💡 Das ist der wichtigste Faktor (30 % deiner Empfehlung) – vertrau deinem Bauchgefühl.',
    why: 'Die Duftfamilie bestimmt am meisten, ob ein Duft zu dir passt. Wir zeigen dir die besten Matches für deine bevorzugte Familie.',
    kind: 'family',
    a: [
      ['🌊 Clean: frisch, sauber, leicht', 'clean'],
      ['🍫 Gourmand: warm, süss, kuschelig', 'gourmand'],
      ['🌲 Woody: elegant, holzig, würzig', 'woody'],
      ['🌸 Floral: blumig, zart, romantisch', 'floral']
    ]
  },

  // ===== 3. ANKER-DUFT (optional) =====
  {
    q: 'Gibt es einen Duft, den du schon liebst? (optional)',
    hint: '💡 Wenn ja, finden wir gezielt Düfte, die ähnlich riechen – dein „mehr davon".',
    why: 'Das hilft uns, deine persönliche Duftnase besser zu verstehen.',
    kind: 'anchor',
    a: []
  },

  // ===== 4. LIEBLINGSNOTE =====
  {
    q: 'Eine Note, die dein Herz höher schlagen lässt?',
    hint: '💡 Diese Note bekommt extra Gewicht in deinen Empfehlungen (20 % der Punktzahl).',
    why: 'Wenn du eine bestimmte Note liebst (z.B. Vanille), finden wir Düfte, die sie enthalten – oder zeigen dir ähnliche Alternativen.',
    kind: 'lovedNote',
    a: [['Keine bestimmte, überrasch mich', ''], ...NOTE_THEMES.map(t => [t.label, t.code] as [string, string])]
  },

  // ===== 5. NICHT-GEMOCHT-NOTE =====
  {
    q: 'Und etwas, das für dich gar nicht geht?',
    hint: '💡 Düfte mit dieser Note rutschen in deinem Ranking deutlich nach unten.',
    why: 'Manche Noten sind Geschmackssache. Wenn du weisst, was dir nicht gefällt, helfen wir dir, es zu vermeiden.',
    kind: 'dislikedNote',
    a: [['Keine – ich bin offen für alles', ''], ...NOTE_THEMES.map(t => [t.label, t.code] as [string, string])]
  },

  // ===== 6. GELEGENHEIT =====
  {
    q: 'Wann soll dein Duft am meisten glänzen?',
    hint: '💡 Das prägt seinen Charakter – Alltag braucht Stabilität, Abend darf dramatischer sein.',
    why: 'Ein Duft für die Arbeit ist anders als einer zum Ausgehen. So finden wir einen passenden für deine Situation.',
    kind: 'occasion',
    a: [
      ['Im Alltag & Büro – zuverlässig', 'daily'],
      ['Bei Dates & zum Verlieben – verführerisch', 'date'],
      ['Abends & zum Ausgehen – dramatisch', 'evening'],
      ['Eigentlich überall', 'any']
    ]
  },

  // ===== 7. SAISON =====
  {
    q: 'Für welche Jahreszeit suchst du ihn?',
    hint: '💡 Manche Düfte wirken je nach Wetter unterschiedlich.',
    why: 'Ein Sommerduft riecht anders als ein Winterduft. So matchen wir saisonal passend.',
    kind: 'season',
    a: [
      ['🌱 Frühling', 'Frühling'],
      ['☀️ Sommer', 'Sommer'],
      ['🍂 Herbst & Winter', 'Herbst/Winter'],
      ['🌍 Das ganze Jahr', 'Ganzjährig']
    ]
  },

  // ===== 8. SILLAGE / INTENSITÄT =====
  {
    q: 'Wie präsent soll dein Duft sein?',
    hint: '💡 Das ist die „Ausstrahlung" – wie weit dein Duft im Raum wahrnehmbar sein soll.',
    why: 'Manche mögen dezent (nur wer nah kommt), andere wollen einen starken ersten Eindruck. Wir berücksichtigen das zu 10 % in deiner Empfehlung.',
    kind: 'sillage',
    a: [
      ['Dezent – nur wer mir nah kommt', 'low'],
      ['Ausgewogen – angenehm präsent', 'medium'],
      ['Auffällig – ich hinterlasse Eindruck', 'high']
    ]
  },

  // ===== 9. BUDGET =====
  {
    q: 'Was darf dein neuer Liebling kosten?',
    hint: '💡 Düfte in deinem Rahmen bekommen mehr Punkte (15 % der Punktzahl). Empfohlen werden Düfte bis CHF 180.',
    why: 'Budget ist realistisch. Ein teurer Duft ist nicht automatisch besser – es kommt auf deinen Geschmack an.',
    kind: 'budget',
    a: [
      ['💰 Bis CHF 80', '80'],
      ['💰💰 CHF 80–150', '150'],
      ['💰💰💰 Premium (über CHF 150)', 'premium'],
      ['Budget ist mir egal', 'any']
    ]
  },

  // ===== 10. HALTBARKEIT =====
  {
    q: 'Wie lange soll dein Duft halten?',
    hint: '💡 Manche Düfte begleiten dich ein paar Stunden, andere den ganzen Tag.',
    why: 'Haltbarkeit ist praktisch. Ein Sommerduft verfliegt oft schneller, ein Abendduft darf länger haften. Das fliesst als kleiner Bonus (bis 8 Punkte) in deine Empfehlung ein.',
    kind: 'longevity',
    a: [
      ['Ein paar Stunden reichen', 'low'],
      ['Solide durch den Tag', 'medium'],
      ['Möglichst lange', 'high'],
      ['Egal', '']
    ]
  }
];
