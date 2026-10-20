import { resolve } from "node:path"

import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "electron-vite"

// The renderer imports the template straight from the repo source.
const repo = resolve(__dirname, "../..")

export default defineConfig({
  main: {
    build: { externalizeDeps: true },
  },
  preload: {
    build: { externalizeDeps: true },
  },
  renderer: {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: [
        { find: /^@paneui\/ui\/icons$/, replacement: resolve(repo, "packages/ui/src/icons/index.tsx") },
        { find: "@paneui/ui", replacement: resolve(repo, "packages/ui/src") },
        { find: "@paneui/core", replacement: resolve(repo, "packages/core/src") },
        { find: "@", replacement: resolve(repo, "apps/docs") },
      ],
      // One copy of React for the app and the template (both resolve to the repo's).
      dedupe: ["react", "react-dom"],
    },
    server: { fs: { allow: [repo] } },
    worker: { format: "es" },
    build: { chunkSizeWarningLimit: 8000 },
  },
})
