/**
 * Cover-Bilder von der RAWG-API holen (optional).
 *
 * RAWG ist gratis und braucht nur EINEN Schlüssel: RAWG_API_KEY.
 * Ist kein Schlüssel gesetzt, liefert die Funktion `null` – die App nutzt dann
 * automatisch die schönen generierten Farb-Cover. Es geht also nie etwas kaputt.
 *
 * Schlüssel holen: https://rawg.io/apidocs  → kostenlos registrieren.
 * Dann bei Vercel als Environment Variable `RAWG_API_KEY` eintragen.
 */
const RAWG_SEARCH = "https://api.rawg.io/api/games";

/** Sucht das beste Cover-Bild zu einem Spieltitel. Gibt eine Bild-URL oder null. */
export async function fetchCoverFromRawg(title: string): Promise<string | null> {
  const key = process.env.RAWG_API_KEY;
  if (!key) return null;

  try {
    const url =
      `${RAWG_SEARCH}?key=${key}` +
      `&search=${encodeURIComponent(title)}` +
      `&page_size=1&search_precise=true`;

    // Ergebnis 7 Tage cachen – spart API-Aufrufe und hält die Seite schnell.
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 * 7 } });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      results?: { background_image?: string | null }[];
    };
    const img = data.results?.[0]?.background_image;
    return typeof img === "string" && img.length > 0 ? img : null;
  } catch {
    return null;
  }
}
