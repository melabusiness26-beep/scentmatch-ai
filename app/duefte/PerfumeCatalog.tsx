'use client';

import { useEffect, useState } from 'react';
import { type Perfume } from '@/lib/perfumes';
import { PerfumeTile, familyDisplay, matchesQuery } from '@/app/PerfumeTile';

const FAMILY_TILES: { code: string; label: string }[] = [
  { code: 'clean', label: 'Clean' },
  { code: 'gourmand', label: 'Gourmand' },
  { code: 'woody', label: 'Woody' },
  { code: 'floral', label: 'Floral' }
];

// Wie viele Düfte pro „Seite" angezeigt werden, bevor „Mehr laden" erscheint.
// Hält die Seite auch bei hunderten Düften schnell – vor allem auf dem Handy.
const PAGE_SIZE = 24;

// Die Düfte kommen jetzt server-seitig vorgerendert herein (initialPerfumes).
// So stehen sie samt Links direkt im HTML (gut für Google) und es gibt kein
// Nachladen/Flackern mehr. Suche und Filter laufen weiterhin im Browser.
export default function PerfumeCatalog({ initialPerfumes }: { initialPerfumes: Perfume[] }) {
  const perfumes = initialPerfumes;
  const [query, setQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [shownCount, setShownCount] = useState(PAGE_SIZE);

  useEffect(() => {
    // Vorauswahl aus der URL übernehmen (z. B. von den Duftrichtungs-Kacheln).
    const sp = new URLSearchParams(window.location.search);
    const fam = sp.get('family');
    if (fam) setFamilyFilter(fam);
    const q = sp.get('q');
    if (q) setQuery(q);
  }, []);

  // Bei jeder neuen Suche oder Filter-Auswahl wieder oben mit PAGE_SIZE beginnen.
  useEffect(() => {
    setShownCount(PAGE_SIZE);
  }, [query, familyFilter]);

  const sorted = [...perfumes].sort((a, b) =>
    (a.perfume_name || '').localeCompare(b.perfume_name || '', 'de', { sensitivity: 'base' })
  );
  const visible = sorted.filter(
    (p) => (!familyFilter || p.fragrance_family === familyFilter) && matchesQuery(p, query)
  );
  const shown = visible.slice(0, shownCount);
  const hasMore = visible.length > shown.length;

  return (
    <section className="section">
      <input
        className="search"
        type="search"
        aria-label="Düfte durchsuchen – nach Duft, Marke, Note, Geschlecht oder Anlass"
        placeholder="Suche nach Duft, Marke, Note (z. B. Schokolade), Geschlecht oder Anlass…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="filter-row">
        <button
          type="button"
          className={`filter-pill${familyFilter === '' ? ' filter-pill-active' : ''}`}
          onClick={() => setFamilyFilter('')}
        >
          Alle
        </button>
        {FAMILY_TILES.map((t) => (
          <button
            key={t.code}
            type="button"
            className={`filter-pill${familyFilter === t.code ? ' filter-pill-active' : ''}`}
            onClick={() => setFamilyFilter((prev) => (prev === t.code ? '' : t.code))}
          >
            {t.label}
          </button>
        ))}
      </div>

      <p className="small catalog-count">
        {visible.length} Düfte
        {familyFilter ? ` · ${familyDisplay[familyFilter]}` : ''}
      </p>

      <div className="perfume-list">
        {visible.length === 0 ? (
          <p className="small">Keine Düfte gefunden. Versuch einen anderen Suchbegriff oder entferne den Filter.</p>
        ) : (
          shown.map((p) => <PerfumeTile perfume={p} key={p.id} />)
        )}
      </div>

      {hasMore && (
        <div className="cta catalog-more">
          <button type="button" className="button secondary" onClick={() => setShownCount((c) => c + PAGE_SIZE)}>
            Mehr Düfte laden ({visible.length - shown.length} weitere)
          </button>
        </div>
      )}
    </section>
  );
}
