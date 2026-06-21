/**
 * Zentrale Seiten-Konfiguration (Name, Navigation, URL).
 * An einer Stelle ändern → wirkt überall.
 */
export const SITE = {
  name: "NexusPlay",
  tagline: "Find your next game",
  description:
    "Entdecke, vergleiche und finde dein nächstes Lieblingsspiel – von alten Klassikern bis zu neuen Releases. Starke Filter, ausführliche Profile und ein smarter Game Finder.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://nexusplay.example",
} as const;

export const NAV_LINKS = [
  { href: "/games", label: "Datenbank" },
  { href: "/finder", label: "Game Finder" },
  { href: "/games?section=new", label: "Neu & Bald" },
  { href: "/games?section=retro", label: "Klassiker" },
] as const;
