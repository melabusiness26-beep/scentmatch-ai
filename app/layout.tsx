import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';
import CookieBanner from './components/CookieBanner';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  title: {
    default: 'Auressa – Dein persönlicher Duft Finder',
    template: '%s | Auressa',
  },
  description:
    'Finde deinen perfekten Duft mit Auressa. Kostenlose Duft-Beratung, KI-Quiz und personalisierte Empfehlungen für Frauen und Herren.',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: SITE_URL,
    title: 'Auressa – Dein persönlicher Duft Finder',
    description:
      'Finde deinen perfekten Duft mit Auressa. Kostenlose Duft-Beratung, KI-Quiz und personalisierte Empfehlungen.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Auressa – Dein Duft Finder',
      },
    ],
    siteName: 'Auressa',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auressa – Dein persönlicher Duft Finder',
    description: 'Finde deinen perfekten Duft mit unserem KI-Quiz.',
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: 'Auressa Team' }],
  keywords: [
    'Duft Finder',
    'Parfüm Empfehlung',
    'Duft Quiz',
    'Fragrance',
    'Parfum Schweiz',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <html
      lang="de"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="theme-color"
          content="#D4AF37"
        />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%23D4AF37' width='100' height='100'/><text x='50' y='65' font-size='70' font-family='Georgia' font-weight='700' text-anchor='middle' fill='%23FFFFFF'>A</text></svg>"
        />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CookieBanner />
      </body>
    </html>
  );
}
