// Runs a TypeScript/TSX script with the repo's `@/` alias: node scripts/run-tsx.mjs <file.tsx>
import { fileURLToPath } from "node:url"
import path from "node:path"
import { createJiti } from "jiti"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const jiti = createJiti(import.meta.url, { jsx: { runtime: "automatic" }, alias: { "@": root }, fsCache: false })
await jiti.import(path.resolve(process.argv[2]))
