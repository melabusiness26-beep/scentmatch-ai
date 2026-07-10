"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Frage = {
  id: string;
  frage: string;
  punkte: number;
  hilfe: string;
  quelle?: { label: string; url: string };
};

const FRAGEN: Frage[] = [
  {
    id: "wow",
    frage: "Versteht man den Nutzen in unter 3 Sekunden – ganz ohne Worte?",
    punkte: 20,
    hilfe: "Der Wow-Effekt: Stell dir das Produkt in einem stummen 3-Sekunden-Video vor. Würde man stehen bleiben? (Leuchtet, verwandelt, löst sichtbar ein Problem?)",
  },
  {
    id: "problem",
    frage: "Löst es ein spürbares Alltagsproblem ODER macht es sichtbar Freude?",
    punkte: 15,
    hilfe: "Kaufauslöser Nr. 1: Schmerz weg (Problem) oder Herz auf (Emotion/Geschenk). Reine «nice to have»-Produkte verkaufen sich schwer.",
  },
  {
    id: "tiktok",
    frage: "Laufen dazu aktuell Anzeigen oder virale Videos auf TikTok?",
    punkte: 15,
    hilfe: "Im TikTok Creative Center nach dem Produkt suchen: Laufende Anzeigen = jemand verdient gerade Geld damit. Gar nichts zu finden ist ein Warnsignal (oder du bist SEHR früh).",
    quelle: { label: "TikTok Creative Center öffnen", url: "https://ads.tiktok.com/business/creativecenter" },
  },
  {
    id: "trends",
    frage: "Zeigt Google Trends (Region Schweiz) eine steigende oder stabile Kurve?",
    punkte: 10,
    hilfe: "Produktbegriff eingeben, Region Schweiz, 12 Monate: steigend = kommender Trend, stabil = Dauerbrenner, fallend = Welle vorbei.",
    quelle: { label: "Google Trends öffnen", url: "https://trends.google.ch" },
  },
  {
    id: "bestellungen",
    frage: "Hat es auf AliExpress 500+ Bestellungen mit 4.5+ Sternen?",
    punkte: 10,
    hilfe: "Bestellzahlen sind echte Verkaufsdaten: viele Bestellungen + gute Sterne = bewährte Nachfrage und brauchbare Qualität.",
    quelle: { label: "AliExpress öffnen", url: "https://www.aliexpress.com" },
  },
  {
    id: "marge",
    frage: "Kannst du es für mindestens das 3-Fache des Einkaufs verkaufen?",
    punkte: 15,
    hilfe: "Unter 3× Aufschlag fressen Gebühren, Erstattungen und Werbung deinen Gewinn. Im Zweifel: kurz im Gewinn-Rechner prüfen.",
  },
  {
    id: "versand",
    frage: "Ist es leicht, robust und kleiner als ein Schuhkarton?",
    punkte: 10,
    hilfe: "Klein + leicht + unzerbrechlich = tiefe Versandkosten, wenig Transportschäden, weniger Ärger. Glas und Übergrösse sind Abzugspunkte.",
  },
  {
    id: "saettigung",
    frage: "Ist es noch NICHT überall in Schweizer Shops und Werbung zu sehen?",
    punkte: 5,
    hilfe: "Etwas Konkurrenz ist gesund (beweist Nachfrage). Aber wenn es schon jede:r bewirbt, brauchst du einen besonderen Winkel, um durchzukommen.",
  },
];

export default function TrendCheck() {
  const [antworten, setAntworten] = useState<Record<string, boolean | null>>({});

  const beantwortet = FRAGEN.every((f) => antworten[f.id] !== undefined && antworten[f.id] !== null);
  const score = useMemo(
    () => FRAGEN.reduce((sum, f) => sum + (antworten[f.id] ? f.punkte : 0), 0),
    [antworten]
  );

  const verdict =
    score >= 75
      ? {
          emoji: "🔥",
          titel: "Heisser Kandidat!",
          text: "Dieses Produkt hat das Zeug zum Gewinner. Nächste Schritte: Muster bestellen, Gewinn exakt durchrechnen und das erste Drehbuch vorbereiten.",
          cls: "bg-accent-soft text-accent-deep",
        }
      : score >= 50
        ? {
            emoji: "🤔",
            titel: "Testenswert – mit Vorsicht",
            text: "Solide Basis, aber Schwächen. Schau dir die Nein-Antworten an: Lassen sie sich lösen (z. B. besserer Preis, anderer Winkel)? Dann Muster bestellen – sonst weitersuchen.",
            cls: "bg-amber-soft text-amber-700",
          }
        : {
            emoji: "🛑",
            titel: "Lieber weitersuchen",
            text: "Zu viele Warnsignale – dieses Produkt kostet dich wahrscheinlich Zeit und Geld. Gute Nachricht: Der Katalog und der Saisonkalender sind voll mit besseren Kandidaten.",
            cls: "bg-swiss-soft text-swiss",
          };

  function setAntwort(id: string, wert: boolean) {
    setAntworten((prev) => ({ ...prev, [id]: wert }));
  }

  return (
    <div>
      <div className="space-y-3">
        {FRAGEN.map((f, i) => {
          const antwort = antworten[f.id];
          return (
            <div key={f.id} className="card !p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <p className="font-bold">
                    {i + 1}. {f.frage}
                    <span className="ml-2 text-xs font-semibold text-muted">({f.punkte} Punkte)</span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.hilfe}</p>
                  {f.quelle && (
                    <a
                      href={f.quelle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-xs font-bold text-accent-deep hover:underline"
                    >
                      {f.quelle.label} ↗
                    </a>
                  )}
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => setAntwort(f.id, true)}
                    className={`rounded-xl border px-5 py-2 text-sm font-bold transition ${
                      antwort === true
                        ? "border-accent bg-accent text-white"
                        : "border-line bg-card hover:border-accent"
                    }`}
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => setAntwort(f.id, false)}
                    className={`rounded-xl border px-5 py-2 text-sm font-bold transition ${
                      antwort === false
                        ? "border-swiss bg-swiss text-white"
                        : "border-line bg-card hover:border-swiss"
                    }`}
                  >
                    Nein
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Ergebnis */}
      <div className="card hero-surface mt-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Dein Trend-Score
            </p>
            <p className="mt-1 font-display text-4xl font-extrabold">
              {score}<span className="text-xl text-muted-dark">/100</span>
            </p>
          </div>
          <div className="h-3 w-full max-w-xs overflow-hidden rounded-full bg-white/10">
            <div
              className={`h-full rounded-full transition-all ${
                score >= 75 ? "bg-emerald-400" : score >= 50 ? "bg-amber-400" : "bg-red-400"
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        {beantwortet ? (
          <div className={`mt-4 rounded-xl p-4 text-sm font-semibold leading-relaxed ${verdict.cls}`}>
            {verdict.emoji} <strong>{verdict.titel}</strong> – {verdict.text}
          </div>
        ) : (
          <p className="mt-4 text-sm text-muted-dark">
            Beantworte alle {FRAGEN.length} Fragen für dein Urteil. Tipp: Die Fragen 3–5
            beantwortest du mit den verlinkten Gratis-Quellen in je 2 Minuten.
          </p>
        )}
        {beantwortet && score >= 50 && (
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/rechner" className="btn-primary">💰 Gewinn durchrechnen</Link>
            <Link href="/wissen/produktqualitaet-testen" className="btn-dark-outline">🧪 Muster-Methode</Link>
          </div>
        )}
      </div>
    </div>
  );
}
