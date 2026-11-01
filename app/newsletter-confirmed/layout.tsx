import type { Metadata } from 'next';

// Bestätigungsseite nach dem Newsletter-Klick: für Besucher, nicht für Google.
export const metadata: Metadata = {
  title: 'Newsletter bestätigt',
  robots: { index: false, follow: true }
};

export default function NewsletterConfirmedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
