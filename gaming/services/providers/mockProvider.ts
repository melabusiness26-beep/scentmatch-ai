import { GAMES } from "@/data/games";
import { getNewAndUpcoming } from "@/lib/games";
import type { Game } from "@/lib/types";
import type { GameProvider } from "./types";

/**
 * Standard-Provider: liefert die kuratierten Mock-Daten.
 * Immer "konfiguriert" – damit die App ohne API-Keys voll funktioniert.
 */
export const mockProvider: GameProvider = {
  name: "mock",
  isConfigured: () => true,

  async fetchLatestGames(limit = 6): Promise<Game[]> {
    return getNewAndUpcoming(limit);
  },

  async fetchGameDetails(slug: string): Promise<Game | null> {
    return GAMES.find((g) => g.slug === slug) ?? null;
  },

  async fetchAllGames(): Promise<Game[]> {
    return GAMES;
  },
};
