/**
 * Zentrale Typdefinitionen für die Spiele-Datenbank.
 *
 * Diese Typen sind die "Single Source of Truth". Egal ob die Daten später aus
 * Mock-Dateien (data/games.ts) oder aus einer echten API (IGDB/RAWG/Steam)
 * kommen – am Ende werden sie immer in den Typ `Game` gemappt. So bleibt die
 * gesamte UI stabil, auch wenn die Datenquelle wechselt.
 */

export type Platform =
  | "PC"
  | "PlayStation 5"
  | "PlayStation 4"
  | "Xbox Series X|S"
  | "Xbox One"
  | "Nintendo Switch"
  | "Steam Deck"
  | "Mobile"
  | "Retro";

export type Genre =
  | "Action"
  | "Adventure"
  | "RPG"
  | "Shooter"
  | "Strategy"
  | "Simulation"
  | "Platformer"
  | "Puzzle"
  | "Horror"
  | "Racing"
  | "Sports"
  | "Fighting"
  | "Roguelike"
  | "Metroidvania"
  | "Sandbox";

export type GameMode =
  | "Single-player"
  | "Multiplayer"
  | "Co-op"
  | "Online PvP"
  | "Local Co-op"
  | "Split-screen"
  | "MMO";

export type Difficulty =
  | "Beginner-friendly"
  | "Moderate"
  | "Challenging"
  | "Hardcore";

export type PlaytimeCategory = "Short" | "Medium" | "Long" | "Endless";

export interface Playtime {
  /** Ungefähre Stunden für die Hauptstory. */
  hoursMain: number;
  /** Ungefähre Stunden für (fast) alles (Completionist). */
  hoursFull: number;
  category: PlaytimeCategory;
}

export type PriceTier = "Free" | "Budget" | "Standard" | "Premium";

export interface PriceRange {
  tier: PriceTier;
  /** Ungefährer Vollpreis in EUR, oder null bei Free-to-play / unbekannt. */
  amountEUR: number | null;
  /** Anzeige-Text, z. B. "€59.99" oder "Free-to-play". */
  display: string;
}

/** Stimmungen – treiben den "Find games by mood"-Bereich und den Game Finder. */
export type Mood =
  | "Cozy"
  | "Relaxing"
  | "Epic"
  | "Scary"
  | "Competitive"
  | "Story-rich"
  | "Mind-bending"
  | "Adrenaline";

/** Frei wählbare Schlagworte für Filter/Discovery. */
export type Tag =
  | "cozy"
  | "horror"
  | "open world"
  | "story-rich"
  | "retro"
  | "indie"
  | "multiplayer"
  | "beginner-friendly"
  | "soulslike"
  | "pixel art"
  | "atmospheric"
  | "sci-fi"
  | "fantasy"
  | "exploration"
  | "roguelike"
  | "puzzle"
  | "couch co-op";

export interface Dlc {
  title: string;
  releaseDate: string; // ISO yyyy-mm-dd
  descriptionShort: string;
}

export interface GameUpdate {
  version: string;
  date: string; // ISO yyyy-mm-dd
  title: string;
  notes: string;
}

export interface Game {
  id: string;
  title: string;
  slug: string;
  /** Optionales externes Coverbild. Wenn leer, rendert die UI ein elegantes
   *  Gradient-Cover (siehe components/CoverArt.tsx). */
  coverImage?: string;
  releaseDate: string; // ISO yyyy-mm-dd (kann in der Zukunft liegen = Upcoming)
  developer: string;
  publisher: string;
  platforms: Platform[];
  genres: Genre[];
  subgenres: string[];
  modes: GameMode[];
  tags: Tag[];
  moods: Mood[];
  descriptionShort: string;
  descriptionLong: string;
  story: string;
  gameplay: string;
  difficulty: Difficulty;
  playtime: Playtime;
  ageRating: string; // z. B. "PEGI 18", "PEGI 3", "PEGI 16"
  languages: string[];
  priceRange: PriceRange;
  multiplayer: boolean;
  coop: boolean;
  crossplay: boolean;
  controllerSupport: boolean;
  accessibility: string[];
  /** Slugs ähnlicher Spiele (interne Verlinkung). */
  similarGames: string[];
  dlcs: Dlc[];
  updates: GameUpdate[];
  officialWebsite?: string;
  trailerUrl?: string;

  // --- Redaktionelle / abgeleitete Felder (helfen bei Sortierung & UI) ---
  /** Beliebtheit 0–100 (für "Popular"-Sortierung der Startseite). */
  popularity: number;
  /** Redaktionelle Wertung 0–100 (optional anzeigbar). */
  rating: number;
  /** Zwei Hex-Farben für das generierte Cover-Gradient. */
  accent: [string, string];
  /** Kurze Stichpunkte: "Für wen ist das Spiel?" */
  bestFor: string[];
  /** Highlight-Stichpunkte für die Detailseite. */
  highlights: string[];
}

/** Such-/Filter-Parameter für die Datenbank-Seite. */
export interface GameFilters {
  query?: string;
  genres?: Genre[];
  platforms?: Platform[];
  modes?: GameMode[];
  difficulty?: Difficulty[];
  playtime?: PlaytimeCategory[];
  tags?: Tag[];
  /** Erscheinungsjahr (oder Bereich). */
  yearFrom?: number;
  yearTo?: number;
  sort?: GameSort;
}

export type GameSort =
  | "popular"
  | "newest"
  | "oldest"
  | "rating"
  | "title-asc";

/** Antworten aus dem Game Finder. */
export interface FinderAnswers {
  platform?: Platform;
  genre?: Genre;
  players?: "solo" | "friends";
  difficulty?: Difficulty;
  playtime?: PlaytimeCategory;
  mood?: Mood;
}

export interface FinderResult {
  game: Game;
  /** Trefferquote 0–100. */
  score: number;
  /** Menschlich lesbare Gründe, warum es passt. */
  reasons: string[];
}
