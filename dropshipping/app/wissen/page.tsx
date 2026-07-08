import type { Metadata } from "next";
import Link from "next/link";
import { KNOWLEDGE } from "@/data/knowledge";

export const metadata: Metadata = {
  title: "Schweiz-Wissen: Alles für E-Commerce & Dropshipping in der Schweiz",
  description:
    "Zoll & MWST, Verpackungsmaterial, Recht, TWINT & Zahlungen, Post-Versand, Steuern & AHV, Lieferzeiten und Qualitätstests – einfach erklärt für die Schweiz.",
  alternates: { canonical: "/wissen" },
};

export default function WissenPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Schweiz-Wissen</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Alles, was du für E-Commerce in der Schweiz wissen musst
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Kein US-Blabla, keine Deutschland-Ratgeber: Hier findest du das Wissen für
        den <strong className="text-ink">Schweizer Markt</strong> – von der
        5-Franken-Zollregel über TWINT bis zum Verpackungsmaterial. Einfach erklärt,
        ohne Vorwissen.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {KNOWLEDGE.map((a) => (
          <Link
            key={a.slug}
            href={`/wissen/${a.slug}`}
            className="card group flex flex-col transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(16,29,49,0.10)]"
          >
            <span className="text-3xl">{a.emoji}</span>
            <h2 className="mt-3 font-display text-lg font-bold leading-snug group-hover:text-accent-deep">
              {a.title}
            </h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{a.teaser}</p>
            <span className="mt-4 text-xs font-bold uppercase tracking-wider text-muted">
              {a.readMinutes} Min. Lesezeit
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
