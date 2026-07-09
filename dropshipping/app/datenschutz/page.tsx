import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${SITE.name}.`,
  alternates: { canonical: "/datenschutz" },
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">Rechtliches</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold">Datenschutzerklärung</h1>

      <div className="card mt-6 max-w-2xl border-t-4 border-t-amber-400">
        <p className="text-sm leading-relaxed">
          <strong>⚠️ Vorlage – vor dem Live-Gang prüfen:</strong> Ersetze die
          [KLAMMERN] und ergänze die Erklärung, sobald du Analyse-Tools, Newsletter
          oder Werbe-Pixel einsetzt. Stand heute verarbeitet die Seite selbst keine
          Personendaten – die Erklärung ist entsprechend kurz.
        </p>
      </div>

      <div className="card mt-6 max-w-2xl space-y-4 leading-relaxed text-sm text-muted">
        <div>
          <h2 className="font-display text-lg font-bold text-ink">1. Verantwortliche Stelle</h2>
          <p className="mt-2">
            [VOR- UND NACHNAME], [ADRESSE], Schweiz – E-Mail: [DEINE E-MAIL-ADRESSE].
            Es gilt das Schweizer Datenschutzgesetz (nDSG).
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-ink">2. Welche Daten diese Website verarbeitet</h2>
          <p className="mt-2">
            Diese Website ist eine reine Informations-Plattform: Es gibt keine
            Benutzerkonten, keine Bestellungen und keinen Newsletter. Werkzeuge wie
            Checklisten und der Store-Planer speichern deinen Fortschritt
            ausschliesslich lokal in deinem eigenen Browser (localStorage) – diese
            Daten verlassen dein Gerät nicht.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-ink">3. Hosting</h2>
          <p className="mt-2">
            Die Website wird bei Vercel Inc. gehostet. Beim Aufruf werden technisch
            notwendige Daten (z. B. IP-Adresse) in Server-Logs verarbeitet, um die
            Website auszuliefern und ihre Sicherheit zu gewährleisten.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-ink">4. Externe Links</h2>
          <p className="mt-2">
            Diese Website verlinkt auf externe Plattformen (z. B. AliExpress,
            Shopify, fal.ai). Für deren Datenverarbeitung sind die jeweiligen
            Anbieter verantwortlich – bitte beachte deren Datenschutzerklärungen.
          </p>
        </div>
        <div>
          <h2 className="font-display text-lg font-bold text-ink">5. Deine Rechte</h2>
          <p className="mt-2">
            Du hast das Recht auf Auskunft, Berichtigung und Löschung deiner
            Personendaten. Wende dich dazu an die oben genannte E-Mail-Adresse.
          </p>
        </div>
      </div>
    </div>
  );
}
