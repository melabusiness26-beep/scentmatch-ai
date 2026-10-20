import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum | Auressa',
  description: 'Impressum und rechtliche Informationen von Auressa – Duft-Beratung aus der Schweiz.',
  robots: 'noindex, follow',
};

export default function ImpressumPage() {
  return (
    <main>
      <div className="legal-container">
        <article className="legal-content">
          <h1>Impressum</h1>

          <section>
            <h2>Betreiberin der Website</h2>
            <p>
              <strong>Melanie Viele</strong><br />
              Einzelunternehmen<br />
              Neuenhof, Aargau<br />
              Schweiz
            </p>
          </section>

          <section>
            <h2>Kontaktdaten</h2>
            <p>
              <strong>E-Mail:</strong> <a href="mailto:mela.business26@gmail.com">mela.business26@gmail.com</a><br />
              <strong>Website:</strong> <a href="https://auressa.ch">auressa.ch</a>
            </p>
          </section>

          <section>
            <h2>Haftungsausschluss</h2>

            <h3>Inhalt</h3>
            <p>
              Auressa ist eine <strong>Duft-Beratungsplattform</strong>. Die Informationen auf dieser Website werden bereitgestellt:
            </p>
            <ul>
              <li>✅ Zum Informationszweck</li>
              <li>✅ Um dir bei der Duftauswahl zu helfen</li>
              <li>✅ Basierend auf veröffentlichten Duftinformationen (Hersteller, Duftdatenbanken)</li>
            </ul>
            <p>
              <strong>Die Auressa-Bewertungen und Empfehlungen sind subjektiv</strong> und basieren auf unserem Matching-Algorithmus, nicht auf
              persönlichem Test. Geschmack ist persönlich – was einer Person gefällt, kann einer anderen nicht gefallen.
            </p>
            <p>
              <strong>Wir übernehmen keine Haftung für:</strong>
            </p>
            <ul>
              <li>Allergische Reaktionen oder Hautreizungen durch Düfte</li>
              <li>Die Genauigkeit von Duftbeschreibungen (Hersteller ändern Formeln)</li>
              <li>Verfügbarkeit oder Preise bei Partner-Shops</li>
              <li>Lieferverzögerungen oder Probleme bei Bestellungen</li>
              <li>Unzufriedenheit mit gekauften Produkten</li>
            </ul>
            <p>
              <strong>Bitte teste einen Duft, bevor du ihn kaufst!</strong> Viele Düfte sind in Shops erhältlich, um sie zu testen.
            </p>

            <h3>Externe Links</h3>
            <p>
              Auressa verlinkt zu <strong>Notino.ch</strong>, <strong>Flaconi.de</strong> und anderen Duft-Shops. Wir sind nicht verantwortlich für:
            </p>
            <ul>
              <li>Die Inhalte dieser externen Websites</li>
              <li>Datenschutz und Sicherheit auf Partner-Websites</li>
              <li>Geschäftsbeziehungen zwischen dir und diesen Shops</li>
            </ul>
            <p>
              Jede externe Website hat eigene rechtliche Bedingungen. Bitte lies diese, bevor du dort einkaufst.
            </p>

            <h3>Keine medizinischen Ratschläge</h3>
            <p>
              Auressa gibt <strong>keine medizinischen oder therapeutischen Ratschläge</strong>. Wenn du:
            </p>
            <ul>
              <li>Allergien gegen bestimmte Duftstoffe hast</li>
              <li>Sensible Haut hast</li>
              <li>Bedenken zu Inhaltsstoffen hast</li>
            </ul>
            <p>
              …dann konsultiere bitte einen Dermatologen oder Allergologen, nicht Auressa.
            </p>
          </section>

          <section>
            <h2>Affiliate-Offenlegung</h2>
            <p>
              Auressa ist Partner von:
            </p>
            <ul>
              <li><strong>Notino.ch</strong> über <strong>CJ Affiliate (Commission Junction)</strong></li>
              <li><strong>Flaconi.de / Flaconi.ch</strong> über <strong>Awin</strong></li>
            </ul>
            <p>
              Das bedeutet: Wenn du über Auressa-Links einkaufst, erhalten wir eine kleine Provision vom Shop. <strong>Dir entstehen keine zusätzlichen Kosten</strong> – du zahlst denselben Preis wie direkt.
            </p>
            <p>
              Diese Provisionen finanzieren die Website und ermöglichen es uns, Duft-Beratung kostenlos anzubieten.
            </p>
            <p>
              <strong>Transparenz:</strong> Links zu Partner-Shops sind mit <code>rel="sponsored"</code> gekennzeichnet.
            </p>
          </section>

          <section>
            <h2>Urheberrecht und Lizenzen</h2>
            <p>
              <strong>Inhalte von Auressa:</strong> © Melanie Viele / Auressa, 2026. Alle Rechte vorbehalten.
            </p>
            <p>
              Du darfst Inhalte persönlich nutzen, aber nicht ohne Genehmigung reproduzieren, verbreiten oder kommerziell nutzen.
            </p>

            <h3>Duftinformationen</h3>
            <p>
              Duftdaten (Namen, Noten, Preise) stammen von:
            </p>
            <ul>
              <li>Duft-Herstellern (offizielle Websites)</li>
              <li>Duft-Datenbanken (FragranceBuy, Fragrantica, etc.)</li>
              <li>Retail-Websites (Notino, Flaconi, etc.)</li>
            </ul>
            <p>
              Diese Informationen werden zu Informationszwecken zusammengefasst. Wir beanspruchen kein Urheberrecht auf Duftbeschreibungen.
            </p>

            <h3>Bilder</h3>
            <p>
              Duftflacon-Bilder stammen von Herstellern und Retail-Partnern. Wir nutzen sie unter dem Recht des Fair Use / der angemessenen Nutzung.
            </p>
          </section>

          <section>
            <h2>Technische Informationen</h2>
            <ul>
              <li><strong>Website-Betreiber:</strong> Auressa (Melanie Viele)</li>
              <li><strong>Hosting:</strong> Vercel (USA)</li>
              <li><strong>Datenbank:</strong> Supabase (EU)</li>
              <li><strong>Zahlungspartner:</strong> Notino / CJ Affiliate, Flaconi / Awin</li>
            </ul>
          </section>

          <section>
            <h2>Regulierung und Gerichtsstand</h2>
            <p>
              Diese Website unterliegt den <strong>Gesetzen der Schweiz</strong>. Im Falle von Rechtsstreitigkeiten ist
              Gerichtsstand <strong>Aargau, Schweiz</strong>.
            </p>
          </section>

          <section>
            <h2>Änderungen an diesem Impressum</h2>
            <p>
              Wir können dieses Impressum jederzeit aktualisieren. Die aktuelle Version ist immer auf dieser Seite verfügbar.
            </p>
          </section>

          <section>
            <h2>Datenschutz und Rechtliches</h2>
            <p>
              Weitere Informationen findest du in unserer <Link href="/datenschutz">Datenschutzerklärung</Link>.
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
