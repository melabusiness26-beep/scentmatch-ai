import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  concentrationLabel,
  getPerfumeBackground,
  getPerfumeExtras,
  getPerfumes,
  isWithinPriceCap,
  type Perfume
} from '@/lib/perfumes';
import { computeAccords } from '@/lib/accords';
import { computeAuressaScore } from '@/lib/score';
import { versionLabel } from '@/lib/versions';
import { compareNotes, findPair, pricePer100, versionPairs } from '@/lib/version-compare';
import { AmazonButton } from '@/app/AmazonButton';

// Stündlich neu erzeugen – neue Versionen im Katalog ergeben automatisch neue Vergleiche.
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export async function generateStaticParams() {
  return versionPairs(await getPerfumes(2000)).map((p) => ({ pair: p.slug }));
}

// Kurzname einer Version für Überschriften („Eau de Toilette", „Eau Intense").
function label(p: Perfume): string {
  return versionLabel(p);
}

function baseTitle(a: Perfume): string {
  // Gemeinsamer Name ohne Versions-Zusatz, z. B. „Light Blue".
  const l = label(a);
  return a.perfume_name.toLowerCase().endsWith(l.toLowerCase())
    ? a.perfume_name.slice(0, -l.length).trim() || a.perfume_name
    : a.perfume_name;
}

