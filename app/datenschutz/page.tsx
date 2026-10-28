import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutz | Auressa',
  description: 'Datenschutzerklärung der Auressa Duft-Plattform. Wie wir deine Daten schützen.',
  robots: 'noindex, follow',
};

export default function DatenschutzPage() {
  const lastUpdated = '19. Oktober 2026';

  return (
    <main>
      <div className="legal-container">
        <article className="legal-content">
          <h1>Datenschutzerklärung</h1>
          <p className="last-updated">Zuletzt aktualisiert: {lastUpdated}</p>

          <section>
            <h2>1. Verantwortlicher und Kontakt</h2>
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
              Diese Datenschutzerklärung gilt für die Website <strong>auressa.ch</strong> und alle damit verbundenen
              Dienste, einschliesslich des Duft-Quizzes, des Duft-Katalogs und der Empfehlungsengine.
            </p>
            <p>
              Wir beachten die Bestimmungen des Schweizer Datenschutzgesetzes (DSG) und der Europäischen
              Datenschutz-Grundverordnung (GDPR), soweit anwendbar.
            </p>
          </section>

          <section>
            <h2>3. Arten von Daten, die wir erfassen</h2>

            <h3>3.1 Daten, die du uns freiwillig mitteilst:</h3>
            <ul>
              <li><strong>Quiz-Antworten</strong>: Geschlecht, Duftfamilien-Vorlieben, Noten-Lieblings- und No-Go, Anlässe, Jahreszeiten, Budget</li>
              <li><strong>Kontaktformulare</strong>: Name, E-Mail (wenn aktiviert)</li>
              <li><strong>Newsletter</strong>: E-Mail-Adresse (wenn du dich anmeldest)</li>
            </ul>

            <h3>3.2 Daten, die automatisch erfasst werden:</h3>
            <ul>
              <li><strong>Server-Logs</strong>: IP-Adresse, Browser-Typ, Zugriffszeitpunkte, angeforderte Seiten</li>
              <li><strong>Analytics</strong>: Seitenaufrufe, Verweildauer, Gerätetyp (falls Google Analytics 4 aktiv)</li>
              <li><strong>Cookies</strong>: Session-IDs, Benutzer-Einstellungen (falls gespeichert)</li>
            </ul>
          </section>

          <section>
            <h2>4. Verwendung deiner Daten</h2>
            <p>Wir nutzen deine Daten nur für:</p>
            <ul>
              <li>✅ <strong>Funktionalität</strong>: Duft-Quiz berechnen, Empfehlungen zeigen</li>
              <li>✅ <strong>Website-Betrieb</strong>: Fehlersuche, Performance-Monitoring</li>
              <li>✅ <strong>Marketing</strong> (falls du dich anmeldest): Newsletter, Neuigkeiten zu neuen Düften</li>
              <li>✅ <strong>Rechtliche Pflichten</strong>: Sicherheit, Missbrauchsprävention</li>
            </ul>
            <p><strong>Wir verkaufen deine Daten NIEMALS an Dritte.</strong></p>
          </section>

          <section>
            <h2>5. Speicherung und Datensicherheit</h2>
            <ul>
              <li><strong>Datenbank</strong>: Daten werden bei <strong>Supabase</strong> (EU-gehostet, PostgreSQL) gespeichert</li>
              <li><strong>Verschlüsselung</strong>: Daten werden in Transit (HTTPS) und in Ruhe verschlüsselt</li>
              <li><strong>Zugriff</strong>: Nur du (und optional, die Gründerin) können deine Daten einsehen</li>
              <li><strong>Löschung</strong>: Du kannst jederzeit um Datenlöschung anfragen</li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies und Tracking</h2>
            <p>Auressa nutzt <strong>minimale Cookies</strong>:</p>
            <ul>
              <li><strong>Session-Cookies</strong>: Zur Funktionalität des Quiz notwendig (werden nicht gespeichert)</li>
              <li><strong>Google Analytics 4</strong> (optional): Um zu verstehen, wie Besucher die Website nutzen</li>
            </ul>
            <p>Du kannst Cookies in deinen Browser-Einstellungen ablehnen. Das Quiz funktioniert auch ohne Analyse-Cookies.</p>
          </section>

          <section>
            <h2>7. Affiliate-Links und Transparenz</h2>
            <p>Auressa nutzt Affiliate-Links zu <strong>Notino.ch</strong> und <strong>Flaconi</strong>. Das heisst:</p>
            <ul>
              <li>🔗 Wenn du über unsere Links einkaufst, erhalten wir eine kleine Provision</li>
              <li>💰 <strong>Für dich ändert sich der Preis NICHT</strong></li>
              <li>📢 Links sind als <code>rel="sponsored"</code> gekennzeichnet (sichtbar im Quellcode)</li>
            </ul>
            <p>Diese Provisionen finanzieren die Website und ermöglichen es uns, den Service kostenlos anzubieten.</p>
          </section>

          <section>
            <h2>8. Deine Rechte (GDPR / Schweizer DSG)</h2>
            <p>Du hast das Recht auf:</p>
            <ul>
              <li>📖 <strong>Auskunft</strong>: Welche Daten speichern wir über dich?</li>
              <li>✏️ <strong>Berichtigung</strong>: Falsche Daten korrigieren</li>
              <li>🗑️ <strong>Löschung</strong>: „Recht auf Vergessenwerden"</li>
              <li>📥 <strong>Datenportabilität</strong>: Deine Daten im Standard-Format herunterladen</li>
              <li>❌ <strong>Widerspruch</strong>: Marketing abmelden</li>
            </ul>
            <p>Schreib uns unter <a href="mailto:mela.business26@gmail.com">mela.business26@gmail.com</a>, um eines dieser Rechte auszuüben. Wir antworten innerhalb von 30 Tagen.</p>
          </section>

          <section>
            <h2>9. Externe Links</h2>
            <p>Auressa verlinkt zu <strong>Notino.ch</strong>, <strong>Flaconi</strong> und anderen Duft-Shops. Wir sind nicht verantwortlich für deren Datenschutzerklärungen. Bitte lies deren Policies, wenn du dort einkaufst.</p>
          </section>

          <section>
            <h2>10. Änderungen an dieser Richtlinie</h2>
            <p>Wir können diese Datenschutzerklärung jederzeit aktualisieren. Die aktuelle Version ist immer auf dieser Seite verfügbar.</p>
          </section>

          <section>
            <h2>11. Kontakt & Datenschutzanliegen</h2>
            <p>Für Fragen zum Datenschutz kontaktiere uns:</p>
            <p>
              <strong>Melanie Viele</strong><br />
              <a href="mailto:mela.business26@gmail.com">mela.business26@gmail.com</a><br />
              Neuenhof, AG, Schweiz
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
