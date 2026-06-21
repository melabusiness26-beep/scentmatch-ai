/**
 * RAWG-Provider – holt echte Spiele von der RAWG-Datenbank (über 800.000 Spiele).
 *
 * Aktivierung: nur EINEN Schlüssel setzen → RAWG_API_KEY (gratis: rawg.io/apidocs).
 * Ohne Schlüssel passiert nichts (die App nutzt die kuratierten Daten).
 *
 * Jede RAWG-Antwort wird sauber in unseren `Game`-Typ gemappt, damit die ganze
 * UI (Karten, Filter, Finder, Detailseiten) unverändert funktioniert.
 */
import { GENRES, PLATFORMS } from "@/data/taxonomy";
import type {
  Difficulty,
  Game,
  GameMode,
  Genre,
  Mood,
  Platform,
  PlaytimeCategory,
  Tag,
} from "@/lib/types";
import type { GameProvider } from "./types";

const API = "https://api.rawg.io/api/games";
const CACHE = { next: { revalidate: 60 * 60 * 24 * 7 } }; // 7 Tage

interface RawgItem {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  background_image: string | null;
  rating: number;
  ratings_count?: number;
  metacritic?: number | null;
  playtime?: number;
  platforms?: { platform: { name: string } }[];
  genres?: { name: string }[];
  tags?: { name: string }[];
  esrb_rating?: { name: string } | null;
  added?: number;
}

interface RawgDetail extends RawgItem {
  description_raw?: string;
  website?: string;
  developers?: { name: string }[];
  publishers?: { name: string }[];
}

const GENRE_SET = new Set<string>(GENRES);
const PLATFORM_SET = new Set<string>(PLATFORMS);

const PLATFORM_MAP: Record<string, Platform> = {
  PC: "PC",
  "PlayStation 5": "PlayStation 5",
  "PlayStation 4": "PlayStation 4",
  "Xbox Series S/X": "Xbox Series X|S",
  "Xbox One": "Xbox One",
  "Nintendo Switch": "Nintendo Switch",
  iOS: "Mobile",
  Android: "Mobile",
  macOS: "PC",
  Linux: "PC",
};

const RETRO_PLATFORMS = new Set([
  "PlayStation", "PlayStation 2", "PlayStation 3", "Xbox 360", "Xbox",
  "Nintendo 64", "GameCube", "Wii", "Wii U", "SNES", "NES", "Game Boy",
  "Game Boy Advance", "Nintendo DS", "Nintendo 3DS", "Genesis", "Dreamcast",
  "PSP", "PS Vita", "Atari", "Commodore / Amiga",
]);

const GENRE_MAP: Record<string, Genre> = {
  "Massively Multiplayer": "MMORPG",
  Card: "Card Game",
};

const TAG_MAP: Record<string, Tag> = {
  singleplayer: "story-rich",
  multiplayer: "multiplayer",
  "co-op": "couch co-op",
  coop: "couch co-op",
  atmospheric: "atmospheric",
  "story rich": "story-rich",
  "open world": "open world",
  horror: "horror",
  indie: "indie",
  "pixel graphics": "pixel art",
  "2d": "pixel art",
  "sci-fi": "sci-fi",
  fantasy: "fantasy",
  exploration: "exploration",
  "rogue-like": "roguelike",
  "rogue-lite": "roguelike",
  puzzle: "puzzle",
  survival: "survival",
  crafting: "crafting",
  "base building": "base-building",
  stealth: "stealth",
  "post-apocalyptic": "post-apocalyptic",
  soulslike: "soulslike",
  "free to play": "free-to-play",
  funny: "funny",
  comedy: "funny",
  retro: "retro",
  "battle royale": "battle royale",
  "deck building": "deckbuilder",
};

const PALETTE: [string, string][] = [
  ["#7d3cff", "#1f1140"], ["#2c6fb3", "#0c1d33"], ["#c0392b", "#2a0d0a"],
  ["#2e8b57", "#0f3d2e"], ["#b8860b", "#3a2a10"], ["#d6336c", "#2a0f1d"],
  ["#1f8f8f", "#0c2a2a"], ["#8e44ad", "#1d0f24"], ["#b0762a", "#241608"],
];

