'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Hauptpunkte – bewusst wenige, damit das Menü ruhig und klar bleibt.
const MAIN_LINKS = [
  { href: '/duefte', label: 'Düfte' },
  { href: '/dupes', label: 'Dupes' },
  { href: '/ratgeber', label: 'Ratgeber' }
];

// Alles Weitere gesammelt unter „Entdecken".
const DISCOVER_LINKS = [
  { href: '/beste-damenduefte', label: 'Beste Damendüfte' },
  { href: '/beste-herrenduefte', label: 'Beste Herrendüfte' },
  { href: '/beste-unisex-duefte', label: 'Beste Unisex-Düfte' },
  { href: '/beste-duefte-unter-100', label: 'Unter CHF 100' },
  { href: '/stimmungen', label: 'Duft nach Stimmung' },
  { href: '/marke', label: 'Marken A–Z' },
  { href: '/vergleich', label: 'Düfte vergleichen' },
  { href: '/duft-scanner', label: 'Duft-Scanner' },
  { href: '/duft-detektiv', label: 'Duft-Detektiv' }
];

function HeartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

// Gemeinsames Menü für alle Seiten.
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // „Entdecken" schliessen beim Klick ausserhalb
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Beim Seitenwechsel alles schliessen
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  // Hintergrund nicht mitscrollen, solange das Handy-Menü offen ist
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header className={`site-header hd${scrolled ? ' scrolled' : ''}${menuOpen ? ' hd-open' : ''}`}>
      <div className="hd-inner">
        <Link className="logo" href="/">Auressa</Link>

        <nav className="hd-nav" aria-label="Hauptmenü">
          {MAIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={isActive(l.href) ? 'is-active' : undefined}>
              {l.label}
            </Link>
          ))}
          <div className="hd-drop" ref={dropRef}>
            <button
              type="button"
              className="hd-drop-toggle"
              aria-expanded={dropOpen}
              aria-haspopup="true"
              onClick={() => setDropOpen((o) => !o)}
            >
              Entdecken <span className="hd-caret" aria-hidden="true" />
            </button>
            <div className={`hd-drop-panel${dropOpen ? ' is-open' : ''}`}>
              {DISCOVER_LINKS.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="hd-actions">
          <Link href="/wunschliste" className="hd-icon" aria-label="Wunschliste" title="Wunschliste">
            <HeartIcon />
          </Link>
          <Link href="/mein-profil" className="hd-icon hd-icon-profile" aria-label="Mein Duftprofil" title="Mein Duftprofil">
            <UserIcon />
          </Link>
          <Link href="/#quiz" className="hd-cta">Quiz starten</Link>
          <button
            type="button"
            className="hd-burger"
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Handy-Menü */}
      <div className="hd-sheet" aria-hidden={!menuOpen}>
        <Link href="/#quiz" className="hd-sheet-cta" onClick={() => setMenuOpen(false)}>
          <span>Finde deinen Duft</span>
          <strong>Quiz starten →</strong>
        </Link>
        <nav className="hd-sheet-main" aria-label="Menü">
          {MAIN_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label} <span aria-hidden="true">→</span>
            </Link>
          ))}
          <Link href="/wunschliste" onClick={() => setMenuOpen(false)}>
            Wunschliste <span aria-hidden="true">→</span>
          </Link>
          <Link href="/mein-profil" onClick={() => setMenuOpen(false)}>
            Mein Duftprofil <span aria-hidden="true">→</span>
          </Link>
        </nav>
        <p className="hd-sheet-kicker">Entdecken</p>
        <div className="hd-sheet-chips">
          {DISCOVER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</Link>
          ))}
        </div>
      </div>
    </header>
  );
}
