'use client';

import React, { useState, ReactElement } from 'react';
import Link from 'next/link';

export default function SiteHeader(): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link href="/" className="logo" onClick={closeMenu}>
          <div className="logo-mark">A</div>
          <span className="logo-text">Auressa</span>
        </Link>

        {/* Navigation */}
        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li>
              <Link href="/" onClick={closeMenu}>
                Quiz
              </Link>
            </li>
            <li>
              <Link href="/duefte" onClick={closeMenu}>
                Katalog
              </Link>
            </li>
            <li>
              <Link href="/ratgeber" onClick={closeMenu}>
                Ratgeber
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={toggleMenu}
          aria-label="Menü umschalten"
          aria-expanded={mobileMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
