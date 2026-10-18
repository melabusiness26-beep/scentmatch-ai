'use client';

import React, { ReactElement } from 'react';
import { GenderValue, GENDER_LABELS } from '@/lib/quiz-types';

interface QuestionGenderProps {
  selectedGender: GenderValue | null;
  onSelect: (gender: GenderValue) => void;
}

export default function QuestionGender({
  selectedGender,
  onSelect,
}: QuestionGenderProps): ReactElement {
  return (
    <div className="question">
      <h2 className="question-title">Wer soll den Duft tragen?</h2>
      <p className="question-subtitle">
        Das hilft uns, die perfekten Empfehlungen zu geben.
      </p>

      <div className="question-options">
        {(['woman', 'man', 'unisex'] as const).map((option) => (
          <button
            key={option}
            className={`option-button ${
              selectedGender === option ? 'selected' : ''
            }`}
            onClick={() => onSelect(option)}
          >
            {GENDER_LABELS[option]}
          </button>
        ))}
      </div>
    </div>
  );
}
