import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Starte hier: Dropshipping für absolute Anfänger:innen",
  description:
    "Noch nie einen Online-Shop gehabt? Hier startest du bei null: Was Dropshipping ist, was es wirklich kostet, und dein Weg in 6 einfachen Schritten – ehrlich erklärt.",
  alternates: { canonical: "/start" },
};

const ERKLAERUNG = [
  {
    emoji: "🛒",
    title: "1. Jemand bestellt in deinem Shop",
    text: "Eine Kundin sieht dein Video auf TikTok, klickt auf deinen Shop und kauft z. B. ein Leuchthalsband für CHF 24.",
  },
  {
    emoji: "📨",
    title: "2. Du leitest die Bestellung weiter",
    text: "Du bestellst dasselbe Produkt für CHF 6 bei deinem Lieferanten – mit der Adresse deiner Kundin als Lieferadresse. Das dauert 2 Minuten (oder läuft automatisch).",
  },
  {
    emoji: "📦",
    title: "3. Der Lieferant verschickt direkt",
    text: "Das Paket geht vom Lieferanten direkt an deine Kundin. Du hast nie ein Lager, kein Risiko mit unverkaufter Ware – und die Differenz (hier ca. CHF 15 vor Gebühren) ist dein Verdienst.",
  },
];

const SCHRITTE = [
  {
    emoji: "📖",
    title: "Verstehe die Grundlagen",
    text: "Lies dieses kurze Lexikon quer – danach verstehst du jedes Wort auf dieser Seite. Dauert 10 Minuten.",
    href: "/lexikon",
    cta: "Zum Lexikon",
    zeit: "10 Min.",
  },
  {
    emoji: "🧭",
    title: "Finde deine Nische",
    text: "5 Fragen zu deinen Interessen und deinem Budget – das Quiz sagt dir, welcher Bereich zu dir passt. Du musst nichts wissen, nur ehrlich antworten.",
    href: "/nischen-quiz",
    cta: "Quiz starten",
    zeit: "1 Min.",
  },
  {
    emoji: "🔎",
    title: "Wähle 1–3 geprüfte Produkte",
    text: "Im Produkt-Finder sind alle Produkte schon bewertet – mit Vorteilen, Nachteilen und Bezugsquellen. Du musst nicht selbst suchen, nur auswählen.",
    href: "/produkte",
    cta: "Produkte ansehen",
    zeit: "20 Min.",
  },
  {
    emoji: "💰",
    title: "Rechne nach, ob es sich lohnt",
    text: "Der Gewinn-Rechner zeigt dir ehrlich, was pro Verkauf übrig bleibt – inklusive aller Gebühren, an die Anfänger nie denken.",
    href: "/rechner",
    cta: "Zum Rechner",
    zeit: "5 Min.",
  },
  {
    emoji: "🚀",
    title: "Lass dir deinen Plan erstellen",
    text: "Der Store-Planer baut dir deinen persönlichen 4-Wochen-Fahrplan mit abhakbaren Aufgaben – von «Muster bestellen» bis «erstes Video posten».",
    href: "/store-planer",
    cta: "Plan erstellen",
    zeit: "2 Min.",
  },
  {
    emoji: "🎬",
    title: "Erstelle dein erstes Werbevideo",
    text: "Der Generator schreibt dir das Drehbuch Szene für Szene – du brauchst nur ein Handy. Oder du nutzt die 0-Franken-KI-Route.",
    href: "/videos",
    cta: "Video planen",
    zeit: "30 Min.",
  },
];

