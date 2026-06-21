"use client";

import { useMemo, useState } from "react";
import GameGrid from "@/components/GameGrid";
import { filterGames, getYear, isRetro } from "@/lib/games";
import {
  DIFFICULTIES,
  ERAS,
  GENRES,
  MODES,
  PLATFORMS,
  PLAYTIMES,
  PRICE_TIERS,
  TAGS,
} from "@/data/taxonomy";
import type {
  Difficulty,
  Game,
  GameMode,
  GameSort,
  Genre,
  Mood,
  Platform,
  PlaytimeCategory,
  PriceTier,
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

/** Liegt das Jahr in der gewählten Ära? */
function inEra(year: number, eraValue: string): boolean {
  const era = ERAS.find((e) => e.value === eraValue);
  if (!era) return true;
  if (era.from && year < era.from) return false;
  if (era.to && year > era.to) return false;
  return true;
}

export default function GamesExplorer({
  games,
  initialQuery = "",
  initialGenre,
  initialPlatform,
  initialMood,
  initialSection,
}: {
  games: Game[];
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
  const [eras, setEras] = useState<string[]>([]);
  const [priceTiers, setPriceTiers] = useState<PriceTier[]>([]);
  const [multiplayerOnly, setMultiplayerOnly] = useState(false);
  const [coopOnly, setCoopOnly] = useState(false);
  const [mood, setMood] = useState<Mood | undefined>(initialMood);
  const [section] = useState<Section>(initialSection);
  const [sort, setSort] = useState<GameSort>(
    initialSection === "new" ? "newest" : "popular",
  );
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    let list = filterGames(
      {
        query,
        genres,
        platforms,
        modes,
        difficulty: difficulties,
        playtime: playtimes,
        tags,
        sort,
      },
      games,
    );
    if (mood) list = list.filter((g) => g.moods.includes(mood));
    if (section === "retro") list = list.filter(isRetro);
    if (eras.length) list = list.filter((g) => eras.some((e) => inEra(getYear(g), e)));
    if (priceTiers.length) list = list.filter((g) => priceTiers.includes(g.priceRange.tier));
    if (multiplayerOnly) list = list.filter((g) => g.multiplayer);
    if (coopOnly) list = list.filter((g) => g.coop);
    return list;
  }, [
    games, query, genres, platforms, modes, difficulties, playtimes, tags, sort,
    mood, section, eras, priceTiers, multiplayerOnly, coopOnly,
  ]);

  // Liste aller aktiven Filter als entfernbare Chips.
  const activeChips: { key: string; label: string; remove: () => void }[] = [
    ...genres.map((g) => ({ key: `g-${g}`, label: g, remove: () => setGenres((s) => s.filter((x) => x !== g)) })),
    ...platforms.map((p) => ({ key: `p-${p}`, label: p, remove: () => setPlatforms((s) => s.filter((x) => x !== p)) })),
    ...modes.map((m) => ({ key: `m-${m}`, label: m, remove: () => setModes((s) => s.filter((x) => x !== m)) })),
    ...difficulties.map((d) => ({ key: `d-${d}`, label: d, remove: () => setDifficulties((s) => s.filter((x) => x !== d)) })),
    ...playtimes.map((pt) => ({ key: `pt-${pt}`, label: pt, remove: () => setPlaytimes((s) => s.filter((x) => x !== pt)) })),
    ...eras.map((e) => ({ key: `e-${e}`, label: ERAS.find((x) => x.value === e)?.label ?? e, remove: () => setEras((s) => s.filter((x) => x !== e)) })),
    ...priceTiers.map((t) => ({ key: `pr-${t}`, label: PRICE_TIERS.find((x) => x.value === t)?.label ?? t, remove: () => setPriceTiers((s) => s.filter((x) => x !== t)) })),
    ...tags.map((t) => ({ key: `t-${t}`, label: `#${t}`, remove: () => setTags((s) => s.filter((x) => x !== t)) })),
    ...(mood ? [{ key: "mood", label: `Mood: ${mood}`, remove: () => setMood(undefined) }] : []),
    ...(multiplayerOnly ? [{ key: "mp", label: "Nur Multiplayer", remove: () => setMultiplayerOnly(false) }] : []),
    ...(coopOnly ? [{ key: "co", label: "Nur Koop", remove: () => setCoopOnly(false) }] : []),
  ];

  function reset() {
    setGenres([]); setPlatforms([]); setModes([]); setDifficulties([]);
    setPlaytimes([]); setTags([]); setEras([]); setPriceTiers([]);
    setMultiplayerOnly(false); setCoopOnly(false); setMood(undefined);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      {/* Sidebar / Filter */}
      <aside className="lg:sticky lg:top-20 lg:self-start lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1">
        <div className="mb-3 flex items-center justify-between lg:hidden">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setFiltersOpen((v) => !v)}
            aria-expanded={filtersOpen}
          >
            ☰ Filter {activeChips.length > 0 && <span className="pill pill-accent">{activeChips.length}</span>}
          </button>
          {activeChips.length > 0 && (
            <button type="button" onClick={reset} className="text-sm text-muted hover:text-fg">
              Zurücksetzen
            </button>
          )}
        </div>

        <div className={`${filtersOpen ? "block" : "hidden"} space-y-5 lg:block`}>
          <div className="hidden items-center justify-between lg:flex">
            <h2 className="font-display text-lg font-semibold">Filter</h2>
            {activeChips.length > 0 && (
              <button type="button" onClick={reset} className="text-sm text-muted hover:text-fg">
                Zurücksetzen
              </button>
            )}
          </div>

          <p className="rounded-lg bg-panel-2 px-3 py-2 text-xs text-muted">
            💡 Tipp: Du kannst <span className="text-fg">mehrere</span> Werte gleichzeitig
            auswählen (z. B. mehrere Genres und Plattformen).
          </p>

          {/* Schnell-Schalter */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMultiplayerOnly((v) => !v)}
              className={`chip ${multiplayerOnly ? "is-active" : ""}`}
            >
              👥 Multiplayer
            </button>
            <button
              type="button"
              onClick={() => setCoopOnly((v) => !v)}
              className={`chip ${coopOnly ? "is-active" : ""}`}
            >
              🤝 Koop
            </button>
          </div>

          <ChipGroup title="Genre" options={GENRES} selected={genres} onToggle={(v) => setGenres((s) => toggle(s, v))} />
          <ChipGroup title="Plattform" options={PLATFORMS} selected={platforms} onToggle={(v) => setPlatforms((s) => toggle(s, v))} />
          <OptionChipGroup title="Erscheinungs-Ära" options={ERAS} selected={eras} onToggle={(v) => setEras((s) => toggle(s, v))} />
          <ChipGroup title="Spielmodus" options={MODES} selected={modes} onToggle={(v) => setModes((s) => toggle(s, v))} />
          <ChipGroup title="Schwierigkeit" options={DIFFICULTIES} selected={difficulties} onToggle={(v) => setDifficulties((s) => toggle(s, v))} />
          <OptionChipGroup title="Spielzeit" options={PLAYTIMES} selected={playtimes} onToggle={(v) => setPlaytimes((s) => toggle(s, v as PlaytimeCategory))} />
          <OptionChipGroup title="Preis" options={PRICE_TIERS} selected={priceTiers} onToggle={(v) => setPriceTiers((s) => toggle(s, v as PriceTier))} />
          <ChipGroup title="Tags" options={TAGS} selected={tags} onToggle={(v) => setTags((s) => toggle(s, v))} />
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
              <option key={s.value} value={s.value}>Sortieren: {s.label}</option>
            ))}
          </select>
        </div>

        {/* Aktive Filter */}
        {(activeChips.length > 0 || section) && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {section === "retro" && <span className="pill pill-gold">Nur Klassiker</span>}
            {section === "new" && <span className="pill pill-accent">Neu &amp; Bald</span>}
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                onClick={chip.remove}
                className="pill pill-accent"
                aria-label={`Filter ${chip.label} entfernen`}
              >
                {chip.label} ✕
              </button>
            ))}
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
  title, options, selected, onToggle,
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

function OptionChipGroup({
  title, options, selected, onToggle,
}: {
  title: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onToggle(opt.value)}
            className={`chip ${selected.includes(opt.value) ? "is-active" : ""}`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
