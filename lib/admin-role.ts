// Admin = Rolle "admin" in den app_metadata (vom Nutzer nicht änderbar, nur
// per SQL / Service-Role setzbar). Eigene Datei ohne Server-Importe, damit
// sie auch in der Admin-Seite im Browser genutzt werden kann.
export function isAdminUser(user: { app_metadata?: Record<string, unknown> } | null | undefined): boolean {
  return user?.app_metadata?.role === 'admin';
}
