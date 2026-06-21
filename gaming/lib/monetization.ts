/**
 * Monetarisierung – vorbereitet, noch nicht "scharf".
 *
 * `buyUrl()` liefert heute einen sicheren Fallback (Suche). Sobald du echte
 * Affiliate-Partner hast (z. B. ein Spiele-Key-Shop, Amazon, Instant Gaming,
 * Konsolen-Stores), trägst du die Partner-Basis-URL ein bzw. ergänzt pro Spiel
 * ein `affiliateUrl`-Feld – die Buttons nutzen es dann automatisch.
 */
import type { Game } from "@/lib/types";

/** Trage hier später deinen Affiliate-Tag/Partner ein. */
export const AFFILIATE = {
  enabled: false,
  // Beispiel: "https://www.instant-gaming.com/de/search/?q=" + tag
  searchBaseUrl: "https://www.google.com/search?q=",
  tag: "", // z. B. "?ref=deinpartner"
};

/** Kauf-/Info-Link für ein Spiel (mit sinnvollem Fallback). */
export function buyUrl(game: Game): string {
  if (game.officialWebsite) return game.officialWebsite;
  const query = encodeURIComponent(`${game.title} kaufen`);
  return `${AFFILIATE.searchBaseUrl}${query}`;
}
