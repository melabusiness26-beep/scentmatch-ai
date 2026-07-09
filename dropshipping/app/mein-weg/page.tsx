import type { Metadata } from "next";
import MeinWeg from "@/components/MeinWeg";
import { JOURNEY, JOURNEY_TASK_COUNT } from "@/data/journey";

export const metadata: Metadata = {
  title: "Mein Weg: Deine 1-zu-1-Begleitung von der Idee bis zum ersten Verkauf",
  description: `Der komplette begleitete Weg in ${JOURNEY.length} Phasen und ${JOURNEY_TASK_COUNT} Schritten – mit Fortschritts-Speicherung, Zeitangaben und direktem Link zum passenden Werkzeug für jeden Schritt.`,
  alternates: { canonical: "/mein-weg" },
};

export default function MeinWegPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Mein Weg</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Deine 1-zu-1-Begleitung: Von der Idee bis zum ersten Verkauf
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Das ist dein persönlicher Fahrplan durch alles, was diese Seite kann –{" "}
        {JOURNEY.length} Phasen, {JOURNEY_TASK_COUNT} konkrete Schritte, jeder mit
        Zeitangabe und direktem Link zum passenden Werkzeug. Hake ab, was erledigt
        ist – <strong className="text-ink">dein Fortschritt bleibt gespeichert</strong>,
        und die Seite zeigt dir immer deinen nächsten Schritt. Wie ein Coach, der
        nie die Geduld verliert.
      </p>
      <div className="mt-8">
        <MeinWeg />
      </div>
    </div>
  );
}
