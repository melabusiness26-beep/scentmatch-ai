import './globals.css';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Link from 'next/link';
import LineIcon from './LineIcon';
import SiteHeader from '@/app/SiteHeader';
import ConsentedAnalytics from '@/app/ConsentedAnalytics';
import CookieBanner from '@/app/CookieBanner';
import FooterNewsletter from '@/app/FooterNewsletter';
import { FavoritesProvider } from '@/app/FavoritesContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#241912'
};

// Edle Schriftarten: Playfair Display (Serife) für Überschriften,
// Inter (klar, modern) für Texte. Die Schriftdateien liegen in app/fonts
// (Open Font License) – so muss der Build nichts bei Google herunterladen
// und kann daran nicht scheitern.
const playfair = localFont({
  src: './fonts/playfair-display-latin-wght-normal.woff2',
  weight: '400 900',
  variable: '--font-display',
  display: 'swap'
});
const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  variable: '--font-sans',
  display: 'swap'
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Auressa – Finde deinen Signature-Duft',
    template: '%s | Auressa'
  },
  description:
    'Auressa hilft dir, mit einem eleganten Duft-Quiz und einer intelligenten Empfehlungslogik das perfekte Parfum zu finden – Duftfamilie, Anlass, Saison und Stil inklusive.',
  keywords: ['Parfum finden', 'Duft Quiz', 'Signature Duft', 'Duftberatung', 'Auressa'],
  verification: {
    google: 'hTy76EREclc_v_vWftD88u4tZ8VhsT630KvxJRRLdaw'
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    siteName: 'Auressa',
    url: SITE_URL,
    title: 'Auressa – Finde deinen Signature-Duft',
    description:
      'Finde mit Auressa deinen perfekten Duft – per Quiz und intelligenter Empfehlungslogik.'
  },
  // Ohne festen Titel/Text: X/Twitter übernimmt dann Titel und Beschreibung der jeweiligen Seite (og:*).
  twitter: {
    card: 'summary_large_image'
  }
};

