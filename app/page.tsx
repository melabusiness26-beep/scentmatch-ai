import type { Metadata } from 'next';
import HomeClient from './HomeClient';

// Schlanke Server-Hülle nur für SEO-Metadaten (Canonical). Die eigentliche
// interaktive Startseite (Quiz etc.) liegt als Client-Komponente in HomeClient.
export const metadata: Metadata = {
  alternates: { canonical: '/' }
};

export default function Page() {
  return (
    <>
      {/* Hero-Foto sofort laden lassen (verbessert den LCP / Ladeeindruck spürbar).
          Next.js hebt diesen Link automatisch in den <head>. */}
      <link rel="preload" as="image" href="/hero-auressa-2.jpg" fetchPriority="high" />
      <HomeClient />
    </>
  );
}
