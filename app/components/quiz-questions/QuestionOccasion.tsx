'use client';

import React, { ReactElement } from 'react';
import { OccasionValue, OCCASION_LABELS } from '@/lib/quiz-types';

interface QuestionOccasionProps {
  selectedOccasions: OccasionValue[];
  onSelect: (occasions: OccasionValue[]) => void;
}

export default function QuestionOccasion({
  selectedOccasions,
  onSelect,
}: QuestionOccasionProps): ReactElement {
  const handleToggle = (occasion: OccasionValue): void => {
    if (selectedOccasions.includes(occasion)) {
      onSelect(selectedOccasions.filter((o) => o !== occasion));
    } else {
      onSelect([...selectedOccasions, occasion]);
    }
  };

  return (
    <div className="question">
      <h2 className="question-title">Für welche Anlässe suchst du?</h2>
      <p className="question-subtitle">
        Du kannst mehrere Anlässe auswählen.
      </p>

      <div className="question-options grid">
        {(['daily', 'work', 'date', 'evening', 'casual', 'special'] as const).map(
          (option) => (
            <button
              key={option}
              className={`option-button ${
                selectedOccasions.includes(option) ? 'selected' : ''
              }`}
              onClick={() => handleToggle(option)}
            >
              {OCCASION_LABELS[option]}
            </button>
          )
        )}
      </div>
    </div>
  );
}
