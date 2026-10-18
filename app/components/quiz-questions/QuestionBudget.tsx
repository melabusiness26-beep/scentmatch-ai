'use client';

import React, { ReactElement } from 'react';

interface QuestionBudgetProps {
  budgetMin: number;
  budgetMax: number;
  onChange: (min: number, max: number) => void;
}

export default function QuestionBudget({
  budgetMin,
  budgetMax,
  onChange,
}: QuestionBudgetProps): ReactElement {
  return (
    <div className="question">
      <h2 className="question-title">Was ist dein Budget?</h2>
      <p className="question-subtitle">
        Wir zeigen dir Düfte in dieser Preisrange (CHF).
      </p>

      <div className="budget-inputs">
        <div className="budget-field">
          <label>Von:</label>
          <input
            type="number"
            value={budgetMin}
            onChange={(e) => onChange(parseInt(e.target.value), budgetMax)}
            min="0"
            max="300"
          />
        </div>

        <div className="budget-field">
          <label>Bis:</label>
          <input
            type="number"
            value={budgetMax}
            onChange={(e) => onChange(budgetMin, parseInt(e.target.value))}
            min="0"
            max="300"
          />
        </div>
      </div>

      <div className="budget-slider">
        <input
          type="range"
          min="0"
          max="300"
          value={budgetMax}
          onChange={(e) => onChange(budgetMin, parseInt(e.target.value))}
          className="slider-max"
        />
      </div>

      <p className="budget-text">
        CHF {budgetMin} – CHF {budgetMax}
      </p>
    </div>
  );
}
