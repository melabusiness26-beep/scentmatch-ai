import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Duft-Vergleich: bis zu 3 Düfte nebeneinander',
  description: 'Vergleiche bis zu 3 Düfte direkt nebeneinander: Noten, Haltbarkeit, Ausstrahlung, Preis und Auressa-Score.',
  alternates: { canonical: '/vergleich' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
