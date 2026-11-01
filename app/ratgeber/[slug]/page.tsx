import type { Metadata } from 'next';
import Link from 'next/link';
import { GUIDE_DATES, formatGuideDate } from '@/lib/guide-dates';
import { metaDescription } from '@/lib/meta';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getGuide, guides, relatedGuides, type Guide } from '@/lib/guides';
import { getGuideFaqs, type GuideFaq } from '@/lib/guide-faqs';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { AffiliateButton } from '@/app/AffiliateButton';

// Cache across all SSG renders during build – one Supabase call for all ~49 guide pages
const getCachedPerfumes = cache(() => getPerfumes(2000));

export const revalidate = 60;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: 'Ratgeber nicht gefunden' };

  return {
    title: guide.seoTitle || guide.title,
    description: metaDescription(guide.description),
    alternates: { canonical: `/ratgeber/${slug}` },
    openGraph: {
      title: guide.title,
      description: metaDescription(guide.description),
      type: 'article',
      url: `${SITE_URL}/ratgeber/${slug}`
    }
  };
}

function PerfumeCard({ perfume }: { perfume: Perfume }) {
  return (
    <div className="tile">
      <h3>{perfume.perfume_name}</h3>
      <p className="small">
        {perfume.brands?.name || 'Marke offen'}
        {perfume.price_chf != null ? ` · ca. CHF ${perfume.price_chf}` : ''}
      </p>
      <div className="cta">
        {perfume.slug && (
          <Link className="button secondary" href={`/duft/${perfume.slug}`}>
            Duftprofil
          </Link>
        )}
        <AffiliateButton perfume={perfume} showNote={false} />
      </div>
    </div>
  );
}

function jsonLd(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    mainEntityOfPage: `${SITE_URL}/ratgeber/${guide.slug}`,
    image: `${SITE_URL}/ratgeber/${guide.slug}/opengraph-image`,
    ...(GUIDE_DATES[guide.slug]
      ? { datePublished: GUIDE_DATES[guide.slug].published, dateModified: GUIDE_DATES[guide.slug].updated }
      : {}),
    author: { '@type': 'Person', name: 'Melanie', jobTitle: 'Gründerin von Auressa', url: `${SITE_URL}/ueber-uns` },
    publisher: {
      '@type': 'Organization',
      name: 'Auressa',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` }
    }
  };
}

function faqJsonLd(faqs: GuideFaq[]) {
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

function breadcrumbJsonLd(guide: Guide) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${SITE_URL}/ratgeber` },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: `${SITE_URL}/ratgeber/${guide.slug}`
      }
    ]
  };
}

export default async function GuidePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const faqs = getGuideFaqs(slug);
  const related = relatedGuides(slug, 3);

  // Alle Düfte einmal laden und nach slug nachschlagbar machen.
  const all = await getCachedPerfumes();
  const bySlug = new Map(all.filter((p) => p.slug).map((p) => [p.slug as string, p]));
  // Abschnitt mit Duft-Liste, deren Düfte (noch) nicht im Katalog sind → Hinweis statt Lücke.
  const listIsEmpty = (section: (typeof guide.sections)[number]) => {
    if (section.pairings) return !section.pairings.some((p) => bySlug.has(p.expensive) && bySlug.has(p.cheap));
    if (section.perfumes) return !section.perfumes.some((x) => bySlug.has(x));
    return false;
  };

  return (
    <main>

      {/* White Hero: Titel & Untertitel */}
      <div style={{
        background: '#fff',
        padding: 'clamp(2.5rem,8vw,4rem) 1.25rem',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: '#6b6b6b', marginBottom: '0.6rem' }}>
          Ratgeber
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,5vw,2.4rem)',
                     fontWeight: 700, lineHeight: 1.15, color: '#1a1a1a', margin: '0 0 1rem' }}>
          {guide.title}
        </h1>
        <p style={{ fontSize: '1rem', color: '#555', maxWidth: '600px',
                    margin: '0 auto', lineHeight: 1.6 }}>
          {guide.description}
        </p>
        {/* Autorin und echte Daten (aus der Versionsgeschichte, siehe lib/guide-dates.ts) */}
        <p className="guide-byline">
          Von <Link href="/ueber-uns">Melanie</Link>, Gründerin von Auressa
          {GUIDE_DATES[guide.slug] && (
            <>
              {' · '}Aktualisiert am{' '}
              <time dateTime={GUIDE_DATES[guide.slug].updated}>{formatGuideDate(GUIDE_DATES[guide.slug].updated)}</time>
            </>
          )}
        </p>
      </div>

      {/* Full-width Hero Image */}
      {guide.heroImage && (
        <div style={{
          width: '100%',
          overflow: 'hidden',
        }}>
          <img src={guide.heroImage} alt={guide.title} style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }} />
        </div>
      )}

      <div className="container">
        {/* Sichtbare Breadcrumb-Navigation */}
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation" style={{ marginTop: '1.5rem' }}>
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/ratgeber">Ratgeber</Link>
        </nav>

        <article>
          {guide.intro.map((p, i) => (
            <p className="lead" key={i}>
              {p}
            </p>
          ))}

          {guide.sections.map((section, i) => (
            <section className="section" key={i}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.body?.map((p, j) => (
                <p className="lead" key={j}>
                  {p}
                </p>
              ))}

              {listIsEmpty(section) && (
                <div className="card guide-pending">
                  {section.pairings?.map((pair, k) => (
                    <p className="small" key={k}>{pair.note}</p>
                  ))}
                  <p className="small">
                    Die passenden Düfte zu diesem Abschnitt prüfen wir gerade mit mehreren Quellen für unseren
                    Katalog. Sobald sie geprüft sind, erscheinen sie hier automatisch.
                  </p>
                  <Link href="/duefte" className="small">Alle geprüften Düfte ansehen →</Link>
                </div>
              )}

              {section.pairings && !listIsEmpty(section) && (
                <div className="pairing-list">
                  {section.pairings.map((pair, k) => {
                    const exp = bySlug.get(pair.expensive);
                    const cheap = bySlug.get(pair.cheap);
                    if (!exp || !cheap) return null;
                    return (
                      <div className="card pairing" key={k}>
                        <p className="small">{pair.note}</p>
                        <div className="perfume-list">
                          <PerfumeCard perfume={exp} />
                          <PerfumeCard perfume={cheap} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {section.perfumes && !listIsEmpty(section) && (
                <div className="perfume-list">
                  {section.perfumes
                    .map((s) => bySlug.get(s))
                    .filter((p): p is Perfume => Boolean(p))
                    .map((p) => (
                      <PerfumeCard perfume={p} key={p.id} />
                    ))}
                </div>
              )}
            </section>
          ))}

          {faqs.length > 0 && (
            <section className="section">
              <h2>Häufige Fragen</h2>
              {faqs.map((f, i) => (
                <div className="faq-item" key={i}>
                  <h3>{f.q}</h3>
                  <p className="lead">{f.a}</p>
                </div>
              ))}
            </section>
          )}

          {related.length > 0 && (
            <section className="section">
              <h2>Das könnte dich auch interessieren</h2>
              <div className="perfume-list">
                {related.map((g) => (
                  <Link className="tile tile-link" href={`/ratgeber/${g.slug}`} key={g.slug}>
                    <h3>{g.title}</h3>
                    <p className="small">{g.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <section className="section">
            <Link className="button" href="/quiz">
              Welcher Duft passt zu dir? Mach das Quiz
            </Link>
          </section>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(guide)).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(guide)).replace(/</g, "\\u003c") }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)).replace(/</g, "\\u003c") }}
        />
      )}
    </main>
  );
}
