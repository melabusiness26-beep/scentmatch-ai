import type { Metadata } from 'next';
import Link from 'next/link';
import LineIcon, { guideIcon } from '@/app/LineIcon';
import Breadcrumb from '@/app/Breadcrumb';
import { guides, guideCategories, getGuide, type Guide } from '@/lib/guides';

// Täglich neu erzeugen, damit die Jahreszeiten-Reihenfolge stimmt.
export const revalidate = 86400;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft-Ratgeber: Tipps, Dupes & Empfehlungen',
  description:
    'Ehrliche Duft-Ratgeber aus der Schweiz: günstige Alternativen zu teuren Parfüms, Saisonempfehlungen, Hauttyp-Tipps und welcher Duft zu welchem Anlass passt.',
  alternates: { canonical: `${SITE_URL}/ratgeber` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duft-Ratgeber | Auressa',
    description: 'Günstige Dupes, Saisonempfehlungen, Hauttyp-Tipps und Duft-Wissen für jeden.',
    type: 'website',
    url: `${SITE_URL}/ratgeber`
  }
};

// Linien-Symbol pro Kategorie
const CATEGORY_ICONS: Record<string, string> = {
  'Nach Jahreszeit': 'leaf',
  'Nach Duftart': 'flower',
  'Für Anlass & Typ': 'target',
  'Günstig & Dupes': 'tag',
  'Marken & Besonderes': 'sparkle',
  'Wissen & Tipps': 'book',
  'Weitere Ratgeber': 'book',
};

interface ExternalGuide {
  slug: string;
  title: string;
  description: string;
  href: string;
}

function GuideTiles({ items }: { items: Guide[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '1rem',
    }}>
      {items.map((guide) => (
        <Link
          key={guide.slug}
          href={`/ratgeber/${guide.slug}`}
          className="guide-tile"
        >
          <span className="guide-tile-icon"><LineIcon name={guideIcon(guide.slug)} size={22} /></span>
          <h3 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#2a1d12',
            margin: 0,
            lineHeight: 1.35,
          }}>{guide.title}</h3>
          <p style={{
            fontSize: '0.8rem',
            color: '#6b5344',
            lineHeight: 1.55,
            margin: 0,
            flexGrow: 1,
          }}>{guide.description}</p>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#8A6D1A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginTop: 'auto',
          }}>Lesen →</span>
        </Link>
      ))}
    </div>
  );
}

function ExternalGuideTiles({ items }: { items: ExternalGuide[] }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
      gap: '1rem',
    }}>
      {items.map((guide) => (
        <Link
          key={guide.slug}
          href={guide.href}
          className="guide-tile"
        >
          <span className="guide-tile-icon"><LineIcon name={guideIcon(guide.slug)} size={22} /></span>
          <h3 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: '1rem',
            fontWeight: 700,
            color: '#2a1d12',
            margin: 0,
            lineHeight: 1.35,
          }}>{guide.title}</h3>
          <p style={{
            fontSize: '0.8rem',
            color: '#6b5344',
            lineHeight: 1.55,
            margin: 0,
            flexGrow: 1,
          }}>{guide.description}</p>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#8A6D1A',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            marginTop: 'auto',
          }}>Lesen →</span>
        </Link>
      ))}
    </div>
  );
}

