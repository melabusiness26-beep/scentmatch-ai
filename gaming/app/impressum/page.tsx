import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Anbieterkennzeichnung und Kontakt.",
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <span className="kicker">Rechtliches</span>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Impressum</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          Hier folgen deine Angaben als Betreiber (Name/Firma, Adresse, Kontakt-E-Mail). Bitte vor
          dem Live-Gang ausfüllen.
        </p>
        <div className="surface p-5 text-sm">
          <p>Betreiber: <span className="text-fg">[Dein Name]</span></p>
          <p>Adresse: <span className="text-fg">[Strasse, PLZ Ort, Land]</span></p>
          <p>E-Mail: <span className="text-fg">[deine@email.ch]</span></p>
        </div>
        <p className="text-sm">
          Hinweis: Alle genannten Marken, Spieltitel und Logos sind Eigentum der jeweiligen
          Inhaber. Diese Seite steht in keiner offiziellen Verbindung zu den Herstellern.
        </p>
      </div>
    </div>
  );
}
