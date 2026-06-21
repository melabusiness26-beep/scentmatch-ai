import type { Game } from "@/lib/types";
import type { GameProvider } from "./types";

/**
 * IGDB-Provider (Platzhalter / Vorbereitung).
 *
 * IGDB läuft über Twitch-Auth: IGDB_CLIENT_ID + IGDB_CLIENT_SECRET.
 * Doku: https://api-docs.igdb.com
 *
 * So aktivierst du es später:
 *  1. Env-Variablen in .env.local (und bei Vercel) setzen.
 *  2. Twitch-Token holen (POST https://id.twitch.tv/oauth2/token).
 *  3. Felder abfragen (POST https://api.igdb.com/v4/games) und mit
 *     `mapIgdbToGame()` in unseren Typ umwandeln.
 *  4. In services/providers/index.ts diesen Provider bevorzugen.
 */
export const igdbProvider: GameProvider = {
  name: "igdb",

  isConfigured(): boolean {
    return Boolean(process.env.IGDB_CLIENT_ID && process.env.IGDB_CLIENT_SECRET);
  },

  async fetchLatestGames(): Promise<Game[]> {
    throw new Error("IGDB-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchGameDetails(): Promise<Game | null> {
    throw new Error("IGDB-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchAllGames(): Promise<Game[]> {
    throw new Error("IGDB-Provider ist noch nicht implementiert (nur vorbereitet).");
  },
};

/**
 * Beispiel-Mapper: rohe IGDB-Antwort → unser `Game`-Typ.
 * (Hier nur als Gerüst – Felder anpassen, sobald echte Antworten vorliegen.)
 */
export function mapIgdbToGame(/* raw: unknown */): Partial<Game> {
  // const r = raw as Record<string, unknown>;
  // return { id: String(r.id), title: r.name as string, ... };
  return {};
}
