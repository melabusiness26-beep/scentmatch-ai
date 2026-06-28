import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { getGuide, guides, relatedGuides, type Guide } from '@/lib/guides';
import { getGuideFaqs, type GuideFaq } from '@/lib/guide-faqs';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { AffiliateButton } from '@/app/AffiliateButton';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

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
  if (!guide) return { title: 'Ratgeber nicht gefunden – Auressa' };

  return {
    title: `${guide.title} | Auressa`,
    description: guide.description,
    alternates: { canonical: `/ratgeber/${slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
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
    publisher: { '@type': 'Organization', name: 'Auressa' }
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
  const all = await getPerfumes(2000);
  const bySlug = new Map(all.filter((p) => p.slug).map((p) => [p.slug as string, p]));

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <div className="backlink"><Link className="badge" href="/ratgeber">← Alle Ratgeber</Link></div>

        <article>
          <p className="eyebrow">Ratgeber</p>
          <h1 className="detail-title">{guide.title}</h1>
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

              {section.pairings && (
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

              {section.perfumes && (
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
            <Link className="button" href="/#quiz">
              Welcher Duft passt zu dir? Mach das Quiz
            </Link>
          </section>
        </article>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(guide)) }}
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
