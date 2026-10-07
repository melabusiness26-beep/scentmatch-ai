import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAnthropic, isAnthropicConfigured } from '@/lib/anthropic-analyzer';
import { validateImageSize, extractMimeTypeFromDataUri, extractBase64FromDataUri } from '@/lib/image-validation';
import { AnalysisResponse } from '@/types/image-analysis';

export async function POST(request: NextRequest): Promise<NextResponse<AnalysisResponse>> {
  try {
    // Prüfe ob Anthropic konfiguriert ist
    if (!isAnthropicConfigured) {
      return NextResponse.json(
        { success: false, error: 'Bildanalyse nicht verfügbar. Bitte später versuchen.' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Bildanfrage' },
        { status: 400 }
      );
    }

    // Validiere Bildgröße
    if (!validateImageSize(imageBase64)) {
      return NextResponse.json(
        { success: false, error: 'Bild zu groß (max 5MB)' },
        { status: 400 }
      );
    }

    // Extrahiere MIME-Type und Base64-Daten
    const mimeType = extractMimeTypeFromDataUri(imageBase64);
    const base64Data = extractBase64FromDataUri(imageBase64);

    // Analysiere mit Anthropic
    const result = await analyzeImageWithAnthropic(base64Data, mimeType);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[analyze-image] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Bildanalyse' },
      { status: 500 }
    );
  }
}
