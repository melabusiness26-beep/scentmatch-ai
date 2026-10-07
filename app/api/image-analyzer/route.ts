import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAnthropic } from '@/lib/anthropic-analyzer';
import { validateImageSize, extractMimeTypeFromDataUri, extractBase64FromDataUri } from '@/lib/image-validation';

export async function GET() {
  return NextResponse.json({ ok: true, version: '1.0.1' });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { imageBase64 } = body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Bildanfrage' },
        { status: 400 }
      );
    }

    if (!validateImageSize(imageBase64)) {
      return NextResponse.json(
        { success: false, error: 'Bild zu groß (max 5MB)' },
        { status: 400 }
      );
    }

    const mimeType = extractMimeTypeFromDataUri(imageBase64);
    const base64Data = extractBase64FromDataUri(imageBase64);
    const result = await analyzeImageWithAnthropic(base64Data, mimeType);

    return NextResponse.json(result);
  } catch (error) {
    console.error('[image-analyzer] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Bildanalyse' },
      { status: 500 }
    );
  }
}