// Marken-Strukturdaten (hilft Google, „Auressa" als Marke/Website zu verstehen).
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Auressa',
  url: SITE_URL,
  description:
    'Auressa ist die moderne Duft-Findungs-Plattform aus der Schweiz – mit Duft-Quiz, Match-Engine und Ratgebern.'
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Auressa',
  url: SITE_URL,
  inLanguage: 'de-CH'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="de-CH" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        {/* Vor dem ersten Zeichnen: Wer im Cookie-Hinweis schon entschieden hat, bekommt ihn
            gar nicht erst zu sehen (kein Flackern). Der Hinweis selbst wird sofort mit der Seite
            ausgeliefert – das macht die Seite für Google schneller (kein spätes grösstes Element). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('auressa-cookie-consent'))document.documentElement.classList.add('consent-set')}catch(e){}"
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c") }}
        />
        <FavoritesProvider>
          <a href="#inhalt" className="skip-link">Zum Inhalt springen</a>
          <SiteHeader />
          <div id="inhalt" tabIndex={-1}>{children}</div>
          {/* Trust-Bar: Vertrauens-Signale vor dem Footer */}
        <div style={{
          backgroundColor: '#1F1410',
          borderTop: '1.5px solid rgba(212,175,55,0.15)',
          padding: '2rem 1.25rem',
          boxShadow: 'inset 0 40px 80px rgba(0,0,0,0.08)',
        }}>
          <div style={{
            maxWidth: '1100px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2rem',
            textAlign: 'center',
          }}>
            {[
              { icon: 'swiss', label: 'Aus der Schweiz', sub: 'Ehrlich & unabhängig' },
              { icon: 'target', label: 'Echter Match-Score', sub: '0–100, kein Zufall' },
              { icon: 'bottles', label: 'Clevere Alternativen', sub: 'Ähnlich riechend, weniger teuer' },
              { icon: 'check', label: 'Geprüfte Daten', sub: 'Mehrere Quellen pro Duft' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ lineHeight: 1, marginBottom: '0.2rem', color: '#D4AF37' }}><LineIcon name={item.icon} size={30} /></span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.01em' }}>{item.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(237,229,220,0.60)', lineHeight: 1.5 }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="site-footer">
          <FooterNewsletter />
          <div style={{ backgroundColor: '#1F1410', padding: '3rem 1.25rem', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              {/* Header */}
              <div style={{ marginBottom: '2.5rem' }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.3rem' }}>Auressa</div>
                <p style={{ fontSize: '0.85rem', color: '#D4AF37', fontWeight: 600, margin: '0 0 0.5rem 0', letterSpacing: '0.05em' }}>DISCOVERY · FRAGRANCE · BOUTIQUE</p>
                <p style={{ fontSize: '0.9rem', color: 'rgba(237,229,220,0.65)', margin: 0, lineHeight: 1.6, maxWidth: '500px' }}>Die moderne Duft-Findung – kuratiert in der Schweiz. Finde deinen Signature-Duft mit Quiz und intelligenter Match-Engine.</p>
              </div>

              {/* Sauberer Footer: Nur echte Links */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '2rem',
                marginBottom: '2rem',
              }}>
                {/* Footer-Spalten: alle wichtigen Seiten, damit Besucher und Google sie finden. Admin bewusst nicht verlinkt. */}
                <div>
                  <h2 className="footer-col-title">Duft finden</h2>
                  <nav className="footer-col-links" aria-label="Duft finden">
                    <Link href="/quiz">Duft-Quiz</Link>
                    <Link href="/duefte">Alle Düfte</Link>
                    <Link href="/dupes">Dupes & Alternativen</Link>
                    <Link href="/geschenk-finder">Geschenk-Finder</Link>
                    <Link href="/duft-finder">Duft-Finder</Link>
                    <Link href="/wunschliste">Meine Wunschliste</Link>
                  </nav>
                </div>
                <div>
                  <h2 className="footer-col-title">Top-Listen</h2>
                  <nav className="footer-col-links" aria-label="Top-Listen">
                    <Link href="/beste-damenduefte">Beste Damendüfte</Link>
                    <Link href="/beste-herrenduefte">Beste Herrendüfte</Link>
                    <Link href="/beste-duefte-unter-100">Düfte unter CHF 100</Link>
                    <Link href="/saisonal">Düfte nach Jahreszeit</Link>
                    <Link href="/marke">Marken</Link>
                  </nav>
                </div>
                <div>
                  <h2 className="footer-col-title">Wissen</h2>
                  <nav className="footer-col-links" aria-label="Wissen">
                    <Link href="/ratgeber">Ratgeber</Link>
                    <Link href="/duftnoten">Duftnoten-Lexikon</Link>
                    <Link href="/stimmungen">Düfte nach Stimmung</Link>
                    <Link href="/reiseduefte">Reisedüfte</Link>
                    <Link href="/duftchemie-grundlagen">Duftchemie</Link>
                    <Link href="/faq">Häufige Fragen</Link>
                  </nav>
                </div>
                <div>
                  <h2 className="footer-col-title">Über Auressa</h2>
                  <nav className="footer-col-links" aria-label="Über Auressa">
                    <Link href="/ueber-uns">Über uns</Link>
                    <Link href="/wie-auressa-funktioniert">So funktioniert Auressa</Link>
                    <Link href="/testing-und-transparenz">Transparenz</Link>
                    <Link href="/impressum">Impressum</Link>
                    <Link href="/datenschutz">Datenschutz</Link>
                  </nav>
                </div>
              </div>

              {/* Affiliate Info */}
              <p style={{ fontSize: '0.8rem', color: 'rgba(237,229,220,0.55)', margin: '1.5rem 0', paddingTop: '1.5rem', borderTop: '1px solid rgba(212,175,55,0.1)', lineHeight: 1.6 }}>
                Auressa enthält Partner-Links zu ausgewählten Shops. Wenn du über einen solchen Link kaufst, erhalten wir ggf. eine Provision – für dich ohne Mehrkosten. Preise können abweichen; es gilt der jeweils aktuelle Preis im Shop.
              </p>

              {/* Bottom */}
              <div style={{ fontSize: '0.8rem', color: 'rgba(237,229,220,0.62)', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
                {`© ${year} Auressa · Preise & Angaben ohne Gewähr.`}
              </div>
            </div>
          </div>
        </footer>
        </FavoritesProvider>
        <CookieBanner />
        <ConsentedAnalytics />
      </body>
    </html>
  );
}
