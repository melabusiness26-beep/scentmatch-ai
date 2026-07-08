/**
 * Server-Konfiguration für das KI-Video-Studio.
 *
 * Das Studio nutzt fal.ai als Miet-Dienst für Video-KI (dort laufen Modelle
 * wie Kling). Es entstehen NUR Kosten, wenn wirklich ein Video erstellt wird –
 * bezahlt über das eigene fal.ai-Guthaben.
 *
 * Nötige Umgebungsvariablen (in Vercel unter Settings → Environment Variables):
 * - FAL_KEY: API-Schlüssel von https://fal.ai (Konto → API Keys)
 * - STUDIO_ZUGANGSCODE: selbst gewähltes Passwort, damit nur du Videos
 *   erstellen kannst (sonst könnten Fremde dein Guthaben verbrauchen)
 * - FAL_VIDEO_MODEL (optional): anderes Modell auf fal.ai; Standard ist
 *   Kling 2.1 Standard (gutes Preis-Leistungs-Verhältnis, ca. $0.25 pro 5 Sek.)
 */

export const FAL_MODEL =
  process.env.FAL_VIDEO_MODEL ?? "fal-ai/kling-video/v2.1/standard/text-to-video";

/** Basis-App-ID für Status-/Ergebnis-Abfragen (fal erwartet nur die ersten zwei Segmente). */
export const FAL_APP_ROOT = FAL_MODEL.split("/").slice(0, 2).join("/");

export function getStudioConfig() {
  const falKey = process.env.FAL_KEY ?? "";
  const accessCode = process.env.STUDIO_ZUGANGSCODE ?? "";
  return {
    falKey,
    accessCode,
    configured: falKey.length > 0 && accessCode.length > 0,
  };
}

export function isValidRequestId(id: unknown): id is string {
  return typeof id === "string" && /^[a-zA-Z0-9_-]{8,80}$/.test(id);
}

/** Sucht die Video-URL im fal-Ergebnis – tolerant gegenüber Modell-Unterschieden. */
export function extractVideoUrl(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const obj = data as Record<string, unknown>;
  const video = obj.video as Record<string, unknown> | undefined;
  if (video && typeof video.url === "string") return video.url;
  // Fallback: erste .mp4-URL irgendwo im Ergebnis finden
  const match = JSON.stringify(data).match(/https?:\/\/[^"\\]+\.mp4[^"\\]*/);
  return match ? match[0] : null;
}
