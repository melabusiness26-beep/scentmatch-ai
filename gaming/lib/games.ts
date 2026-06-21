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

export function getGameBySlug(slug: string, games: Game[] = GAMES): Game | undefined {
  return games.find((g) => g.slug === slug);
}

export function getGamesBySlugs(slugs: string[], games: Game[] = GAMES): Game[] {
  return slugs
    .map((slug) => getGameBySlug(slug, games))
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

export function getPopularGames(limit = 6, games: Game[] = GAMES): Game[] {
  return [...games].sort((a, b) => b.popularity - a.popularity).slice(0, limit);
}

export function getNewAndUpcoming(limit = 6, games: Game[] = GAMES): Game[] {
  // Upcoming zuerst (näheste Releases), danach die neuesten erschienenen Spiele.
  const upcoming = games.filter(isUpcoming).sort(
    (a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime(),
  );
  const released = games.filter((g) => !isUpcoming(g)).sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
  );
  return [...upcoming, ...released].slice(0, limit);
}

export function getRetroClassics(limit = 6, games: Game[] = GAMES): Game[] {
  return games
    .filter(isRetro)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
}

export function getGamesByMood(mood: Mood, limit = 6, games: Game[] = GAMES): Game[] {
  return games
    .filter((g) => g.moods.includes(mood))
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

export function filterGames(filters: GameFilters, games: Game[] = GAMES): Game[] {
  let result = games.filter((game) => {
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

export function getSimilarGames(game: Game, limit = 4, games: Game[] = GAMES): Game[] {
  // 1) Explizit gepflegte ähnliche Spiele zuerst.
  const explicit = getGamesBySlugs(game.similarGames, games);
  if (explicit.length >= limit) return explicit.slice(0, limit);

  // 2) Auffüllen über geteilte Genres/Tags/Moods.
  const scored = games.filter(
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
export function runFinder(
  answers: FinderAnswers,
  limit = 6,
  games: Game[] = GAMES,
): FinderResult[] {
  const has = <T>(arr: T[] | undefined) => Array.isArray(arr) && arr.length > 0;
  const wantPlatforms = has(answers.platforms);

  const results: FinderResult[] = games.map((game) => {
    let score = 0;
    const reasons: string[] = [];

    // Plattform (25)
    if (wantPlatforms) {
      const hit = answers.platforms!.filter((p) => game.platforms.includes(p));
      if (hit.length) {
        score += 25;
        reasons.push(`Verfügbar auf ${hit.join(", ")}`);
      }
    } else {
      score += 12;
    }

    // Genre (25)
    if (has(answers.genres)) {
      const hit = answers.genres!.filter((g) => game.genres.includes(g));
      if (hit.length) {
        score += 25;
        reasons.push(`Genre: ${hit.join(", ")}`);
      }
    } else {
      score += 12;
    }

    // Mood (20)
    if (has(answers.moods)) {
      const hit = answers.moods!.filter((m) => game.moods.includes(m));
      if (hit.length) {
        score += 20;
        reasons.push(`Stimmung: ${hit.join(", ")}`);
      }
    } else {
      score += 10;
    }

    // Spieleranzahl (15)
    if (has(answers.players)) {
      const wantsFriends = answers.players!.includes("friends");
      const wantsSolo = answers.players!.includes("solo");
      const social = game.multiplayer || game.coop;
      const solo = game.modes.includes("Single-player");
      if ((wantsFriends && social) || (wantsSolo && solo)) {
        score += 15;
        reasons.push(wantsFriends && social ? "Gut mit Freunden" : "Starkes Solo-Erlebnis");
      }
    } else {
      score += 7;
    }

    // Schwierigkeit (10)
    if (has(answers.difficulties)) {
      if (answers.difficulties!.includes(game.difficulty)) {
        score += 10;
        reasons.push(`Schwierigkeit: ${game.difficulty}`);
      } else {
        score += 3;
      }
    } else {
      score += 5;
    }

    // Spielzeit (10)
    if (has(answers.playtimes)) {
      if (answers.playtimes!.includes(game.playtime.category)) {
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

  return results
    .sort((a, b) => {
      if (wantPlatforms) {
        const aHas = answers.platforms!.some((p) => a.game.platforms.includes(p));
        const bHas = answers.platforms!.some((p) => b.game.platforms.includes(p));
        if (aHas !== bHas) return aHas ? -1 : 1;
      }
      return b.score - a.score;
    })
    .slice(0, limit);
}
