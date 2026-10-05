'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';

interface Result {
  perfume: Perfume;
  explanation: string;
  cheaper?: Perfume;
}

export default function GiftFinderResults({
  results,
  onReset,
  allPerfumes,
}: {
  results: Result[];
  onReset: () => void;
  allPerfumes: Perfume[];
}) {
  if (results.length === 0) {
    return (
      <div className="gift-finder-results">
        <div className="results-empty">
          <h2>Keine Treffer gefunden</h2>
          <p>Leider gibt es in dieser Kategorie noch keine Düfte. Versuch eine andere Kombination!</p>
          <button className="btn-primary" onClick={onReset}>
            ← Neue Suche
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gift-finder-results">
      <h2>✨ Unsere Top-Empfehlungen</h2>
      <p className="results-intro">Hier sind {results.length} Düfte, die perfekt passen:</p>

      <div className="results-list">
        {results.map((result, idx) => (
          <div key={result.perfume.id} className="result-card">
            <div className="result-rank">#{idx + 1}</div>
            <div className="result-body">
              <h3>
                <Link href={`/duft/${result.perfume.slug}`} className="result-title-link">
                  {result.perfume.perfume_name}
                </Link>
              </h3>
              {result.perfume.brands?.name && (
                <p className="result-brand">{result.perfume.brands.name}</p>
              )}
              <p className="result-explanation">{result.explanation}</p>

              {result.perfume.price_chf && (
                <p className="result-price">CHF {result.perfume.price_chf}</p>
              )}

              <div className="result-actions">
                <Link href={`/duft/${result.perfume.slug}`} className="btn-secondary">
                  Mehr erfahren →
                </Link>
              </div>

              {result.cheaper && (
                <div className="result-cheaper">
                  <p className="cheaper-label">💰 Günstigere Alternative:</p>
                  <p className="cheaper-name">{result.cheaper.perfume_name}</p>
                  <p className="cheaper-price">CHF {result.cheaper.price_chf}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="results-footer">
        <button className="btn-primary" onClick={onReset}>
          ← Neue Suche
        </button>
      </div>
    </div>
  );
}
