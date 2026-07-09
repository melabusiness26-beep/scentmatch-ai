import type { Metadata } from "next";
import SaisonKalender from "@/components/SaisonKalender";

export const metadata: Metadata = {
  title: "Saisonkalender: Was sich in der Schweiz wann verkauft",
  description:
    "Der E-Commerce-Verkaufskalender für die Schweiz: Monat für Monat die richtigen Nischen, Produkte, Content-Ideen – und was du jetzt schon für den nächsten Monat vorbereitest.",
  alternates: { canonical: "/saisonkalender" },
};

export default function SaisonkalenderPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Saisonkalender</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Was sich in der Schweiz wann verkauft
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Timing schlägt Talent: Wer das richtige Produkt <strong className="text-ink">vor</strong>{" "}
        der Welle bewirbt, gewinnt. Dieser Kalender zeigt dir Monat für Monat die
        Schweizer Kauf-Anlässe, passende Nischen und Produkte aus unserem Katalog,
        eine Content-Idee – und den wichtigsten Punkt:{" "}
        <strong className="text-ink">was du jetzt schon für den nächsten Monat vorbereitest</strong>{" "}
        (Lieferzeiten!). Der aktuelle Monat ist markiert.
      </p>
      <div className="mt-8">
        <SaisonKalender />
      </div>
    </div>
  );
}
