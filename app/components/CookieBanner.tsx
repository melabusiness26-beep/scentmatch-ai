'use client';

import React, { useEffect, useState, ReactElement } from 'react';

export default function CookieBanner(): ReactElement {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if user has already accepted cookies
    const hasAcceptedCookies = localStorage.getItem('auressa_cookies_accepted');
    if (!hasAcceptedCookies) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('auressa_cookies_accepted', 'true');
    localStorage.setItem('auressa_cookies_accepted_at', new Date().toISOString());
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('auressa_cookies_accepted', 'false');
    localStorage.setItem('auressa_cookies_accepted_at', new Date().toISOString());
    setIsVisible(false);
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted || !isVisible) {
    return <></>;
  }

  return (
    <div className="cookie-banner" role="banner">
      <div className="cookie-banner-inner">
        <div className="cookie-text">
          <h3>Cookies &amp; Datenschutz</h3>
          <p>
            Wir verwenden Cookies, um dein Erlebnis zu verbessern und dir personalisierte
            Empfehlungen zu zeigen. Weitere Details findest du in unserer{' '}
            <a href="/datenschutz" target="_blank" rel="noopener">
              Datenschutzerklärung
            </a>
            .
          </p>
        </div>

        <div className="cookie-actions">
          <button
            className="button button-secondary small"
            onClick={handleReject}
            aria-label="Cookies ablehnen"
          >
            Ablehnen
          </button>
          <button
            className="button button-primary small"
            onClick={handleAccept}
            aria-label="Cookies akzeptieren"
          >
            Akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
