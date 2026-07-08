"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PRODUCTS, marginPercent, type Product, type Trend } from "@/data/products";
import { NICHES, getNiche } from "@/data/niches";
import ProductCard from "@/components/ProductCard";

const TRENDS: Trend[] = ["Im Trend", "Kommender Trend", "Dauerbrenner"];

type SortKey = "score" | "marge" | "verkauf" | "einkauf" | "name";

const COLUMNS: { key: SortKey; label: string }[] = [
  { key: "name", label: "Produkt" },
  { key: "einkauf", label: "Einkauf" },
  { key: "verkauf", label: "Verkauf" },
  { key: "marge", label: "Marge" },
  { key: "score", label: "Score" },
];

function sortValue(p: Product, key: SortKey): number | string {
  switch (key) {
    case "name":
      return p.name.toLowerCase();
    case "einkauf":
      return (p.buyPriceChf[0] + p.buyPriceChf[1]) / 2;
    case "verkauf":
      return (p.sellPriceChf[0] + p.sellPriceChf[1]) / 2;
    case "marge":
      return marginPercent(p);
    default:
      return p.score;
  }
}

export default function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<string | null>(null);
  const [trend, setTrend] = useState<Trend | null>(null);
  const [view, setView] = useState<"karten" | "tabelle">("karten");
  const [sortKey, setSortKey] = useState<SortKey>("score");
  const [sortDir, setSortDir] = useState<1 | -1>(-1);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 1 ? -1 : 1));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? 1 : -1);
    }
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      if (niche && p.niche !== niche) return false;
      if (trend && p.trend !== trend) return false;
      if (!q) return true;
      const haystack = `${p.name} ${p.short} ${p.description} ${p.targetAudience}`.toLowerCase();
      return haystack.includes(q);
    });
    return filtered.sort((a, b) => {
      const va = sortValue(a, sortKey);
      const vb = sortValue(b, sortKey);
      if (va < vb) return -1 * sortDir;
      if (va > vb) return 1 * sortDir;
      return 0;
    });
  }, [query, niche, trend, sortKey, sortDir]);

  return (
    <div>
      <div className="card">
        <label htmlFor="produkt-suche" className="field-label">
          Produkt oder Stichwort suchen
        </label>
        <input
          id="produkt-suche"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="z. B. Hund, Lampe, Küche, Geschenk …"
          className="field-input"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setNiche(null)}
            className={`chip ${niche === null ? "chip-active" : ""}`}
          >
            Alle Nischen
          </button>
          {NICHES.map((n) => (
            <button
              key={n.slug}
              type="button"
              onClick={() => setNiche(niche === n.slug ? null : n.slug)}
              className={`chip ${niche === n.slug ? "chip-active" : ""}`}
            >
              {n.emoji} {n.name}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {TRENDS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTrend(trend === t ? null : t)}
                className={`chip ${trend === t ? "chip-active" : ""}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex rounded-xl border border-line p-0.5" role="group" aria-label="Ansicht wechseln">
            {(["karten", "tabelle"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded-[10px] px-3 py-1.5 text-xs font-bold capitalize transition ${
                  view === v ? "bg-navy text-white" : "text-muted hover:text-ink"
                }`}
              >
                {v === "karten" ? "▦ Karten" : "☰ Tabelle"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm font-semibold text-muted">
        {results.length} {results.length === 1 ? "Produkt" : "Produkte"} gefunden
        {view === "tabelle" && " · Klicke auf eine Spalte zum Sortieren"}
      </p>

      {view === "karten" ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="card mt-4 overflow-x-auto !p-0">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-paper text-xs font-bold uppercase tracking-wider text-muted">
                {COLUMNS.map((c) => (
                  <th key={c.key} className="px-4 py-3">
                    <button
                      type="button"
                      onClick={() => toggleSort(c.key)}
                      className={`inline-flex items-center gap-1 uppercase tracking-wider hover:text-ink ${
                        sortKey === c.key ? "text-accent-deep" : ""
                      }`}
                    >
                      {c.label}
                      {sortKey === c.key && <span>{sortDir === -1 ? "↓" : "↑"}</span>}
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3">Trend</th>
              </tr>
            </thead>
            <tbody>
              {results.map((p) => {
                const n = getNiche(p.niche);
                return (
                  <tr key={p.slug} className="border-b border-line align-middle transition last:border-0 hover:bg-paper">
                    <td className="px-4 py-3">
                      <Link href={`/produkte/${p.slug}`} className="flex items-center gap-2.5 font-bold hover:text-accent-deep">
                        <span className="text-xl">{p.emoji}</span>
                        <span>
                          {p.name}
                          <span className="block text-xs font-semibold text-muted">
                            {n?.emoji} {n?.name}
                          </span>
                        </span>
                      </Link>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">CHF {p.buyPriceChf[0]}–{p.buyPriceChf[1]}</td>
                    <td className="whitespace-nowrap px-4 py-3">CHF {p.sellPriceChf[0]}–{p.sellPriceChf[1]}</td>
                    <td className="whitespace-nowrap px-4 py-3 font-bold text-accent-deep">{marginPercent(p)} %</td>
                    <td className="px-4 py-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-navy font-display text-xs font-extrabold text-white">
                        {p.score}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs font-semibold text-muted">{p.trend}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {results.length === 0 && (
        <div className="card mt-4 text-center text-sm text-muted">
          Kein Treffer – versuche ein anderes Stichwort oder entferne die Filter.
        </div>
      )}
      {view === "tabelle" && results.length > 0 && (
        <p className="mt-3 text-xs text-muted">
          Marge = Mittelwert Verkaufspreis minus Mittelwert Einkauf, in Prozent vom Verkaufspreis.
          Details, Qualitäts-Checks und Bezugsquellen: Produkt anklicken.
        </p>
      )}
    </div>
  );
}
