import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { getPerfumes, rankByMood, moodNoteProfile, moodReason, getMood, MOOD_TIPS, MOODS } from '@/lib/perfumes';
import MoodResults from './MoodResults';

// Stündlich neu generieren – frische Daten, schnelle Auslieferung (wie die Duftseiten).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

// Alle Stimmungs-Seiten beim Build vorerzeugen (gut für SEO und Tempo).
export async function generateStaticParams() {
  return MOODS.map((m) => ({ mood: m.code }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ mood: string }>;
}): Promise<Metadata> {
  const { mood: code } = await params;
  const mood = getMood(code);
  if (!mood) return { title: 'Stimmung nicht gefunden – Auressa' };

  const title = `Welcher Duft, ${mood.phrase}? | Auressa`;
  const description = mood.intro;

  return {
    title,
    description,
    alternates: { canonical: `/stimmungen/${code}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/stimmungen/${code}`
    }
  };
}

export default async function MoodPage({ params }: { params: Promise<{ mood: string }> }) {
  const { mood: code } = await params;
  const mood = getMood(code);
  if (!mood) notFound();

  const perfumes = await getPerfumes(2000);
  const ranked = rankByMood(perfumes, mood, '', 30);
  const items = ranked.map((p) => ({ perfume: p, reason: moodReason(p, mood) }));
  const dna = moodNoteProfile(ranked.slice(0, 12));
  const others = MOODS.filter((m) => m.code !== code);

  // Häufige Fragen – liefern einzigartigen Text (gut für Google) und echten Mehrwert.
  const dnaText = dna.length ? dna.map((d) => d.label.toLowerCase()).join(', ') : 'verschiedene Noten';
  const faq = [
    { q: `Welche Düfte passen, ${mood.phrase}?`, a: mood.intro },
    {
      q: 'Woran erkenne ich solche Düfte?',
      a: `Typisch sind ${dnaText}. Auressa wertet die Noten jedes Dufts aus und ordnet ihn automatisch dieser Stimmung zu – ganz ohne Raten.`
    },
    {
      q: 'Sind die Empfehlungen für Damen oder Herren?',
      a: 'Für beide. Mit dem Filter „Damen", „Herren" oder „Für alle" passt du die Liste mit einem Tippen an dein Wunsch-Geschlecht an.'
    },
    {
      q: 'Wie stark soll ich so einen Duft auftragen?',
      a:
        mood.sillage === 'low'
          ? 'Diese Düfte sind eher dezent – ein bis zwei Sprüher reichen, gern direkt auf die Haut.'
          : mood.sillage === 'high'
            ? 'Diese Düfte sind intensiv – ein, zwei Sprüher genügen, sonst wird es schnell zu viel.'
            : 'Zwei bis drei Sprüher auf Hals und Handgelenke passen meistens gut.'
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
        name: `Düfte für die Stimmung „${mood.title}"`,
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
          { '@type': 'ListItem', position: 2, name: 'Stimmungen', item: `${SITE_URL}/stimmungen` },
          { '@type': 'ListItem', position: 3, name: mood.title, item: `${SITE_URL}/stimmungen/${mood.code}` }
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
          <Link href="/stimmungen">Stimmungen</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{mood.title}</span>
        </nav>
        <section
          className="section card mood-hero"
          style={{ background: `linear-gradient(160deg, ${mood.tone}33, rgba(255,255,255,.55))` }}
        >
          <p className="eyebrow">Duft nach Stimmung</p>
          <h1><span aria-hidden="true">{mood.emoji}</span> {mood.title}</h1>
          <p className="lead">{mood.intro}</p>

          {dna.length > 0 && (
            <div className="mood-dna">
              <p className="small mood-dna-title">Typische Duft-DNA dieser Stimmung</p>
              {dna.map((d) => (
                <div className="mood-dna-row" key={d.code}>
                  <span className="small mood-dna-label">{d.label}</span>
                  <div className="scorebar"><span style={{ width: `${d.pct}%`, background: mood.tone }} /></div>
                </div>
              ))}
            </div>
          )}
        </section>

        <MoodResults
          items={items}
          mood={{ emoji: mood.emoji, title: mood.title, result: mood.result, code: mood.code }}
        />

        {MOOD_TIPS[code] && (
          <section className="section">
            <p className="eyebrow">Tipp</p>
            <h2>Worauf du achten kannst</h2>
            <p className="lead mood-tips">{MOOD_TIPS[code]}</p>
          </section>
        )}

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
          <p className="eyebrow">Andere Stimmungen</p>
          <h2>Wie wäre es hiermit?</h2>
          <div className="grid mood-grid">
            {others.map((m) => (
              <Link
                key={m.code}
                href={`/stimmungen/${m.code}`}
                className="tile-family mood-card"
                style={{ background: `linear-gradient(160deg, ${m.tone}26, rgba(255,255,255,.55))` }}
              >
                <span className="mood-emoji" aria-hidden="true">{m.emoji}</span>
                <span className="mood-title">{m.title}</span>
                <span className="small">{m.subtitle}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
