import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CoverArt from "@/components/CoverArt";
import GameGrid from "@/components/GameGrid";
import SectionHeading from "@/components/SectionHeading";
import TrailerEmbed from "@/components/TrailerEmbed";
import AffiliateButton from "@/components/AffiliateButton";
import {
  formatReleaseDate,
  getAllSlugs,
  getGameBySlug,
  getSimilarGames,
  getYear,
} from "@/lib/games";
import { SITE } from "@/lib/site";
import { getCatalog } from "@/services/catalog";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: "Spiel nicht gefunden" };

  return {
    title: `${game.title} (${getYear(game)}) – Test, Infos & ähnliche Spiele`,
    description: game.descriptionShort,
    alternates: { canonical: `/game/${game.slug}` },
    openGraph: {
      title: game.title,
      description: game.descriptionShort,
      type: "article",
      url: `${SITE.url}/game/${game.slug}`,
    },
  };
}

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const catalog = await getCatalog();
  const game = getGameBySlug(slug, catalog);
  if (!game) notFound();

  const similar = getSimilarGames(game, 5, catalog);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    description: game.descriptionShort,
    genre: game.genres,
    gamePlatform: game.platforms,
    datePublished: game.releaseDate,
    author: { "@type": "Organization", name: game.developer },
    publisher: { "@type": "Organization", name: game.publisher },
    inLanguage: game.languages,
    contentRating: game.ageRating,
    ...(game.rating > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: (game.rating / 10).toFixed(1),
            bestRating: "10",
            ratingCount: Math.max(50, game.popularity * 12),
          },
        }
      : {}),
  };

  return (
    <article className="pb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="container-page pt-6">
        <nav className="text-xs text-muted" aria-label="Brotkrumen">
          <Link href="/" className="hover:text-fg">Start</Link>
          {" / "}
          <Link href="/games" className="hover:text-fg">Datenbank</Link>
          {" / "}
          <span className="text-fg">{game.title}</span>
        </nav>
      </div>

      {/* Header */}
      <header className="container-page mt-4 grid gap-6 lg:grid-cols-[300px_1fr]">
        <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-line">
          <div className="aspect-[3/4] w-full">
            <CoverArt game={game} className="h-full w-full" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            {game.genres.map((g) => (
              <Link key={g} href={`/games?genre=${encodeURIComponent(g)}`} className="pill pill-accent">
                {g}
              </Link>
            ))}
            <span className="pill pill-gold">{formatReleaseDate(game)}</span>
          </div>

          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{game.title}</h1>
          <p className="mt-3 max-w-2xl text-base text-muted">{game.descriptionShort}</p>

          {/* Plattformen */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {game.platforms.map((p) => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>

          {/* Schnell-Fakten */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Fact label="Schwierigkeit" value={game.difficulty} />
            <Fact label="Spielzeit (Story)" value={`${game.playtime.hoursMain} h`} />
            <Fact label="Altersfreigabe" value={game.ageRating} />
            <Fact label="Preis" value={game.priceRange.display} />
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <AffiliateButton game={game} />
            {game.officialWebsite && (
              <a
                href={game.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Offizielle Seite
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Inhalt + Specs */}
      <div className="container-page mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Prose title="Beschreibung" text={game.descriptionLong} />
          <Prose title="Story" text={game.story} />
          <Prose title="Gameplay" text={game.gameplay} />

          {/* Für wen geeignet */}
          <section>
            <h2 className="mb-3 text-xl font-bold">Für wen ist das Spiel?</h2>
            <ul className="flex flex-wrap gap-2">
              {game.bestFor.map((b) => (
                <li key={b} className="pill">✓ {b}</li>
              ))}
            </ul>
          </section>

          {/* Highlights */}
          <section className="surface p-5">
            <h2 className="mb-3 text-lg font-bold">Highlights</h2>
            <ul className="space-y-2 text-sm text-muted">
              {game.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="text-accent-2">◆</span> {h}
                </li>
              ))}
            </ul>
          </section>

          {/* Trailer */}
          {game.trailerUrl && (
            <section>
              <h2 className="mb-3 text-xl font-bold">Trailer</h2>
              <TrailerEmbed url={game.trailerUrl} title={game.title} />
            </section>
          )}

          {/* DLCs & Updates */}
          {(game.dlcs.length > 0 || game.updates.length > 0) && (
            <section className="grid gap-5 sm:grid-cols-2">
              {game.dlcs.length > 0 && (
                <div className="surface p-5">
                  <h2 className="mb-3 text-lg font-bold">DLCs & Erweiterungen</h2>
                  <ul className="space-y-3">
                    {game.dlcs.map((dlc) => (
                      <li key={dlc.title}>
                        <p className="font-semibold">{dlc.title}</p>
                        <p className="text-xs text-muted">{dlc.releaseDate}</p>
                        <p className="mt-1 text-sm text-muted">{dlc.descriptionShort}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {game.updates.length > 0 && (
                <div className="surface p-5">
                  <h2 className="mb-3 text-lg font-bold">Updates</h2>
                  <ul className="space-y-3">
                    {game.updates.map((u) => (
                      <li key={u.version}>
                        <p className="font-semibold">{u.title} · v{u.version}</p>
                        <p className="text-xs text-muted">{u.date}</p>
                        <p className="mt-1 text-sm text-muted">{u.notes}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}
        </div>

        {/* Specs-Sidebar */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="surface p-5">
            <h2 className="mb-4 font-display text-lg font-semibold">Steckbrief</h2>
            <dl className="space-y-3 text-sm">
              <Spec label="Entwickler" value={game.developer} />
              <Spec label="Publisher" value={game.publisher} />
              <Spec label="Release" value={formatReleaseDate(game)} />
              <Spec label="Modi" value={game.modes.join(", ")} />
              <Spec label="Spielzeit (100%)" value={`${game.playtime.hoursFull} h`} />
              <Spec label="Sprachen" value={game.languages.join(", ")} />
              <BoolSpec label="Multiplayer" value={game.multiplayer} />
              <BoolSpec label="Koop" value={game.coop} />
              <BoolSpec label="Crossplay" value={game.crossplay} />
              <BoolSpec label="Controller" value={game.controllerSupport} />
            </dl>

            {game.accessibility.length > 0 && (
              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-2 text-sm font-semibold">Barrierefreiheit</p>
                <ul className="flex flex-wrap gap-1.5">
                  {game.accessibility.map((a) => (
                    <li key={a} className="pill">{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* Ähnliche Spiele */}
      {similar.length > 0 && (
        <section className="container-page mt-12">
          <SectionHeading
            kicker="Wenn dir das gefällt"
            title="Ähnliche Spiele"
            subtitle={`Spiele mit ähnlicher Stimmung wie ${game.title}.`}
          />
          <GameGrid games={similar} />
        </section>
      )}
    </article>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-panel-2 p-3">
      <div className="text-[0.7rem] uppercase tracking-wide text-muted">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}

function Prose({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-bold">{title}</h2>
      <p className="leading-relaxed text-muted">{text}</p>
    </section>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="shrink-0 text-muted">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}

function BoolSpec({ label, value }: { label: string; value: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted">{label}</dt>
      <dd className={`font-medium ${value ? "text-accent-2" : "text-muted"}`}>
        {value ? "Ja" : "Nein"}
      </dd>
    </div>
  );
}
