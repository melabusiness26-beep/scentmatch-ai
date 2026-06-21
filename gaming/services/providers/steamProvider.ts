import type { Game } from "@/lib/types";
import type { GameProvider } from "./types";

/**
 * Steam-Provider (Platzhalter / Vorbereitung).
 *
 * Nützlich vor allem für Preise, Reviews und Store-Infos.
 * Teilweise ohne Key nutzbar (Storefront-API), Web-API braucht STEAM_API_KEY.
 *  - App-Details: https://store.steampowered.com/api/appdetails?appids=APPID
 *  - Doku: https://steamcommunity.com/dev
 */
export const steamProvider: GameProvider = {
  name: "steam",

  isConfigured(): boolean {
    return Boolean(process.env.STEAM_API_KEY);
  },

  async fetchLatestGames(): Promise<Game[]> {
    throw new Error("Steam-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchGameDetails(): Promise<Game | null> {
    throw new Error("Steam-Provider ist noch nicht implementiert (nur vorbereitet).");
  },

  async fetchAllGames(): Promise<Game[]> {
    throw new Error("Steam-Provider ist noch nicht implementiert (nur vorbereitet).");
  },
};

export function mapSteamToGame(/* raw: unknown */): Partial<Game> {
  return {};
}
