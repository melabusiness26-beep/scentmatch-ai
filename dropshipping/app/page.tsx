import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS, topProducts } from "@/data/products";
import { NICHES } from "@/data/niches";
import { KNOWLEDGE } from "@/data/knowledge";
import { SITE } from "@/lib/site";

const STEPS = [
  {
    emoji: "🔎",
    title: "1. Produkt finden",
    text: "Durchsuche kuratierte Gewinner-Produkte mit ehrlichen Bewertungen: Vorteile, Nachteile, Einkaufs- und Verkaufspreise, Lieferzeiten und Bezugsquellen – alles auf den Schweizer Markt zugeschnitten.",
    href: "/produkte",
    cta: "Zum Produkt-Finder",
  },
  {
    emoji: "🧪",
    title: "2. Qualität prüfen",
    text: "Jedes Produkt kommt mit einer konkreten Qualitäts-Checkliste: Was du am Muster testen musst, bevor du es verkaufst – von der Akkulaufzeit bis zum Dichtigkeitstest.",
    href: "/wissen/produktqualitaet-testen",
    cta: "Muster-Methode lernen",
  },
  {
    emoji: "🚀",
    title: "3. Shop & Videos starten",
    text: "Der Store-Planer baut dir aus deiner Nische einen kompletten Fahrplan – inkl. Namensideen, Produktauswahl, Preisen und fertigem Werbevideo-Drehbuch.",
    href: "/store-planer",
    cta: "Store planen",
  },
];

const HONESTY = [
  {
    title: "Ehrliche Zahlen statt Hype",
    text: "Keine «10'000 CHF im Monat über Nacht»-Versprechen. Alle Margen und Lieferzeiten sind realistische Richtwerte – inklusive der Nachteile jedes Produkts.",
  },
  {
    title: "Für die Schweiz gemacht",
    text: "Zoll, Einfuhrsteuer, TWINT, Post-Tarife, Schweizer Recht: Alles Wissen ist auf die Schweiz zugeschnitten, nicht auf Deutschland oder die USA kopiert.",
  },
  {
    title: "Videos: Drehbuch + KI-Prompt",
    text: "Der Video-Generator liefert dir Szene für Szene ein professionelles Drehbuch fürs Handy – und auf Wunsch den fertigen Profi-Prompt für KI-Video-Tools wie Sora oder Runway.",
  },
];

export default function HomePage() {
  const top = topProducts(6);

  return (
    <>
      {/* --------------------------------------------------------------- Hero */}
      <section className="hero-surface text-white">
        <div className="container-page grid gap-12 py-20 md:grid-cols-[1.2fr_1fr] md:items-center md:py-28">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">
              <span className="grid h-4 w-4 place-items-center rounded bg-swiss text-[9px] font-black text-white">+</span>
              E-Commerce &amp; Dropshipping · Schweiz
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] sm:text-6xl">
              Finde Produkte, die sich verkaufen.
              <span className="block text-emerald-300">Starte deinen Shop richtig.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-dark">
              {SITE.name} zeigt dir aktuelle und kommende Trend-Produkte mit ehrlichen
              Vor- und Nachteilen, hilft bei Qualität, Preisen und Lieferzeiten – und
              plant mit dir Shop und Werbevideos. Alles für den Schweizer Markt.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/produkte" className="btn-primary !px-7 !py-3.5 !text-base">
                Produkte entdecken
              </Link>
              <Link href="/store-planer" className="btn-dark-outline !px-7 !py-3.5 !text-base">
                Store-Planer starten
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-dark">
              {["Ehrliche Bewertungen", "Für die Schweiz gemacht", "Start ohne Budget möglich"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-emerald-300">✓</span> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              [String(PRODUCTS.length), "kuratierte Produkte, laufend erweitert"],
              [String(NICHES.length), "Nischen mit Chancen-Analyse"],
              [String(KNOWLEDGE.length), "Schweiz-Ratgeber (Zoll, Recht, Versand …)"],
              ["100 %", "ehrliche Vor- und Nachteile"],
            ].map(([num, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm transition hover:border-white/25"
              >
                <div className="font-display text-3xl font-extrabold text-emerald-300 sm:text-4xl">{num}</div>
                <div className="mt-1.5 text-sm leading-snug text-muted-dark">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- So geht's */}
      <section className="container-page py-16">
        <p className="kicker">So funktioniert {SITE.name}</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">
          Von der Idee zum ersten Verkauf – in drei Schritten
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.title} className="card flex flex-col">
              <span className="text-3xl">{s.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.text}</p>
              <Link href={s.href} className="mt-4 text-sm font-bold text-accent-deep hover:underline">
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------ Top-Produkte */}
      <section className="bg-card py-16">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="kicker">Bestbewertet</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold">
                Top-Produkte für den Start
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Bewertet nach Marge, Nachfrage, Versandtauglichkeit und
                Einsteigerfreundlichkeit im Schweizer Markt.
              </p>
            </div>
            <Link href="/produkte" className="btn-secondary">Alle Produkte ansehen</Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {top.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Ehrlichkeit */}
      <section className="container-page py-16">
        <p className="kicker">Warum {SITE.name}?</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">
          Ehrlich beraten statt Träume verkaufen
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {HONESTY.map((h) => (
            <div key={h.title} className="card">
              <h3 className="font-display text-lg font-bold">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- CTA */}
      <section className="container-page pb-4">
        <div className="hero-surface rounded-3xl px-6 py-14 text-center text-white sm:px-12">
          <h2 className="font-display text-3xl font-extrabold">
            Noch keine Nische? Kein Problem.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-dark">
            Der Nischen-Guide vergleicht {NICHES.length} Bereiche nach Konkurrenz, Marge und
            Einsteigerfreundlichkeit – und der Store-Planer macht daraus deinen
            persönlichen Fahrplan.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/nischen" className="btn-primary">Nische finden</Link>
            <Link href="/videos" className="btn-dark-outline">Werbevideo planen</Link>
          </div>
        </div>
      </section>
    </>
  );
}
