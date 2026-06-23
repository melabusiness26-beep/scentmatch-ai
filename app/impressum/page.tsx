import type { Metadata } from 'next';
import SiteHeader from '@/app/SiteHeader';
import { OPERATOR } from '@/lib/operator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Rechtliche Angaben und Kontakt zum Betreiber von Vaelo.',
  alternates: { canonical: '/impressum' }
};

export default function ImpressumPage() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Rechtliches</p>
            <h1 className="detail-title">Impressum</h1>
            <p className="lead">Angaben zur verantwortlichen Person dieser Website.</p>
          </div>
        </section>

        <section className="section legal">
          <h2>Betreiberin der Website</h2>
          <p>
            {OPERATOR.name}<br />
            {OPERATOR.street}<br />
            {OPERATOR.zip} {OPERATOR.city}<br />
            {OPERATOR.country}
          </p>
          <p>
            <strong>E-Mail:</strong> {OPERATOR.email}
          </p>
          <p className="small">
            Diese Website wird von einer Privatperson betrieben. Es besteht kein Eintrag im Handelsregister.
          </p>

          <h2>Haftung für Inhalte</h2>
          <p>
            Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte – insbesondere der Duftbeschreibungen, Noten und
            Preisangaben – kann jedoch keine Gewähr übernommen werden. Preise und Verfügbarkeiten verstehen
            sich als unverbindliche Richtwerte und können bei den jeweiligen Anbietern abweichen.
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Diese Website enthält Links zu externen Websites Dritter (u. a. zu Online-Shops). Auf deren
            Inhalte haben wir keinen Einfluss; für diese fremden Inhalte ist stets der jeweilige Anbieter
            verantwortlich. Zum Zeitpunkt der Verlinkung waren keine rechtswidrigen Inhalte erkennbar.
          </p>

          <h2>Affiliate-Hinweis</h2>
          <p>
            Vaelo finanziert sich teilweise über Affiliate-Links. Klickst du auf einen mit
            „Affiliate" gekennzeichneten Link und kaufst beim Partner-Shop ein, erhalten wir ggf. eine
            kleine Provision. Für dich entstehen dadurch keine Mehrkosten – der Preis bleibt gleich.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Betreiberin erstellten Inhalte und Werke auf dieser Website unterliegen dem
            Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Marken- und Produktnamen sind
            Eigentum der jeweiligen Inhaber und dienen ausschliesslich der Beschreibung und Zuordnung der
            Düfte.
          </p>

          <p className="small legal-note">Stand: {OPERATOR.lastUpdated}</p>
        </section>
      </div>
    </main>
  );
}
