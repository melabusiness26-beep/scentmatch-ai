import type { Metadata } from 'next';
import StimmungenClient from './StimmungenClient';

export const metadata: Metadata = {
  title: 'Duft nach Stimmung finden | Auressa',
  description:
    'Wähl deine Stimmung und finde sofort den passenden Duft – ob gemütlich, frisch, selbstbewusst, romantisch, sinnlich oder sommerlich. Schnell, persönlich und ohne Quiz.',
  alternates: { canonical: '/stimmungen' },
  openGraph: {
    title: 'Duft nach Stimmung finden | Auressa',
    description:
      'Wähl deine Stimmung und finde sofort den passenden Duft – gemütlich, frisch, selbstbewusst, romantisch, sinnlich oder sommerlich.',
    url: '/stimmungen',
    type: 'website'
  }
};

export default function StimmungenPage() {
  return <StimmungenClient />;
}
