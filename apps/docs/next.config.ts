import type { NextConfig } from "next"

// Static export served at the domain root. BASE_PATH supports subpath previews.
const basePath = process.env.BASE_PATH || ""

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@paneui/ui", "@paneui/core", "@paneui/tokens"],
  experimental: { externalDir: true },
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
}

export default nextConfig
