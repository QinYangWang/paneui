import fs from "node:fs"
import path from "node:path"

// Combine completed static exports without sharing either application's runtime.
export function mergeNativeExport(webDir, nativeDir) {
  if (!fs.existsSync(path.join(webDir, "index.html"))) throw new Error("Build the Web export before merging Native")
  const html = fs.readFileSync(path.join(nativeDir, "index.html"), "utf8")
  let scripts = 0
  for (const match of html.matchAll(/(?:src|href)=["']([^"']+)["']/g)) {
    const value = match[1]
    if (/^(?:https?:|data:|#|\/\/)/.test(value)) continue
    if (!value.startsWith("/native/")) throw new Error(`Native asset must use /native/: ${value}`)
    const relative = decodeURIComponent(value.slice("/native/".length).split(/[?#]/)[0])
    const file = path.resolve(nativeDir, relative)
    if (!file.startsWith(path.resolve(nativeDir) + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error(`Missing Native asset: ${value}`)
    if (/\.js(?:[?#]|$)/.test(value)) scripts++
  }
  if (!scripts) throw new Error("Native export has no local JavaScript bundle")
  const destination = path.join(webDir, "native")
  fs.rmSync(destination, { recursive: true, force: true })
  fs.cpSync(nativeDir, destination, { recursive: true })
  return destination
}
