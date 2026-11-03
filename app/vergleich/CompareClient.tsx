'use client';
import type React from 'react';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { concentrationLabel, type Perfume } from '@/lib/perfumes';
import { priceSource, type SizePrice } from '@/lib/perfume-extras';
import { SEASONS, perfumeSeasons } from '@/lib/season-fit';
import { formatChf } from '@/lib/price';
import { familyDisplay } from '@/app/PerfumeTile';
import { PerfumeVisual } from '@/app/components/PerfumeVisual';
import LineIcon from '@/app/LineIcon';

const MAX = 3;
const SEASON_ICONS: Record<string, string> = { Frühling: 'flower', Sommer: 'sun', Herbst: 'leaf', Winter: 'snow' };

const norm = (s: string | null | undefined) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();

function longevityHint(v: number): string {
  if (v >= 8) return 'den ganzen Tag';
  if (v >= 6) return 'mehrere Stunden';
  if (v >= 4) return 'einige Stunden';
  return 'eher kurz';
}

function sillageHint(v: number): string {
  if (v >= 9) return 'füllt den Raum';
  if (v >= 7) return 'deutlich wahrnehmbar';
  if (v >= 5) return 'gut wahrnehmbar';
  if (v >= 3) return 'eher dezent';
  return 'hautnah';
}

function Meter({ value, label }: { value: number | null; label: string }) {
  if (value == null) return <span className="cmp-empty">–</span>;
  const filled = Math.max(0, Math.min(5, Math.round(value / 2)));
  return (
    <span className="cmp-meter-wrap">
      <span className="dp-meter" role="img" aria-label={`${label}: ${value} von 10`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className={i < filled ? 'on' : ''} />
        ))}
      </span>
    </span>
  );
}

function Badge({ children }: { children: string }) {
  return <span className="cmp-badge">{children}</span>;
}

type Props = { perfumes: Perfume[]; sizesById: Record<string, SizePrice[]> };

