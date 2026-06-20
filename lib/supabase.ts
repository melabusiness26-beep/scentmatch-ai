import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

// Prüft, ob der Wert wirklich eine gültige http(s)-URL ist.
function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

// Nur als "konfiguriert" behandeln, wenn die URL wirklich gültig ist UND ein Key vorhanden ist.
// So bringt ein Tippfehler in den Umgebungsvariablen weder den Build noch die Live-Seite zum Absturz –
// die App fällt dann automatisch in den Demo-Modus mit Starter-Düften zurück.
export const isSupabaseConfigured = isValidHttpUrl(supabaseUrl) && supabaseAnonKey.length > 0;

// Fallback-Werte verhindern, dass createClient beim Build crasht,
// wenn die Umgebungsvariablen fehlen oder ungültig sind.
export const supabase = createClient(
  isSupabaseConfigured ? supabaseUrl : 'https://placeholder.supabase.co',
  isSupabaseConfigured ? supabaseAnonKey : 'public-anon-placeholder-key'
);
