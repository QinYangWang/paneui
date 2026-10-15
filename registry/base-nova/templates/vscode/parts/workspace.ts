import type { ShellFs } from "@/registry/base-nova/ui/terminal"

import { SEED_DIRS, SEED_FILES } from "./seed"

/** Shell user, home and the folder the explorer shows. */
export const USER = "dev"
export const HOME = `/home/${USER}`
export const ROOT = `${HOME}/tasks-web`
export const ROOT_NAME = "tasks-web"

const STORAGE_KEY = "vscode-template:workspace"
const SYSTEM_DIRS = ["/", "/home", HOME, "/tmp"]

export function normalize(path: string): string {
  const out: string[] = []
  for (const part of path.split("/")) {
    if (!part || part === ".") continue
    if (part === "..") out.pop()
    else out.push(part)
  }
  return `/${out.join("/")}`
}

export function dirname(path: string) {
  const i = path.lastIndexOf("/")
  return i <= 0 ? "/" : path.slice(0, i)
}

export function basename(path: string) {
  return path.slice(path.lastIndexOf("/") + 1)
}

/** Path relative to the workspace root ("" for the root itself). */
export function rel(path: string) {
  return path === ROOT ? "" : path.startsWith(`${ROOT}/`) ? path.slice(ROOT.length + 1) : path
}

export function abs(relative: string) {
  return relative ? normalize(`${ROOT}/${relative}`) : ROOT
}

export function inWorkspace(path: string) {
  return path === ROOT || path.startsWith(`${ROOT}/`)
}

type Saved = { v: 1; files: Record<string, string>; dirs: string[]; baseline: Record<string, string> }

function fsError(code: string, path: string) {
  return Object.assign(new Error(`${code}: ${path}`), { code })
}

/**
 * The workspace file system: one synchronous store shared by the explorer,
 * the editor and every local terminal (it implements the shell's file system
 * interface). Changes under the workspace root persist in localStorage.
 * `baseline` is the last commit, which source control diffs against.
 */
export class Workspace implements ShellFs {
  private files = new Map<string, string>()
  private dirs = new Set<string>()
  private listeners = new Set<() => void>()
  private pending = false
  private saveTimer: ReturnType<typeof setTimeout> | undefined
  baseline: Record<string, string> = {}
  /** Bumps on every change; a cheap snapshot for useSyncExternalStore. */
  version = 0
  /** Whether the state came from storage rather than the seed. */
  restored = false

  constructor() {
    if (!this.load()) this.seed()
  }

  /* ------------------------------ lifecycle ------------------------------- */

  private seed() {
    this.files.clear()
    this.dirs = new Set(SYSTEM_DIRS)
    this.dirs.add(ROOT)
    for (const d of SEED_DIRS) this.mkdir(abs(d))
    for (const [p, content] of Object.entries(SEED_FILES)) this.put(abs(p), content)
    this.baseline = { ...SEED_FILES }
  }

