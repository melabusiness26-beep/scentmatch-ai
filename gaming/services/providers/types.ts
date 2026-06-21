import type { Game } from "@/lib/types";

/**
 * Einheitliche Schnittstelle für jede Datenquelle (Mock oder echte API).
 *
 * Jeder Provider MUSS seine Rohdaten in unseren `Game`-Typ mappen. Dadurch
 * kann die App die Quelle wechseln, ohne dass UI oder Logik sich ändern.
 */
export interface GameProvider {
  /** Eindeutiger Name, z. B. "mock", "igdb", "rawg", "steam". */
  name: string;
  /** Ist dieser Provider einsatzbereit (z. B. API-Key vorhanden)? */
  isConfigured(): boolean;
  /** Neueste / kommende Spiele. */
  fetchLatestGames(limit?: number): Promise<Game[]>;
  /** Details zu einem Spiel anhand des Slugs. */
  fetchGameDetails(slug: string): Promise<Game | null>;
  /** Alle Spiele (für Sitemap, Suche, Vollimport). */
  fetchAllGames(): Promise<Game[]>;
}
