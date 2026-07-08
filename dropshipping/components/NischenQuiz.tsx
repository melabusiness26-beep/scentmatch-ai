"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { QUIZ } from "@/data/quiz";
import { NICHES, getNiche } from "@/data/niches";
import { productsByNiche } from "@/data/products";

export default function NischenQuiz() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step >= QUIZ.length;

  const ranking = useMemo(() => {
    if (!done) return null;
    const scores: Record<string, number> = {};
    NICHES.forEach((n) => (scores[n.slug] = 0));
    answers.forEach((optionIndex, questionIndex) => {
      const option = QUIZ[questionIndex].options[optionIndex];
      Object.entries(option.points).forEach(([slug, pts]) => {
        scores[slug] = (scores[slug] ?? 0) + pts;
      });
    });
    const max = Math.max(...Object.values(scores), 1);
    return Object.entries(scores)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([slug, score]) => ({ niche: getNiche(slug)!, score, percent: Math.round((score / max) * 100) }));
  }, [answers, done]);

  function answer(i: number) {
    setAnswers((a) => [...a, i]);
  }

  function back() {
    setAnswers((a) => a.slice(0, -1));
  }

  function restart() {
    setAnswers([]);
  }

  if (done && ranking) {
    const winner = ranking[0];
    const products = productsByNiche(winner.niche.slug).slice(0, 3);
    return (
      <div className="space-y-6">
        <div className="card hero-surface text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Dein Ergebnis
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">
            {winner.niche.emoji} Deine Nische: {winner.niche.name}
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-dark">{winner.niche.whySwitzerland}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={`/store-planer?nische=${winner.niche.slug}`} className="btn-primary">
              🚀 Store für {winner.niche.name} planen
            </Link>
            <button type="button" onClick={restart} className="btn-dark-outline">
              Quiz wiederholen
            </button>
          </div>
        </div>

        <div className="card">
          <h3 className="font-display text-lg font-bold">So gut passen die Top 3 zu dir</h3>
          <div className="mt-4 space-y-3">
            {ranking.map((r, i) => (
              <div key={r.niche.slug}>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span>
                    {i + 1}. {r.niche.emoji} {r.niche.name}
                  </span>
                  <span className="text-muted">{r.percent} %</span>
                </div>
                <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-paper">
                  <div
                    className={`h-full rounded-full ${i === 0 ? "bg-accent" : "bg-line"}`}
                    style={{ width: `${r.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {products.length > 0 && (
          <div className="card">
            <h3 className="font-display text-lg font-bold">
              Geprüfte Produkte für deinen Start
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {products.map((p) => (
                <Link
                  key={p.slug}
                  href={`/produkte/${p.slug}`}
                  className="chip !text-sm hover:border-accent hover:text-accent-deep"
                >
                  {p.emoji} {p.name} · Score {p.score}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  const q = QUIZ[step];
  return (
    <div className="card">
      {/* Fortschritt */}
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-muted">
        <span>
          Frage {step + 1} von {QUIZ.length}
        </span>
        {step > 0 && (
          <button type="button" onClick={back} className="font-bold text-accent-deep hover:underline">
            ← Zurück
          </button>
        )}
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-paper">
        <div
          className="h-full rounded-full bg-accent transition-all"
          style={{ width: `${(step / QUIZ.length) * 100}%` }}
        />
      </div>

      <h2 className="mt-6 font-display text-2xl font-extrabold">{q.question}</h2>
      <p className="mt-1 text-sm text-muted">{q.hint}</p>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {q.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            onClick={() => answer(i)}
            className="flex items-center gap-3 rounded-xl border border-line bg-card p-4 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent-deep"
          >
            <span className="text-2xl">{o.emoji}</span>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
