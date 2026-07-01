import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import {
  getPerfumeBySlug,
  getAllPerfumeSlugs,
  getPerfumes,
  findSimilarPerfumes,
  findCheaperAlternatives,
  describePerfume,
  type Perfume
} from '@/lib/perfumes';
import { noteHref } from '@/lib/notes-glossary';
import { getCuratedLink } from '@/lib/curated-links';
import { AffiliateButton } from '@/app/AffiliateButton';
import NewsletterForm from '@/app/NewsletterForm';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

const familyLabels: Record<string, string> = {
  clean: 'Clean / Frisch',
  gourmand: 'Gourmand / Süß',
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
    return { title: 'Duft nicht gefunden – Auressa' };
  }

  const brand = perfume.brands?.name ? ` von ${perfume.brands.name}` : '';
  const title = `${perfume.perfume_name}${brand} – Duftprofil & Bewertung | Auressa`;
  // Abwechslungsreiche Beschreibung aus echten Duftdaten (statt gleicher Schablone
  // auf hunderten Seiten) – gut gegen „dünnen/doppelten Inhalt".
  const description = metaTrim(perfume.description || describePerfume(perfume));

  return {
    title,
    description,
    alternates: { canonical: `/duft/${slug}` },
    openGraph: {
      title,
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

  const cheaper = findCheaperAlternatives(perfume, pool, 3).filter(
    (c) => c.perfume.slug !== curatedSlug
  );
  const cheaperIds = new Set(cheaper.map((c) => c.perfume.id));
  // In den allgemeinen "ähnlich"-Vorschlägen die guenstigen Alternativen nicht doppelt zeigen.
  const similar = findSimilarPerfumes(perfume, pool, 4).filter(
    (s) => s.similarity >= 30 && !cheaperIds.has(s.perfume.id) && s.perfume.slug !== curatedSlug
  );

  const faqs = buildFaqs(perfume);
  const whenText = [
    perfume.season ? `in der Saison ${perfume.season}` : '',
    perfume.occasion ? `zu Anlässen wie ${perfume.occasion}` : ''
  ]
    .filter(Boolean)
    .join(' und ');

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/duefte">Düfte</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{perfume.perfume_name}</span>
        </nav>

        <section className="detail-hero">
          <div>
            <Cover perfume={perfume} large />
            <p className="small">{brandName}</p>
            <h1 className="detail-title">{perfume.perfume_name}</h1>
            <p className="lead">{perfume.description || describePerfume(perfume)}</p>
            <div className="badge-row">
              <span className="badge">{familyLabel(perfume.fragrance_family)}</span>
              {perfume.gender && (
                <span className="badge">
                  {genderSymbol[perfume.gender] ? `${genderSymbol[perfume.gender]} ` : ''}
                  {genderBadge[perfume.gender] || perfume.gender}
                </span>
              )}
              {perfume.scentmatch_score != null && (
                <span className="badge">Auressa {perfume.scentmatch_score}/100</span>
              )}
            </div>
          </div>

          <div className="card detail-stats">
            <h2>Auf einen Blick</h2>
            <StatRow label="Auressa-Score" value={`${perfume.scentmatch_score ?? '–'}/100`} />
            <StatRow label="Haltbarkeit" value={`${perfume.longevity ?? '–'}/10`} />
            <StatRow label="Sillage (Projektion)" value={`${perfume.sillage ?? '–'}/10`} />
            <StatRow label="Saison" value={perfume.season || 'ganzjährig'} />
            <StatRow label="Anlass" value={perfume.occasion || 'flexibel'} />
            <StatRow
              label="Richtpreis"
              value={perfume.price_chf != null ? `ca. CHF ${perfume.price_chf}` : '–'}
            />
            <AffiliateButton perfume={perfume} />
          </div>
        </section>

        {hasNotes && (
          <section className="section card">
            <h2>Duftnoten</h2>
            <Notes title="Kopfnoten" notes={perfume.top_notes} />
            <Notes title="Herznoten" notes={perfume.heart_notes} />
            <Notes title="Basisnoten" notes={perfume.base_notes} />
          </section>
        )}

        {(perfume.gender || whenText) && (
          <section className="section card">
            <h2>Für wen &amp; wann passt {perfume.perfume_name}?</h2>
            {perfume.gender && (
              <p className="lead">
                {perfume.perfume_name} ist als {genderLabels[perfume.gender] || perfume.gender}{' '}
                eingeordnet und gehört zur Duftfamilie {familyLabel(perfume.fragrance_family)}.
              </p>
            )}
            {whenText && (
              <p className="lead">Besonders gut passt der Duft {whenText}.</p>
            )}
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
              Ähnlich riechende Düfte, die deutlich weniger kosten – ideal, wenn du den Stil magst,
              aber sparen möchtest.
            </p>
            <div className="perfume-list">
              {cheaper.map(({ perfume: c, similarity }) => {
                const saving =
                  perfume.price_chf != null && c.price_chf != null
                    ? perfume.price_chf - c.price_chf
                    : null;
                return (
                  <div className="tile" key={c.id}>
                    <Cover perfume={c} />
                    <div className="match-badge">{c.price_chf != null ? `ca. CHF ${c.price_chf}` : 'Preis offen'}</div>
                    <h3>{c.perfume_name}</h3>
                    <p className="small">
                      {c.brands?.name || 'Marke offen'} · {familyLabel(c.fragrance_family)}
                    </p>
                    <p className="small">
                      {similarity}% ähnlich
                      {saving != null && saving > 0 ? ` · spart ~CHF ${saving}` : ''}
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
              {similar.map(({ perfume: s, similarity }) => (
                <div className="tile" key={s.id}>
                  <Cover perfume={s} />
                  <div className="match-badge">{similarity}% ähnlich</div>
                  <h3>{s.perfume_name}</h3>
                  <p className="small">
                    {s.brands?.name || 'Marke offen'} · {familyLabel(s.fragrance_family)}
                  </p>
                  <p className="small">
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
              ))}
            </div>
          </section>
        )}

        {faqs.length > 0 && (
          <section className="section card">
            <h2>Häufige Fragen zu {perfume.perfume_name}</h2>
            {faqs.map((f, i) => (
              <div className="faq-item" key={i}>
                <h3>{f.q}</h3>
                <p className="small">{f.a}</p>
              </div>
            ))}
          </section>
        )}

        <section className="section">
          <Link className="button" href="/#quiz">
            Passt dieser Duft zu dir? Mach das Quiz
          </Link>
        </section>

        <section className="section card">
          <NewsletterForm source="duft" />
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
