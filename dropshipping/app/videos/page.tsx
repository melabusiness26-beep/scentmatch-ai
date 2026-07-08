import type { Metadata } from "next";
import { Suspense } from "react";
import VideoScriptGenerator from "@/components/VideoScriptGenerator";
import { HOOK_RULES, PLATFORMS, VIDEO_TOOLS } from "@/data/videos";

export const metadata: Metadata = {
  title: "Werbevideo-Studio: Professionelle Produktvideos ohne Vorkenntnisse",
  description:
    "Drehbuch-Generator, Plattform-Guide (TikTok, Reels, Shorts, Pinterest) und ehrlicher Tool-Vergleich – so entstehen Werbevideos, die nicht nach Werbung aussehen.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Werbevideo-Studio</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Videos, die verkaufen – ohne dass sie nach Werbung aussehen
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Die erfolgreichsten Dropshipping-Videos folgen einem klaren Drehbuch –
        genau das erstellt dir der Generator: Szene für Szene, mit Hooks,
        Text-Einblendungen und Hashtags. Dazu bekommst du den fertigen
        <strong className="text-ink"> KI-Video-Prompt zum Kopieren</strong>, falls du
        das Video von einer Video-KI (Sora, Runway, Kling …) erstellen lassen willst.
      </p>

      {/* Generator */}
      <div className="mt-8">
        <Suspense fallback={<div className="card text-sm text-muted">Generator wird geladen …</div>}>
          <VideoScriptGenerator />
        </Suspense>
      </div>

      {/* Was gute Videos ausmacht */}
      <section className="mt-16">
        <p className="kicker">Die Regeln</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          Was in professionellen Produktvideos wirklich zählt
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {HOOK_RULES.map((r, i) => (
            <div key={r} className="card flex gap-3 !p-4">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-deep">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed">{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wohin mit den Videos */}
      <section className="mt-16">
        <p className="kicker">Wohin mit deinen Videos?</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          Die 4 Kanäle – und wie du sie richtig nutzt
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {PLATFORMS.map((p) => (
            <div key={p.name} className="card">
              <h3 className="font-display text-lg font-bold">
                {p.emoji} {p.name}
              </h3>
              <p className="mt-1 text-xs font-semibold text-muted">{p.format}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.bestFor}</p>
              <p className="mt-3 rounded-xl bg-paper p-3 text-sm leading-relaxed">
                <strong>Posting-Tipp:</strong> {p.postingTip}
              </p>
              <p className="mt-2 text-xs font-bold text-accent-deep">{p.reach}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mt-16">
        <p className="kicker">Werkzeuge</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          Tool-Vergleich: Womit du deine Videos erstellst
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Ehrliche Einschätzung inklusive – auch dazu, wann KI-Video-Tools (noch)
          keine gute Idee sind.
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {VIDEO_TOOLS.map((t) => (
            <div key={t.name} className="card">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold">{t.name}</h3>
                <span className="chip">{t.price}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.what}</p>
              <p className="mt-3 rounded-xl bg-accent-soft p-3 text-sm font-semibold leading-relaxed text-accent-deep">
                {t.verdict}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
