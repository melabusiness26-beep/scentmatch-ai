import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vaelo – Finde deinen Signature-Duft',
    template: '%s | Vaelo'
  },
  description:
    'Vaelo hilft dir, mit einem eleganten Duft-Quiz und einer intelligenten Empfehlungslogik den perfekten Parfum zu finden – Duftfamilie, Anlass, Saison und Stil inklusive.',
  keywords: ['Parfum finden', 'Duft Quiz', 'Signature Duft', 'Duftberatung', 'Vaelo'],
  verification: {
    google: 'hTy76EREclc_v_vWftD88u4tZ8VhsT630KvxJRRLdaw'
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Vaelo',
    url: SITE_URL,
    title: 'Vaelo – Finde deinen Signature-Duft',
    description:
      'Finde mit Vaelo deinen perfekten Duft – per Quiz und intelligenter Empfehlungslogik.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        {children}
        <footer className="site-footer">
          <div className="container footer-inner">
            <div>
              <div className="logo">Vaelo</div>
              <p className="footer-kicker">Discovery · Fragrance · Boutique</p>
              <p className="small footer-tag">Die moderne Duft-Findung – kuratiert in der Schweiz. Finde mit Quiz und intelligenter Match-Engine deinen Signature-Duft.</p>
            </div>
            <nav className="footer-links">
              <a href="/#quiz">Quiz</a>
              <a href="/duefte">Düfte</a>
              <a href="/ratgeber">Ratgeber</a>
              <a href="/impressum">Impressum</a>
              <a href="/datenschutz">Datenschutz</a>
            </nav>
          </div>
          <div className="container footer-bottom small">© {year} Vaelo · Preise &amp; Angaben ohne Gewähr.</div>
        </footer>
      </body>
    </html>
  );
}
