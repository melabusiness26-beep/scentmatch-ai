import type { Metadata } from "next";
import Link from "next/link";
import { LEXIKON } from "@/data/lexikon";

export const metadata: Metadata = {
  title: "Lexikon: Alle E-Commerce-Begriffe einfach erklärt",
  description:
    "Dropshipping, Marge, Conversion, UGC, Fulfillment – jeder Fachbegriff in einfachen Worten erklärt. Für Einsteiger:innen ganz ohne Vorwissen.",
  alternates: { canonical: "/lexikon" },
};

export default function LexikonPage() {
  const sorted = [...LEXIKON].sort((a, b) => a.begriff.localeCompare(b.begriff, "de"));

  return (
    <div className="container-page py-12">
      <p className="kicker">Lexikon</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Alle Begriffe – einfach erklärt
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Kein Vorwissen nötig: Hier steht jeder Fachbegriff, der dir beim Start
        begegnet, in normalen Worten erklärt. Fehlt ein Begriff? Er kommt mit dem
        nächsten Update dazu.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sorted.map((e) => (
          <div key={e.begriff} className="card !p-5">
            <h2 className="font-display text-base font-extrabold text-accent-deep">
              {e.begriff}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{e.erklaerung}</p>
          </div>
        ))}
      </div>

      <div className="card mt-10 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm font-semibold">
          Begriffe klar? Dann führt dich der geführte Einstieg Schritt für Schritt weiter.
        </p>
        <Link href="/start" className="btn-primary shrink-0">
          🧭 Zum geführten Einstieg
        </Link>
      </div>
    </div>
  );
}
