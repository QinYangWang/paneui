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
      alias: { "@": repo },
      // One copy of React for the app and the template (both resolve to the repo's).
      dedupe: ["react", "react-dom"],
    },
    server: { fs: { allow: [repo] } },
    worker: { format: "es" },
    build: { chunkSizeWarningLimit: 8000 },
  },
})
