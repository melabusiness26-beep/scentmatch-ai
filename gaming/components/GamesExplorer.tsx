"use client";

import { useMemo, useState } from "react";
import GameGrid from "@/components/GameGrid";
import { filterGames, isRetro } from "@/lib/games";
import {
  DIFFICULTIES,
  GENRES,
  MODES,
  PLATFORMS,
  PLAYTIMES,
  TAGS,
} from "@/data/taxonomy";
import type {
  Difficulty,
  GameMode,
  GameSort,
  Genre,
  Mood,
  Platform,
  PlaytimeCategory,
  Tag,
} from "@/lib/types";

type Section = "new" | "retro" | undefined;

const SORTS: { value: GameSort; label: string }[] = [
  { value: "popular", label: "Beliebtheit" },
  { value: "newest", label: "Neueste zuerst" },
  { value: "oldest", label: "Älteste zuerst" },
  { value: "rating", label: "Beste Wertung" },
  { value: "title-asc", label: "Titel A–Z" },
];

/** Toggle-Helfer: Wert in einer Liste an-/abwählen. */
function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function GamesExplorer({
  initialQuery = "",
  initialGenre,
  initialPlatform,
  initialMood,
  initialSection,
}: {
  initialQuery?: string;
  initialGenre?: Genre;
  initialPlatform?: Platform;
  initialMood?: Mood;
  initialSection?: Section;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [genres, setGenres] = useState<Genre[]>(initialGenre ? [initialGenre] : []);
  const [platforms, setPlatforms] = useState<Platform[]>(
    initialPlatform ? [initialPlatform] : [],
  );
  const [modes, setModes] = useState<GameMode[]>([]);
  const [difficulties, setDifficulties] = useState<Difficulty[]>([]);
  const [playtimes, setPlaytimes] = useState<PlaytimeCategory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [mood, setMood] = useState<Mood | undefined>(initialMood);
  const [section] = useState<Section>(initialSection);
  const [sort, setSort] = useState<GameSort>(
    initialSection === "new" ? "newest" : "popular",
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = filterGames({
      query,
      genres,
      platforms,
      modes,
      difficulty: difficulties,
      playtime: playtimes,
      tags,
      sort,
    });
    if (mood) list = list.filter((g) => g.moods.includes(mood));
    if (section === "retro") list = list.filter(isRetro);
    return list;
  }, [query, genres, platforms, modes, difficulties, playtimes, tags, sort, mood, section]);

  const activeCount =
    genres.length +
    platforms.length +
    modes.length +
    difficulties.length +
    playtimes.length +
    tags.length +
    (mood ? 1 : 0);

  function reset() {
    setGenres([]);
    setPlatforms([]);
    setModes([]);
    setDifficulties([]);
    setPlaytimes([]);
    setTags([]);
    setMood(undefined);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar / Filter */}
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            ☰ Filter {activeCount > 0 && <span className="pill pill-accent">{activeCount}</span>}
          </button>
          {activeCount > 0 && (
            <button type="button" onClick={reset} className="text-sm text-muted hover:text-fg">
              Zurücksetzen
            </button>
          )}
        </div>

        <div className={`${filtersOpen ? "block" : "hidden"} space-y-5 lg:block`}>
          <div className="hidden items-center justify-between lg:flex">
            <h2 className="font-display text-lg font-semibold">Filter</h2>
            {activeCount > 0 && (
              <button type="button" onClick={reset} className="text-sm text-muted hover:text-fg">
                Zurücksetzen
              </button>
            )}
          </div>

          <ChipGroup
            title="Genre"
            options={GENRES}
            selected={genres}
            onToggle={(v) => setGenres((s) => toggle(s, v))}
          />
          <ChipGroup
            title="Plattform"
            options={PLATFORMS}
            selected={platforms}
            onToggle={(v) => setPlatforms((s) => toggle(s, v))}
          />
          <ChipGroup
            title="Spielmodus"
            options={MODES}
            selected={modes}
            onToggle={(v) => setModes((s) => toggle(s, v))}
          />
          <ChipGroup
            title="Schwierigkeit"
            options={DIFFICULTIES}
            selected={difficulties}
            onToggle={(v) => setDifficulties((s) => toggle(s, v))}
          />
          <div>
            <h3 className="mb-2 text-sm font-semibold">Spielzeit</h3>
            <div className="flex flex-wrap gap-2">
              {PLAYTIMES.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPlaytimes((s) => toggle(s, p.value))}
                  className={`chip ${playtimes.includes(p.value) ? "is-active" : ""}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <ChipGroup
            title="Tags"
            options={TAGS}
            selected={tags}
            onToggle={(v) => setTags((s) => toggle(s, v))}
          />
        </div>
      </aside>

      {/* Ergebnisse */}
      <div>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nach Titel, Entwickler oder Tag suchen…"
            aria-label="Spiele durchsuchen"
            className="input"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as GameSort)}
            aria-label="Sortierung"
            className="select sm:w-56"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                Sortieren: {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Aktive Filter als entfernbare Chips */}
        {(mood || section) && (
          <div className="mb-4 flex flex-wrap gap-2">
            {mood && (
              <button type="button" className="pill pill-accent" onClick={() => setMood(undefined)}>
                Mood: {mood} ✕
              </button>
            )}
            {section === "retro" && <span className="pill pill-gold">Nur Klassiker</span>}
            {section === "new" && <span className="pill pill-accent">Neu &amp; Bald</span>}
          </div>
        )}

        <p className="mb-4 text-sm text-muted">
          {results.length} {results.length === 1 ? "Spiel" : "Spiele"} gefunden
        </p>

        <GameGrid games={results} />
      </div>
    </div>
  );
}

function ChipGroup<T extends string>({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: readonly T[];
  selected: T[];
  onToggle: (value: T) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onToggle(opt)}
            className={`chip ${selected.includes(opt) ? "is-active" : ""}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