function list(items: string[]): string {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} und ${items[items.length - 1]}`;
}

const SEASON_TEXT: Record<string, string> = {
  'Frühling': 'Frühling',
  Sommer: 'Sommer',
  'Herbst/Winter': 'Herbst & Winter',
  Winter: 'Winter',
  'Ganzjährig': 'ganzjährig'
};

export async function generateMetadata({ params }: { params: Promise<{ pair: string }> }): Promise<Metadata> {
  const { pair } = await params;
  const found = findPair(pair, await getPerfumes(2000));
  if (!found) return { title: 'Vergleich nicht gefunden', robots: { index: false } };
  const { a, b } = found;
  const brand = a.brands?.name || '';
  // Titel unter ~60 Zeichen (inkl. „ | Auressa"): bei Platzmangel EdT/EdP abkürzen, dann Zusatz weglassen.
  const short = (l: string) => l.replace('Eau de Toilette', 'EdT').replace('Eau de Parfum', 'EdP');
  const candidates = [
    `${baseTitle(a)} ${label(a)} vs. ${label(b)}: der Unterschied`,
    `${baseTitle(a)} ${short(label(a))} vs. ${short(label(b))}: Unterschied`,
    `${baseTitle(a)} ${short(label(a))} vs. ${short(label(b))}`
  ];
  const title = candidates.find((t) => t.length + ' | Auressa'.length <= 62) || candidates[candidates.length - 1];
  const description = `${brand} ${baseTitle(a)} als ${label(a)} oder ${label(b)}? Noten, Haltbarkeit, Ausstrahlung und Preis pro 100 ml im direkten Vergleich – mit Empfehlung, welche Version zu dir passt.`;
  return {
    title,
    description,
    alternates: { canonical: `/unterschied/${pair}` },
    openGraph: {
      title: `${title} | Auressa`,
      description,
      type: 'article',
      url: `${SITE_URL}/unterschied/${pair}`,
      images: [`/duft/${b.slug}/opengraph-image`]
    }
  };
}

export default async function VersionComparePage({ params }: { params: Promise<{ pair: string }> }) {
  const { pair } = await params;
  const perfumes = await getPerfumes(2000);
  const found = findPair(pair, perfumes);
  if (!found) notFound();
  const { a, b } = found;

  const [bgA, bgB, exA, exB] = await Promise.all([
    getPerfumeBackground(a.id),
    getPerfumeBackground(b.id),
    getPerfumeExtras(a.id),
    getPerfumeExtras(b.id)
  ]);
  if (exA.accords?.length) a.accords = exA.accords;
  if (exB.accords?.length) b.accords = exB.accords;

  const brand = a.brands?.name || '';
  const name = baseTitle(a);
  const la = label(a);
  const lb = label(b);
  const notes = compareNotes(a, b);
  const pa = pricePer100(a);
  const pb = pricePer100(b);
  const scoreA = computeAuressaScore(a).total;
  const scoreB = computeAuressaScore(b).total;
  const accA = computeAccords(a).map((x) => x.label);
  const accB = computeAccords(b).map((x) => x.label);

  // ── Kurzfazit nur aus vorhandenen Daten ─────────────────────────────
  const diffs: string[] = [];
  // Haltbarkeit und Ausstrahlung: gleiche „Gewinner"-Version in einem Satz zusammenfassen.
  const longer = a.longevity != null && b.longevity != null && a.longevity !== b.longevity ? (b.longevity > a.longevity ? lb : la) : null;
  const louder = a.sillage != null && b.sillage != null && a.sillage !== b.sillage ? (b.sillage > a.sillage ? lb : la) : null;
  const longText = longer ? `hält länger (${Math.max(a.longevity!, b.longevity!)}/10 statt ${Math.min(a.longevity!, b.longevity!)}/10)` : '';
  const loudText = louder ? `strahlt stärker aus (${Math.max(a.sillage!, b.sillage!)}/10 statt ${Math.min(a.sillage!, b.sillage!)}/10)` : '';
  if (longer && louder && longer === louder) diffs.push(`${longer} ${longText} und ${loudText}`);
  else {
    if (longer) diffs.push(`${longer} ${longText}`);
    if (louder) diffs.push(`${louder} ${loudText}`);
  }
  if (pa != null && pb != null && Math.abs(pa - pb) >= 3) {
    diffs.push(`${pa < pb ? la : lb} ist pro 100 ml rund CHF ${Math.abs(pa - pb)} günstiger`);
  }
  const summary = diffs.length
    ? `Kurz gesagt: ${diffs.join('; ')}.`
    : 'In Haltbarkeit, Ausstrahlung und Preis liegen die beiden Versionen laut unseren Daten nah beieinander.';

  // Empfehlung: Wann welche Version?
  const pickA: string[] = [];
  const pickB: string[] = [];
  if (a.longevity != null && b.longevity != null) {
    if (a.longevity < b.longevity) pickA.push('dir eine etwas leichtere Version reicht, die du bei Bedarf auffrischst');
    if (b.longevity > a.longevity) pickB.push('dein Duft möglichst lange halten soll');
  }
  if (a.sillage != null && b.sillage != null) {
    if (a.sillage < b.sillage) pickA.push('du es etwas dezenter magst');
    if (b.sillage > a.sillage) pickB.push('du etwas mehr Ausstrahlung möchtest');
  }
  if (pa != null && pb != null && Math.abs(pa - pb) >= 3) {
    (pa < pb ? pickA : pickB).push('du auf den Preis pro 100 ml achtest');
  }
  if (notes.onlyB.length) pickB.push(`du die zusätzlichen Noten (${list(notes.onlyB.slice(0, 3))}) magst`);
  if (notes.onlyA.length) pickA.push(`du die Noten ${list(notes.onlyA.slice(0, 3))} magst`);

  const rows: { label: string; a: string; b: string }[] = [
    { label: 'Konzentration', a: concentrationLabel(a.concentration) || '–', b: concentrationLabel(b.concentration) || '–' },
    { label: 'Erscheinungsjahr', a: bgA.release_year ? String(bgA.release_year) : '–', b: bgB.release_year ? String(bgB.release_year) : '–' },
    { label: 'Parfümeur', a: bgA.perfumer || '–', b: bgB.perfumer || '–' },
    {
      label: 'Richtpreis',
      a: a.price_chf != null ? `ca. CHF ${Math.round(a.price_chf)}${a.volume_ml ? ` · ${a.volume_ml} ml` : ''}` : '–',
      b: b.price_chf != null ? `ca. CHF ${Math.round(b.price_chf)}${b.volume_ml ? ` · ${b.volume_ml} ml` : ''}` : '–'
    },
    { label: 'Preis pro 100 ml', a: pa != null ? `ca. CHF ${pa}` : '–', b: pb != null ? `ca. CHF ${pb}` : '–' },
    { label: 'Haltbarkeit', a: a.longevity != null ? `${a.longevity}/10` : '–', b: b.longevity != null ? `${b.longevity}/10` : '–' },
    { label: 'Ausstrahlung', a: a.sillage != null ? `${a.sillage}/10` : '–', b: b.sillage != null ? `${b.sillage}/10` : '–' },
    { label: 'Jahreszeit', a: SEASON_TEXT[a.season || ''] || a.season || '–', b: SEASON_TEXT[b.season || ''] || b.season || '–' },
    { label: 'Duftrichtung', a: accA.slice(0, 3).join(', ') || '–', b: accB.slice(0, 3).join(', ') || '–' },
    { label: 'Auressa-Score', a: `${scoreA}/100`, b: `${scoreB}/100` }
  ].filter((r) => r.a !== '–' || r.b !== '–');

  const faq = [
    {
      q: `Was ist der Unterschied zwischen ${name} ${la} und ${lb}?`,
      a: `${summary}${notes.onlyB.length ? ` Nur bei ${lb} genannt: ${list(notes.onlyB.slice(0, 4))}.` : ''}${notes.onlyA.length ? ` Nur bei ${la} genannt: ${list(notes.onlyA.slice(0, 4))}.` : ''}`
    },
    ...(a.longevity != null && b.longevity != null
      ? [
          {
            q: `Welche Version von ${name} hält länger?`,
            a:
              a.longevity === b.longevity
                ? `Laut unseren Daten halten beide ähnlich lange (${a.longevity}/10).`
                : `${b.longevity > a.longevity ? lb : la} hält länger: ${Math.max(a.longevity, b.longevity)}/10 gegenüber ${Math.min(a.longevity, b.longevity)}/10. Wie lange ein Duft hält, hängt aber auch von Haut, Wetter und Menge ab.`
          }
        ]
      : [])
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: `${name} ${la} vs. ${lb}: der Unterschied`,
        description: summary,
        mainEntityOfPage: `${SITE_URL}/unterschied/${pair}`,
        author: { '@type': 'Person', name: 'Melanie', jobTitle: 'Gründerin von Auressa', url: `${SITE_URL}/ueber-uns` },
        publisher: { '@type': 'Organization', name: 'Auressa', logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon` } },
        about: [a, b].map((p) => {
          const conc = concentrationLabel(p.concentration);
          const full = conc && !p.perfume_name.toLowerCase().includes(conc.toLowerCase()) ? `${p.perfume_name} ${conc}` : p.perfume_name;
          return { '@type': 'Product', name: full, url: `${SITE_URL}/duft/${p.slug}` };
        })
      },
      {
        '@type': 'FAQPage',
        mainEntity: faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: 'Düfte', item: `${SITE_URL}/duefte` },
          { '@type': 'ListItem', position: 3, name: `${name}: ${la} vs. ${lb}`, item: `${SITE_URL}/unterschied/${pair}` }
        ]
      }
    ]
  };

  // Weitere Vergleiche derselben Duftlinie
  const morePairs = versionPairs(perfumes).filter(
    (p) => p.slug !== pair && [p.a.id, p.b.id].some((id) => id === a.id || id === b.id)
  );

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Startseite</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/duefte">Düfte</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{name}: Versionen im Vergleich</span>
        </nav>

        <section className="section vc-hero">
          <p className="eyebrow">{brand} · Versionen im Vergleich</p>
          <h1>
            {name} {la} <span className="vc-vs">vs.</span> {lb}
          </h1>
          <p className="lead">{summary}</p>
        </section>

        <section className="section card vc-card">
          <h2>Direkter Vergleich</h2>
          <div className="dp-compare-scroll">
            <table className="dp-compare-table vc-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    <Link href={`/duft/${a.slug}`}>{la}</Link>
                  </th>
                  <th scope="col">
                    <Link href={`/duft/${b.slug}`}>{lb}</Link>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td>{r.a}</td>
                    <td>{r.b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="small vc-source">
            Haltbarkeit und Ausstrahlung nach Einschätzung der Duft-Community, Duftrichtung laut Parfumo. Preise sind
            Richtpreise – der aktuelle Preis im Shop kann abweichen.
          </p>
        </section>

        {notes.hasNotes && (
          <section className="section card vc-card">
            <h2>Die Duftnoten im Vergleich</h2>
            <p className="small vc-source">
              Laut den Notenangaben in unserem Katalog. Hersteller nennen nicht für jede Version gleich viele Noten –
              eine fehlende Note heisst nicht immer, dass sie ganz fehlt.
            </p>
            {notes.shared.length > 0 && (
              <p>
                <strong>Gemeinsam:</strong> {list(notes.shared)}.
              </p>
            )}
            {notes.onlyA.length > 0 && (
              <p>
                <strong>Nur bei {la}:</strong> {list(notes.onlyA)}.
              </p>
            )}
            {notes.onlyB.length > 0 && (
              <p>
                <strong>Nur bei {lb}:</strong> {list(notes.onlyB)}.
              </p>
            )}
            {notes.onlyA.length === 0 && notes.onlyB.length === 0 && (
              <p>Beide Versionen haben laut unseren Daten dieselben Noten – sie unterscheiden sich vor allem in der Konzentration.</p>
            )}
          </section>
        )}

        {(pickA.length > 0 || pickB.length > 0) && (
          <section className="section vc-picks">
            <h2>Welche Version passt zu dir?</h2>
            <div className="vc-pick-grid">
              {[
                { p: a, l: la, reasons: pickA },
                { p: b, l: lb, reasons: pickB }
              ]
                .filter((x) => x.reasons.length > 0)
                .map((x) => (
                  <div className="card vc-pick" key={x.p.id}>
                    <p className="eyebrow">{x.l}</p>
                    <h3>{x.l} passt zu dir, wenn …</h3>
                    <ul>
                      {x.reasons.map((r) => (
                        <li key={r}>… {r}.</li>
                      ))}
                    </ul>
                    <Link className="button secondary" href={`/duft/${x.p.slug}`}>
                      Zum Duftprofil
                    </Link>
                    {isWithinPriceCap(x.p) && (
                      <div className="vc-buy">
                        <AmazonButton perfume={x.p} />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        )}

        <section className="section">
          <p className="eyebrow">Häufige Fragen</p>
          <h2>Gut zu wissen</h2>
          <div className="faq">
            {faq.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p className="small">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {morePairs.length > 0 && (
          <section className="section">
            <h2>Weitere Vergleiche</h2>
            <ul className="vc-more">
              {morePairs.map((p) => (
                <li key={p.slug}>
                  <Link href={`/unterschied/${p.slug}`}>
                    {baseTitle(p.a)} {label(p.a)} vs. {label(p.b)}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
