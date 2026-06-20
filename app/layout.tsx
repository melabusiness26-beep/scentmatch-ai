import './globals.css';
import type { Metadata } from 'next';

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
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
