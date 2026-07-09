import type { Metadata } from "next";
import Link from "next/link";
import { NICHES } from "@/data/niches";
import { productsByNiche } from "@/data/products";

export const metadata: Metadata = {
  title: "Nischen-Guide: Die besten E-Commerce-Nischen für die Schweiz",
  description:
    "Haustiere, Home & Living, Beauty, Fitness und mehr – ehrlich verglichen nach Konkurrenz, Marge und Einsteigerfreundlichkeit für den Schweizer Markt.",
  alternates: { canonical: "/nischen" },
};

function stars(n: number) {
  return "★".repeat(n) + "☆".repeat(5 - n);
}

function competitionColor(c: string) {
  if (c === "niedrig") return "bg-accent-soft text-accent-deep";
  if (c === "mittel") return "bg-amber-soft text-amber-700";
  return "bg-swiss-soft text-swiss";
}

export default function NischenPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Nischen-Guide</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Noch keine Nische? Hier findest du sie.
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Du musst nicht mit der «perfekten» Nische starten – du musst mit einer
        <strong className="text-ink"> ehrlichen Einschätzung</strong> starten. Wir haben{" "}
        {NICHES.length} Nischen für den Schweizer Markt verglichen: Wie hart ist die
        Konkurrenz? Wie gut die Margen? Und worauf musst du rechtlich achten? Danach
        baut dir der{" "}
        <Link href="/store-planer" className="font-semibold text-accent-deep hover:underline">
          Store-Planer
        </Link>{" "}
        den kompletten Fahrplan.
      </p>

      <div className="card mt-6 flex flex-wrap items-center justify-between gap-4 border-t-4 border-t-accent">
        <p className="text-sm leading-relaxed">
          <strong>Unentschlossen?</strong> Beantworte 5 kurze Fragen – das Quiz sagt
          dir, welche Nische zu dir, deinem Budget und deinem Content-Stil passt.
        </p>
        <Link href="/nischen-quiz" className="btn-primary shrink-0">
          🧭 Nischen-Quiz starten
        </Link>
      </div>

      {(
        [
          ["Im Trend", "🔥", "Diese Nischen laufen JETZT stark – gute Nachfrage, aber auch Bewegung im Markt."],
          ["Kommender Trend", "📡", "Hier baut sich die Welle gerade erst auf – früh einsteigen heisst weniger Konkurrenz."],
          ["Dauerbrenner", "🧱", "Diese Nischen funktionieren seit Jahren stabil – der sichere Boden für den Start."],
        ] as const
      ).map(([trendLabel, trendEmoji, trendIntro]) => (
        <section key={trendLabel} className="mt-12">
          <h2 className="font-display text-2xl font-extrabold">
            {trendEmoji} {trendLabel}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">{trendIntro}</p>
          <div className="mt-5 space-y-6">
            {NICHES.filter((n) => n.trend === trendLabel).map((n) => {
          const products = productsByNiche(n.slug);
          return (
            <article key={n.slug} className="card">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-extrabold">
                    {n.emoji} {n.name}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-muted">{n.short}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${competitionColor(n.competition)}`}>
                    Konkurrenz: {n.competition}
                  </span>
                  <span
                    className="rounded-full bg-paper px-3 py-1 text-xs font-bold text-ink"
                    title="Einsteigerfreundlichkeit"
                  >
                    Einstieg: {stars(n.beginnerScore)}
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-paper p-4 text-sm leading-relaxed">
                  <strong>👥 Zielgruppe:</strong> {n.audience}
                </div>
                <div className="rounded-xl bg-paper p-4 text-sm leading-relaxed">
                  <strong>💰 Marge:</strong> {n.marginHint}
                </div>
                <div className="rounded-xl bg-accent-soft p-4 text-sm leading-relaxed">
                  <strong>🇨🇭 Warum in der Schweiz:</strong> {n.whySwitzerland}
                </div>
                <div className="rounded-xl bg-swiss-soft p-4 text-sm leading-relaxed">
                  <strong>⚠️ Ehrlich gesagt:</strong> {n.risks}
                </div>
              </div>

              {products.length > 0 && (
                <div className="mt-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-muted">
                    Geprüfte Produkte in dieser Nische
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {products.map((p) => (
                      <Link key={p.slug} href={`/produkte/${p.slug}`} className="chip hover:border-accent hover:text-accent-deep">
                        {p.emoji} {p.name} · {p.score}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href={`/store-planer?nische=${n.slug}`} className="btn-primary">
                  Store für {n.name} planen
                </Link>
              </div>
            </article>
          );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
