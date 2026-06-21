/**
 * Taxonomie: alle auswählbaren Werte für Filter, Finder und Navigation.
 * Diese Listen halten die UI konsistent und vermeiden Tippfehler.
 */
import type {
  Difficulty,
  Genre,
  GameMode,
  Mood,
  Platform,
  PlaytimeCategory,
  PriceTier,
  Tag,
} from "@/lib/types";

export const PLATFORMS: Platform[] = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "Xbox Series X|S",
  "Xbox One",
  "Nintendo Switch",
  "Steam Deck",
  "Mobile",
  "Retro",
];

export const GENRES: Genre[] = [
  "Action",
  "Adventure",
  "RPG",
  "MMORPG",
  "Shooter",
  "Strategy",
  "Simulation",
  "Platformer",
  "Puzzle",
  "Horror",
  "Racing",
  "Sports",
  "Fighting",
  "Roguelike",
  "Metroidvania",
  "Sandbox",
  "Survival",
  "Battle Royale",
  "Card Game",
  "Rhythm",
];

export const MODES: GameMode[] = [
  "Single-player",
  "Multiplayer",
  "Co-op",
  "Online PvP",
  "Local Co-op",
  "Split-screen",
  "MMO",
];

export const DIFFICULTIES: Difficulty[] = [
  "Beginner-friendly",
  "Moderate",
  "Challenging",
  "Hardcore",
];

export const PLAYTIMES: { value: PlaytimeCategory; label: string }[] = [
  { value: "Short", label: "Short · under 10h" },
  { value: "Medium", label: "Medium · 10–30h" },
  { value: "Long", label: "Long · 30–80h" },
  { value: "Endless", label: "Endless · 80h+" },
];

export const TAGS: Tag[] = [
  "cozy",
  "horror",
  "open world",
  "story-rich",
  "retro",
  "indie",
  "multiplayer",
  "beginner-friendly",
  "soulslike",
  "pixel art",
  "atmospheric",
  "sci-fi",
  "fantasy",
  "exploration",
  "roguelike",
  "puzzle",
  "couch co-op",
  "crafting",
  "base-building",
  "survival",
  "competitive",
  "casual",
  "anime",
  "post-apocalyptic",
  "deckbuilder",
  "stealth",
  "western",
  "space",
  "free-to-play",
  "party",
  "battle royale",
  "time-loop",
  "narrative",
  "funny",
  "social",
];

/** Moods mit Label + kurzem Untertitel + Emoji für die "by mood"-Kacheln. */
export const MOODS: { value: Mood; label: string; blurb: string; emoji: string }[] = [
  { value: "Cozy", label: "Cozy", blurb: "Warm, gemütlich, ohne Stress", emoji: "🍵" },
  { value: "Relaxing", label: "Relaxing", blurb: "Zurücklehnen & abschalten", emoji: "🌊" },
  { value: "Epic", label: "Epic", blurb: "Große Welten & Abenteuer", emoji: "⚔️" },
  { value: "Scary", label: "Scary", blurb: "Gänsehaut & Spannung", emoji: "🕯️" },
  { value: "Competitive", label: "Competitive", blurb: "Skill, Ranked, Gegner", emoji: "🏆" },
  { value: "Story-rich", label: "Story-rich", blurb: "Erzählung im Mittelpunkt", emoji: "📖" },
  { value: "Mind-bending", label: "Mind-bending", blurb: "Rätsel & clevere Twists", emoji: "🧩" },
  { value: "Adrenaline", label: "Adrenaline", blurb: "Tempo, Action, Puls hoch", emoji: "⚡" },
  { value: "Funny", label: "Funny", blurb: "Lachen & gute Laune", emoji: "😄" },
  { value: "Nostalgic", label: "Nostalgic", blurb: "Erinnerungen & Klassiker", emoji: "📼" },
  { value: "Social", label: "Social", blurb: "Mit Freunden zusammen", emoji: "🎉" },
];

/** Preis-Stufen für den Preis-Filter. */
export const PRICE_TIERS: { value: PriceTier; label: string }[] = [
  { value: "Free", label: "Gratis" },
  { value: "Budget", label: "Günstig (bis €25)" },
  { value: "Standard", label: "Standard (€25–60)" },
  { value: "Premium", label: "Premium (€60+)" },
];

/** Erscheinungs-Ären für den Zeit-Filter. */
export const ERAS: { value: string; label: string; from?: number; to?: number }[] = [
  { value: "2020s", label: "Neu (2020+)", from: 2020 },
  { value: "2010s", label: "2010er", from: 2010, to: 2019 },
  { value: "2000s", label: "2000er", from: 2000, to: 2009 },
  { value: "retro", label: "Retro (vor 2000)", to: 1999 },
];

/** Kurz-Glyphen für Plattformen (kompakt für Karten). */
export const PLATFORM_GLYPH: Record<Platform, string> = {
  PC: "PC",
  "PlayStation 5": "PS5",
  "PlayStation 4": "PS4",
  "Xbox Series X|S": "XSX",
  "Xbox One": "XB1",
  "Nintendo Switch": "NSW",
  "Steam Deck": "Deck",
  Mobile: "Mobile",
  Retro: "Retro",
};
