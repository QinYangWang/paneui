import path from "node:path"
import { fileURLToPath } from "node:url"
import { spawnSync } from "node:child_process"

import { mergeNativeExport } from "./pages-output.mjs"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..")
const result = spawnSync("pnpm", ["native:build"], {
  cwd: root,
  env: { ...process.env, NATIVE_BASE_PATH: "/native" },
  stdio: "inherit",
  shell: process.platform === "win32",
})
if (result.error) throw result.error
if (result.status !== 0) process.exit(result.status ?? 1)
const output = mergeNativeExport(path.join(root, "apps/docs/out"), path.join(root, "apps/native/dist"))
console.log(`Combined Pages export: apps/docs/out (Native: ${path.relative(root, output)}/)`)
