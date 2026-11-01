import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Impressum',
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
              Auressa verlinkt zu Duft-Shops wie <strong>Amazon</strong> und zu Suchergebnissen bei Google. Wir sind nicht verantwortlich für:
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
              <strong>Als Amazon-Partnerin verdiene ich an qualifizierten Verkäufen.</strong> Auressa nimmt am Partnerprogramm von
              Amazon (amazon.de) teil. Die Knöpfe „Bei Amazon ansehen“ sind solche Partner-Links.
            </p>
            <p>
              Zudem ist Auressa bei den Partnernetzwerken <strong>CJ Affiliate</strong> und <strong>Awin</strong> angemeldet. Sobald
              Partner-Links zu Shops aus diesen Netzwerken auf der Website stehen, sind sie ebenfalls als Partner-Links gekennzeichnet.
            </p>
            <p>
              Das bedeutet: Wenn du über einen Partner-Link einkaufst, erhalten wir eine kleine Provision vom Shop. <strong>Dir entstehen keine zusätzlichen Kosten</strong> – du zahlst denselben Preis wie direkt.
            </p>
            <p>
              Diese Provisionen finanzieren die Website und ermöglichen es uns, unabhängige Duft-Beratung anzubieten.
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
              Duftdaten (Noten, Erscheinungsjahr, Parfümeur, Richtpreise) recherchieren wir aus:
            </p>
            <ul>
              <li>offiziellen Angaben der Hersteller</li>
              <li>Duft-Datenbanken und Community-Seiten (z. B. Parfumo)</li>
              <li>Fachpresse und Online-Shops</li>
            </ul>
            <p>
              Wir übernehmen eine Angabe nur, wenn mehrere Quellen übereinstimmen – sonst lassen wir sie weg. Die Texte auf Auressa
              schreiben wir selbst. Richtpreise sind Momentaufnahmen und können im Shop abweichen.
            </p>

            <h3>Bilder</h3>
            <p>
              Die Flakons auf den Duft-Seiten sind von Auressa gezeichnete Darstellungen, keine Produktfotos der Hersteller. Die
              Fotos der Duftnoten hat Auressa selbst mit KI erstellt. Einige Titelbilder der Ratgeber stammen
              von <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a> und werden gemäss der
              Unsplash-Lizenz verwendet. Marken- und Produktnamen gehören ihren jeweiligen Inhabern.
            </p>
          </section>

          <section>
            <h2>Technische Informationen</h2>
            <ul>
              <li><strong>Website-Betreiber:</strong> Auressa (Melanie Viele)</li>
              <li><strong>Hosting:</strong> Vercel (USA)</li>
              <li><strong>Datenbank:</strong> Supabase (EU)</li>
              <li><strong>Partnerprogramme:</strong> Amazon (amazon.de); angemeldet bei CJ Affiliate und Awin</li>
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
