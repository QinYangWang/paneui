import { watch, type FSWatcher } from "node:fs"
import * as fs from "node:fs/promises"
import * as path from "node:path"

import type { HostChange, HostFolder } from "../shared/bridge"

/** Folders never read or watched. */
const IGNORED = new Set([".git", "node_modules", ".next", "out", "dist", ".turbo", ".cache"])
/** Largest file loaded into the editor. */
const MAX_FILE = 1024 * 1024
/** Most files loaded from one folder. */
const MAX_FILES = 5000

const toPosix = (p: string) => p.split(path.sep).join("/")
const ignored = (rel: string) => rel.split("/").some((seg) => IGNORED.has(seg))

async function readText(file: string): Promise<string | null> {
  const stat = await fs.stat(file)
  if (!stat.isFile() || stat.size > MAX_FILE) return null
  const buf = await fs.readFile(file)
  // A NUL byte in the first 8 KB means binary.
  if (buf.subarray(0, 8192).includes(0)) return null
  return buf.toString("utf8")
}

/**
 * The open folder: reads it into the editor's shape, resolves the editor's
 * relative paths to real ones (never outside the root), and reports changes
 * made on disk by other programs.
 */
export class Folder {
  private watcher: FSWatcher | null = null
  private pending = new Set<string>()
  private timer: ReturnType<typeof setTimeout> | undefined

  constructor(readonly root: string) {}

  /** A path from the editor, checked to stay inside the root. */
  resolve(rel: string) {
    const full = path.resolve(this.root, rel)
    if (full !== this.root && !full.startsWith(this.root + path.sep)) throw new Error(`Outside the open folder: ${rel}`)
    return full
  }

  async read(): Promise<HostFolder> {
    const files: Record<string, string> = {}
    const dirs: string[] = []
    let count = 0
    let skipped = 0
    const walk = async (dir: string, rel: string) => {
      const entries = await fs.readdir(dir, { withFileTypes: true })
      for (const e of entries) {
        if (IGNORED.has(e.name)) continue
        const r = rel ? `${rel}/${e.name}` : e.name
        const full = path.join(dir, e.name)
        if (e.isDirectory()) {
          dirs.push(r)
          await walk(full, r)
        } else if (e.isFile()) {
          if (count >= MAX_FILES) {
            skipped++
            continue
          }
          const text = await readText(full).catch(() => null)
          if (text === null) skipped++
          else {
            files[r] = text
            count++
          }
        }
      }
    }
    await walk(this.root, "")
    return { name: path.basename(this.root), files, dirs, skipped }
  }

  async writeFile(rel: string, content: string) {
    const full = this.resolve(rel)
    await fs.mkdir(path.dirname(full), { recursive: true })
    await fs.writeFile(full, content, "utf8")
  }

  async mkdir(rel: string) {
    await fs.mkdir(this.resolve(rel), { recursive: true })
  }

  async rm(rel: string) {
    const full = this.resolve(rel)
    if (full === this.root) throw new Error("Can't delete the open folder")
    await fs.rm(full, { recursive: true, force: true })
  }

  async rename(from: string, to: string) {
    const dest = this.resolve(to)
    await fs.mkdir(path.dirname(dest), { recursive: true })
    await fs.rename(this.resolve(from), dest)
  }

  /** Report changes on disk, batched every 150 ms. Echoes of the editor's own writes are harmless: they match. */
  watch(send: (changes: HostChange[]) => void) {
    try {
      this.watcher = watch(this.root, { recursive: true }, (_event, name) => {
        if (!name) return
        const rel = toPosix(name.toString())
        if (ignored(rel)) return
        this.pending.add(rel)
        clearTimeout(this.timer)
        this.timer = setTimeout(() => void this.flush(send), 150)
      })
      this.watcher.on("error", () => this.close())
    } catch {
      /* no recursive watching on this system: changes from outside show when the folder is opened again */
    }
  }

  private async flush(send: (changes: HostChange[]) => void) {
    const rels = [...this.pending]
    this.pending.clear()
    const changes: HostChange[] = []
    for (const rel of rels) {
      const full = this.resolve(rel)
      const stat = await fs.stat(full).catch(() => null)
      if (!stat) changes.push({ type: "rm", path: rel })
      else if (stat.isDirectory()) changes.push({ type: "mkdir", path: rel })
      else {
        const content = await readText(full).catch(() => null)
        if (content !== null) changes.push({ type: "write", path: rel, content })
      }
    }
    if (changes.length) send(changes)
  }

  close() {
    clearTimeout(this.timer)
    this.watcher?.close()
    this.watcher = null
  }
}
