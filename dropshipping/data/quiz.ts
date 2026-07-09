/**
 * Nischen-Quiz: 5 Fragen, jede Antwort vergibt Punkte an passende Nischen.
 * Die Nische mit den meisten Punkten wird empfohlen.
 */

export type QuizOption = {
  label: string;
  emoji: string;
  points: Record<string, number>; // Nischen-Slug → Punkte
};

export type QuizQuestion = {
  question: string;
  hint: string;
  options: QuizOption[];
};

export const QUIZ: QuizQuestion[] = [
  {
    question: "Wobei vergisst du die Zeit?",
    hint: "Verkaufe, was dich wirklich interessiert – das merkt man deinen Videos an.",
    options: [
      { label: "Mit Tieren", emoji: "🐶", points: { haustiere: 5 } },
      { label: "Wohnung verschönern", emoji: "🛋️", points: { "home-living": 5 } },
      { label: "Pflege & Styling", emoji: "✨", points: { "beauty-selfcare": 5 } },
      { label: "Sport & Bewegung", emoji: "💪", points: { "fitness-sport": 5 } },
      { label: "Kochen & Geniessen", emoji: "🍳", points: { "kueche-haushalt": 5 } },
      { label: "Zeit mit Kindern", emoji: "🧸", points: { "baby-kids": 5 } },
      { label: "Neue Technik testen", emoji: "📱", points: { "tech-gadgets": 5 } },
      { label: "Draussen: Berge & Seen", emoji: "🏔️", points: { "outdoor-reisen": 5 } },
      { label: "Gaming & Zocken", emoji: "🎮", points: { "gaming-zubehoer": 5 } },
      { label: "Garten & Pflanzen", emoji: "🌱", points: { "garten-balkon": 5 } },
      { label: "Entspannen & gut schlafen", emoji: "😴", points: { "wellness-schlaf": 5 } },
    ],
  },
  {
    question: "Wie viel kannst du am Anfang investieren?",
    hint: "Ehrlich bleiben – manche Nischen brauchen teurere Testmuster als andere.",
    options: [
      {
        label: "So wenig wie möglich",
        emoji: "🪙",
        points: { haustiere: 2, "beauty-selfcare": 2, "kueche-haushalt": 2 },
      },
      {
        label: "CHF 100–500",
        emoji: "💵",
        points: { "home-living": 2, "fitness-sport": 2, haustiere: 1 },
      },
      {
        label: "Mehr als CHF 500",
        emoji: "💰",
        points: { "baby-kids": 2, "tech-gadgets": 2, "home-living": 1 },
      },
    ],
  },
  {
    question: "Welche Videos würdest du am liebsten drehen?",
    hint: "Dein Content-Stil entscheidet mit, welche Nische zu dir passt.",
    options: [
      { label: "Herzige Tier-Momente", emoji: "🐾", points: { haustiere: 4 } },
      { label: "Ästhetische Raum-Videos", emoji: "🌅", points: { "home-living": 4 } },
      { label: "Routinen & Vorher/Nachher", emoji: "🪞", points: { "beauty-selfcare": 3, "fitness-sport": 1 } },
      { label: "Schnelle «So geht's»-Demos", emoji: "⚡", points: { "kueche-haushalt": 4, "tech-gadgets": 1 } },
      { label: "Emotionale Familien-Momente", emoji: "🥹", points: { "baby-kids": 4 } },
      { label: "Gadget-Tests & Unboxings", emoji: "📦", points: { "tech-gadgets": 4 } },
      { label: "Workout- & Challenge-Clips", emoji: "🏃‍♀️", points: { "fitness-sport": 4 } },
      { label: "Natur-, Wander- & Reise-Videos", emoji: "🏞️", points: { "outdoor-reisen": 4 } },
      { label: "Desk-Setups & Study-Content", emoji: "🖥️", points: { "buero-homeoffice": 3, "gaming-zubehoer": 2 } },
      { label: "Auto-Hacks & Ordnungs-Videos", emoji: "🚗", points: { "auto-pendeln": 4 } },
      { label: "Nachhaltigkeits-Tipps", emoji: "♻️", points: { "nachhaltig-leben": 4 } },
    ],
  },
  {
    question: "Wen möchtest du ansprechen?",
    hint: "Eine klare Zielgruppe macht Werbung und Produktwahl viel einfacher.",
    options: [
      { label: "Tierbesitzer:innen", emoji: "🦴", points: { haustiere: 3 } },
      { label: "Junge Leute (18–30)", emoji: "🎧", points: { "home-living": 2, "tech-gadgets": 2, "beauty-selfcare": 1 } },
      { label: "Selfcare-Fans", emoji: "🛁", points: { "beauty-selfcare": 3 } },
      { label: "Sportliche Menschen", emoji: "⛰️", points: { "fitness-sport": 3 } },
      { label: "Familien & Eltern", emoji: "👨‍👩‍👧", points: { "baby-kids": 3, "kueche-haushalt": 1 } },
      { label: "Einfach alle Haushalte", emoji: "🏠", points: { "kueche-haushalt": 3, "home-living": 1 } },
      { label: "Wanderer & Reisende", emoji: "🥾", points: { "outdoor-reisen": 3, "fitness-sport": 1 } },
      { label: "Pendler & Vielbeschäftigte", emoji: "🚆", points: { "auto-pendeln": 3, "buero-homeoffice": 2, "wellness-schlaf": 1 } },
      { label: "Umweltbewusste Menschen", emoji: "🌍", points: { "nachhaltig-leben": 3, "garten-balkon": 1 } },
    ],
  },
  {
    question: "Was beschreibt dich am besten?",
    hint: "Beides kann funktionieren – aber es passt zu unterschiedlichen Nischen.",
    options: [
      {
        label: "Ich mag Bewährtes, das sicher läuft",
        emoji: "🧱",
        points: { "kueche-haushalt": 2, haustiere: 2, "fitness-sport": 1 },
      },
      {
        label: "Ich springe gern früh auf Trends auf",
        emoji: "🚀",
        points: { "tech-gadgets": 2, "home-living": 2, "beauty-selfcare": 1 },
      },
      {
        label: "Ich will eine Marke mit Herz aufbauen",
        emoji: "❤️",
        points: { "baby-kids": 2, haustiere: 1, "beauty-selfcare": 1 },
      },
    ],
  },
];
