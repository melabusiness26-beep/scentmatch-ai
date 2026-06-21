import Link from "next/link";

/** Einheitliche Abschnitts-Überschrift mit optionalem "Alle ansehen"-Link. */
export default function SectionHeading({
  kicker,
  title,
  subtitle,
  href,
  linkLabel = "Alle ansehen",
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        {kicker && <span className="kicker">{kicker}</span>}
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="hidden shrink-0 text-sm font-semibold text-accent-2 hover:underline sm:inline"
        >
          {linkLabel} →
        </Link>
      )}
    </div>
  );
}
