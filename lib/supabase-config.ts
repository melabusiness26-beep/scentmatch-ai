// Nur die Konfiguration – ohne die Datenbank-Bibliothek zu laden.
// So können Browser-Bausteine prüfen, ob Supabase eingerichtet ist, ohne ~230 KB Code zu laden.
export const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
export const supabaseAnonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

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
export const isSupabaseConfigured = isValidHttpUrl(supabaseUrl) && supabaseAnonKey.length > 0;
