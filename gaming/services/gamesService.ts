/**
 * Öffentliche Service-API der App.
 *
 * Dies ist die EINZIGE Stelle, die UI/Seiten für "Daten von außen" aufrufen
 * sollten. Sie delegiert an den aktuell aktiven Provider (Mock oder echte API).
 * So bleibt der Wechsel auf IGDB/RAWG/Steam ein Ein-Zeilen-Schritt.
 *
 * Beispiel:
 *   const games = await fetchLatestGames();
 */
import type { Game } from "@/lib/types";
import { getActiveProvider } from "./providers";

/** Neueste & kommende Spiele (z. B. für die Startseite). */
export async function fetchLatestGames(limit = 6): Promise<Game[]> {
  const provider = getActiveProvider();
  return provider.fetchLatestGames(limit);
}

/** Details zu einem einzelnen Spiel. */
export async function fetchGameDetails(slug: string): Promise<Game | null> {
  const provider = getActiveProvider();
  return provider.fetchGameDetails(slug);
}

/** Alle Spiele (Suche, Sitemap, Vollimport). */
export async function fetchAllGames(): Promise<Game[]> {
  const provider = getActiveProvider();
  return provider.fetchAllGames();
}

/**
 * Aktualisierungs-Routine (vorbereitet).
 *
 * Später hier: neue Daten von der API holen, in `Game` mappen und in einer
 * Datenbank (z. B. Supabase/Postgres) speichern bzw. den Cache neu aufbauen.
 * Ideal als Cron-Job (z. B. Vercel Cron) oder als Route Handler
 * `app/api/cron/update/route.ts`.
 *
 * Aktuell: No-op gegen den Mock-Provider, damit der Aufruf sicher ist.
 */
export async function updateGameData(): Promise<{
  source: string;
  fetched: number;
  updated: number;
  ranAt: string;
}> {
  const provider = getActiveProvider();
  const all = await provider.fetchAllGames();

  // TODO(real API): all.forEach(game => upsertIntoDatabase(game));

  return {
    source: provider.name,
    fetched: all.length,
    updated: 0,
    ranAt: new Date().toISOString(),
  };
}