const FAQ = [
  {
    frage: "Wie viel Geld brauche ich wirklich zum Starten?",
    antwort:
      "Weniger, als die meisten denken: Mit CHF 50–100 kannst du Muster bestellen und mit Gratis-Videos auf TikTok testen, ob dein Produkt ankommt. Einen bezahlten Shop (ca. CHF 30/Monat) brauchst du erst, wenn die ersten Videos Interesse zeigen. Was du NICHT brauchst: teure Kurse, Bezahl-Tools oder Werbebudget am Anfang.",
  },
  {
    frage: "Brauche ich eine Firma oder einen Handelsregistereintrag?",
    antwort:
      "Nein. In der Schweiz darfst du als Privatperson (Einzelunternehmerin) sofort loslegen. Ein Handelsregistereintrag wird erst ab CHF 100'000 Jahresumsatz Pflicht. Deine Einnahmen gibst du einfach in der Steuererklärung an.",
  },
  {
    frage: "Ist Dropshipping legal?",
    antwort:
      "Ja, komplett legal – es ist ganz normaler Handel. Du hast die üblichen Pflichten eines Online-Shops (Impressum, Datenschutzerklärung, ehrliche Preisangaben) und solltest die Lieferzeit transparent angeben. Alles Wichtige steht in unserem Schweiz-Wissen.",
  },
  {
    frage: "Muss ich Produkte lagern oder selbst verpacken?",
    antwort:
      "Nein – das ist ja der Kern von Dropshipping: Der Lieferant versendet direkt an deine Kundschaft. Später kannst du freiwillig deine Bestseller selbst lagern, um schneller zu liefern (Hybrid-Modell) – musst du aber nicht.",
  },
  {
    frage: "Wie lange dauert es bis zum ersten Verkauf?",
    antwort:
      "Ehrliche Antwort: Das kann niemand versprechen. Realistisch sind einige Wochen bis wenige Monate regelmässiges Posten, bis ein Video zündet. Wer dir «reich in 30 Tagen» verspricht, will dir etwas verkaufen. Der Vorteil: Deine Kosten sind so tief, dass du dir diese Lernphase leisten kannst.",
  },
  {
    frage: "Was passiert, wenn eine Kundin das Produkt zurückgeben will?",
    antwort:
      "Du erstattest den Betrag – bei günstigen Produkten oft, ohne die Ware zurückzuverlangen (Rückversand nach China lohnt sich nicht). Diesen Puffer rechnet unser Gewinn-Rechner automatisch mit ein, damit dich Retouren nie überraschen.",
  },
  {
    frage: "Kann ich das neben Job oder Familie machen?",
    antwort:
      "Ja – Dropshipping ist einer der wenigen Business-Starts, die mit 5–10 Stunden pro Woche funktionieren, weil Lager und Versand wegfallen. Der Store-Planer passt deinen Fahrplan an deine verfügbare Zeit an.",
  },
  {
    frage: "Brauche ich Technik- oder Marketing-Kenntnisse?",
    antwort:
      "Nein. Shop-Baukästen wie Shopify funktionieren ohne Programmieren, und fürs Marketing bekommst du hier fertige Video-Drehbücher. Alles, was du wissen musst, steht auf dieser Seite – in einfacher Sprache.",
  },
];

export default function StartPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Kopf */}
      <section className="hero-surface text-white">
        <div className="container-page py-16 md:py-20">
          <p className="kicker !text-emerald-300">Starte hier · Für absolute Anfänger:innen</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            Noch nie einen Shop gehabt? Perfekt – hier startest du bei null.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-dark">
            Keine Fachbegriffe, keine Vorkenntnisse, keine leeren Versprechen. Auf
            dieser Seite verstehst du in 5 Minuten, wie das Geschäft funktioniert –
            und gehst dann Schritt für Schritt deinen Weg.
          </p>
        </div>
      </section>

      {/* Was ist Dropshipping */}
      <section className="container-page py-16">
        <p className="kicker">Die Grundidee</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">
          Was ist Dropshipping? In 3 Bildern erklärt.
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {ERKLAERUNG.map((e) => (
            <div key={e.title} className="card">
              <span className="text-4xl">{e.emoji}</span>
              <h3 className="mt-3 font-display text-lg font-bold">{e.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{e.text}</p>
            </div>
          ))}
        </div>
        <div className="card mt-5 border-t-4 border-t-amber-400">
          <p className="text-sm leading-relaxed">
            <strong>⚖️ Ehrliche Erwartung:</strong> Dropshipping ist ein echtes
            Geschäft, kein Geldautomat. Die meisten verdienen in den ersten Wochen
            wenig bis nichts – dafür sind die Startkosten so tief wie in kaum einem
            anderen Business. Wer dranbleibt, regelmässig postet und ehrlich
            verkauft, hat eine realistische Chance auf ein schönes Nebeneinkommen,
            das wachsen kann.
          </p>
        </div>
      </section>

      {/* Geführter Weg */}
      <section className="bg-card py-16">
        <div className="container-page">
          <p className="kicker">Dein Weg</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold">
            6 Schritte – die Seite führt dich durch jeden davon
          </h2>
          <div className="mt-8 space-y-4">
            {SCHRITTE.map((s, i) => (
              <div key={s.title} className="card flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-navy font-display text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-bold">
                    {s.emoji} {s.title}
                    <span className="ml-2 rounded-full bg-paper px-2 py-0.5 text-xs font-bold text-muted">
                      ~{s.zeit}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
                <Link href={s.href} className="btn-secondary shrink-0">
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-16">
        <p className="kicker">Häufige Fragen</p>
        <h2 className="mt-2 font-display text-3xl font-extrabold">
          Die Fragen, die sich alle Anfänger:innen stellen
        </h2>
        <div className="mx-auto mt-8 max-w-3xl space-y-3">
          {FAQ.map((f) => (
            <details key={f.frage} className="card group !p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-display text-base font-bold [&::-webkit-details-marker]:hidden">
                {f.frage}
                <span className="shrink-0 text-accent-deep transition group-open:rotate-45">＋</span>
              </summary>
              <p className="border-t border-line p-5 pt-4 text-sm leading-relaxed text-muted">
                {f.antwort}
              </p>
            </details>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="hero-surface rounded-3xl p-8 text-center text-white">
            <h3 className="font-display text-2xl font-extrabold">Bereit für Schritt 1?</h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-dark">
              10 Minuten Lexikon, 1 Minute Quiz – und du weisst mehr als die meisten,
              die einfach drauflos starten.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/lexikon" className="btn-primary">📖 Lexikon lesen</Link>
              <Link href="/nischen-quiz" className="btn-dark-outline">🧭 Direkt zum Quiz</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
