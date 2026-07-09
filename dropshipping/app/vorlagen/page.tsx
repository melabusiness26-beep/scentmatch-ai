import type { Metadata } from "next";
import VorlagenListe from "@/components/VorlagenListe";
import { VORLAGEN } from "@/data/vorlagen";

export const metadata: Metadata = {
  title: "Kundenservice-Vorlagen: Fertige Antworten zum Kopieren",
  description:
    "«Wo ist mein Paket?», Retouren, defekte Ware, Lieferanten-Anfragen auf Englisch – fertige, freundliche Text-Vorlagen für Schweizer Shops zum Kopieren.",
  alternates: { canonical: "/vorlagen" },
};

export default function VorlagenPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Vorlagen</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Kundenservice ohne Angst: {VORLAGEN.length} fertige Vorlagen
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Die erste Reklamation ist der Moment, vor dem sich alle Anfänger:innen
        fürchten – dabei ist guter Kundenservice nur eine Frage der richtigen
        Worte. Hier sind die Situationen, die garantiert kommen werden, mit
        fertigen Antworten: kopieren, Platzhalter in [KLAMMERN] ersetzen, senden.
        Inklusive englischer Vorlagen für den Kontakt mit Lieferanten.
      </p>
      <div className="mx-auto mt-8 max-w-3xl">
        <VorlagenListe />
      </div>
      <p className="card mx-auto mt-8 max-w-3xl text-sm leading-relaxed text-muted">
        <strong className="text-ink">Der goldene Kundenservice-Grundsatz:</strong>{" "}
        Antworte innert 24 Stunden, gib nie der Kundschaft die Schuld, und löse
        Probleme grosszügiger, als du müsstest. Eine kulante Erstattung kostet ein
        paar Franken – eine öffentliche 1-Stern-Bewertung kostet dich Dutzende
        künftige Verkäufe.
      </p>
    </div>
  );
}
