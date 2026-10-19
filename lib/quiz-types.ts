/* Quiz Type Definitions & State Management */

export type GenderValue = 'woman' | 'man' | 'unisex';
export type FragranceFamilyValue = 'clean' | 'gourmand' | 'woody' | 'floral';
export type SeasonValue =
  | 'spring'
  | 'summer'
  | 'fall'
  | 'winter'
  | 'year-round';
export type OccasionValue =
  | 'daily'
  | 'work'
  | 'date'
  | 'evening'
  | 'casual'
  | 'special';
export type SillageValue = 'light' | 'moderate' | 'intense';

export interface QuizState {
  /* Step 1: Gender */
  gender: GenderValue | null;

  /* Step 2: Anchor Perfume (optional) */
  anchorPerfumeId: string | null;

  /* Step 3: Fragrance Families (multiple choice, 3 selections) */
  families: FragranceFamilyValue[];

  /* Step 4: Loved Notes */
  lovedNotes: string[]; // e.g., ['Bergamote', 'Vanilla']

  /* Step 5: Disliked Notes */
  dislikedNotes: string[]; // e.g., ['Musk', 'Synthetic']

  /* Step 6: Occasion (multiple choice) */
  occasions: OccasionValue[];

  /* Step 7: Season (single choice) */
  season: SeasonValue | null;

  /* Step 8: Sillage (single choice) */
  sillage: SillageValue | null;

  /* Step 9: Budget (range) */
  budgetMin: number; // in CHF
  budgetMax: number; // in CHF

  /* Current step in quiz (0-8, 9 = results) */
  currentStep: number;

  /* Whether quiz is started */
  isStarted: boolean;

  /* Whether quiz is complete */
  isComplete: boolean;
}

export const INITIAL_QUIZ_STATE: QuizState = {
  gender: null,
  anchorPerfumeId: null,
  families: [],
  lovedNotes: [],
  dislikedNotes: [],
  occasions: [],
  season: null,
  sillage: null,
  budgetMin: 0,
  budgetMax: 300,
  currentStep: 0,
  isStarted: false,
  isComplete: false,
};

export type QuizAction =
  | { type: 'START_QUIZ' }
  | { type: 'SET_GENDER'; payload: GenderValue }
  | { type: 'SET_ANCHOR'; payload: string | null }
  | { type: 'SET_FAMILIES'; payload: FragranceFamilyValue[] }
  | { type: 'SET_LOVED_NOTES'; payload: string[] }
  | { type: 'ADD_LOVED_NOTE'; payload: string }
  | { type: 'REMOVE_LOVED_NOTE'; payload: string }
  | { type: 'SET_DISLIKED_NOTES'; payload: string[] }
  | { type: 'SET_OCCASIONS'; payload: OccasionValue[] }
  | { type: 'SET_SEASON'; payload: SeasonValue }
  | { type: 'SET_SILLAGE'; payload: SillageValue }
  | { type: 'SET_BUDGET'; payload: { min: number; max: number } }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'JUMP_TO_STEP'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' };

export function quizReducer(
  state: QuizState,
  action: QuizAction
): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return { ...state, isStarted: true, currentStep: 0 };

    case 'SET_GENDER':
      return { ...state, gender: action.payload };

    case 'SET_ANCHOR':
      return { ...state, anchorPerfumeId: action.payload };

    case 'SET_FAMILIES':
      return { ...state, families: action.payload };

    case 'SET_LOVED_NOTES':
      return { ...state, lovedNotes: action.payload };

    case 'ADD_LOVED_NOTE':
      return {
        ...state,
        lovedNotes: [...state.lovedNotes, action.payload],
      };

    case 'REMOVE_LOVED_NOTE':
      return {
        ...state,
        lovedNotes: state.lovedNotes.filter((n) => n !== action.payload),
      };

    case 'SET_DISLIKED_NOTES':
      return { ...state, dislikedNotes: action.payload };

    case 'SET_OCCASIONS':
      return { ...state, occasions: action.payload };

    case 'SET_SEASON':
      return { ...state, season: action.payload };

    case 'SET_SILLAGE':
      return { ...state, sillage: action.payload };

    case 'SET_BUDGET':
      return {
        ...state,
        budgetMin: action.payload.min,
        budgetMax: action.payload.max,
      };

    case 'NEXT_STEP':
      const nextStep = Math.min(state.currentStep + 1, 8);
      return { ...state, currentStep: nextStep };

    case 'PREV_STEP':
      const prevStep = Math.max(state.currentStep - 1, 0);
      return { ...state, currentStep: prevStep };

    case 'JUMP_TO_STEP':
      return { ...state, currentStep: action.payload };

    case 'COMPLETE_QUIZ':
      return { ...state, isComplete: true, currentStep: 9 };

    case 'RESET_QUIZ':
      return INITIAL_QUIZ_STATE;

    default:
      return state;
  }
}

export const GENDER_LABELS: Record<GenderValue, string> = {
  woman: 'Für mich (Frau)',
  man: 'Für mich (Mann)',
  unisex: 'Unisex / Nicht relevant',
};

export const FAMILY_LABELS: Record<FragranceFamilyValue, string> = {
  clean: 'Clean (Frisch & Sauber)',
  gourmand: 'Gourmand (Süß & Warm)',
  woody: 'Woody (Holzig & Würzig)',
  floral: 'Floral (Blumig & Elegant)',
};

export const SEASON_LABELS: Record<SeasonValue, string> = {
  spring: 'Frühling',
  summer: 'Sommer',
  fall: 'Herbst',
  winter: 'Winter',
  'year-round': 'Ganzjährig',
};

export const OCCASION_LABELS: Record<OccasionValue, string> = {
  daily: 'Alltag',
  work: 'Büro',
  date: 'Date',
  evening: 'Abend',
  casual: 'Casual',
  special: 'Spezial',
};

export const SILLAGE_LABELS: Record<SillageValue, string> = {
  light: 'Leicht (subtil)',
  moderate: 'Moderat',
  intense: 'Intensiv (stark)',
};
