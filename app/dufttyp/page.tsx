import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import MoodIcon from '@/app/MoodIcon';
import { SCENT_TYPES } from '@/lib/dufttyp';
import DufttypQuiz from './DufttypQuiz';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Welcher Dufttyp bist du? Mach den Test',
  description:
    'Finde in 7 Fragen heraus, welcher Dufttyp du bist – Sonnenschein, Naschkatze, stille Eleganz oder magnetische Aura? Mit passenden Parfüm-Empfehlungen und teilbarem Ergebnis.',
  alternates: { canonical: '/dufttyp' },
  openGraph: {
    title: 'Welcher Dufttyp bist du? Mach den Test | Auressa',
    description:
      'Finde in 7 Fragen heraus, welcher Dufttyp du bist – mit passenden Parfüm-Empfehlungen und teilbarem Ergebnis.',
    url: `${SITE_URL}/dufttyp`,
    type: 'website'
  }
};

export default function DufttypPage() {
  const faq = [
    {
      q: 'Wie funktioniert der Dufttyp-Test?',
      a: 'Du beantwortest 7 kurze Fragen zu deinem Alltag und deiner Persönlichkeit – ganz ohne Parfüm-Fachwissen. Daraus ermittelt Auressa deinen Dufttyp und zeigt dir Düfte, deren Noten und Charakter dazu passen.'
    },
    {
      q: 'Kann ich mehrere Dufttypen sein?',
      a: 'Ja, viele Menschen tragen je nach Stimmung und Anlass unterschiedliche Düfte. Der Test zeigt dir den Typ, der aktuell am stärksten zu dir passt – du kannst ihn jederzeit wiederholen und anders antworten.'
    },
    {
      q: 'Ist der Test für Damen und Herren?',
      a: 'Für beide. Auf deiner Ergebnis-Seite kannst du die Duft-Empfehlungen mit einem Tippen auf „Damen", „Herren" oder „Für alle" filtern.'
    },
    {
      q: 'Was ist der Unterschied zum Duft-Quiz?',
      a: 'Das Duft-Quiz fragt gezielt nach deinen Duft-Vorlieben (Noten, Budget, Anlass) und liefert dein persönliches Match. Der Dufttyp-Test geht spielerischer an die Sache: Er schließt von deiner Persönlichkeit auf deinen Duftstil – ideal, wenn du gar nicht weißt, wo du anfangen sollst.'
    }
  ];

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
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Dufttyp-Test', item: `${SITE_URL}/dufttyp` }
        ]
      }
    ]
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SiteHeader />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Persönlichkeitstest</p>
          <h1>Welcher Dufttyp bist du?</h1>
          <p className="lead">
            7 Fragen, kein Fachwissen nötig: Verrate uns, wie du tickst – und wir verraten dir,
            welcher Duftstil zu deiner Persönlichkeit passt. Am Ende wartet dein Dufttyp mit
            passenden Empfehlungen, den du auch mit Freunden teilen kannst.
          </p>
        </section>

        <DufttypQuiz />

        <section className="section">
          <p className="eyebrow">Die sechs Dufttypen</p>
          <h2>Welcher davon bist du?</h2>
          <p className="small">
            Neugierig? Du kannst dir die Typen auch direkt ansehen – aber der Test ist ehrlicher. 😉
          </p>
          <div className="grid typ-grid">
            {SCENT_TYPES.map((t) => (
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
        </section>

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
      </div>
    </main>
  );
}
