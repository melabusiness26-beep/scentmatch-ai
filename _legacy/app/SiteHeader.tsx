'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const TOP_LINKS = [
  { href: '/beste-damenduefte',   label: '♀ Beste Damendüfte' },
  { href: '/beste-herrenduefte',  label: '♂ Beste Herrendüfte' },
  { href: '/beste-unisex-duefte', label: '⚥ Beste Unisex-Düfte' },
  { href: '/beste-duefte-unter-100', label: '💸 Unter CHF 100' },
];

// Gemeinsames Premium-Menü für alle Seiten (Startseite, Detail, Ratgeber).
export default function SiteHeader() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [dropOpen, setDropOpen]   = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Dropdown schließen beim Klick außerhalb
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const close = () => { setMenuOpen(false); setDropOpen(false); };

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
          <Link href="/marke" onClick={close}>Marken</Link>
          <Link href="/vergleich" onClick={close}>Vergleich</Link>
          <Link href="/mein-profil" onClick={close}>👤 Profil</Link>
          <Link href="/wunschliste" onClick={close}>♥ Wunschliste</Link>

          {/* Top-Listen Dropdown */}
          <div
            ref={dropRef}
            style={{ position: 'relative', display: 'inline-block' }}
          >
            <button
              type="button"
              onClick={() => setDropOpen(o => !o)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                font: 'inherit',
                color: 'inherit',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                whiteSpace: 'nowrap',
              }}
              aria-expanded={dropOpen}
              aria-haspopup="true"
            >
              Top-Listen
              <span style={{
                fontSize: '0.6em',
                transition: 'transform 0.2s',
                transform: dropOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                display: 'inline-block',
              }}>▼</span>
            </button>

            {dropOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 0.5rem)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#fff',
                borderRadius: '10px',
                boxShadow: '0 8px 32px rgba(42,29,18,0.14)',
                border: '1px solid rgba(212,175,55,0.15)',
                minWidth: '210px',
                zIndex: 200,
                overflow: 'hidden',
              }}>
                {TOP_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    style={{
                      display: 'block',
                      padding: '0.65rem 1rem',
                      fontSize: '0.88rem',
                      color: '#2a1d12',
                      textDecoration: 'none',
                      fontWeight: 500,
                      borderBottom: '1px solid rgba(42,29,18,0.06)',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#faf7f2')}
                    onMouseLeave={e => (e.currentTarget.style.background = '')}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/duft-scanner" onClick={close}>Duft-Scanner</Link>
          <Link href="/duft-detektiv" onClick={close}>Duft-Detektiv</Link>
          <Link href="/ratgeber" onClick={close}>Ratgeber</Link>
          <Link className="button nav-cta" href="/#quiz" onClick={close}>Quiz starten</Link>
        </nav>
      </div>
    </header>
  );
}
