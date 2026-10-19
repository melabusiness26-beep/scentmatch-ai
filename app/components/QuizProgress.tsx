'use client';

import React, { ReactElement } from 'react';

interface QuizProgressProps {
  currentStep: number;
  totalSteps: number;
}

export default function QuizProgress({
  currentStep,
  totalSteps,
}: QuizProgressProps): ReactElement {
  const percentage = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="quiz-progress-wrapper">
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="quiz-progress-text">
        Schritt {currentStep + 1} von {totalSteps}
      </p>
    </div>
  );
}
