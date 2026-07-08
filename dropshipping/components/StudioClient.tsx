"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProduct } from "@/data/products";
import { SCRIPT_STYLES } from "@/data/videos";
import { buildScenePrompt, getAiScenes } from "@/lib/aiPrompt";

type Phase = "idle" | "submitting" | "queued" | "processing" | "done" | "error";

const PHASE_TEXT: Record<Phase, string> = {
  idle: "",
  submitting: "Auftrag wird an die Video-KI übergeben …",
  queued: "In der Warteschlange der Video-KI … (das kann 1–2 Minuten dauern)",
  processing: "Die KI erstellt dein Video … (noch ca. 1–3 Minuten)",
  done: "Fertig! 🎉",
  error: "",
};

export default function StudioClient() {
  const searchParams = useSearchParams();
  const produktSlug = searchParams.get("produkt");
  const stilParam = searchParams.get("stil");

  const product = produktSlug ? getProduct(produktSlug) : undefined;
  const styleId = SCRIPT_STYLES.some((s) => s.id === stilParam) ? (stilParam as string) : "problem-loesung";

  const scenes = useMemo(() => {
    if (!product) return null;
    return getAiScenes(styleId, product.name, product.short.replace(/\.$/, ""));
  }, [product, styleId]);

  const [sceneIndex, setSceneIndex] = useState(0);
  const [code, setCode] = useState("");
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState<"5" | "10">("5");
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videos, setVideos] = useState<{ label: string; url: string }[]>([]);
  const stopPolling = useRef(false);

  // Zugangscode aus der Sitzung wiederverwenden (nur im Browser-Tab gespeichert)
  useEffect(() => {
    const saved = sessionStorage.getItem("studio-code");
    if (saved) setCode(saved);
  }, []);

  // Prompt vorbefüllen, wenn ein Produkt/eine Szene gewählt ist
  useEffect(() => {
    if (scenes) setPrompt(buildScenePrompt(scenes[sceneIndex]));
  }, [scenes, sceneIndex]);

  useEffect(() => {
    return () => {
      stopPolling.current = true;
    };
  }, []);

  async function createVideo() {
    setError(null);
    setVideoUrl(null);
    setPhase("submitting");
    sessionStorage.setItem("studio-code", code);
    stopPolling.current = false;

    try {
      const submitRes = await fetch("/api/studio/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, prompt, duration }),
      });
      const submitData = await submitRes.json();
      if (!submitRes.ok) {
        throw new Error(submitData.error ?? "Der Auftrag konnte nicht gestartet werden.");
      }

      setPhase("queued");
      const requestId: string = submitData.requestId;

      // Alle 6 Sekunden nachfragen, bis das Video fertig ist (max. ~10 Minuten)
      for (let i = 0; i < 100; i++) {
        if (stopPolling.current) return;
        await new Promise((r) => setTimeout(r, 6000));
        const statusRes = await fetch("/api/studio/status", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code, requestId }),
        });
        const statusData = await statusRes.json();
        if (!statusRes.ok) {
          throw new Error(statusData.error ?? "Statusabfrage fehlgeschlagen.");
        }
        if (statusData.status === "COMPLETED" && statusData.videoUrl) {
          setVideoUrl(statusData.videoUrl);
          setVideos((v) => [
            { label: scenes ? `Szene ${sceneIndex + 1}` : `Video ${v.length + 1}`, url: statusData.videoUrl },
            ...v,
          ]);
          setPhase("done");
          return;
        }
        if (statusData.status === "FAILED") {
          throw new Error(statusData.error ?? "Die KI konnte das Video nicht erstellen.");
        }
        setPhase(statusData.status === "IN_PROGRESS" ? "processing" : "queued");
      }
      throw new Error("Zeitüberschreitung – das Video dauert ungewöhnlich lange. Bitte später erneut versuchen.");
    } catch (e) {
      setPhase("error");
      setError(e instanceof Error ? e.message : "Unbekannter Fehler – bitte erneut versuchen.");
    }
  }

  const busy = phase === "submitting" || phase === "queued" || phase === "processing";

  return (
    <div>
      {/* Produkt-/Szenen-Auswahl */}
      {product && scenes ? (
        <div className="card mb-6">
          <p className="text-sm font-semibold text-muted">
            Drehbuch geladen für: <span className="text-ink">{product.emoji} {product.name}</span>
          </p>
          <p className="mt-1 text-xs text-muted">
            Video-KIs erstellen 5–10-Sekunden-Szenen. Erstelle die Szenen einzeln und füge
            sie danach in CapCut (gratis) mit Text und Musik zusammen – fertig ist dein Werbevideo.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {scenes.map((s, i) => (
              <button
                key={s.description}
                type="button"
                onClick={() => setSceneIndex(i)}
                className={`chip ${i === sceneIndex ? "chip-active" : ""}`}
              >
                Szene {i + 1} · ~{s.seconds} Sek.
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="card mb-6 text-sm text-muted">
          Tipp: Wähle zuerst im{" "}
          <Link href="/videos" className="font-semibold text-accent-deep hover:underline">
            Werbevideo-Studio
          </Link>{" "}
          ein Produkt und einen Stil – dann werden die Szenen-Prompts hier automatisch
          vorbereitet. Du kannst unten aber auch frei beschreiben, was die KI filmen soll.
        </div>
      )}

      {/* Eingaben */}
      <div className="card">
        <label htmlFor="studio-prompt" className="field-label">
          1. Was soll die KI filmen? (Prompt, auf Englisch am wirksamsten)
        </label>
        <textarea
          id="studio-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={6}
          placeholder='z. B. "One continuous shot: a golden retriever wearing a glowing LED collar on an evening walk, smartphone footage, natural look"'
          className="field-input font-mono !text-xs leading-relaxed"
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <span className="field-label">2. Länge der Szene</span>
            <div className="flex gap-2">
              {(["5", "10"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`chip !px-4 !py-2 ${duration === d ? "chip-active" : ""}`}
                >
                  {d} Sekunden
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted">
              Grobe Kosten über dein fal.ai-Guthaben: ca. $0.25 (5 Sek.) bzw. $0.50 (10 Sek.) pro Szene.
            </p>
          </div>
          <div>
            <label htmlFor="studio-code" className="field-label">
              3. Dein Zugangscode
            </label>
            <input
              id="studio-code"
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Zugangscode"
              className="field-input"
            />
            <p className="mt-2 text-xs text-muted">
              Schützt dein Guthaben – nur wer den Code kennt, kann Videos erstellen.
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={busy || prompt.trim().length < 10 || code.length === 0}
          onClick={createVideo}
          className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy ? "⏳ Video wird erstellt …" : "🎬 Video jetzt erstellen"}
        </button>

        {busy && (
          <div className="mt-4 rounded-xl bg-accent-soft p-4 text-sm font-semibold text-accent-deep">
            {PHASE_TEXT[phase]}
            <span className="mt-1 block text-xs font-normal">
              Du kannst das Fenster offen lassen – das Video erscheint hier automatisch.
            </span>
          </div>
        )}

        {error && (
          <div className="mt-4 rounded-xl bg-swiss-soft p-4 text-sm leading-relaxed text-swiss">
            {error}
          </div>
        )}
      </div>

      {/* Ergebnis */}
      {videoUrl && (
        <div className="card mt-6 border-t-4 border-t-accent">
          <h2 className="font-display text-xl font-bold">✅ Dein Video ist fertig</h2>
          <video
            src={videoUrl}
            controls
            playsInline
            className="mt-4 max-h-[480px] rounded-xl bg-navy"
          />
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              ⬇️ Video öffnen / herunterladen
            </a>
            {scenes && sceneIndex < scenes.length - 1 && (
              <button
                type="button"
                onClick={() => setSceneIndex((i) => i + 1)}
                className="btn-secondary"
              >
                → Nächste Szene vorbereiten
              </button>
            )}
          </div>
          <p className="mt-3 text-xs text-muted">
            Wichtig: Lade das Video gleich herunter – die Links des KI-Dienstes sind nicht
            unbegrenzt gültig. Danach in CapCut: Szenen aneinanderreihen, Untertitel und
            Trend-Sound dazu, posten.
          </p>
        </div>
      )}

      {/* Bisher erstellte Szenen in dieser Sitzung */}
      {videos.length > 1 && (
        <div className="card mt-6">
          <h3 className="font-display text-lg font-bold">Deine Szenen aus dieser Sitzung</h3>
          <ul className="mt-2 space-y-1 text-sm">
            {videos.map((v, i) => (
              <li key={`${v.url}-${i}`}>
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent-deep hover:underline">
                  {v.label} öffnen ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
