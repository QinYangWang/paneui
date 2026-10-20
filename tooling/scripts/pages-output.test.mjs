import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { test } from "node:test"

import { mergeNativeExport } from "./pages-output.mjs"

function fixture(t, prefix = "/native/") {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "paneui-pages-"))
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }))
  const web = path.join(dir, "web"), native = path.join(dir, "native")
  fs.mkdirSync(web)
  fs.mkdirSync(path.join(native, "_expo"), { recursive: true })
  fs.writeFileSync(path.join(web, "index.html"), "Web home")
  fs.writeFileSync(path.join(web, "404.html"), "Web not found")
  fs.writeFileSync(path.join(native, "_expo/main.js"), "Native runtime")
  fs.writeFileSync(path.join(native, "index.html"), `<script src="${prefix}_expo/main.js"></script>`)
  return { web, native }
}

test("merges Native under its prefix and keeps Web and its 404", (t) => {
  const { web, native } = fixture(t)
  mergeNativeExport(web, native)
  assert.equal(fs.readFileSync(path.join(web, "index.html"), "utf8"), "Web home")
  assert.equal(fs.readFileSync(path.join(web, "404.html"), "utf8"), "Web not found")
  assert.equal(fs.readFileSync(path.join(web, "native/_expo/main.js"), "utf8"), "Native runtime")
  fs.writeFileSync(path.join(web, "native/stale.js"), "old runtime")
  mergeNativeExport(web, native)
  assert.equal(fs.existsSync(path.join(web, "native/stale.js")), false)
})

test("rejects a root-hosted Native export before altering Web output", (t) => {
  const { web, native } = fixture(t, "/")
  assert.throws(() => mergeNativeExport(web, native), /must use \/native\//)
  assert.equal(fs.existsSync(path.join(web, "native")), false)
})

test("rejects missing bundles and requires the Web build", (t) => {
  const { web, native } = fixture(t)
  fs.rmSync(path.join(native, "_expo/main.js"))
  assert.throws(() => mergeNativeExport(web, native), /Missing Native asset/)
  fs.rmSync(path.join(web, "index.html"))
  assert.throws(() => mergeNativeExport(web, native), /Build the Web export/)
})
