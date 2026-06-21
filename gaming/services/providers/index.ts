import type { GameProvider } from "./types";
import { mockProvider } from "./mockProvider";
import { igdbProvider } from "./igdbProvider";
import { rawgProvider } from "./rawgProvider";
import { steamProvider } from "./steamProvider";

/**
 * Wählt den aktiven Provider.
 *
 * Reihenfolge (erster, der konfiguriert ist, gewinnt). Solange keine API-Keys
 * gesetzt sind, fällt alles automatisch auf den Mock-Provider zurück – die App
 * funktioniert also out-of-the-box.
 *
 * Über GAME_PROVIDER kann man die Quelle erzwingen (z. B. "rawg").
 */
export function getActiveProvider(): GameProvider {
  const forced = process.env.GAME_PROVIDER;
  const all: GameProvider[] = [igdbProvider, rawgProvider, steamProvider, mockProvider];

  if (forced) {
    const match = all.find((p) => p.name === forced);
    if (match && match.isConfigured()) return match;
  }

  return all.find((p) => p.isConfigured()) ?? mockProvider;
}

export { mockProvider, igdbProvider, rawgProvider, steamProvider };
export type { GameProvider };
