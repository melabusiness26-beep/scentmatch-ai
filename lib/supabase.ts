import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// True, sobald in Vercel/Supabase echte Werte hinterlegt sind.
// Solange das nicht der Fall ist, läuft die App im Demo-Modus mit Starter-Düften.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Fallback-Werte verhindern, dass createClient beim Build crasht,
// wenn die Umgebungsvariablen noch nicht gesetzt sind.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'public-anon-placeholder-key'
);
