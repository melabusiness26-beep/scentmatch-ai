'use client';

import { useMemo, useState } from 'react';
import { readShopText, suggestMainSize, type ShopReading } from '@/lib/shop-text';

export type ShopPriceResult = {
  sizes: { ml: number; price_chf: number }[];
  mainMl: number;
  shop: string;
  checked: string;
  /** Produktseite im Shop – nur wenn eingefügt. */
  url: string | null;
  /** Nur bei einem neuen Duft gefüllt – beim Bearbeiten bleiben Name & Co. unberührt. */
  identity: { brand: string; name: string; gender: ShopReading['gender']; concentration: string | null } | null;
};

type Props = {
  isNew: boolean;
  onApply: (result: ShopPriceResult) => void;
};

const today = () => new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Zurich' });

const per100 = (ml: number, price: number) => ((price / ml) * 100).toFixed(2);
const money = (n: number) => n.toFixed(2);

// „Preise aus dem Shop übernehmen“: Shop-Seite kopieren, einfügen, kurz prüfen, fertig.
export default function ShopPriceHelper({ isNew, onApply }: Props) {
  const [text, setText] = useState('');
  const [skip, setSkip] = useState<Record<number, boolean>>({});
  const [main, setMain] = useState<number | null>(null);
  const [done, setDone] = useState('');
  const [link, setLink] = useState('');
  const linkOk = /^https:\/\/\S+$/i.test(link.trim());

  const reading = useMemo(() => (text.trim().length > 20 ? readShopText(text) : null), [text]);

  // Neue Seite eingefügt → Auswahl neu vorschlagen (Zweifelsfälle zuerst weglassen).
  const [lastText, setLastText] = useState('');
  if (reading && text !== lastText) {
    setLastText(text);
    setSkip(Object.fromEntries(reading.sizes.filter((s) => s.refill || s.doubt).map((s) => [s.ml, true])));
    setMain(suggestMainSize(reading.sizes));
    setDone('');
  }

  const chosen = reading ? reading.sizes.filter((s) => !skip[s.ml]) : [];
  const mainMl = chosen.some((s) => s.ml === main) ? main : chosen[0]?.ml ?? null;
  const shop = reading?.shop || '';
  const canApply = Boolean(reading && chosen.length && mainMl && shop);

  function apply() {
    if (!reading || !mainMl || !shop) return;
    onApply({
      sizes: chosen.map(({ ml, price_chf }) => ({ ml, price_chf })),
      mainMl,
      shop,
      checked: today(),
      url: linkOk ? link.trim() : null,
      identity:
        isNew && reading.brand && reading.name
          ? { brand: reading.brand, name: reading.name, gender: reading.gender, concentration: reading.concentration }
          : null
    });
    const mainPrice = chosen.find((s) => s.ml === mainMl)!.price_chf;
    setDone(
      `Übernommen: ${chosen.length} ${chosen.length === 1 ? 'Grösse' : 'Grössen'} von ${shop}, Hauptpreis CHF ${money(mainPrice)} für ${mainMl} ml. ` +
        'Jetzt nur noch kurz kontrollieren und speichern.'
    );
  }

  return (
    <details
      className="field"
      open
      style={{ background: '#fff', border: '1px solid rgba(212,175,55,.45)', borderRadius: 14, padding: '14px 18px', margin: '0 0 20px', boxShadow: '0 6px 18px rgba(31,23,18,.05)' }}
    >
      <summary style={{ cursor: 'pointer', fontWeight: 600 }}>🏷️ Preise aus dem Shop übernehmen</summary>

      <ol className="small" style={{ margin: '12px 0', paddingLeft: 20, color: '#6B5344', lineHeight: 1.7 }}>
        <li>Öffne den Duft bei Notino (oder Impo, Marionnaud …).</li>
        <li>Drücke <kbd>Strg</kbd>+<kbd>A</kbd>, dann <kbd>Strg</kbd>+<kbd>C</kbd>.</li>
        <li>Klicke ins Feld unten und drücke <kbd>Strg</kbd>+<kbd>V</kbd> – den Rest erledige ich.</li>
      </ol>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Hier die ganze Shop-Seite einfügen …"
        aria-label="Text der Shop-Seite"
        style={{ width: '100%', minHeight: 90, fontSize: 14, borderRadius: 10 }}
      />

      {reading && (
        <div style={{ marginTop: 14 }}>
          {reading.sizes.length === 0 ? (
            <p className="small" style={{ color: '#8a5a00', margin: 0 }}>
              Hm, in diesem Text finde ich keine Grössen mit Preis. Hast du wirklich die ganze Seite kopiert (Strg+A)? Am besten direkt
              auf der Produktseite, nicht in der Übersicht.
            </p>
          ) : (
            <>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>
                {reading.brand && reading.name ? `${reading.brand} · ${reading.name}` : 'Gefunden'}
                {reading.type && <span style={{ fontWeight: 400, color: '#6B5344' }}> · {reading.type}</span>}
              </p>
              <p className="small" style={{ margin: '0 0 12px', color: '#6B5344' }}>
                {shop ? <>Preise von <strong>{shop}</strong>, Stand heute.</> : 'Den Shop konnte ich nicht erkennen – bitte die ganze Seite kopieren.'}
                {reading.listPrice ? ` Der durchgestrichene Preis (CHF ${money(reading.listPrice)}) ist nur die Herstellerempfehlung – den nehmen wir nicht.` : ''}
              </p>

              <div role="list" style={{ display: 'grid', gap: 8 }}>
                {reading.sizes.map((s) => {
                  const off = Boolean(skip[s.ml]);
                  const isMain = mainMl === s.ml && !off;
                  return (
                    <div
                      role="listitem"
                      key={s.ml}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto 1fr auto',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: `1px solid ${isMain ? '#D4AF37' : 'rgba(31,23,18,.1)'}`,
                        background: off ? '#F7F5F2' : isMain ? '#FFFAF0' : '#fff',
                        opacity: off ? 0.7 : 1
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={!off}
                        onChange={(e) => setSkip((prev) => ({ ...prev, [s.ml]: !e.target.checked }))}
                        aria-label={`${s.ml} ml übernehmen`}
                        style={{ width: 18, height: 18 }}
                      />
                      <div>
                        <strong>{s.ml} ml</strong>
                        <span style={{ marginLeft: 8 }}>CHF {money(s.price_chf)}</span>
                        <span className="small" style={{ marginLeft: 8, color: '#9A8574' }}>CHF {per100(s.ml, s.price_chf)} / 100 ml</span>
                        {s.travel && <span className="small" style={{ marginLeft: 8, color: '#6B5344' }}>· Reisegrösse</span>}
                        {s.doubt && (
                          <div className="small" style={{ color: '#8a5a00', marginTop: 3 }}>
                            ⚠️ {s.doubt} {off ? 'Ist es eine normale Flasche, setz einfach das Häkchen.' : ''}
                          </div>
                        )}
                      </div>
                      <label className="small" style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: off ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
                        <input type="radio" name="shop-main-size" checked={isMain} disabled={off} onChange={() => setMain(s.ml)} />
                        Hauptpreis
                      </label>
                    </div>
                  );
                })}
              </div>

              <label className="small" style={{ display: 'block', margin: '12px 0 0', color: '#6B5344' }}>
                Link zur Seite (aus der Adresszeile kopieren) – dann führt der Kauf-Knopf direkt zum Duft:
                <input
                  type="url"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://www.notino.ch/…"
                  style={{ width: '100%', marginTop: 6, borderColor: link && !linkOk ? '#b3261e' : undefined }}
                />
                {link && !linkOk && <span style={{ color: '#b3261e' }}>Der Link muss mit https:// beginnen.</span>}
              </label>

              {isNew && reading.brand && reading.name && (
                <p className="small" style={{ margin: '10px 0 0', color: '#6B5344' }}>
                  Weil es ein neuer Duft ist, trage ich auch Marke, Name
                  {reading.gender ? ', Geschlecht' : ''}
                  {reading.concentration ? ' und Konzentration' : ''} ein. Bitte kurz prüfen – Notino schreibt Namen manchmal ganz in Grossbuchstaben.
                </p>
              )}

              <div className="cta" style={{ marginTop: 12 }}>
                <button className="button" type="button" onClick={apply} disabled={!canApply}>
                  ✓ {chosen.length ? `${chosen.length} ${chosen.length === 1 ? 'Grösse' : 'Grössen'} übernehmen` : 'Übernehmen'}
                </button>
                <button className="button secondary" type="button" onClick={() => { setText(''); setDone(''); setLink(''); }}>
                  Leeren
                </button>
              </div>
            </>
          )}
          {done && (
            <p className="small" role="status" style={{ color: '#1b7a3d', margin: '10px 0 0' }}>
              ✅ {done}
            </p>
          )}
        </div>
      )}
    </details>
  );
}
