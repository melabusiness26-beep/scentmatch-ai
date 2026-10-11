'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Gemeinsames Premium-Menü für alle Seiten (Startseite, Detail, Ratgeber).
export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link className="logo" href="/" onClick={close}>Auressa</Link>
        <button
          type="button"
          className="nav-toggle"
          aria-label="Menü öffnen oder schließen"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav className={`main-nav${menuOpen ? ' open' : ''}`}>
          <Link href="/duefte" onClick={close}>Düfte</Link>
          <Link href="/duft-detektiv" onClick={close}>Duft-Detektiv</Link>
          <Link href="/duft-scanner" onClick={close}>Duft-Scanner</Link>
          <Link href="/ratgeber" onClick={close}>Ratgeber</Link>
          <Link href="/ueber-uns" onClick={close}>Über uns</Link>
          <Link className="button nav-cta" href="/#quiz" onClick={close}>Quiz starten</Link>
        </nav>
      </div>
    </header>
  );
}
