'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import SiteHeader from '@/app/SiteHeader';
import { PerfumeTile } from '@/app/PerfumeTile';
import GiftFinder from './GiftFinder';
import '@/app/design-test/design-test.css';

interface DesignTestVariantProps {
  variant: 'a' | 'b' | 'c';
  initialCatalogCount: number;
  initialBrandCount: number;
  initialHighlights: Perfume[];
  allPerfumes: Perfume[];
}

const variantMeta = {
  a: {
    title: 'Dunkel & Edel',
    subtitle: 'Refinement des heutigen Stils – hochwertiger & ruhiger',
    description: 'Luxus-Duftberater aus Zürich – teuer, aber ehrlich und präzise.',
  },
  b: {
    title: 'Hell & Klar',
    subtitle: 'Moderne Transparenz – keine Umschweife, klare Daten',
    description: 'Duft-Discovery wie eine gute App – schnelle Ergebnisse.',
  },
  c: {
    title: 'Warm & Persönlich',
    subtitle: 'Magazine-Ästhetik – kuratiert für Schweizerinnen',
    description: 'Duft-Magazin für Schweizerinnen – persönlich, nicht Massenmarkt.',
  },
};

export default function DesignTestVariant({
  variant,
  initialCatalogCount,
  initialBrandCount,
  initialHighlights,
  allPerfumes,
}: DesignTestVariantProps) {
  const meta = variantMeta[variant];

  const getVariantStyle = () => {
    if (variant === 'b') {
      return { backgroundColor: '#ffffff', color: '#333333' };
    }
    return {};
  };

  return (
    <main className={`design-test design-test-${variant}`} style={getVariantStyle()}>
      <style>{`
        :root {
          --dt-variant: '${variant}';
        }
      `}</style>

      <SiteHeader />

      {/* Test-Info Bar (nur für Design-Test sichtbar) */}
      <div className="design-test-info">
        <div className="container">
          <p className="small">
            <strong>Design-Test Variante {variant.toUpperCase()}:</strong> {meta.title} – {meta.description}
          </p>
        </div>
      </div>

      {/* Hero mit echten Daten */}
      <section className="page-hero design-test-hero">
        <div className="hero-content">
          <div className="eyebrow">Discovery · Fragrance · Boutique</div>
          <h1>Finde deinen Signatur Duft</h1>
          <p className="hero-subtitle">
            Mit unserem Quiz und Duft-Finder in 4 Fragen zum passenden Parfüm. Über {initialCatalogCount} Düfte von {initialBrandCount} Marken – ehrliche Bewertungen, Schweizer Preise.
          </p>
          <Link href="#quiz" className="button">
            Zum Quiz
          </Link>
        </div>
      </section>

      <div className="container">
        {/* Quiz-Sektion */}
        <section className="section" id="quiz">
          <h2>Welcher Duft passt zu dir?</h2>
          <p className="lead">Beantworte 4 Fragen und wir zeigen dir die besten Empfehlungen.</p>
          <GiftFinder allPerfumes={allPerfumes} />
        </section>

        {/* Highlights */}
        {initialHighlights.length > 0 && (
          <section className="section">
            <h2>Gerade beliebt</h2>
            <div className="perfume-list">
              {initialHighlights.slice(0, 4).map((p) => (
                <PerfumeTile key={p.id} perfume={p} />
              ))}
            </div>
          </section>
        )}

        {/* Dupe-Finder Link */}
        <section className="section">
          <h2>Günstige Alternativen finden</h2>
          <p className="lead">Du liebst einen teuren Duft? Wir zeigen dir ähnliche Düfte, die deutlich weniger kosten.</p>
          <Link href="/dupes" className="button">
            Zum Dupe-Finder
          </Link>
        </section>

        {/* Info-Text */}
        <section className="section">
          <h2>Warum Auressa?</h2>
          <div className="grid-2">
            <div>
              <h3>Ehrliche Bewertungen</h3>
              <p className="small">Keine gekauften Rezensionen – nur echte Duftprofile und Vergleiche.</p>
            </div>
            <div>
              <h3>Schweizer Preise</h3>
              <p className="small">Alle Preise in CHF. Affiliate-Links zu sicheren Shops.</p>
            </div>
            <div>
              <h3>Schnell & einfach</h3>
              <p className="small">Quiz oder Dupe-Finder – in wenigen Klicks zum passenden Duft.</p>
            </div>
            <div>
              <h3>Über 400 Düfte</h3>
              <p className="small">Klassiker, Nischen, Geheimtipps – für jedes Budget und jeden Stil.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
