import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center text-center">
      <span className="kicker">Fehler 404</span>
      <h1 className="mt-3 text-4xl font-bold sm:text-6xl">Game over.</h1>
      <p className="mt-3 max-w-md text-muted">
        Diese Seite gibt es nicht (mehr). Vielleicht findest du dein nächstes Spiel über die
        Datenbank oder den Game Finder.
      </p>
      <div className="mt-6 flex gap-2">
        <Link href="/" className="btn btn-primary">Zur Startseite</Link>
        <Link href="/games" className="btn btn-secondary">Zur Datenbank</Link>
      </div>
    </div>
  );
}
