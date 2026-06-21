import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';

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
    default: 'ScentMatch AI – Finde deinen Signature-Duft',
    template: '%s | ScentMatch AI'
  },
  description:
    'ScentMatch AI hilft dir, mit einem eleganten Duft-Quiz und einer intelligenten Empfehlungslogik den perfekten Parfum zu finden – Duftfamilie, Anlass, Saison und Stil inklusive.',
  keywords: ['Parfum finden', 'Duft Quiz', 'Signature Duft', 'Duftberatung', 'ScentMatch'],
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'ScentMatch AI',
    url: SITE_URL,
    title: 'ScentMatch AI – Finde deinen Signature-Duft',
    description:
      'Finde mit ScentMatch AI deinen perfekten Duft – per Quiz und intelligenter Empfehlungslogik.'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
