import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | Auressa',
  description: 'Datenschutzerklärung und Datenschutzrichtlinien von Auressa.',
};

export default function DatenschutzPage() {
  return (
    <article className="legal-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Datenschutzerklärung</h1>
          <p className="lead">Stand: Oktober 2024</p>
        </div>
      </section>

      <section className="page-content">
        <h2>1. Verantwortliche Person</h2>
        <p>
          Auressa (<strong>Melanie Viele</strong>) | Neuenhof | Schweiz
        </p>

        <h2>2. Datenerfassung und Verwendung</h2>
        <p>
          Auressa respektiert dein Recht auf Datenschutz. Wir erfassen und verarbeiten nur die Daten, die zur Bereitstellung unseres Dienstes notwendig sind:
        </p>
        <ul>
          <li><strong>Quiz-Antworten:</strong> werden verwendet, um deine persönlichen Duft-Empfehlungen zu berechnen und sind nicht mit deiner Identität verknüpft</li>
          <li><strong>Cookies:</strong> speichern deine Datenschutzentscheidung lokal in deinem Browser</li>
          <li><strong>Analytik:</strong> anonyme Besucherzahlen helfen uns, Auressa zu verbessern</li>
        </ul>

        <h2>3. Cookies</h2>
        <p>
          Auressa setzt nur <strong>funktionale Cookies</strong> ein, um:
        </p>
        <ul>
          <li>deine Datenschutzentscheidung zu speichern</li>
          <li>die Website zu optimieren</li>
        </ul>
        <p>
          <strong>Keine Tracking-Cookies</strong> – wir verkaufen deine Daten nicht und teilen sie nicht mit Dritten.
        </p>

        <h2>4. Affiliate-Links</h2>
        <p>
          Auressa verdient durch Affiliate-Links Provisionen. Diese Links sind gekennzeichnet mit <code>rel="sponsored"</code> und sind transparent als Werbung erkennbar.
          Dein Klick auf einen Affiliate-Link hat keine Auswirkungen auf deine Datensicherheit.
        </p>

        <h2>5. Deine Rechte</h2>
        <p>Du hast das Recht auf:</p>
        <ul>
          <li><strong>Auskunft:</strong> welche Daten über dich erfasst werden</li>
          <li><strong>Berichtigung:</strong> wenn Daten fehlerhaft sind</li>
          <li><strong>Löschung:</strong> „Recht auf Vergessenwerden"</li>
          <li><strong>Widerspruch:</strong> gegen die Verarbeitung deiner Daten</li>
        </ul>
        <p>
          Kontaktiere uns unter <strong>melanie.viele@auressa.ch</strong>, um deine Rechte auszuüben.
        </p>

        <h2>6. Externe Links</h2>
        <p>
          Auressa verlinkt zu externen Shops (Notino, Flaconi, etc.). Diese Webseiten haben ihre eigenen Datenschutzerklärungen.
          Wir sind nicht verantwortlich für deren Datenschutzpraktiken.
        </p>

        <h2>7. Sicherheit</h2>
        <p>
          Deine Daten werden mit modernen Sicherheitsverfahren geschützt.
          Auressa nutzt HTTPS-Verschlüsselung für alle Verbindungen.
        </p>

        <h2>8. Kontakt</h2>
        <p>
          <strong>Fragen zum Datenschutz?</strong>
          <br />
          Schreib uns: <a href="mailto:melanie.viele@auressa.ch">melanie.viele@auressa.ch</a>
        </p>

        <p className="legal-footer">
          Diese Datenschutzerklärung unterliegt Schweizer Recht und der DSGVO (EU-Datenschutz-Grundverordnung).
        </p>
      </section>
    </article>
  );
}
