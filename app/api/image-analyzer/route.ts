import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAnthropic, extractTextFromImage, findPerfumeByExtractedText } from '@/lib/anthropic-analyzer';
import { validateImageSize, extractMimeTypeFromDataUri, extractBase64FromDataUri } from '@/lib/image-validation';

export async function GET() {
  return NextResponse.json({ ok: true, version: '1.0.2' });
}

// Die Bild-Analyse ruft die kostenpflichtige Anthropic-API auf. Solange der Scanner
// nicht offiziell gestartet ist, bleibt sie gesperrt – so entstehen keine Kosten.
// Zum Einschalten in Vercel SCANNER_ENABLED=true setzen.
const SCANNER_ENABLED = process.env.SCANNER_ENABLED === 'true';

export async function POST(request: NextRequest) {
  if (!SCANNER_ENABLED) {
    return NextResponse.json(
      { success: false, error: 'Der Foto-Scanner ist bald verfügbar. Bis dahin findest du deinen Duft über die Suche oder das Quiz.' },
      { status: 503 }
    );
  }

  const startTime = Date.now();
  try {
    console.log('[image-analyzer] POST-Request empfangen');
    const body = await request.json();
    const { imageBase64 } = body;
    console.log(`[image-analyzer] Body geparst: ${Date.now() - startTime}ms`);

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

    console.log(`[image-analyzer] Bild validiert: ${Date.now() - startTime}ms`);
    const mimeType = extractMimeTypeFromDataUri(imageBase64);
    const base64Data = extractBase64FromDataUri(imageBase64);

    // Try OCR-based text extraction first (much faster)
    console.log('[image-analyzer] Versuche Text-Extraktion...');
    const textExtractStart = Date.now();
    const extractedText = await extractTextFromImage(base64Data, mimeType);
    const textExtractTime = Date.now() - textExtractStart;
    console.log(`[image-analyzer] Text-Extraktion: ${textExtractTime}ms`);

    let result;
    if (extractedText && extractedText.brandName && extractedText.perfumeName) {
      console.log(`[image-analyzer] Text extrahiert: ${extractedText.brandName} ${extractedText.perfumeName}`);
      result = await findPerfumeByExtractedText(extractedText.brandName, extractedText.perfumeName);
      if (result.success) {
        const totalTime = Date.now() - startTime;
        console.log(`[image-analyzer] OCR-Ansatz erfolgreich: ${totalTime}ms`);
        return NextResponse.json({
          ...result,
          _timing: totalTime,
          _method: 'ocr',
        });
      }
    }

    // Fall back to full vision analysis if OCR fails
    console.log('[image-analyzer] Text-Extraktion fehlgeschlagen, versuche Vision-Analyse...');
    result = await analyzeImageWithAnthropic(base64Data, mimeType);
    const totalTime = Date.now() - startTime;
    console.log(`[image-analyzer] Analyse fertig: ${totalTime}ms`);
    console.log('[image-analyzer] Ergebnis:', result.success ? 'erfolgreich' : 'fehlgeschlagen');

    return NextResponse.json({
      ...result,
      _timing: totalTime,
      _method: 'vision',
    });
  } catch (error) {
    console.error('[image-analyzer] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Bildanalyse' },
      { status: 500 }
    );
  }
}
