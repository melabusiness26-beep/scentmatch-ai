import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';
import { getPerfumes, isWithinPriceCap } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';
import { computeAuressaScore } from '@/lib/score';

// Stündlich neu erzeugen: neue Düfte und die aktuelle Jahreszeit erscheinen automatisch.
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Düfte nach Jahreszeit: Frühling bis Winter',
  description:
    'Düfte, die zu jeder Jahreszeit passen: frische Sommerdüfte, warme Winterdüfte, blumige Frühlingsdüfte und gemütliche Herbstdüfte – aus dem Auressa-Katalog, sortiert nach Auressa-Score.',
  alternates: { canonical: `${SITE_URL}/saisonal` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Saisonale Duft-Empfehlungen | Auressa',
    description: 'Passende Düfte für jede Jahreszeit – Frühling, Sommer, Herbst, Winter.',
    url: `${SITE_URL}/saisonal`,
    type: 'website'
  }
};

export default async function SaisonalPage() {
  const perfumes = await getPerfumes(2000);

  const seasons = [
    {
      name: 'Frühling',
      emoji: '🌸',
      icon: '🌸',
      description: 'Blumig, leicht und erfrischend – wie der Duft eines Blumenmarkts',
      colors: ['#F8E8D8', '#F0D4B8'],
      characteristics: ['Blumig', 'Frisch', 'Leicht'],
      seasonKey: 'Frühling'
    },
    {
      name: 'Sommer',
      emoji: '☀️',
      icon: '☀️',
      description: 'Zitrus und Aquatisch – perfekt für warme Tage und Strandtage',
      colors: ['#E8F4F8', '#C8E6F0'],
      characteristics: ['Zitrus', 'Aquatisch', 'Frisch'],
      seasonKey: 'Sommer'
    },
    {
      name: 'Herbst',
      emoji: '🍂',
      icon: '🍂',
      description: 'Warm, würzig und gemütlich – wie Blätter und geröstete Noten',
      colors: ['#E8D8C8', '#D4B894'],
      characteristics: ['Würzig', 'Warm', 'Woody'],
      seasonKey: 'Herbst'
    },
    {
      name: 'Winter',
      emoji: '❄️',
      icon: '❄️',
      description: 'Intensive, warme und tröstende Düfte – für Gemütlichkeit und Eleganz',
      colors: ['#E8D8E8', '#D4C0D4'],
      characteristics: ['Warm', 'Intensiv', 'Animalisch'],
      seasonKey: 'Winter'
    },
    {
      name: 'Das ganze Jahr',
      emoji: '🌍',
      icon: '🌍',
      description: 'Vielseitige Düfte, die in jeder Jahreszeit gut funktionieren',
      colors: ['#EFE7DA', '#E0D2BC'],
      characteristics: ['Vielseitig', 'Ausgewogen', 'Ganzjährig'],
      seasonKey: 'Ganzjährig'
    }
  ];

  // Im Katalog gibt es die Werte Frühling, Sommer, Herbst/Winter, Winter und Ganzjährig.
  // „Herbst/Winter" gehört in beide Abschnitte; ganzjährige Düfte haben einen eigenen Abschnitt.
  const matchesSeason = (season: string | null | undefined, key: string) => {
    if (!season) return false;
    if (key === 'Herbst') return season === 'Herbst' || season === 'Herbst/Winter';
    if (key === 'Winter') return season === 'Winter' || season === 'Herbst/Winter';
    return season === key;
  };

  const getSeasonalPerfumes = (seasonKey: string) => {
    return perfumes
      .filter(p => matchesSeason(p.season, seasonKey) && p.slug)
      .filter(isWithinPriceCap)
      .sort((a, b) => computeAuressaScore(b).total - computeAuressaScore(a).total)
      .slice(0, 8);
  };

  // Aktuelle Jahreszeit nach Schweizer Zeit (nicht UTC).
  const getCurrentSeasonKey = () => {
    const month = Number(new Intl.DateTimeFormat('en', { month: 'numeric', timeZone: 'Europe/Zurich' }).format(new Date())) - 1;
    if (month >= 2 && month <= 4) return 'Frühling';
    if (month >= 5 && month <= 7) return 'Sommer';
    if (month >= 8 && month <= 10) return 'Herbst';
    return 'Winter';
  };

  const currentSeason = getCurrentSeasonKey();

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Saisonale Empfehlungen', href: '/saisonal' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '240px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Jahreszeit
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Düfte für jede Jahreszeit
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.7)', margin: 0 }}>
            Der richtige Duft zur richtigen Zeit – hier findest du die Düfte aus unserem Katalog, die für Frühling, Sommer, Herbst, Winter oder das ganze Jahr eingetragen sind, sortiert nach dem Auressa-Score.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Warum die Jahreszeit wichtig ist
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', maxWidth: '600px', margin: '0 auto' }}>
            Ein warmer, intensiver Duft kann an heissen Sommertagen erdrückend wirken. Ein frischer, leichter Duft kann im tiefsten Winter dünn wirken. Ein Tipp: Mit zwei, drei Düften, die sich ergänzen, bist du das ganze Jahr gut ausgestattet.
          </p>
        </section>

        {/* Seasonal Sections */}
        {seasons.map((season) => {
          const seasonalPerfumes = getSeasonalPerfumes(season.seasonKey);
          return (
            <section key={season.seasonKey} style={{ marginBottom: '4rem' }}>
              <div style={{
                background: season.seasonKey === currentSeason ? 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.08))' : 'transparent',
                borderRadius: '16px',
                padding: season.seasonKey === currentSeason ? '2rem 1.5rem 0' : 0,
                border: season.seasonKey === currentSeason ? '2px solid rgba(212,175,55,0.3)' : 'none'
              }}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '2rem' }}>{season.emoji}</span>
                    <div>
                      <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', margin: 0 }}>
                        {season.name}
                      </h2>
                      {season.seasonKey === currentSeason && (
                        <p style={{ fontSize: '0.85rem', color: '#8A6D1A', fontWeight: 600, margin: '0.25rem 0 0 0' }}>
                          🎯 Jetzt Saison
                        </p>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '1.05rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
                    {season.description}
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                    {season.characteristics.map((char) => (
                      <span
                        key={char}
                        style={{
                          display: 'inline-block',
                          background: 'rgba(212,175,55,0.1)',
                          color: '#8A6D1A',
                          padding: '0.4rem 0.8rem',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                {seasonalPerfumes.length > 0 ? (
                  <div className="perfume-list">
                    {seasonalPerfumes.map((p) => (
                      <PerfumeTile perfume={p} key={p.id} />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: '2rem 1rem', textAlign: 'center', color: '#8B7355' }}>
                    <p>Für diese Jahreszeit ist noch kein geprüfter Duft im Katalog – wir erweitern ihn laufend. Bis dahin passen die ganzjährigen Düfte weiter unten auch jetzt.</p>
                  </div>
                )}
              </div>
            </section>
          );
        })}

        {/* Tipps */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          color: '#faf7f2',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', marginTop: 0 }}>
            💡 Tipps für saisonale Duftpflege
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Schicht-Strategie',
                text: 'Nutze im Winter stärkere Düfte, im Sommer schwächere. Du kannst zwei Düfte kombinieren (Layering).'
              },
              {
                title: 'Warme vs. Kalte Tage',
                text: 'An warmen Tagen: Zitrus, Aquatisch. An kalten Tagen: Warm, Holzig, Würzig.'
              },
              {
                title: 'Der Übergangslook',
                text: 'Im Frühling und Herbst: Wähle einen Duft, der zwischen zwei Jahreszeiten steht. Floral-Frisch für den Übergang.'
              }
            ].map((tip) => (
              <div key={tip.title}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', marginTop: 0 }}>
                  {tip.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                  {tip.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.25rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Deinen perfekten saisonalen Duft finden
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Nutze unser Quiz oder durchstöbere den gesamten Katalog mit Filtern.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/quiz"
              style={{
                display: 'inline-block',
                background: '#d4af37',
                color: '#2a1d12',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Quiz starten
            </Link>
            <Link
              href="/duefte"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#2a1d12',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #d4af37',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Katalog durchsuchen
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
