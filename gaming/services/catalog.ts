/**
 * Server-seitiger Katalog.
 *
 * Liefert alle Spiele – und reichert sie mit echten Cover-Bildern an, FALLS ein
 * RAWG-Schlüssel (RAWG_API_KEY) gesetzt ist. Ohne Schlüssel kommen exakt die
 * kuratierten Mock-Daten zurück (mit generierten Cover-Grafiken).
 *
 * Diese Funktion nur in Server-Komponenten/Seiten verwenden (sie ist async und
 * greift auf eine externe API zu).
 */
import "server-only";
import { GAMES } from "@/data/games";
import { fetchCoverFromRawg } from "./covers";
import type { Game } from "@/lib/types";

let cache: { games: Game[]; at: number } | null = null;
const TTL = 1000 * 60 * 60; // 1 Stunde im Server-Speicher

export async function getCatalog(): Promise<Game[]> {
  // Ohne API-Schlüssel: unveränderte kuratierte Daten.
  if (!process.env.RAWG_API_KEY) return GAMES;

  // Einfacher In-Memory-Cache, damit nicht jede Anfrage erneut anreichert.
  if (cache && Date.now() - cache.at < TTL) return cache.games;

  const enriched = await Promise.all(
    GAMES.map(async (game) => {
      if (game.coverImage) return game; // bereits gesetzt → nichts tun
      const cover = await fetchCoverFromRawg(game.title);
      return cover ? { ...game, coverImage: cover } : game;
    }),
  );

  cache = { games: enriched, at: Date.now() };
  return enriched;
}
