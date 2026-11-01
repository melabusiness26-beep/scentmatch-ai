import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Bestätigungs-Link ungültig',
  robots: { index: false, follow: false }
};

// Ziel, wenn ein Newsletter-Bestätigungs-Link abgelaufen oder ungültig ist.
export default function NewsletterLinkInvalidPage() {
  return (
    <main className="container" style={{ maxWidth: 640, padding: '4rem 1.25rem', textAlign: 'center' }}>
      <p className="eyebrow">Newsletter</p>
      <h1>Dieser Link ist nicht mehr gültig</h1>
      <p className="lead">
        Bestätigungs-Links gelten 7 Tage. Falls dein Link abgelaufen ist, melde dich bitte über die Kontaktangaben
        im Impressum – wir helfen dir gern weiter.
      </p>
      <div className="cta" style={{ justifyContent: 'center' }}>
        <Link className="button" href="/">Zur Startseite</Link>
      </div>
    </main>
  );
}
