import Link from "next/link";
import type { Product } from "@/data/products";
import { marginText } from "@/data/products";
import { getNiche } from "@/data/niches";

function trendChip(trend: Product["trend"]) {
  switch (trend) {
    case "Im Trend":
      return "bg-swiss-soft text-swiss";
    case "Kommender Trend":
      return "bg-amber-soft text-amber-700";
    default:
      return "bg-accent-soft text-accent-deep";
  }
}

export default function ProductCard({ product }: { product: Product }) {
  const niche = getNiche(product.niche);
  return (
    <Link
      href={`/produkte/${product.slug}`}
      className="card group flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,29,49,0.10)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-paper text-2xl">
          {product.emoji}
        </span>
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white"
          title="SwissDrop-Score (0–100)"
        >
          {product.score}
        </span>
      </div>

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${trendChip(product.trend)}`}>
            {product.trend}
          </span>
          {niche && <span className="text-[11px] font-semibold text-muted">{niche.emoji} {niche.name}</span>}
        </div>
        <h3 className="mt-2 font-display text-base font-bold leading-snug group-hover:text-accent-deep">
          {product.name}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{product.short}</p>
      </div>

      <dl className="mt-auto grid grid-cols-2 gap-2 border-t border-line pt-3 text-xs">
        <div>
          <dt className="text-muted">Verkaufspreis</dt>
          <dd className="font-bold">CHF {product.sellPriceChf[0]}–{product.sellPriceChf[1]}</dd>
        </div>
        <div>
          <dt className="text-muted">Marge</dt>
          <dd className="font-bold text-accent-deep">{marginText(product)}</dd>
        </div>
      </dl>
    </Link>
  );
}
