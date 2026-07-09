import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { getProduct, marginText, productsByNiche, scoreBreakdown, searchTermFor, PRODUCTS } from "@/data/products";
import { getNiche } from "@/data/niches";
import { getSupplier, supplierSearchUrl } from "@/data/suppliers";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produkt nicht gefunden" };
  return {
    title: `${product.name}: Bewertung, Vor- & Nachteile, Bezugsquellen`,
    description: product.short,
    alternates: { canonical: `/produkte/${product.slug}` },
  };
}

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const niche = getNiche(product.niche);
  const suppliers = product.suppliers
    .map((s) => getSupplier(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const related = productsByNiche(product.niche).filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <div className="container-page py-12">
      <nav className="text-sm text-muted">
        <Link href="/produkte" className="font-semibold text-accent-deep hover:underline">
          ← Zurück zum Produkt-Finder
        </Link>
      </nav>

      {/* Kopfbereich */}
      <header className="card mt-6 md:flex md:items-start md:justify-between md:gap-8">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent-deep">
              {product.trend}
            </span>
            {niche && (
              <Link href="/nischen" className="chip">
                {niche.emoji} {niche.name}
              </Link>
            )}
          </div>
          <h1 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">
            {product.emoji} {product.name}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted">{product.description}</p>
          <p className="mt-3 text-sm text-muted">
            <strong className="text-ink">Zielgruppe:</strong> {product.targetAudience} ·{" "}
            <strong className="text-ink">Saison:</strong> {product.season}
          </p>
        </div>
        <div className="mt-6 shrink-0 text-center md:mt-0">
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-navy font-display text-3xl font-extrabold text-white">
            {product.score}
          </div>
          <div className="mt-2 text-xs font-bold uppercase tracking-wider text-muted">
            Score von 100
          </div>
        </div>
      </header>

      {/* Zahlen */}
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Einkauf (inkl. Versand)", `CHF ${product.buyPriceChf[0]}–${product.buyPriceChf[1]}`],
          ["Verkaufspreis Schweiz", `CHF ${product.sellPriceChf[0]}–${product.sellPriceChf[1]}`],
          ["Deine Marge", marginText(product)],
          ["Lieferzeit", product.deliveryDays],
        ].map(([label, value]) => (
          <div key={label} className="card">
            <div className="text-xs font-bold uppercase tracking-wider text-muted">{label}</div>
            <div className="mt-1 font-display text-lg font-extrabold leading-snug">{value}</div>
          </div>
        ))}
      </section>

      <div className="mt-4">
        <Link
          href={`/rechner?einkauf=${product.buyPriceChf[1]}&verkauf=${product.sellPriceChf[0]}`}
          className="btn-secondary"
        >
          💰 Gewinn für dieses Produkt genau berechnen
        </Link>
      </div>

      {/* Kennzahlen-Aufschlüsselung */}
      <section className="card mt-6">
        <h2 className="font-display text-xl font-bold">📊 Kennzahlen im Detail</h2>
        <p className="mt-1 text-sm text-muted">
          Abgeleitet aus unseren Katalogdaten: Preise, Trend-Status, Lieferwege und
          Nischen-Konkurrenz.
        </p>
        <div className="mt-5 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {scoreBreakdown(product, niche?.competition).map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-bold">{b.label}</span>
                <span className="font-display font-extrabold text-accent-deep">{b.value}/100</span>
              </div>
              <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-paper">
                <div
                  className={`h-full rounded-full ${
                    b.value >= 75 ? "bg-accent" : b.value >= 55 ? "bg-amber-400" : "bg-swiss"
                  }`}
                  style={{ width: `${b.value}%` }}
                />
              </div>
              <p className="mt-1 text-xs leading-snug text-muted">{b.hint}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vor- und Nachteile */}
      <section className="mt-6 grid gap-5 md:grid-cols-2">
        <div className="card border-t-4 border-t-accent">
          <h2 className="font-display text-xl font-bold">✅ Vorteile</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {product.pros.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-accent-deep">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card border-t-4 border-t-swiss">
          <h2 className="font-display text-xl font-bold">⚠️ Nachteile & Risiken</h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed">
            {product.cons.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="text-swiss">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Qualitäts-Checkliste */}
      <section className="card mt-6">
        <h2 className="font-display text-xl font-bold">🧪 Qualität testen: Deine Muster-Checkliste</h2>
        <p className="mt-2 text-sm text-muted">
          Bestelle zuerst ein Muster an dich selbst und prüfe diese Punkte, bevor das
          Produkt in deinen Shop kommt.{" "}
          <Link href="/wissen/produktqualitaet-testen" className="font-semibold text-accent-deep hover:underline">
            Zur ausführlichen Muster-Methode →
          </Link>
        </p>
        <ol className="mt-4 space-y-2 text-sm leading-relaxed">
          {product.qualityChecks.map((q, i) => (
            <li key={q} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-soft text-xs font-bold text-accent-deep">
                {i + 1}
              </span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Bezugsquellen */}
      <section className="mt-6">
        <h2 className="font-display text-2xl font-extrabold">📦 Wo du dieses Produkt findest</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Ein Klick öffnet die Suche nach genau diesem Produkt beim Lieferanten
          (Suchbegriff: «{searchTermFor(product)}»). Wähle dort Angebote mit vielen
          Bestellungen und 4.5+ Sternen – und bestelle zuerst ein Muster.
        </p>
        <div className="mt-4 grid gap-5 md:grid-cols-2">
          {suppliers.map((s) => {
            const directUrl = supplierSearchUrl(s, searchTermFor(product));
            return (
              <div key={s.slug} className="card">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-lg font-bold">{s.name}</h3>
                  <span className="chip">{s.type}</span>
                </div>
                <p className="mt-2 text-sm text-muted">
                  <strong className="text-ink">Lieferung CH:</strong> {s.deliveryToCh}
                </p>
                <p className="mt-1 text-sm text-muted">
                  <strong className="text-ink">Kosten:</strong> {s.costs}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.bestFor}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {directUrl ? (
                    <a
                      href={directUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2 text-sm"
                    >
                      🔗 Produkt bei {s.name} finden
                    </a>
                  ) : (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary !py-2 text-sm"
                    >
                      🔗 {s.name} öffnen
                    </a>
                  )}
                  {directUrl && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary !py-2 text-sm"
                    >
                      Startseite ↗
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Video-Idee */}
      <section className="card mt-6 bg-navy text-white">
        <h2 className="font-display text-xl font-bold">🎬 Fertige Werbevideo-Idee</h2>
        <p className="mt-3 leading-relaxed text-muted-dark">{product.videoIdea}</p>
        <Link
          href={`/videos?produkt=${product.slug}`}
          className="btn-primary mt-5"
        >
          Komplettes Drehbuch generieren
        </Link>
      </section>

      {/* Ähnliche Produkte */}
      {related.length > 0 && (
        <section className="mt-10">
          <h2 className="font-display text-2xl font-extrabold">
            Mehr aus der Nische {niche ? `${niche.emoji} ${niche.name}` : ""}
          </h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
