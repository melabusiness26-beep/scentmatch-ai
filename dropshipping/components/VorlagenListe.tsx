"use client";

import { useState } from "react";
import { VORLAGEN } from "@/data/vorlagen";

export default function VorlagenListe() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      // Kopieren nicht möglich – Text bleibt sichtbar und manuell markierbar
    }
  }

  return (
    <div className="space-y-4">
      {VORLAGEN.map((v) => (
        <details key={v.id} className="card group !p-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
            <span>
              <span className="font-display text-base font-bold">
                {v.emoji} {v.titel}
              </span>
              <span className="mt-0.5 block text-sm leading-relaxed text-muted">{v.wann}</span>
            </span>
            <span className="shrink-0 text-accent-deep transition group-open:rotate-45">＋</span>
          </summary>
          <div className="border-t border-line p-5">
            {v.betreff && (
              <p className="mb-2 text-sm">
                <strong>Betreff:</strong> {v.betreff}
              </p>
            )}
            <pre className="whitespace-pre-wrap rounded-xl bg-paper p-4 text-sm leading-relaxed">
              {v.text}
            </pre>
            <button
              type="button"
              onClick={() => copy(v.id, v.betreff ? `Betreff: ${v.betreff}\n\n${v.text}` : v.text)}
              className="btn-primary mt-4 !py-2"
            >
              {copiedId === v.id ? "✓ Kopiert!" : "📋 Vorlage kopieren"}
            </button>
          </div>
        </details>
      ))}
    </div>
  );
}
