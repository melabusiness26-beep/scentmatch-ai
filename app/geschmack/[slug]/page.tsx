import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/app/Breadcrumb';
import { PerfumeTile } from '@/app/PerfumeTile';
import { getPerfumes } from '@/lib/perfumes';
import { FLAVORS, flavorIndexable, flavorNotes, getFlavor, perfumesForFlavor } from '@/lib/flavors';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export async function generateStaticParams() {
  return FLAVORS.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const flavor = getFlavor(slug);
  if (!flavor) return { title: 'Geschmack nicht gefunden' };
  const list = perfumesForFlavor(await getPerfumes(2000), flavor);
  const title = `Parfum, das ${flavor.phrase} duftet`;
  return {
    title,
    description: `${flavor.intro} Entdecke Düfte mit ${flavor.title} – mit Duftnoten, Preis und günstigen Alternativen.`,
    ...(!flavorIndexable(list) ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: `/geschmack/${slug}` },
    openGraph: { locale: 'de_CH', siteName: 'Auressa', title: `${title} | Auressa`, url: `${SITE_URL}/geschmack/${slug}`, type: 'website' }
  };
}

export default async function FlavorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const flavor = getFlavor(slug);
  if (!flavor) notFound();
  const list = perfumesForFlavor(await getPerfumes(2000), flavor);
  const others = FLAVORS.filter((f) => f.slug !== slug);

  return (
    <main>
      <Breadcrumb
        items={[
          { label: 'Duft nach Geschmack', href: '/geschmack' },
          { label: flavor.title, href: `/geschmack/${slug}` }
        ]}
      />
      <div className="container">
        <section className="section flavor-hero">
          <span className="flavor-img flavor-img-lg" style={{ background: flavor.color }}>
            {flavor.image && <img src={flavor.image} alt={flavor.title} />}
          </span>
          <div>
            <p className="eyebrow">Duft nach Geschmack</p>
            <h1>Parfum, das {flavor.phrase} duftet</h1>
            <p className="lead">{flavor.intro}</p>
            {flavor.combo && (
              <p className="small">
                So finden wir diese Düfte: Sie enthalten alle Bestandteile dieser Kombination in ihren Duftnoten. Kein Duft
                riecht genau wie das Dessert – aber er geht in diese Richtung.
              </p>
            )}
          </div>
        </section>

        <section className="section">
          {list.length > 0 ? (
            <>
              <h2>
                {list.length} {list.length === 1 ? 'Duft' : 'Düfte'} mit {flavor.title}
              </h2>
              <div className="perfume-list">
                {list.map((p) => (
                  <div key={p.id} className="flavor-result">
                    <PerfumeTile perfume={p} />
                    <p className="small flavor-match">Enthält: {flavorNotes(p, flavor).join(', ')}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card">
              <h2>Bald mehr Düfte {flavor.phrase}</h2>
              <p className="lead">
                Unser Katalog wächst laufend – jeder Duft wird mit mehreren Quellen geprüft, bevor er hier erscheint.
                Bis dahin findest du im Duft-Quiz Düfte, die zu deinem Geschmack passen.
              </p>
              <Link className="button" href="/quiz">
                Zum Duft-Quiz
              </Link>
            </div>
          )}
        </section>

        <section className="section">
          <h2>Andere Geschmäcker</h2>
          <div className="flavor-chips">
            {others.map((f) => (
              <Link key={f.slug} href={`/geschmack/${f.slug}`} className="note-chip">
                {f.title}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
