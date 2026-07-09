"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { PRODUCTS, getProduct } from "@/data/products";
import { getNiche } from "@/data/niches";
import { AI_VIDEO_SERVICES, FREE_ROUTE_STEPS, SCRIPT_STYLES } from "@/data/videos";
import { buildAiPrompt } from "@/lib/aiPrompt";

type Scene = {
  time: string;
  camera: string;
  overlay: string;
};

type Script = {
  title: string;
  hooks: string[];
  scenes: Scene[];
  cta: string;
  sound: string;
  hashtags: string[];
  proTips: string[];
};

const NICHE_HASHTAGS: Record<string, string[]> = {
  haustiere: ["#hundeliebe", "#katzenliebe", "#haustiere", "#dogsofswitzerland"],
  "home-living": ["#roomtour", "#homedecor", "#cozyhome", "#einrichtungsideen"],
  "beauty-selfcare": ["#selfcare", "#beautyhacks", "#hairtok", "#skincareroutine"],
  "fitness-sport": ["#homeworkout", "#fitnessmotivation", "#gymtok", "#recovery"],
  "kueche-haushalt": ["#kitchenhacks", "#küchenhelfer", "#foodprep", "#kitchentok"],
  "baby-kids": ["#babyshower", "#neugeborenes", "#mamaleben", "#geschenkidee"],
  "tech-gadgets": ["#gadgets", "#techtok", "#desksetup", "#lifehack"],
  "outdoor-reisen": ["#wandern", "#schweiz", "#reisetipps", "#camping"],
  "gaming-zubehoer": ["#desksetup", "#gamingsetup", "#battlestation", "#gamer"],
  "garten-balkon": ["#balkongarten", "#urbangardening", "#pflanzen", "#gartentipps"],
  "wellness-schlaf": ["#schlaf", "#abendroutine", "#selfcare", "#entspannung"],
  "auto-pendeln": ["#carhacks", "#autoliebe", "#cartok", "#organisieren"],
  "buero-homeoffice": ["#homeoffice", "#studytok", "#deskmakeover", "#produktivität"],
  "nachhaltig-leben": ["#nachhaltigkeit", "#zerowaste", "#nachhaltigleben", "#plastikfrei"],
  "schmuck-accessoires": ["#schmuck", "#waterproofjewelry", "#jewelrytok", "#styling"],
  "kaffee-tee": ["#cafeathome", "#kaffeeliebe", "#homecafe", "#teatime"],
  "yoga-achtsamkeit": ["#yoga", "#achtsamkeit", "#yogapractice", "#morgenroutine"],
  "grill-bbq": ["#grillen", "#bbq", "#grillsaison", "#foodtok"],
  "velo-ebike": ["#velo", "#ebike", "#biketok", "#pendeln"],
  "winter-schnee": ["#winter", "#schweiz", "#winterhacks", "#schnee"],
  "geschenke-personalisiert": ["#geschenkidee", "#personalisiert", "#geschenk", "#überraschung"],
  "kreativ-diy": ["#malennachzahlen", "#diamondpainting", "#diy", "#kreativ"],
};

