import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import StudioClient from "@/components/StudioClient";

export const metadata: Metadata = {
  title: "KI-Studio: Werbevideos direkt auf der Seite erstellen",
  description:
    "Erstelle KI-Werbevideos Szene für Szene direkt im Browser – mit vorbereiteten Profi-Prompts aus dem Drehbuch-Generator.",
  alternates: { canonical: "/studio" },
  robots: { index: false, follow: true },
};

const SETUP_STEPS = [
  {
    title: "1. fal.ai-Konto anlegen",
    text: "Auf fal.ai registrieren (E-Mail genügt) und unter «Billing» ein kleines Guthaben laden – CHF 10 reichen für ca. 20–40 Video-Szenen.",
  },
  {
    title: "2. API-Schlüssel erstellen",
    text: "In fal.ai unter «API Keys» einen Schlüssel erzeugen und kopieren (beginnt mit einer langen Zeichenkette).",
  },
  {
    title: "3. Zwei Variablen in Vercel eintragen",
    text: "Im Vercel-Projekt unter Settings → Environment Variables: FAL_KEY = dein Schlüssel, STUDIO_ZUGANGSCODE = ein selbst gewähltes Passwort. Danach einmal neu deployen.",
  },
  {
    title: "4. Loslegen",
    text: "Diese Seite öffnen, Zugangscode eingeben, Szene wählen, «Video jetzt erstellen» – nach 1–5 Minuten erscheint dein Video direkt hier.",
  },
];

export default function StudioPage() {
  return (
    <div className="container-page py-12">
      <p className="kicker">KI-Studio</p>
      <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
        Werbevideos direkt hier erstellen
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        Das Studio schickt deinen Prompt an eine professionelle Video-KI (gemietet
        über fal.ai, dort laufen Modelle wie Kling) und zeigt dir das fertige Video
        direkt auf dieser Seite. Bezahlt wird nur pro erstelltem Video über dein
        eigenes Guthaben – ohne Abo. Der Zugang ist mit deinem persönlichen Code
        geschützt, damit niemand sonst dein Guthaben nutzen kann.
      </p>

      <p className="card mt-6 max-w-2xl border-t-4 border-t-accent text-sm leading-relaxed">
        <strong>💚 Kein Budget? Kein Problem.</strong> Mit der{" "}
        <Link href="/videos" className="font-semibold text-accent-deep hover:underline">
          0-Franken-Route
        </Link>{" "}
        erstellst du KI-Videos komplett gratis: Prompt hier generieren, bei Kling AI
        oder Hailuo AI mit den täglichen Gratis-Credits erstellen, herunterladen.
        Dieses Studio ist nur die Komfort-Variante ohne Kopieren – für später, wenn
        die ersten Einnahmen da sind.
      </p>

      <div className="mt-8">
        <Suspense fallback={<div className="card text-sm text-muted">Studio wird geladen …</div>}>
          <StudioClient />
        </Suspense>
      </div>

      {/* Einrichtung */}
      <section className="mt-16">
        <p className="kicker">Einmalige Einrichtung</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold">
          So aktivierst du das Studio (ca. 10 Minuten, einmalig)
        </h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {SETUP_STEPS.map((s) => (
            <div key={s.title} className="card">
              <h3 className="font-display text-base font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>
        <p className="card mt-5 text-sm leading-relaxed text-muted">
          <strong className="text-ink">Ehrlich & transparent:</strong> Die Video-KI
          gehört nicht dieser Webseite – sie wird pro Nutzung gemietet (genauso machen
          es auch die bekannten KI-Video-Plattformen). Vorteil für dich: keine
          Fixkosten, volle Kontrolle über die Ausgaben, und dein Guthaben wird nur
          verbraucht, wenn du wirklich auf «Video erstellen» klickst.
        </p>
      </section>
    </div>
  );
}