export default function CompareClient({ perfumes, sizesById }: Props) {
  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const bySlug = useMemo(() => new Map(perfumes.map((p) => [p.slug as string, p])), [perfumes]);

  // Auswahl aus dem Link lesen (/vergleich?d=duft-a,duft-b) …
  useEffect(() => {
    const d = new URLSearchParams(window.location.search).get('d');
    if (!d) return;
    const slugs = d
      .split(',')
      .map((s) => s.trim())
      .filter((s, i, all) => bySlug.has(s) && all.indexOf(s) === i)
      .slice(0, MAX);
    if (slugs.length) setSelected(slugs);
  }, [bySlug]);

  // … und in den Link schreiben, damit man den Vergleich teilen kann.
  useEffect(() => {
    // Kommas bleiben lesbar (…?d=duft-a,duft-b statt %2C).
    window.history.replaceState(null, '', `${window.location.pathname}${selected.length ? `?d=${selected.join(',')}` : ''}`);
  }, [selected]);

  const chosen = selected.map((s) => bySlug.get(s)).filter((p): p is Perfume => Boolean(p));
  const full = selected.length >= MAX;

  function toggle(slug: string) {
    setSelected((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : prev.length >= MAX ? prev : [...prev, slug]));
  }

  const results = useMemo(() => {
    const q = norm(query);
    const list = q
      ? perfumes.filter((p) => norm(`${p.perfume_name} ${p.brands?.name || ''}`).includes(q))
      : perfumes;
    return list.slice(0, q ? 24 : 12);
  }, [query, perfumes]);

  // Kennzahlen je Duft
  const rows = chosen.map((p) => {
    const sizes = sizesById[p.id] || [];
    const source = priceSource(sizes);
    const main = sizes.find((s) => s.ml === p.volume_ml) || null;
    const ml = main?.ml ?? p.volume_ml ?? null;
    const price = main?.price_chf ?? p.price_chf ?? null;
    const per100 = price != null && ml ? Math.round((price / ml) * 10000) / 100 : null;
    const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])];
    return { p, sizes, source, ml, price, per100, notes, seasons: perfumeSeasons(p.season) };
  });

  // Noten, die in mindestens zwei der gewählten Düfte vorkommen
  const noteCount = new Map<string, number>();
  for (const r of rows) for (const n of new Set(r.notes.map(norm))) noteCount.set(n, (noteCount.get(n) || 0) + 1);
  const isShared = (note: string) => rows.length > 1 && (noteCount.get(norm(note)) || 0) > 1;
  const sharedNotes = rows.length > 1 ? [...new Set(rows.flatMap((r) => r.notes).filter(isShared).map((n) => n))] : [];
  const sharedUnique = sharedNotes.filter((n, i, all) => all.findIndex((x) => norm(x) === norm(n)) === i);
  const sameFamily = rows.length > 1 && rows.every((r) => r.p.fragrance_family && r.p.fragrance_family === rows[0].p.fragrance_family);

  // Wer gewinnt wo (nur bei 2+ Düften und echten Unterschieden)
  const best = (pick: (r: (typeof rows)[number]) => number | null, lowWins = false) => {
    if (rows.length < 2) return null;
    const vals = rows.map(pick);
    const known = vals.filter((v): v is number => v != null);
    if (known.length < 2) return null;
    const target = lowWins ? Math.min(...known) : Math.max(...known);
    const winners = vals.filter((v) => v === target).length;
    return winners === 1 ? vals.indexOf(target) : null;
  };
  const cheapest = best((r) => r.per100, true);
  const topScore = best((r) => r.p.scentmatch_score ?? null);
  const longest = best((r) => r.p.longevity ?? null);
  const strongest = best((r) => r.p.sillage ?? null);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Link kopieren:', window.location.href);
    }
  }

  const cols = { ['--cmp-cols' as string]: Math.max(chosen.length, 1) } as React.CSSProperties;

  return (
    <>
      {/* ── Ausgewählte Düfte ───────────────────────────── */}
      <section className="cmp-slots" aria-label="Deine Auswahl">
        {Array.from({ length: MAX }).map((_, i) => {
          const p = chosen[i];
          if (!p) {
            return (
              <button
                key={`empty-${i}`}
                type="button"
                className="cmp-slot is-empty"
                onClick={() => searchRef.current?.focus()}
                disabled={i > chosen.length}
              >
                <span className="cmp-slot-plus" aria-hidden="true">+</span>
                <span>{i === 0 ? 'Ersten Duft wählen' : i === 1 ? 'Zweiten Duft wählen' : 'Dritten Duft (optional)'}</span>
              </button>
            );
          }
          return (
            <div className="cmp-slot" key={p.slug}>
              <button type="button" className="cmp-slot-remove" onClick={() => toggle(p.slug as string)} aria-label={`${p.perfume_name} entfernen`}>
                ×
              </button>
              <Link href={`/duft/${p.slug}`} className="cmp-slot-visual" tabIndex={-1} aria-hidden="true">
                <PerfumeVisual perfume={p} />
              </Link>
              <p className="cmp-slot-brand">{p.brands?.name}</p>
              <Link href={`/duft/${p.slug}`} className="cmp-slot-name">
                {p.perfume_name}
              </Link>
              <p className="cmp-slot-conc">{concentrationLabel(p.concentration)}</p>
            </div>
          );
        })}
      </section>

      {/* ── Vergleich ───────────────────────────────────── */}
      {rows.length >= 2 && (
        <section className="dp-card cmp-card" aria-label="Vergleich">
          <div className="cmp-summary">
            <LineIcon name="sparkle" size={18} />
            <p>
              {sharedUnique.length > 0 ? (
                <>
                  <strong>Gemeinsam:</strong> {sharedUnique.slice(0, 6).join(', ')}
                  {sharedUnique.length > 6 ? ' …' : ''}
                  {sameFamily ? ` · alle ${familyDisplay[rows[0].p.fragrance_family || ''] || ''}` : ''}
                </>
              ) : sameFamily ? (
                <>
                  <strong>Gleiche Duftrichtung</strong> ({familyDisplay[rows[0].p.fragrance_family || '']}), aber keine gemeinsamen
                  Noten.
                </>
              ) : (
                <>
                  <strong>Ganz verschieden:</strong> keine gemeinsamen Noten und unterschiedliche Duftrichtungen.
                </>
              )}
            </p>
          </div>

          <p className="cmp-swipe" aria-hidden="true">← Seitlich wischen, um alle Düfte zu sehen →</p>
          <div className="cmp-scroll">
            <table className="cmp-table" style={cols}>
              <thead>
                <tr>
                  <th scope="col" className="cmp-label-col">
                    <span className="sr-only">Eigenschaft</span>
                  </th>
                  {rows.map((r) => (
                    <th scope="col" key={r.p.slug}>
                      {r.p.perfume_name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Preis</th>
                  {rows.map((r, i) => (
                    <td key={r.p.slug}>
                      {r.price != null ? (
                        <>
                          <span className="cmp-price">CHF {formatChf(r.price)}</span>
                          <span className="cmp-sub">
                            {r.ml ? `${r.ml} ml` : ''}
                            {r.source.shop ? ` · bei ${r.source.shop}` : ''}
                          </span>
                          {r.per100 != null && <span className="cmp-sub">CHF {r.per100.toFixed(2)} / 100 ml</span>}
                          {cheapest === i && <Badge>Günstigster pro ml</Badge>}
                        </>
                      ) : (
                        <span className="cmp-empty">–</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Auressa-Score</th>
                  {rows.map((r, i) => (
                    <td key={r.p.slug}>
                      <span className="cmp-score">{r.p.scentmatch_score ?? '–'}</span>
                      {topScore === i && <Badge>Bester Score</Badge>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Duftrichtung</th>
                  {rows.map((r) => (
                    <td key={r.p.slug}>{familyDisplay[r.p.fragrance_family || ''] || '–'}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Haltbarkeit</th>
                  {rows.map((r, i) => (
                    <td key={r.p.slug}>
                      <Meter value={r.p.longevity ?? null} label="Haltbarkeit" />
                      {r.p.longevity != null && <span className="cmp-sub">{longevityHint(r.p.longevity)}</span>}
                      {longest === i && <Badge>Hält am längsten</Badge>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Ausstrahlung</th>
                  {rows.map((r, i) => (
                    <td key={r.p.slug}>
                      <Meter value={r.p.sillage ?? null} label="Ausstrahlung" />
                      {r.p.sillage != null && <span className="cmp-sub">{sillageHint(r.p.sillage)}</span>}
                      {strongest === i && <Badge>Am stärksten</Badge>}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Jahreszeit</th>
                  {rows.map((r) => (
                    <td key={r.p.slug}>
                      {r.seasons.length ? (
                        <ul className="dp-seasons cmp-seasons" aria-label={r.p.season || ''}>
                          {SEASONS.map((s) => (
                            <li key={s} className={r.seasons.includes(s) ? 'on' : ''} aria-hidden="true">
                              <LineIcon name={SEASON_ICONS[s]} size={18} />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        r.p.season || <span className="cmp-empty">–</span>
                      )}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Anlass</th>
                  {rows.map((r) => (
                    <td key={r.p.slug}>
                      <span className="dp-occasions">
                        {(r.p.occasion || '')
                          .split(',')
                          .map((o) => o.trim())
                          .filter(Boolean)
                          .map((o) => (
                            <span className="dp-occasion" key={o}>
                              {o}
                            </span>
                          ))}
                      </span>
                    </td>
                  ))}
                </tr>
                {(
                  [
                    ['top_notes', 'Kopfnoten'],
                    ['heart_notes', 'Herznoten'],
                    ['base_notes', 'Basisnoten']
                  ] as const
                ).map(([key, label]) => (
                  <tr key={key}>
                    <th scope="row">{label}</th>
                    {rows.map((r) => (
                      <td key={r.p.slug}>
                        <span className="cmp-notes">
                          {(r.p[key] || []).length ? (
                            (r.p[key] || []).map((n) => (
                              <span key={n} className={`cmp-note${isShared(n) ? ' is-shared' : ''}`}>
                                {n}
                              </span>
                            ))
                          ) : (
                            <span className="cmp-empty">–</span>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="cmp-actions-row">
                  <th scope="row">
                    <span className="sr-only">Ansehen</span>
                  </th>
                  {rows.map((r) => (
                    <td key={r.p.slug}>
                      <span className="cmp-actions">
                        {r.source.url && r.source.shop && !r.p.discontinued && (
                          <a className="cmp-shop" href={r.source.url} target="_blank" rel="nofollow noopener noreferrer">
                            Bei {r.source.shop} ansehen →
                          </a>
                        )}
                        <Link className="cmp-profile" href={`/duft/${r.p.slug}`}>
                          Zum Duftprofil
                        </Link>
                      </span>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="cmp-footer">
            <button type="button" className="share-pill" onClick={copyLink}>
              {copied ? '✓ Link kopiert' : '🔗 Vergleich teilen'}
            </button>
            <span className="small">Preise laut Shop zum angegebenen Stand – im Shop können sie inzwischen anders sein.</span>
          </div>
        </section>
      )}

      {rows.length === 1 && (
        <p className="cmp-hint">Super! Wähle jetzt noch einen zweiten Duft – dann siehst du den Vergleich.</p>
      )}

      {/* ── Düfte suchen ────────────────────────────────── */}
      <section className="cmp-pick" aria-label="Düfte auswählen">
        <h2>{chosen.length ? 'Weitere Düfte' : 'Düfte auswählen'}</h2>
        <input
          ref={searchRef}
          type="search"
          className="search cmp-search"
          placeholder="Duft oder Marke suchen …"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Duft oder Marke suchen"
        />
        {perfumes.length === 0 ? (
          <p className="cmp-hint">Der Katalog wird gerade neu aufgebaut – bald kannst du hier vergleichen.</p>
        ) : results.length === 0 ? (
          <p className="cmp-hint">Kein Duft gefunden. Versuch es mit einem anderen Namen oder der Marke.</p>
        ) : (
          <div className="cmp-results">
            {results.map((p) => {
              const on = selected.includes(p.slug as string);
              return (
                <button
                  type="button"
                  key={p.slug}
                  className={`cmp-result${on ? ' is-on' : ''}`}
                  onClick={() => toggle(p.slug as string)}
                  disabled={!on && full}
                  aria-pressed={on}
                >
                  <span className="cmp-result-check" aria-hidden="true">
                    {on ? '✓' : '+'}
                  </span>
                  <span className="cmp-result-text">
                    <strong>{p.perfume_name}</strong>
                    <span>
                      {p.brands?.name}
                      {concentrationLabel(p.concentration) ? ` · ${concentrationLabel(p.concentration)}` : ''}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
        {full && <p className="cmp-hint">Maximal drei Düfte – entferne oben einen, um einen anderen zu wählen.</p>}
      </section>
    </>
  );
}
