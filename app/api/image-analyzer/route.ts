import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithClaude } from '@/lib/anthropic-analyzer';

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function validateBase64Size(base64String: string): boolean {
  const sizeBytes = Math.ceil(base64String.length * 0.75);
  return sizeBytes <= MAX_SIZE_BYTES;
}

export async function GET() {
  return NextResponse.json({ ok: true, version: '1.0.1' });
}

export async function POST(request: NextRequest) {
  console.log('[image-analyzer POST] Starting image analysis request');
  try {
    const body = await request.json();
    const { imageBase64 } = body;
    console.log('[image-analyzer] Received request with image length:', imageBase64?.length);

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Ungültige Bildanfrage' },
        { status: 400 }
      );
    }

    if (!validateBase64Size(imageBase64)) {
      return NextResponse.json(
        { success: false, error: 'Bild zu groß (max 5MB)' },
        { status: 400 }
      );
    }

    console.log('[image-analyzer] Calling analyzeImageWithClaude...');
    const result = await analyzeImageWithClaude(imageBase64);
    console.log('[image-analyzer] Analysis result:', result);

    if (!result) {
      console.error('[image-analyzer] Analysis returned null - checking API key configuration');
      return NextResponse.json(
        { success: false, error: 'Bildanalyse fehlgeschlagen' },
        { status: 500 }
      );
    }

    console.log('[image-analyzer] Analysis successful, returning result');
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('[image-analyzer] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Bildanalyse' },
      { status: 500 }
    );
  }
}
