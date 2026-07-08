"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/produkte", label: "Produkte" },
  { href: "/nischen", label: "Nischen" },
  { href: "/store-planer", label: "Store-Planer" },
  { href: "/videos", label: "Werbevideos" },
  { href: "/studio", label: "KI-Studio" },
  { href: "/wissen", label: "Schweiz-Wissen" },
];

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

  // Menü schliessen, wenn die Seite wechselt
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-card/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-[0_2px_12px_rgba(16,29,49,0.08)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-swiss text-base font-black text-white">
            +
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            {SITE.name}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active ? "bg-accent-soft text-accent-deep" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-line md:hidden"
        >
          <span className="text-lg">{open ? "✕" : "☰"}</span>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-card md:hidden">
          <div className="container-page flex flex-col py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-ink hover:bg-paper"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
