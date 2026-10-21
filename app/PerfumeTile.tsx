'use client';

import Link from 'next/link';
import type { Perfume } from '@/lib/perfumes';
import { FavoriteButton } from '@/app/FavoriteButton';
import { trackPerfumeView } from '@/lib/tracking';

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

// Herzliche Descriptions für Gelegenheiten (Saison-Empfehlungen).
export const occasionDescriptions: Record<string, string> = {
  'Alltag': '☀️ Perfekt für jeden Tag – frisch & zuverlässig',
  'Büro': '👔 Ideal für die Arbeit – elegant & diskret',
  'Date': '💕 Für romantische Momente – verführerisch & charmant',
  'Abend': '✨ Für spezielle Anlässe – intensiv & unvergesslich'
};

// Deutsche Anzeige-Labels für das Geschlecht (Werte sind englisch gespeichert).
export const genderDisplay: Record<string, string> = {
  Women: 'Weiblich',
  Men: 'Männlich',
  Unisex: 'Unisex'
};

// Symbole für das Geschlecht (♀ weiblich, ♂ männlich, ⚥ unisex).
export const genderSymbol: Record<string, string> = {
  Women: '♀',
  Men: '♂',
  Unisex: '⚥'
};

export function PerfumeCover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  const fam = perfume.fragrance_family || '';
  const className = `cover${large ? ' cover-large' : ''} cover-${fam}`;
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

export function PerfumeTile({ perfume, matchPercent, showOccasionDescription }: { perfume: Perfume; matchPercent?: number; showOccasionDescription?: boolean }) {
  const content = (
    <>
      <div style={{ position: 'relative' }}>
        <PerfumeCover perfume={perfume} />
        <FavoriteButton slug={perfume.slug} />
      </div>
      {matchPercent != null && <div className="match-badge">{matchPercent}% Match</div>}
      <h3>{perfume.perfume_name}</h3>
      <p className="small">{perfume.brands?.name || 'Marke offen'} · {familyDisplay[perfume.fragrance_family || ''] || 'Duftfamilie offen'}</p>
      {perfume.price_chf != null && (
        <p className="price-display" style={{ fontSize: '0.95rem', fontWeight: 600, color: '#D4AF37', marginBottom: '0.5rem' }}>
          CHF {perfume.price_chf.toFixed(0)}
        </p>
      )}
      {showOccasionDescription && perfume.occasion && (
        <p className="small" style={{ color: '#D4AF37', fontWeight: 500, marginBottom: '0.5rem' }}>
          {occasionDescriptions[perfume.occasion] || perfume.occasion}
        </p>
      )}
      <div className="tile-meta">
        <span className="score-pill">Score {perfume.scentmatch_score ?? 80}</span>
        {perfume.gender && (
          <span className="gender-pill" aria-label={genderDisplay[perfume.gender] || perfume.gender}>
            <span className="gender-symbol" aria-hidden="true">{genderSymbol[perfume.gender] || ''}</span>
            {genderDisplay[perfume.gender] || perfume.gender}
          </span>
        )}
        <span className="small">{perfume.season || 'Ganzjährig'} · {perfume.occasion || 'flexibel'}</span>
      </div>
    </>
  );

  if (perfume.slug) {
    return (
      <Link
        className="tile tile-link"
        href={`/duft/${perfume.slug}`}
        onClick={() => trackPerfumeView(perfume.id, perfume.slug)}
      >
        {content}
      </Link>
    );
  }
  return <div className="tile">{content}</div>;
}

// Filtert Düfte anhand eines Suchbegriffs (Name, Marke, Note, Geschlecht, Saison, Anlass).
export function matchesQuery(p: Perfume, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])].join(' ');
  const genderTerms = p.gender ? genderSearchTerms[p.gender] || p.gender : '';
  // Synonyme: "Schokolade" findet auch Kakao/Praline.
  const synonyms = /kakao|schokolade|praline/i.test(notes) ? ' schokolade kakao praline' : '';
  const haystack = `${p.perfume_name} ${p.fragrance_family} ${p.brands?.name || ''} ${genderTerms} ${p.season || ''} ${p.occasion || ''} ${notes}${synonyms}`.toLowerCase();
  // Jedes Suchwort muss vorkommen (Reihenfolge egal). So findet "Creed Aventus"
  // den Duft, obwohl Marke ("Creed") und Name ("Aventus") in getrennten Feldern
  // und in anderer Reihenfolge gespeichert sind.
  return q.split(/\s+/).every((term) => haystack.includes(term));
}
