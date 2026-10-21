import { autoTagAllPerfumes } from '@/lib/perfumes';
import { NextResponse } from 'next/server';

async function handleRequest() {
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

export async function GET() {
  return handleRequest();
}

export async function POST() {
  return handleRequest();
}
