"use client";

import { useState } from "react";
import type { Game } from "@/lib/types";

/**
 * Cover-Darstellung für ein Spiel.
 *
 * - Ist `coverImage` gesetzt (z. B. echtes Steam-/RAWG-Cover), wird das Bild
 *   gezeigt. Schlägt das Laden fehl, wird automatisch auf das generierte
 *   Farb-Cover zurückgefallen – es gibt also nie ein kaputtes Bild.
 * - Ohne Bild rendert ein elegantes, pro Spiel einzigartiges Gradient-Cover.
 */
export default function CoverArt({
  game,
  className = "",
  rounded = false,
}: {
  game: Game;
  className?: string;
  rounded?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const [c1, c2] = game.accent;
  const radius = rounded ? "0.75rem" : "0";

  // Kandidaten-Kette: Hochformat-Cover → Steam-Header → (sonst Farb-Cover).
  const candidates: string[] = [];
  if (game.coverImage) {
    candidates.push(game.coverImage);
    if (game.coverImage.includes("library_600x900.jpg")) {
      candidates.push(game.coverImage.replace("library_600x900.jpg", "header.jpg"));
    }
  }
  const src = candidates[idx];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={`${game.title} Cover`}
        className={className}
        style={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: radius }}
        loading="lazy"
        onError={() => setIdx((i) => i + 1)}
      />
    );
  }

  const initials = game.title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: radius,
        overflow: "hidden",
        backgroundImage: `linear-gradient(150deg, ${c1} 0%, ${c2} 78%)`,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(60% 50% at 78% 12%, rgba(255,255,255,0.25), transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(80% 80% at 50% 30%, black, transparent)",
        }}
      />
      <span
        style={{
          position: "absolute",
          right: "0.6rem",
          bottom: "-0.4rem",
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: "5.5rem",
          lineHeight: 1,
          color: "rgba(255,255,255,0.16)",
          letterSpacing: "-0.04em",
        }}
      >
        {initials}
      </span>
      <span
        style={{
          position: "absolute",
          left: "0.85rem",
          bottom: "0.85rem",
          fontSize: "0.7rem",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.85)",
        }}
      >
        {game.genres[0]}
      </span>
    </div>
  );
}
