import type { Metadata } from "next";
import GameFinder from "@/components/GameFinder";
import { getCatalog } from "@/services/catalog";

export const metadata: Metadata = {
  title: "Game Finder – Spiele-Empfehlung in 6 Fragen",
  description:
    "Beantworte ein paar kurze Fragen zu Plattform, Genre, Stimmung und Zeit – und erhalte sofort passende Spiele-Empfehlungen.",
  alternates: { canonical: "/finder" },
};

export default async function FinderPage() {
  const catalog = await getCatalog();
  return (
    <div className="container-page py-10">
      <div className="mb-8 text-center">
        <span className="kicker justify-center">Game Finder</span>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
          Finde dein nächstes Spiel in unter einer Minute
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted">
          Sechs kurze Fragen genügen. Du kannst jede Frage überspringen – wir rechnen die
          beste Empfehlung trotzdem aus.
        </p>
      </div>

      <GameFinder games={catalog} />
    </div>
  );
}
