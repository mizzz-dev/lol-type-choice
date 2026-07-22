import type { MetadataRoute } from "next";
import { buildSiteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: buildSiteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: buildSiteUrl("/diagnosis"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9
    }
  ];
}
