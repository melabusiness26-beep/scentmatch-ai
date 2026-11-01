import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';
import { getPerfumes } from '@/lib/perfumes';
import { FLAVORS, FLAVOR_GROUPS, perfumesForFlavor } from '@/lib/flavors';
import { distinctFragranceCount } from '@/lib/versions';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft nach Geschmack finden – Vanille, Honig, Früchte & mehr',
  description:
    'Du willst nach Vanille, Honig, Erdbeere, Cupcake, Mango oder Kaffee riechen? Tipp auf deinen Lieblingsgeschmack oder deine Lieblingsnote und entdecke passende Düfte.',
  alternates: { canonical: '/geschmack' },
  openGraph: {
    locale: 'de_CH',
    siteName: 'Auressa',
    title: 'Duft nach Geschmack finden | Auressa',
    description: 'Vanille, Honig, Beeren, Kekse, Karamell … – finde Düfte nach deinem Lieblingsgeschmack.',
    url: `${SITE_URL}/geschmack`,
    type: 'website'
  }
};

export default async function GeschmackPage() {
  const perfumes = await getPerfumes(2000);
  const tiles = FLAVORS.map((f) => ({ flavor: f, count: distinctFragranceCount(perfumesForFlavor(perfumes, f)) }));
  return (
    <main>
      <Breadcrumb items={[{ label: 'Duft nach Geschmack', href: '/geschmack' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Duft nach Geschmack</p>
          <h1>Wonach willst du duften?</h1>
          <p className="lead">
            Vanille, Erdbeere, Cupcake, Mango oder Kaffee? Tipp auf deinen Lieblingsgeschmack oder deine Lieblingsnote –
            Auressa zeigt dir Düfte, in denen sie steckt.
          </p>
          <nav className="flavor-jump" aria-label="Gruppen">
            {FLAVOR_GROUPS.map((g, i) => (
              <a key={g} href={`#gruppe-${i}`} className="note-chip">
                {g}
              </a>
            ))}
          </nav>
          {FLAVOR_GROUPS.map((group, i) => (
            <section key={group} className="flavor-section" aria-labelledby={`gruppe-${i}`}>
              <h2 id={`gruppe-${i}`}>{group}</h2>
              <div className="flavor-grid">
                {tiles
                  .filter(({ flavor }) => flavor.group === group)
                  .map(({ flavor: f, count }) => (
                    <Link key={f.slug} href={`/geschmack/${f.slug}`} className="flavor-tile">
                      <span className="flavor-img" style={{ background: f.color }}>
                        {f.image && <img src={f.image} alt="" loading="lazy" />}
                      </span>
                      <span className="flavor-title">{f.title}</span>
                      <span className="flavor-count">
                        {count > 0 ? `${count} ${count === 1 ? 'Duft' : 'Düfte'}` : 'bald mehr'}
                      </span>
                    </Link>
                  ))}
              </div>
            </section>
          ))}
          <p className="small flavor-note">
            Gezeigt werden Düfte, in deren Duftnoten der Geschmack vorkommt. Ein Duft riecht nie nur nach einer Note – teste
            am besten eine Probe.
          </p>
        </section>
      </div>
    </main>
  );
}
