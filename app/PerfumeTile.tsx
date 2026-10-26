'use client';

import Link from 'next/link';
import type { Perfume } from '@/lib/perfumes';
import { FavoriteButton } from '@/app/FavoriteButton';
import { trackPerfumeView } from '@/lib/tracking';
import { PerfumeVisual } from '@/app/components/PerfumeVisual';

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

// Duft-Bild: echtes Produktbild (falls hinterlegt) oder die Auressa-Duftkarte.
export function PerfumeCover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  return <PerfumeVisual perfume={perfume} size={large ? 'hero' : 'tile'} />;
}

export function PerfumeTile({ perfume, matchPercent, showOccasionDescription }: { perfume: Perfume; matchPercent?: number; showOccasionDescription?: boolean }) {
  const notes = [...(perfume.top_notes || []), ...(perfume.heart_notes || []), ...(perfume.base_notes || [])];
  const keyNotes = notes.slice(0, 3);
  const content = (
    <>
      <div className="tile-visual">
        <PerfumeCover perfume={perfume} />
        <FavoriteButton slug={perfume.slug} />
        {matchPercent != null && <span className="tile-match">{matchPercent}% Match</span>}
      </div>
      <div className="tile-body">
        <p className="tile-brand">{perfume.brands?.name || 'Marke offen'}</p>
        <h3 className="tile-name">{perfume.perfume_name}</h3>
        <div className="tile-chips">
          {perfume.fragrance_family && (
            <span className={`chip chip-family chip-${perfume.fragrance_family}`}>
              {familyDisplay[perfume.fragrance_family] || perfume.fragrance_family}
            </span>
          )}
          {perfume.gender && (
            <span className="chip" aria-label={genderDisplay[perfume.gender] || perfume.gender}>
              <span aria-hidden="true">{genderSymbol[perfume.gender] || ''}</span> {genderDisplay[perfume.gender] || perfume.gender}
            </span>
          )}
        </div>
        {keyNotes.length > 0 && <p className="tile-notes">{keyNotes.join(' · ')}</p>}
        {showOccasionDescription && perfume.occasion && (
          <p className="tile-occasion">{occasionDescriptions[perfume.occasion] || perfume.occasion}</p>
        )}
        <div className="tile-footer">
          {perfume.price_chf != null ? (
            <span className="tile-price">CHF {perfume.price_chf.toFixed(0)}</span>
          ) : (
            <span className="tile-price tile-price-open">Preis offen</span>
          )}
          <span className="tile-arrow" aria-hidden="true">→</span>
        </div>
      </div>
    </>
  );

  if (perfume.slug) {
    return (
      <Link
        className="tile tile-link tile-v2"
        href={`/duft/${perfume.slug}`}
        onClick={() => trackPerfumeView(perfume.id, perfume.slug)}
      >
        {content}
      </Link>
    );
  }
  return <div className="tile tile-v2">{content}</div>;
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
