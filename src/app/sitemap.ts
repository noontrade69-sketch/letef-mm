import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://letef-mm-website.vercel.app", lastModified: new Date() }];
}
