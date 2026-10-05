import type { Metadata } from 'next';
import { getPerfumes, getPerfumeCount, getBrandCount } from '@/lib/perfumes';
import Link from 'next/link';
import { PerfumeTile } from '@/app/PerfumeTile';
import SiteHeader from '@/app/SiteHeader';
import GiftFinder from '@/app/components/GiftFinder';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

const HIGHLIGHT_SLUGS = ['baccarat-rouge-540', 'black-opium', 'tobacco-vanille', '1-million'];

export default async function DesignTestBPage() {
  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];
  let catalogCount = 0;
  let brandCount = 0;
  let highlightPerfumes = [];

  try {
    const [count, brands] = await Promise.all([getPerfumeCount(), getBrandCount()]);
    catalogCount = count;
    brandCount = brands;

    perfumes = await getPerfumes(2000);

    highlightPerfumes = perfumes
      .filter((p) => HIGHLIGHT_SLUGS.includes(p.slug || ''))
      .filter((p) => !p.perfume_name?.toLowerCase().includes('auressa'))
      .slice(0, 4);

    if (highlightPerfumes.length < 4) {
      const topPerfumes = perfumes
        .filter((p) => !p.perfume_name?.toLowerCase().includes('auressa'))
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 6 - highlightPerfumes.length);
      highlightPerfumes = [...highlightPerfumes, ...topPerfumes];
    }
  } catch (error) {
    console.error('Failed to load design test data:', error);
  }

  return (
    <DesignTestBClient
      catalogCount={catalogCount}
      brandCount={brandCount}
      highlights={highlightPerfumes}
      allPerfumes={perfumes}
    />
  );
}

function DesignTestBClient({
  catalogCount,
  brandCount,
  highlights,
  allPerfumes,
}: {
  catalogCount: number;
  brandCount: number;
  highlights: any[];
  allPerfumes: any[];
}) {
  return (
    <main
      style={{
        backgroundColor: '#ffffff',
        color: '#333333',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
        lineHeight: '1.6',
        minHeight: '100vh',
      }}
    >
      <SiteHeader />

      {/* Test-Info Bar */}
      <div
        style={{
          backgroundColor: '#f9f9f9',
          borderBottom: '1px solid rgba(26, 48, 40, 0.1)',
          padding: '12px 20px',
          fontSize: '13px',
          textAlign: 'center',
          color: '#333333',
        }}
      >
        <div className="container">
          <p style={{ margin: 0 }}>
            <strong>Design-Test Variante B:</strong> Hell & Klar – Duft-Discovery wie eine gute App –
            schnelle Ergebnisse.
          </p>
        </div>
      </div>

      {/* Hero */}
      <section
        style={{
          padding: '48px 20px',
          textAlign: 'center',
          margin: 0,
          borderRadius: 0,
          background: 'linear-gradient(135deg, rgba(26, 48, 40, 0.05) 0%, transparent 60%)',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ color: '#1a3028', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
            Discovery · Fragrance · Boutique
          </div>
          <h1
            style={{
              fontSize: '36px',
              margin: '12px 0 16px',
              lineHeight: '1.2',
              color: '#1a3028',
              fontWeight: 700,
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            }}
          >
            Finde deinen Signatur Duft
          </h1>
          <p
            style={{
              fontSize: '17px',
              maxWidth: '520px',
              margin: '12px auto 24px',
              opacity: 0.9,
              color: '#333333',
              lineHeight: '1.6',
            }}
          >
            Mit unserem Quiz und Duft-Finder in 4 Fragen zum passenden Parfüm. Über {catalogCount} Düfte
            von {brandCount} Marken – ehrliche Bewertungen, Schweizer Preise.
          </p>
          <Link
            href="#quiz"
            style={{
              marginTop: '12px',
              backgroundColor: '#1a3028',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
          >
            Zum Quiz
          </Link>
        </div>
      </section>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {/* Quiz Section */}
        <section
          id="quiz"
          style={{
            margin: '40px 0',
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid rgba(26, 48, 40, 0.08)',
            boxShadow: 'none',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: '26px',
              color: '#1a3028',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Welcher Duft passt zu dir?
          </h2>
          <p
            style={{
              opacity: 0.85,
              fontSize: '17px',
              lineHeight: '1.6',
              color: '#333333',
              margin: 0,
            }}
          >
            Beantworte 4 Fragen und wir zeigen dir die besten Empfehlungen.
          </p>
          <div style={{ marginTop: '20px' }}>
            <GiftFinder allPerfumes={allPerfumes} />
          </div>
        </section>

        {/* Highlights */}
        {highlights.length > 0 && (
          <section
            style={{
              margin: '40px 0',
              padding: '32px',
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              border: '1px solid rgba(26, 48, 40, 0.08)',
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: '26px',
                color: '#1a3028',
                fontWeight: 700,
                marginBottom: '12px',
              }}
            >
              Gerade beliebt
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '16px',
                marginTop: '16px',
              }}
            >
              {highlights.slice(0, 4).map((p) => (
                <PerfumeTile key={p.id} perfume={p} />
              ))}
            </div>
          </section>
        )}

        {/* Dupe Finder */}
        <section
          style={{
            margin: '40px 0',
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid rgba(26, 48, 40, 0.08)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: '26px',
              color: '#1a3028',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Günstige Alternativen finden
          </h2>
          <p
            style={{
              opacity: 0.85,
              fontSize: '17px',
              lineHeight: '1.6',
              color: '#333333',
              margin: 0,
            }}
          >
            Du liebst einen teuren Duft? Wir zeigen dir ähnliche Düfte, die deutlich weniger kosten.
          </p>
          <Link
            href="/dupes"
            style={{
              marginTop: '16px',
              backgroundColor: '#1a3028',
              color: '#ffffff',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
          >
            Zum Dupe-Finder
          </Link>
        </section>

        {/* Info Section */}
        <section
          style={{
            margin: '40px 0',
            padding: '32px',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid rgba(26, 48, 40, 0.08)',
          }}
        >
          <h2
            style={{
              marginTop: 0,
              fontSize: '26px',
              color: '#1a3028',
              fontWeight: 700,
              marginBottom: '12px',
            }}
          >
            Warum Auressa?
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px',
              marginTop: '16px',
            }}
          >
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '16px',
                  color: '#1a3028',
                  fontWeight: 700,
                }}
              >
                Ehrliche Bewertungen
              </h3>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>
                Keine gekauften Rezensionen – nur echte Duftprofile und Vergleiche.
              </p>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '16px',
                  color: '#1a3028',
                  fontWeight: 700,
                }}
              >
                Schweizer Preise
              </h3>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>
                Alle Preise in CHF. Affiliate-Links zu sicheren Shops.
              </p>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '16px',
                  color: '#1a3028',
                  fontWeight: 700,
                }}
              >
                Schnell & einfach
              </h3>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>
                Quiz oder Dupe-Finder – in wenigen Klicks zum passenden Duft.
              </p>
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px',
                  fontSize: '16px',
                  color: '#1a3028',
                  fontWeight: 700,
                }}
              >
                Über 400 Düfte
              </h3>
              <p style={{ margin: 0, color: '#666666', fontSize: '14px' }}>
                Klassiker, Nischen, Geheimtipps – für jedes Budget und jeden Stil.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
