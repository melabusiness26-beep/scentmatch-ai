"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/site";

/** Sticky Kopfzeile mit Logo, Navigation und Handy-Hamburger. */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü bei Seitenwechsel schließen
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className="sticky top-0 z-50 transition-colors"
      style={{
        backgroundColor: scrolled ? "rgba(7,8,13,0.85)" : "rgba(7,8,13,0.55)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "var(--color-line)" : "transparent"}`,
      }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE.name} Startseite`}>
          <span
            className="grid h-9 w-9 place-items-center rounded-xl text-lg"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--color-accent-2), var(--color-accent))",
              color: "#0a0a12",
              fontWeight: 800,
            }}
            aria-hidden="true"
          >
            ◆
          </span>
          <span className="font-display text-lg font-bold tracking-tight">{SITE.name}</span>
        </Link>

        {/* Desktop-Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/finder" className="btn btn-primary btn-sm ml-2">
            Game Finder
          </Link>
        </nav>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn btn-ghost btn-sm md:hidden"
          aria-expanded={open}
          aria-label="Menü öffnen"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile-Menü */}
      {open && (
        <div className="border-t border-line bg-ink/95 backdrop-blur md:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-fg transition-colors hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/finder" className="btn btn-primary mt-2">
              Game Finder starten
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
