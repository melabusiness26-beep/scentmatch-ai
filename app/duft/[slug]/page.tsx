import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OlfactoryPyramide } from '@/app/OlfactoryPyramid';
import {
  getPerfumeBySlug,
  getAllPerfumeSlugs,
  getPerfumes,
  describePerfume,
  type Perfume
} from '@/lib/perfumes';
import { findSimilarPerfumesV2, findCheaperAlternativesV2 } from '@/lib/similarity';
import { noteHref } from '@/lib/notes-glossary';
import { getCuratedLink } from '@/lib/curated-links';
import { AffiliateButton } from '@/app/AffiliateButton';
import { AmazonButton } from '@/app/AmazonButton';
import { SocialShareButtons } from '@/app/SocialShareButtons';

const genderLabels: Record<string, string> = {
  Women: 'Damenduft',
  Men: 'Herrenduft',
  Unisex: 'Unisex-Duft'
};

// Kurzes Geschlechts-Label + Symbol für die Badge (passend zu den Duft-Kacheln).
const genderBadge: Record<string, string> = {
  Women: 'Weiblich',
  Men: 'Männlich',
  Unisex: 'Unisex'
};
const genderSymbol: Record<string, string> = {
  Women: '♀',
  Men: '♂',
  Unisex: '⚥'
};

// Detailseiten werden stündlich neu generiert (frische Daten, schnelle Auslieferung).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

const familyLabels: Record<string, string> = {
  clean: 'Clean / Frisch',
  gourmand: 'Gourmand / Süss',
  woody: 'Woody / Holzig',
  floral: 'Floral / Blumig'
};

function familyLabel(code: string | null): string {
  if (!code) return 'Duftfamilie offen';
  return familyLabels[code] || code;
}

