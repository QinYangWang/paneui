import type { NextConfig } from "next"

// Static export for GitHub Pages at the custom domain (paneui.dev), so no base path.
// BASE_PATH stays for a project-pages deploy (e.g. /ui) or local preview.
const basePath = process.env.BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
