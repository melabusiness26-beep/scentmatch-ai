import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  const { path } = await request.json();

  if (!path) {
    return NextResponse.json(
      { error: 'path parameter required' },
      { status: 400 }
    );
  }

  try {
    revalidatePath(path);
    // Nach jeder Änderung an einem Duft auch Katalog, Startseite und Saison-Liste auffrischen,
    // damit die Änderung dort sofort sichtbar ist (nicht erst nach dem Zwischenspeicher-Intervall).
    if (typeof path === 'string' && path.startsWith('/duft/')) {
      for (const p of ['/duefte', '/', '/saisonal']) revalidatePath(p);
    }
    return NextResponse.json({
      success: true,
      message: `Cache cleared for ${path}`,
      revalidated: true,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}