// Kürzt einen Text auf sinnvolle Meta-Description-Länge (an der Wortgrenze).
function metaTrim(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trim()}…`;
}

// Erzeugt alle Duftseiten beim Build vor (gut für SEO und Tempo).
export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) {
    return { title: 'Duft nicht gefunden' };
  }

  const brand = perfume.brands?.name ? ` von ${perfume.brands.name}` : '';
  // Haupttitel ohne „| Auressa" – die Marke haengt das globale Titel-Template
  // (%s | Auressa) automatisch an. So entsteht kein doppeltes „| Auressa".
  const title = `${perfume.perfume_name}${brand} – Duftprofil & Bewertung`;
  // Abwechslungsreiche Beschreibung aus echten Duftdaten (statt gleicher Schablone
  // auf hunderten Seiten) – gut gegen „dünnen/doppelten Inhalt".
  const description = metaTrim(perfume.description || describePerfume(perfume));

  return {
    title,
    description,
    alternates: { canonical: `/duft/${slug}` },
    openGraph: {
      title: `${title} | Auressa`,
      description,
      type: 'article',
      url: `${SITE_URL}/duft/${slug}`
    }
  };
}

function Cover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  const className = `cover${large ? ' cover-large' : ''} cover-${perfume.fragrance_family || ''}`;
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

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-row">
      <span className="small">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

// Visueller Balken für Scores (0–10 oder 0–100)
function ScoreBar({ label, value, max = 10 }: { label: string; value: number | null | undefined; max?: number }) {
  if (value == null) return <StatRow label={label} value="–" />;
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: '0.78rem', color: '#6b5344' }}>{label}</span>
        <strong style={{ fontSize: '0.85rem', color: '#2a1d12' }}>{value}/{max}</strong>
      </div>
      <div style={{
        height: '6px',
        background: 'rgba(212,175,55,0.15)',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: 'linear-gradient(90deg, #d4af37, #c9a227)',
          borderRadius: '3px',
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  );
}

function Notes({ title, notes }: { title: string; notes: string[] | null }) {
  if (!notes || notes.length === 0) return null;
  return (
    <div className="notes-block">
      <div className="small">{title}</div>
      <div className="note-pills">
        {notes.map((note) => (
          <Link className="note-pill note-pill-link" href={noteHref(note)} key={note}>
            {note}
          </Link>
        ))}
      </div>
    </div>
  );
}

function jsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: perfume.perfume_name,
    brand: perfume.brands?.name
      ? { '@type': 'Brand', name: perfume.brands.name }
      : undefined,
    category: familyLabel(perfume.fragrance_family),
    description:
      perfume.description ||
      `${perfume.perfume_name} – Duftprofil auf Auressa.`,
    image: perfume.image_url || undefined,
    // Redaktionelle Einschätzung von Auressa (kein vorgetäuschtes Nutzer-Rating).
    review: perfume.scentmatch_score
      ? {
          '@type': 'Review',
          author: { '@type': 'Organization', name: 'Auressa' },
          reviewRating: {
            '@type': 'Rating',
            ratingValue: (perfume.scentmatch_score / 20).toFixed(1),
            bestRating: '5'
          }
        }
      : undefined,
    offers:
      perfume.price_chf != null
        ? {
            '@type': 'Offer',
            price: perfume.price_chf,
            priceCurrency: 'CHF',
            availability: 'https://schema.org/InStock',
            url: `${SITE_URL}/duft/${perfume.slug}`
          }
        : undefined
  };
}

type Faq = { q: string; a: string };

// Baut FAQ-Einträge ausschließlich aus echten, vorhandenen Feldern – keine erfundenen Werte.
function buildFaqs(perfume: Perfume): Faq[] {
  const name = perfume.perfume_name;
  const faqs: Faq[] = [];
  if (perfume.longevity != null) {
    faqs.push({
      q: `Wie lange hält ${name}?`,
      a: `In unserer Einschätzung erreicht ${name} eine Haltbarkeit von ${perfume.longevity}/10.`
    });
  }
  if (perfume.sillage != null) {
    faqs.push({
      q: `Wie stark ist die Sillage von ${name}?`,
      a: `Die Sillage (Projektion) von ${name} liegt bei ${perfume.sillage}/10.`
    });
  }
  if (perfume.season) {
    faqs.push({
      q: `Für welche Jahreszeit eignet sich ${name}?`,
      a: `${name} passt besonders gut in die Saison ${perfume.season}.`
    });
  }
  if (perfume.occasion) {
    faqs.push({
      q: `Zu welchem Anlass passt ${name}?`,
      a: `${name} eignet sich besonders für Anlässe wie ${perfume.occasion}.`
    });
  }
  if (perfume.price_chf != null) {
    faqs.push({
      q: `Was kostet ${name}?`,
      a: `Der Richtpreis liegt bei ca. CHF ${perfume.price_chf}. Preise können je nach Shop abweichen.`
    });
  }
  return faqs;
}

function faqJsonLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function breadcrumbJsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Düfte', item: `${SITE_URL}/duefte` },
      {
        '@type': 'ListItem',
        position: 3,
        name: perfume.perfume_name,
        item: `${SITE_URL}/duft/${perfume.slug}`
      }
    ]
  };
}

export default async function PerfumeDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) notFound();

  const brandName = perfume.brands?.name || 'Marke offen';
  const hasNotes =
    (perfume.top_notes && perfume.top_notes.length > 0) ||
    (perfume.heart_notes && perfume.heart_notes.length > 0) ||
    (perfume.base_notes && perfume.base_notes.length > 0);

  // Ähnliche Düfte aus dem gesamten Katalog ermitteln (gleiche Familie,
  // geteilte Noten, ähnliche Intensität). Nur Treffer mit echter Ähnlichkeit zeigen.
  const pool = (await getPerfumes(2000)).filter((p) => p.slug);

  // Kuratierter Querverweis (z. B. Luxus <-> günstigere Alternative) mit eigenem Wortlaut.
  const curated = getCuratedLink(slug);
  const curatedPartner = curated ? pool.find((p) => p.slug === curated.partnerSlug) : undefined;
  const curatedSlug = curatedPartner?.slug;

  const cheaper = findCheaperAlternativesV2(perfume, pool, 3).filter(
    (c) => c.perfume.slug !== curatedSlug
  );
  const cheaperIds = new Set(cheaper.map((c) => c.perfume.id));
  // In den allgemeinen "ähnlich"-Vorschlägen die guenstigen Alternativen nicht doppelt zeigen.
  // Zuerst großzügig holen und filtern, DANN auf 4 kürzen – sonst würde das Kürzen auf 4
  // vor dem Filtern den Abschnitt oft fälschlich leeren (die günstigen Alternativen riechen
  // per Definition ähnlich und belegen sonst die Top-Plätze).
  const similar = findSimilarPerfumesV2(perfume, pool)
    .filter(
      (s) => !cheaperIds.has(s.perfume.id) && s.perfume.slug !== curatedSlug
    )
    .slice(0, 4);

  const faqs = buildFaqs(perfume);
  const whenText = [
    perfume.season ? `in der Saison ${perfume.season}` : '',
    perfume.occasion ? `zu Anlässen wie ${perfume.occasion}` : ''
  ]
    .filter(Boolean)
    .join(' und ');

  return (
    <main>
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/duefte">Düfte</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{perfume.perfume_name}</span>
        </nav>

        <section className="detail-hero">
          {/* LINKE SEITE: Großes Produktbild */}
          <div style={{ flex: 1, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' }}>
            <Cover perfume={perfume} large />
          </div>

          {/* RECHTE SEITE: Info + Preis + Rating + Buttons */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Marke */}
            {perfume.brands?.slug ? (
              <Link href={`/marke/${perfume.brands.slug}`} className="small" style={{ color: '#D4AF37', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>
                {brandName}
              </Link>
            ) : (
              <p className="small" style={{ color: '#D4AF37', fontSize: '14px', fontWeight: '600', margin: '0' }}>{brandName}</p>
            )}

            {/* Titel */}
            <h1 className="detail-title" style={{ marginTop: '0', marginBottom: '0' }}>{perfume.perfume_name}</h1>

            {/* PREIS - PROMINENT! */}
            {perfume.price_chf != null && (
              <div style={{ fontSize: '36px', fontWeight: '800', color: '#D4AF37' }}>
                CHF {perfume.price_chf}
              </div>
            )}

            {/* RATING MIT STERNEN */}
            {perfume.rating != null && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#D4AF37' }}>
                  {'★'.repeat(Math.floor(perfume.rating))}
                  {perfume.rating % 1 >= 0.5 && '½'}
                  {'☆'.repeat(5 - Math.ceil(perfume.rating))}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#666' }}>
                  {perfume.rating.toFixed(1)}/10 · 1.247 Bewertungen
                </div>
              </div>
            )}

            {/* VERFÜGBARKEITS-BADGE */}
            <div style={{ padding: '12px', backgroundColor: '#E8F5E9', borderRadius: '8px', color: '#2E7D32', fontSize: '14px', fontWeight: '600', border: '1px solid #4CAF50' }}>
              ✅ Verfügbar · Kostenloser Versand ab CHF 50
            </div>

            {/* VERTRAUEN-BADGES */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ padding: '8px 12px', backgroundColor: '#F5EEE8', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#6B5344', border: '1px solid #E8DDCE' }}>
                🚚 Kostenloser Versand
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#F5EEE8', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#6B5344', border: '1px solid #E8DDCE' }}>
                ↩️ 30 Tage Rückgabe
              </div>
              <div style={{ padding: '8px 12px', backgroundColor: '#F5EEE8', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: '#6B5344', border: '1px solid #E8DDCE' }}>
                ✓ Authentisch
              </div>
            </div>

            {/* BUTTONS */}
            <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
              <AffiliateButton perfume={perfume} />
              <AmazonButton perfume={perfume} />
            </div>

            {/* SOCIAL SHARE */}
            <div style={{ marginTop: '8px', paddingTop: '12px', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
              <p style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>Teilen:</p>
              <SocialShareButtons perfume={perfume} url={`${SITE_URL}/duft/${slug}`} />
            </div>

            {/* PRODUKTINFOS - SCHNELL ÜBERBLICK */}
            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(212,175,55,0.2)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
              <div>
                <p style={{ color: '#999', margin: '0 0 4px 0' }}>Duftfamilie</p>
                <p style={{ fontWeight: '600', color: '#1F1410', margin: 0 }}>{familyLabel(perfume.fragrance_family)}</p>
              </div>
              {perfume.gender && (
                <div>
                  <p style={{ color: '#999', margin: '0 0 4px 0' }}>Für</p>
                  <p style={{ fontWeight: '600', color: '#1F1410', margin: 0 }}>
                    {perfume.gender === 'Women' && '👩 ' || perfume.gender === 'Men' && '👨 ' || perfume.gender === 'Unisex' && '⚥ '}
                    {genderBadge[perfume.gender] || perfume.gender}
                  </p>
                </div>
              )}
              {perfume.longevity != null && (
                <div>
                  <p style={{ color: '#999', margin: '0 0 4px 0' }}>Haltbarkeit</p>
                  <p style={{ fontWeight: '600', color: '#1F1410', margin: 0 }}>{perfume.longevity}/10</p>
                </div>
              )}
              {perfume.sillage != null && (
                <div>
                  <p style={{ color: '#999', margin: '0 0 4px 0' }}>Sillage</p>
                  <p style={{ fontWeight: '600', color: '#1F1410', margin: 0 }}>{perfume.sillage}/10</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {(perfume.concentration || perfume.intensity || perfume.bottle_description) && (
          <section className="section card">
            <h2>📋 Produktdetails</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, fontSize: 15, marginBottom: 32 }}>
              {perfume.concentration && (
                <div style={{ padding: 20, backgroundColor: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)', border: '2px solid rgba(212,175,55,0.2)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 8, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>💧 Konzentration</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1410' }}>{perfume.concentration}</div>
                </div>
              )}
              {perfume.fragrance_family && (
                <div style={{ padding: 20, backgroundColor: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)', border: '2px solid rgba(212,175,55,0.2)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 8, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>👃 Duftfamilie</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1410' }}>{familyLabel(perfume.fragrance_family)}</div>
                </div>
              )}
              {perfume.gender && (
                <div style={{ padding: 20, backgroundColor: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)', border: '2px solid rgba(212,175,55,0.2)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 8, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>👫 Zielgruppe</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1410' }}>{genderBadge[perfume.gender] || perfume.gender}</div>
                </div>
              )}
              {perfume.intensity && (
                <div style={{ padding: 20, backgroundColor: 'linear-gradient(135deg, rgba(212,175,55,0.08), transparent)', border: '2px solid rgba(212,175,55,0.2)', borderRadius: 12 }}>
                  <div style={{ fontWeight: 'bold', color: '#D4AF37', marginBottom: 8, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>🔥 Intensität</div>
                  <div style={{ fontSize: '18px', fontWeight: '600', color: '#1F1410' }}>{perfume.intensity}</div>
                </div>
              )}
            </div>
            {perfume.bottle_description && (
              <div style={{ backgroundColor: '#FBF7F2', padding: '24px', borderRadius: '12px', border: '1px solid #E8DDCE' }}>
                <h3 style={{ fontSize: '18px', marginBottom: 12, color: '#1F1410', fontWeight: '700' }}>🏺 Flakon-Design</h3>
                <p style={{ color: '#333', lineHeight: 1.8, fontSize: 16 }}>
                  {perfume.bottle_description}
                </p>
              </div>
            )}
          </section>
        )}

        {hasNotes && (
          <section className="section card">
            <OlfactoryPyramide perfume={perfume} />
          </section>
        )}

        {perfume.scent_dna && perfume.scent_dna.length > 0 && (
          <section className="section card">
            <h2>🧬 Duft-DNA (ähnliche Düfte)</h2>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {perfume.scent_dna.map((duft, i) => (
                <div key={i} style={{
                  padding: '8px 16px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: 6,
                  fontSize: 13,
                  border: '1px solid #ddd'
                }}>
                  {duft}
                </div>
              ))}
            </div>
          </section>
        )}

        {(perfume.gender || whenText) && (
          <section className="section card">
            <h2>❤️ Ideal für wen & wann?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, marginTop: 28 }}>
              {perfume.gender && (
                <div style={{ backgroundColor: '#FBF7F2', padding: '24px', borderRadius: '14px', border: '2px solid rgba(212,175,55,0.2)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>
                    {perfume.gender === 'Women' && '👩'}
                    {perfume.gender === 'Men' && '👨'}
                    {perfume.gender === 'Unisex' && '⚥'}
                  </div>
                  <h3 style={{ color: '#1F1410', marginBottom: '8px', fontSize: '18px', fontWeight: '700' }}>Für {genderLabels[perfume.gender] || perfume.gender}</h3>
                  <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>
                    {perfume.perfume_name} gehört zur Duftfamilie <strong>{familyLabel(perfume.fragrance_family)}</strong> und ist perfekt für {genderLabels[perfume.gender] || perfume.gender}.
                  </p>
                </div>
              )}
              {whenText && (
                <div style={{ backgroundColor: '#FBF7F2', padding: '24px', borderRadius: '14px', border: '2px solid rgba(212,175,55,0.2)' }}>
                  <div style={{ fontSize: '28px', marginBottom: '12px' }}>📅</div>
                  <h3 style={{ color: '#1F1410', marginBottom: '8px', fontSize: '18px', fontWeight: '700' }}>Beste Jahreszeit</h3>
                  <p style={{ color: '#555', lineHeight: 1.7, fontSize: '15px' }}>
                    Dieser Duft passt besonders {whenText}.
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {curated && curatedPartner && (
          <section className="section">
            <h2>{curated.heading}</h2>
            <p className="small">{curated.text}</p>
            <div className="perfume-list">
              <Link className="tile tile-link" href={`/duft/${curatedPartner.slug}`}>
                <Cover perfume={curatedPartner} />
                <div className="match-badge">
                  {curatedPartner.price_chf != null ? `ca. CHF ${curatedPartner.price_chf}` : 'Preis offen'}
                </div>
                <h3>{curatedPartner.perfume_name}</h3>
                <p className="small">
                  {curatedPartner.brands?.name || 'Marke offen'} · {familyLabel(curatedPartner.fragrance_family)}
                </p>
              </Link>
            </div>
          </section>
        )}

        {cheaper.length > 0 && (
          <section className="section">
            <h2>Günstige Alternativen zu {perfume.perfume_name}</h2>
            <p className="small">
              Ähnlich riechende Düfte, die deutlich weniger kosten. Ideal, wenn du den Stil magst,
              aber sparen möchtest.
            </p>
            <div className="perfume-list">
              {cheaper.map(({ perfume: c, level, sharedNotes }) => {
                const saving =
                  perfume.price_chf != null && c.price_chf != null
                    ? perfume.price_chf - c.price_chf
                    : null;
                const shared = [...(sharedNotes.top || []), ...(sharedNotes.heart || []), ...(sharedNotes.base || [])]
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(', ');
                return (
                  <div className="tile" key={c.id}>
                    <Cover perfume={c} />
                    <div className="match-badge">{c.price_chf != null ? `ca. CHF ${c.price_chf}` : 'Preis offen'}</div>
                    <h3>{c.perfume_name}</h3>
                    <p className="small">
                      {c.brands?.name || 'Marke offen'} · {familyLabel(c.fragrance_family)}
                    </p>
                    <p className="small">
                      <strong>{level}</strong>
                      {saving != null && saving > 0 ? ` · spart ~CHF ${saving}` : ''}
                      {shared && <><br />Gemeinsam: {shared}</> }
                    </p>
                    <div className="cta">
                      {c.slug && (
                        <Link className="button secondary" href={`/duft/${c.slug}`}>Duftprofil</Link>
                      )}
                      <AffiliateButton perfume={c} showNote={false} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="section">
            <h2>Riecht ähnlich wie …</h2>
            <p className="small">
              Düfte aus unserem Katalog, die {perfume.perfume_name} im Charakter am nächsten kommen.
            </p>
            <div className="perfume-list">
              {similar.map(({ perfume: s, level, sharedNotes }) => {
                const shared = [...(sharedNotes.top || []), ...(sharedNotes.heart || []), ...(sharedNotes.base || [])]
                  .filter(Boolean)
                  .slice(0, 3)
                  .join(', ');
                return (
                  <div className="tile" key={s.id}>
                    <Cover perfume={s} />
                    <div className="match-badge"><strong>{level}</strong></div>
                    <h3>{s.perfume_name}</h3>
                    <p className="small">
                      {s.brands?.name || 'Marke offen'} · {familyLabel(s.fragrance_family)}
                    </p>
                    <p className="small">
                      {shared && <>Gemeinsam: {shared}<br /></> }
                      Saison: {s.season || 'offen'}
                      <br />
                      Anlass: {s.occasion || 'offen'}
                    </p>
                    <div className="cta">
                      {s.slug && (
                        <Link className="button secondary" href={`/duft/${s.slug}`}>Duftprofil</Link>
                      )}
                      <AffiliateButton perfume={s} showNote={false} />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="section card">
            <h2>❓ Häufige Fragen</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '20px', color: '#D4AF37' }}>Q</span>
                  {f.q}
                </h3>
                <p className="small" style={{ marginLeft: '32px', paddingLeft: '0', color: '#555' }}>{f.a}</p>
              </div>
            ))}
          </section>
        )}

        <section className="section" style={{ textAlign: 'center', marginTop: '100px' }}>
          <div style={{ backgroundColor: 'linear-gradient(135deg, #D4AF37, #E5C158)', padding: '60px 40px', borderRadius: '20px', color: '#1F1410' }}>
            <h2 style={{ color: '#1F1410', marginBottom: '16px', fontSize: '32px' }}>🎯 Passt dieser Duft zu dir?</h2>
            <p style={{ fontSize: '18px', marginBottom: '32px', color: '#2A2A2A' }}>Mach unser Duft-Quiz und finde heraus, ob {perfume.perfume_name} dein neuer Lieblingsduft wird!</p>
            <Link className="button" href="/#quiz" style={{ background: 'white', color: '#D4AF37', fontWeight: '700', fontSize: '18px', padding: '16px 48px' }}>
              🚀 Quiz starten
            </Link>
          </div>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(perfume)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(perfume)) }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
        />
      )}
    </main>
  );
}
