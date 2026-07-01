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
          <h2>Warum es Auressa gibt</h2>
          <p>
            Vor dem Parfümregal zu stehen kann überfordern: hunderte Flakons, fremde Begriffe und stolze
            Preise. Auressa ist aus dem Wunsch entstanden, diese Welt einfach und verständlich zu machen –
            ohne Fachchinesisch und ohne Verkaufsdruck. Statt „was gerade beworben wird" zeigen wir dir, was
            zu deinem Geschmack, deinem Anlass und deinem Budget passt.
          </p>
          <p>
            Hinter Auressa steht {OPERATOR.name}, eine Duftliebhaberin aus der {OPERATOR.country}. Die
            Plattform wird mit viel Sorgfalt und Liebe zum Detail gepflegt – Schritt für Schritt, mit dem
            Ziel, die modernste und ehrlichste Duft-Findung im deutschsprachigen Raum zu werden.
          </p>
        </section>

        <section className="section">
          <h2>Wie wir Düfte auswählen</h2>
          <p>
            Unser Katalog wird redaktionell und faktenbasiert gepflegt: Jeder Duft ist mit Duftfamilie,
            Noten, Saison, Anlass und einem Richtpreis erfasst. Der „Auressa-Score" ist eine redaktionelle
            Einschätzung – kein gekauftes Ranking und kein vorgetäuschtes Nutzer-Rating.
          </p>
          <p>
            Beim Thema „Dupes" (günstige Alternativen) bleiben wir ehrlich: Ein Dupe riecht nie zu 100 %
            identisch wie das teure Original – wir sagen dir, wie nah es wirklich kommt, statt zu viel zu
            versprechen.
          </p>
        </section>

        <section className="section">
          <h2>Unabhängig – trotz Partner-Links</h2>
          <p>
            Auressa finanziert sich teilweise über Affiliate-Links: Wenn du über einen Partner-Link bei
            einem Shop kaufst, erhalten wir ggf. eine kleine Provision – für
            dich ohne Mehrkosten. Diese Links kennzeichnen wir transparent. Unsere Empfehlungen richten sich
            nach deinem Geschmack, nicht nach der Provision.
          </p>
          <p className="small">
            Fragen, Feedback oder ein Duft-Wunsch? Schreib uns gern:{' '}
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
