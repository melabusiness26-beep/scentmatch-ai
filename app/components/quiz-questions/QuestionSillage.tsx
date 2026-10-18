'use client';

import React, { ReactElement } from 'react';
import { SillageValue, SILLAGE_LABELS } from '@/lib/quiz-types';

interface QuestionSillageProps {
  selectedSillage: SillageValue | null;
  onSelect: (sillage: SillageValue) => void;
}

export default function QuestionSillage({
  selectedSillage,
  onSelect,
}: QuestionSillageProps): ReactElement {
  return (
    <div className="question">
      <h2 className="question-title">Wie intensiv soll der Duft sein?</h2>
      <p className="question-subtitle">
        Die Sillage ist wie weit der Duft von dir wahrnehmbar ist.
      </p>

      <div className="question-options">
        {(['light', 'moderate', 'intense'] as const).map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedSillage === option ? 'selected' : ''
            }`}
            onClick={() => onSelect(option)}
          >
            {SILLAGE_LABELS[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
