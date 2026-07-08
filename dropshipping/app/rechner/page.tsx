import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import ProfitCalculator from "@/components/ProfitCalculator";

export const metadata: Metadata = {
  title: "Gewinn-Rechner: Lohnt sich dein Produkt wirklich?",
  description:
    "Berechne in Sekunden deinen echten Gewinn pro Verkauf – inklusive Zahlungsgebühren, Werbekosten und Erstattungs-Puffer. Mit Monats-Hochrechnung.",
  alternates: { canonical: "/rechner" },
};

export default function RechnerPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Gewinn-Rechner</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Lohnt sich dein Produkt? Rechne es in 10 Sekunden aus.
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Viele Anfänger:innen rechnen nur «Verkaufspreis minus Einkauf» – und wundern
        sich später. Dieser Rechner zieht auch Zahlungsgebühren, Werbekosten und
        einen ehrlichen Erstattungs-Puffer ab. Tipp: Auf jeder{" "}
        <Link href="/produkte" className="font-semibold text-accent-deep hover:underline">
          Produktseite
        </Link>{" "}
        kannst du die Zahlen direkt in den Rechner übernehmen.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="card text-sm text-muted">Rechner wird geladen …</div>}>
          <ProfitCalculator />
        </Suspense>
      </div>
    </div>
  );
}
