import type { Metadata } from "next";
import { Suspense } from "react";
import StorePlaner from "@/components/StorePlaner";

export const metadata: Metadata = {
  title: "Store-Planer: Dein E-Commerce-Fahrplan in 1 Minute",
  description:
    "Sag uns, was du verkaufen willst – der Store-Planer erstellt Namensideen, Start-Sortiment, Bezugsquellen, Preise, 4-Wochen-Fahrplan und dein erstes Video-Drehbuch.",
  alternates: { canonical: "/store-planer" },
};

export default function StorePlanerPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Store-Planer</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Sag uns, was du verkaufen willst – wir planen deinen Store.
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Zum Beispiel: «Ich möchte etwas für Haustiere verkaufen.» Wähle unten die
        Nische, dein Budget und deine Zeit – und du bekommst einen kompletten,
        ehrlichen Fahrplan: Namensideen, Start-Sortiment mit geprüften Produkten,
        Bezugsquelle, Plattform-Empfehlung, 4-Wochen-Plan und dein erstes
        Video-Drehbuch.
      </p>
      <div className="mt-8">
        <Suspense fallback={<div className="card text-sm text-muted">Planer wird geladen …</div>}>
          <StorePlaner />
        </Suspense>
      </div>
    </div>
  );
}
