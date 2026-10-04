import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { OPERATOR } from '@/lib/operator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Wer hinter Auressa steckt und warum: eine unabhängige Duft-Findungs-Plattform aus der Schweiz – ehrliche Empfehlungen, Duft-Quiz und günstige Alternativen.',
  alternates: { canonical: '/ueber-uns' }
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Über Auressa',
  url: `${SITE_URL}/ueber-uns`,
  description:
    'Auressa ist eine unabhängige Duft-Findungs-Plattform aus der Schweiz mit Duft-Quiz, Match-Engine und ehrlichen Ratgebern.'
};

export default function UeberUnsPage() {
  return (
    <main>
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Über Auressa</p>
            <h1 className="detail-title">Duft finden – ehrlich, einfach, aus der Schweiz</h1>
            <p className="lead">
              Auressa hilft dir, aus hunderten Parfüms genau die zu finden, die wirklich zu dir passen –
              mit einem eleganten Duft-Quiz, einer nachvollziehbaren Match-Engine und ehrlichen Ratgebern.
            </p>
          </div>
        </section>

        <section className="section">
          <h2>Über mich</h2>
          <p>
            Ich bin {OPERATOR.name} und habe Auressa in der {OPERATOR.country} gegründet. Ich liebe Düfte und
            habe selbst schon zu viele Flaschen gekauft, die dann ungenutzt im Schrank standen.
          </p>
        </section>

        <section className="section">
          <h2>Warum Auressa</h2>
          <p>
            Ein Parfum kostet schnell 100 oder 200 Franken, und oft merkt man erst zu Hause, dass er doch
            nicht passt. Ich wollte eine Seite, die beim Finden hilft, bevor man kauft: verständlich, ehrlich
            und auf Deutsch.
          </p>
        </section>

        <section className="section">
          <h2>So entstehen die Empfehlungen</h2>
          <p>
            Das Duft-Quiz stellt dir 14 Fragen zu Duftrichtung, Anlass, Saison, Intensität und Budget. Die
            Match-Engine vergleicht deine Antworten mit über 400 Düften und berechnet für jeden einen
            Match-Score von 0 bis 100.
          </p>
        </section>

        <section className="section">
          <h2>Ehrlich bei Dupes</h2>
          <p>
            Ein günstiger Duftzwilling riecht ähnlich, aber nie identisch. Deshalb steht bei jeder Alternative
            dabei, wo die Unterschiede liegen.
          </p>
        </section>

        <section className="section">
          <h2>Preise in Franken</h2>
          <p>
            Alle Preise sind Richtpreise in CHF. Massgebend ist immer der aktuelle Preis im Shop.
          </p>
        </section>

        <section className="section">
          <h2>Kontakt</h2>
          <p>
            Du hast Fragen, Vorschläge oder willst mir einfach Hallo sagen? Schreib mir gern:{' '}
            <a href={`mailto:${OPERATOR.email}`}>{OPERATOR.email}</a>.
          </p>
        </section>

        <section className="section card">
          <h2>Bereit, deinen Duft zu finden?</h2>
          <p>Mach das Quiz – in wenigen Minuten zeigen wir dir Düfte, die wirklich zu dir passen.</p>
          <div className="cta">
            <Link className="button" href="/#quiz">Quiz starten</Link>
            <Link className="button secondary" href="/duefte">Alle Düfte ansehen</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
