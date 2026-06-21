import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import GameGrid from "@/components/GameGrid";
import SectionHeading from "@/components/SectionHeading";
import MoodGrid from "@/components/MoodGrid";
import NewsletterSignup from "@/components/NewsletterSignup";
import {
  getAllGames,
  getNewAndUpcoming,
  getPopularGames,
  getRetroClassics,
} from "@/lib/games";
import { GENRES, PLATFORMS } from "@/data/taxonomy";

// Statische Startseite, stündlich neu validiert (ISR) – schnell & SEO-freundlich.
export const revalidate = 3600;

export default function HomePage() {
  const popular = getPopularGames(12);
  const newUpcoming = getNewAndUpcoming(6);
  const retro = getRetroClassics(6);
  const total = getAllGames().length;

  return (
    <>
      {/* ----------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(45rem 30rem at 70% -20%, rgba(124,92,255,0.22), transparent 60%)",
          }}
        />
        <div className="container-page relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <span className="kicker">Dein smarter Game-Finder</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">
              <span className="text-gradient">Find your next game.</span>
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">
              Entdecke, vergleiche und finde dein nächstes Lieblingsspiel – von zeitlosen
              Klassikern bis zu den heißesten neuen Releases. Starke Filter, ausführliche
              Profile und Empfehlungen, die wirklich passen.
            </p>

            <div className="mt-6 max-w-xl">
              <SearchForm size="lg" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/games?section=new" className="btn btn-secondary btn-sm">
                🚀 Neue Releases
              </Link>
              <Link href="/games?section=retro" className="btn btn-secondary btn-sm">
                👾 Klassiker
              </Link>
              <Link href="/games" className="btn btn-secondary btn-sm">
                🎮 Top Genres
              </Link>
              <Link href="/finder" className="btn btn-primary btn-sm">
                ✨ Game Finder
              </Link>
            </div>
          </div>

          {/* Zahlen-Panel */}
          <div className="surface grid grid-cols-3 gap-2 p-5 sm:p-6">
            <Stat value={`${total}+`} label="Spiele kuratiert" />
            <Stat value={`${PLATFORMS.length}`} label="Plattformen" />
            <Stat value={`${GENRES.length}`} label="Genres" />
            <div className="col-span-3 mt-2 border-t border-line pt-4 text-sm text-muted">
              Handgepflegte Profile mit Story, Gameplay, Spielzeit & ähnlichen Spielen –
              ideal, um schnell das Richtige zu finden.
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Stöbern nach Genre */}
      <section className="container-page py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {GENRES.map((genre) => (
            <Link
              key={genre}
              href={`/games?genre=${encodeURIComponent(genre)}`}
              className="chip shrink-0"
            >
              {genre}
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------- Beliebt */}
      <section className="container-page py-8">
        <SectionHeading
          kicker="Beliebt gerade"
          title="Beliebte Spiele"
          subtitle="Die Titel, über die alle reden – quer durch alle Plattformen."
          href="/games"
        />
        <GameGrid games={popular} />
      </section>

      {/* --------------------------------------------------- New & Upcoming */}
      <section className="container-page py-8">
        <SectionHeading
          kicker="Frisch & in Kürze"
          title="New & Upcoming Games"
          subtitle="Neu erschienen und mit Spannung erwartet."
          href="/games?section=new"
        />
        <GameGrid games={newUpcoming} />
      </section>

      {/* ----------------------------------------------------- Find by mood */}
      <section className="container-page py-8">
        <SectionHeading
          kicker="Nach Gefühl"
          title="Find games by mood"
          subtitle="Keine Lust auf Filter? Wähl einfach eine Stimmung."
        />
        <MoodGrid />
      </section>

      {/* ------------------------------------------------------ Retro Classics */}
      <section className="container-page py-8">
        <SectionHeading
          kicker="Zeitlos gut"
          title="Retro Classics"
          subtitle="Spiele, die Geschichte geschrieben haben."
          href="/games?section=retro"
        />
        <GameGrid games={retro} />
      </section>

      {/* ----------------------------------------------------- Warum / Finder */}
      <section className="container-page py-8">
        <div className="surface relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "radial-gradient(40rem 22rem at 0% 100%, rgba(22,214,200,0.16), transparent 60%)",
            }}
          />
          <div className="relative grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <span className="kicker">Warum {`NexusPlay`}</span>
              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                Weniger suchen. Mehr spielen.
              </h2>
              <p className="mt-2 text-sm text-muted">
                Unser Game Finder stellt dir ein paar kurze Fragen und schlägt dir passende
                Spiele vor – egal ob Solo-Abend oder Koop mit Freunden.
              </p>
              <Link href="/finder" className="btn btn-primary mt-5">
                Game Finder starten
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:col-span-2">
              <Feature icon="🎯" title="Passend statt zufällig" text="Empfehlungen auf Basis von Plattform, Genre, Stimmung & Zeit." />
              <Feature icon="📚" title="Tiefe Profile" text="Story, Gameplay, Schwierigkeit, Spielzeit & ähnliche Spiele." />
              <Feature icon="🔎" title="Starke Filter" text="Genre, Plattform, Modus, Tags wie cozy, horror, open world." />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- Newsletter */}
      <section className="container-page py-8">
        <NewsletterSignup />
      </section>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl bg-panel-2 p-3 text-center">
      <div className="font-display text-2xl font-bold text-fg">{value}</div>
      <div className="mt-0.5 text-[0.7rem] text-muted">{label}</div>
    </div>
  );
}

function Feature({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <div className="rounded-xl border border-line bg-panel-2/60 p-4">
      <div className="text-2xl">{icon}</div>
      <h3 className="mt-2 font-display font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted">{text}</p>
    </div>
  );
}
