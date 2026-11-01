import { createClient } from '@supabase/supabase-js';

import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './supabase-config';

export { isSupabaseConfigured };

// Fallback-Werte verhindern, dass createClient beim Build crasht,
// wenn die Umgebungsvariablen fehlen oder ungültig sind.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'public-anon-placeholder-key'
);
