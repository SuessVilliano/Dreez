// Vercel runs this Vinext app on Node through Nitro, so Cloudflare's native
// `cloudflare:workers` module is not present there. The alias in vite.config.ts
// points imports at this shim during Vercel builds. String environment values
// remain available (for example ADMIN_EMAILS), while Cloudflare-only bindings
// such as D1 stay undefined until a Vercel-compatible persistence adapter is
// configured.
export const env = new Proxy({} as Record<string, unknown>, {
  get(_target, property) {
    if (typeof property !== "string") return undefined;
    return process.env[property];
  },
  has(_target, property) {
    return typeof property === "string" && property in process.env;
  },
});
