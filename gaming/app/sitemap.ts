import type { MetadataRoute } from "next";
import { getAllGames } from "@/lib/games";
import { MOODS } from "@/data/taxonomy";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE.url}/games`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE.url}/finder`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];

  const moodRoutes: MetadataRoute.Sitemap = MOODS.map((m) => ({
    url: `${SITE.url}/games?mood=${encodeURIComponent(m.value)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const gameRoutes: MetadataRoute.Sitemap = getAllGames().map((game) => ({
    url: `${SITE.url}/game/${game.slug}`,
    lastModified: new Date(game.releaseDate),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...moodRoutes, ...gameRoutes];
}
