'use client';

import React, { ReactElement } from 'react';

interface QuestionNotesProps {
  type: 'loved' | 'disliked';
  selectedNotes: string[];
  onSelect: (notes: string[]) => void;
}

const COMMON_NOTES = [
  'Bergamotte',
  'Vanille',
  'Moschus',
  'Holz',
  'Blumig',
  'Würzig',
  'Fruchtig',
  'Minz',
];

export default function QuestionNotes({
  type,
  selectedNotes,
  onSelect,
}: QuestionNotesProps): ReactElement {
  const title =
    type === 'loved'
      ? 'Welche Duftnoten magst du?'
      : 'Welche Noten magst du NICHT?';

  const handleToggle = (note: string): void => {
    if (selectedNotes.includes(note)) {
      onSelect(selectedNotes.filter((n) => n !== note));
    } else {
      onSelect([...selectedNotes, note]);
    }
  };

  return (
    <div className="question">
      <h2 className="question-title">{title}</h2>
      <p className="question-subtitle">
        Du kannst mehrere auswählen (oder keine).
      </p>

      <div className="question-options grid">
        {COMMON_NOTES.map((note) => (
          <button
            key={note}
            className={`option-button ${
              selectedNotes.includes(note) ? 'selected' : ''
            }`}
            onClick={() => handleToggle(note)}
          >
            {note}
          </button>
        ))}
      </div>

      <button
        className="button button-secondary"
        onClick={() => onSelect([])}
      >
        Weiter ohne Auswahl
      </button>
    </div>
  );
}
