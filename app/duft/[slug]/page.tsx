import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OlfactoryPyramid } from '@/app/OlfactoryPyramid';
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
import './detail.css';

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

// Schlanke Linien-Icons (inline SVG, keine Zusatz-Bibliothek nötig).
type IconName =
  | 'clock'
  | 'wave'
  | 'leaf'
  | 'calendar'
  | 'tag'
  | 'flask'
  | 'drop'
  | 'person'
  | 'sparkle'
  | 'shield'
  | 'scale'
  | 'heart'
  | 'help'
  | 'chevron'
  | 'arrow';

const iconPaths: Record<IconName, ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  wave: <path d="M3 9c3-3 6 3 9 0s6 3 9 0M3 15c3-3 6 3 9 0s6 3 9 0" />,
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19l7-7" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  tag: (
    <>
      <path d="M3 12V4h8l10 10-8 8L3 12z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  flask: (
    <>
      <path d="M9 3h6M10 3v4l-4 4.5V19a2 2 0 002 2h8a2 2 0 002-2v-7.5L14 7V3" />
      <path d="M6 14h12" />
    </>
  ),
  drop: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  person: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1-4.5 4.5-7 8-7s7 2.5 8 7" />
    </>
  ),
  sparkle: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16z" />,
  shield: (
    <>
      <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6l8-3z" />
      <path d="M8.5 12l2.5 2.5 4.5-5" />
    </>
  ),
  scale: (
    <>
      <path d="M12 4v16M5 20h14M6 7h12" />
      <path d="M6 7l-3 6a3 3 0 006 0L6 7zM18 7l-3 6a3 3 0 006 0l-3-6z" />
    </>
  ),
  heart: <path d="M12 20s-7.5-4.6-9-9.5C2 7 4.5 4 7.5 4 9.5 4 11 5.2 12 6.8 13 5.2 14.5 4 16.5 4 19.5 4 22 7 21 10.5 19.5 15.4 12 20 12 20z" />,
  help: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.3M12 17h.01" />
    </>
  ),
  chevron: <path d="M6 9l6 6 6-6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      className="pd-icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
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

// Kennzahl-Kachel mit Icon und optionalem Balken (0–10).
function Metric({
  icon,
  label,
  value,
  score
}: {
  icon: IconName;
  label: string;
  value: string;
  score?: number | null;
}) {
  const pct = score != null ? Math.min(100, Math.max(0, Math.round(score * 10))) : null;
  return (
    <div className="pd-metric">
      <span className="pd-metric-icon">
        <Icon name={icon} size={18} />
      </span>
      <div className="pd-metric-body">
        <span className="pd-metric-label">{label}</span>
        <strong className="pd-metric-value">{value}</strong>
        {pct != null && (
          <span className="pd-bar" aria-hidden="true">
            <span style={{ width: `${pct}%` }} />
          </span>
        )}
      </div>
    </div>
  );
}

// Runder Score-Ring (Auressa-Score 0–100).
function ScoreRing({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="pd-ring" style={{ ['--pct' as string]: `${pct}` }}>
      <div className="pd-ring-inner">
        <strong>{value}</strong>
        <span>Score</span>
      </div>
    </div>
  );
}

// Sterne (0–5). Bewertung kann je nach Datensatz auf 5, 10 oder 100 skaliert sein.
function Stars({ rating }: { rating: number }) {
  const outOfFive = rating > 10 ? rating / 20 : rating > 5 ? rating / 2 : rating;
  const value = Math.max(0, Math.min(5, outOfFive));
  return (
    <div className="pd-stars" aria-label={`Bewertung ${value.toFixed(1)} von 5`}>
      <span className="pd-stars-track" aria-hidden="true">
        ★★★★★
        <span className="pd-stars-fill" style={{ width: `${(value / 5) * 100}%` }}>
          ★★★★★
        </span>
      </span>
      <strong>{value.toFixed(1)}</strong>
      <span className="pd-muted">/ 5</span>
    </div>
  );
}

