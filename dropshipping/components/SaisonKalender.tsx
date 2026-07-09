"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SAISON } from "@/data/saison";
import { getNiche } from "@/data/niches";
import { getProduct } from "@/data/products";

export default function SaisonKalender() {
  const [currentMonth, setCurrentMonth] = useState<number | null>(null);

  useEffect(() => {
    setCurrentMonth(new Date().getMonth());
  }, []);

  return (
    <div className="space-y-5">
      {SAISON.map((m, i) => {
        const aktiv = currentMonth === i;
        return (
          <section
            key={m.monat}
            className={`card ${aktiv ? "border-2 border-accent shadow-[0_10px_30px_rgba(14,159,110,0.15)]" : ""}`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl font-extrabold">
                {m.emoji} {m.monat}
                {aktiv && (
                  <span className="ml-2 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-white align-middle">
                    Jetzt!
                  </span>
                )}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {m.anlaesse.map((a) => (
                  <span key={a} className="chip !text-[11px]">{a}</span>
                ))}
              </div>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{m.fokus}</p>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl bg-paper p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted">
                  Nischen & Produkte des Monats
                </h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.nischen.map((slug) => {
                    const n = getNiche(slug);
                    return n ? (
                      <Link key={slug} href="/nischen" className="chip hover:border-accent hover:text-accent-deep">
                        {n.emoji} {n.name}
                      </Link>
                    ) : null;
                  })}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {m.produkte.map((slug) => {
                    const p = getProduct(slug);
                    return p ? (
                      <Link
                        key={slug}
                        href={`/produkte/${p.slug}`}
                        className="chip !bg-card hover:border-accent hover:text-accent-deep"
                      >
                        {p.emoji} {p.name}
                      </Link>
                    ) : null;
                  })}
                </div>
              </div>
              <div className="space-y-3">
                <p className="rounded-xl bg-accent-soft p-3 text-sm leading-relaxed">
                  <strong>🎬 Content-Idee:</strong> {m.contentIdee}
                </p>
                <p className="rounded-xl bg-amber-soft p-3 text-sm leading-relaxed">
                  <strong>⏭️ Jetzt vorbereiten:</strong> {m.jetztVorbereiten}
                </p>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
