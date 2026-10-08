import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAnthropic } from '@/lib/anthropic-analyzer';
import { validateImageSize, extractMimeTypeFromDataUri, extractBase64FromDataUri } from '@/lib/image-validation';

export async function GET() {
  return NextResponse.json({ ok: true, version: '1.0.1' });
}

export async function POST(request: NextRequest) {
  try {
    console.log('[image-analyzer] POST-Request empfangen');
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      console.error('[image-analyzer] Ungültige Bildanfrage');
      return NextResponse.json(
        { success: false, error: 'Ungültige Bildanfrage' },
        { status: 400 }
      );
    }

    if (!validateImageSize(imageBase64)) {
      console.error('[image-analyzer] Bild zu groß');
      return NextResponse.json(
        { success: false, error: 'Bild zu groß (max 5MB)' },
        { status: 400 }
      );
    }

    console.log('[image-analyzer] Bild validiert, starte Anthropic-Analyse...');
    const mimeType = extractMimeTypeFromDataUri(imageBase64);
    const base64Data = extractBase64FromDataUri(imageBase64);
    const result = await analyzeImageWithAnthropic(base64Data, mimeType);
    console.log('[image-analyzer] Analyse abgeschlossen:', result.success ? 'erfolgreich' : 'fehlgeschlagen');

    return NextResponse.json(result);
  } catch (error) {
    console.error('[image-analyzer] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Bildanalyse' },
      { status: 500 }
    );
  }
}