function buildScript(
  styleId: string,
  productName: string,
  benefit: string,
  videoIdea: string,
  nicheSlug: string | null,
  price: string | null
): Script {
  const tags = [
    ...(nicheSlug ? NICHE_HASHTAGS[nicheSlug] ?? [] : []),
    "#tiktokmademebuyit",
  ].slice(0, 5);

  const base: Pick<Script, "sound" | "proTips"> = {
    sound:
      "Aktuellen Trend-Sound der Plattform wählen (im TikTok-Sound-Menü nach «beliebt in der Schweiz» filtern) und leise unter das Video legen.",
    proTips: [
      "Mit dem Handy bei Tageslicht filmen – authentisch schlägt Hochglanz.",
      "Untertitel automatisch mit CapCut erzeugen (die Mehrheit schaut ohne Ton).",
      "Erst die letzte Szene filmen, wenn du warm bist – die Hook-Szene muss sitzen.",
      "Dasselbe Video auf TikTok, Reels und Shorts posten – dreifache Reichweite.",
      videoIdea
        ? `Konkrete Bild-Idee für dieses Produkt: ${videoIdea}`
        : "Zeige das Produkt in einer echten Alltagssituation, nicht vor weisser Wand.",
    ],
  };

  switch (styleId) {
    case "drei-gruende":
      return {
        title: `3 Gründe, warum ${productName} sich lohnt`,
        hooks: [
          `3 Gründe, warum ${productName} gerade überall ausverkauft ist:`,
          `Ich war skeptisch bei ${productName} – bis Grund 3.`,
          `Niemand erzählt dir das über ${productName}:`,
        ],
        scenes: [
          { time: "0–2 Sek.", camera: "Nahaufnahme: Produkt in der Hand, direkt in die Kamera sprechen oder Text zeigen.", overlay: "3 Gründe, warum du das brauchst 👇" },
          { time: "2–8 Sek.", camera: "Grund 1 zeigen (wichtigster Nutzen in Aktion – nicht erzählen, ZEIGEN).", overlay: `1️⃣ ${benefit}` },
          { time: "8–15 Sek.", camera: "Grund 2: Detail-Aufnahme (Material, Bedienung, Grösse).", overlay: "2️⃣ In 10 Sekunden einsatzbereit" },
          { time: "15–22 Sek.", camera: "Grund 3: Reaktion/Ergebnis (zufriedenes Gesicht, Vorher/Nachher, Haustier-Reaktion).", overlay: price ? `3️⃣ Kostet weniger als ${price}` : "3️⃣ Günstiger als du denkst" },
          { time: "22–27 Sek.", camera: "Produkt nochmal im Bild, ruhige Einstellung.", overlay: "Link in der Bio 🔗" },
        ],
        cta: "«Alle Infos & Bestellung über den Link in der Bio.» – als Text-Overlay UND gesprochen/als Caption.",
        hashtags: tags,
        ...base,
      };
    case "ehrlicher-test":
      return {
        title: `Ehrlicher Test: Hält ${productName}, was es verspricht?`,
        hooks: [
          `Ich habe ${productName} 7 Tage getestet – ehrliches Fazit:`,
          `Alle reden über ${productName}. Ist es den Hype wert?`,
          `${productName} im Härtetest – das hätte ich nicht erwartet.`,
        ],
        scenes: [
          { time: "0–2 Sek.", camera: "Paket/Produkt in die Kamera halten, skeptischer Blick.", overlay: "7 Tage getestet. Ehrliches Fazit 👇" },
          { time: "2–7 Sek.", camera: "Unboxing im Zeitraffer, erster Eindruck zeigen.", overlay: "Tag 1: Erster Eindruck" },
          { time: "7–14 Sek.", camera: "Produkt im echten Einsatz (der Alltagstest).", overlay: `Tag 3: ${benefit}?` },
          { time: "14–20 Sek.", camera: "EINEN ehrlichen Schwachpunkt zeigen (z. B. «Lieferung dauerte 10 Tage»).", overlay: "Was mich gestört hat 👀" },
          { time: "20–28 Sek.", camera: "Fazit in die Kamera: Für wen lohnt es sich?", overlay: "Mein Fazit: 8/10 ⭐" },
        ],
        cta: "«Wenn du es testen willst – Link in der Bio.» Der ehrliche Schwachpunkt macht dein Fazit glaubwürdig und verkauft MEHR.",
        hashtags: tags,
        ...base,
      };
    case "pov-story":
      return {
        title: `POV-Story mit ${productName}`,
        hooks: [
          `POV: Du hast endlich ${productName} entdeckt.`,
          `Ich wieder, mit dem Ding, das mein Leben leichter macht:`,
          `Storytime: Warum ${productName} jetzt zu meinem Alltag gehört.`,
        ],
        scenes: [
          { time: "0–2 Sek.", camera: "Alltagsszene MIT Emotion (genervt, gestresst, amüsiert) – ohne Produkt.", overlay: "POV: Jeden Tag dasselbe Problem 🙄" },
          { time: "2–8 Sek.", camera: "Das Problem konkret zeigen (das Publikum muss sich wiedererkennen).", overlay: "Kennst du das auch?" },
          { time: "8–15 Sek.", camera: "Produkt kommt ins Bild – der Moment der Entdeckung, gern mit Musik-Wechsel.", overlay: `Und dann kam ${productName} ✨` },
          { time: "15–24 Sek.", camera: "Neue Alltagsszene: gleiche Situation, jetzt entspannt gelöst.", overlay: benefit },
          { time: "24–30 Sek.", camera: "Zufriedener Schlussmoment, Produkt sichtbar platziert.", overlay: "Warum wusste ich das nicht früher? · Link in Bio" },
        ],
        cta: "«Link in der Bio» dezent am Ende – bei Story-Videos verkauft die Emotion, nicht der Druck.",
        hashtags: tags,
        ...base,
      };
    default: // problem-loesung
      return {
        title: `Problem → Lösung mit ${productName}`,
        hooks: [
          "Hör auf, dich damit rumzuärgern – es geht so viel einfacher.",
          "Warum kennt das kaum jemand in der Schweiz?",
          `Das nervt dich täglich? ${productName} löst es in Sekunden.`,
        ],
        scenes: [
          { time: "0–2 Sek.", camera: "Das PROBLEM gross im Bild (Chaos, Frust, Umstand) – Bewegung in der ersten Sekunde!", overlay: "Das nervt. Jeden. Tag. 😤" },
          { time: "2–6 Sek.", camera: "Problem kurz zuspitzen (Nahaufnahme, genervtes Gesicht).", overlay: "Es gibt eine bessere Lösung 👇" },
          { time: "6–12 Sek.", camera: `${productName} kommt ins Bild – erster Einsatz sofort zeigen.`, overlay: `Die Lösung: ${productName}` },
          { time: "12–20 Sek.", camera: "Der Wow-Moment: Produkt löst das Problem sichtbar (der wichtigste Shot – 2–3× drehen!).", overlay: benefit },
          { time: "20–26 Sek.", camera: "Ergebnis geniessen, Produkt nochmal klar im Bild.", overlay: price ? `Ab ${price} · Link in Bio 🔗` : "Link in Bio 🔗" },
        ],
        cta: "«Hol es dir über den Link in der Bio, bevor es wieder ausverkauft ist.» (Nur schreiben, wenn der Vorrat wirklich begrenzt ist – ehrlich bleiben!)",
        hashtags: tags,
        ...base,
      };
  }
}

