import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://dreez.vercel.app").replace(/\/$/, "");
  return [
    { url: base, changeFrequency: "daily", priority: 1 },
    { url: `${base}/story`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/live`, changeFrequency: "daily", priority: 0.9 },
  ];
}
