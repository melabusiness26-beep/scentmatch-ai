/**
 * Daten für den Werbevideo-Bereich: Plattform-Guide, Tool-Vergleich
 * und die Vorlagen, aus denen der Skript-Generator Drehbücher baut.
 */

export type Platform = {
  name: string;
  emoji: string;
  format: string;
  bestFor: string;
  postingTip: string;
  reach: string;
};

export const PLATFORMS: Platform[] = [
  {
    name: "TikTok",
    emoji: "🎵",
    format: "9:16 Hochformat, 15–45 Sek., Untertitel Pflicht",
    bestFor:
      "Der wichtigste Kanal für Dropshipping: Auch Konten mit 0 Followern können viral gehen, weil der Algorithmus Inhalte statt Follower belohnt.",
    postingTip:
      "1× täglich posten (mindestens 3×/Woche), beste Zeiten in der Schweiz: 12–13 Uhr und 19–22 Uhr. 3–5 Hashtags: Mischung aus Nische (#hundeliebe) und Kaufsignal (#tiktokmademebuyit).",
    reach: "Höchste organische Reichweite – hier startest du.",
  },
  {
    name: "Instagram Reels",
    emoji: "📸",
    format: "9:16 Hochformat, 15–60 Sek., Cover-Bild wählen",
    bestFor:
      "Zweitverwertung deiner TikToks (ohne TikTok-Wasserzeichen!) und Aufbau eines vertrauenswürdigen Marken-Profils, das Kund:innen vor dem Kauf prüfen.",
    postingTip:
      "3–5 Reels pro Woche + Stories für Nähe (Umfragen, Behind-the-Scenes). Profil = Visitenkarte: Shop-Link in die Bio, Highlights mit Bewertungen und FAQ.",
    reach: "Mittlere Reichweite, aber wichtig fürs Vertrauen.",
  },
  {
    name: "YouTube Shorts",
    emoji: "▶️",
    format: "9:16 Hochformat, bis 60 Sek.",
    bestFor:
      "Dieselben Videos nochmals hochladen – Shorts haben lange Lebensdauer (werden monatelang ausgespielt) und ranken sogar in der Google-Suche.",
    postingTip:
      "Gleiche Videos wie TikTok/Reels verwenden, Titel mit Suchbegriff formulieren («LED Halsband Hund Test»). Aufwand: 2 Minuten pro Upload.",
    reach: "Langsamer Aufbau, aber Videos wirken monatelang nach.",
  },
  {
    name: "Pinterest",
    emoji: "📌",
    format: "9:16 Video-Pins oder 2:3 Bild-Pins",
    bestFor:
      "Unterschätzter Verkaufskanal: Nutzer:innen suchen aktiv nach Produkten und Geschenkideen (hohe Kaufabsicht!). Ideal für Deko, Geschenke, Baby, Küche.",
    postingTip:
      "Pins mit Suchbegriffen betiteln («Geschenkidee Geburt Junge»), direkt auf die Produktseite verlinken. Pins wirken 6–12 Monate – einmal Arbeit, lange Wirkung.",
    reach: "Kleiner, aber kaufbereiter Traffic mit Langzeitwirkung.",
  },
];

export type VideoTool = {
  name: string;
  price: string;
  what: string;
  verdict: string;
};

export const VIDEO_TOOLS: VideoTool[] = [
  {
    name: "CapCut (App/Desktop)",
    price: "gratis (Pro optional)",
    what: "Schneiden, automatische Untertitel, Übergänge, Trend-Vorlagen – der Standard der TikTok-Creator.",
    verdict: "UNSERE EMPFEHLUNG für den Start: Damit entstehen 95 % der erfolgreichen Dropshipping-Videos.",
  },
  {
    name: "Canva",
    price: "gratis (Pro optional)",
    what: "Text-Overlays, Thumbnails, Pinterest-Pins, einfache Videovorlagen.",
    verdict: "Perfekte Ergänzung für Pins, Cover und Grafiken.",
  },
  {
    name: "InShot",
    price: "gratis (Pro günstig)",
    what: "Schnelles Schneiden direkt am Handy, Formate anpassen.",
    verdict: "Gute CapCut-Alternative, wenn dir CapCut zu voll ist.",
  },
  {
    name: "KI-Video-Tools (z. B. Runway, Pika, Sora)",
    price: "kostenpflichtig (Abo/Credits)",
    what: "Erzeugen Videoszenen komplett per KI aus Text.",
    verdict:
      "Ehrliche Einschätzung: Für Produktwerbung (noch) NICHT empfohlen – reine KI-Videos wirken oft künstlich, und genau das senkt das Vertrauen. Echtes Handyvideo vom Muster schlägt KI-Material fast immer. KI lieber für Ideen, Skripte und Voice-Over nutzen.",
  },
];

/* ------------------------------------------------------------------ Skripte */

export type ScriptStyle = {
  id: string;
  name: string;
  emoji: string;
  when: string;
};

export const SCRIPT_STYLES: ScriptStyle[] = [
  {
    id: "problem-loesung",
    name: "Problem → Lösung",
    emoji: "💡",
    when: "Der Klassiker – ideal für Produkte, die ein spürbares Alltagsproblem lösen.",
  },
  {
    id: "drei-gruende",
    name: "3 Gründe / Liste",
    emoji: "🔢",
    when: "Wenn das Produkt mehrere Stärken hat – Listen halten die Zuschauer bis zum Ende.",
  },
  {
    id: "ehrlicher-test",
    name: "Ehrlicher Test",
    emoji: "🧪",
    when: "Baut maximales Vertrauen auf – perfekt für skeptische Zielgruppen und teurere Produkte.",
  },
  {
    id: "pov-story",
    name: "POV / Mini-Story",
    emoji: "🎬",
    when: "Emotional und teilbar – ideal für Haustier-, Baby- und Geschenk-Produkte.",
  },
];

export const HOOK_RULES = [
  "Die ersten 1–2 Sekunden entscheiden ALLES: Starte mit Bewegung, einem Problem oder einer mutigen Aussage – nie mit einem Logo.",
  "Untertitel immer einblenden (die Mehrheit schaut ohne Ton).",
  "Filme mit dem Handy bei Tageslicht – authentisch schlägt Hochglanz. Ein Video, das nach Werbung aussieht, wird weggewischt.",
  "Zeige das Produkt in Aktion innerhalb der ersten 3 Sekunden.",
  "Ein Video = eine Botschaft. Nicht drei Vorteile gleichzeitig erklären.",
  "Ende mit klarer Handlung: «Link in der Bio» oder Produktname einblenden.",
  "Nutze Trend-Sounds (leise unter dem Voice-Over) – der Algorithmus liebt sie.",
  "Poste dasselbe Video auf TikTok, Reels UND Shorts – dreifache Chance, null Mehraufwand.",
];
