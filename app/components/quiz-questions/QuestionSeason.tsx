'use client';

import React, { ReactElement } from 'react';
import { SeasonValue, SEASON_LABELS } from '@/lib/quiz-types';

interface QuestionSeasonProps {
  selectedSeason: SeasonValue | null;
  onSelect: (season: SeasonValue) => void;
}

export default function QuestionSeason({
  selectedSeason,
  onSelect,
}: QuestionSeasonProps): ReactElement {
  return (
    <div className="question">
      <h2 className="question-title">Welche Jahreszeit bevorzugst du?</h2>
      <p className="question-subtitle">
        Manche Düfte passen besser zu bestimmten Jahreszeiten.
      </p>

      <div className="question-options">
        {(['spring', 'summer', 'fall', 'winter', 'year-round'] as const).map(
          (option) => (
            <button
              key={option}
              className={`option-button ${
                selectedSeason === option ? 'selected' : ''
              }`}
              onClick={() => onSelect(option)}
            >
              {SEASON_LABELS[option]}
            </button>
          )
        )}
      </div>
    </div>
  );
}
