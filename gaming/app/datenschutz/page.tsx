import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Informationen zum Umgang mit Daten.",
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <span className="kicker">Rechtliches</span>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Datenschutz</h1>
      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          Diese Platzhalter-Seite erklärt später, welche Daten erhoben werden (z. B. anonyme
          Statistik, Newsletter-Anmeldung) und welche Rechte du hast. Vor dem Live-Gang mit einer
          echten Datenschutzerklärung ersetzen.
        </p>
        <p className="text-sm">
          Affiliate-Links: Einige Links sind Provisions-Links (als <code>rel=&quot;sponsored&quot;</code>
          gekennzeichnet). Bei einem Kauf darüber erhalten wir ggf. eine kleine Provision – ohne
          Mehrkosten für dich.
        </p>
      </div>
    </div>
  );
}
