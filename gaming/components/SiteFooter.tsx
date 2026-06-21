import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

/** Dunkler Footer mit Navigation, rechtlichen Links und Affiliate-Hinweis. */
export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-ink-2">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-lg"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))",
                color: "#0a0a12",
                fontWeight: 800,
              }}
            >
              ◆
            </span>
            <span className="font-display text-lg font-bold">{SITE.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{SITE.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Entdecken</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-fg">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Stimmungen</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/games?mood=Cozy" className="hover:text-fg">Cozy</Link></li>
            <li><Link href="/games?mood=Scary" className="hover:text-fg">Scary</Link></li>
            <li><Link href="/games?mood=Epic" className="hover:text-fg">Epic</Link></li>
            <li><Link href="/games?mood=Story-rich" className="hover:text-fg">Story-rich</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Rechtliches</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            <li><Link href="/impressum" className="hover:text-fg">Impressum</Link></li>
            <li><Link href="/datenschutz" className="hover:text-fg">Datenschutz</Link></li>
            <li><Link href="/about" className="hover:text-fg">Über uns</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. Alle Marken gehören ihren Inhabern.</p>
          <p>
            Einige Links sind Affiliate-Links (mit <code>rel=&quot;sponsored&quot;</code>). Kauf
            über diese Links unterstützt uns – ohne Mehrkosten für dich.
          </p>
        </div>
      </div>
    </footer>
  );
}
