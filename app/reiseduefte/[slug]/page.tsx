import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { getPerfumes, moodNoteProfile } from '@/lib/perfumes';
import {
  DESTINATIONS,
  getDestination,
  rankByDestination,
  destinationReason,
  CATEGORY_LABELS
} from '@/lib/destinations';
import DestinationResults from './DestinationResults';

// Stündlich neu generieren – frische Daten, schnelle Auslieferung (wie die Duftseiten).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Alle Reise-Seiten beim Build vorerzeugen (gut für SEO und Tempo).
export async function generateStaticParams() {
  return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) return { title: 'Reiseziel nicht gefunden' };

  // Haupttitel ohne „| Auressa" – das globale Titel-Template hängt die Marke an.
  const title = `Welcher Duft passt zu ${dest.name}?`;
  const description = dest.intro;

  return {
    title,
    description,
    alternates: { canonical: `/reiseduefte/${slug}` },
    openGraph: {
      title: `${title} | Auressa`,
      description,
      type: 'website',
      url: `${SITE_URL}/reiseduefte/${slug}`
    }
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = getDestination(slug);
  if (!dest) notFound();

  const perfumes = await getPerfumes(2000);
  const ranked = rankByDestination(perfumes, dest, '', 30);
  const items = ranked.map((p) => ({ perfume: p, reason: destinationReason(p, dest) }));
  const dna = moodNoteProfile(ranked.slice(0, 12));
  const others = DESTINATIONS.filter((d) => d.slug !== slug && d.category === dest.category).slice(0, 5);
  const result = `Diese Düfte fangen die Stimmung von ${dest.name} ein – ${dest.character}.`;

  // Häufige Fragen – liefern einzigartigen Text (gut für Google) und echten Mehrwert.
  const dnaText = dna.length ? dna.map((d) => d.label.toLowerCase()).join(', ') : 'verschiedene Noten';
  const notesText = dest.noteKeywords.slice(0, 4).join(', ');
  const faq = [
    { q: `Welcher Duft passt zu ${dest.name}?`, a: dest.intro },
    {
      q: `Welche Noten passen zu ${dest.name}?`,
      a: `Typisch für ${dest.name} sind Noten wie ${notesText}. Auressa wertet die Duftnoten jedes Parfüms aus und ordnet passende Düfte automatisch diesem Reiseziel zu – ganz ohne Raten.`
    },
    {
      q: 'Sind die Empfehlungen für Damen oder Herren?',
      a: 'Für beide. Mit dem Filter „Damen", „Herren" oder „Für alle" passt du die Liste mit einem Tippen an dein Wunsch-Geschlecht an.'
    },
    {
      q: 'Gibt es auch günstige Alternativen?',
      a: 'Ja – zu vielen teureren Düften gibt es ähnlich riechende, günstigere Varianten. Öffne ein Duftprofil und schau unter „Günstige Alternativen", oder stöbere in der Duftdatenbank.'
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
        name: `Düfte, die zu ${dest.name} passen`,
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
          { '@type': 'ListItem', position: 2, name: 'Reise-Düfte', item: `${SITE_URL}/reiseduefte` },
          { '@type': 'ListItem', position: 3, name: dest.name, item: `${SITE_URL}/reiseduefte/${dest.slug}` }
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
          <Link href="/reiseduefte">Reise-Düfte</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{dest.name}</span>
        </nav>
        <section
          className="section card mood-hero"
          style={{ background: `linear-gradient(160deg, ${dest.tone}33, rgba(255,255,255,.55))` }}
        >
          <p className="eyebrow">Reise-Düfte · {CATEGORY_LABELS[dest.category]}</p>
          <h1 className="mood-hero-title">
            <span
              className="mood-icon mood-icon-lg dest-emoji"
              style={{ background: `${dest.tone}22`, borderColor: `${dest.tone}55` }}
            >
              {dest.emoji}
            </span>
            {dest.name}
          </h1>
          <p className="lead">{dest.intro}</p>

          {dna.length > 0 && (
            <div className="mood-dna">
              <p className="small mood-dna-title">Typische Duft-DNA von {dest.name}</p>
              {dna.map((d) => (
                <div className="mood-dna-row" key={d.code}>
                  <span className="small mood-dna-label">{d.label}</span>
                  <div className="scorebar"><span style={{ width: `${d.pct}%`, background: dest.tone }} /></div>
                </div>
              ))}
            </div>
          )}
        </section>

        <DestinationResults
          items={items}
          dest={{ emoji: dest.emoji, name: dest.name, slug: dest.slug, result }}
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

        {others.length > 0 && (
          <section className="section">
            <p className="eyebrow">Weitere Reiseziele</p>
            <h2>Wohin geht's als Nächstes?</h2>
            <div className="grid mood-grid">
              {others.map((d) => (
                <Link
                  key={d.slug}
                  href={`/reiseduefte/${d.slug}`}
                  className="tile-family mood-card"
                  style={{ background: `linear-gradient(160deg, ${d.tone}26, rgba(255,255,255,.55))` }}
                >
                  <span
                    className="mood-icon dest-emoji"
                    style={{ background: `${d.tone}22`, borderColor: `${d.tone}55` }}
                  >
                    {d.emoji}
                  </span>
                  <span className="mood-title">{d.name}</span>
                  <span className="small">{d.tagline}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
