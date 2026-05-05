/** @type {import('next').NextConfig} */

// Webflow Cloud injects these env vars at build time.
// BASE_URL  = the mount path for your environment (e.g. "/" or "/app")
// ASSETS_PREFIX = CDN prefix for static assets
const basePath    = (process.env.BASE_URL    || "").replace(/\/$/, ""); // strip trailing slash
const assetPrefix = (process.env.ASSETS_PREFIX || basePath) || undefined;

const nextConfig = {
  // ── Webflow Cloud routing ────────────────────────────
  basePath,
  assetPrefix,

  // All assets served from /public/assets — no remote patterns needed
};

module.exports = nextConfig;
