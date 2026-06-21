import Link from "next/link";
import type { Game } from "@/lib/types";
import { getYear, isUpcoming } from "@/lib/games";
import CoverArt from "./CoverArt";

/**
 * Wiederverwendbare Spiel-Karte mit großem Cover.
 * Wird auf Startseite, Datenbank und in "ähnliche Spiele" genutzt.
 */
export default function GameCard({ game }: { game: Game }) {
  const upcoming = isUpcoming(game);

  return (
    <Link
      href={`/game/${game.slug}`}
      className="card card-hover group block"
      aria-label={`${game.title} ansehen`}
    >
      <div className="relative aspect-[3/4] w-full">
        <CoverArt game={game} className="h-full w-full" />

        {/* Lesbarkeits-Verlauf unten */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Status-Badge oben */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {upcoming ? (
            <span className="pill pill-accent">Bald</span>
          ) : (
            <span className="pill pill-gold">{getYear(game)}</span>
          )}
        </div>

        {/* Rating oben rechts (nur wenn vorhanden) */}
        {game.rating > 0 && (
          <div className="absolute right-3 top-3">
            <span className="pill">★ {(game.rating / 10).toFixed(1)}</span>
          </div>
        )}

        {/* Titel + Genre über dem Verlauf */}
        <div className="absolute inset-x-0 bottom-0 p-3">
          <h3 className="font-display text-base font-semibold leading-tight text-white line-clamp-2">
            {game.title}
          </h3>
          <p className="mt-1 text-xs text-white/70">{game.genres.slice(0, 2).join(" · ")}</p>
        </div>
      </div>
    </Link>
  );
}
