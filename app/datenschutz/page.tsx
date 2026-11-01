import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutz',
  description: 'Datenschutzerklärung von Auressa: welche Daten wir bearbeiten, wofür und welche Rechte du hast.',
  robots: 'noindex, follow',
};

// Beschreibt, was die Website tatsächlich tut (Stand des Codes). Bei neuen Diensten
// – z. B. wenn der Duft-Scanner startet – diese Seite zuerst anpassen.
export default function DatenschutzPage() {
  const lastUpdated = '1. November 2026';

  return (
    <main>
      <div className="legal-container">
        <article className="legal-content">
          <h1>Datenschutzerklärung</h1>
          <p className="last-updated">Zuletzt aktualisiert: {lastUpdated}</p>

          <section>
            <h2>1. Verantwortliche</h2>
            <p>
              <strong>Melanie Viele</strong><br />
              Neuenhof, AG<br />
              Schweiz<br />
              <a href="mailto:mela.business26@gmail.com">mela.business26@gmail.com</a>
            </p>
          </section>

          <section>
            <h2>2. Geltungsbereich</h2>
            <p>
              Diese Datenschutzerklärung gilt für die Website <strong>auressa.ch</strong> mit Duft-Katalog, Quiz,
              Duft-Detektiv, Wunschliste und Newsletter. Wir halten uns an das Schweizer Datenschutzgesetz (DSG) und,
              soweit anwendbar, an die Datenschutz-Grundverordnung der EU (DSGVO).
            </p>
          </section>

          <section>
            <h2>3. Welche Daten wir bearbeiten</h2>

            <h3>3.1 Beim Besuch der Website</h3>
            <p>
              Unser Hosting-Anbieter Vercel erfasst beim Aufruf einer Seite technisch notwendige Daten (Server-Logs):
              IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browser und Betriebssystem. Diese Daten braucht es, damit die
              Website ausgeliefert werden kann und sicher läuft.
            </p>

            <h3>3.2 Angaben, die nur in deinem Browser gespeichert werden</h3>
            <p>
              Einige Funktionen speichern Angaben im Speicher deines Browsers (Local Storage) – nicht bei uns:
            </p>
            <ul>
              <li>deine Wahl im Cookie-Hinweis</li>
              <li>deine Wunschliste und gemerkte Düfte</li>
              <li>deine Duftprofile und die Antworten im Duft-Detektiv</li>
              <li>welche Düfte, Kategorien und Ratgeber du angeschaut hast (für passendere Empfehlungen)</li>
            </ul>
            <p>
              Diese Angaben bleiben auf deinem Gerät. Die Antworten im Quiz werden direkt in deinem Browser ausgewertet und nicht
              an uns übertragen. Du kannst alles jederzeit löschen, indem du die Website-Daten in deinem Browser löschst.
            </p>

            <h3>3.3 Newsletter</h3>
            <p>
              Wenn du dich für den Newsletter anmeldest, speichern wir deine <strong>E-Mail-Adresse</strong>, freiwillig deinen
              <strong> Namen</strong> und deine <strong>Kategorie</strong> (Frauendüfte, Männerdüfte, Unisex), den Ort der
              Anmeldung auf der Website und den Zeitpunkt. Zusätzlich übermitteln wir die in 3.2 genannten Interessen (angeschaute
              Düfte, Kategorien und Ratgeber), damit der Newsletter besser zu dir passt.
            </p>
            <p>
              Die Anmeldung gilt erst, wenn du den Link in der Bestätigungs-E-Mail anklickst (Double-Opt-in). Du kannst dich
              jederzeit abmelden – über den Link im Newsletter oder per E-Mail an uns. Gespeichert werden die Daten in unserer
              Datenbank bei Supabase; für den Versand nutzen wir den E-Mail-Dienst Brevo.
            </p>

            <h3>3.4 Besucher-Statistik (nur mit deiner Einwilligung)</h3>
            <p>
              Nur wenn du im Cookie-Hinweis <strong>„Statistik erlauben“</strong> wählst, nutzen wir <strong>Vercel Web
              Analytics</strong>. Damit sehen wir in zusammengefasster Form, welche Seiten aufgerufen werden, von welcher Seite
              Besucher kommen, welche Gerätetypen sie nutzen und aus welchem Land. Vercel Web Analytics setzt keine Cookies.
              Wählst du „Ablehnen“, wird die Statistik nicht geladen.
            </p>

            <h3>3.5 Bilder von Unsplash</h3>
            <p>
              Einige Titelbilder in den Ratgebern werden direkt vom Bilderdienst Unsplash geladen. Dabei erhält Unsplash deine
              IP-Adresse, wie bei jedem Abruf einer Datei aus dem Internet.
            </p>

            <h3>3.6 Duft-Scanner</h3>
            <p>
              Der Duft-Scanner ist derzeit nicht aktiv. Bevor er startet, ergänzen wir diese Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2>4. Wofür wir die Daten nutzen</h2>
            <ul>
              <li>um die Website bereitzustellen und sicher zu betreiben</li>
              <li>um dir passende Düfte zu zeigen</li>
              <li>um dir den Newsletter zu schicken, wenn du ihn bestellt hast</li>
              <li>um mit der Statistik die Website zu verbessern, wenn du eingewilligt hast</li>
            </ul>
            <p><strong>Wir verkaufen deine Daten nicht.</strong></p>
          </section>

          <section>
            <h2>5. Dienstleister und Übermittlung ins Ausland</h2>
            <ul>
              <li><strong>Vercel</strong> (Hosting und Statistik) – Vercel Inc., USA</li>
              <li><strong>Supabase</strong> (Datenbank) – Server in der EU (Irland)</li>
              <li><strong>Brevo</strong> (Newsletter-Versand) – Frankreich</li>
              <li><strong>Unsplash</strong> (einige Bilder) – Unsplash Inc., Kanada</li>
            </ul>
            <p>
              Bei Anbietern in den USA können Daten in ein Land gelangen, das kein dem Schweizer Recht gleichwertiges
              Datenschutzniveau hat. Wir stützen uns dafür auf die vertraglichen Datenschutzgarantien der Anbieter (zum Beispiel
              Standardvertragsklauseln).
            </p>
          </section>

          <section>
            <h2>6. Partner-Links und Teilen-Knöpfe</h2>
            <p>
              Auressa enthält Partner-Links, zum Beispiel zu Amazon. Erst wenn du auf einen solchen Link klickst, wirst du zum
              Shop weitergeleitet. Der Shop kann dann Cookies setzen, um zu erkennen, dass du über Auressa gekommen bist. Für die
              Datenbearbeitung im Shop gilt dessen eigene Datenschutzerklärung. Mehr dazu im <Link href="/impressum">Impressum</Link>.
            </p>
            <p>
              Die Knöpfe zum Teilen (WhatsApp, Pinterest, Facebook) sind einfache Links. Es werden keine Daten an diese Dienste
              übertragen, solange du nicht darauf klickst.
            </p>
          </section>

          <section>
            <h2>7. Aufbewahrung und Sicherheit</h2>
            <ul>
              <li>Newsletter-Daten speichern wir, bis du dich abmeldest.</li>
              <li>Angaben in deinem Browser bleiben, bis du sie löschst.</li>
              <li>Die Verbindung zur Website ist verschlüsselt (HTTPS).</li>
              <li>Auf die Datenbank hat nur die Betreiberin Zugriff.</li>
            </ul>
          </section>

          <section>
            <h2>8. Deine Rechte</h2>
            <p>Du hast das Recht auf:</p>
            <ul>
              <li><strong>Auskunft</strong>: welche Daten wir über dich bearbeiten</li>
              <li><strong>Berichtigung</strong>: falsche Daten korrigieren lassen</li>
              <li><strong>Löschung</strong>: deine Daten löschen lassen</li>
              <li><strong>Herausgabe</strong>: deine Daten in einem gängigen Format erhalten</li>
              <li><strong>Widerruf</strong>: eine Einwilligung jederzeit zurückziehen, z. B. den Newsletter abbestellen</li>
            </ul>
            <p>
              Schreib uns dafür an <a href="mailto:mela.business26@gmail.com">mela.business26@gmail.com</a>. Wir antworten
              innerhalb von 30 Tagen. Du kannst dich auch beim Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
              (EDÖB) beschweren.
            </p>
          </section>

          <section>
            <h2>9. Änderungen</h2>
            <p>
              Wir passen diese Datenschutzerklärung an, wenn sich die Website ändert. Es gilt die jeweils aktuelle Version auf
              dieser Seite.
            </p>
          </section>

          <div className="legal-footer">
            <p>← Zurück zur <Link href="/">Startseite</Link></p>
          </div>
        </article>
      </div>
    </main>
  );
}
