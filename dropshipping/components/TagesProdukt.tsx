"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PRODUCTS, marginText } from "@/data/products";
import { getNiche } from "@/data/niches";

/**
 * Zeigt jeden Tag ein anderes Produkt aus dem Katalog – deterministisch nach
 * Datum, damit alle Besucher am selben Tag dasselbe «Produkt des Tages» sehen.
 */
export default function TagesProdukt() {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const start = Date.UTC(now.getFullYear(), 0, 0);
    const dayOfYear = Math.floor((Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86400000);
    setIndex(dayOfYear % PRODUCTS.length);
  }, []);

  if (index === null) {
    return <div className="card h-40 animate-pulse bg-card" aria-hidden="true" />;
  }

  const product = PRODUCTS[index];
  const niche = getNiche(product.niche);

  return (
    <Link
      href={`/produkte/${product.slug}`}
      className="card group flex flex-col gap-5 border-t-4 border-t-swiss transition hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-14px_rgba(16,29,49,0.25)] sm:flex-row sm:items-center"
    >
      <span className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl bg-paper text-5xl">
        {product.emoji}
      </span>
      <span className="flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-swiss-soft px-2.5 py-0.5 text-[11px] font-bold text-swiss">
            🔥 Produkt des Tages
          </span>
          {niche && (
            <span className="text-[11px] font-semibold text-muted">
              {niche.emoji} {niche.name}
            </span>
          )}
        </span>
        <span className="mt-1.5 block font-display text-xl font-extrabold group-hover:text-accent-deep">
          {product.name}
        </span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{product.short}</span>
      </span>
      <span className="shrink-0 text-left sm:text-right">
        <span className="block font-display text-2xl font-extrabold text-accent-deep">
          {marginText(product)}
        </span>
        <span className="mt-0.5 block text-xs font-semibold text-muted">
          Score {product.score}/100 · Details ansehen →
        </span>
      </span>
    </Link>
  );
}
