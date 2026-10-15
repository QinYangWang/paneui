import type { Workspace } from "./workspace"

/**
 * Open editor buffers (path → text), next to the saved files in the workspace.
 * A buffer is dirty while it differs from the file on disk. When the file
 * changes on disk (a terminal command) and its buffer is clean, the buffer
 * follows it.
 */
export class Docs {
  private buffers = new Map<string, string>()
  private disk = new Map<string, string | undefined>()
  private listeners = new Set<() => void>()
  version = 0

  constructor(private ws: Workspace) {}

  private read(path: string) {
    return this.ws.exists(path) && !this.ws.isDir(path) ? this.ws.readFile(path) : undefined
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
    this.listeners.forEach((l) => l())
  }

  has(path: string) {
    return this.buffers.has(path)
  }

  get(path: string) {
    return this.buffers.get(path)
  }

  paths() {
    return [...this.buffers.keys()]
  }

  /** Open a buffer on the file's current content (no-op if it is open). */
  open(path: string) {
    if (this.buffers.has(path)) return
    const content = this.read(path) ?? ""
    this.buffers.set(path, content)
    this.disk.set(path, content)
    this.changed()
  }

  close(path: string) {
    if (!this.buffers.delete(path)) return
    this.disk.delete(path)
    this.changed()
  }

  set(path: string, text: string) {
    if (this.buffers.get(path) === text) return
    this.buffers.set(path, text)
    this.changed()
  }

  isDirty(path: string) {
    const text = this.buffers.get(path)
    return text !== undefined && text !== this.read(path)
  }

  dirtyPaths() {
    return this.paths().filter((p) => this.isDirty(p))
  }

  /** Write the buffer to disk. */
  save(path: string) {
    const text = this.buffers.get(path)
    if (text === undefined) return false
    this.ws.writeFile(path, text)
    this.disk.set(path, text)
    this.changed()
    return true
  }

  /** Throw away unsaved edits. */
  revert(path: string) {
    const content = this.read(path)
    if (content === undefined) return
    this.buffers.set(path, content)
    this.disk.set(path, content)
    this.changed()
  }

  /** Follow a rename on disk (a file, or every buffer inside a folder). */
  move(from: string, to: string) {
    for (const p of this.paths()) {
      if (p !== from && !p.startsWith(`${from}/`)) continue
      const next = to + p.slice(from.length)
      this.buffers.set(next, this.buffers.get(p)!)
      this.disk.set(next, this.disk.get(p))
      this.buffers.delete(p)
      this.disk.delete(p)
    }
    this.changed()
  }

  /**
   * Reconcile with disk after the workspace changed. Clean buffers take the new
   * content. Returns the paths whose file disappeared, so their tabs can close
   * (dirty ones stay open; saving brings the file back).
   */
  sync(): string[] {
    const gone: string[] = []
    let touched = false
    for (const [p, text] of this.buffers) {
      const now = this.read(p)
      const before = this.disk.get(p)
      if (now === before) continue
      if (now === undefined) {
        if (text === before) gone.push(p)
      } else if (text === before) {
        this.buffers.set(p, now)
        touched = true
      }
      this.disk.set(p, now)
    }
    if (touched) this.changed()
    return gone
  }

  clear() {
    this.buffers.clear()
    this.disk.clear()
    this.changed()
  }
}
