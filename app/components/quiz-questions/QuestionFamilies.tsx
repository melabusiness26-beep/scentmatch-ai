'use client';

import React, { ReactElement } from 'react';
import { FragranceFamilyValue, FAMILY_LABELS } from '@/lib/quiz-types';

interface QuestionFamiliesProps {
  selectedFamilies: FragranceFamilyValue[];
  onSelect: (families: FragranceFamilyValue[]) => void;
}

export default function QuestionFamilies({
  selectedFamilies,
  onSelect,
}: QuestionFamiliesProps): ReactElement {
  const handleToggle = (family: FragranceFamilyValue): void => {
    if (selectedFamilies.includes(family)) {
      onSelect(selectedFamilies.filter((f) => f !== family));
    } else {
      onSelect([...selectedFamilies, family]);
    }
  };

  return (
    <div className="question">
      <h2 className="question-title">Welche Duftrichtungen magst du?</h2>
      <p className="question-subtitle">
        Du kannst mehrere auswählen. Minimum 1.
      </p>

      <div className="question-options grid">
        {(['clean', 'gourmand', 'woody', 'floral'] as const).map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedFamilies.includes(option) ? 'selected' : ''
            }`}
            onClick={() => handleToggle(option)}
          >
            {FAMILY_LABELS[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
