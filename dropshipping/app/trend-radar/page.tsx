import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import TrendCheck from "@/components/TrendCheck";
import { PRODUCTS } from "@/data/products";
import { RESEARCH_TOOLS } from "@/data/suppliers";

export const metadata: Metadata = {
  title: "Trend-Radar: Kommende Produkte erkennen, bevor alle sie kennen",
  description:
    "Kuratierte Trend-Produkte, das Radar-Cockpit mit den Gratis-Live-Quellen und der interaktive 8-Fragen-Trend-Check (Wow-Effekt-Score) für jede Produktidee.",
  alternates: { canonical: "/trend-radar" },
};

export default function TrendRadarPage() {
  const kommend = PRODUCTS.filter((p) => p.trend === "Kommender Trend").sort((a, b) => b.score - a.score);
  const imTrend = PRODUCTS.filter((p) => p.trend === "Im Trend").sort((a, b) => b.score - a.score);

  return (
    <div className="container-page py-12">
      <p className="kicker">Trend-Radar</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Erkenne Gewinner, bevor die Masse sie kennt
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Drei Radar-Ebenen: unsere kuratierten <strong className="text-ink">Trend-Produkte</strong>,
        das <strong className="text-ink">Radar-Cockpit</strong> mit den Live-Quellen der Profis –
        und der <strong className="text-ink">Trend-Check</strong>, mit dem du jede eigene
        Produktidee in 5 Minuten auf Herz und Nieren prüfst.
      </p>

      {/* Kommende Trends */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-extrabold">
          📡 Kommende Trends <span className="text-sm font-semibold text-muted">– früh einsteigen, wenig Konkurrenz</span>
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {kommend.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* Im Trend */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-extrabold">
          🔥 Jetzt im Trend <span className="text-sm font-semibold text-muted">– die Welle läuft, sauber aufspringen</span>
        </h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {imTrend.slice(0, 9).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-4">
          <Link href="/produkte" className="btn-secondary">Alle {PRODUCTS.length} Produkte im Finder →</Link>
        </div>
      </section>

      {/* Radar-Cockpit */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-extrabold">🛰️ Dein Radar-Cockpit: die Live-Quellen</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Bezahl-Radare scannen diese Quellen automatisch – du kannst sie gratis von
          Hand ablesen (20 Minuten pro Woche reichen). Genau in dieser Reihenfolge:
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_TOOLS.map((t, i) => (
            <a
              key={t.name}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card group !p-5 transition hover:-translate-y-0.5 hover:border-accent"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-deep">
                {i + 1}
              </span>
              <span className="mt-2 block font-display text-base font-bold group-hover:text-accent-deep">
                {t.name} ↗
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{t.what}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Trend-Check */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-extrabold">🎯 Der Trend-Check: Prüfe jede Produktidee in 5 Minuten</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Acht Ja/Nein-Fragen nach denselben Kriterien (Wow-Effekt, Nachfrage-Beweise,
          Marge, Sättigung), mit denen auch Bezahl-Tools bewerten – nur dass du hier
          selbst hinschaust und dadurch dein Produkt wirklich verstehst.
        </p>
        <div className="mt-6">
          <TrendCheck />
        </div>
      </section>

      <p className="card mt-12 max-w-3xl text-sm leading-relaxed text-muted">
        <strong className="text-ink">Ehrlich gesagt:</strong> Bezahl-Radare (DropRadar,
        Dropship.io & Co., ab ~30 $/Monat) automatisieren genau diese drei Ebenen und
        sparen Zeit – sie haben aber keine Informationen, die du hier nicht auch
        bekommst. Unsere Empfehlung: Starte mit diesem Gratis-Radar; ein Abo lohnt
        sich erst, wenn dein Shop läuft und deine Zeit knapper ist als dein Geld.
      </p>
    </div>
  );
}
