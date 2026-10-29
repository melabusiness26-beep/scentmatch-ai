'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  catalogCountLabel,
  getPerfumes,
  type Perfume
} from '@/lib/perfumes';
import { PerfumeTile, familyDisplay } from '@/app/PerfumeTile';
import { AffiliateButton } from '@/app/AffiliateButton';
import NewsletterForm from '@/app/NewsletterForm';
import { BottleIllustration } from '@/app/FragranceBottles';


// Anklickbare Familien-Kacheln (führen zur gefilterten Duftdatenbank).
const FAMILY_TILES: { code: string; label: string; desc: string }[] = [
  { code: 'clean', label: 'Clean', desc: 'Frisch & Rein' },
  { code: 'gourmand', label: 'Gourmand', desc: 'Süss & Warm' },
  { code: 'woody', label: 'Woody', desc: 'Holzig & Edel' },
  { code: 'floral', label: 'Floral', desc: 'Blumig & Romantisch' }
];

// Wählt eine ausgewogene Highlight-Auswahl: erst der bestbewertete Duft je
// Duftfamilie (für Abwechslung), dann mit den nächstbesten auffüllen.
function pickHighlights(list: Perfume[], count: number): Perfume[] {
  const sorted = [...list].sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0));
  const result: Perfume[] = [];
  const usedFamilies = new Set<string>();
  for (const p of sorted) {
    const fam = p.fragrance_family || '';
    if (!usedFamilies.has(fam)) {
      result.push(p);
      usedFamilies.add(fam);
    }
    if (result.length >= count) return result;
  }
  for (const p of sorted) {
    if (result.length >= count) break;
    if (!result.includes(p)) result.push(p);
  }
  return result.slice(0, count);
}

// Aktuelle Jahreszeit -> Anzeige, passende Saison-Werte und Ratgeber-Link.
const SEASON_LABEL: Record<string, string> = { Sommer: 'Sommer', Frühling: 'Frühling', 'Herbst/Winter': 'Herbst & Winter' };
const SEASON_MATCH: Record<string, string[]> = { Sommer: ['Sommer'], Frühling: ['Frühling'], 'Herbst/Winter': ['Herbst/Winter', 'Winter'] };
const SEASON_GUIDE: Record<string, string> = { Sommer: '/ratgeber/die-besten-sommerduefte', 'Herbst/Winter': '/ratgeber/die-besten-winterduefte' };

// Fallback, falls die Datenbank (noch) nicht erreichbar ist.
// Diese Highlights werden dynamisch nach dem Load aus dem Katalog geholt,
// aber wir brauchen Platzhalter für schnelles initiales Render.
// Die Slugs werden auf dem Client später durch echte Daten aus Supabase ersetzt.
const starterPerfumes: Perfume[] = [];

// Echte Homepage-Highlights – diese Slugs sind eindeutig und werden
// bei der Katalog-Abfrage automatisch matcht mit den echten Duft-Daten.
const HIGHLIGHT_SLUGS: string[] = []; // Empty - database reset, no highlights

interface HomeClientProps {
  initialCatalogCount?: number | null;
  initialBrandCount?: number | null;
  initialHighlights?: Perfume[];
}

