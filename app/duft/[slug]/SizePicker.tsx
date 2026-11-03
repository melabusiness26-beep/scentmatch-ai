'use client';

import { useId, useState } from 'react';
import { formatChf } from '@/lib/price';

type Size = { ml: number; price_chf: number };

type Props = {
  sizes: Size[];
  /** Grösse, die zuerst gezeigt wird (meist die Hauptgrösse des Duftes). */
  initialMl: number | null;
  shop: string | null;
  /** Bereits formatiert, z. B. „3. November 2026“. */
  checked: string | null;
  /** Produktseite im Shop – dann gibt es den Knopf „50 ml bei Notino ansehen“. */
  url?: string | null;
};

const per100 = (s: Size) => Math.round((s.price_chf / s.ml) * 10000) / 100;

// Preis mit Grössen-Auswahl im Kaufbereich der Duft-Seite: Grösse antippen,
// Preis und Preis pro 100 ml passen sich an. Die Grösse mit dem besten Preis pro
// 100 ml ist dezent markiert.
export function SizePicker({ sizes, initialMl, shop, checked, url }: Props) {
  const groupId = useId();
  const start = sizes.find((s) => s.ml === initialMl) || sizes[0];
  const [ml, setMl] = useState(start.ml);
  const current = sizes.find((s) => s.ml === ml) || start;
  // Haben einige Preise Rappen, zeigen alle zwei Stellen („CHF 104.00" neben „CHF 75.90").
  const cents = sizes.some((s) => Math.round(s.price_chf * 100) % 100 !== 0);
  const money = (n: number) => (cents ? n.toFixed(2) : formatChf(n));
  const best = sizes.length >= 2 ? sizes.reduce((a, b) => (per100(b) < per100(a) ? b : a)) : null;
  // „Erst testen?": gibt es eine kleine Reisegrösse, wird sie angeboten (nicht, wenn sie schon gewählt ist).
  const travel = sizes.find((s) => s.ml <= 15 && s.ml !== current.ml && sizes.length > 1);

  return (
    <>
      <div className="dp-price">
        <span className="dp-price-label">{shop ? `Preis bei ${shop}` : 'Richtpreis'}</span>
        <span className="dp-price-value" aria-live="polite">
          {shop ? '' : 'ca. '}CHF {money(current.price_chf)}
        </span>
        <span className="dp-price-note">
          {current.ml} ml{current.ml !== 100 ? ` · CHF ${per100(current).toFixed(2)} pro 100 ml` : ''}
        </span>
      </div>

      {sizes.length > 1 && (
        <div className="dp-sizepick">
          <div className="dp-sizepick-chips" role="radiogroup" aria-label="Grösse wählen">
            {sizes.map((s) => {
              const id = `${groupId}-${s.ml}`;
              const isBest = best?.ml === s.ml;
              return (
                <label key={s.ml} htmlFor={id} className={`dp-sizepick-chip${s.ml === ml ? ' is-active' : ''}`}>
                  <input
                    id={id}
                    type="radio"
                    name={groupId}
                    value={s.ml}
                    checked={s.ml === ml}
                    onChange={() => setMl(s.ml)}
                    className="sr-only"
                  />
                  {isBest && <span className="dp-sizepick-best" title="Tiefster Preis pro 100 ml">Bester ml-Preis</span>}
                  <span className="dp-sizepick-ml">{s.ml} ml</span>
                  <span className="dp-sizepick-price">CHF {money(s.price_chf)}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {travel && (
        <button type="button" className="dp-sizepick-try" onClick={() => setMl(travel.ml)}>
          <span aria-hidden="true">✦</span> Erst testen? Die Reisegrösse mit {travel.ml} ml gibt es für CHF {money(travel.price_chf)}.
        </button>
      )}

      {url && shop && (
        <a className="button dp-shop-button" href={url} target="_blank" rel="nofollow noopener noreferrer">
          {sizes.length > 1 ? `${current.ml} ml bei ${shop} ansehen` : `Bei ${shop} ansehen`} <span aria-hidden="true">→</span>
        </a>
      )}

      <p className="dp-sizepick-foot">
        {checked ? `Stand ${checked}. ` : ''}
        {shop ? 'Im Shop kann der Preis inzwischen anders sein.' : 'Kann je nach Shop und Grösse abweichen.'}
      </p>
    </>
  );
}
