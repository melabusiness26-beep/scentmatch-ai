"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/** Suchfeld – leitet zur Datenbank-Seite mit ?q=… weiter. */
export default function SearchForm({
  size = "md",
  placeholder = "Spiel, Genre oder Stimmung suchen…",
}: {
  size?: "md" | "lg";
  placeholder?: string;
}) {
  const router = useRouter();
  const [value, setValue] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    router.push(q ? `/games?q=${encodeURIComponent(q)}` : "/games");
  }

  return (
    <form onSubmit={onSubmit} className="relative w-full" role="search">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
        ⌕
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Spiele suchen"
        className="input pl-10"
        style={size === "lg" ? { padding: "1rem 6.5rem 1rem 2.6rem", fontSize: "1.05rem" } : { paddingLeft: "2.6rem", paddingRight: "5.5rem" }}
      />
      <button
        type="submit"
        className="btn btn-primary btn-sm absolute right-2 top-1/2 -translate-y-1/2"
      >
        Suchen
      </button>
    </form>
  );
}
