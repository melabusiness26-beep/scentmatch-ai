import { autoTagAllPerfumes } from '@/lib/perfumes';
import { requireAdmin } from '@/lib/admin-auth';
import { NextRequest, NextResponse } from 'next/server';

// Nur per POST und nur für eingeloggte Admins – ein GET (z. B. von einem
// Crawler) darf keine Datenbank-Änderungen auslösen.
export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  try {
    const result = await autoTagAllPerfumes();

    return NextResponse.json({
      success: true,
      message: `Auto-tagging complete: ${result.success} successful, ${result.failed} failed`,
      data: result
    });
  } catch (error) {
    console.error('Error in auto-tag-perfumes:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
