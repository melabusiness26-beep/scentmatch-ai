import { NextResponse } from 'next/server';

// This endpoint is deprecated — use /api/image-analyzer instead (has rate limiting + MIME validation)
export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Dieser Endpunkt ist veraltet. Bitte /api/image-analyzer verwenden.' },
    { status: 410, headers: { 'Location': '/api/image-analyzer' } }
  );
}

export async function GET() {
  return NextResponse.redirect('/api/image-analyzer');
}
