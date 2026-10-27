'use client';

import { useEffect, useState } from 'react';
import { type Perfume } from '@/lib/perfumes';
import { PerfumeTile, familyDisplay, matchesQuery } from '@/app/PerfumeTile';
import { trackFamilyClick, trackCategoryClick } from '@/lib/tracking';

const FAMILY_TILES: { code: string; label: string }[] = [
  { code: 'clean', label: 'Clean' },
  { code: 'gourmand', label: 'Gourmand' },
  { code: 'woody', label: 'Woody' },
  { code: 'floral', label: 'Floral' }
];

const GENDER_OPTIONS = [
  { code: 'Women', label: '♀ Damen' },
  { code: 'Men', label: '♂ Herren' },
  { code: 'Unisex', label: '⚥ Unisex' }
];

const SEASON_OPTIONS = [
  { code: 'Frühling', label: '🌸 Frühling' },
  { code: 'Sommer', label: '☀️ Sommer' },
  { code: 'Herbst', label: '🍂 Herbst' },
  { code: 'Winter', label: '❄️ Winter' },
  { code: 'Ganzjährig', label: '⭐ Ganzjährig' }
];

const OCCASION_OPTIONS = [
  { code: 'Alltag', label: 'Alltag' },
  { code: 'Büro', label: 'Büro' },
  { code: 'Date', label: 'Date' },
  { code: 'Abend', label: 'Abend' }
];

// Zielgruppe 16–40: Der Datenbank-Code bleibt „18-25" (kompatibel mit Backup und
// bestehenden Düften), angezeigt wird „16–25 Jahre".
const AGE_GROUP_OPTIONS = [
  { code: '18-25', label: '16-25 Jahre' },
  { code: '25-35', label: '25-35 Jahre' },
  { code: '35-40', label: '35-40 Jahre' }
];

const LIFESTYLE_OPTIONS = [
  { code: 'student', label: '👤 Student*in' },
  { code: 'professional', label: '👔 Berufstätig' },
  { code: 'party', label: '🎉 Party/Social' },
  { code: 'casual', label: '😌 Casual' },
  { code: 'sporty', label: '⚽ Sportlich' }
];

const PAGE_SIZE = 24;