export default function Home({ initialCatalogCount, initialBrandCount, initialHighlights }: HomeClientProps = {}) {
  const [currentSeason, setCurrentSeason] = useState('');
  const [perfumes, setPerfumes] = useState<Perfume[]>(starterPerfumes);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadData() {
      // Database is empty - don't load any perfumes
      const perfumeData: any[] = [];
      if (perfumeData.length > 0) setPerfumes(perfumeData);
      setLoaded(true);
    }
    loadData();

    const m = new Date().getMonth();
    if (m >= 5 && m <= 7) setCurrentSeason('Sommer');
    else if (m >= 2 && m <= 4) setCurrentSeason('Frühling');
    else setCurrentSeason('Herbst/Winter');
  }, []);

  // Ausgewogene Highlight-Auswahl für die Startseite (vor dem Quiz).
  // Priorität: initialHighlights (vom Server SSR) → Fallback zur Client-Berechnung.
  const highlights = initialHighlights && initialHighlights.length > 0
    ? initialHighlights.slice(0, 3)
    : pickHighlights(perfumes, 3);
  // Echte Katalog-Kennzahlen aus den geladenen Düften – keine erfundenen Werte.
  // Priorität: initialCatalogCount (vom Server SSR) → Fallback zur Client-Berechnung.
  const catalogCount = initialCatalogCount ?? (loaded ? perfumes.length : null);
  const countLabel = catalogCountLabel(catalogCount);
  const brandCount = initialBrandCount ?? (loaded
    ? new Set(perfumes.map((p) => p.brands?.name).filter(Boolean)).size
    : null);

  const seasonLabel = SEASON_LABEL[currentSeason] || '';
  const seasonMatch = SEASON_MATCH[currentSeason] || [];
  const seasonGuide = SEASON_GUIDE[currentSeason];

  // Intelligenter Saison-Mix: Zielgruppe 20–40 Jahre (Budget max CHF 150)
  // Mix nach Preis UND Anlass: Alltag + Date + Abend (keine unrealistischen Preise)
  function pickSmartSeasonalMix(list: Perfume[], seasonMatches: string[]): Perfume[] {
    // Filter: nur realistische Preise für Zielgruppe (max CHF 150)
    const seasonal = list.filter(p =>
      p.season && seasonMatches.includes(p.season) && p.price_chf && p.price_chf <= 150
    );
    if (seasonal.length === 0) return [];

    const byScore = [...seasonal].sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0));
    const byPrice = [...seasonal].sort((a, b) => (a.price_chf || 0) - (b.price_chf || 0));

    const picked = new Set<string>();
    const result: Perfume[] = [];

    // 1. Billigster Duft (unter CHF 80) – Einstiegspunkt
    const cheapest = byPrice.find(p => p.price_chf && p.price_chf < 80);
    if (cheapest) {
      result.push(cheapest);
      picked.add(cheapest.id);
    }

    // 2. Bestes Alltag/Büro-Duft
    const bestDaily = byScore.find(p => (p.occasion === 'Alltag' || p.occasion === 'Büro') && !picked.has(p.id));
    if (bestDaily) {
      result.push(bestDaily);
      picked.add(bestDaily.id);
    }

    // 3. Bestes Date-Duft
    const bestDate = byScore.find(p => p.occasion === 'Date' && !picked.has(p.id));
    if (bestDate) {
      result.push(bestDate);
      picked.add(bestDate.id);
    }

    // 4. Bestes Abend-Duft
    const bestEvening = byScore.find(p => p.occasion === 'Abend' && !picked.has(p.id));
    if (bestEvening) {
      result.push(bestEvening);
      picked.add(bestEvening.id);
    }

    // 5–6. Weitere beste Düfte nach Score (bis zu 6 insgesamt)
    for (const p of byScore) {
      if (result.length >= 6) break;
      if (!picked.has(p.id)) {
        result.push(p);
        picked.add(p.id);
      }
    }

    return result;
  }

  const seasonalPerfumes = currentSeason ? pickSmartSeasonalMix(perfumes, seasonMatch) : [];

  // Weihnachts-Banner: Client-seitige Datumsprüfung (1. Nov – 24. Dez, Europe/Zurich)
  const [showGiftBanner, setShowGiftBanner] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Prüfe ?banner=test Parameter (nur in Preview erlaubt)
    const params = new URLSearchParams(window.location.search);
    const bannerTest = params.has('banner') && params.get('banner') === 'test';
    const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview';

    if (bannerTest && isPreview) {
      setShowGiftBanner(true);
      return;
    }

    // Datum IMMER prüfen (Europe/Zurich), unabhängig von Umgebung
    const now = new Date();
    const zurich = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Zurich' }));
    const month = zurich.getMonth() + 1;
    const date = zurich.getDate();

    const isNovDec = (month === 11) || (month === 12 && date <= 24);
    setShowGiftBanner(isNovDec);
  }, []);

  return (
    <main>
      {showGiftBanner && (
        <div className="gift-banner">
          <div className="container">
            <p className="gift-banner-text">🎁 Suchst du noch das perfekte Weihnachtsgeschenk? Unser <strong>Geschenk-Finder</strong> zeigt dir in 4 Fragen die besten Parfüm-Empfehlungen.</p>
            <Link href="/geschenk-finder" className="gift-banner-cta">Zum Geschenk-Finder →</Link>
          </div>
        </div>
      )}
      <div className="container">
        <section className="section quiz-hero">
          <p className="eyebrow">Duft-Quiz</p>
          <h2>Finde deinen Signature Duft in 10 Fragen</h2>
          <p className="lead">Beantworte ein paar einfache Fragen und lass unsere Match-Engine einen Duft finden, der wirklich zu dir passt. Personalisiert nach Geschmack, Budget, Saison und Anlass.</p>
          <div className="cta">
            <Link className="button" href="/quiz">Quiz starten</Link>
          </div>
        </section>

        <section className="section trust-section">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-icon">✅</div>
              <div className="trust-text">
                <p className="trust-stat"><strong>{countLabel ? `${countLabel.replace('über', 'Über')} Düfte` : 'Geprüfte Düfte'}</strong></p>
                <p className="small">durchsuche unseren Katalog</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">⭐</div>
              <div className="trust-text">
                <p className="trust-stat"><strong>Quiz in 2 Min</strong></p>
                <p className="small">finde deinen perfekten Duft blitzschnell</p>
              </div>
            </div>
            <div className="trust-item">
              <div className="trust-icon">🎯</div>
              <div className="trust-text">
                <p className="trust-stat"><strong>Sofort entdecken</strong></p>
                <p className="small">keine Anmeldung zum Starten nötig</p>
              </div>
            </div>
          </div>
        </section>

        {seasonalPerfumes.length > 0 && (
          <section className="section">
            <p className="eyebrow">Saison-Empfehlung</p>
            <h2>Passend zur Jahreszeit · {seasonLabel}</h2>
            <p className="small">Gerade ist {seasonLabel} – diese Düfte passen jetzt besonders gut.</p>
            <div className="perfume-list">
              {seasonalPerfumes.map(p => (
                <PerfumeTile perfume={p} key={p.id} showOccasionDescription={true} />
              ))}
            </div>
            {seasonGuide && (
              <div className="cta">
                <Link className="button secondary" href={seasonGuide}>Mehr {seasonLabel}-Düfte im Ratgeber</Link>
              </div>
            )}
          </section>
        )}

        <section className="section">
          <p className="eyebrow">Duftrichtungen</p>
          <h2>Entdecke nach Stil</h2>
          <div className="grid">
            {FAMILY_TILES.map(t => (
              <Link
                key={t.code}
                className="tile tile-family"
                href={`/duefte?family=${t.code}`}
              >
                <div className="bottle-container">
                  <img src={`/bottles/${t.code}.png`} alt={`${t.label} Duftflasche`} style={{ width: '100%', height: 'auto', maxWidth: '140px' }} />
                </div>
                <h3>{t.label}</h3>
                <p className="small">{t.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Neu · Der Dupe-Finder</p>
          <h2>Teuren Lieblingsduft eingeben, günstigen Zwilling finden.</h2>
          <p className="small">Gib den Duft ein, den du liebst – wir zeigen dir ähnlich riechende Alternativen aus unserem Katalog, die weniger kosten.</p>
          <div className="cta">
            <Link className="button" href="/dupes">Dupe-Finder starten</Link>
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Duft nach Gefühl</p>
          <h2>Keine Lust auf ein Quiz? Geh nach Gefühl.</h2>
          <p className="small">Sag einfach, wonach dir gerade ist – ob verwöhnen, runterkommen, stark fühlen oder strahlen. Wir zeigen dir sofort passende Düfte.</p>
          <div className="cta">
            <Link className="button" href="/stimmungen">Nach Gefühl finden</Link>
          </div>
        </section>


      </div>
    </main>
  );
}