function SectionHead({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="pd-head">
      <span className="pd-kicker">{kicker}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function sharedList(sharedNotes: { top?: string[]; heart?: string[]; base?: string[] }): string {
  return [...(sharedNotes.top || []), ...(sharedNotes.heart || []), ...(sharedNotes.base || [])]
    .filter(Boolean)
    .slice(0, 3)
    .join(', ');
}

// Produktkarte für Alternativen / ähnliche Düfte.
function ProductCard({
  perfume,
  badge,
  meta
}: {
  perfume: Perfume;
  badge: string;
  meta?: ReactNode;
}) {
  return (
    <article className="pd-card">
      <Link className="pd-card-media" href={`/duft/${perfume.slug}`} aria-label={perfume.perfume_name}>
        <Cover perfume={perfume} />
        <span className="pd-card-badge">{badge}</span>
      </Link>
      <div className="pd-card-body">
        <span className="pd-card-brand">{perfume.brands?.name || 'Marke offen'}</span>
        <h3>
          <Link href={`/duft/${perfume.slug}`}>{perfume.perfume_name}</Link>
        </h3>
        <div className="pd-card-row">
          <span className="pd-card-family">{familyLabel(perfume.fragrance_family)}</span>
          {perfume.price_chf != null && <strong className="pd-card-price">CHF {perfume.price_chf}</strong>}
        </div>
        {meta && <p className="pd-card-meta">{meta}</p>}
        <div className="pd-card-cta">
          <AffiliateButton perfume={perfume} showNote={false} />
        </div>
      </div>
    </article>
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

type Faq = { q: string; a: string; icon: IconName };

// Baut FAQ-Einträge ausschließlich aus echten, vorhandenen Feldern – keine erfundenen Werte.
function buildFaqs(perfume: Perfume): Faq[] {
  const name = perfume.perfume_name;
  const faqs: Faq[] = [];
  if (perfume.longevity != null) {
    faqs.push({
      icon: 'clock',
      q: `Wie lange hält ${name}?`,
      a: `In unserer Einschätzung erreicht ${name} eine Haltbarkeit von ${perfume.longevity}/10.`
    });
  }
  if (perfume.sillage != null) {
    faqs.push({
      icon: 'wave',
      q: `Wie stark ist die Sillage von ${name}?`,
      a: `Die Sillage (Projektion) von ${name} liegt bei ${perfume.sillage}/10.`
    });
  }
  if (perfume.season) {
    faqs.push({
      icon: 'leaf',
      q: `Für welche Jahreszeit eignet sich ${name}?`,
      a: `${name} passt besonders gut in die Saison ${perfume.season}.`
    });
  }
  if (perfume.occasion) {
    faqs.push({
      icon: 'calendar',
      q: `Zu welchem Anlass passt ${name}?`,
      a: `${name} eignet sich besonders für Anlässe wie ${perfume.occasion}.`
    });
  }
  if (perfume.price_chf != null) {
    faqs.push({
      icon: 'tag',
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

const confidenceLabels: Record<string, string> = {
  high: 'Hohe Datenqualität',
  medium: 'Mittlere Datenqualität',
  low: 'Begrenzte Daten'
};

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

  type Spec = { icon: IconName; label: string; value: string };
  const specs: Spec[] = [];
  if (perfume.concentration) specs.push({ icon: 'flask', label: 'Konzentration', value: perfume.concentration });
  specs.push({ icon: 'drop', label: 'Duftfamilie', value: familyLabel(perfume.fragrance_family) });
  if (perfume.gender) {
    specs.push({ icon: 'person', label: 'Geschlecht', value: genderBadge[perfume.gender] || perfume.gender });
  }
  if (perfume.intensity) specs.push({ icon: 'sparkle', label: 'Intensität', value: perfume.intensity });

  const allNotes = [
    ...(perfume.top_notes || []),
    ...(perfume.heart_notes || []),
    ...(perfume.base_notes || [])
  ];
  const keyNotes = Array.from(new Set(allNotes)).slice(0, 6);

  return (
    <main className="pd">
      <div className="container pd-container">
        <nav className="pd-breadcrumb" aria-label="Brotkrümel-Navigation">
          <Link href="/">Start</Link>
          <span aria-hidden="true">/</span>
          <Link href="/duefte">Düfte</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{perfume.perfume_name}</span>
        </nav>

        {/* ── Produkt-Hero: Bild links, Kaufbox rechts ── */}
        <section className="pd-hero">
          <div className="pd-media">
            <div className="pd-media-frame">
              <Cover perfume={perfume} large />
              <span className="pd-media-tag">{familyLabel(perfume.fragrance_family)}</span>
              {perfume.scentmatch_score != null && (
                <div className="pd-media-score">
                  <ScoreRing value={perfume.scentmatch_score} />
                </div>
              )}
            </div>
            {keyNotes.length > 0 && (
              <div className="pd-media-notes">
                <span className="pd-media-notes-label">Signatur-Noten</span>
                <div className="pd-chips">
                  {keyNotes.map((note) => (
                    <Link className="pd-chip" href={noteHref(note)} key={note}>
                      {note}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pd-buy">
            <div className="pd-buy-top">
              {perfume.brands?.slug ? (
                <Link href={`/marke/${perfume.brands.slug}`} className="pd-brand">
                  {brandName}
                </Link>
              ) : (
                <span className="pd-brand">{brandName}</span>
              )}
              {perfume.confidence_level && confidenceLabels[perfume.confidence_level] && (
                <span className={`pd-confidence pd-confidence-${perfume.confidence_level}`}>
                  <Icon name="shield" size={14} />
                  {confidenceLabels[perfume.confidence_level]}
                </span>
              )}
            </div>

            <h1 className="pd-title">{perfume.perfume_name}</h1>

            {perfume.rating != null && <Stars rating={perfume.rating} />}

            <div className="pd-tags">
              {perfume.gender && (
                <span className="pd-tag">
                  {genderSymbol[perfume.gender] ? `${genderSymbol[perfume.gender]} ` : ''}
                  {genderBadge[perfume.gender] || perfume.gender}
                </span>
              )}
              {perfume.concentration && <span className="pd-tag">{perfume.concentration}</span>}
              {perfume.season && <span className="pd-tag">{perfume.season}</span>}
            </div>

            <div className="pd-price">
              <div>
                <span className="pd-price-label">Richtpreis</span>
                <strong className="pd-price-value">
                  {perfume.price_chf != null ? `CHF ${perfume.price_chf}` : 'Preis offen'}
                </strong>
              </div>
              <span className="pd-price-hint">Preise je nach Shop verschieden</span>
            </div>

            <div className="pd-metrics">
              <Metric
                icon="clock"
                label="Haltbarkeit"
                value={perfume.longevity != null ? `${perfume.longevity}/10` : '–'}
                score={perfume.longevity}
              />
              <Metric
                icon="wave"
                label="Sillage"
                value={perfume.sillage != null ? `${perfume.sillage}/10` : '–'}
                score={perfume.sillage}
              />
              <Metric icon="leaf" label="Saison" value={perfume.season || 'Ganzjährig'} />
              <Metric icon="calendar" label="Anlass" value={perfume.occasion || 'Flexibel'} />
            </div>

            <div className="pd-actions">
              <AffiliateButton perfume={perfume} />
              <AmazonButton perfume={perfume} />
            </div>

            <ul className="pd-trust">
              <li>
                <Icon name="shield" size={16} /> Unabhängige Einschätzung
              </li>
              <li>
                <Icon name="scale" size={16} /> Preise vergleichen
              </li>
              <li>
                <Icon name="heart" size={16} /> Passend zu deinem Stil
              </li>
            </ul>

            <div className="pd-share">
              <SocialShareButtons perfume={perfume} url={`${SITE_URL}/duft/${slug}`} />
            </div>
          </div>
        </section>

        {/* ── Beschreibung + Steckbrief ── */}
        <section className="pd-split">
          <div className="pd-panel pd-story">
            <SectionHead kicker="Das Duftprofil" title={`Über ${perfume.perfume_name}`} />
            <p className="pd-story-text">
              {perfume.long_description || perfume.description || describePerfume(perfume)}
            </p>
            {(perfume.gender || whenText) && (
              <div className="pd-when">
                <h3>
                  <Icon name="sparkle" size={16} /> Für wen &amp; wann?
                </h3>
                {perfume.gender && (
                  <p>
                    {perfume.perfume_name} ist als {genderLabels[perfume.gender] || perfume.gender}{' '}
                    eingeordnet und gehört zur Duftfamilie {familyLabel(perfume.fragrance_family)}.
                  </p>
                )}
                {whenText && <p>Besonders gut passt der Duft {whenText}.</p>}
              </div>
            )}
          </div>

          <aside className="pd-panel pd-specs">
            <SectionHead kicker="Steckbrief" title="Auf einen Blick" />
            <dl className="pd-spec-list">
              {specs.map((s) => (
                <div className="pd-spec" key={s.label}>
                  <dt>
                    <Icon name={s.icon} size={16} />
                    {s.label}
                  </dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
              {perfume.scentmatch_score != null && (
                <div className="pd-spec">
                  <dt>
                    <Icon name="sparkle" size={16} />
                    Auressa-Score
                  </dt>
                  <dd>{perfume.scentmatch_score}/100</dd>
                </div>
              )}
            </dl>
            {perfume.bottle_description && (
              <div className="pd-bottle">
                <h3>
                  <Icon name="flask" size={16} /> Flakon
                </h3>
                <p>{perfume.bottle_description}</p>
              </div>
            )}
          </aside>
        </section>

        {hasNotes && (
          <section className="pd-section pd-panel pd-pyramid">
            <SectionHead
              kicker="Komposition"
              title="Kopf, Herz & Basis"
              text="So entfaltet sich der Duft auf der Haut – von den ersten Minuten bis zum Ausklang."
            />
            <OlfactoryPyramid perfume={perfume} />
          </section>
        )}

        {perfume.scent_dna && perfume.scent_dna.length > 0 && (
          <section className="pd-section pd-panel">
            <SectionHead kicker="Duft-DNA" title="Verwandt mit" />
            <div className="pd-chips">
              {perfume.scent_dna.map((duft, i) => (
                <span className="pd-chip pd-chip-static" key={i}>
                  {duft}
                </span>
              ))}
            </div>
          </section>
        )}

        {curated && curatedPartner && (
          <section className="pd-section pd-curated">
            <div className="pd-curated-text">
              <span className="pd-kicker">Unsere Empfehlung</span>
              <h2>{curated.heading}</h2>
              <p>{curated.text}</p>
              <Link className="pd-link" href={`/duft/${curatedPartner.slug}`}>
                Zu {curatedPartner.perfume_name} <Icon name="arrow" size={16} />
              </Link>
            </div>
            <div className="pd-curated-card">
              <ProductCard
                perfume={curatedPartner}
                badge={curatedPartner.price_chf != null ? `CHF ${curatedPartner.price_chf}` : 'Preis offen'}
              />
            </div>
          </section>
        )}

        {cheaper.length > 0 && (
          <section className="pd-section">
            <SectionHead
              kicker="Dupes & Alternativen"
              title={`Günstige Alternativen zu ${perfume.perfume_name}`}
              text="Ähnlich riechende Düfte, die deutlich weniger kosten. Ideal, wenn du den Stil magst, aber sparen möchtest."
            />
            <div className="pd-grid">
              {cheaper.map(({ perfume: c, level, sharedNotes }) => {
                const saving =
                  perfume.price_chf != null && c.price_chf != null
                    ? perfume.price_chf - c.price_chf
                    : null;
                const shared = sharedList(sharedNotes);
                return (
                  <ProductCard
                    key={c.id}
                    perfume={c}
                    badge={saving != null && saving > 0 ? `– CHF ${saving}` : level}
                    meta={
                      <>
                        <strong>{level}</strong>
                        {shared && <> · Gemeinsam: {shared}</>}
                      </>
                    }
                  />
                );
              })}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="pd-section">
            <SectionHead
              kicker="Entdecken"
              title="Riecht ähnlich wie …"
              text={`Düfte aus unserem Katalog, die ${perfume.perfume_name} im Charakter am nächsten kommen.`}
            />
            <div className="pd-grid pd-grid-4">
              {similar.map(({ perfume: s, level, sharedNotes }) => {
                const shared = sharedList(sharedNotes);
                return (
                  <ProductCard
                    key={s.id}
                    perfume={s}
                    badge={level}
                    meta={
                      <>
                        {shared && <>Gemeinsam: {shared} · </>}
                        {s.season || 'Saison offen'} · {s.occasion || 'Anlass offen'}
                      </>
                    }
                  />
                );
              })}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="pd-section pd-faq">
            <div className="pd-faq-intro">
              <span className="pd-faq-badge">
                <Icon name="help" size={26} />
              </span>
              <SectionHead
                kicker="FAQ"
                title={`Häufige Fragen zu ${perfume.perfume_name}`}
                text="Die wichtigsten Fakten kurz beantwortet."
              />
            </div>
            <div className="pd-faq-list">
              {faqs.map((f, i) => (
                <details className="pd-faq-item" key={i} open={i === 0}>
                  <summary>
                    <span className="pd-faq-icon">
                      <Icon name={f.icon} size={18} />
                    </span>
                    <h3>{f.q}</h3>
                    <span className="pd-faq-chevron">
                      <Icon name="chevron" size={18} />
                    </span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        <section className="pd-section pd-cta">
          <div>
            <span className="pd-kicker">Persönliche Duftberatung</span>
            <h2>Passt {perfume.perfume_name} zu dir?</h2>
            <p>Beantworte ein paar kurze Fragen und entdecke deine persönlichen Duft-Matches.</p>
          </div>
          <Link className="pd-cta-button" href="/#quiz">
            Zum Duft-Quiz <Icon name="arrow" size={18} />
          </Link>
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
