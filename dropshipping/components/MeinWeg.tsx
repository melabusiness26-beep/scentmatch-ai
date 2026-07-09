"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { JOURNEY, JOURNEY_TASK_COUNT } from "@/data/journey";

const STORAGE_KEY = "swissdrop-mein-weg";

export default function MeinWeg() {
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecks(JSON.parse(raw));
    } catch {
      // Ungültige gespeicherte Daten ignorieren
    }
    setLoaded(true);
  }, []);

  function toggle(id: string) {
    setChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Speicher blockiert – Häkchen gelten trotzdem für diese Sitzung
      }
      return next;
    });
  }

  const doneCount = useMemo(
    () => JOURNEY.reduce((sum, p) => sum + p.tasks.filter((t) => checks[t.id]).length, 0),
    [checks]
  );
  const percent = Math.round((doneCount / JOURNEY_TASK_COUNT) * 100);

  const nextTask = useMemo(() => {
    for (const phase of JOURNEY) {
      for (const task of phase.tasks) {
        if (!checks[task.id]) return { phase, task };
      }
    }
    return null;
  }, [checks]);

  if (!loaded) {
    return <div className="card h-48 animate-pulse" aria-hidden="true" />;
  }

  return (
    <div className="space-y-8">
      {/* Kopf: Fortschritt + nächster Schritt */}
      <div className="card hero-surface text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Dein Fortschritt
            </p>
            <p className="mt-1 font-display text-3xl font-extrabold">
              {doneCount} von {JOURNEY_TASK_COUNT} Schritten
            </p>
          </div>
          <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-emerald-300/40 font-display text-xl font-extrabold text-emerald-300">
            {percent} %
          </div>
        </div>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all"
            style={{ width: `${Math.max(percent, 2)}%` }}
          />
        </div>

        {nextTask ? (
          <div className="mt-6 rounded-2xl bg-white/[0.07] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              👉 Dein nächster Schritt ({nextTask.phase.title})
            </p>
            <h2 className="mt-1.5 font-display text-xl font-extrabold">{nextTask.task.title}</h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-dark">{nextTask.task.text}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Link href={nextTask.task.href} className="btn-primary">
                {nextTask.task.cta} → <span className="font-normal opacity-80">~{nextTask.task.zeit}</span>
              </Link>
              <button
                type="button"
                onClick={() => toggle(nextTask.task.id)}
                className="btn-dark-outline"
              >
                ✓ Schon erledigt
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-white/[0.07] p-5 text-center">
            <p className="font-display text-2xl font-extrabold">🎉 Alle Schritte geschafft!</p>
            <p className="mt-2 text-sm text-muted-dark">
              Dein Shop läuft, deine Videos sind draussen, die erste Bestellung ist abgewickelt.
              Ab jetzt gilt: dranbleiben, Zahlen lesen, nachlegen. Du hast das grossartig gemacht.
            </p>
          </div>
        )}
      </div>

      {/* Phasen */}
      {JOURNEY.map((phase, phaseIndex) => {
        const phaseDone = phase.tasks.filter((t) => checks[t.id]).length;
        const complete = phaseDone === phase.tasks.length;
        return (
          <section key={phase.id} className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold">
                {phase.emoji} {phase.title}
                {complete && <span className="ml-2 text-accent-deep">✓</span>}
              </h2>
              <span className={`text-sm font-bold ${complete ? "text-accent-deep" : "text-muted"}`}>
                {phaseDone}/{phase.tasks.length}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">
              <strong className="text-ink">Ziel:</strong> {phase.goal}
            </p>

            <ol className="mt-4 space-y-2">
              {phase.tasks.map((task, taskIndex) => {
                const done = Boolean(checks[task.id]);
                return (
                  <li
                    key={task.id}
                    className={`flex flex-col gap-3 rounded-xl border p-4 transition sm:flex-row sm:items-center ${
                      done ? "border-accent/40 bg-accent-soft/40" : "border-line"
                    }`}
                  >
                    <button
                      type="button"
                      aria-label={`${task.title} abhaken`}
                      onClick={() => toggle(task.id)}
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-sm font-bold transition ${
                        done
                          ? "border-accent bg-accent text-white"
                          : "border-line bg-card text-muted hover:border-accent"
                      }`}
                    >
                      {done ? "✓" : `${phaseIndex + 1}.${taskIndex + 1}`}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-bold ${done ? "text-muted line-through" : ""}`}>
                        {task.title}
                        <span className="ml-2 rounded-full bg-paper px-2 py-0.5 text-xs font-bold text-muted no-underline">
                          ~{task.zeit}
                        </span>
                      </h3>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted">{task.text}</p>
                    </div>
                    <Link href={task.href} className="btn-secondary shrink-0 !py-2 text-sm">
                      {task.cta} →
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
