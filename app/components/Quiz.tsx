'use client';

import React, { useReducer, ReactElement } from 'react';
import {
  QuizState,
  INITIAL_QUIZ_STATE,
  quizReducer,
  GenderValue,
  FragranceFamilyValue,
  OccasionValue,
  SeasonValue,
  SillageValue,
} from '@/lib/quiz-types';
import QuestionGender from './quiz-questions/QuestionGender';
import QuestionAnchor from './quiz-questions/QuestionAnchor';
import QuestionFamilies from './quiz-questions/QuestionFamilies';
import QuestionNotes from './quiz-questions/QuestionNotes';
import QuestionOccasion from './quiz-questions/QuestionOccasion';
import QuestionSeason from './quiz-questions/QuestionSeason';
import QuestionSillage from './quiz-questions/QuestionSillage';
import QuestionBudget from './quiz-questions/QuestionBudget';
import QuizProgress from './QuizProgress';
import QuizResults from './QuizResults';

export default function Quiz(): ReactElement {
  const [state, dispatch] = useReducer(quizReducer, INITIAL_QUIZ_STATE);

  const handleGenderSelect = (gender: GenderValue): void => {
    dispatch({ type: 'SET_GENDER', payload: gender });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleAnchorSelect = (perfumeId: string | null): void => {
    dispatch({ type: 'SET_ANCHOR', payload: perfumeId });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleFamiliesSelect = (
    families: FragranceFamilyValue[]
  ): void => {
    dispatch({ type: 'SET_FAMILIES', payload: families });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleLovedNotesSelect = (notes: string[]): void => {
    dispatch({ type: 'SET_DISLIKED_NOTES', payload: notes });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleDislikedNotesSelect = (notes: string[]): void => {
    dispatch({ type: 'SET_DISLIKED_NOTES', payload: notes });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleOccasionSelect = (occasions: OccasionValue[]): void => {
    dispatch({ type: 'SET_OCCASIONS', payload: occasions });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleSeasonSelect = (season: SeasonValue): void => {
    dispatch({ type: 'SET_SEASON', payload: season });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleSillageSelect = (sillage: SillageValue): void => {
    dispatch({ type: 'SET_SILLAGE', payload: sillage });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleBudgetChange = (min: number, max: number): void => {
    dispatch({ type: 'SET_BUDGET', payload: { min, max } });
    dispatch({ type: 'NEXT_STEP' });
  };

  const handleNext = (): void => {
    dispatch({ type: 'NEXT_STEP' });
  };

  const handlePrev = (): void => {
    dispatch({ type: 'PREV_STEP' });
  };

  const handleStart = (): void => {
    dispatch({ type: 'START_QUIZ' });
  };

  const handleReset = (): void => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  if (!state.isStarted) {
    return (
      <div className="quiz-intro">
        <h2>Finde deinen perfekten Duft</h2>
        <p>
          Mit unserem Quiz beantwortete wir dir 9 Fragen und finden deine
          Top-Matches basierend auf deine Vorlieben.
        </p>
        <button
          className="button button-primary"
          onClick={handleStart}
        >
          Quiz starten
        </button>
      </div>
    );
  }

  if (state.isComplete) {
    return (
      <QuizResults
        quizState={state}
        onReset={handleReset}
      />
    );
  }

  return (
    <div className="quiz-container">
      <QuizProgress
        currentStep={state.currentStep}
        totalSteps={9}
      />

      <div className="quiz-question">
        {state.currentStep === 0 && (
          <QuestionGender
            selectedGender={state.gender}
            onSelect={handleGenderSelect}
          />
        )}

        {state.currentStep === 1 && (
          <QuestionAnchor
            selectedAnchorId={state.anchorPerfumeId}
            onSelect={handleAnchorSelect}
          />
        )}

        {state.currentStep === 2 && (
          <QuestionFamilies
            selectedFamilies={state.families}
            onSelect={handleFamiliesSelect}
          />
        )}

        {state.currentStep === 3 && (
          <QuestionNotes
            type="loved"
            selectedNotes={state.lovedNotes}
            onSelect={handleLovedNotesSelect}
          />
        )}

        {state.currentStep === 4 && (
          <QuestionNotes
            type="disliked"
            selectedNotes={state.dislikedNotes}
            onSelect={handleDislikedNotesSelect}
          />
        )}

        {state.currentStep === 5 && (
          <QuestionOccasion
            selectedOccasions={state.occasions}
            onSelect={handleOccasionSelect}
          />
        )}

        {state.currentStep === 6 && (
          <QuestionSeason
            selectedSeason={state.season}
            onSelect={handleSeasonSelect}
          />
        )}

        {state.currentStep === 7 && (
          <QuestionSillage
            selectedSillage={state.sillage}
            onSelect={handleSillageSelect}
          />
        )}

        {state.currentStep === 8 && (
          <QuestionBudget
            budgetMin={state.budgetMin}
            budgetMax={state.budgetMax}
            onChange={handleBudgetChange}
          />
        )}
      </div>

      <div className="quiz-buttons">
        {state.currentStep > 0 && (
          <button
            className="button button-secondary"
            onClick={handlePrev}
          >
            Zurück
          </button>
        )}
        {state.currentStep < 8 && (
          <button
            className="button button-primary"
            onClick={handleNext}
          >
            Weiter
          </button>
        )}
      </div>
    </div>
  );
}
