"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

function toNumber(value: string, fallback: number): number {
  const n = parseFloat(value.replace(",", "."));
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

function chf(n: number): string {
  return `CHF ${n.toLocaleString("de-CH", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export default function ProfitCalculator() {
  const searchParams = useSearchParams();
  const [einkauf, setEinkauf] = useState(searchParams.get("einkauf") ?? "6");
  const [verkauf, setVerkauf] = useState(searchParams.get("verkauf") ?? "29");
  const [versand, setVersand] = useState("0");
  const [werbung, setWerbung] = useState("5");
  const [gebuehrProzent, setGebuehrProzent] = useState("2.9");
  const [gebuehrFix, setGebuehrFix] = useState("0.30");
  const [retouren, setRetouren] = useState("3");
  const [verkaeufeProMonat, setVerkaeufeProMonat] = useState(30);

  const result = useMemo(() => {
    const ek = toNumber(einkauf, 0);
    const vk = toNumber(verkauf, 0);
    const vs = toNumber(versand, 0);
    const wb = toNumber(werbung, 0);
    const gp = toNumber(gebuehrProzent, 0);
    const gf = toNumber(gebuehrFix, 0);
    const rq = toNumber(retouren, 0);

    const zahlungsgebuehr = (vk * gp) / 100 + gf;
    const gewinnOhnePuffer = vk - ek - vs - wb - zahlungsgebuehr;
    const retourenPuffer = (vk * rq) / 100;
    const gewinn = gewinnOhnePuffer - retourenPuffer;
    const marge = vk > 0 ? (gewinn / vk) * 100 : 0;

    return { vk, zahlungsgebuehr, retourenPuffer, gewinn, marge };
  }, [einkauf, verkauf, versand, werbung, gebuehrProzent, gebuehrFix, retouren]);

  const verdict =
    result.marge >= 30
      ? { text: "Starke Marge – dieses Produkt verträgt auch bezahlte Werbung.", cls: "bg-accent-soft text-accent-deep" }
      : result.marge >= 15
        ? { text: "Solide Marge – gut für organisches Marketing (TikTok/Reels ohne Werbebudget).", cls: "bg-amber-soft text-amber-700" }
        : { text: "Achtung: Marge zu knapp. Verkaufspreis erhöhen, günstiger einkaufen oder anderes Produkt wählen.", cls: "bg-swiss-soft text-swiss" };

  const fields: [string, string, (v: string) => void, string][] = [
    ["Einkaufspreis (inkl. Versand zu dir/Kunde)", einkauf, setEinkauf, "CHF"],
    ["Verkaufspreis", verkauf, setVerkauf, "CHF"],
    ["Verpackung & Versand (falls du selbst verschickst)", versand, setVersand, "CHF"],
    ["Werbekosten pro Verkauf (0 = nur organisch)", werbung, setWerbung, "CHF"],
    ["Zahlungsgebühr", gebuehrProzent, setGebuehrProzent, "%"],
    ["Zahlungsgebühr fix", gebuehrFix, setGebuehrFix, "CHF"],
    ["Retouren-/Erstattungsquote", retouren, setRetouren, "%"],
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* Eingaben */}
      <div className="card">
        <h2 className="font-display text-lg font-bold">Deine Zahlen</h2>
        <div className="mt-4 space-y-3">
          {fields.map(([label, value, setter, unit]) => (
            <label key={label} className="block">
              <span className="text-sm font-semibold">{label}</span>
              <span className="mt-1 flex items-center gap-2">
                <input
                  type="text"
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="field-input !py-2.5"
                />
                <span className="w-10 shrink-0 text-sm font-bold text-muted">{unit}</span>
              </span>
            </label>
          ))}
        </div>
        <p className="mt-4 rounded-xl bg-paper p-3 text-xs leading-relaxed text-muted">
          Voreinstellungen: übliche Kartengebühr (2.9 % + 0.30) und 3 % Erstattungs-Puffer.
          Der Puffer rechnet ein, dass du bei einzelnen Bestellungen kulant erstattest.
        </p>
      </div>

      {/* Ergebnis */}
      <div className="space-y-4">
        <div className="card hero-surface text-white">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">
            Dein Ergebnis pro Verkauf
          </p>
          <div className="mt-3 flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className={`font-display text-5xl font-extrabold ${result.gewinn >= 0 ? "text-emerald-300" : "text-red-400"}`}>
              {chf(result.gewinn)}
            </span>
            <span className="text-lg font-bold text-muted-dark">
              = {result.marge.toFixed(0)} % Marge
            </span>
          </div>
          <dl className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-dark">
            <div className="rounded-lg bg-white/5 p-3">
              <dt>Zahlungsgebühr</dt>
              <dd className="font-bold text-white">{chf(result.zahlungsgebuehr)}</dd>
            </div>
            <div className="rounded-lg bg-white/5 p-3">
              <dt>Erstattungs-Puffer</dt>
              <dd className="font-bold text-white">{chf(result.retourenPuffer)}</dd>
            </div>
          </dl>
        </div>

        <div className={`rounded-2xl p-4 text-sm font-semibold leading-relaxed ${verdict.cls}`}>
          {verdict.text}
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Monats-Hochrechnung</h3>
            <span className="text-sm font-bold text-accent-deep">
              {verkaeufeProMonat} Verkäufe/Monat
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={300}
            step={5}
            value={verkaeufeProMonat}
            onChange={(e) => setVerkaeufeProMonat(Number(e.target.value))}
            className="mt-3 w-full accent-[#0e9f6e]"
            aria-label="Verkäufe pro Monat"
          />
          <p className="mt-3 text-sm text-muted">
            Bei {verkaeufeProMonat} Verkäufen im Monat bleiben dir ungefähr{" "}
            <strong className={result.gewinn >= 0 ? "text-accent-deep" : "text-swiss"}>
              {chf(result.gewinn * verkaeufeProMonat)}
            </strong>{" "}
            Gewinn (vor Fixkosten wie Shop-Abo und vor Steuern).
          </p>
        </div>
      </div>
    </div>
  );
}
