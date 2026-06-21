/**
 * Abfrage- und Logik-Schicht über den Spiel-Daten.
 *
 * Die UI ruft NUR diese Funktionen auf – nie direkt die Rohdaten. Wenn später
 * echte APIs dazukommen, ändert sich hier ggf. die Datenquelle (via
 * services/gamesService), aber die Funktionssignaturen bleiben gleich.
 */
import { GAMES } from "@/data/games";
import type {
  FinderAnswers,
  FinderResult,
  Game,
  GameFilters,
  GameSort,
  Mood,
} from "@/lib/types";

export function getAllGames(): Game[] {
  return GAMES;
}

export function getAllSlugs(): string[] {
  return GAMES.map((g) => g.slug);
}

export function getGameBySlug(slug: string): Game | undefined {
  return GAMES.find((g) => g.slug === slug);
}

export function getGamesBySlugs(slugs: string[]): Game[] {
  return slugs
    .map((slug) => getGameBySlug(slug))
    .filter((g): g is Game => Boolean(g));
}

export function getYear(game: Game): number {
  return new Date(game.releaseDate).getFullYear();
}

export function isUpcoming(game: Game): boolean {
  return new Date(game.releaseDate).getTime() > Date.now();
}

export function isRetro(game: Game): boolean {
  return getYear(game) <= 2005 || game.platforms.includes("Retro");
}

export function formatReleaseDate(game: Game): string {
  const d = new Date(game.releaseDate);
  const text = d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return isUpcoming(game) ? `${text} (erwartet)` : text;
}

/* ---------------------------------------------------------------- Sektionen */

export function getPopularGames(limit = 6): Game[] {
  return [...GAMES].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getNewAndUpcoming(limit = 6): Game[] {
  // Upcoming zuerst (näheste Releases), danach die neuesten erschienenen Spiele.
  const upcoming = GAMES.filter(isUpcoming).sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
  );
  const released = GAMES.filter((g) => !isUpcoming(g)).sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );
  return [...upcoming, ...released].slice(0, limit);
}