export default function PerfumeCatalog({ initialPerfumes }: { initialPerfumes: Perfume[] }) {
  const perfumes = initialPerfumes;

  const [query, setQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [seasonFilters, setSeasonFilters] = useState<string[]>([]);
  const [occasionFilters, setOccasionFilters] = useState<string[]>([]);
  const [ageGroupFilters, setAgeGroupFilters] = useState<string[]>([]);
  const [lifestyleFilters, setLifestyleFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sillageRange, setSillageRange] = useState<[number, number]>([0, 10]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [shownCount, setShownCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const fam = sp.get('family');
    if (fam) setFamilyFilter(fam);
    const q = sp.get('q');
    if (q) setQuery(q);
  }, []);

  useEffect(() => {
    setShownCount(PAGE_SIZE);
  }, [query, familyFilter, genderFilters, seasonFilters, occasionFilters, ageGroupFilters, lifestyleFilters, priceRange, sillageRange]);

  const maxPrice = Math.max(...perfumes.map(p => p.price_chf || 0), 200);

  const sorted = [...perfumes].sort((a, b) =>
    (a.perfume_name || '').localeCompare(b.perfume_name || '', 'de', { sensitivity: 'base' })
  );

  const visible = sorted.filter(p => {
    if (!matchesQuery(p, query)) return false;
    if (familyFilter && p.fragrance_family !== familyFilter) return false;
    if (genderFilters.length > 0 && !genderFilters.includes(p.gender || '')) return false;
    if (seasonFilters.length > 0 && !seasonFilters.includes(p.season || '')) return false;
    if (occasionFilters.length > 0 && !occasionFilters.includes(p.occasion || '')) return false;
    // Only filter if field is not 'all' and not in the filter list
    if (ageGroupFilters.length > 0) {
      const pAgeGroup = p.age_group || 'all';
      if (pAgeGroup !== 'all' && !ageGroupFilters.includes(pAgeGroup)) return false;
    }
    if (lifestyleFilters.length > 0) {
      const pLifestyle = p.lifestyle || 'all';
      if (pLifestyle !== 'all' && !lifestyleFilters.includes(pLifestyle)) return false;
    }
    if (p.price_chf && (p.price_chf < priceRange[0] || p.price_chf > priceRange[1])) return false;
    if (p.sillage && (p.sillage < sillageRange[0] || p.sillage > sillageRange[1])) return false;
    return true;
  });

  const shown = visible.slice(0, shownCount);
  const hasMore = visible.length > shown.length;

  const activeFilterCount = (familyFilter ? 1 : 0) + genderFilters.length + seasonFilters.length +
    occasionFilters.length + ageGroupFilters.length + lifestyleFilters.length +
    (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0) +
    (sillageRange[0] > 0 || sillageRange[1] < 10 ? 1 : 0);

  const resetFilters = () => {
    setFamilyFilter('');
    setGenderFilters([]);
    setSeasonFilters([]);
    setOccasionFilters([]);
    setAgeGroupFilters([]);
    setLifestyleFilters([]);
    setPriceRange([0, maxPrice]);
    setSillageRange([0, 10]);
  };

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
            onClick={() => {
              setFamilyFilter((prev) => (prev === t.code ? '' : t.code));
              if (familyFilter !== t.code) {
                trackFamilyClick(t.code);
              }
            }}
          >
            {t.label}
          </button>
        ))}
        <button
          type="button"
          className="filter-more"
          style={{
            marginLeft: 'auto',
            background: showAdvancedFilters ? '#D4AF37' : 'rgba(212,175,55,0.15)',
            color: showAdvancedFilters ? '#1F1410' : '#6B5344',
            border: 'none',
            borderRadius: '20px',
            padding: '0.4rem 0.9rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          ⚙️ Erweiterte Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>
      </div>

      {showAdvancedFilters && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))',
          borderRadius: '12px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(212,175,55,0.15)',
        }}>
      {/* Age Group Filter */}
      <div className="filter-row" style={{ marginTop: 0 }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#D4AF37', marginRight: '0.8rem' }}>
          Altersgruppe:
        </span>
        <button
          type="button"
          className={`filter-pill${ageGroupFilters.length === 0 ? ' filter-pill-active' : ''}`}
          onClick={() => setAgeGroupFilters([])}
        >
          Alle
        </button>
        {AGE_GROUP_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`filter-pill${ageGroupFilters.includes(opt.code) ? ' filter-pill-active' : ''}`}
            onClick={() => setAgeGroupFilters((prev) =>
              prev.includes(opt.code) ? prev.filter((a) => a !== opt.code) : [...prev, opt.code]
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Lifestyle Filter */}
      <div className="filter-row" style={{ marginTop: '0.5rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#D4AF37', marginRight: '0.8rem' }}>
          Lifestyle:
        </span>
        <button
          type="button"
          className={`filter-pill${lifestyleFilters.length === 0 ? ' filter-pill-active' : ''}`}
          onClick={() => setLifestyleFilters([])}
        >
          Alle
        </button>
        {LIFESTYLE_OPTIONS.map((opt) => (
          <button
            key={opt.code}
            type="button"
            className={`filter-pill${lifestyleFilters.includes(opt.code) ? ' filter-pill-active' : ''}`}
            onClick={() => setLifestyleFilters((prev) =>
              prev.includes(opt.code) ? prev.filter((l) => l !== opt.code) : [...prev, opt.code]
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

          {/* Geschlecht */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#D4AF37', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              Geschlecht
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {GENDER_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => {
                    const newGenders = genderFilters.includes(opt.code)
                      ? genderFilters.filter(g => g !== opt.code)
                      : [...genderFilters, opt.code];
                    setGenderFilters(newGenders);
                    if (!genderFilters.includes(opt.code)) {
                      trackCategoryClick(opt.code as 'women' | 'men' | 'unisex');
                    }
                  }}
                  style={{
                    padding: '0.5rem 0.8rem',
                    background: genderFilters.includes(opt.code) ? '#D4AF37' : 'white',
                    color: genderFilters.includes(opt.code) ? '#1F1410' : '#6B5344',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Jahreszeit */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#D4AF37', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              Jahreszeit
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {SEASON_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => setSeasonFilters(prev =>
                    prev.includes(opt.code) ? prev.filter(s => s !== opt.code) : [...prev, opt.code]
                  )}
                  style={{
                    padding: '0.5rem 0.8rem',
                    background: seasonFilters.includes(opt.code) ? '#D4AF37' : 'white',
                    color: seasonFilters.includes(opt.code) ? '#1F1410' : '#6B5344',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Anlass */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#D4AF37', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              Anlass
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {OCCASION_OPTIONS.map(opt => (
                <button
                  key={opt.code}
                  onClick={() => setOccasionFilters(prev =>
                    prev.includes(opt.code) ? prev.filter(o => o !== opt.code) : [...prev, opt.code]
                  )}
                  style={{
                    padding: '0.5rem 0.8rem',
                    background: occasionFilters.includes(opt.code) ? '#D4AF37' : 'white',
                    color: occasionFilters.includes(opt.code) ? '#1F1410' : '#6B5344',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preis */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#D4AF37', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              Preis: CHF {priceRange[0]} – {priceRange[1]}
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                style={{ flex: 1 }}
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Sillage */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#D4AF37', marginBottom: '0.6rem', fontSize: '0.9rem' }}>
              Ausstrahlung: {sillageRange[0]} – {sillageRange[1]}/10
            </label>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <input
                type="range"
                min="0"
                max="10"
                value={sillageRange[0]}
                onChange={(e) => setSillageRange([Number(e.target.value), sillageRange[1]])}
                style={{ flex: 1 }}
              />
              <input
                type="range"
                min="0"
                max="10"
                value={sillageRange[1]}
                onChange={(e) => setSillageRange([sillageRange[0], Number(e.target.value)])}
                style={{ flex: 1 }}
              />
            </div>
          </div>

          {/* Reset */}
          {activeFilterCount > 0 && (
            <button
              onClick={resetFilters}
              style={{
                background: 'transparent',
                color: '#D4AF37',
                border: '1px solid #D4AF37',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Alle Filter zurücksetzen
            </button>
          )}
        </div>
      )}

      <p className="small catalog-count">
        {visible.length} Düfte
        {familyFilter ? ` · ${familyDisplay[familyFilter]}` : ''}
        {activeFilterCount > 0 && ` · ${activeFilterCount} Filter aktiv`}
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
