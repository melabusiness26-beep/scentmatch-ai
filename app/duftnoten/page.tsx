import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import { scentNotes } from '@/lib/notes-glossary';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const metadata: Metadata = {
  title: 'Duftnoten-Lexikon: Parfumnoten einfach erklärt',
  description:
    'Das Auressa Duftnoten-Lexikon erklärt die wichtigsten Parfumnoten – von Bergamotte bis Oud: wie sie riechen, woher sie kommen und welche Düfte zu dir passen.',
  alternates: { canonical: '/duftnoten' },
  openGraph: {
    title: 'Duftnoten-Lexikon | Auressa',
    description:
      'Die wichtigsten Parfumnoten verständlich erklärt – Duft, Herkunft, Wirkung und passende Düfte.',
    type: 'website',
    url: `${SITE_URL}/duftnoten`
  }
};

export default function DuftnotenPage() {
  return (
    <main>
      <SiteHeader />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Duftnoten-Lexikon</h1>
          <p className="lead">
            Ein Parfum besteht aus vielen einzelnen Duftnoten – sie bestimmen, ob ein Duft
            frisch, süß, holzig oder blumig wirkt. Wer die wichtigsten Noten kennt, versteht
            schneller, warum ein Duft gefällt und welche anderen Düfte ähnlich riechen.
          </p>
          <p className="lead">
            Hier erklären wir die bekanntesten Parfumnoten verständlich: wie sie riechen, woher
            sie kommen und welche Düfte aus unserem Katalog dazu passen.
          </p>

          <h2>Die wichtigsten Duftnoten im Überblick</h2>
          <div className="grid">
            {scentNotes.map((note) => (
              <Link className="tile tile-link" href={`/duftnoten/${note.slug}`} key={note.slug}>
                <img
                  className="cover note-cover"
                  src={note.image}
                  alt={`${note.name} – Duftnote in der Parfümerie`}
                  width={400}
                  height={160}
                  loading="lazy"
                />
                <h3>{note.name}</h3>
                <p className="small">{note.short}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
