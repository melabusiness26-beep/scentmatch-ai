import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { getGuide, guides, relatedGuides, type Guide } from '@/lib/guides';
import { getGuideFaqs, type GuideFaq } from '@/lib/guide-faqs';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { AffiliateButton } from '@/app/AffiliateButton';

export const revalidate = 3600;

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
    title: guide.title,
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
    image: `${SITE_URL}/ratgeber/${guide.slug}/opengraph-image`,
    author: { '@type': 'Organization', name: 'Auressa', url: SITE_URL },
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

// Hero-Stil je nach Thema des Ratgebers
function getGuideHero(slug: string): { icon: string; gradient: string; textColor: string } {
  if (/sommer|zitrus|frisch|aqua|fruehling/.test(slug))
    return { icon: '🌊', gradient: 'linear-gradient(145deg,#1a5c6b,#2d8fa0,#5bbccc)', textColor: '#e0f6f9' };
  if (/winter|oud|holzig|woody|ambra|warm/.test(slug))
    return { icon: '🪵', gradient: 'linear-gradient(145deg,#3d1f0a,#6b3a1f,#a05a2c)', textColor: '#f5e6d8' };
  if (/blumig|floral|hochzeit|braut|rose/.test(slug))
    return { icon: '🌸', gradient: 'linear-gradient(145deg,#6b1f3a,#a0456e,#d4789e)', textColor: '#fce8f0' };
  if (/vanille|suess|gourmand|schokolade|karamell/.test(slug))
    return { icon: '🍯', gradient: 'linear-gradient(145deg,#5a2d00,#8a4f10,#c08030)', textColor: '#fdefd6' };
  if (/dupe|guenstig|alternativ|preis|budget|unter|armaf|lattafa|zara/.test(slug))
    return { icon: '💸', gradient: 'linear-gradient(145deg,#1a3a1a,#2d6b2d,#4a9e4a)', textColor: '#e2f5e2' };
  if (/maenner|herren|homme/.test(slug))
    return { icon: '♂', gradient: 'linear-gradient(145deg,#0d1f3c,#1a3a6b,#2d5fa0)', textColor: '#d8e8f8' };
  if (/damen|frauen|femme/.test(slug))
    return { icon: '♀', gradient: 'linear-gradient(145deg,#3c0d2a,#6b1f4a,#9e3a7a)', textColor: '#fce8f4' };
  if (/geschenk|gift/.test(slug))
    return { icon: '🎁', gradient: 'linear-gradient(145deg,#2a0d3c,#4a1f6b,#7a3aae)', textColor: '#eee8f8' };
  if (/unisex/.test(slug))
    return { icon: '⚥', gradient: 'linear-gradient(145deg,#1a2a2a,#2d4a4a,#4a7070)', textColor: '#dff0f0' };
  if (/sternzeichen|horoskop/.test(slug))
    return { icon: '✨', gradient: 'linear-gradient(145deg,#0d0d2a,#1a1a5c,#2d2d8a)', textColor: '#e8e8ff' };
  if (/nischen|luxus|premium/.test(slug))
    return { icon: '👑', gradient: 'linear-gradient(145deg,#1a1205,#3d2d0a,#6b5218)', textColor: '#faefd0' };
  if (/reise|handgepaeck/.test(slug))
    return { icon: '✈️', gradient: 'linear-gradient(145deg,#051a2a,#0a3d5c,#156a9e)', textColor: '#d0eaf8' };
  if (/haut|hauttyp|vegan|natur/.test(slug))
    return { icon: '🌿', gradient: 'linear-gradient(145deg,#0d1f0d,#1f3d1a,#3d6b2d)', textColor: '#e0f0d8' };
  if (/fehler|tipps|ratgeber|einsteiger|lagerung|haltbarkeit/.test(slug))
    return { icon: '💡', gradient: 'linear-gradient(145deg,#2a1f05,#4a3a0d,#6b5520)', textColor: '#f8f0d8' };
  if (/schweiz|swiss/.test(slug))
    return { icon: '🇨🇭', gradient: 'linear-gradient(145deg,#3c0808,#6b1515,#ae2020)', textColor: '#fde8e8' };
  // Default: goldenes Auressa-Thema
  return { icon: '✦', gradient: 'linear-gradient(145deg,#241912,#4a3020,#7a5535)', textColor: '#f5e6d0' };
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
  const hero = getGuideHero(slug);

  // Alle Düfte einmal laden und nach slug nachschlagbar machen.
  const all = await getPerfumes(2000);
  const bySlug = new Map(all.filter((p) => p.slug).map((p) => [p.slug as string, p]));

  return (
    <main>
      <SiteHeader />

      {/* Hero-Banner */}
      <div style={{
        background: hero.gradient,
        padding: 'clamp(2.5rem,8vw,4.5rem) 1.25rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Dekorativer Schimmer-Ring */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: '-40%', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: 'clamp(2.5rem,8vw,4rem)', lineHeight: 1, marginBottom: '1rem' }}
               aria-hidden="true">{hero.icon}</div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.18em',
                      textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.6rem' }}>
            Ratgeber
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,5vw,2.4rem)',
                       fontWeight: 700, lineHeight: 1.15, color: hero.textColor, margin: '0 0 1rem' }}>
            {guide.title}
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '520px',
                      margin: '0 auto', lineHeight: 1.6 }}>
            {guide.description}
          </p>
        </div>
      </div>

      <div className="container">
        {/* Sichtbare Breadcrumb-Navigation */}
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation" style={{ marginTop: '1.5rem' }}>
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/ratgeber">Ratgeber</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span className="breadcrumb-current" aria-current="page">{guide.title}</span>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(guide)) }}
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
