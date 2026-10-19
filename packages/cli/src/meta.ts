import { readFileSync } from "node:fs"

/**
 * The CLI's own name and version come from package.json, so renaming the npm package is one
 * field there (plus the `bin` key). The registry namespace below is separate: it is the name in
 * the registry's registry.json and what users register in components.json.
 */
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8")) as {
  name: string
  version: string
}

export const CLI_NAME = pkg.name
export const CLI_VERSION = pkg.version

/** Registry namespace, as used in `@taimatsu/<item>` addresses and components.json `registries`. */
export const NAMESPACE = "@taimatsu"
/** Default registry base: items live at `${base}/<name>.json`, the index at `${base}/registry.json`. */
export const DEFAULT_REGISTRY = "https://qinyangwang.github.io/ui/r"
/** Environment variable that overrides the registry base. */
export const REGISTRY_ENV = "TAIMATSU_REGISTRY"
/** Environment variable that overrides how the shadcn CLI is launched (e.g. "node ./shadcn/dist/index.js"). */
export const SHADCN_ENV = "TAIMATSU_SHADCN"
/** Records what this CLI installed, so `update` can reinstall it. Written next to components.json. */
export const LOCKFILE = "taimatsu.json"

export const DEFAULT_ACCENT = "blue"
export const DEFAULT_ICONS = "icons"
