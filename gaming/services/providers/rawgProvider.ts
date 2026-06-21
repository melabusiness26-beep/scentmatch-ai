import type { Game } from "@/lib/types";
import type { GameProvider } from "./types";

/**
 * RAWG-Provider (Platzhalter / Vorbereitung).
 *
 * RAWG ist einfach zu starten (nur ein API-Key): RAWG_API_KEY.
 * Doku: https://rawg.io/apidocs
 *
 * Beispiel-Endpunkte:
 *  - Liste:   https://api.rawg.io/api/games?key=KEY&ordering=-released
 *  - Details: https://api.rawg.io/api/games/{slug}?key=KEY
 */
export const rawgProvider: GameProvider = {
  name: "rawg",

  isConfigured(): boolean {
    return Boolean(process.env.RAWG_API_KEY);
  },

  async fetchLatestGames(): Promise<Game[]> {
    throw new Error("RAWG-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchGameDetails(): Promise<Game | null> {
    throw new Error("RAWG-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchAllGames(): Promise<Game[]> {
    throw new Error("RAWG-Provider ist noch nicht implementiert (nur vorbereitet).");
  },
};

export function mapRawgToGame(/* raw: unknown */): Partial<Game> {
  return {};
}
