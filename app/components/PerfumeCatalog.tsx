'use client';

import React, { useState, useMemo, ReactElement } from 'react';
import type { Perfume } from '@/lib/perfumes';
import PerfumeCard from './PerfumeCard';

interface PerfumeCatalogProps {
  perfumes: Perfume[];
  onSelectPerfume?: (perfume: Perfume) => void;
}

type FamilyFilter = 'clean' | 'gourmand' | 'woody' | 'floral' | null;

export default function PerfumeCatalog({
  perfumes,
  onSelectPerfume,
}: PerfumeCatalogProps): ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<FamilyFilter>(null);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(300);
  const [genderFilter, setGenderFilter] = useState<
    'all' | 'women' | 'men' | 'unisex'
  >('all');
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 12;

  /* Filter logic */
  const filtered = useMemo(() => {
    return perfumes.filter((perfume) => {
      /* Search: Name, Brand, Notes */
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = perfume.perfume_name
        ?.toLowerCase()
        .includes(searchLower);
      const brandMatch = perfume.brands?.name
        ?.toLowerCase()
        .includes(searchLower);
      const notesMatch =
        perfume.top_notes?.some((n) =>
          n.toLowerCase().includes(searchLower)
        ) ||
        perfume.heart_notes?.some((n) =>
          n.toLowerCase().includes(searchLower)
        ) ||
        perfume.base_notes?.some((n) =>
          n.toLowerCase().includes(searchLower)
        );

      if (!nameMatch && !brandMatch && !notesMatch) {
        return false;
      }

      /* Family filter */
      if (
        selectedFamily &&
        perfume.fragrance_family?.toLowerCase() !== selectedFamily
      ) {
        return false;
      }

      /* Price filter */
      if (
        perfume.price_chf === null ||
        perfume.price_chf < priceMin ||
        perfume.price_chf > priceMax
      ) {
        return false;
      }

      /* Gender filter */
      if (genderFilter !== 'all') {
        const genderLower = perfume.gender?.toLowerCase();
        if (genderFilter === 'women' && genderLower !== 'women') {
          return false;
        }
        if (genderFilter === 'men' && genderLower !== 'men') {
          return false;
        }
        if (genderFilter === 'unisex' && genderLower !== 'unisex') {
          return false;
        }
      }

      return true;
    });
  }, [
    perfumes,
    searchTerm,
    selectedFamily,
    priceMin,
    priceMax,
    genderFilter,
  ]);

  /* Pagination */
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedPerfumes = filtered.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number): void => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = (): void => {
    setSearchTerm('');
    setSelectedFamily(null);
    setPriceMin(0);
    setPriceMax(300);
    setGenderFilter('all');
    setCurrentPage(1);
  };

  return (
    <div className="catalog-container">
      {/* Filters Section */}
      <div className="catalog-filters">
        <div className="filter-group">
          <label htmlFor="search">Suche:</label>
          <input
            id="search"
            type="text"
            placeholder="Name, Marke oder Note..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>Duftrichtung:</label>
          <div className="filter-buttons">
            {[
              { label: 'Alle', value: null },
              { label: 'Clean', value: 'clean' as const },
              { label: 'Gourmand', value: 'gourmand' as const },
              { label: 'Woody', value: 'woody' as const },
              { label: 'Floral', value: 'floral' as const },
            ].map((option) => (
              <button
                key={option.value || 'all'}
                className={`filter-button ${
                  selectedFamily === option.value ? 'active' : ''
                }`}
                onClick={() => {
                  setSelectedFamily(option.value);
                  setCurrentPage(1);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Geschlecht:</label>
          <div className="filter-buttons">
            {[
              { label: 'Alle', value: 'all' as const },
              { label: 'Damen', value: 'women' as const },
              { label: 'Herren', value: 'men' as const },
              { label: 'Unisex', value: 'unisex' as const },
            ].map((option) => (
              <button
                key={option.value}
                className={`filter-button ${
                  genderFilter === option.value ? 'active' : ''
                }`}
                onClick={() => {
                  setGenderFilter(option.value);
                  setCurrentPage(1);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>Preisbereich: CHF {priceMin} – {priceMax}</label>
          <div className="price-inputs">
            <input
              type="range"
              min="0"
              max="300"
              value={priceMin}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val <= priceMax) {
                  setPriceMin(val);
                  setCurrentPage(1);
                }
              }}
              className="slider"
            />
            <input
              type="range"
              min="0"
              max="300"
              value={priceMax}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= priceMin) {
                  setPriceMax(val);
                  setCurrentPage(1);
                }
              }}
              className="slider"
            />
          </div>
        </div>

        <button
          className="button button-secondary"
          onClick={resetFilters}
        >
          Filter zurücksetzen
        </button>
      </div>

      {/* Results Header */}
      <div className="catalog-header">
        <h2>
          {filtered.length} Düfte
          {searchTerm && ` zu "${searchTerm}"`}
        </h2>
        <p className="results-info">
          Seite {currentPage} von {totalPages || 1}
        </p>
      </div>

      {/* Grid */}
      {displayedPerfumes.length > 0 ? (
        <>
          <div className="perfume-grid">
            {displayedPerfumes.map((perfume) => (
              <PerfumeCard
                key={perfume.id}
                perfume={perfume}
                onSelect={onSelectPerfume}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                ← Zurück
              </button>

              <div className="pagination-numbers">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`pagination-number ${
                        pageNum === currentPage ? 'active' : ''
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                Weiter →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="no-results">
          <p>😢 Keine Düfte gefunden.</p>
          <p className="small">Versuche, deine Suchkriterien anzupassen.</p>
          <button
            className="button button-secondary"
            onClick={resetFilters}
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  );
}
