'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  findCheaperAlternatives,
  findSimilarPerfumes,
  type Perfume
} from '@/lib/perfumes';
import { AffiliateButton } from '@/app/AffiliateButton';
import { PerfumeCover, familyDisplay, matchesQuery } from '@/app/PerfumeTile';

// Kuratierte Duft-Paare aus den Ratgebern: teurer Duft (slug) -> günstige Partner.
export type CuratedDupes = Record<string, { cheap: string; note: string }[]>;

// Bekannte teure Düfte für die Schnellauswahl – nur angezeigt, wenn sie im Katalog sind.
const QUICK_PICK_SLUGS = [
  'creed-aventus',
  'baccarat-rouge-540',
  'dior-sauvage-elixir',
  'tobacco-vanille',
  'ysl-black-opium',
  'kilian-angels-share',
  'initio-oud-greatness',
  'creed-aventus-for-her'
];

function familyLabel(code: string | null | undefined): string {
  return familyDisplay[code || ''] || 'Duftfamilie offen';
}

function AlternativeTile({
  target,
  perfume,
  similarity,
  editorial
}: {
  target: Perfume;
  perfume: Perfume;
  similarity?: number;
  editorial?: string;
}) {
  const saving =
    target.price_chf != null && perfume.price_chf != null
      ? target.price_chf - perfume.price_chf
      : null;
  return (
    <div className="tile">
      <PerfumeCover perfume={perfume} />
      <div className="match-badge">
        {perfume.price_chf != null ? `ca. CHF ${perfume.price_chf}` : 'Preis offen'}
      </div>
      <h3>{perfume.perfume_name}</h3>
      <p className="small">
        {perfume.brands?.name || 'Marke offen'} · {familyLabel(perfume.fragrance_family)}
      </p>
      <p className="small">
        {editorial
          ? editorial
          : `${similarity}% ähnlich${saving != null && saving > 0 ? ` · spart ~CHF ${saving}` : ''}`}
        {editorial && saving != null && saving > 0 ? ` Spart ~CHF ${saving}.` : ''}
      </p>
      <div className="cta">
        {perfume.slug && (
          <Link className="button secondary" href={`/duft/${perfume.slug}`}>
            Duftprofil
          </Link>
        )}
        <AffiliateButton perfume={perfume} showNote={false} />
      </div>
    </div>
  );
}

