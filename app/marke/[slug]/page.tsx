import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { computeAuressaScore } from '@/lib/score';
import { pairTitle, versionPairs } from '@/lib/version-compare';
import { AffiliateButton } from '@/app/AffiliateButton';
import {
  concentrationLabel,
  getBrandBySlug,
  getAllBrandSlugs,
  getPerfumesByBrand,
  type Brand,
  type Perfume,
} from '@/lib/perfumes';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export async function generateStaticParams() {
  const slugs = await getAllBrandSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: 'Marke nicht gefunden' };

  const title = `${brand.name} Parfums – alle Düfte im Überblick`;
  const description =
    brand.description ||
    `Alle ${brand.name} Düfte bei Auressa: Preise, Duftprofile, Noten und – wo vorhanden – günstigere Alternativen.`;

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/marke/${slug}` },
    openGraph: { locale: 'de_CH', siteName: 'Auressa',
      images: ['/opengraph-image'],
      title: `${brand.name} Parfums | Auressa`,
      description,
      type: 'website',
      url: `${SITE_URL}/marke/${slug}`,
    },
  };
}

function brandJsonLd(brand: Brand, perfumes: Perfume[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${brand.name} Parfums`,
    description:
      brand.description ||
      `Alle ${brand.name} Düfte bei Auressa mit Duftprofil, Noten und Preisen.`,
    url: `${SITE_URL}/marke/${brand.slug}`,
    numberOfItems: perfumes.length,
  };
}

function breadcrumbJsonLd(brand: Brand) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Marken', item: `${SITE_URL}/marke` },
      { '@type': 'ListItem', position: 3, name: brand.name, item: `${SITE_URL}/marke/${brand.slug}` },
    ],
  };
}

// Familienfarben für die Badge-Labels
const FAMILY_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  floral:   { bg: '#fce8f0', color: '#8b1a4a', label: 'Blumig' },
  woody:    { bg: '#f0e8d8', color: '#5c3d1a', label: 'Holzig' },
  clean:    { bg: '#e8f4fc', color: '#1a4a6b', label: 'Frisch' },
  gourmand: { bg: '#fef3e2', color: '#7a4a0a', label: 'Gourmand' },
};

