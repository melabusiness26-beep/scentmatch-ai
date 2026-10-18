import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import Link from 'next/link';
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
// Inter (klar, modern) für Texte.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap'
});
const inter = Inter({
  subsets: ['latin'],
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
    'Auressa hilft dir, mit einem eleganten Duft-Quiz und einer intelligenten Empfehlungslogik den perfekten Parfum zu finden – Duftfamilie, Anlass, Saison und Stil inklusive.',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Auressa – Finde deinen Signature-Duft',
    description:
      'Finde mit Auressa deinen perfekten Duft – per Quiz und intelligenter Empfehlungslogik.'
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
    <html lang="de-CH" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <FavoritesProvider>
          {children}
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
              { icon: '🇨🇭', label: 'Aus der Schweiz', sub: 'Ehrlich & unabhängig' },
              { icon: '🎯', label: 'Echter Match-Score', sub: '0–100, kein Zufall' },
              { icon: '💸', label: 'Günstige Dupes', sub: 'Zu jedem Lieblingsduft' },
              { icon: '🔒', label: 'Kein Konto nötig', sub: 'Kein Newsletter-Zwang' },
            ].map((item) => (
              <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
                <span style={{ fontSize: '1.6rem', lineHeight: 1, marginBottom: '0.2rem' }}>{item.icon}</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D4AF37', letterSpacing: '0.01em' }}>{item.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'rgba(237,229,220,0.60)', lineHeight: 1.5 }}>{item.sub}</span>
              </div>
            ))}
          </div>
        </div>

        <footer className="site-footer">
          <FooterNewsletter />
          <div className="container footer-inner">
            <div>
              <div className="logo">Auressa</div>
              <p className="footer-kicker">Discovery · Fragrance · Boutique</p>
              <p className="small footer-tag">Die moderne Duft-Findung – kuratiert in der Schweiz. Finde mit Quiz und intelligenter Match-Engine deinen Signature-Duft.</p>
            </div>
            <nav className="footer-links">
              <Link href="/#quiz">Quiz</Link>
              <Link href="/duefte">Düfte</Link>
              <Link href="/marke">Marken</Link>
              <Link href="/vergleich">Vergleich</Link>
              <Link href="/wunschliste">Wunschliste</Link>
              <Link href="/duft-finder">Duft-Finder</Link>
              <Link href="/duft-detektiv">Duft-Detektiv</Link>
              <Link href="/duft-scanner">Duft-Scanner</Link>
              <Link href="/geschenk-finder">Geschenk-Finder</Link>
              <Link href="/stimmungen">Stimmungen</Link>
              <Link href="/reiseduefte">Reisedüfte</Link>
              <Link href="/duftnoten">Duftnoten</Link>
              <Link href="/ratgeber">Ratgeber</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/ueber-uns">Über uns</Link>
              <Link href="/impressum">Impressum</Link>
              <Link href="/datenschutz">Datenschutz</Link>
            </nav>
          </div>
          <p className="container footer-affiliate small">
            Auressa enthält Partner-Links zu ausgewählten Shops. Wenn du über einen solchen Link
            kaufst, erhalten wir ggf. eine Provision – für dich ohne Mehrkosten. Preise können
            abweichen; es gilt der jeweils aktuelle Preis im Shop.
          </p>
          <div className="container footer-bottom small">© {year} Auressa · Preise &amp; Angaben ohne Gewähr.</div>
        </footer>
        </FavoritesProvider>
        <CookieBanner />
        <ConsentedAnalytics />
      </body>
    </html>
  );
}
