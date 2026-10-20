'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { type Perfume } from '@/lib/perfumes';
import { PerfumeTile, familyDisplay, matchesQuery } from '@/app/PerfumeTile';
import { trackFamilyClick, trackCategoryClick } from '@/lib/tracking';

const FAMILY_TILES: { code: string; label: string }[] = [
  { code: 'clean', label: 'Clean' },
  { code: 'gourmand', label: 'Gourmand' },
  { code: 'woody', label: 'Woody' },
  { code: 'floral', label: 'Floral' }
];

const FAMILY_COLORS: Record<string, string> = {
  clean: '#E0F2FE',
  gourmand: '#FEE2E2',
  woody: '#F5E6D3',
  floral: '#FAE8FF'
};

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

const PAGE_SIZE = 24;

type SortOption = 'name' | 'score' | 'price-low' | 'price-high';

interface PerfumeCardProps {
  perfume: Perfume;
  isFavorite: boolean;
  isComparing: boolean;
  onToggleFavorite: (id: string) => void;
  onToggleCompare: (id: string) => void;
}

const PerfumeCard = ({ perfume, isFavorite, isComparing, onToggleFavorite, onToggleCompare }: PerfumeCardProps) => {
  const bgColor = FAMILY_COLORS[perfume.fragrance_family || ''] || '#FFF9F0';
  const isTopScore = (perfume.scentmatch_score ?? 0) >= 90;
  const isCheap = (perfume.price_chf ?? 0) <= 100 && perfume.price_chf !== null;
  const buyUrl = perfume.affiliate_url || `https://www.google.com/search?q=${encodeURIComponent(perfume.perfume_name + ' ' + (perfume.brands?.name || ''))}`;

  return (
    <div className="tile perfume-card-enhanced" style={{ background: bgColor, position: 'relative' }}>
      {/* Badges */}
      <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {isTopScore && <span style={{ background: '#D4AF37', color: '#1F1410', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>🏆 Top</span>}
        {isCheap && <span style={{ background: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600 }}>💰 Günstig</span>}
      </div>

      {/* Favoriten & Vergleich Buttons */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
        <button onClick={() => onToggleFavorite(perfume.id)} style={{ background: isFavorite ? '#FF6B6B' : 'rgba(255,107,107,0.2)', color: isFavorite ? 'white' : '#FF6B6B', border: 'none', borderRadius: '20px', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 600, fontSize: '16px' }}>
          ❤️
        </button>
        <button onClick={() => onToggleCompare(perfume.id)} style={{ background: isComparing ? '#4CAF50' : 'rgba(76,175,80,0.2)', color: isComparing ? 'white' : '#4CAF50', border: 'none', borderRadius: '20px', width: '32px', height: '32px', cursor: 'pointer', fontWeight: 600, fontSize: '16px' }}>
          ⚖️
        </button>
      </div>

      {/* Flakon-Bild */}
      {perfume.image_url && (
        <img src={perfume.image_url} alt={perfume.perfume_name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '12px' }} />
      )}

      {/* Info */}
      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '4px' }}>{perfume.perfume_name}</h3>
      <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '12px' }}>
        {perfume.brands?.name || 'Marke'} · {familyDisplay[perfume.fragrance_family || ''] || 'Familie'}
      </p>

      {/* Score & Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#D4AF37' }}>CHF {perfume.price_chf || '?'}</span>
        {perfume.scentmatch_score && (
          <span style={{ background: '#E8E0D0', color: '#1F1410', padding: '4px 10px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600 }}>Score {perfume.scentmatch_score}</span>
        )}
      </div>

      {/* CTA Button */}
      <a href={buyUrl} target="_blank" rel="noopener noreferrer sponsored" style={{ display: 'block', textAlign: 'center', background: '#D4AF37', color: '#1F1410', padding: '10px', borderRadius: '8px', fontWeight: 600, textDecoration: 'none', marginBottom: '8px' }}>
        Jetzt ansehen →
      </a>

      {/* Profil-Link */}
      {perfume.slug && (
        <Link href={`/duft/${perfume.slug}`} style={{ display: 'block', textAlign: 'center', color: '#D4AF37', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>
          Duftprofil
        </Link>
      )}
    </div>
  );
};

