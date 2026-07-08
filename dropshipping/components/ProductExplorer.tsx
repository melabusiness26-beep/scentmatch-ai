"use client";

import { useMemo, useState } from "react";
import { PRODUCTS, type Trend } from "@/data/products";
import { NICHES } from "@/data/niches";
import ProductCard from "@/components/ProductCard";

const TRENDS: Trend[] = ["Im Trend", "Kommender Trend", "Dauerbrenner"];

export default function ProductExplorer() {
  const [query, setQuery] = useState("");
  const [niche, setNiche] = useState<string | null>(null);
  const [trend, setTrend] = useState<Trend | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (niche && p.niche !== niche) return false;
      if (trend && p.trend !== trend) return false;
      if (!q) return true;
      const haystack = `${p.name} ${p.short} ${p.description} ${p.targetAudience}`.toLowerCase();
      return haystack.includes(q);
    }).sort((a, b) => b.score - a.score);
  }, [query, niche, trend]);

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

        <div className="mt-3 flex flex-wrap gap-2">
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
      </div>

      <p className="mt-6 text-sm font-semibold text-muted">
        {results.length} {results.length === 1 ? "Produkt" : "Produkte"} gefunden
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      {results.length === 0 && (
        <div className="card mt-4 text-center text-sm text-muted">
          Kein Treffer – versuche ein anderes Stichwort oder entferne die Filter.
        </div>
      )}
    </div>
  );
}
