'use client';

import { useEffect, useState } from 'react';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { PerfumeTile, familyDisplay, matchesQuery } from '@/app/PerfumeTile';

const FAMILY_TILES: { code: string; label: string }[] = [
  { code: 'clean', label: 'Clean' },
  { code: 'gourmand', label: 'Gourmand' },
  { code: 'woody', label: 'Woody' },
  { code: 'floral', label: 'Floral' }
];

export default function PerfumeCatalog() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [query, setQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getPerfumes(500).then((data) => {
      setPerfumes(data);
      setLoaded(true);
    });
    // Vorauswahl aus der URL übernehmen (z. B. von den Duftrichtungs-Kacheln).
    const sp = new URLSearchParams(window.location.search);
    const fam = sp.get('family');
    if (fam) setFamilyFilter(fam);
    const q = sp.get('q');
    if (q) setQuery(q);
  }, []);

  const sorted = [...perfumes].sort((a, b) =>
    (a.perfume_name || '').localeCompare(b.perfume_name || '', 'de', { sensitivity: 'base' })
  );
  const visible = sorted.filter(
    (p) => (!familyFilter || p.fragrance_family === familyFilter) && matchesQuery(p, query)
  );

  return (
    <section className="section">
      <input
        className="search"
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
        {loaded ? `${visible.length} Düfte` : 'Düfte werden geladen…'}
        {familyFilter ? ` · ${familyDisplay[familyFilter]}` : ''}
      </p>

      <div className="perfume-list">
        {loaded && visible.length === 0 ? (
          <p className="small">Keine Düfte gefunden. Versuch einen anderen Suchbegriff oder entferne den Filter.</p>
        ) : (
          visible.map((p) => <PerfumeTile perfume={p} key={p.id} />)
        )}
      </div>
    </section>
  );
}
