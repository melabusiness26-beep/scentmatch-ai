import type { Game } from "@/lib/types";
import GameCard from "./GameCard";

/** Responsives Raster aus Spiel-Karten (mobile-first: 2 Spalten am Handy). */
export default function GameGrid({ games }: { games: Game[] }) {
  if (games.length === 0) {
    return (
      <div className="surface p-8 text-center text-muted">
        Keine Spiele gefunden. Versuch andere Filter oder Suchbegriffe.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}