export default function PerfumeCatalog({ initialPerfumes }: { initialPerfumes: Perfume[] }) {
  const perfumes = initialPerfumes;
  const [query, setQuery] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [genderFilters, setGenderFilters] = useState<string[]>([]);
  const [seasonFilters, setSeasonFilters] = useState<string[]>([]);
  const [occasionFilters, setOccasionFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sillageRange, setSillageRange] = useState<[number, number]>([0, 10]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [shownCount, setShownCount] = useState(PAGE_SIZE);
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [comparing, setComparing] = useState<string[]>([]);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const fam = sp.get('family');
    if (fam) setFamilyFilter(fam);
    const q = sp.get('q');
    if (q) setQuery(q);

    const saved = localStorage.getItem('auressa_favorites');
    if (saved) setFavorites(new Set(JSON.parse(saved)));
  }, []);

  useEffect(() => {
    localStorage.setItem('auressa_favorites', JSON.stringify([...favorites]));
  }, [favorites]);

  useEffect(() => {
    setShownCount(PAGE_SIZE);
  }, [query, familyFilter, genderFilters, seasonFilters, occasionFilters, priceRange, sillageRange, sortBy]);

  const maxPrice = Math.max(...perfumes.map(p => p.price_chf || 0), 200);

  let sorted = [...perfumes];

  if (sortBy === 'name') {
    sorted.sort((a, b) => (a.perfume_name || '').localeCompare(b.perfume_name || '', 'de', { sensitivity: 'base' }));
  } else if (sortBy === 'score') {
    sorted.sort((a, b) => (b.scentmatch_score ?? 0) - (a.scentmatch_score ?? 0));
  } else if (sortBy === 'price-low') {
    sorted.sort((a, b) => (a.price_chf ?? 999) - (b.price_chf ?? 999));
  } else if (sortBy === 'price-high') {
    sorted.sort((a, b) => (b.price_chf ?? 0) - (a.price_chf ?? 0));
  }

  const visible = sorted.filter(p => {
    if (!matchesQuery(p, query)) return false;
    if (familyFilter && p.fragrance_family !== familyFilter) return false;
    if (genderFilters.length > 0 && !genderFilters.includes(p.gender || '')) return false;
    if (seasonFilters.length > 0 && !seasonFilters.includes(p.season || '')) return false;
    if (occasionFilters.length > 0 && !occasionFilters.includes(p.occasion || '')) return false;
    if (p.price_chf && (p.price_chf < priceRange[0] || p.price_chf > priceRange[1])) return false;
    if (p.sillage && (p.sillage < sillageRange[0] || p.sillage > sillageRange[1])) return false;
    return true;
  });

  const shown = visible.slice(0, shownCount);
  const hasMore = visible.length > shown.length;

  const activeFilterCount = (familyFilter ? 1 : 0) + genderFilters.length + seasonFilters.length +
    occasionFilters.length + (priceRange[0] > 0 || priceRange[1] < maxPrice ? 1 : 0) +
    (sillageRange[0] > 0 || sillageRange[1] < 10 ? 1 : 0);

  const resetFilters = () => {
    setFamilyFilter('');
    setGenderFilters([]);
    setSeasonFilters([]);
    setOccasionFilters([]);
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

      {/* Sortierung */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sortieren:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOption)} style={{ padding: '0.5rem 0.8rem', borderRadius: '8px', border: '1px solid rgba(212,175,55,0.3)', background: 'white', cursor: 'pointer' }}>
          <option value="score">⭐ Nach Bewertung</option>
          <option value="price-low">💰 Preis aufsteigend</option>
          <option value="price-high">💰 Preis absteigend</option>
          <option value="name">A-Z Alphabetisch</option>
        </select>
      </div>

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
              Sillage (Projektion): {sillageRange[0]} – {sillageRange[1]}/10
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

      {/* Vergleichs-Bereich */}
      {comparing.length > 0 && (
        <div style={{ background: '#E8E0D0', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>📊 Vergleich ({comparing.length}/3)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            {comparing.map((id) => {
              const p = perfumes.find(x => x.id === id);
              return p ? (
                <div key={id} style={{ background: 'white', padding: '1rem', borderRadius: '8px', position: 'relative' }}>
                  <button onClick={() => setComparing(comparing.filter(x => x !== id))} style={{ position: 'absolute', top: '8px', right: '8px', background: '#FF6B6B', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 600 }}>✕</button>
                  <h4>{p.perfume_name}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{p.brands?.name}</p>
                  <p style={{ fontSize: '0.9rem', marginTop: '8px' }}>CHF {p.price_chf}</p>
                </div>
              ) : null;
            })}
          </div>
          <button style={{ background: 'white', color: '#D4AF37', border: '2px solid #D4AF37', padding: '10px 1rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', width: '100%' }}>
            Vergleich anzeigen
          </button>
        </div>
      )}

      <p className="small catalog-count">
        {visible.length} Düfte
        {familyFilter ? ` · ${familyDisplay[familyFilter]}` : ''}
        {activeFilterCount > 0 && ` · ${activeFilterCount} Filter aktiv`}
        {favorites.size > 0 && ` · ${favorites.size} Favoriten`}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {visible.length === 0 ? (
          <p className="small">Keine Düfte gefunden. Versuch einen anderen Suchbegriff oder entferne den Filter.</p>
        ) : (
          shown.map((p) => (
            <PerfumeCard
              key={p.id}
              perfume={p}
              isFavorite={favorites.has(p.id)}
              isComparing={comparing.includes(p.id)}
              onToggleFavorite={(id) => {
                const newFavs = new Set(favorites);
                if (newFavs.has(id)) newFavs.delete(id);
                else newFavs.add(id);
                setFavorites(newFavs);
              }}
              onToggleCompare={(id) => {
                if (comparing.includes(id)) {
                  setComparing(comparing.filter(x => x !== id));
                } else if (comparing.length < 3) {
                  setComparing([...comparing, id]);
                }
              }}
            />
          ))
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