  private load() {
    if (typeof window === "undefined") return false
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Saved | null
      if (!saved || saved.v !== 1) return false
      this.dirs = new Set([...SYSTEM_DIRS, ROOT, ...saved.dirs.map(abs)])
      for (const [p, content] of Object.entries(saved.files)) this.put(abs(p), content)
      this.baseline = saved.baseline
      this.restored = true
      return true
    } catch {
      return false
    }
  }

  private persist() {
    if (typeof window === "undefined") return
    clearTimeout(this.saveTimer)
    this.saveTimer = setTimeout(() => {
      const files: Record<string, string> = {}
      for (const [p, c] of this.files) if (inWorkspace(p)) files[rel(p)] = c
      const dirs = [...this.dirs].filter((d) => d !== ROOT && inWorkspace(d)).map(rel)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: 1, files, dirs, baseline: this.baseline } satisfies Saved))
      } catch {
        /* storage full or blocked: keep working in memory */
      }
    }, 150)
  }

  /** Back to the starter project, and forget the saved copy. */
  reset() {
    this.seed()
    this.restored = false
    this.changed()
  }

  /** Record the current files as the new baseline. */
  commit() {
    this.baseline = Object.fromEntries(this.listFiles().map((p) => [rel(p), this.files.get(p)!]))
    this.changed()
  }

  /** Replace a file's content with its last committed version (or delete it if it is new). */
  discard(path: string) {
    const base = this.baseline[rel(path)]
    if (base === undefined) this.rm(path)
    else this.writeFile(path, base)
  }

  subscribe(cb: () => void) {
    this.listeners.add(cb)
    return () => {
      this.listeners.delete(cb)
    }
  }

  getVersion = () => this.version

  private changed() {
    this.version++
    this.persist()
    // Batch bursts (rm -r, cp -r) into one notification.
    if (this.pending) return
    this.pending = true
    queueMicrotask(() => {
      this.pending = false
      this.listeners.forEach((l) => l())
    })
  }

  /* ------------------------------ file system ------------------------------ */

  private ensureDir(dir: string) {
    let d = dir
    while (!this.dirs.has(d)) {
      this.dirs.add(d)
      d = dirname(d)
    }
  }

  private put(path: string, content: string) {
    this.ensureDir(dirname(path))
    this.files.set(path, content)
  }

  exists(path: string) {
    const p = normalize(path)
    return this.files.has(p) || this.dirs.has(p)
  }

  isDir(path: string) {
    return this.dirs.has(normalize(path))
  }

  readdir(path: string) {
    const p = normalize(path)
    if (!this.dirs.has(p)) throw fsError(this.files.has(p) ? "ENOTDIR" : "ENOENT", p)
    const out: { name: string; dir: boolean }[] = []
    for (const d of this.dirs) if (d !== p && dirname(d) === p) out.push({ name: basename(d), dir: true })
    for (const f of this.files.keys()) if (dirname(f) === p) out.push({ name: basename(f), dir: false })
    return out.sort((a, b) => a.name.localeCompare(b.name))
  }

  readFile(path: string) {
    const p = normalize(path)
    const content = this.files.get(p)
    if (content === undefined) throw fsError(this.dirs.has(p) ? "EISDIR" : "ENOENT", p)
    return content
  }

  writeFile(path: string, content: string) {
    const p = normalize(path)
    if (this.dirs.has(p)) throw fsError("EISDIR", p)
    if (this.files.get(p) === content) return
    this.put(p, content)
    this.changed()
  }

  mkdir(path: string) {
    const p = normalize(path)
    if (this.files.has(p)) throw fsError("EEXIST", p)
    let d = p
    let added = false
    while (!this.dirs.has(d)) {
      this.dirs.add(d)
      added = true
      d = dirname(d)
    }
    if (added) this.changed()
  }

  rm(path: string, opts?: { recursive?: boolean }) {
    const p = normalize(path)
    if (this.files.delete(p)) return this.changed()
    if (!this.dirs.has(p)) throw fsError("ENOENT", p)
    if (p === "/" || p === ROOT) throw fsError("EPERM", p)
    const inside = (x: string) => x.startsWith(`${p}/`)
    const children = [...this.files.keys()].some(inside) || [...this.dirs].some(inside)
    if (children && !opts?.recursive) throw fsError("ENOTEMPTY", p)
    for (const f of [...this.files.keys()]) if (inside(f)) this.files.delete(f)
    for (const d of [...this.dirs]) if (inside(d)) this.dirs.delete(d)
    this.dirs.delete(p)
    this.changed()
  }

  /** Move a file or folder (and everything inside it). */
  rename(from: string, to: string) {
    const a = normalize(from)
    const b = normalize(to)
    if (a === b) return
    if (this.exists(b)) throw fsError("EEXIST", b)
    if (b.startsWith(`${a}/`)) throw fsError("EINVAL", b)
    if (this.files.has(a)) {
      this.put(b, this.files.get(a)!)
      this.files.delete(a)
    } else if (this.dirs.has(a)) {
      const move = (x: string) => b + x.slice(a.length)
      for (const d of [...this.dirs]) if (d === a || d.startsWith(`${a}/`)) {
        this.dirs.delete(d)
        this.dirs.add(move(d))
      }
      for (const [f, c] of [...this.files]) if (f.startsWith(`${a}/`)) {
        this.files.delete(f)
        this.put(move(f), c)
      }
      this.ensureDir(dirname(b))
    } else throw fsError("ENOENT", a)
    this.changed()
  }

  /* ------------------------------- queries -------------------------------- */

  /** Every file under the workspace root, sorted. */
  listFiles() {
    return [...this.files.keys()].filter((p) => p.startsWith(`${ROOT}/`)).sort()
  }

  /** Every folder under the workspace root (not the root itself), sorted. */
  listDirs() {
    return [...this.dirs].filter((p) => p.startsWith(`${ROOT}/`)).sort()
  }

  /** Files that differ from the baseline: modified, added or deleted (relative paths). */
  changes() {
    const out: { path: string; status: "M" | "A" | "D" }[] = []
    const current = new Set<string>()
    for (const p of this.listFiles()) {
      const r = rel(p)
      current.add(r)
      const base = this.baseline[r]
      if (base === undefined) out.push({ path: r, status: "A" })
      else if (base !== this.files.get(p)) out.push({ path: r, status: "M" })
    }
    for (const r of Object.keys(this.baseline)) if (!current.has(r)) out.push({ path: r, status: "D" })
    return out.sort((a, b) => a.path.localeCompare(b.path))
  }
}
