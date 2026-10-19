import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum | Auressa',
  description: 'Impressum und rechtliche Informationen zu Auressa.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ImpressumPage() {
  return (
    <article className="legal-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Impressum</h1>
          <p className="lead">Rechtliche Informationen</p>
        </div>
      </section>

      <section className="page-content">
        <h2>Anbieter</h2>
        <address>
          <strong>Auressa – Duft Finder</strong>
          <br />
          Melanie Viele
          <br />
          Neuenhof
          <br />
          Schweiz
        </address>

        <h2>Kontakt</h2>
        <ul>
          <li>
            <strong>E-Mail:</strong>{' '}
            <a href="mailto:melanie.viele@auressa.ch">melanie.viele@auressa.ch</a>
          </li>
          <li>
            <strong>Website:</strong> <a href="https://auressa.ch">https://auressa.ch</a>
          </li>
        </ul>

        <h2>Rechtliche Informationen</h2>
        <ul>
          <li>
            <strong>Land:</strong> Schweiz
          </li>
          <li>
            <strong>Rechtsjurisdiktion:</strong> Schweizer Recht, EU-DSGVO
          </li>
          <li>
            <strong>USt-Id:</strong> Auf Anfrage
          </li>
        </ul>

        <h2>Affiliate-Verlinkungen</h2>
        <p>
          Diese Website enthält Affiliate-Links zu:
        </p>
        <ul>
          <li><strong>Notino.ch</strong> via CJ Affiliate (Commission Junction)</li>
          <li><strong>Flaconi.de</strong> via Awin</li>
          <li><strong>Amazon PartnerNet</strong> (falls aktiviert)</li>
        </ul>
        <p>
          Wir verdienen Provisionen durch diese Links. Das hat keine Auswirkung auf die Preise für dich.
          Alle Links sind gekennzeichnet mit <code>rel="sponsored"</code>.
        </p>

        <h2>Haftungsausschluss</h2>
        <p>
          Der Inhalt von Auressa wurde sorgfältig zusammengestellt. Trotzdem können wir keine Haftung für die Richtigkeit,
          Vollständigkeit und Aktualität der bereitgestellten Daten übernehmen.
        </p>
        <p>
          Besonders die Duftnoten und Beschreibungen basieren auf verfügbaren Daten und subjektiven Bewertungen.
          Die Ergebnisse unseres Quiz sind Empfehlungen, keine Garantien.
        </p>

        <h2>Externe Verlinkungen</h2>
        <p>
          Auressa verlinkt zu externen Webseiten von Einzelhandelspartnern. Wir sind nicht verantwortlich für:
        </p>
        <ul>
          <li>Inhalte dieser Webseiten</li>
          <li>Verfügbarkeit und Funktionalität</li>
          <li>Datenschutz und Sicherheit</li>
        </ul>

        <h2>Änderungen</h2>
        <p>
          Wir behalten uns vor, dieses Impressum jederzeit ohne Ankündigung zu ändern.
        </p>

        <p className="legal-footer">
          <strong>Zuletzt aktualisiert:</strong> Oktober 2024
        </p>
      </section>
    </article>
  );
}
