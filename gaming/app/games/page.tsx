import type { Metadata } from "next";
import GamesExplorer from "@/components/GamesExplorer";
import { getCatalog } from "@/services/catalog";
import type { Genre, Mood, Platform } from "@/lib/types";

export const metadata: Metadata = {
  title: "Spiele-Datenbank & Filter",
  description:
    "Durchsuche und filtere alle Spiele nach Genre, Plattform, Spielmodus, Schwierigkeit, Spielzeit, Erscheinungsjahr und Tags wie cozy, horror oder open world.",
  alternates: { canonical: "/games" },
};

// searchParams ist in Next 16 asynchron.
export default async function GamesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const catalog = await getCatalog();
  const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  return (
    <div className="container-page py-8">
      <div className="mb-6">
        <span className="kicker">Spiele-Datenbank</span>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Finde genau das richtige Spiel</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Kombiniere Suche und Filter – nach Genre, Plattform, Modus, Schwierigkeit, Spielzeit,
          Jahr und Tags.
        </p>
      </div>

      <GamesExplorer
        games={catalog}
        initialQuery={first(sp.q) ?? ""}
        initialGenre={first(sp.genre) as Genre | undefined}
        initialPlatform={first(sp.platform) as Platform | undefined}
        initialMood={first(sp.mood) as Mood | undefined}
        initialSection={first(sp.section) as "new" | "retro" | undefined}
      />
    </div>
  );
}
