import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { success: false, error: 'Supabase nicht konfiguriert' },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const body = await request.json();

    const {
      originalPerfumeName,
      originalBrandName,
      correctedPerfumeName,
      correctedBrandName,
      confidence,
    } = body;

    // Validierung
    if (!originalPerfumeName || !originalBrandName || !correctedPerfumeName || !correctedBrandName) {
      return NextResponse.json(
        { success: false, error: 'Fehlende erforderliche Felder' },
        { status: 400 }
      );
    }

    // Speichern in scan_corrections Tabelle
    const { data, error } = await supabase
      .from('scan_corrections')
      .insert([
        {
          original_perfume_name: originalPerfumeName,
          original_brand_name: originalBrandName,
          corrected_perfume_name: correctedPerfumeName,
          corrected_brand_name: correctedBrandName,
          confidence_level: confidence || 'medium',
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('[scan-correction] Fehler beim Speichern:', error);
      return NextResponse.json(
        { success: false, error: 'Fehler beim Speichern der Korrektur' },
        { status: 500 }
      );
    }

    console.log('[scan-correction] Korrektur gespeichert:', {
      original: `${originalBrandName} ${originalPerfumeName}`,
      corrected: `${correctedBrandName} ${correctedPerfumeName}`,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[scan-correction] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler' },
      { status: 500 }
    );
  }
}
