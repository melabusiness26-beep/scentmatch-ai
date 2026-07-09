import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { KNOWLEDGE } from "@/data/knowledge";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/start", "/lexikon", "/produkte", "/nischen", "/nischen-quiz", "/rechner", "/store-planer", "/videos", "/vorlagen", "/wissen"].map(
    (path) => ({
      url: `${SITE.url}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })
  );

  const productPages = PRODUCTS.map((p) => ({
    url: `${SITE.url}/produkte/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const articlePages = KNOWLEDGE.map((a) => ({
    url: `${SITE.url}/wissen/${a.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...productPages, ...articlePages];
}
