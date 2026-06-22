'use client';

import Link from 'next/link';
import type { Perfume } from '@/lib/perfumes';

// Anzeige-Namen der Duftfamilien.
export const familyDisplay: Record<string, string> = {
  clean: 'Clean',
  gourmand: 'Gourmand',
  woody: 'Woody',
  floral: 'Floral'
};

// Deutsche Suchbegriffe je gespeichertem Geschlecht (Werte sind englisch gespeichert).
export const genderSearchTerms: Record<string, string> = {
  Women: 'damen frauen women weiblich',
  Men: 'herren männer men männlich',
  Unisex: 'unisex'
};

export function PerfumeCover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  const fam = perfume.fragrance_family || '';
  const className = `cover${large ? ' cover-large' : ''} cover-${fam}`;
  if (perfume.image_url) {
    return <div className={className} style={{ backgroundImage: `url(${perfume.image_url})` }} />;
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

export function PerfumeTile({ perfume, matchPercent }: { perfume: Perfume; matchPercent?: number }) {
  const content = (
    <>
      <PerfumeCover perfume={perfume} />
      {matchPercent != null && <div className="match-badge">{matchPercent}% Match</div>}
      <h3>{perfume.perfume_name}</h3>
      <p className="small">{perfume.brands?.name || 'Marke offen'} · {familyDisplay[perfume.fragrance_family || ''] || 'Duftfamilie offen'}</p>
      <div className="tile-meta">
        <span className="score-pill">Score {perfume.scentmatch_score ?? 80}</span>
        <span className="small">{perfume.season || 'Ganzjährig'} · {perfume.occasion || 'flexibel'}</span>
      </div>
    </>
  );

  if (perfume.slug) {
    return (
      <Link className="tile tile-link" href={`/duft/${perfume.slug}`}>
        {content}
      </Link>
    );
  }
  return <div className="tile">{content}</div>;
}

// Filtert Düfte anhand eines Suchbegriffs (Name, Marke, Note, Geschlecht, Saison, Anlass).
export function matchesQuery(p: Perfume, query: string): boolean {
  if (!query) return true;
  const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].join(' ');
  const genderTerms = p.gender ? genderSearchTerms[p.gender] || p.gender : '';
  // Synonyme: "Schokolade" findet auch Kakao/Praline.
  const synonyms = /kakao|schokolade|praline/i.test(notes) ? ' schokolade kakao praline' : '';
  const haystack = `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name || ''} ${genderTerms} ${p.season || ''} ${p.occasion || ''} ${notes}${synonyms}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}
