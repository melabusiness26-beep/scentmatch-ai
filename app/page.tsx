import React from 'react';

export default function HomePage(): React.ReactElement {
  return (
    <div className="hero-stage">
      <div className="hero">
        <div className="hero-photo-inner">
          <div className="eyebrow">Duft-Finder</div>
          <h1>Finde deinen Signature Duft</h1>
          <p className="lead">
            Mit unserem KI-Quiz findest du den perfekten Duft,
            der zu dir passt. Kostenlos, einfach und ohne
            Anmeldung.
          </p>
          <div className="hero-stats-row">
            <div className="hero-stat-mini">
              <strong>500+</strong>
              <span>Düfte</span>
            </div>
            <div className="hero-stat-mini">
              <strong>90%</strong>
              <span>Zufriedenheit</span>
            </div>
            <div className="hero-stat-mini">
              <strong>1000s</strong>
              <span>Nutzer</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
