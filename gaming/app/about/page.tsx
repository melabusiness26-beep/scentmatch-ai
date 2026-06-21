import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Über uns",
  description: `Was ${SITE.name} ist und warum es dir hilft, schneller das richtige Spiel zu finden.`,
};

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <span className="kicker">Über uns</span>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Über {SITE.name}</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          {SITE.name} ist ein moderner Game-Finder: Statt endlos zu scrollen, hilft dir die Seite,
          schnell ein Spiel zu finden, das wirklich zu dir passt – von zeitlosen Klassikern bis zu
          den neuesten Releases.
        </p>
        <p>
          Jedes Spielprofil ist sorgfältig aufbereitet: Story, Gameplay, Schwierigkeit, Spielzeit,
          Plattformen und ähnliche Spiele auf einen Blick. Der Game Finder schlägt dir auf Basis
          weniger Fragen passende Titel vor.
        </p>
        <p className="text-sm">
          Die Datenbank wird laufend erweitert. Anbindungen an offizielle Quellen (z. B. IGDB,
          RAWG, Steam) sind technisch vorbereitet.
        </p>
      </div>
    </div>
  );
}
