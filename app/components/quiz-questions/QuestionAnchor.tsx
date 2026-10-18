'use client';

import React, { ReactElement } from 'react';

interface QuestionAnchorProps {
  selectedAnchorId: string | null;
  onSelect: (perfumeId: string | null) => void;
}

export default function QuestionAnchor({
  selectedAnchorId,
  onSelect,
}: QuestionAnchorProps): ReactElement {
  return (
    <div className="question">
      <h2 className="question-title">
        Kennst du schon einen Duft, den du magst?
      </h2>
      <p className="question-subtitle">
        Optional: Das hilft uns, ähnliche Düfte zu finden.
      </p>
      <button
        className="button button-secondary"
        onClick={() => onSelect(null)}
      >
        Weiter ohne Anchor
      </button>
    </div>
  );
}
