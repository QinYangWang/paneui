// @ts-check
import { fileURLToPath } from "node:url"

import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"

// Static site served at the domain root. BASE_PATH supports subpath previews.
const basePath = process.env.BASE_PATH || ""
const r = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  site: process.env.SITE_URL || "https://paneui.dev",
  base: basePath || "/",
  outDir: "./out",
  trailingSlash: "always",
  build: { format: "directory", concurrency: 4 },
  integrations: [react()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    define: {
      "process.env.NEXT_PUBLIC_BASE_PATH": JSON.stringify(basePath),
    },
    resolve: {
      alias: [
        // Registry templates are written for Next apps; on this site their Next imports map to small shims.
        { find: /^next\/link$/, replacement: r("./shims/next-link.tsx") },
        { find: /^next\/navigation$/, replacement: r("./shims/next-navigation.tsx") },
        { find: /^next\/dynamic$/, replacement: r("./shims/next-dynamic.tsx") },
        { find: /^server-only$/, replacement: r("./shims/server-only.ts") },
        { find: /^@paneui\/ui\//, replacement: r("../../packages/ui/src/") },
        { find: /^@\//, replacement: r("./") },
      ],
    },
    ssr: { noExternal: [/^@paneui\//] },
  },
})
