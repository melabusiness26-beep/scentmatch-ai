import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-24 text-center">
      <span className="text-5xl">🧭</span>
      <h1 className="mt-4 font-display text-3xl font-extrabold">Seite nicht gefunden</h1>
      <p className="mt-2 max-w-md text-muted">
        Diese Seite gibt es (noch) nicht – aber dein nächstes Gewinner-Produkt wartet schon.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-secondary">Zur Startseite</Link>
        <Link href="/produkte" className="btn-primary">Produkte entdecken</Link>
      </div>
    </div>
  );
}
