import type { Metadata } from 'next';
import HomeClient from './HomeClient';

// Schlanke Server-Hülle nur für SEO-Metadaten (Canonical). Die eigentliche
// interaktive Startseite (Quiz etc.) liegt als Client-Komponente in HomeClient.
export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default function Page() {
  return <HomeClient />;
}
