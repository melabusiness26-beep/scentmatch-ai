import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getTopMatches } from '@/lib/match-engine';
import type { QuizState } from '@/lib/quiz-types';
import type { Perfume } from '@/lib/perfumes';

export async function POST(
  request: NextRequest
): Promise<NextResponse> {
  try {
    const quizState: QuizState = await request.json();

    /* Validate quiz state */
    if (!quizState.gender) {
      return NextResponse.json(
        { error: 'Gender not selected' },
        { status: 400 }
      );
    }

    /* Fetch all perfumes from Supabase */
    const { data: perfumes, error } = await supabase
      .from('perfumes')
      .select('*')
      .limit(500);

    if (error || !perfumes) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch perfumes' },
        { status: 500 }
      );
    }

    /* Calculate matches */
    const matches = getTopMatches(
      perfumes as Perfume[],
      quizState,
      10
    );

    return NextResponse.json(matches);
  } catch (err) {
    console.error('Match calculation error:', err);
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
