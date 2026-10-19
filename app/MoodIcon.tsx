// Feine Linien-Icons für die Stimmungs-Seite.
// Bewusst im gleichen Stil wie die „Warum Auressa?"-Icons gehalten
// (dünne Konturen, currentColor) – edler und geräteunabhängig als bunte Emoji,
// die auf iPhone/Android/Windows unterschiedlich aussehen.

type Props = { name: string; className?: string };

// Jede Stimmung bekommt ein eigenes, klar erkennbares Symbol.
const PATHS: Record<string, React.ReactNode> = {
  // verwöhnen – warme Tasse (Trost, Gemütlichkeit)
  mug: (
    <>
      <path d="M5 8h11v6.5A3.5 3.5 0 0 1 12.5 18H8.5A3.5 3.5 0 0 1 5 14.5V8Z" />
      <path d="M16 9.5h2A2.25 2.25 0 0 1 18 14h-2" />
      <path d="M8.5 3v2M11.5 3v2" />
    </>
  ),
  // stark fühlen – Schild (Souveränität, Rückhalt)
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.2-3 7.5-7 9-4-1.5-7-4.8-7-9V6l7-3Z" />
      <path d="M9 11.5l2 2 4-4" />
    </>
  ),
  // runterkommen – Blatt (Frische, Durchatmen)
  leaf: (
    <>
      <path d="M20 4C9.5 4.5 5 9 5 15c0 3 2 5 5 5 6 0 10-6 10-16Z" />
      <path d="M6.5 18.5C10 14 14 10 18 7" />
    </>
  ),
  // durchstarten – Blitz (Energie, Schwung)
  bolt: <path d="M12.5 2L5.5 12.5H10.5L9.5 22L18.5 10.5H13L12.5 2Z" />,
  // verliebt – Herz
  heart: (
    <path d="M12 20.5S4 15.5 4 9.6C4 6.7 6.1 4.8 8.6 4.8c1.6 0 2.7.9 3.4 1.8.7-.9 1.8-1.8 3.4-1.8 2.5 0 4.6 1.9 4.6 4.8 0 5.9-8 10.9-8 10.9Z" />
  ),
  // strahlen – funkelnder Stern
  sparkle: <path d="M12 3l1.4 6.1L19.5 10l-6.1 1.4L12 17.5l-1.4-6.1L4.5 10l6.1-1.4L12 3Z" />,
  // Job – Aktenkoffer
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8.5 7V5.5A1.5 1.5 0 0 1 10 4h4a1.5 1.5 0 0 1 1.5 1.5V7" />
      <path d="M3 12.5h18" />
    </>
  ),
  // Urlaub – Sonne
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M2 12h2.2M19.8 12H22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6" />
    </>
  ),
  // Abend – Mond
  moon: <path d="M21 13a8.5 8.5 0 1 1-9.8-8.4A6.6 6.6 0 0 0 21 13Z" />,
  // Geschenk – Geschenkbox
  gift: (
    <>
      <path d="M4 8.5h16v3H4z" />
      <path d="M5.5 11.5V20h13v-8.5" />
      <path d="M12 8.5V20" />
      <path d="M12 8.5S9.6 8.5 8.6 7.3C7.9 6.4 8.5 4.8 9.7 4.8c1.7 0 2.3 2.1 2.3 3.7Z" />
      <path d="M12 8.5s2.4 0 3.4-1.2c.7-.9.1-2.5-1.1-2.5-1.7 0-2.3 2.1-2.3 3.7Z" />
    </>
  )
};

export default function MoodIcon({ name, className }: Props) {
  const path = PATHS[name] || PATHS.sparkle;
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
