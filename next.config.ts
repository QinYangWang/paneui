import type { NextConfig } from "next"

// Static export for GitHub Pages. BASE_PATH is set by the Pages workflow ("/ui");
// leave it empty for a custom domain or local dev.
const basePath = process.env.BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
