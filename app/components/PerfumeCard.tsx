'use client';

import React, { ReactElement } from 'react';
import type { Perfume } from '@/lib/perfumes';

interface PerfumeCardProps {
  perfume: Perfume;
  onSelect?: (perfume: Perfume) => void;
}

export default function PerfumeCard({
  perfume,
  onSelect,
}: PerfumeCardProps): ReactElement {
  return (
    <div
      className="perfume-card"
      onClick={() => onSelect?.(perfume)}
      role="button"
      tabIndex={0}
    >
      {/* Image */}
      <div className="perfume-image">
        {perfume.image_url ? (
          <img
            src={perfume.image_url}
            alt={perfume.perfume_name}
            loading="lazy"
          />
        ) : (
          <div className="image-placeholder">
            <div className="placeholder-bottle" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="perfume-info">
        <p className="perfume-brand">
          {perfume.brands?.name || 'Unknown Brand'}
        </p>
        <h3 className="perfume-name">{perfume.perfume_name}</h3>

        {/* Score Badge */}
        {perfume.scentmatch_score !== null && (
          <div className="score-badge">
            <span className="score-value">
              {Math.round(perfume.scentmatch_score)}
            </span>
            <span className="score-label">Score</span>
          </div>
        )}

        {/* Family Badge */}
        {perfume.fragrance_family && (
          <div
            className={`family-badge family-${perfume.fragrance_family.toLowerCase()}`}
          >
            {perfume.fragrance_family}
          </div>
        )}

        {/* Specs */}
        <div className="perfume-specs">
          {perfume.gender && (
            <span className="spec-item">
              👤 {perfume.gender === 'Women' ? '👩' : perfume.gender === 'Men' ? '👨' : '✨'}
            </span>
          )}
          {perfume.price_chf !== null && (
            <span className="spec-item">CHF {perfume.price_chf}</span>
          )}
          {perfume.sillage !== null && (
            <span className="spec-item">Sillage: {Math.round(perfume.sillage)}/5</span>
          )}
        </div>

        {/* Notes Preview */}
        {(perfume.top_notes || perfume.heart_notes || perfume.base_notes) && (
          <div className="notes-preview">
            <p className="notes-label">Noten:</p>
            <div className="notes-list">
              {[
                ...(perfume.top_notes || []).slice(0, 1),
                ...(perfume.heart_notes || []).slice(0, 1),
                ...(perfume.base_notes || []).slice(0, 1),
              ].map((note, idx) => (
                <span key={idx} className="note-tag">
                  {note}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <button className="button button-primary full-width">
        Details ansehen
      </button>
    </div>
  );
}
