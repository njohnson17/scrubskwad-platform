import type { MetadataRoute } from "next";
import { listSeoPages } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://scrubskwad.cleaning";
  const staticRoutes = ["", "/booking", "/reviews", "/journal", "/social"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
  const seoPages = await listSeoPages().catch(() => []);
  return [
    ...staticRoutes,
    ...seoPages.map((page) => ({
      url: `${baseUrl}/${page.service_slug}/${page.location_slug}`,
      lastModified: new Date(page.updated_at ?? page.created_at)
    }))
  ];
}
