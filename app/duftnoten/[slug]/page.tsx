import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import NoteArt from '@/app/NoteArt';
import { PerfumeTile } from '@/app/PerfumeTile';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { getScentNote, scentNotes, type ScentNote } from '@/lib/notes-glossary';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export async function generateStaticParams() {
  return scentNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getScentNote(slug);
  if (!note) return { title: 'Duftnote nicht gefunden – Auressa' };

  return {
    title: note.metaTitle,
    description: note.metaDescription,
    alternates: { canonical: `/duftnoten/${slug}` },
    openGraph: {
      title: note.metaTitle,
      description: note.metaDescription,
      type: 'article',
      url: `${SITE_URL}/duftnoten/${slug}`
    }
  };
}

// Düfte, die diese Note (oder eine Schreibvariante) in den Duftnoten führen.
function perfumesWithNote(note: ScentNote, pool: Perfume[]): Perfume[] {
  const terms = [note.name.toLowerCase(), ...(note.synonyms || [])];
  return pool.filter((p) => {
    const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])]
      .join(' ')
      .toLowerCase();
    return terms.some((t) => notes.includes(t));
  });
}

function jsonLd(note: ScentNote) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.metaTitle,
    description: note.metaDescription,
    about: { '@type': 'Thing', name: `${note.name} (Duftnote)` },
    mainEntityOfPage: `${SITE_URL}/duftnoten/${note.slug}`,
    publisher: { '@type': 'Organization', name: 'Auressa' }
  };
}

export default async function ScentNotePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getScentNote(slug);
  if (!note) notFound();

  const pool = (await getPerfumes(2000)).filter((p) => p.slug);
  const matches = perfumesWithNote(note, pool).slice(0, 8);
  const catalogHref = `/duefte?q=${encodeURIComponent(note.name)}`;

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <div className="backlink">
          <Link className="badge" href="/duftnoten">← Duftnoten-Lexikon</Link>
        </div>

        <section className="section legal">
          <p className="eyebrow">Duftnote</p>
          <NoteArt slug={note.slug} className="note-art-hero" />
          <h1 className="detail-title">{note.name}</h1>
          <p className="lead">{note.intro}</p>

          <h2>Wie riecht {note.name}?</h2>
          <p>{note.smell}</p>

          <h2>Herkunft &amp; Herstellung</h2>
          <p>{note.origin}</p>

          <h2>Typische Duftfamilie</h2>
          <p>{note.family}</p>

          <h2>Typische Wirkung</h2>
          <p>{note.effect}</p>

          <h2>Welche Noten passen zu {note.name}?</h2>
          <p>{note.pairsWith}</p>
        </section>

        <section className="section">
          <h2>Düfte mit {note.name}</h2>
          {matches.length > 0 ? (
            <>
              <p className="small">
                Diese Düfte aus unserem Katalog führen {note.name} in ihrer Duftpyramide.
              </p>
              <div className="perfume-list">
                {matches.map((p) => (
                  <PerfumeTile perfume={p} key={p.id} />
                ))}
              </div>
              <div className="cta">
                <Link className="button secondary" href={catalogHref}>
                  Alle Düfte mit {note.name} ansehen
                </Link>
              </div>
            </>
          ) : (
            <p className="small">
              Aktuell sind noch keine Düfte mit {note.name} im Katalog erfasst.{' '}
              <Link href="/duefte">Stöbere im gesamten Duftkatalog</Link> oder mach das{' '}
              <Link href="/#quiz">Duft-Quiz</Link>.
            </p>
          )}
        </section>

        <section className="section">
          <Link className="button" href="/#quiz">
            Welcher Duft passt zu dir? Mach das Quiz
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(note)) }}
      />
    </main>
  );
}
