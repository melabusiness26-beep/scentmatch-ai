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

/* Jede Nische bekommt ihre eigene, wiedererkennbare Kachel-Farbe. */
const NICHE_TILE: Record<string, string> = {
  haustiere: "from-amber-100 to-orange-50",
  "home-living": "from-violet-100 to-indigo-50",
  "beauty-selfcare": "from-rose-100 to-pink-50",
  "fitness-sport": "from-emerald-100 to-teal-50",
  "kueche-haushalt": "from-yellow-100 to-amber-50",
  "baby-kids": "from-sky-100 to-cyan-50",
  "tech-gadgets": "from-slate-200 to-slate-50",
  "outdoor-reisen": "from-lime-100 to-green-50",
  "gaming-zubehoer": "from-fuchsia-100 to-purple-50",
  "garten-balkon": "from-green-100 to-emerald-50",
  "wellness-schlaf": "from-indigo-100 to-blue-50",
  "auto-pendeln": "from-zinc-200 to-stone-50",
  "buero-homeoffice": "from-cyan-100 to-sky-50",
  "nachhaltig-leben": "from-teal-100 to-lime-50",
  "schmuck-accessoires": "from-yellow-100 to-amber-50",
  "kaffee-tee": "from-orange-100 to-amber-50",
  "yoga-achtsamkeit": "from-purple-100 to-violet-50",
  "grill-bbq": "from-red-100 to-orange-50",
  "velo-ebike": "from-sky-100 to-blue-50",
  "winter-schnee": "from-blue-100 to-slate-50",
  "geschenke-personalisiert": "from-pink-100 to-rose-50",
  "kreativ-diy": "from-rose-100 to-fuchsia-50",
};

export default function ProductCard({ product }: { product: Product }) {
  const niche = getNiche(product.niche);
  return (
    <Link
      href={`/produkte/${product.slug}`}
      className="card group flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,29,49,0.10)]"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-3xl ${
            NICHE_TILE[product.niche] ?? "from-slate-100 to-slate-50"
          }`}
        >
          {product.emoji}
        </span>
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white ring-2 ring-navy/10 ring-offset-2"
          title="Score (0–100)"
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
