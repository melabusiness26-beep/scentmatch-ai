import type { Metadata } from "next";
import ProductExplorer from "@/components/ProductExplorer";
import { PRODUCTS } from "@/data/products";
import { RESEARCH_TOOLS, SUPPLIERS } from "@/data/suppliers";

export const metadata: Metadata = {
  title: "Produkt-Finder: Geprüfte Dropshipping-Produkte für die Schweiz",
  description:
    "Kuratierte Gewinner-Produkte mit ehrlichen Vor- und Nachteilen, Preisen, Margen, Lieferzeiten und Qualitäts-Checks – bewertet für den Schweizer Markt.",
  alternates: { canonical: "/produkte" },
};

export default function ProduktePage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Produkt-Finder</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        {PRODUCTS.length} geprüfte Produkte – ehrlich bewertet
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Jedes Produkt haben wir nach Marge, Nachfrage, Versandtauglichkeit und
        Risiken für den Schweizer Markt bewertet. Klicke auf ein Produkt für
        Vor- und Nachteile, Qualitäts-Checkliste, Bezugsquellen und eine fertige
        Werbevideo-Idee. Der Katalog wächst laufend – auch mit kommenden Trends.
      </p>
      <div className="mt-8">
        <ProductExplorer />
      </div>

      {/* Bezugsquellen im Überblick */}
      <section className="mt-16">
        <p className="kicker">Bezugsquellen</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          Wo man Dropshipping-Produkte findet – der ehrliche Vergleich
        </h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {SUPPLIERS.map((s) => (
            <div key={s.slug} className="card">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-bold">{s.name}</h3>
                <div className="flex gap-2">
                  <span className="chip">{s.type}</span>
                  <span className="chip" title="Einsteigerfreundlichkeit">
                    {"★".repeat(s.beginnerFriendly)}
                  </span>
                </div>
              </div>
              <p className="mt-2 text-sm text-muted">
                <strong className="text-ink">Lieferung in die Schweiz:</strong> {s.deliveryToCh}
              </p>
              <p className="mt-1 text-sm text-muted">
                <strong className="text-ink">Kosten:</strong> {s.costs}
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-accent-deep">Stärken</h4>
                  <ul className="mt-1 space-y-1 text-sm text-muted">
                    {s.pros.map((p) => (
                      <li key={p}>+ {p}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-swiss">Schwächen</h4>
                  <ul className="mt-1 space-y-1 text-sm text-muted">
                    {s.cons.map((c) => (
                      <li key={c}>− {c}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-3 rounded-xl bg-paper p-3 text-sm">
                <strong>Am besten für:</strong> {s.bestFor}
              </p>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-bold text-accent-deep hover:underline"
              >
                {s.name} öffnen ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Selbst Trends finden */}
      <section className="mt-16">
        <p className="kicker">Zukünftige Trends selbst entdecken</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          Mit diesen Gratis-Tools findest du Produkte, bevor alle sie kennen
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-muted">
          Unser Katalog wird laufend erweitert – aber du kannst kommende Trends auch
          selbst aufspüren. Diese fünf kostenlosen Tools nutzen Profis täglich:
        </p>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {RESEARCH_TOOLS.map((t) => (
            <div key={t.name} className="card">
              <h3 className="font-display text-base font-bold">{t.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t.what}</p>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm font-bold text-accent-deep hover:underline"
              >
                Öffnen ↗
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
