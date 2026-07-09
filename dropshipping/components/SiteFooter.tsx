import Link from "next/link";
import { SITE } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-swiss text-base font-black text-white">
              +
            </span>
            <span className="font-display text-lg font-extrabold">{SITE.name}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-dark">
            {SITE.claim}. Kuratierte Produkte, ehrliche Bewertungen und
            Schritt-für-Schritt-Wissen für deinen Start.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-dark">
            Entdecken
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/start" className="hover:text-white/80">Starte hier (für Anfänger)</Link></li>
            <li><Link href="/lexikon" className="hover:text-white/80">Lexikon</Link></li>
            <li><Link href="/produkte" className="hover:text-white/80">Produkt-Finder</Link></li>
            <li><Link href="/nischen" className="hover:text-white/80">Nischen-Guide</Link></li>
            <li><Link href="/nischen-quiz" className="hover:text-white/80">Nischen-Quiz</Link></li>
            <li><Link href="/rechner" className="hover:text-white/80">Gewinn-Rechner</Link></li>
            <li><Link href="/store-planer" className="hover:text-white/80">Store-Planer</Link></li>
            <li><Link href="/videos" className="hover:text-white/80">Werbevideo-Studio</Link></li>
            <li><Link href="/studio" className="hover:text-white/80">KI-Studio</Link></li>
            <li><Link href="/wissen" className="hover:text-white/80">Schweiz-Wissen</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-dark">
            Gut zu wissen
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-dark">
            Alle Angaben (Preise, Lieferzeiten, Rechtliches) sind sorgfältig
            recherchierte Richtwerte und keine Rechts- oder Steuerberatung.
            Prüfe wichtige Entscheidungen immer bei der offiziellen Quelle.
          </p>
        </div>
      </div>
      <div className="border-t border-line-dark">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-dark sm:flex-row">
          <span>© {new Date().getFullYear()} {SITE.name} · Schweiz 🇨🇭</span>
          <span>Finden · Prüfen · Verkaufen</span>
        </div>
      </div>
    </footer>
  );
}
