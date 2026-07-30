import type { MetadataRoute } from "next";
import { createPublicClient } from "@/lib/supabase/public";

const SITE_URL = "https://beigestates.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const supabase = createPublicClient();
    const { data: properties } = await supabase
      .from("properties")
      .select("id, created_at");

    const propertyPages: MetadataRoute.Sitemap = (properties ?? []).map((p) => ({
      url: `${SITE_URL}/property/${p.id}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    return [...staticPages, ...propertyPages];
  } catch {
    return staticPages;
  }
}