// Der Dupe-Finder: teuren Lieblingsduft eingeben -> günstige Alternativen sehen.
// Nutzt dieselbe Ähnlichkeits-Logik wie die Detailseiten ("Günstige Alternativen")
// plus die redaktionellen Duft-Paare aus den Ratgebern.
export default function DupeFinder({
  perfumes,
  curated
}: {
  perfumes: Perfume[];
  curated: CuratedDupes;
}) {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const selected = perfumes.find((p) => p.id === selectedId) || null;

  // Vorschläge während des Tippens – teurere Düfte zuerst, damit die
  // typischen "Originale" oben stehen.
  const suggestions =
    !selected && query.trim().length >= 2
      ? perfumes
          .filter((p) => matchesQuery(p, query))
          .sort((a, b) => (b.price_chf ?? 0) - (a.price_chf ?? 0))
          .slice(0, 8)
      : [];

  const quickPicks = QUICK_PICK_SLUGS.map((slug) =>
    perfumes.find((p) => p.slug === slug)
  ).filter((p): p is Perfume => Boolean(p));

  const pick = (p: Perfume) => {
    setSelectedId(p.id);
    setQuery(`${p.brands?.name ? `${p.brands.name} ` : ''}${p.perfume_name}`);
  };

  const reset = () => {
    setSelectedId('');
    setQuery('');
  };

  // Ergebnisse für den gewählten Duft berechnen.
  let curatedResults: { perfume: Perfume; note: string }[] = [];
  let algoResults: { perfume: Perfume; similarity: number }[] = [];
  let similarFallback: { perfume: Perfume; similarity: number }[] = [];

  if (selected) {
    const curatedEntries = (selected.slug && curated[selected.slug]) || [];
    curatedResults = curatedEntries
      .map((e) => {
        const partner = perfumes.find((p) => p.slug === e.cheap);
        return partner ? { perfume: partner, note: e.note } : null;
      })
      .filter((e): e is { perfume: Perfume; note: string } => Boolean(e));
    const curatedIds = new Set(curatedResults.map((e) => e.perfume.id));
    algoResults = findCheaperAlternatives(selected, perfumes, 6).filter(
      (a) => !curatedIds.has(a.perfume.id)
    ).slice(0, 4);
    if (curatedResults.length === 0 && algoResults.length === 0) {
      // Kein günstigerer Zwilling gefunden – ehrlich sagen und stattdessen
      // ähnlich riechende Düfte zeigen (der gewählte Duft ist oft selbst günstig).
      similarFallback = findSimilarPerfumes(selected, perfumes, 3).filter(
        (s) => s.similarity >= 30
      );
    }
  }

  return (
    <section className="section">
      <div className="card">
        <h2>Welchen teuren Duft liebst du?</h2>
        <p className="small">
          Tipp den Namen ein (z. B. „Creed Aventus" oder „Black Opium") und wähle
          deinen Duft aus – wir zeigen dir sofort ähnlich riechende, deutlich
          günstigere Alternativen aus unserem Katalog.
        </p>
        <input
          className="search"
          type="search"
          aria-label="Teuren Duft suchen, um günstige Alternativen zu finden"
          placeholder={'Duft oder Marke eingeben, z. B. „Baccarat Rouge“…'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedId('');
          }}
        />

        {suggestions.length > 0 && (
          <div className="filter-row" role="listbox" aria-label="Passende Düfte">
            {suggestions.map((p) => (
              <button
                key={p.id}
                type="button"
                className="filter-pill"
                onClick={() => pick(p)}
              >
                {p.brands?.name ? `${p.brands.name} ` : ''}
                {p.perfume_name}
                {p.price_chf != null ? ` · CHF ${p.price_chf}` : ''}
              </button>
            ))}
          </div>
        )}
        {!selected && query.trim().length >= 2 && suggestions.length === 0 && (
          <p className="small">
            Diesen Duft haben wir (noch) nicht im Katalog. Probier eine andere
            Schreibweise – oder stöbere in <Link href="/duefte">allen Düften</Link>.
          </p>
        )}

        {!selected && (
          <>
            <p className="small">Oder wähle einen der meistgesuchten Düfte:</p>
            <div className="filter-row">
              {quickPicks.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="filter-pill"
                  onClick={() => pick(p)}
                >
                  {p.brands?.name ? `${p.brands.name} ` : ''}
                  {p.perfume_name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {selected && (
        <div className="section">
          <h2>
            Günstige Alternativen zu {selected.perfume_name}
            {selected.price_chf != null ? ` (ca. CHF ${selected.price_chf})` : ''}
          </h2>
          <p className="small">
            Ehrlich gesagt: Keine Alternative ist eine exakte Kopie – aber diese
            Düfte gehen in eine sehr ähnliche Richtung und kosten deutlich weniger.
          </p>

          {(curatedResults.length > 0 || algoResults.length > 0) && (
            <div className="perfume-list">
              {curatedResults.map(({ perfume, note }) => (
                <AlternativeTile
                  key={perfume.id}
                  target={selected}
                  perfume={perfume}
                  editorial={note}
                />
              ))}
              {algoResults.map(({ perfume, similarity }) => (
                <AlternativeTile
                  key={perfume.id}
                  target={selected}
                  perfume={perfume}
                  similarity={similarity}
                />
              ))}
            </div>
          )}

          {curatedResults.length === 0 && algoResults.length === 0 && (
            <>
              <p className="small">
                Gute Nachricht: {selected.perfume_name}
                {selected.price_chf != null ? ` (ca. CHF ${selected.price_chf})` : ''} ist
                selbst schon günstig – hier brauchst du keinen Dupe.
                {similarFallback.length > 0 ? ' Diese Düfte riechen ähnlich:' : ''}
              </p>
              {similarFallback.length > 0 && (
                <div className="perfume-list">
                  {similarFallback.map(({ perfume, similarity }) => (
                    <AlternativeTile
                      key={perfume.id}
                      target={selected}
                      perfume={perfume}
                      similarity={similarity}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          <div className="cta">
            <button type="button" className="button secondary" onClick={reset}>
              Anderen Duft suchen
            </button>
            {selected.slug && (
              <Link className="button secondary" href={`/duft/${selected.slug}`}>
                Zum Duftprofil von {selected.perfume_name}
              </Link>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
