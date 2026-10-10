import { NextRequest, NextResponse } from 'next/server';
import { analyzeImageWithAnthropic } from '@/lib/anthropic-analyzer';
import { validateImageSize, extractMimeTypeFromDataUri, extractBase64FromDataUri } from '@/lib/image-validation';

// ─── In-memory rate limiter ────────────────────────────────────────────────
// Per IP: max 5 requests per 60-second window
const RATE_LIMIT = 5;
const WINDOW_MS = 60 * 1000;

interface RateEntry { count: number; windowStart: number }
const rateLimitMap = new Map<string, RateEntry>();

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  );
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }

  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

// Cleanup old entries every ~10 min to prevent memory leak on long-running instances
let lastCleanup = Date.now();
function maybeCleanup() {
  const now = Date.now();
  if (now - lastCleanup < 10 * 60 * 1000) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > WINDOW_MS) rateLimitMap.delete(ip);
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, version: '1.0.2' });
}

export async function POST(request: NextRequest) {
  try {
    maybeCleanup();

    const ip = getClientIp(request);
    const { allowed, remaining } = checkRateLimit(ip);
    if (!allowed) {
      console.warn(`[image-analyzer] Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { success: false, error: 'Zu viele Anfragen – bitte warte eine Minute.' },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Limit': String(RATE_LIMIT),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

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

    // Validate MIME type (only jpeg/png/webp accepted)
    const mimeType = extractMimeTypeFromDataUri(imageBase64);
    const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    if (!ALLOWED_MIME_TYPES.includes(mimeType)) {
      console.error(`[image-analyzer] Ungültiger MIME-Typ: ${mimeType}`);
      return NextResponse.json(
        { success: false, error: 'Ungültiges Bildformat – nur JPEG, PNG und WebP erlaubt.' },
        { status: 415 }
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
