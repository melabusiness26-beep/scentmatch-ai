import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
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

    if (confirm !== 'DELETE_ALL_PERFUMES') {
      return NextResponse.json(
        { error: 'Confirmation token not provided' },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Call the delete_all_perfumes SQL function (SECURITY DEFINER)
    const { data, error } = await supabase
      .rpc('delete_all_perfumes', {});

    if (error) {
      console.error('Delete error:', error);
      return NextResponse.json(
        { error: `Failed to delete perfumes: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: data || 'Deleted all perfumes from database',
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
