/**
 * Server-seitiger Katalog (die zentrale Spiele-Quelle für alle Seiten).
 *
 * - OHNE RAWG_API_KEY: nur die handkuratierten Spiele (mit generierten Covern).
 * - MIT RAWG_API_KEY: kuratierte Spiele (mit echten Covern) PLUS hunderte
 *   echte Spiele direkt aus der RAWG-Datenbank – die "große Datenbank".
 *
 * Nur in Server-Komponenten/Seiten verwenden (async + externe API).
 */
import "server-only";
import { GAMES } from "@/data/games";
import { fetchCoverFromRawg } from "./covers";
import { rawgProvider } from "./providers/rawgProvider";
import type { Game } from "@/lib/types";

let cache: { games: Game[]; at: number } | null = null;
const TTL = 1000 * 60 * 60; // 1 Stunde im Server-Speicher

/** Kuratierte Spiele mit echten Cover-Bildern anreichern (falls Schlüssel da). */
async function enrichCurated(): Promise<Game[]> {
  return Promise.all(
    GAMES.map(async (game) => {
      if (game.coverImage) return game;
      const cover = await fetchCoverFromRawg(game.title);
      return cover ? { ...game, coverImage: cover } : game;
    }),
  );
}

export async function getCatalog(): Promise<Game[]> {
  // Ohne API-Schlüssel: unveränderte kuratierte Daten.
  if (!process.env.RAWG_API_KEY) return GAMES;

  if (cache && Date.now() - cache.at < TTL) return cache.games;

  try {
    const [curated, rawg] = await Promise.all([
      enrichCurated(),
      rawgProvider.fetchAllGames().catch(() => [] as Game[]),
    ]);

    // Kuratierte zuerst (reiche Daten gewinnen), dann alle anderen RAWG-Spiele.
    const seen = new Set(curated.map((g) => g.slug));
    const extra = rawg.filter((g) => !seen.has(g.slug));
    const merged = [...curated, ...extra];

    cache = { games: merged, at: Date.now() };
    return merged;
  } catch {
    return GAMES;
  }
}