function accentFor(slug: string): [string, string] {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

function mapPlatforms(item: RawgItem): Platform[] {
  const out = new Set<Platform>();
  for (const p of item.platforms ?? []) {
    const name = p.platform?.name ?? "";
    if (PLATFORM_MAP[name]) out.add(PLATFORM_MAP[name]);
    else if (RETRO_PLATFORMS.has(name)) out.add("Retro");
  }
  return out.size ? [...out] : ["PC"];
}

function mapGenres(item: RawgItem): Genre[] {
  const out = new Set<Genre>();
  for (const g of item.genres ?? []) {
    const name = g.name ?? "";
    if (GENRE_MAP[name]) out.add(GENRE_MAP[name]);
    else if (GENRE_SET.has(name)) out.add(name as Genre);
  }
  return out.size ? [...out] : ["Action"];
}

function tagNames(item: RawgItem): string[] {
  return (item.tags ?? []).map((t) => (t.name ?? "").toLowerCase());
}

function mapTags(item: RawgItem): Tag[] {
  const names = tagNames(item);
  const out = new Set<Tag>();
  for (const n of names) if (TAG_MAP[n]) out.add(TAG_MAP[n]);
  return [...out].slice(0, 8);
}

function mapMoods(genres: Genre[], tags: Tag[]): Mood[] {
  const out = new Set<Mood>();
  if (genres.includes("Horror") || tags.includes("horror")) out.add("Scary");
  if (genres.includes("Puzzle")) out.add("Mind-bending");
  if (genres.includes("RPG") || genres.includes("Adventure") || tags.includes("story-rich"))
    out.add("Story-rich");
  if (genres.includes("Shooter") || genres.includes("Fighting") || genres.includes("Action"))
    out.add("Adrenaline");
  if (genres.includes("Strategy") || genres.includes("Card Game")) out.add("Competitive");
  if (tags.includes("cozy") || tags.includes("casual")) out.add("Relaxing");
  if (tags.includes("funny")) out.add("Funny");
  if (tags.includes("multiplayer")) out.add("Social");
  if (!out.size) out.add("Epic");
  return [...out];
}

function mapModes(item: RawgItem): { modes: GameMode[]; multiplayer: boolean; coop: boolean } {
  const names = tagNames(item);
  const has = (s: string) => names.some((n) => n.includes(s));
  const modes: GameMode[] = [];
  if (has("singleplayer") || !has("multiplayer")) modes.push("Single-player");
  const multiplayer = has("multiplayer") || has("pvp");
  const coop = has("co-op") || has("coop");
  if (multiplayer) modes.push("Multiplayer");
  if (coop) modes.push("Co-op");
  if (!modes.length) modes.push("Single-player");
  return { modes: [...new Set(modes)], multiplayer, coop };
}

function playtimeFrom(hours: number | undefined): Game["playtime"] {
  const h = hours && hours > 0 ? hours : 0;
  let category: PlaytimeCategory = "Medium";
  if (h > 0 && h < 10) category = "Short";
  else if (h < 30) category = "Medium";
  else if (h < 80) category = "Long";
  else if (h >= 80) category = "Endless";
  return { hoursMain: h, hoursFull: h ? Math.round(h * 1.8) : 0, category };
}

function difficultyFrom(tags: Tag[]): Difficulty {
  if (tags.includes("soulslike")) return "Hardcore";
  return "Moderate";
}

function ratingFrom(item: RawgItem): number {
  if (item.metacritic && item.metacritic > 0) return item.metacritic;
  if (item.rating && item.rating > 0) return Math.round(item.rating * 20);
  return 0;
}

/** Wandelt einen RAWG-Eintrag (Liste) in unseren leichten `Game`-Typ. */
function mapItem(item: RawgItem): Game {
  const platforms = mapPlatforms(item);
  const genres = mapGenres(item);
  const tags = mapTags(item);
  const moods = mapMoods(genres, tags);
  const { modes, multiplayer, coop } = mapModes(item);
  const year = item.released ? new Date(item.released).getFullYear() : null;

  return {
    id: `rawg-${item.id}`,
    title: item.name,
    slug: item.slug,
    coverImage: item.background_image ?? undefined,
    releaseDate: item.released ?? "2000-01-01",
    developer: "—",
    publisher: "—",
    platforms,
    genres,
    subgenres: [],
    modes,
    tags,
    moods,
    descriptionShort:
      `${genres.join(" · ")}-Spiel${year ? ` aus ${year}` : ""}. Tippe für alle Details.`,
    descriptionLong: "",
    story: "",
    gameplay: "",
    difficulty: difficultyFrom(tags),
    playtime: playtimeFrom(item.playtime),
    ageRating: item.esrb_rating?.name ?? "k. A.",
    languages: ["English"],
    priceRange: { tier: "Standard", amountEUR: null, display: "Preis im Shop prüfen" },
    multiplayer,
    coop,
    crossplay: false,
    controllerSupport: true,
    accessibility: [],
    similarGames: [],
    dlcs: [],
    updates: [],
    popularity: Math.min(100, Math.max(40, ratingFrom(item) || 60)),
    rating: ratingFrom(item),
    accent: accentFor(item.slug),
    bestFor: [`${genres[0]}-Fans`],
    highlights: [
      ...(ratingFrom(item) ? [`Wertung ${(ratingFrom(item) / 10).toFixed(1)}/10`] : []),
      ...(item.playtime ? [`ca. ${item.playtime} h Spielzeit`] : []),
      `Plattformen: ${platforms.join(", ")}`,
    ],
    source: "rawg",
  };
}

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, CACHE);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export const rawgProvider: GameProvider = {
  name: "rawg",

  isConfigured(): boolean {
    return Boolean(process.env.RAWG_API_KEY);
  },

  async fetchLatestGames(limit = 12): Promise<Game[]> {
    const key = process.env.RAWG_API_KEY;
    if (!key) return [];
    const today = new Date().toISOString().slice(0, 10);
    const url = `${API}?key=${key}&ordering=-released&dates=2023-01-01,${today}&page_size=${limit}`;
    const data = await getJson<{ results: RawgItem[] }>(url);
    return (data?.results ?? []).map(mapItem);
  },

  async fetchGameDetails(slug: string): Promise<Game | null> {
    const key = process.env.RAWG_API_KEY;
    if (!key) return null;
    const detail = await getJson<RawgDetail>(`${API}/${slug}?key=${key}`);
    if (!detail) return null;
    const base = mapItem(detail);
    return {
      ...base,
      developer: detail.developers?.[0]?.name ?? base.developer,
      publisher: detail.publishers?.[0]?.name ?? base.publisher,
      officialWebsite: detail.website || undefined,
      descriptionLong: detail.description_raw?.trim() || base.descriptionShort,
    };
  },

  /** Holt mehrere Seiten der beliebtesten Spiele (für eine große Datenbank). */
  async fetchAllGames(): Promise<Game[]> {
    const key = process.env.RAWG_API_KEY;
    if (!key) return [];
    const pages = [1, 2, 3, 4, 5, 6]; // ~240 Spiele
    const lists = await Promise.all(
      pages.map((page) =>
        getJson<{ results: RawgItem[] }>(
          `${API}?key=${key}&ordering=-added&page_size=40&page=${page}`,
        ),
      ),
    );
    const items = lists.flatMap((l) => l?.results ?? []);
    const seen = new Set<string>();
    const out: Game[] = [];
    for (const item of items) {
      if (!item?.slug || seen.has(item.slug)) continue;
      seen.add(item.slug);
      out.push(mapItem(item));
    }
    return out;
  },
};

export function mapRawgToGame(item: RawgItem): Game {
  return mapItem(item);
}
