'use client';

import React, { ReactElement } from 'react';
import Link from 'next/link';

export default function SiteFooter(): ReactElement {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Auressa</h3>
            <p>Dein persönlicher Duft Finder – Kostenlose Empfehlungen für deinen Signature-Duft.</p>
          </div>

          <div className="footer-section">
            <h4>Links</h4>
            <nav>
              <ul>
                <li>
                  <Link href="/">Quiz</Link>
                </li>
                <li>
                  <Link href="/duefte">Katalog</Link>
                </li>
                <li>
                  <Link href="/ratgeber">Ratgeber</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="footer-section">
            <h4>Rechtliches</h4>
            <nav>
              <ul>
                <li>
                  <Link href="/datenschutz">Datenschutz</Link>
                </li>
                <li>
                  <Link href="/impressum">Impressum</Link>
                </li>
                <li>
                  <a href="mailto:melanie.viele@auressa.ch">Kontakt</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            &copy; 2024 Auressa – Discovery · Fragrance · Boutique
          </p>
        </div>
      </div>
    </footer>
  );
}
