import type { Game } from "@/lib/types";
import { buyUrl } from "@/lib/monetization";

/**
 * "Bestes Angebot finden"-Button (Affiliate-vorbereitet).
 * Aktuell führt er zur offiziellen Seite bzw. einer Suche; als `sponsored`
 * markiert, damit es sauber bleibt, sobald echte Affiliate-Links kommen.
 */
export default function AffiliateButton({
  game,
  className = "",
}: {
  game: Game;
  className?: string;
}) {
  return (
    <a
      href={buyUrl(game)}
      target="_blank"
      rel="sponsored noopener noreferrer"
      className={`btn btn-primary ${className}`}
    >
      Bestes Angebot finden
      <span aria-hidden="true">↗</span>
    </a>
  );
}