export function getRetroClassics(limit = 6): Game[] {
  return GAMES.filter(isRetro)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getGamesByMood(mood: Mood, limit = 6): Game[] {
  return GAMES.filter((g) => g.moods.includes(mood))
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

/* ------------------------------------------------------------- Suche/Filter */

function matchesQuery(game: Game, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    game.title,
    game.developer,
    game.publisher,
    ...game.genres,
    ...game.subgenres,
    ...game.tags,
    ...game.platforms,
    ...game.moods,
  ]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

export function searchGames(query: string): Game[] {
  return GAMES.filter((g) => matchesQuery(g, query));
}

export function sortGames(games: Game[], sort: GameSort = "popular"): Game[] {
  const list = [...games];
  switch (sort) {
    case "newest":
      return list.sort(
        (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
      );
    case "oldest":
      return list.sort(
        (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
      );
    case "rating":
      return list.sort((a, b) => b.rating - a.rating);
    case "title-asc":
      return list.sort((a, b) => a.title.localeCompare(b.title));
    case "popular":
    default:
      return list.sort((a, b) => b.popularity - a.popularity);
  }
}

export function filterGames(filters: GameFilters): Game[] {
  let result = GAMES.filter((game) => {
    if (filters.query && !matchesQuery(game, filters.query)) return false;
    if (filters.genres?.length && !filters.genres.some((g) => game.genres.includes(g)))
      return false;
    if (filters.platforms?.length && !filters.platforms.some((p) => game.platforms.includes(p)))
      return false;
    if (filters.modes?.length && !filters.modes.some((m) => game.modes.includes(m)))
      return false;
    if (filters.difficulty?.length && !filters.difficulty.includes(game.difficulty))
      return false;
    if (filters.playtime?.length && !filters.playtime.includes(game.playtime.category))
      return false;
    if (filters.tags?.length && !filters.tags.every((t) => game.tags.includes(t)))
      return false;
    const year = getYear(game);
    if (filters.yearFrom && year < filters.yearFrom) return false;
    if (filters.yearTo && year > filters.yearTo) return false;
    return true;
  });
  result = sortGames(result, filters.sort);
  return result;
}

/* -------------------------------------------------------- Ähnliche Spiele */

export function getSimilarGames(game: Game, limit = 4): Game[] {
  // 1) Explizit gepflegte ähnliche Spiele zuerst.
  const explicit = getGamesBySlugs(game.similarGames);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // 2) Auffüllen über geteilte Genres/Tags/Moods.
  const scored = GAMES.filter(
    (g) => g.slug !== game.slug && !game.similarGames.includes(g.slug),
  )
    .map((g) => {
      const shared =
        g.genres.filter((x) => game.genres.includes(x)).length * 3 +
        g.tags.filter((x) => game.tags.includes(x)).length * 2 +
        g.moods.filter((x) => game.moods.includes(x)).length;
      return { g, shared };
    })
    .filter((s) => s.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((s) => s.g);

  return [...explicit, ...scored].slice(0, limit);
}

/* --------------------------------------------------------- Game Finder Engine */

/**
 * Bewertet jedes Spiel gegen die Finder-Antworten (0–100) und liefert die
 * besten Treffer mit menschlich lesbaren Begründungen.
 *
 * Gewichte (Summe der maximal möglichen Pluspunkte = 100):
 *  - Plattform 25, Genre 25, Mood 20, Spieleranzahl (solo/friends) 15,
 *    Schwierigkeit 10, Spielzeit 10. Plattform ist außerdem ein weicher Filter.
 */
export function runFinder(answers: FinderAnswers, limit = 6): FinderResult[] {
  const results: FinderResult[] = GAMES.map((game) => {
    let score = 0;
    const reasons: string[] = [];

    if (answers.platform) {
      if (game.platforms.includes(answers.platform)) {
        score += 25;
        reasons.push(`Verfügbar auf ${answers.platform}`);
      }
    } else {
      score += 12; // keine Angabe → neutral
    }

    if (answers.genre) {
      if (game.genres.includes(answers.genre)) {
        score += 25;
        reasons.push(`Passt zum Genre ${answers.genre}`);
      }
    } else {
      score += 12;
    }

    if (answers.mood) {
      if (game.moods.includes(answers.mood)) {
        score += 20;
        reasons.push(`Stimmung: ${answers.mood}`);
      }
    } else {
      score += 10;
    }

    if (answers.players) {
      const wantsFriends = answers.players === "friends";
      const social = game.multiplayer || game.coop;
      if (wantsFriends && social) {
        score += 15;
        reasons.push("Gut mit Freunden spielbar");
      } else if (!wantsFriends && game.modes.includes("Single-player")) {
        score += 15;
        reasons.push("Starkes Solo-Erlebnis");
      }
    } else {
      score += 7;
    }

    if (answers.difficulty) {
      if (game.difficulty === answers.difficulty) {
        score += 10;
        reasons.push(`Schwierigkeit: ${answers.difficulty}`);
      } else {
        score += 3; // grobe Toleranz
      }
    } else {
      score += 5;
    }

    if (answers.playtime) {
      if (game.playtime.category === answers.playtime) {
        score += 10;
        reasons.push(`Spielzeit passt (${game.playtime.category})`);
      } else {
        score += 3;
      }
    } else {
      score += 5;
    }

    return { game, score: Math.min(100, Math.round(score)), reasons };
  });

  // Wenn eine Plattform gewählt wurde, bevorzugen wir passende Titel klar:
  // nicht-passende werden ans Ende sortiert (weicher Filter).
  return results
    .sort((a, b) => {
      if (answers.platform) {
        const aHas = a.game.platforms.includes(answers.platform);
        const bHas = b.game.platforms.includes(answers.platform);
        if (aHas !== bHas) return aHas ? -1 : 1;
      }
      return b.score - a.score;
    })
    .slice(0, limit);
}