export default function VideoScriptGenerator() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("produkt");

  const [productSlug, setProductSlug] = useState<string>(
    preselected && getProduct(preselected) ? preselected : ""
  );
  const [customName, setCustomName] = useState("");
  const [customBenefit, setCustomBenefit] = useState("");
  const [style, setStyle] = useState<string>("problem-loesung");
  const [generated, setGenerated] = useState(Boolean(preselected && getProduct(preselected)));
  const [copied, setCopied] = useState(false);

  const script = useMemo(() => {
    if (productSlug) {
      const p = getProduct(productSlug);
      if (!p) return null;
      return buildScript(
        style,
        p.name,
        p.short.replace(/\.$/, ""),
        p.videoIdea,
        p.niche,
        `CHF ${p.sellPriceChf[0]}`
      );
    }
    if (customName.trim()) {
      return buildScript(
        style,
        customName.trim(),
        customBenefit.trim() || "Macht deinen Alltag sofort leichter",
        "",
        null,
        null
      );
    }
    return null;
  }, [productSlug, customName, customBenefit, style]);

  const aiPrompt = useMemo(() => {
    if (productSlug) {
      const p = getProduct(productSlug);
      if (!p) return null;
      return buildAiPrompt(style, p.name, p.short.replace(/\.$/, ""));
    }
    if (customName.trim()) {
      return buildAiPrompt(
        style,
        customName.trim(),
        customBenefit.trim() || "it makes everyday life noticeably easier"
      );
    }
    return null;
  }, [productSlug, customName, customBenefit, style]);

  async function copyPrompt() {
    if (!aiPrompt) return;
    try {
      await navigator.clipboard.writeText(aiPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback: Text markieren lassen – das Feld ist sichtbar und auswählbar.
    }
  }

  const selectedProduct = productSlug ? getProduct(productSlug) : undefined;
  const nicheName = selectedProduct ? getNiche(selectedProduct.niche)?.name : null;

  return (
    <div>
      <div className="card">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="video-produkt" className="field-label">
              1. Produkt aus dem Katalog wählen …
            </label>
            <select
              id="video-produkt"
              value={productSlug}
              onChange={(e) => {
                setProductSlug(e.target.value);
                setGenerated(false);
              }}
              className="field-input"
            >
              <option value="">Kein Katalog-Produkt (eigenes unten eintragen)</option>
              {PRODUCTS.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.emoji} {p.name}
                </option>
              ))}
            </select>
            {nicheName && (
              <p className="mt-2 text-xs text-muted">Nische: {nicheName} – Hashtags werden automatisch angepasst.</p>
            )}
          </div>

          <div className={productSlug ? "opacity-40" : ""}>
            <label htmlFor="video-custom" className="field-label">
              … oder eigenes Produkt eintragen
            </label>
            <input
              id="video-custom"
              type="text"
              disabled={Boolean(productSlug)}
              value={customName}
              onChange={(e) => {
                setCustomName(e.target.value);
                setGenerated(false);
              }}
              placeholder="z. B. Faltbarer Picknickkorb"
              className="field-input"
            />
            <input
              type="text"
              disabled={Boolean(productSlug)}
              value={customBenefit}
              onChange={(e) => {
                setCustomBenefit(e.target.value);
                setGenerated(false);
              }}
              placeholder="Grösster Vorteil (z. B. «In 3 Sekunden aufgebaut»)"
              className="field-input mt-2"
            />
          </div>
        </div>

        <div className="mt-5">
          <span className="field-label">2. Video-Stil wählen</span>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {SCRIPT_STYLES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStyle(s.id);
                  setGenerated(false);
                }}
                className={`rounded-xl border p-3 text-left text-sm transition ${
                  style === s.id
                    ? "border-accent bg-accent-soft"
                    : "border-line bg-card hover:border-accent"
                }`}
              >
                <span className="block font-bold">
                  {s.emoji} {s.name}
                </span>
                <span className="mt-1 block text-xs leading-snug text-muted">{s.when}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          disabled={!productSlug && !customName.trim()}
          onClick={() => setGenerated(true)}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          🎬 Drehbuch generieren
        </button>
      </div>

      {generated && script && (
        <div className="mt-8 space-y-6">
          <div className="card bg-navy text-white">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
              Dein Drehbuch
            </p>
            <h3 className="mt-2 font-display text-2xl font-extrabold">{script.title}</h3>
            <p className="mt-2 text-sm text-muted-dark">
              Format: 9:16 Hochformat · Länge ca. 25–30 Sekunden · mit dem Handy filmen
            </p>
          </div>

          <div className="card">
            <h4 className="font-display text-lg font-bold">🪝 Hook: Wähle eine der 3 Varianten</h4>
            <p className="mt-1 text-sm text-muted">
              Die ersten 1–2 Sekunden entscheiden, ob jemand dranbleibt. Teste über
              mehrere Videos, welche Hook-Variante am besten funktioniert.
            </p>
            <ul className="mt-3 space-y-2">
              {script.hooks.map((h, i) => (
                <li key={h} className="rounded-xl bg-paper p-3 text-sm font-semibold">
                  Variante {i + 1}: «{h}»
                </li>
              ))}
            </ul>
          </div>

          <div className="card overflow-x-auto">
            <h4 className="font-display text-lg font-bold">🎞️ Szenen-Plan</h4>
            <table className="mt-3 w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs font-bold uppercase tracking-wider text-muted">
                  <th className="py-2 pr-4">Zeit</th>
                  <th className="py-2 pr-4">Was du filmst</th>
                  <th className="py-2">Text im Video</th>
                </tr>
              </thead>
              <tbody>
                {script.scenes.map((s) => (
                  <tr key={s.time} className="border-b border-line align-top last:border-0">
                    <td className="py-3 pr-4 font-bold whitespace-nowrap">{s.time}</td>
                    <td className="py-3 pr-4 leading-relaxed text-muted">{s.camera}</td>
                    <td className="py-3 font-semibold">{s.overlay}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card">
              <h4 className="font-display text-lg font-bold">📣 Abschluss (Call-to-Action)</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{script.cta}</p>
              <h4 className="mt-4 font-display text-lg font-bold">🎵 Sound</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{script.sound}</p>
              <h4 className="mt-4 font-display text-lg font-bold">#️⃣ Hashtags (max. 5)</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {script.hashtags.map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
            <div className="card">
              <h4 className="font-display text-lg font-bold">💎 Profi-Tipps für dieses Video</h4>
              <ul className="mt-2 space-y-2 text-sm leading-relaxed text-muted">
                {script.proTips.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="text-accent-deep">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {aiPrompt && (
            <div className="card border-t-4 border-t-accent">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h4 className="font-display text-lg font-bold">
                  🤖 Fertiger KI-Video-Prompt (zum Kopieren)
                </h4>
                <button type="button" onClick={copyPrompt} className="btn-primary !py-2">
                  {copied ? "✓ Kopiert!" : "📋 Prompt kopieren"}
                </button>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Willst du das Video per KI erstellen lassen? Kopiere diesen Prompt und
                füge ihn in ein KI-Video-Tool ein (viele haben Gratis-Kontingente).
                Der Prompt ist auf Englisch, weil die Video-KIs damit die besten
                Ergebnisse liefern.
              </p>
              <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-paper p-4 text-xs leading-relaxed text-ink">
                {aiPrompt}
              </pre>
              <div className="mt-4 rounded-xl bg-accent-soft p-4">
                <h5 className="font-display text-sm font-extrabold text-accent-deep">
                  💚 Die 0-Franken-Route (komplett gratis)
                </h5>
                <ol className="mt-2 space-y-1.5 text-sm leading-relaxed">
                  {FREE_ROUTE_STEPS.map((step, i) => (
                    <li key={step} className="flex gap-2">
                      <span className="font-bold text-accent-deep">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {AI_VIDEO_SERVICES.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-line p-3 transition hover:border-accent"
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold">{s.name} ↗</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                          s.free.startsWith("GRATIS")
                            ? "bg-accent-soft text-accent-deep"
                            : "bg-paper text-muted"
                        }`}
                      >
                        {s.free.startsWith("GRATIS") ? "GRATIS-Credits" : "Testen möglich"}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-snug text-muted">
                      {s.free} · {s.note}
                    </span>
                  </a>
                ))}
              </div>
              <p className="mt-3 rounded-xl bg-amber-soft p-3 text-sm leading-relaxed">
                <strong>Ehrlicher Profi-Tipp:</strong> Am glaubwürdigsten wirkt die
                Mischung – KI-Szenen für Stimmung und Umgebung, echte Handy-Aufnahmen
                vom Muster für die Nahaufnahmen. Prüfe das KI-Video vor dem Posten
                kritisch: Hände, Logos und Texte sind typische Schwachstellen.
              </p>
              <div className="mt-4 rounded-xl bg-navy p-4 text-white sm:flex sm:items-center sm:justify-between sm:gap-4">
                <p className="text-sm leading-relaxed text-muted-dark">
                  <strong className="text-white">Ohne Kopieren:</strong> Im KI-Studio
                  erstellst du die Video-Szenen direkt hier auf der Seite.
                </p>
                <Link
                  href={
                    productSlug
                      ? `/studio?produkt=${productSlug}&stil=${style}`
                      : "/studio"
                  }
                  className="btn-primary mt-3 shrink-0 sm:mt-0"
                >
                  🎬 Zum KI-Studio
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
