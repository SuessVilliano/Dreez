import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://dreezz.liv8.co";
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/backstage", "/api/admin"] },
    sitemap: `${base.replace(/\/$/, "")}/sitemap.xml`,
  };
}
