import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const root = path.dirname(fileURLToPath(import.meta.url));
const cloudflareWorkersShim = path.join(root, "lib/vercel-cloudflare-workers.ts");

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/vercel-cloudflare-workers.ts",
    },
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "cloudflare:workers": cloudflareWorkersShim,
    };
    return config;
  },
};

export default nextConfig;
