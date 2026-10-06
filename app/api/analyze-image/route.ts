import { NextRequest, NextResponse } from 'next/server';
import { validateBase64Image } from '@/lib/image-validation';
import { analyzeImageWithClaude } from '@/lib/anthropic-analyzer';
import type { AnalyzeImageRequest, AnalyzeImageResponse } from '@/types/image-analysis';

export async function POST(request: NextRequest): Promise<NextResponse<AnalyzeImageResponse>> {
  try {
    const body: AnalyzeImageRequest = await request.json();
    const { imageBase64, includeProductInfo } = body;

    // Validiere Bild
    const validation = validateBase64Image(imageBase64);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.error || 'Bild-Validierungsfehler',
        },
        { status: 400 }
      );
    }

    // Analysiere mit Claude
    const analysisResult = await analyzeImageWithClaude(imageBase64, includeProductInfo);

    if (!analysisResult) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bild konnte nicht analysiert werden',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: analysisResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[API /analyze-image] Fehler:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Server-Fehler bei Bildanalyse',
      },
      { status: 500 }
    );
  }
}
