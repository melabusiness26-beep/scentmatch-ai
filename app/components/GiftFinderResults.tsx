'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import { AffiliateButton } from '@/app/AffiliateButton';

interface Result {
  perfume: Perfume;
  explanation: string;
  cheaper?: Perfume;
  cheaperLevel?: string;
  cheaperSharedNotes?: { top: string[]; heart: string[]; base: string[] };
}

const familyLabels: Record<string, string> = {
  clean: 'Clean / Frisch',
  floral: 'Floral / Blumig',
  woody: 'Woody / Holzig',
  gourmand: 'Gourmand / Süss',
};

function familyLabel(code: string | null): string {
  if (!code) return 'Duftfamilie offen';
  return familyLabels[code] || code;
}

function Cover({ perfume }: { perfume: Perfume }) {
  const className = `cover cover-${perfume.fragrance_family || ''}`;
  if (perfume.image_url) {
    return (
      <div
        className={className}
        role="img"
        aria-label={`${perfume.perfume_name}${perfume.brands?.name ? ` von ${perfume.brands.name}` : ''} – Duftflakon`}
        style={{ backgroundImage: `url(${perfume.image_url})` }}
      />
    );
  }
  return (
    <div className={className}>
      <div className="cover-label">
        {perfume.brands?.name && <span className="cover-label-brand">{perfume.brands.name}</span>}
        <span className="cover-label-name">{perfume.perfume_name}</span>
      </div>
    </div>
  );
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
          <h2>Keine passenden Düfte gefunden</h2>
          <p>Für diese Kombination haben wir leider keinen passenden Duft im Katalog. Versuch, ein anderes Budget oder einen anderen Stil zu wählen.</p>
          <div className="results-footer">
            <button className="btn-primary" onClick={onReset}>
              Andere Kombination probieren
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gift-finder-results">
      <div className="section">
        <h2>Diese Düfte passen zu deinen Angaben</h2>
        <div className="perfume-list">
          {results.map((result) => {
            const shared = result.cheaperSharedNotes
              ? [...(result.cheaperSharedNotes.top || []), ...(result.cheaperSharedNotes.heart || []), ...(result.cheaperSharedNotes.base || [])]
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(', ')
              : '';
            return (
              <div key={result.perfume.id}>
                <div className="tile">
                  <Cover perfume={result.perfume} />
                  <div className="match-badge">{result.perfume.price_chf != null ? `ca. CHF ${result.perfume.price_chf}` : 'Preis offen'}</div>
                  <h3>{result.perfume.perfume_name}</h3>
                  <p className="small">
                    {result.perfume.brands?.name || 'Marke offen'} · {familyLabel(result.perfume.fragrance_family)}
                  </p>
                  <p className="small">{result.explanation}</p>
                  <div className="cta">
                    {result.perfume.slug && (
                      <Link className="button secondary" href={`/duft/${result.perfume.slug}`}>Duftprofil</Link>
                    )}
                    <AffiliateButton perfume={result.perfume} showNote={false} />
                  </div>
                </div>

                {result.cheaper && result.cheaperLevel && (
                  <div className="tile">
                    <Cover perfume={result.cheaper} />
                    <div className="match-badge">{result.cheaper.price_chf != null ? `ca. CHF ${result.cheaper.price_chf}` : 'Preis offen'}</div>
                    <h3>{result.cheaper.perfume_name}</h3>
                    <p className="small">
                      {result.cheaper.brands?.name || 'Marke offen'} · {familyLabel(result.cheaper.fragrance_family)}
                    </p>
                    <p className="small">
                      <strong>{result.cheaperLevel}</strong>
                      {shared && <><br />Gemeinsam: {shared}</> }
                    </p>
                    <div className="cta">
                      {result.cheaper.slug && (
                        <Link className="button secondary" href={`/duft/${result.cheaper.slug}`}>Duftprofil</Link>
                      )}
                      <AffiliateButton perfume={result.cheaper} showNote={false} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="results-footer">
        <button className="btn-primary" onClick={onReset}>
          Neue Suche starten
        </button>
      </div>
    </div>
  );
}
