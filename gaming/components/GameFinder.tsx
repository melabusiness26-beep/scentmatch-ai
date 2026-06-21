"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import CoverArt from "@/components/CoverArt";
import { runFinder } from "@/lib/games";
import { DIFFICULTIES, GENRES, MOODS, PLATFORMS, PLAYTIMES } from "@/data/taxonomy";
import type { FinderAnswers } from "@/lib/types";

type StepKey = keyof FinderAnswers;

interface Step {
  key: StepKey;
  question: string;
  help: string;
  options: { value: string; label: string }[];
}

const STEPS: Step[] = [
  {
    key: "platform",
    question: "Welche Plattform nutzt du?",
    help: "Wir zeigen bevorzugt Spiele, die darauf laufen.",
    options: PLATFORMS.map((p) => ({ value: p, label: p })),
  },
  {
    key: "genre",
    question: "Welches Genre magst du am liebsten?",
    help: "Wähle die Richtung, auf die du gerade Lust hast.",
    options: GENRES.map((g) => ({ value: g, label: g })),
  },
  {
    key: "players",
    question: "Allein oder mit Freunden?",
    help: "So finden wir das passende Solo- oder Koop-Erlebnis.",
    options: [
      { value: "solo", label: "🎧 Allein (Solo)" },
      { value: "friends", label: "👥 Mit Freunden" },
    ],
  },
  {
    key: "difficulty",
    question: "Wie fordernd darf es sein?",
    help: "Von ganz entspannt bis knallhart.",
    options: DIFFICULTIES.map((d) => ({ value: d, label: d })),
  },
  {
    key: "playtime",
    question: "Wie lange soll es ungefähr dauern?",
    help: "Kurzes Erlebnis oder Langzeit-Abenteuer?",
    options: PLAYTIMES.map((p) => ({ value: p.value, label: p.label })),
  },
  {
    key: "mood",
    question: "Welche Stimmung suchst du?",
    help: "Das Gefühl, das das Spiel auslösen soll.",
    options: MOODS.map((m) => ({ value: m.value, label: `${m.emoji} ${m.label}` })),
  },
];

export default function GameFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [finished, setFinished] = useState(false);

  const results = useMemo(
    () => (finished ? runFinder(answers, 6) : []),
    [finished, answers],
  );

  const current = STEPS[step];
  const progress = Math.round((step / STEPS.length) * 100);

  function choose(value: string) {
    const next = { ...answers, [current.key]: value } as FinderAnswers;
    setAnswers(next);
    advance();
  }

  function advance() {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setFinished(true);
  }

  function back() {
    if (finished) {
      setFinished(false);
      return;
    }
    if (step > 0) setStep(step - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setFinished(false);
  }

  /* ----------------------------------------------------------- Ergebnisse */
  if (finished) {
    return (
      <div>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="kicker">Deine Treffer</span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Das könnte perfekt passen</h2>
          </div>
          <div className="flex gap-2">
            <button onClick={back} className="btn btn-ghost btn-sm">← Antworten ändern</button>
            <button onClick={restart} className="btn btn-secondary btn-sm">Neu starten</button>
          </div>
        </div>

        <div className="space-y-4">
          {results.map(({ game, score, reasons }, i) => (
            <Link
              key={game.id}
              href={`/game/${game.slug}`}
              className="card card-hover flex gap-4 p-3 sm:p-4"
            >
              <div className="h-28 w-20 shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-24">
                <CoverArt game={game} className="h-full w-full" rounded />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {i === 0 && <span className="pill pill-gold">Top-Match</span>}
                  <span className="pill pill-accent">{score}% Match</span>
                </div>
                <h3 className="mt-1.5 font-display text-lg font-semibold leading-tight">
                  {game.title}
                </h3>
                <p className="text-xs text-muted">{game.genres.join(" · ")}</p>
                {reasons.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {reasons.slice(0, 3).map((r) => (
                      <li key={r} className="pill">✓ {r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------- Frage */
  return (
    <div className="surface mx-auto max-w-2xl p-6 sm:p-8">
      {/* Fortschritt */}
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-xs text-muted">
          <span>Frage {step + 1} von {STEPS.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-panel-2">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              backgroundImage: "linear-gradient(90deg, var(--color-accent-2), var(--color-accent))",
            }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold">{current.question}</h2>
      <p className="mt-1 text-sm text-muted">{current.help}</p>

      <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {current.options.map((opt) => {
          const active = answers[current.key] === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => choose(opt.value)}
              className={`chip justify-center py-3 ${active ? "is-active" : ""}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="btn btn-ghost btn-sm disabled:opacity-40"
        >
          ← Zurück
        </button>
        <button type="button" onClick={advance} className="btn btn-secondary btn-sm">
          Überspringen →
        </button>
      </div>
    </div>
  );
}
