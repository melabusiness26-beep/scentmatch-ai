import Link from 'next/link';

// Wissensseiten verlinken sich gegenseitig (interne Verlinkung für Google und Leser).
const PAGES = [
  { href: '/duftnoten-guide', title: 'Duftnoten verstehen: Kopf-, Herz- und Basisnoten' },
  { href: '/duftchemie-grundlagen', title: 'Duftchemie: Wie Düfte wirklich funktionieren' },
  { href: '/duft-mythen', title: 'Duft-Mythen und Fakten' },
  { href: '/duft-lagerung', title: 'Parfum richtig lagern' },
  { href: '/duftsammlung', title: 'Duftsammlung aufbauen' },
  { href: '/duftkollektion-minimal', title: 'Die minimalistische 3er-Duftkollektion' },
  { href: '/nische-mainstream', title: 'Nische vs. Mainstream' },
  { href: '/duftpersoenlichkeit', title: 'Duftpersönlichkeit: welcher Duft passt zu dir?' }
];

export default function MoreKnowledge({ current }: { current: string }) {
  return (
    <section className="section container" aria-labelledby="mehr-wissen">
      <h2 id="mehr-wissen">Mehr Duft-Wissen</h2>
      <ul className="link-list">
        {PAGES.filter((p) => p.href !== current).map((p) => (
          <li key={p.href}>
            <Link href={p.href}>{p.title}</Link>
          </li>
        ))}
        <li>
          <Link href="/ratgeber">Alle Ratgeber ansehen</Link>
        </li>
      </ul>
    </section>
  );
}
