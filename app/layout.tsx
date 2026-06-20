import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ScentMatch AI',
  description: 'Finde deinen Signature-Duft in wenigen Minuten.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
