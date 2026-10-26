import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  try {
    const denied = await requireAdmin(request);
    if (denied) return denied;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Server configuration error: missing Supabase credentials' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { confirm } = body;

    if (confirm !== 'DELETE_ALL_BRANDS') {
      return NextResponse.json(
        { error: 'Confirmation token not provided' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the delete_all_brands SQL function (SECURITY DEFINER)
    const { data, error } = await supabase
      .rpc('delete_all_brands', {});

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: `Failed to delete brands: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data || 'Deleted all brands from database',
      deleted: true,
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
