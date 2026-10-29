import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mein Duftprofil',
  description: 'Dein persönliches Duftprofil bei Auressa.',
  alternates: { canonical: '/mein-profil' },
  robots: { index: false, follow: true }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
