import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import MoodIcon from '@/app/MoodIcon';
import { getPerfumes } from '@/lib/perfumes';
import { SCENT_TYPES, getScentType, rankByTyp, typReason } from '@/lib/dufttyp';
import TypResults from './TypResults';

// Stündlich neu generieren – frische Daten, schnelle Auslieferung (wie die Duftseiten).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Alle Dufttyp-Seiten beim Build vorerzeugen (gut für SEO und Tempo).
export async function generateStaticParams() {
  return SCENT_TYPES.map((t) => ({ slug: t.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const typ = getScentType(slug);
  if (!typ) return { title: 'Dufttyp nicht gefunden' };

  // Haupttitel ohne „| Auressa" – das globale Titel-Template hängt die Marke an.
  const title = `Dufttyp „${typ.title}" – diese Düfte passen zu dir`;
  const description = `${typ.tagline} ${typ.scentText}`;

  return {
    title,
    description,
    alternates: { canonical: `/dufttyp/${slug}` },
    openGraph: {
      title: `${title} | Auressa`,
      description,
      type: 'website',
      url: `${SITE_URL}/dufttyp/${slug}`
    }
  };
}

export default async function TypPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const typ = getScentType(slug);
  if (!typ) notFound();

  const perfumes = await getPerfumes(2000);
  const ranked = rankByTyp(perfumes, typ, '', 30);
  const items = ranked.map((p) => ({ perfume: p, reason: typReason(p, typ) }));
  const others = SCENT_TYPES.filter((t) => t.code !== slug);

  // Häufige Fragen – einzigartiger Text je Typ (gut für Google) und echter Mehrwert.
  const faq = [
    { q: `Was zeichnet den Dufttyp „${typ.title}" aus?`, a: typ.intro },
    { q: `Welche Düfte passen zu „${typ.title}"?`, a: typ.scentText },
    {
      q: 'Sind die Empfehlungen für Damen oder Herren?',
      a: 'Für beide. Mit dem Filter „Damen", „Herren" oder „Für alle" passt du die Liste mit einem Tippen an dein Wunsch-Geschlecht an.'
    },
    {
      q: 'Wie finde ich heraus, welcher Dufttyp ich bin?',
      a: 'Mach den kurzen Test: 7 Fragen zu deinem Alltag und deiner Persönlichkeit – ganz ohne Parfüm-Fachwissen. Am Ende bekommst du deinen Dufttyp mit passenden Empfehlungen.'
    }
  ];

  const topForSchema = ranked.slice(0, 9).filter((p) => p.slug);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a }
        }))
      },
      {
        '@type': 'ItemList',
        name: `Düfte für den Dufttyp „${typ.title}"`,
        itemListElement: topForSchema.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/duft/${p.slug}`,
          name: p.perfume_name
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Dufttyp-Test', item: `${SITE_URL}/dufttyp` },
          { '@type': 'ListItem', position: 3, name: typ.title, item: `${SITE_URL}/dufttyp/${typ.code}` }
        ]
      }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Startseite</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/dufttyp">Dufttyp-Test</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{typ.title}</span>
        </nav>

        <section
          className="section card mood-hero"
          style={{ background: `linear-gradient(160deg, ${typ.tone}33, rgba(255,255,255,.55))` }}
        >
          <p className="eyebrow">Dein Dufttyp</p>
          <h1 className="mood-hero-title">
            <span
              className="mood-icon mood-icon-lg"
              style={{ background: `${typ.tone}22`, borderColor: `${typ.tone}55` }}
            >
              <MoodIcon name={typ.icon} />
            </span>
            {typ.title}
          </h1>
          <p className="lead">{typ.tagline}</p>
          <div className="typ-traits">
            {typ.traits.map((trait) => (
              <span className="typ-trait" key={trait}>{trait}</span>
            ))}
          </div>
          <p className="lead typ-intro">{typ.intro}</p>
          <p className="small typ-scent"><strong>So duftet dein Typ:</strong> {typ.scentText}</p>
        </section>

        <TypResults
          items={items}
          typ={{ emoji: typ.emoji, title: typ.title, code: typ.code }}
        />

        <section className="section">
          <p className="eyebrow">Häufige Fragen</p>
          <h2>Gut zu wissen</h2>
          <div className="faq">
            {faq.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p className="small">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section">
          <p className="eyebrow">Die anderen Dufttypen</p>
          <h2>Wer ist noch dabei?</h2>
          <p className="small">
            Kennst du jemanden, der genau so tickt? Schick der Person den Test – oder direkt ihren Typ.
          </p>
          <div className="grid typ-grid">
            {others.map((t) => (
              <Link
                key={t.code}
                href={`/dufttyp/${t.code}`}
                className="tile-family mood-card"
                style={{ background: `linear-gradient(160deg, ${t.tone}26, rgba(255,255,255,.55))` }}
              >
                <span
                  className="mood-icon"
                  style={{ background: `${t.tone}22`, borderColor: `${t.tone}55` }}
                >
                  <MoodIcon name={t.icon} />
                </span>
                <span className="mood-title">{t.title}</span>
                <span className="small">{t.tagline}</span>
              </Link>
            ))}
          </div>
          <div className="cta">
            <Link className="button" href="/dufttyp">Welcher Typ bist du? Zum Test</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
