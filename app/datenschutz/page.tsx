import type { Metadata } from 'next';
import SiteHeader from '@/app/SiteHeader';
import { OPERATOR } from '@/lib/operator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description: 'Wie Auressa mit deinen Daten umgeht – transparent und einfach erklärt.',
  alternates: { canonical: '/datenschutz' }
};

export default function DatenschutzPage() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="detail-hero">
          <div>
            <p className="eyebrow">Rechtliches</p>
            <h1 className="detail-title">Datenschutzerklärung</h1>
            <p className="lead">
              Der Schutz deiner Daten ist uns wichtig. Hier erklären wir einfach und transparent, welche
              Daten beim Besuch von Auressa anfallen.
            </p>
          </div>
        </section>

        <section className="section legal">
          <h2>1. Verantwortliche Stelle</h2>
          <p>
            Verantwortlich für die Datenbearbeitung auf dieser Website ist:
          </p>
          <p>
            {OPERATOR.name}<br />
            {OPERATOR.street}<br />
            {OPERATOR.zip} {OPERATOR.city}, {OPERATOR.country}<br />
            <strong>E-Mail:</strong> {OPERATOR.email}
          </p>

          <h2>2. Grundsatz</h2>
          <p>
            Auressa ist eine reine Informations- und Empfehlungsplattform. Du kannst die Website nutzen,
            ohne ein Konto anzulegen oder persönliche Daten anzugeben. Wir sammeln <strong>keine</strong>{' '}
            Namen, Adressen oder Zahlungsdaten und betreiben <strong>kein</strong> Werbe-Tracking und keine
            Analyse-Cookies.
          </p>

          <h2>3. Server-Logdaten (Hosting)</h2>
          <p>
            Diese Website wird bei <strong>Vercel Inc.</strong> (USA) gehostet. Beim Aufruf der Seite werden
            – wie bei jeder Website – automatisch technische Daten verarbeitet (z. B. IP-Adresse, Datum und
            Uhrzeit des Zugriffs, abgerufene Seite, Browsertyp). Diese Daten dienen dem sicheren und
            stabilen Betrieb der Website und werden nicht genutzt, um dich persönlich zu identifizieren.
          </p>

          <h2>4. Duftdatenbank</h2>
          <p>
            Die Düfte werden aus unserer Datenbank beim Anbieter <strong>Supabase</strong> geladen. Dabei
            werden nur die zur Anzeige nötigen Inhalte abgerufen – es werden keine personenbezogenen Daten
            von dir an Supabase übermittelt.
          </p>

          <h2>5. Speicherung im Browser (Quiz)</h2>
          <p>
            Wenn du das Duft-Quiz machst, werden deine Antworten ausschliesslich <strong>lokal in deinem
            Browser bzw. in der Adresse (Link)</strong> verarbeitet, damit dir dein Ergebnis angezeigt und
            das Teilen ermöglicht werden kann. Diese Daten landen <strong>nicht</strong> auf unseren Servern
            und werden nicht ausgewertet.
          </p>

          <h2>6. Affiliate-Links</h2>
          <p>
            Auf den Duftseiten findest du Links zu Partner-Shops („Jetzt ansehen"). Klickst du darauf,
            kann das jeweilige Partnernetzwerk (z. B. Commission Junction / Notino) ein Cookie setzen, um
            einen möglichen Kauf der Empfehlung zuzuordnen. Diese Verarbeitung erfolgt durch den jeweiligen
            Anbieter gemäss dessen Datenschutzbestimmungen. Für dich entstehen keine Mehrkosten.
          </p>

          <h2>7. Deine Rechte</h2>
          <p>
            Du hast im Rahmen der geltenden Datenschutzgesetze (insb. des Schweizer Datenschutzgesetzes,
            revDSG) das Recht auf Auskunft über die zu deiner Person bearbeiteten Daten sowie auf
            Berichtigung, Löschung oder Einschränkung der Bearbeitung. Wende dich dafür einfach an die oben
            genannte E-Mail-Adresse.
          </p>

          <h2>8. Änderungen</h2>
          <p>
            Wir passen diese Datenschutzerklärung an, wenn sich Funktionen der Website ändern (z. B. falls
            künftig ein Newsletter oder ein Login hinzukommt).
          </p>

          <p className="small legal-note">Stand: {OPERATOR.lastUpdated}</p>
        </section>
      </div>
    </main>
  );
}
