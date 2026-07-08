"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { NICHES, getNiche } from "@/data/niches";
import { marginText, productsByNiche } from "@/data/products";
import { getSupplier } from "@/data/suppliers";

type Budget = "mini" | "klein" | "mittel";
type Zeit = "wenig" | "mittel" | "viel";

const BUDGETS: { id: Budget; label: string; hint: string }[] = [
  { id: "mini", label: "Unter CHF 100", hint: "Erst testen, kaum Fixkosten" },
  { id: "klein", label: "CHF 100–500", hint: "Shop + Muster + erste Werbung" },
  { id: "mittel", label: "Über CHF 500", hint: "Ernsthafter Start mit Puffer" },
];

const ZEITEN: { id: Zeit; label: string }[] = [
  { id: "wenig", label: "Unter 5 Std./Woche" },
  { id: "mittel", label: "5–15 Std./Woche" },
  { id: "viel", label: "15+ Std./Woche" },
];

export default function StorePlaner() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("nische");

  const [niche, setNiche] = useState<string>(
    preselected && getNiche(preselected) ? preselected : ""
  );
  const [budget, setBudget] = useState<Budget>("klein");
  const [zeit, setZeit] = useState<Zeit>("mittel");
  const [showPlan, setShowPlan] = useState(Boolean(preselected && getNiche(preselected)));

  // Abgehakte Punkte bleiben im Browser gespeichert – der Plan wird zur To-do-Liste.
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try {
      const raw = localStorage.getItem("swissdrop-planer-checks");
      if (raw) setChecks(JSON.parse(raw));
    } catch {
      // Ungültige gespeicherte Daten ignorieren
    }
  }, []);
  function toggleCheck(key: string) {
    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem("swissdrop-planer-checks", JSON.stringify(next));
      } catch {
        // Speicher voll/blockiert – Häkchen funktionieren trotzdem für die Sitzung
      }
      return next;
    });
  }

  const plan = useMemo(() => {
    const n = getNiche(niche);
    if (!n) return null;
    const products = productsByNiche(n.slug).slice(0, 3);
    const hero = products[0];
    if (!hero) return null;
    const heroSupplier = getSupplier(hero.suppliers[0]);

    const plattform =
      budget === "mini"
        ? {
            name: "Noch kein Shop – erst Publikum aufbauen",
            text: "Mit unter CHF 100 lohnt sich noch kein Shop-Abo. Bestelle 1–2 Muster, baue mit TikTok/Instagram-Videos 2–4 Wochen lang Publikum auf und starte den Shop mit den ersten Reaktionen. So gibst du kein Geld für einen leeren Laden aus.",
          }
        : budget === "klein"
          ? {
              name: "Shopify Basic (Testphase nutzen)",
              text: "Starte mit der günstigen Shopify-Testphase, baue den Shop in Ruhe fertig und aktiviere das Abo erst, wenn die ersten Videos laufen. Budget-Verteilung: ca. CHF 60 Muster & Verpackung, CHF 40 Shop/Domain, Rest als Reserve für erste Werbung.",
            }
          : {
              name: "Shopify Basic + Werbebudget",
              text: "Shopify Basic als Fundament, dazu Muster aller drei Produkte und ab Woche 3 kleine bezahlte Tests (CHF 10–20/Tag auf das organisch beste Video). Wichtig: Werbung erst schalten, wenn ein Video organisch funktioniert hat.",
            };

    const wochenplan = [
      {
        title: "Woche 1 – Fundament",
        items: [
          `Muster bestellen: ${hero.name}${products[1] ? ` und ${products[1].name}` : ""} (${heroSupplier?.name ?? "Lieferant"})`,
          `Shop-Name wählen (Ideen unten) und Instagram + TikTok-Konto sichern`,
          "Qualitäts-Checkliste der Produkte durchgehen, sobald die Muster da sind",
          budget === "mini" ? "Content-Plan statt Shop: 3 Video-Ideen notieren" : "Shop-Testphase starten, Startseite + 1. Produktseite bauen",
        ],
      },
      {
        title: "Woche 2 – Vertrauen & Recht",
        items: [
          "Impressum, Datenschutzerklärung und AGB einfügen (siehe Schweiz-Wissen)",
          "Lieferzeiten ehrlich auf jeder Produktseite angeben",
          budget === "mini" ? "Erste 3 Videos mit dem Muster drehen und posten" : "Zahlungen einrichten: Karten + TWINT + Apple/Google Pay",
          "Produkttexte schreiben: Nutzen zuerst, dann Details",
        ],
      },
      {
        title: "Woche 3 – Sichtbarkeit",
        items: [
          "3–5 Videos posten (TikTok, Reels und Shorts – dasselbe Video dreifach nutzen)",
          `Erster Video-Winkel für deine Nische: ${n.videoAngles[0]}`,
          "Pinterest-Konto anlegen und 2 Pins auf Produktseiten verlinken",
          zeit === "viel" ? "Zusätzlich: 2. Video-Format testen (ehrlicher Test / 3 Gründe)" : "Beste Posting-Zeiten testen (12–13 und 19–22 Uhr)",
        ],
      },
      {
        title: "Woche 4 – Lernen & Nachlegen",
        items: [
          "Zahlen anschauen: Welches Video lief am besten? Davon 3 Varianten drehen",
          "Kommentare beantworten (der Algorithmus und die Kundschaft lieben das)",
          budget === "mittel" ? "Bezahlte Bewerbung des besten Videos testen (klein anfangen)" : "Noch keine bezahlte Werbung – erst organisch lernen",
          "Retouren-/Erstattungs-Regel festlegen und in die AGB schreiben",
        ],
      },
    ];

    return { n, products, hero, heroSupplier, plattform, wochenplan };
  }, [niche, budget, zeit]);

  return (
    <div>
      {/* Eingaben */}
      <div className="card">
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label htmlFor="planer-nische" className="field-label">
              1. Was möchtest du verkaufen?
            </label>
            <select
              id="planer-nische"
              value={niche}
              onChange={(e) => {
                setNiche(e.target.value);
                setShowPlan(false);
              }}
              className="field-input"
            >
              <option value="">Nische wählen …</option>
              {NICHES.map((n) => (
                <option key={n.slug} value={n.slug}>
                  {n.emoji} {n.name}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-muted">
              Unsicher?{" "}
              <Link href="/nischen" className="font-semibold text-accent-deep hover:underline">
                Zum Nischen-Guide
              </Link>
            </p>
          </div>

          <div>
            <span className="field-label">2. Dein Startbudget</span>
            <div className="space-y-2">
              {BUDGETS.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setBudget(b.id);
                    setShowPlan(false);
                  }}
                  className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                    budget === b.id
                      ? "border-accent bg-accent-soft font-bold text-accent-deep"
                      : "border-line bg-card hover:border-accent"
                  }`}
                >
                  {b.label}
                  <span className="block text-xs font-normal text-muted">{b.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="field-label">3. Deine Zeit pro Woche</span>
            <div className="space-y-2">
              {ZEITEN.map((z) => (
                <button
                  key={z.id}
                  type="button"
                  onClick={() => {
                    setZeit(z.id);
                    setShowPlan(false);
                  }}
                  className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm transition ${
                    zeit === z.id
                      ? "border-accent bg-accent-soft font-bold text-accent-deep"
                      : "border-line bg-card hover:border-accent"
                  }`}
                >
                  {z.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={!niche}
          onClick={() => setShowPlan(true)}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          🚀 Meinen Store-Plan erstellen
        </button>
      </div>

      {/* Plan */}
      {showPlan && plan && (
        <div className="mt-8 space-y-6">
          <div className="card bg-navy text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Dein persönlicher Fahrplan
            </p>
            <h2 className="mt-2 font-display text-2xl font-extrabold">
              {plan.n.emoji} Dein Store in der Nische {plan.n.name}
            </h2>
            <p className="mt-3 leading-relaxed text-muted-dark">{plan.n.whySwitzerland}</p>
            <p className="mt-3 rounded-xl bg-white/5 p-4 text-sm leading-relaxed text-muted-dark">
              <strong className="text-white">⚠️ Ehrlich gesagt:</strong> {plan.n.risks}
            </p>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold">🏷️ Shop-Namen-Ideen</h3>
            <p className="mt-1 text-sm text-muted">
              Prüfe vor der Entscheidung, ob Domain (.ch) und Instagram-/TikTok-Name frei sind.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {plan.n.storeNameIdeas.map((name) => (
                <span key={name} className="chip !text-sm">{name}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold">📦 Dein Start-Sortiment</h3>
            <p className="mt-1 text-sm text-muted">
              Starte fokussiert mit 1 Held-Produkt und 2 Ergänzungen – nicht mit 30 Artikeln.
            </p>
            <div className="mt-4 space-y-3">
              {plan.products.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/produkte/${p.slug}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line p-4 transition hover:border-accent"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <span>
                      <span className="block font-bold">
                        {i === 0 && <span className="mr-2 rounded bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent-deep">HELD-PRODUKT</span>}
                        {p.name}
                      </span>
                      <span className="text-sm text-muted">
                        Verkauf CHF {p.sellPriceChf[0]}–{p.sellPriceChf[1]} · {marginText(p)}
                      </span>
                    </span>
                  </span>
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display text-sm font-extrabold text-white">
                    {p.score}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h3 className="font-display text-xl font-bold">🛒 Empfohlene Plattform</h3>
              <p className="mt-2 font-bold text-accent-deep">{plan.plattform.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{plan.plattform.text}</p>
              <Link href="/wissen/shop-plattform-waehlen" className="mt-3 inline-block text-sm font-bold text-accent-deep hover:underline">
                Plattform-Vergleich lesen →
              </Link>
            </div>
            <div className="card">
              <h3 className="font-display text-xl font-bold">🚚 Empfohlene Bezugsquelle</h3>
              <p className="mt-2 font-bold text-accent-deep">{plan.heroSupplier?.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {plan.heroSupplier?.bestFor} Lieferung in die Schweiz: {plan.heroSupplier?.deliveryToCh}.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Wichtig: Bestelle zuerst Muster an dich selbst und arbeite die
                Qualitäts-Checkliste jedes Produkts durch.
              </p>
            </div>
          </div>

          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-display text-xl font-bold">🗓️ Dein 4-Wochen-Fahrplan</h3>
              <span className="text-xs font-semibold text-muted">
                Zum Abhaken – dein Fortschritt bleibt gespeichert
              </span>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {plan.wochenplan.map((w) => {
                const doneCount = w.items.filter((item) => checks[`${plan.n.slug}:${item}`]).length;
                return (
                  <div key={w.title} className="rounded-xl bg-paper p-4">
                    <h4 className="flex items-center justify-between font-bold">
                      {w.title}
                      <span className={`text-xs font-bold ${doneCount === w.items.length ? "text-accent-deep" : "text-muted"}`}>
                        {doneCount}/{w.items.length}
                      </span>
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm leading-relaxed">
                      {w.items.map((item) => {
                        const key = `${plan.n.slug}:${item}`;
                        const isDone = Boolean(checks[key]);
                        return (
                          <li key={item}>
                            <button
                              type="button"
                              onClick={() => toggleCheck(key)}
                              className="flex w-full gap-2 rounded-lg p-1.5 text-left transition hover:bg-card"
                            >
                              <span
                                className={`grid h-5 w-5 shrink-0 place-items-center rounded border text-[11px] font-bold ${
                                  isDone ? "border-accent bg-accent text-white" : "border-line bg-card text-transparent"
                                }`}
                              >
                                ✓
                              </span>
                              <span className={isDone ? "text-muted line-through" : "text-muted"}>{item}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h3 className="font-display text-xl font-bold">🇨🇭 Schweiz-Checkliste</h3>
            <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
              {[
                ["Impressum, Datenschutz & AGB", "/wissen/recht-schweiz-onlineshop"],
                ["TWINT & Zahlungen einrichten", "/wissen/zahlungsmethoden-schweiz"],
                ["Zoll & MWST verstehen (5-Franken-Regel)", "/wissen/zoll-mwst-dropshipping"],
                ["Lieferzeiten ehrlich kommunizieren", "/wissen/lieferzeiten-ehrlich-loesen"],
                ["Verpackung fürs Hybrid-Modell", "/wissen/verpackungsmaterial-schweiz"],
                ["Steuern & AHV im Blick behalten", "/wissen/steuern-ahv-einfach"],
              ].map(([label, href]) => {
                const key = `ch:${label}`;
                const isDone = Boolean(checks[key]);
                return (
                  <li key={href} className="flex items-center gap-2 rounded-xl border border-line p-3 transition hover:border-accent">
                    <button
                      type="button"
                      aria-label={`${label} abhaken`}
                      onClick={() => toggleCheck(key)}
                      className={`grid h-5 w-5 shrink-0 place-items-center rounded border text-[11px] font-bold ${
                        isDone ? "border-accent bg-accent text-white" : "border-line bg-card text-transparent"
                      }`}
                    >
                      ✓
                    </button>
                    <Link href={href} className={`font-semibold hover:text-accent-deep ${isDone ? "text-muted line-through" : ""}`}>
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card bg-navy text-white">
            <h3 className="font-display text-xl font-bold">🎬 Nächster Schritt: Dein erstes Werbevideo</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-dark">
              Für dein Held-Produkt «{plan.hero.name}» liegt schon eine Video-Idee bereit:
              «{plan.hero.videoIdea}»
            </p>
            <Link href={`/videos?produkt=${plan.hero.slug}`} className="btn-primary mt-4">
              Komplettes Drehbuch generieren
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