function FamilyBadge({ family }: { family: string | null }) {
  if (!family) return null;
  const cfg = FAMILY_COLORS[family] || { bg: '#f0f0f0', color: '#555', label: family };
  return (
    <span style={{
      display: 'inline-block',
      background: cfg.bg,
      color: cfg.color,
      fontSize: '0.7rem',
      fontWeight: 700,
      padding: '0.15rem 0.5rem',
      borderRadius: '20px',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}>{cfg.label}</span>
  );
}

function PerfumeCard({ p }: { p: Perfume }) {
  return (
    <div className="tile" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {/* Duftname + Familie */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.3 }}>{p.perfume_name}</h3>
        <FamilyBadge family={p.fragrance_family} />
      </div>

      {/* Preis + Geschlecht */}
      <p className="small" style={{ margin: 0, color: '#6b5344' }}>
        {p.gender === 'Women' ? 'Damen' : p.gender === 'Men' ? 'Herren' : 'Unisex'}
        {p.price_chf != null ? ` · ca. CHF ${p.price_chf}` : ''}
      </p>

      {/* Noten-Vorschau */}
      {p.top_notes && p.top_notes.length > 0 && (
        <p className="small" style={{ margin: 0, color: '#8c7060', fontStyle: 'italic' }}>
          {p.top_notes.slice(0, 3).join(', ')}
        </p>
      )}

      {/* Score-Balken */}
      {p.scentmatch_score != null && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
          <div style={{
            flex: 1,
            height: '4px',
            background: '#e8e0d4',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${p.scentmatch_score}%`,
              height: '100%',
              background: 'linear-gradient(90deg,#c8a227,#d4af37)',
              borderRadius: '2px',
            }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: '#8c7060', whiteSpace: 'nowrap' }}>
            {p.scentmatch_score}/100
          </span>
        </div>
      )}

      {/* CTAs */}
      <div className="cta" style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
        {p.slug && (
          <Link className="button secondary" href={`/duft/${p.slug}`}>
            Duftprofil
          </Link>
        )}
        <AffiliateButton perfume={p} showNote={false} />
      </div>
    </div>
  );
}

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [brand, perfumes] = await Promise.all([
    getBrandBySlug(slug),
    getPerfumesByBrand(slug),
  ]);

  if (!brand) notFound();

  // Statistiken
  const damen = perfumes.filter((p) => p.gender === 'Women').length;
  const herren = perfumes.filter((p) => p.gender === 'Men').length;
  const unisex = perfumes.filter((p) => p.gender === 'Unisex').length;
  const avgPrice = perfumes.filter((p) => p.price_chf != null).length > 0
    ? Math.round(
        perfumes.filter((p) => p.price_chf != null).reduce((s, p) => s + (p.price_chf ?? 0), 0) /
        perfumes.filter((p) => p.price_chf != null).length
      )
    : null;

  // ── Fakten aus dem Katalog (für den Abschnitt „auf einen Blick") ──────
  const FAMILY_NAME: Record<string, string> = { clean: '„frisch“', gourmand: '„süss“', woody: '„holzig“', floral: '„blumig“' };
  // Name mit Konzentration, ohne Doppelung („Terre d'Hermès Parfum" bleibt so).
  const withConc = (p: Perfume) => {
    const c = concentrationLabel(p.concentration);
    return c && !p.perfume_name.toLowerCase().includes(c.toLowerCase()) ? `${p.perfume_name} (${c})` : p.perfume_name;
  };
  const listDe = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} und ${xs[xs.length - 1]}`);
  const brandFacts: string[] = [];
  if (perfumes.length > 0) {
    const genderParts = [
      damen ? `${damen} für Damen` : '',
      herren ? `${herren} für Herren` : '',
      unisex ? `${unisex} für alle (Unisex)` : ''
    ].filter(Boolean);
    brandFacts.push(
      `Im Auressa-Katalog findest du ${perfumes.length} ${perfumes.length === 1 ? 'Duft' : 'Düfte'} von ${brand.name}${genderParts.length ? `: ${listDe(genderParts)}` : ''}. Jeder Eintrag ist mit mehreren Quellen geprüft.`
    );
    const famCount: Record<string, number> = {};
    for (const p of perfumes) if (p.fragrance_family) famCount[p.fragrance_family] = (famCount[p.fragrance_family] || 0) + 1;
    const fams = Object.entries(famCount).sort((x, y) => y[1] - x[1]);
    if (fams.length) {
      brandFacts.push(
        fams.length === 1
          ? `Alle erfassten ${brand.name}-Düfte sind ${FAMILY_NAME[fams[0][0]] || fams[0][0]}.`
          : `Die häufigste Duftrichtung ist ${FAMILY_NAME[fams[0][0]] || fams[0][0]} (${fams[0][1]} von ${perfumes.length}), daneben ${listDe(fams.slice(1).map(([f]) => FAMILY_NAME[f] || f))}.`
      );
    }
    const priced = perfumes.filter((p) => p.price_chf != null);
    if (priced.length) {
      const min = Math.round(Math.min(...priced.map((p) => p.price_chf as number)));
      const max = Math.round(Math.max(...priced.map((p) => p.price_chf as number)));
      const per100 = priced.filter((p) => p.volume_ml).map((p) => ({ p, v: Math.round(((p.price_chf as number) / (p.volume_ml as number)) * 100) }));
      const cheapest = per100.sort((x, y) => x.v - y.v)[0];
      brandFacts.push(
        `Die Richtpreise liegen ${min === max ? `bei ca. CHF ${min}` : `zwischen ca. CHF ${min} und CHF ${max}`}${cheapest ? `; am günstigsten pro 100 ml ist ${withConc(cheapest.p)} mit ca. CHF ${cheapest.v}` : ''}.`
      );
    }
    const best = [...perfumes].sort((x, y) => computeAuressaScore(y).total - computeAuressaScore(x).total)[0];
    if (best) {
      brandFacts.push(
        `Den höchsten Auressa-Score hat ${withConc(best)} mit ${computeAuressaScore(best).total}/100 – berechnet aus Preis pro 100 ml, Haltbarkeit, Vielseitigkeit und Ausstrahlung.`
      );
    }
  }
  const brandPairs = versionPairs(perfumes);

  // Beschreibung generieren, falls keine vorhanden
  const description =
    brand.description ||
    `${brand.name}${brand.country ? ` (${brand.country})` : ''} im Auressa-Katalog. ` +
    `Hier findest du ${perfumes.length} ${brand.name}-${perfumes.length === 1 ? 'Duft' : 'Düfte'} mit Duftprofil, Noten und Preisangaben.`;

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(145deg, #241912 0%, #4a3020 50%, #7a5535 100%)',
        padding: 'clamp(2.5rem, 8vw, 4.5rem) 1.25rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(212,175,55,0.8)',
            marginBottom: '0.6rem',
          }}>
            Marken-Übersicht
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            fontWeight: 700,
            color: '#f5e6d0',
            margin: '0 0 1rem',
            lineHeight: 1.15,
          }}>
            {brand.name}
            {brand.country && (
              <span style={{ display: 'block', fontSize: '0.55em', color: 'rgba(212,175,55,0.7)', fontWeight: 400, marginTop: '0.4rem' }}>
                {brand.country}
              </span>
            )}
          </h1>
          <p style={{
            fontSize: '1rem',
            color: 'rgba(245,230,208,0.75)',
            maxWidth: '520px',
            margin: '0 auto 1.5rem',
            lineHeight: 1.6,
          }}>
            {description}
          </p>

          {/* Statistik-Chips */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { label: `${perfumes.length} ${perfumes.length === 1 ? 'Duft' : 'Düfte'}`, icon: '' },
              ...(damen > 0 ? [{ label: `${damen} Damen`, icon: '' }] : []),
              ...(herren > 0 ? [{ label: `${herren} Herren`, icon: '' }] : []),
              ...(unisex > 0 ? [{ label: `${unisex} Unisex`, icon: '' }] : []),
              ...(avgPrice ? [{ label: `Ø CHF ${avgPrice}`, icon: '' }] : []),
            ].map((chip) => (
              <span key={chip.label} style={{
                background: 'rgba(212,175,55,0.12)',
                border: '1px solid rgba(212,175,55,0.25)',
                color: '#d4af37',
                borderRadius: '20px',
                padding: '0.3rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}>
                {chip.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.25rem' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation" style={{ marginBottom: '2rem' }}>
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/marke">Marken</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{brand.name}</span>
        </nav>

        {/* Düfte-Raster */}
        {perfumes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8c7060' }}>
            <p style={{ fontSize: '1.1rem' }}>Für diese Marke sind noch keine Düfte im Katalog.</p>
            <Link className="button" href="/duefte" style={{ marginTop: '1rem', display: 'inline-block' }}>
              Alle Düfte entdecken
            </Link>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#2a1d12',
              marginBottom: '1.25rem',
            }}>
              Alle {brand.name}-Düfte ({perfumes.length})
            </h2>
            <div className="perfume-list">
              {perfumes.map((p) => (
                <PerfumeCard key={p.id} p={p} />
              ))}
            </div>
          </>
        )}

        {/* Marke auf einen Blick – nur aus den geprüften Katalogdaten berechnet (keine Annahmen). */}
        {perfumes.length > 0 && (
          <section className="section card brand-facts">
            <h2>{brand.name} bei Auressa auf einen Blick</h2>
            {brandFacts.map((f) => (
              <p key={f.slice(0, 30)}>{f}</p>
            ))}
            {brandPairs.length > 0 && (
              <>
                <h3>Versionen im Vergleich</h3>
                <ul className="link-list">
                  {brandPairs.map((pr) => (
                    <li key={pr.slug}>
                      <Link href={`/unterschied/${pr.slug}`}>{pairTitle(pr)}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        )}

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
          marginTop: '3rem',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Deinen Duft gefunden?
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.4rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.75rem' }}>
            Finde deinen Match
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Unser Duft-Quiz schlägt dir in wenigen Minuten Düfte vor, die zu deinen Angaben passen.
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
            <Link href="/marke" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Alle Marken</Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandJsonLd(brand, perfumes)).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(brand)).replace(/</g, "\\u003c") }}
      />
    </main>
  );
}
