import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${SITE.name}.`,
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Rechtliches</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold">Impressum</h1>

      <div className="card mt-6 max-w-2xl border-t-4 border-t-amber-400">
        <p className="text-sm leading-relaxed">
          <strong>⚠️ Vorlage – vor dem Live-Gang ausfüllen:</strong> Ersetze die
          Angaben in [KLAMMERN] durch deine echten Daten. Ein Impressum mit
          Platzhaltern erfüllt die gesetzliche Pflicht NICHT.
        </p>
      </div>

      <div className="card mt-6 max-w-2xl space-y-4 leading-relaxed">
        <div>
          <h2 className="font-display text-lg font-bold">Verantwortlich für diese Website</h2>
          <p className="mt-2 text-muted">
            [VOR- UND NACHNAME]<br />
            [STRASSE UND HAUSNUMMER]<br />
            [PLZ UND ORT]<br />
            Schweiz
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Kontakt</h2>
          <p className="mt-2 text-muted">E-Mail: [DEINE E-MAIL-ADRESSE]</p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold">Haftungsausschluss</h2>
          <p className="mt-2 text-sm text-muted">
            Alle Inhalte dieser Website (Produktbewertungen, Preise, Lieferzeiten,
            rechtliche Hinweise) wurden sorgfältig recherchiert, sind aber
            unverbindliche Richtwerte und stellen keine Rechts-, Steuer- oder
            Anlageberatung dar. Für Angebote und Inhalte verlinkter externer
            Websites sind ausschliesslich deren Betreiber verantwortlich.
          </p>
        </div>
      </div>
    </div>
  );
}