export default function RatgeberIndex() {
  // Externe Guides (eigenständige Seiten)
  const externalGuides: ExternalGuide[] = [
    {
      slug: 'nische-mainstream',
      title: 'Nische vs. Mainstream Düfte',
      description: 'Verstehe den Unterschied zwischen Niche-Parfümen und Mainstream-Düften – Qualität, Einzigartigkeit, Preis und Verfügbarkeit.',
      href: '/nische-mainstream'
    },
    {
      slug: 'duftpersoenlichkeit',
      title: 'Duftpersönlichkeit: Dein Charakter im Duft',
      description: 'Entdecke, wie deine Persönlichkeit deinen idealen Duft formt. Von klassischen bis modernen Typen – finde heraus, welche Duftfamilien zu dir passen.',
      href: '/duftpersoenlichkeit'
    },
    {
      slug: 'duftchemie-grundlagen',
      title: 'Duftchemie & Physik: Wie Düfte wirklich funktionieren',
      description: 'Lerne die Wissenschaft hinter Düften: Pyramide, Volatilität, Konzentration, Körperchemie und warum ein Duft auf dir anders riecht.',
      href: '/duftchemie-grundlagen'
    },
    {
      slug: 'duftkollektion-minimal',
      title: 'Minimalistische Duftkollektion: Die intelligente 3er-Sammlung',
      description: 'Baue dir eine perfekte Kollektion mit nur 3 Düften: Alltags-Duft, Abend-Duft, Saison-Duft. Strategisch, flexibel, skalierbar.',
      href: '/duftkollektion-minimal'
    },
    {
      slug: 'duftnoten-guide',
      title: 'Duftnoten verstehen: Kopf-, Herz- und Basisnoten',
      description: 'Wie die Duftpyramide aufgebaut ist und warum sich ein Parfum über den Tag verändert.',
      href: '/duftnoten-guide'
    },
    {
      slug: 'duftsammlung',
      title: 'Duftsammlung aufbauen: vom ersten bis zum perfekten Duft-Schrank',
      description: 'Schritt für Schritt zur eigenen Sammlung – welche Düfte sich ergänzen und worauf du achten kannst.',
      href: '/duftsammlung'
    },
    {
      slug: 'duft-lagerung',
      title: 'Parfum richtig lagern',
      description: 'Licht, Wärme und Luft: So bleibt dein Parfum möglichst lange so, wie es sein soll.',
      href: '/duft-lagerung'
    },
    {
      slug: 'duft-mythen',
      title: 'Duft-Mythen und Fakten: Was stimmt wirklich?',
      description: 'Teuer gleich besser? Handgelenke reiben? Die häufigsten Parfum-Irrtümer im Faktencheck.',
      href: '/duft-mythen'
    }
  ];

  // Kategorien mit ihren Artikeln auflösen.
  // Jahreszeiten-Ratgeber: die aktuelle (und die nächste) Saison zuerst – im November also
  // Herbst und Winter statt Sommer. Reihenfolge nach Schweizer Zeit.
  const month = Number(new Intl.DateTimeFormat('en', { month: 'numeric', timeZone: 'Europe/Zurich' }).format(new Date()));
  const order = month >= 3 && month <= 5 ? ['fruehling', 'sommer', 'herbst', 'winter']
    : month >= 6 && month <= 8 ? ['sommer', 'herbst', 'winter', 'fruehling']
    : month >= 9 && month <= 11 ? ['herbst', 'winter', 'fruehling', 'sommer']
    : ['winter', 'fruehling', 'sommer', 'herbst'];
  const seasonRank = (slug: string) => {
    const i = order.findIndex((k) => slug.includes(k));
    return i === -1 ? order.length : i;
  };
  const categorized = guideCategories.map((cat) => {
    const items = cat.slugs.map((s) => getGuide(s)).filter((g): g is Guide => Boolean(g));
    return {
      title: cat.title,
      items: cat.title === 'Nach Jahreszeit'
        ? [...items].sort((a, b) => seasonRank(a.slug) - seasonRank(b.slug))
        : items
    };
  });

  // Artikel, die in keiner Kategorie stehen, sammeln (Sicherheitsnetz).
  const inCategory = new Set(guideCategories.flatMap((c) => c.slugs));
  const weitere = guides.filter((g) => !inCategory.has(g.slug));

  const totalGuides = guides.length + externalGuides.length;

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Ratgeber', href: '/ratgeber' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '260px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '620px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Ratgeber
          </p>
          <h1 style={{
            fontSize: 'clamp(26px, 6vw, 42px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duft-Ratgeber
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: '0 0 1.5rem 0' }}>
            {totalGuides} ehrliche Ratgeber zu Düften, Dupes, Saisonempfehlungen und Parfüm-Wissen.
            Kein Fachjargon, keine versteckte Werbung.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              display: 'inline-block',
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
            }}>Quiz starten</Link>
            <Link href="/duft-detektiv" style={{
              display: 'inline-block',
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.65rem 1.35rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.875rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Duft-Detektiv</Link>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {categorized.map((cat) =>
          cat.items.length > 0 ? (
            <section key={cat.title} style={{ marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
                <span style={{ color: 'var(--gold-text)', display: 'inline-flex' }}><LineIcon name={CATEGORY_ICONS[cat.title] ?? 'book'} size={22} /></span>
                <h2 style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: '#2a1d12',
                  margin: 0,
                }}>{cat.title}</h2>
              </div>
              <GuideTiles items={cat.items} />
            </section>
          ) : null
        )}

        {weitere.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--gold-text)', display: 'inline-flex' }}><LineIcon name="book" size={22} /></span>
              <h2 style={{
                fontFamily: "var(--font-display), Georgia, serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#2a1d12',
                margin: 0,
              }}>Weitere Ratgeber</h2>
            </div>
            <GuideTiles items={weitere} />
          </section>
        )}

        {/* Externe Guides */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <span style={{ color: 'var(--gold-text)', display: 'inline-flex' }}><LineIcon name="check" size={22} /></span>
            <h2 style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: '1.4rem',
              fontWeight: 700,
              color: '#2a1d12',
              margin: 0,
            }}>Tiefgang: Wissen & Theorie</h2>
          </div>
          <ExternalGuideTiles items={externalGuides} />
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Kein Ratgeber passend?
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.75rem' }}>
            Finde deinen Duft mit Quiz &amp; Duft-Detektiv
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Unser Duft-Quiz und der Duft-Detektiv finden deinen persönlichen Match – in wenigen Minuten.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}>Quiz starten</Link>
            <Link href="/duft-detektiv" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Duft-Detektiv</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
