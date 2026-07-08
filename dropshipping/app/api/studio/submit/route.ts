import { NextResponse } from "next/server";
import { FAL_MODEL, getStudioConfig } from "@/lib/studioServer";

/**
 * Nimmt einen Video-Auftrag entgegen und reicht ihn an fal.ai weiter.
 * Antwortet sofort mit einer Auftrags-ID; der Fortschritt wird über
 * /api/studio/status abgefragt (Videos brauchen 1–5 Minuten).
 */
export async function POST(req: Request) {
  const { falKey, accessCode, configured } = getStudioConfig();

  if (!configured) {
    return NextResponse.json(
      {
        configured: false,
        error:
          "Das KI-Studio ist noch nicht aktiviert. Dazu müssen in Vercel die Variablen FAL_KEY (Schlüssel von fal.ai) und STUDIO_ZUGANGSCODE (dein Passwort) gesetzt werden – die Anleitung steht auf dieser Seite unten.",
      },
      { status: 503 }
    );
  }

  let body: { code?: string; prompt?: string; duration?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!body.code || body.code !== accessCode) {
    return NextResponse.json(
      { error: "Zugangscode falsch. Bitte prüfe deine Eingabe." },
      { status: 401 }
    );
  }

  const prompt = (body.prompt ?? "").trim();
  if (prompt.length < 10 || prompt.length > 4000) {
    return NextResponse.json(
      { error: "Bitte gib eine Video-Beschreibung (Prompt) mit mindestens 10 Zeichen ein." },
      { status: 400 }
    );
  }

  const duration = body.duration === "10" ? "10" : "5";

  try {
    const falRes = await fetch(`https://queue.fal.run/${FAL_MODEL}`, {
      method: "POST",
      headers: {
        Authorization: `Key ${falKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        duration,
        aspect_ratio: "9:16",
        negative_prompt: "blur, distortion, low quality, watermark, text, logo",
      }),
    });

    const data = (await falRes.json().catch(() => ({}))) as Record<string, unknown>;

    if (!falRes.ok) {
      const detail =
        typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail ?? data);
      const hint =
        falRes.status === 401 || falRes.status === 403
          ? "Der FAL_KEY scheint ungültig zu sein – bitte in Vercel prüfen."
          : falRes.status === 402
            ? "Das fal.ai-Guthaben ist aufgebraucht – bitte auf fal.ai aufladen."
            : "Der KI-Dienst hat den Auftrag abgelehnt.";
      return NextResponse.json(
        { error: `${hint} (Technische Meldung: ${detail})` },
        { status: 502 }
      );
    }

    const requestId = data.request_id;
    if (typeof requestId !== "string" || requestId.length === 0) {
      return NextResponse.json(
        { error: "Der KI-Dienst hat keine Auftrags-ID zurückgegeben – bitte erneut versuchen." },
        { status: 502 }
      );
    }

    return NextResponse.json({ requestId });
  } catch {
    return NextResponse.json(
      { error: "Der KI-Dienst ist gerade nicht erreichbar – bitte in einer Minute erneut versuchen." },
      { status: 502 }
    );
  }
}
