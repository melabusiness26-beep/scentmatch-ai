import { autoTagAllPerfumes } from '@/lib/perfumes';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    console.log('🔄 Starting auto-tag-perfumes...');
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
