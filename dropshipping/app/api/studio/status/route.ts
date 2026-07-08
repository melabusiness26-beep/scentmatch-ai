import { NextResponse } from "next/server";
import {
  FAL_APP_ROOT,
  extractVideoUrl,
  getStudioConfig,
  isValidRequestId,
} from "@/lib/studioServer";

/**
 * Fragt den Stand eines Video-Auftrags bei fal.ai ab.
 * Liefert bei Fertigstellung die Video-URL zurück.
 */
export async function POST(req: Request) {
  const { falKey, accessCode, configured } = getStudioConfig();

  if (!configured) {
    return NextResponse.json({ error: "Das KI-Studio ist noch nicht aktiviert." }, { status: 503 });
  }

  let body: { code?: string; requestId?: string } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  if (!body.code || body.code !== accessCode) {
    return NextResponse.json({ error: "Zugangscode falsch." }, { status: 401 });
  }

  if (!isValidRequestId(body.requestId)) {
    return NextResponse.json({ error: "Ungültige Auftrags-ID." }, { status: 400 });
  }

  const headers = { Authorization: `Key ${falKey}` };

  try {
    const statusRes = await fetch(
      `https://queue.fal.run/${FAL_APP_ROOT}/requests/${body.requestId}/status`,
      { headers, cache: "no-store" }
    );
    const statusData = (await statusRes.json().catch(() => ({}))) as Record<string, unknown>;

    if (!statusRes.ok) {
      return NextResponse.json(
        { error: "Statusabfrage fehlgeschlagen – bitte erneut versuchen." },
        { status: 502 }
      );
    }

    const status = typeof statusData.status === "string" ? statusData.status : "UNKNOWN";

    if (status !== "COMPLETED") {
      // IN_QUEUE oder IN_PROGRESS: einfach weiter warten
      return NextResponse.json({ status });
    }

    // Fertig → Ergebnis (Video-URL) abholen
    const resultRes = await fetch(
      `https://queue.fal.run/${FAL_APP_ROOT}/requests/${body.requestId}`,
      { headers, cache: "no-store" }
    );
    const resultData = (await resultRes.json().catch(() => ({}))) as unknown;

    if (!resultRes.ok) {
      return NextResponse.json(
        { error: "Das Video ist fertig, konnte aber nicht abgeholt werden – bitte erneut versuchen." },
        { status: 502 }
      );
    }

    const videoUrl = extractVideoUrl(resultData);
    if (!videoUrl) {
      return NextResponse.json(
        {
          status: "FAILED",
          error:
            "Die KI hat kein Video geliefert (möglicherweise wurde der Prompt vom Dienst abgelehnt). Bitte formuliere den Prompt leicht um und versuche es nochmal.",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ status: "COMPLETED", videoUrl });
  } catch {
    return NextResponse.json(
      { error: "Der KI-Dienst ist gerade nicht erreichbar – bitte erneut versuchen." },
      { status: 502 }
    );
  }
}
