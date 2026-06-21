import Link from "next/link";
import { MOODS } from "@/data/taxonomy";

/** "Find games by mood" – anklickbare Stimmungs-Kacheln. */
export default function MoodGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {MOODS.map((mood) => (
        <Link
          key={mood.value}
          href={`/games?mood=${encodeURIComponent(mood.value)}`}
          className="surface card-hover group flex flex-col gap-1 p-4"
        >
          <span className="text-2xl">{mood.emoji}</span>
          <span className="mt-1 font-display font-semibold">{mood.label}</span>
          <span className="text-xs text-muted">{mood.blurb}</span>
        </Link>
      ))}
    </div>
  );
}
