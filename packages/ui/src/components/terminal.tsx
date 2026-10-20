"use client"

import * as React from "react"
import type { ITheme, Terminal as Emulator } from "@xterm/xterm"

import { cn } from "@paneui/ui/lib/utils"

/* -------------------------------------------------------------------------- */
/*  Contract                                                                  */
/* -------------------------------------------------------------------------- */

/** A byte stream to a shell. */
export interface TerminalTransport {
  /** Keystrokes and pasted text from the user. */
  write(data: string): void
  /** Output from the shell (may contain ANSI). Returns an unsubscribe function. */
  onData(cb: (data: string) => void): () => void
  resize?(cols: number, rows: number): void
  dispose?(): void
}

export interface TerminalHandle {
  focus(): void
  clear(): void
  fit(): void
  write(data: string): void
}

export interface TerminalProps {
  transport: TerminalTransport
  className?: string
  /** Font size in px. */
  fontSize?: number
  autoFocus?: boolean
  /** Called when the shell sets the window title. */
  onTitleChange?: (title: string) => void
  ref?: React.Ref<TerminalHandle>
}

/** Minimal synchronous file system the local shell works on. */
export interface ShellFs {
  readdir(path: string): { name: string; dir: boolean }[]
  readFile(path: string): string
  writeFile(path: string, content: string): void
  mkdir(path: string): void
  rm(path: string, opts?: { recursive?: boolean }): void
  exists(path: string): boolean
  isDir(path: string): boolean
  subscribe?(cb: () => void): () => void
}

export interface ShellCommandContext {
  args: string[]
  cwd: string
  fs: ShellFs
  /** Writes to stdout (piped or redirected when the command line says so). */
  print: (s: string) => void
  env: Record<string, string>
  /** Piped input, empty when the command is first in a pipeline. */
  stdin: string
}

export type ShellCommand = (ctx: ShellCommandContext) => number | Promise<number>

export interface LocalShellOptions {
  fs: ShellFs
  /** Start directory, also `$HOME`. */
  cwd?: string
  user?: string
  host?: string
  /** Extra commands; they take precedence over the builtins. */
  commands?: Record<string, ShellCommand>
}

/* -------------------------------------------------------------------------- */
/*  Emulator                                                                  */
/* -------------------------------------------------------------------------- */

// Base stylesheet of the emulator, inlined so the item works without a CSS import.
const EMULATOR_CSS = `.xterm{cursor:text;position:relative;user-select:none;-ms-user-select:none;-webkit-user-select:none}.xterm.focus,.xterm:focus{outline:none}.xterm .xterm-helpers{position:absolute;top:0;z-index:5}.xterm .xterm-helper-textarea{padding:0;border:0;margin:0;position:absolute;opacity:0;left:-9999em;top:0;width:0;height:0;z-index:-5;white-space:nowrap;overflow:hidden;resize:none}.xterm .composition-view{background:var(--popover);color:var(--popover-foreground);display:none;position:absolute;white-space:nowrap;z-index:1}.xterm .composition-view.active{display:block}.xterm .xterm-viewport{background-color:#000;overflow-y:scroll;cursor:default;position:absolute;right:0;left:0;top:0;bottom:0}.xterm .xterm-screen{position:relative}.xterm .xterm-screen canvas{position:absolute;left:0;top:0}.xterm-char-measure-element{display:inline-block;visibility:hidden;position:absolute;top:0;left:-9999em;line-height:normal}.xterm.enable-mouse-events{cursor:default}.xterm.xterm-cursor-pointer,.xterm .xterm-cursor-pointer{cursor:pointer}.xterm.column-select.focus{cursor:crosshair}.xterm .xterm-accessibility:not(.debug),.xterm .xterm-message{position:absolute;left:0;top:0;bottom:0;right:0;z-index:10;color:transparent;pointer-events:none}.xterm .xterm-accessibility-tree:not(.debug) *::selection{color:transparent}.xterm .xterm-accessibility-tree{font-family:monospace;user-select:text;white-space:pre}.xterm .xterm-accessibility-tree>div{transform-origin:left;width:fit-content}.xterm .live-region{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}.xterm-dim{opacity:1 !important}.xterm-underline-1{text-decoration:underline}.xterm-underline-2{text-decoration:double underline}.xterm-underline-3{text-decoration:wavy underline}.xterm-underline-4{text-decoration:dotted underline}.xterm-underline-5{text-decoration:dashed underline}.xterm-overline{text-decoration:overline}.xterm-overline.xterm-underline-1{text-decoration:overline underline}.xterm-overline.xterm-underline-2{text-decoration:overline double underline}.xterm-overline.xterm-underline-3{text-decoration:overline wavy underline}.xterm-overline.xterm-underline-4{text-decoration:overline dotted underline}.xterm-overline.xterm-underline-5{text-decoration:overline dashed underline}.xterm-strikethrough{text-decoration:line-through}.xterm-screen .xterm-decoration-container .xterm-decoration{z-index:6;position:absolute}.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer{z-index:7}.xterm-decoration-overview-ruler{z-index:8;position:absolute;top:0;right:0;pointer-events:none}.xterm-decoration-top{z-index:2;position:relative}.xterm .xterm-scrollable-element>.scrollbar{cursor:default}.xterm .xterm-scrollable-element>.scrollbar>.scra{cursor:pointer;font-size:11px !important}.xterm .xterm-scrollable-element>.visible{opacity:1;background:rgba(0,0,0,0);transition:opacity 100ms linear;z-index:11}.xterm .xterm-scrollable-element>.invisible{opacity:0;pointer-events:none}.xterm .xterm-scrollable-element>.invisible.fade{transition:opacity 800ms linear}.xterm .xterm-scrollable-element>.shadow{display:none}.xterm .xterm-scrollable-element>.scrollbar.vertical>.slider{width:6px !important;left:4px !important;border-radius:9999px}`

function injectStyles(doc: Document) {
  if (doc.getElementById("terminal-emulator-css")) return
  const style = doc.createElement("style")
  style.id = "terminal-emulator-css"
  style.textContent = EMULATOR_CSS
  doc.head.appendChild(style)
}

/** ANSI slot → CSS colour expression, mirrors terminal-view's mapping. */
const PALETTE: [keyof ITheme, string][] = [
  ["black", "color-mix(in srgb, var(--foreground) 80%, transparent)"],
  ["red", "var(--destructive)"],
  ["green", "var(--success)"],
  ["yellow", "var(--warning)"],
  ["blue", "var(--primary)"],
  ["magenta", "var(--chart-5)"],
  ["cyan", "var(--chart-7)"],
  ["white", "var(--foreground)"],
  ["brightBlack", "var(--muted-foreground)"],
  ["brightRed", "var(--destructive)"],
  ["brightGreen", "var(--success)"],
  ["brightYellow", "var(--warning)"],
  ["brightBlue", "var(--ring)"],
  ["brightMagenta", "var(--chart-3)"],
  ["brightCyan", "var(--chart-1)"],
  ["brightWhite", "var(--foreground)"],
]

/** Resolves any CSS colour (tokens, oklch, color-mix) to rgba() the canvas renderer understands. */
function readTheme(root: HTMLElement): ITheme {
  const probe = root.ownerDocument.createElement("span")
  probe.style.display = "none"
  root.appendChild(probe)
  const canvas = root.ownerDocument.createElement("canvas")
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  const resolve = (expr: string) => {
    probe.style.color = ""
    probe.style.color = expr
    const css = getComputedStyle(probe).color
    if (!ctx) return css
    ctx.clearRect(0, 0, 1, 1)
    ctx.fillStyle = "#000"
    ctx.fillStyle = css
    ctx.fillRect(0, 0, 1, 1)
    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
    return a === 255 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${(a / 255).toFixed(3)})`
  }
  const cs = getComputedStyle(root)
  const transparent = (c: string) => c === "transparent" || /rgba\(.*,\s*0\)$/.test(c)
  const background = resolve(transparent(cs.backgroundColor) ? "var(--background)" : cs.backgroundColor)
  // Light surfaces get the chart colours pulled toward the foreground so they stay legible.
  const m = background.match(/\d+/g)?.map(Number) ?? [0, 0, 0]
  const light = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255 > 0.5
  const ink = (expr: string) => (light && expr.includes("chart") ? `color-mix(in oklab, ${expr} 62%, var(--foreground))` : expr)
  const theme: ITheme = {
    background,
    foreground: resolve(cs.color),
    cursor: resolve(cs.color),
    cursorAccent: background,
    selectionBackground: resolve("color-mix(in srgb, var(--primary) 24%, transparent)"),
    selectionInactiveBackground: resolve("color-mix(in srgb, var(--foreground) 12%, transparent)"),
    scrollbarSliderBackground: resolve("color-mix(in srgb, var(--foreground) 16%, transparent)"),
    scrollbarSliderHoverBackground: resolve("color-mix(in srgb, var(--foreground) 28%, transparent)"),
    scrollbarSliderActiveBackground: resolve("color-mix(in srgb, var(--foreground) 36%, transparent)"),
  }
  for (const [key, expr] of PALETTE) (theme as Record<string, string>)[key] = resolve(ink(expr))
  probe.remove()
  return theme
}

/**
 * Terminal emulator bound to a transport. Loads the emulator in the browser only,
 * fits its container and follows the theme tokens live.
 */
export function Terminal({ transport, className, fontSize = 12, autoFocus, onTitleChange, ref }: TerminalProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const hostRef = React.useRef<HTMLDivElement>(null)
  const termRef = React.useRef<Emulator | null>(null)
  const fitRef = React.useRef<() => void>(() => {})
  const pending = React.useRef<string[]>([])
  const titleCb = React.useRef(onTitleChange)
  const sizeRef = React.useRef(fontSize)
  const focusRef = React.useRef(autoFocus)

  React.useEffect(() => {
    titleCb.current = onTitleChange
  }, [onTitleChange])

  React.useImperativeHandle(
    ref,
    () => ({
      focus: () => termRef.current?.focus(),
      clear: () => termRef.current?.clear(),
      fit: () => fitRef.current(),
      write: (data: string) => (termRef.current ? termRef.current.write(data) : void pending.current.push(data)),
    }),
    []
  )

  React.useEffect(() => {
    const root = rootRef.current
    const host = hostRef.current
    if (!root || !host) return
    let disposed = false
    const cleanups: (() => void)[] = []

    void (async () => {
      const [{ Terminal: EmulatorClass }, { FitAddon }, { WebLinksAddon }] = await Promise.all([
        import("@xterm/xterm"),
        import("@xterm/addon-fit"),
        import("@xterm/addon-web-links"),
      ])
      if (disposed) return
      injectStyles(root.ownerDocument)
      const term = new EmulatorClass({
        fontSize: sizeRef.current,
        fontFamily: getComputedStyle(root).fontFamily,
        lineHeight: 1.2,
        cursorBlink: true,
        cursorStyle: "block",
        cursorInactiveStyle: "outline",
        scrollback: 5000,
        allowProposedApi: false,
        theme: readTheme(root),
      })
      const fit = new FitAddon()
      term.loadAddon(fit)
      term.loadAddon(new WebLinksAddon())
      term.open(host)
      termRef.current = term
      cleanups.push(() => term.dispose())

      const doFit = () => {
        if (!host.clientWidth || !host.clientHeight) return
        try {
          fit.fit()
        } catch {
          // the host is detached mid-resize
        }
      }
      fitRef.current = doFit
      doFit()

      // Keystrokes ⇄ shell.
      const input = term.onData((d) => transport.write(d))
      const output = transport.onData((d) => term.write(d))
      const resize = term.onResize(({ cols, rows }) => transport.resize?.(cols, rows))
      const title = term.onTitleChange((t) => titleCb.current?.(t))
      transport.resize?.(term.cols, term.rows)
      cleanups.push(() => {
        input.dispose()
        output()
        resize.dispose()
        title.dispose()
      })
      for (const d of pending.current.splice(0)) term.write(d)

      // Fit on container changes, once per frame.
      let frame = 0
      const ro = new ResizeObserver(() => {
        cancelAnimationFrame(frame)
        frame = requestAnimationFrame(doFit)
      })
      ro.observe(host)
      cleanups.push(() => {
        ro.disconnect()
        cancelAnimationFrame(frame)
      })

      // Follow light/dark and accent changes on <html> and the OS scheme.
      const retheme = () => {
        if (!disposed) term.options.theme = readTheme(root)
      }
      const mo = new MutationObserver(() => requestAnimationFrame(retheme))
      mo.observe(root.ownerDocument.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-accent", "data-theme"] })
      const mq = window.matchMedia("(prefers-color-scheme: dark)")
      mq.addEventListener("change", retheme)
      cleanups.push(() => {
        mo.disconnect()
        mq.removeEventListener("change", retheme)
      })

      // Re-measure once the web font has loaded.
      void root.ownerDocument.fonts?.ready.then(() => {
        if (disposed) return
        term.options.fontFamily = getComputedStyle(root).fontFamily
        doFit()
      })

      if (focusRef.current) term.focus()
    })()

    return () => {
      disposed = true
      for (const fn of cleanups.splice(0).reverse()) fn()
      termRef.current = null
      fitRef.current = () => {}
    }
  }, [transport])

  React.useEffect(() => {
    sizeRef.current = fontSize
    const term = termRef.current
    if (!term || term.options.fontSize === fontSize) return
    term.options.fontSize = fontSize
    fitRef.current()
  }, [fontSize])

  return (
    <div
      ref={rootRef}
      data-slot="terminal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault()
          termRef.current?.focus()
        }
      }}
      className={cn("flex min-h-0 min-w-0 flex-col overflow-hidden bg-background py-2 pr-1 pl-3 font-mono text-foreground", className)}
    >
      <div ref={hostRef} data-slot="terminal-viewport" className="min-h-0 min-w-0 flex-1" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Transports                                                                */
/* -------------------------------------------------------------------------- */

/** Fan-out with a backlog, so output written before the view subscribes is kept. */
function createEmitter() {
  const listeners = new Set<(d: string) => void>()
  let backlog: string[] = []
  return {
    emit(d: string) {
      if (!d) return
      if (listeners.size === 0) backlog.push(d)
      else for (const l of listeners) l(d)
    },
    subscribe(cb: (d: string) => void) {
      listeners.add(cb)
      if (backlog.length) {
        const b = backlog
        backlog = []
        for (const d of b) cb(d)
      }
      return () => void listeners.delete(cb)
    },
    get size() {
      return listeners.size
    },
  }
}

/**
 * Connects to the PTY bridge. Data travels as text frames; resizes as
 * `{"type":"resize","cols","rows"}`. Connects on the first subscriber.
 */
export function createWebSocketTransport(url: string): TerminalTransport {
  const out = createEmitter()
  let ws: WebSocket | null = null
  let opened = false
  let disposed = false
  let queue: string[] = []
  let size: { cols: number; rows: number } | null = null
  const decoder = typeof TextDecoder === "undefined" ? null : new TextDecoder()

  const sendResize = () => {
    if (ws && ws.readyState === 1 && size) ws.send(JSON.stringify({ type: "resize", ...size }))
  }

  const connect = () => {
    if (ws || disposed || typeof WebSocket === "undefined") return
    const socket = new WebSocket(url)
    ws = socket
    socket.binaryType = "arraybuffer"
    socket.onopen = () => {
      opened = true
      sendResize()
      for (const d of queue) socket.send(d)
      queue = []
    }
    socket.onmessage = (e) => {
      out.emit(typeof e.data === "string" ? e.data : (decoder?.decode(new Uint8Array(e.data as ArrayBuffer), { stream: true }) ?? ""))
    }
    socket.onclose = (e) => {
      if (disposed) return
      let where = url
      try {
        const u = new URL(url)
        where = `${u.protocol}//${u.host}`
      } catch {}
      out.emit(
        opened
          ? `\r\n\x1b[2m${e.code === 1000 ? "Session ended." : "Connection closed."}\x1b[0m\r\n\x1b[?25l`
          : `\x1b[31mCan't connect to ${where}.\x1b[0m Check that the bridge is running and the token is right.\r\n`
      )
    }
  }

  return {
    write(data) {
      connect()
      if (ws && ws.readyState === 1) ws.send(data)
      else if (!ws || ws.readyState === 0) queue.push(data)
    },
    onData(cb) {
      const off = out.subscribe(cb)
      connect()
      return off
    },
    resize(cols, rows) {
      size = { cols, rows }
      sendResize()
    },
    dispose() {
      disposed = true
      ws?.close()
      ws = null
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Memory file system                                                        */
/* -------------------------------------------------------------------------- */

function fsError(code: string, message: string) {
  return Object.assign(new Error(message), { code })
}

function normalize(path: string) {
  const parts: string[] = []
  for (const seg of path.split("/")) {
    if (!seg || seg === ".") continue
    if (seg === "..") parts.pop()
    else parts.push(seg)
  }
  return "/" + parts.join("/")
}

function dirname(path: string) {
  const n = normalize(path)
  const i = n.lastIndexOf("/")
  return i <= 0 ? "/" : n.slice(0, i)
}

function basename(path: string) {
  const n = normalize(path)
  return n.slice(n.lastIndexOf("/") + 1)
}

/** In-memory file system. Seed keys are paths (a trailing `/` makes an empty directory); parents are implied. */
export function createMemoryFs(seed: Record<string, string> = {}): ShellFs {
  const files = new Map<string, string>()
  const dirs = new Set<string>(["/"])
  const listeners = new Set<() => void>()
  const notify = () => {
    for (const l of listeners) l()
  }
  const mkdirp = (n: string) => {
    let cur = ""
    for (const seg of n.split("/").filter(Boolean)) {
      cur += "/" + seg
      if (files.has(cur)) throw fsError("ENOTDIR", "Not a directory")
      dirs.add(cur)
    }
  }
  for (const [p, content] of Object.entries(seed)) {
    const n = normalize(p)
    if (p.endsWith("/")) mkdirp(n)
    else {
      mkdirp(dirname(n))
      files.set(n, content)
    }
  }
  const under = (n: string) => (n === "/" ? "/" : n + "/")

  return {
    readdir(path) {
      const n = normalize(path)
      if (files.has(n)) throw fsError("ENOTDIR", "Not a directory")
      if (!dirs.has(n)) throw fsError("ENOENT", "No such file or directory")
      const out: { name: string; dir: boolean }[] = []
      for (const d of dirs) if (d !== n && dirname(d) === n) out.push({ name: basename(d), dir: true })
      for (const f of files.keys()) if (dirname(f) === n) out.push({ name: basename(f), dir: false })
      return out.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
    },
    readFile(path) {
      const n = normalize(path)
      if (dirs.has(n)) throw fsError("EISDIR", "Is a directory")
      const c = files.get(n)
      if (c === undefined) throw fsError("ENOENT", "No such file or directory")
      return c
    },
    writeFile(path, content) {
      const n = normalize(path)
      if (dirs.has(n)) throw fsError("EISDIR", "Is a directory")
      if (!dirs.has(dirname(n))) throw fsError("ENOENT", "No such file or directory")
      files.set(n, content)
      notify()
    },
    mkdir(path) {
      const n = normalize(path)
      if (files.has(n)) throw fsError("EEXIST", "File exists")
      mkdirp(n)
      notify()
    },
    rm(path, opts) {
      const n = normalize(path)
      if (files.delete(n)) return notify()
      if (!dirs.has(n)) throw fsError("ENOENT", "No such file or directory")
      const prefix = under(n)
      const inside = [...dirs].some((d) => d !== n && d.startsWith(prefix)) || [...files.keys()].some((f) => f.startsWith(prefix))
      if (inside && !opts?.recursive) throw fsError("ENOTEMPTY", "Directory not empty")
      for (const d of [...dirs]) if (d.startsWith(prefix)) dirs.delete(d)
      for (const f of [...files.keys()]) if (f.startsWith(prefix)) files.delete(f)
      if (n !== "/") dirs.delete(n)
      notify()
    },
    exists(path) {
      const n = normalize(path)
      return dirs.has(n) || files.has(n)
    },
    isDir(path) {
      return dirs.has(normalize(path))
    },
    subscribe(cb) {
      listeners.add(cb)
      return () => void listeners.delete(cb)
    },
  }
}

/* -------------------------------------------------------------------------- */
/*  Local shell                                                               */
/* -------------------------------------------------------------------------- */

const ESC = "\x1b["
const ANSI = /\x1b(?:\[[0-9;?]*[ -/]*[@-~]|\][^\x07\x1b]*(?:\x07|\x1b\\)|[@-Z\\-_])/g
const bold = (s: string) => `${ESC}1m${s}${ESC}22m`
const blue = (s: string) => `${ESC}1;34m${s}${ESC}0m`
const red = (s: string) => `${ESC}1;31m${s}${ESC}0m`
const dim = (s: string) => `${ESC}2m${s}${ESC}22m`

/** Display width of one code point in cells. */
function charWidth(cp: number) {
  if (cp === 0 || (cp >= 0x300 && cp <= 0x36f) || (cp >= 0x200b && cp <= 0x200f) || (cp >= 0xfe00 && cp <= 0xfe0f)) return 0
  if (
    (cp >= 0x1100 && cp <= 0x115f) ||
    (cp >= 0x2e80 && cp <= 0xa4cf && cp !== 0x303f) ||
    (cp >= 0xac00 && cp <= 0xd7a3) ||
    (cp >= 0xf900 && cp <= 0xfaff) ||
    (cp >= 0xfe30 && cp <= 0xfe4f) ||
    (cp >= 0xff00 && cp <= 0xff60) ||
    (cp >= 0xffe0 && cp <= 0xffe6) ||
    (cp >= 0x1f300 && cp <= 0x1f64f) ||
    (cp >= 0x1f900 && cp <= 0x1f9ff) ||
    (cp >= 0x20000 && cp <= 0x3fffd)
  )
    return 2
  return 1
}

function textWidth(s: string) {
  let w = 0
  for (const ch of s.replace(ANSI, "")) w += charWidth(ch.codePointAt(0)!)
  return w
}

/** Lays names out in columns, top to bottom then left to right. */
function columns(items: { text: string; width: number }[], cols: number) {
  if (!items.length) return ""
  const colWidth = Math.max(...items.map((i) => i.width)) + 2
  const perRow = Math.max(1, Math.floor(cols / colWidth))
  const rows = Math.ceil(items.length / perRow)
  const lines: string[] = []
  for (let r = 0; r < rows; r++) {
    let line = ""
    for (let c = 0; c < perRow; c++) {
      const it = items[c * rows + r]
      if (!it) continue
      const last = c === perRow - 1 || (c + 1) * rows + r >= items.length
      line += it.text + (last ? "" : " ".repeat(colWidth - it.width))
    }
    lines.push(line)
  }
  return lines.join("\n") + "\n"
}

/** One character of a word; `v` marks a variable expanded when the command runs. */
type Ch = { c: string; wild: boolean; v?: string }
type Token = { type: "word"; chars: Ch[] } | { type: "op"; op: string }
type Redirect = { op: ">" | ">>" | "<"; target: Ch[] }
type Command = { words: Ch[][]; redirects: Redirect[] }
type Pipeline = { commands: Command[]; join: "&&" | "||" | ";" }

class ParseError extends Error {}

/** Splits a command line into words and operators. Variables stay as markers until the command runs. */
function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let chars: Ch[] | null = null
  let i = 0
  const push = (c: string, wild = false) => {
    chars ??= []
    for (const ch of c) chars.push({ c: ch, wild })
  }
  const end = () => {
    if (chars) tokens.push({ type: "word", chars })
    chars = null
  }
  const variable = () => {
    // at line[i] === "$"
    const rest = line.slice(i + 1)
    let m: RegExpMatchArray | null
    if ((m = rest.match(/^\{([A-Za-z_][A-Za-z0-9_]*)\}/)) || (m = rest.match(/^([A-Za-z_][A-Za-z0-9_]*|\?|\$|#)/))) {
      i += m[0].length + 1
      chars ??= []
      chars.push({ c: "", wild: false, v: m[1] })
    } else {
      i++
      push("$")
    }
  }
  let commandStart = true
  while (i < line.length) {
    const c = line[i]
    if (c === " " || c === "\t") {
      end()
      i++
      continue
    }
    // `js` takes the rest of the line as code, untouched.
    const js = commandStart && !chars ? line.slice(i).match(/^js[ \t]+(\S[\s\S]*)$/) : null
    if (js) {
      tokens.push({ type: "word", chars: [..."js"].map((c) => ({ c, wild: false })) })
      tokens.push({ type: "word", chars: [...js[1]].map((c) => ({ c, wild: false })) })
      break
    }
    const two = line.slice(i, i + 2)
    if (two === "&&" || two === "||" || two === ">>") {
      end()
      commandStart = two !== ">>"
      tokens.push({ type: "op", op: two })
      i += 2
      continue
    }
    if (c === "|" || c === ";" || c === ">" || c === "<") {
      end()
      commandStart = c === "|" || c === ";"
      tokens.push({ type: "op", op: c })
      i++
      continue
    }
    if (c === "#" && !chars) break
    if (!chars) commandStart = false
    if (c === "\\") {
      push(line[i + 1] ?? "")
      i += 2
    } else if (c === "'") {
      const j = line.indexOf("'", i + 1)
      if (j < 0) throw new ParseError("unexpected end of input: missing '")
      push(line.slice(i + 1, j))
      chars ??= []
      i = j + 1
    } else if (c === '"') {
      chars ??= []
      i++
      while (i < line.length && line[i] !== '"') {
        if (line[i] === "\\" && /["\\$`]/.test(line[i + 1] ?? "")) {
          push(line[i + 1])
          i += 2
        } else if (line[i] === "$") variable()
        else push(line[i++])
      }
      if (line[i] !== '"') throw new ParseError('unexpected end of input: missing "')
      i++
    } else if (c === "$") {
      variable()
    } else if (c === "~" && !chars && (line[i + 1] === undefined || /[/\s;|&<>]/.test(line[i + 1]))) {
      chars = [{ c: "", wild: false, v: line[i + 1] === "/" ? "~/" : "HOME" }]
      i++
    } else {
      push(c, c === "*" || c === "?")
      i++
    }
  }
  end()
  return tokens
}

function parse(tokens: Token[]): Pipeline[] {
  const list: Pipeline[] = []
  let commands: Command[] = []
  let cmd: Command = { words: [], redirects: [] }
  const endCommand = (op: string) => {
    if (!cmd.words.length && !cmd.redirects.length) throw new ParseError(`syntax error near unexpected token \`${op}'`)
    commands.push(cmd)
    cmd = { words: [], redirects: [] }
  }
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === "word") cmd.words.push(t.chars)
    else if (t.op === ">" || t.op === ">>" || t.op === "<") {
      const next = tokens[++i]
      if (!next || next.type !== "word") throw new ParseError(`syntax error near unexpected token \`${next?.type === "op" ? next.op : "newline"}'`)
      cmd.redirects.push({ op: t.op, target: next.chars })
    } else if (t.op === "|") endCommand("|")
    else {
      endCommand(t.op)
      list.push({ commands, join: t.op as Pipeline["join"] })
      commands = []
    }
  }
  if (cmd.words.length || cmd.redirects.length) commands.push(cmd)
  else if (commands.length) throw new ParseError("syntax error: unexpected end of input")
  if (commands.length) list.push({ commands, join: ";" })
  return list
}

/** The JS evaluator's value printer. */
function inspect(v: unknown, top = true, seen = new Set<unknown>()): string {
  if (typeof v === "string") return top ? `\x1b[32m'${v}'\x1b[39m` : `'${v}'`
  if (typeof v === "number" || typeof v === "bigint") return `\x1b[33m${String(v)}${typeof v === "bigint" ? "n" : ""}\x1b[39m`
  if (typeof v === "boolean") return `\x1b[33m${v}\x1b[39m`
  if (v === undefined) return dim("undefined")
  if (v === null) return bold("null")
  if (typeof v === "function") return `\x1b[36m[Function: ${v.name || "anonymous"}]\x1b[39m`
  if (typeof v === "symbol") return v.toString()
  if (v instanceof Error) return v.stack ?? String(v)
  if (seen.has(v)) return "[Circular]"
  seen.add(v)
  if (Array.isArray(v)) return `[ ${v.map((x) => inspect(x, false, seen)).join(", ")} ]`.replace("[  ]", "[]")
  if (v instanceof Date) return v.toISOString()
  const entries = Object.entries(v as object).map(([k, x]) => `${/^[A-Za-z_$][\w$]*$/.test(k) ? k : `'${k}'`}: ${inspect(x, false, seen)}`)
  return entries.length ? `{ ${entries.join(", ")} }` : "{}"
}

const ERRNO: Record<string, string> = {
  ENOENT: "No such file or directory",
  ENOTDIR: "Not a directory",
  EISDIR: "Is a directory",
  EEXIST: "File exists",
  ENOTEMPTY: "Directory not empty",
}
const errText = (e: unknown) => {
  const err = e as { code?: string; message?: string }
  return (err.code && ERRNO[err.code]) || err.message || String(e)
}

type Io = {
  args: string[]
  stdin: string
  out: (s: string) => void
  err: (s: string) => void
  tty: boolean
}
type Builtin = (io: Io) => number | Promise<number>

/**
 * A shell that runs in the page on a `ShellFs`: line editing, history, Tab
 * completion, pipes, redirection, `&&` / `||` / `;`, variables and globs.
 */
export function createLocalShell(opts: LocalShellOptions): TerminalTransport {
  const { fs } = opts
  const user = opts.user ?? "user"
  const host = opts.host ?? "localhost"
  const home = normalize(opts.cwd ?? "/")
  const custom = opts.commands ?? {}
  const out = createEmitter()

  let cwd = home
  const env: Record<string, string> = { HOME: home, PWD: home, OLDPWD: home, USER: user, HOSTNAME: host, SHELL: "/bin/sh", TERM: "xterm-256color", PATH: "/usr/local/bin:/usr/bin:/bin", "?": "0" }
  const history: string[] = []
  let hist = 0
  let draft: string[] = []
  let line: string[] = []
  let cursor = 0
  let screen = 0 // where the terminal cursor sits, in cells from the prompt start
  let cols = 80
  let running = false
  let typeahead = ""
  let generation = 0
  let killed = ""
  let started = false

  const emit = (s: string) => out.emit(s.replace(/\r?\n/g, "\r\n"))
  const resolve = (p: string) => normalize(!p ? cwd : p.startsWith("/") ? p : `${cwd}/${p}`)
  const tilde = (p: string) => (home === "/" ? p : p === home ? "~" : home !== "/" && p.startsWith(home + "/") ? "~" + p.slice(home.length) : p)
  const prompt = () => `${ESC}1;32m${user}@${host}${ESC}0m:${ESC}1;34m${tilde(cwd)}${ESC}0m$ `
  const cellAt = (i: number) => textWidth(prompt()) + textWidth(line.slice(0, i).join(""))

  /** Repaints the prompt and the line, then puts the cursor back. */
  const redraw = () => {
    const rows = Math.floor(screen / cols)
    let s = (rows ? `${ESC}${rows}A` : "") + "\r" + `${ESC}J` + prompt() + line.join("")
    const endCell = cellAt(line.length)
    if (endCell > 0 && endCell % cols === 0) s += " \r"
    const target = cellAt(cursor)
    const up = Math.floor(endCell / cols) - Math.floor(target / cols)
    if (up > 0) s += `${ESC}${up}A`
    s += "\r"
    if (target % cols) s += `${ESC}${target % cols}C`
    screen = target
    out.emit(s)
  }

  /** Leaves the edited line: moves below it, without a blank row when it ends exactly on a row edge. */
  const leaveLine = () => {
    cursor = line.length
    redraw()
    const endCell = cellAt(line.length)
    out.emit(endCell > 0 && endCell % cols === 0 ? `\r${ESC}K` : "\r\n")
  }

  const showPrompt = () => {
    line = []
    cursor = 0
    out.emit(`\x1b]0;${user}@${host}: ${tilde(cwd)}\x07` + prompt())
    screen = cellAt(0)
  }

  /* ------------------------------- builtins ------------------------------- */

  const flags = (args: string[], allowed: string) => {
    const set = new Set<string>()
    const rest: string[] = []
    let done = false
    for (const a of args) {
      if (!done && a === "--") done = true
      else if (!done && /^-[A-Za-z]+$/.test(a) && [...a.slice(1)].every((c) => allowed.includes(c))) for (const c of a.slice(1)) set.add(c)
      else rest.push(a)
    }
    return { has: (c: string) => set.has(c), rest }
  }

  const readInputs = (name: string, files: string[], io: Io): { label: string; text: string }[] | null => {
    if (!files.length) return [{ label: "", text: io.stdin }]
    const res: { label: string; text: string }[] = []
    let ok = true
    for (const f of files) {
      try {
        res.push({ label: f, text: fs.readFile(resolve(f)) })
      } catch (e) {
        io.err(`${name}: ${f}: ${errText(e)}\n`)
        ok = false
      }
    }
    return ok || res.length ? res : null
  }

  const splitLines = (t: string) => {
    const l = t.split("\n")
    if (l[l.length - 1] === "") l.pop()
    return l
  }

  const copy = (from: string, to: string) => {
    if (fs.isDir(from)) {
      if (!fs.exists(to)) fs.mkdir(to)
      for (const e of fs.readdir(from)) copy(`${from}/${e.name}`, `${to}/${e.name}`)
    } else fs.writeFile(to, fs.readFile(from))
  }

  const transfer = (name: "mv" | "cp", io: Io) => {
    const { has, rest } = flags(io.args, name === "cp" ? "rRf" : "f")
    if (rest.length < 2) return io.err(`${name}: missing ${rest.length ? "destination" : "file"} operand\n`), 1
    const dest = rest.pop()!
    const destDir = fs.isDir(resolve(dest))
    if (rest.length > 1 && !destDir) return io.err(`${name}: target '${dest}' is not a directory\n`), 1
    let status = 0
    for (const src of rest) {
      const from = resolve(src)
      const to = destDir ? resolve(`${dest}/${basename(from)}`) : resolve(dest)
      try {
        if (!fs.exists(from)) throw Object.assign(new Error(), { code: "ENOENT" })
        if (name === "cp" && fs.isDir(from) && !has("r") && !has("R")) {
          io.err(`cp: -r not specified; omitting directory '${src}'\n`)
          status = 1
          continue
        }
        if (from === to || to.startsWith(from + "/")) {
          io.err(`${name}: cannot ${name === "mv" ? "move" : "copy"} '${src}' into itself\n`)
          status = 1
          continue
        }
        if (fs.exists(to) && fs.isDir(to) !== fs.isDir(from)) throw Object.assign(new Error(), { code: fs.isDir(to) ? "EISDIR" : "ENOTDIR" })
        copy(from, to)
        if (name === "mv") fs.rm(from, { recursive: true })
      } catch (e) {
        io.err(`${name}: '${src}': ${errText(e)}\n`)
        status = 1
      }
    }
    return status
  }

  const headTail = (name: "head" | "tail", io: Io) => {
    let n = 10
    const files: string[] = []
    for (let i = 0; i < io.args.length; i++) {
      const a = io.args[i]
      if (a === "-n") n = Number(io.args[++i])
      else if (/^-n\d+$/.test(a)) n = Number(a.slice(2))
      else if (/^-\d+$/.test(a)) n = Number(a.slice(1))
      else files.push(a)
    }
    if (!Number.isFinite(n)) return io.err(`${name}: invalid number of lines\n`), 1
    const inputs = readInputs(name, files, io)
    if (!inputs) return 1
    inputs.forEach((f, idx) => {
      if (inputs.length > 1) io.out(`${idx ? "\n" : ""}==> ${f.label} <==\n`)
      const l = splitLines(f.text)
      const pick = name === "head" ? l.slice(0, n) : l.slice(Math.max(0, l.length - n))
      if (pick.length) io.out(pick.join("\n") + "\n")
    })
    return 0
  }

  const evaluate = async (code: string, io: Io, printResult: boolean) => {
    const fmt = (a: unknown[]) => a.map((x) => (typeof x === "string" ? x : inspect(x))).join(" ") + "\n"
    const sandboxConsole = {
      log: (...a: unknown[]) => io.out(fmt(a)),
      info: (...a: unknown[]) => io.out(fmt(a)),
      warn: (...a: unknown[]) => io.err(fmt(a)),
      error: (...a: unknown[]) => io.err(fmt(a)),
      dir: (v: unknown) => io.out(inspect(v) + "\n"),
      table: (v: unknown) => io.out(inspect(v) + "\n"),
    }
    const proc = { env: { ...env }, cwd: () => cwd, argv: ["node"], platform: "browser" }
    const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor as new (...a: string[]) => (...a: unknown[]) => Promise<unknown>
    let fn: (...a: unknown[]) => Promise<unknown>
    try {
      fn = new AsyncFunction("console", "fs", "process", `return (${code}\n)`)
    } catch {
      try {
        fn = new AsyncFunction("console", "fs", "process", code)
      } catch (e) {
        io.err(`${(e as Error).name}: ${(e as Error).message}\n`)
        return 1
      }
    }
    try {
      const value = await fn(sandboxConsole, fs, proc)
      if (printResult) io.out(inspect(value) + "\n")
      return 0
    } catch (e) {
      io.err(`Uncaught ${e instanceof Error ? `${e.name}: ${e.message}` : inspect(e)}\n`)
      return 1
    }
  }

  const builtins: Record<string, Builtin> = {
    ls(io) {
      const { has, rest } = flags(io.args, "laA1h")
      const long = has("l")
      const all = has("a")
      const targets = rest.length ? rest : ["."]
      let status = 0
      const fmtName = (name: string, dir: boolean) => (dir && io.tty ? blue(name) : name)
      const fmtEntries = (entries: { name: string; dir: boolean; path: string }[]) => {
        if (long) {
          const sizes = entries.map((e) => (e.dir ? "-" : String(new TextEncoder().encode(fs.readFile(e.path)).length)))
          const w = Math.max(0, ...sizes.map((s) => s.length))
          return entries.map((e, i) => `${e.dir ? "drwxr-xr-x" : "-rw-r--r--"}  ${user}  ${sizes[i].padStart(w)}  ${fmtName(e.name, e.dir)}\n`).join("")
        }
        if (!io.tty) return entries.map((e) => e.name + "\n").join("")
        return columns(entries.map((e) => ({ text: fmtName(e.name, e.dir), width: textWidth(e.name) })), cols)
      }
      const fileArgs: { name: string; dir: boolean; path: string }[] = []
      const dirArgs: string[] = []
      for (const t of targets) {
        const p = resolve(t)
        if (!fs.exists(p)) {
          io.err(`ls: cannot access '${t}': No such file or directory\n`)
          status = 2
        } else if (fs.isDir(p)) dirArgs.push(t)
        else fileArgs.push({ name: t, dir: false, path: p })
      }
      if (fileArgs.length) io.out(fmtEntries(fileArgs))
      dirArgs.forEach((t, i) => {
        const p = resolve(t)
        if (targets.length > 1) io.out(`${i || fileArgs.length ? "\n" : ""}${t}:\n`)
        let entries = fs.readdir(p).map((e) => ({ ...e, path: resolve(`${p}/${e.name}`) }))
        if (!all) entries = entries.filter((e) => !e.name.startsWith("."))
        else entries = [{ name: ".", dir: true, path: p }, { name: "..", dir: true, path: dirname(p) }, ...entries]
        if (long) io.out(`total ${entries.length}\n`)
        io.out(fmtEntries(entries))
      })
      return status
    },
    cd(io) {
      const arg = io.args[0]
      const target = arg === undefined ? home : arg === "-" ? env.OLDPWD : arg
      const p = resolve(target)
      if (!fs.exists(p)) return io.err(`cd: ${arg}: No such file or directory\n`), 1
      if (!fs.isDir(p)) return io.err(`cd: ${arg}: Not a directory\n`), 1
      if (arg === "-") io.out(p + "\n")
      env.OLDPWD = cwd
      cwd = p
      env.PWD = p
      return 0
    },
    pwd(io) {
      io.out(cwd + "\n")
      return 0
    },
    cat(io) {
      const { has, rest } = flags(io.args, "n")
      const inputs = readInputs("cat", rest, io)
      if (!inputs) return 1
      const text = inputs.map((i) => i.text).join("")
      io.out(has("n") ? splitLines(text).map((l, i) => `${String(i + 1).padStart(6)}  ${l}\n`).join("") : text)
      return inputs.length === rest.length || !rest.length ? 0 : 1
    },
    echo(io) {
      let args = io.args
      let newline = true
      let escapes = false
      while (args[0] && /^-[neE]+$/.test(args[0])) {
        if (args[0].includes("n")) newline = false
        if (args[0].includes("e")) escapes = true
        args = args.slice(1)
      }
      let s = args.join(" ")
      if (escapes) s = s.replace(/\\(n|t|e|\\|033)/g, (_, c) => ({ n: "\n", t: "\t", e: "\x1b", "\\": "\\", "033": "\x1b" })[c as "n"])
      io.out(s + (newline ? "\n" : ""))
      return 0
    },
    mkdir(io) {
      const { has, rest } = flags(io.args, "p")
      if (!rest.length) return io.err("mkdir: missing operand\n"), 1
      let status = 0
      for (const d of rest) {
        const p = resolve(d)
        try {
          if (has("p")) {
            let cur = ""
            for (const seg of p.split("/").filter(Boolean)) {
              cur += "/" + seg
              if (!fs.exists(cur)) fs.mkdir(cur)
              else if (!fs.isDir(cur)) throw Object.assign(new Error(), { code: "ENOTDIR" })
            }
          } else {
            if (fs.exists(p)) throw Object.assign(new Error(), { code: "EEXIST" })
            if (!fs.isDir(dirname(p))) throw Object.assign(new Error(), { code: "ENOENT" })
            fs.mkdir(p)
          }
        } catch (e) {
          io.err(`mkdir: cannot create directory '${d}': ${errText(e)}\n`)
          status = 1
        }
      }
      return status
    },
    touch(io) {
      if (!io.args.length) return io.err("touch: missing file operand\n"), 1
      let status = 0
      for (const f of io.args) {
        try {
          if (!fs.exists(resolve(f))) fs.writeFile(resolve(f), "")
        } catch (e) {
          io.err(`touch: cannot touch '${f}': ${errText(e)}\n`)
          status = 1
        }
      }
      return status
    },
    rm(io) {
      const { has, rest } = flags(io.args, "rRf")
      const recursive = has("r") || has("R")
      if (!rest.length) return has("f") ? 0 : (io.err("rm: missing operand\n"), 1)
      let status = 0
      for (const f of rest) {
        const p = resolve(f)
        if (p === "/") {
          io.err("rm: refusing to remove '/'\n")
          status = 1
        } else if (!fs.exists(p)) {
          if (!has("f")) {
            io.err(`rm: cannot remove '${f}': No such file or directory\n`)
            status = 1
          }
        } else if (fs.isDir(p) && !recursive) {
          io.err(`rm: cannot remove '${f}': Is a directory\n`)
          status = 1
        } else {
          try {
            fs.rm(p, { recursive })
            if (cwd === p || cwd.startsWith(p + "/")) cwd = env.PWD = dirname(p)
          } catch (e) {
            io.err(`rm: cannot remove '${f}': ${errText(e)}\n`)
            status = 1
          }
        }
      }
      return status
    },
    mv: (io) => transfer("mv", io),
    cp: (io) => transfer("cp", io),
    head: (io) => headTail("head", io),
    tail: (io) => headTail("tail", io),
    wc(io) {
      const { has, rest } = flags(io.args, "lwc")
      const pick = has("l") || has("w") || has("c") ? ["l", "w", "c"].filter(has) : ["l", "w", "c"]
      const inputs = readInputs("wc", rest, io)
      if (!inputs) return 1
      const count = (t: string) => ({ l: (t.match(/\n/g) ?? []).length, w: t.split(/\s+/).filter(Boolean).length, c: new TextEncoder().encode(t).length })
      const rows = inputs.map((i) => ({ ...count(i.text), label: i.label }))
      if (rows.length > 1) rows.push({ l: 0, w: 0, c: 0, label: "total", ...Object.fromEntries(pick.map((k) => [k, rows.reduce((s, r) => s + r[k as "l"], 0)])) })
      const w = Math.max(...rows.flatMap((r) => pick.map((k) => String(r[k as "l"]).length)))
      for (const r of rows) io.out(pick.map((k) => String(r[k as "l"]).padStart(rows.length > 1 || pick.length > 1 ? Math.max(w, 3) : 0)).join(" ") + (r.label ? ` ${r.label}` : "") + "\n")
      return 0
    },
    grep(io) {
      const { has, rest } = flags(io.args, "invcrlE")
      const [pattern, ...files] = rest
      if (pattern === undefined) return io.err("usage: grep [-icnvrl] pattern [file ...]\n"), 2
      let re: RegExp
      try {
        re = new RegExp(pattern, has("i") ? "gi" : "g")
      } catch {
        re = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), has("i") ? "gi" : "g")
      }
      const targets: string[] = []
      const walk = (label: string) => {
        const p = resolve(label)
        if (fs.isDir(p)) {
          if (!has("r")) return io.err(`grep: ${label}: Is a directory\n`)
          for (const e of fs.readdir(p)) walk(label.replace(/\/$/, "") + "/" + e.name)
        } else targets.push(label)
      }
      for (const f of files.length ? files : has("r") ? ["."] : []) walk(f)
      const inputs = files.length || has("r") ? readInputs("grep", targets, io) : [{ label: "", text: io.stdin }]
      if (!inputs) return 2
      const prefix = inputs.length > 1 || has("r")
      let found = 0
      for (const f of inputs) {
        let n = 0
        splitLines(f.text).forEach((l, i) => {
          re.lastIndex = 0
          if (re.test(l) === has("v")) return
          n++
          if (has("c") || has("l")) return
          const shown = io.tty && !has("v") ? l.replace(re, (m) => red(m)) : l
          io.out(`${prefix ? (io.tty ? `${ESC}35m${f.label}${ESC}0m:` : `${f.label}:`) : ""}${has("n") ? (io.tty ? `${ESC}32m${i + 1}${ESC}0m:` : `${i + 1}:`) : ""}${shown}\n`)
        })
        if (has("c")) io.out(`${prefix ? `${f.label}:` : ""}${n}\n`)
        else if (has("l") && n) io.out(f.label + "\n")
        found += n
      }
      return found ? 0 : 1
    },
    sort(io) {
      const { has, rest } = flags(io.args, "rnu")
      const inputs = readInputs("sort", rest, io)
      if (!inputs) return 1
      let l = inputs.flatMap((i) => splitLines(i.text))
      l.sort(has("n") ? (a, b) => parseFloat(a) - parseFloat(b) : (a, b) => a.localeCompare(b))
      if (has("r")) l.reverse()
      if (has("u")) l = l.filter((x, i) => x !== l[i - 1])
      if (l.length) io.out(l.join("\n") + "\n")
      return 0
    },
    uniq(io) {
      const { has, rest } = flags(io.args, "c")
      const inputs = readInputs("uniq", rest, io)
      if (!inputs) return 1
      const l = inputs.flatMap((i) => splitLines(i.text))
      const groups: [string, number][] = []
      for (const x of l) {
        if (groups.length && groups[groups.length - 1][0] === x) groups[groups.length - 1][1]++
        else groups.push([x, 1])
      }
      io.out(groups.map(([x, n]) => (has("c") ? `${String(n).padStart(7)} ${x}` : x) + "\n").join(""))
      return 0
    },
    clear(io) {
      io.out(`${ESC}H${ESC}2J${ESC}3J`)
      return 0
    },
    history(io) {
      if (io.args[0] === "-c") {
        history.length = 0
        hist = 0
        return 0
      }
      const w = String(history.length).length
      io.out(history.map((h, i) => `  ${String(i + 1).padStart(w)}  ${h}\n`).join(""))
      return 0
    },
    env(io) {
      io.out(
        Object.entries(env)
          .filter(([k]) => k !== "?")
          .sort(([a], [b]) => (a < b ? -1 : 1))
          .map(([k, v]) => `${k}=${v}\n`)
          .join("")
      )
      return 0
    },
    export(io) {
      if (!io.args.length) {
        io.out(
          Object.entries(env)
            .filter(([k]) => k !== "?")
            .map(([k, v]) => `export ${k}="${v}"\n`)
            .join("")
        )
        return 0
      }
      for (const a of io.args) {
        const m = a.match(/^([A-Za-z_][A-Za-z0-9_]*)(?:=([\s\S]*))?$/)
        if (!m) return io.err(`export: '${a}': not a valid identifier\n`), 1
        if (m[2] !== undefined) env[m[1]] = m[2]
        else env[m[1]] ??= ""
      }
      return 0
    },
    unset(io) {
      for (const a of io.args) delete env[a]
      return 0
    },
    which(io) {
      let status = 0
      for (const a of io.args) {
        if (a in custom) io.out(`${a}: custom command\n`)
        else if (a in builtins) io.out(`${a}: shell built-in command\n`)
        else {
          io.err(`${a} not found\n`)
          status = 1
        }
      }
      return status
    },
    help(io) {
      const names = [...new Set([...Object.keys(builtins), ...Object.keys(custom)])].sort()
      io.out(bold("Commands") + "\n" + columns(names.map((n) => ({ text: n, width: n.length })), Math.min(cols, 72)))
      io.out(`\n${bold("Keys")}\n← →  Home End  ↑ ↓ history  Tab completes\nCtrl+A/E start/end  Ctrl+U/K cut  Ctrl+W cut word  Ctrl+Y paste\nCtrl+L clear  Ctrl+C cancel\n`)
      io.out(`\n${bold("Syntax")}\na | b   a > file   a >> file   a < file   a && b   a || b   a; b\n$VAR  export K=V  *.txt  'quoted'  "with $VAR"\n`)
      return 0
    },
    date(io) {
      const d = new Date()
      const tz = new Intl.DateTimeFormat("en-US", { timeZoneName: "short" }).formatToParts(d).find((p) => p.type === "timeZoneName")?.value ?? ""
      const p2 = (n: number) => String(n).padStart(2, "0")
      const day = d.toLocaleDateString("en-US", { weekday: "short" })
      const mon = d.toLocaleDateString("en-US", { month: "short" })
      io.out(`${day} ${mon} ${String(d.getDate()).padStart(2)} ${p2(d.getHours())}:${p2(d.getMinutes())}:${p2(d.getSeconds())} ${tz} ${d.getFullYear()}\n`)
      return 0
    },
    whoami(io) {
      io.out(user + "\n")
      return 0
    },
    hostname(io) {
      io.out(host + "\n")
      return 0
    },
    tree(io) {
      const { has, rest } = flags(io.args, "a")
      const root = rest[0] ?? "."
      const p = resolve(root)
      if (!fs.isDir(p)) return io.err(`tree: ${root}: ${fs.exists(p) ? "Not a directory" : "No such file or directory"}\n`), 1
      let nd = 0
      let nf = 0
      io.out((io.tty ? blue(root) : root) + "\n")
      const walk = (dir: string, pad: string) => {
        const entries = fs.readdir(dir).filter((e) => has("a") || !e.name.startsWith("."))
        entries.forEach((e, i) => {
          const last = i === entries.length - 1
          io.out(`${pad}${last ? "└── " : "├── "}${e.dir && io.tty ? blue(e.name) : e.name}\n`)
          if (e.dir) {
            nd++
            walk(`${dir}/${e.name}`, pad + (last ? "    " : "│   "))
          } else nf++
        })
      }
      walk(p, "")
      io.out(`\n${nd} director${nd === 1 ? "y" : "ies"}, ${nf} file${nf === 1 ? "" : "s"}\n`)
      return 0
    },
    true: () => 0,
    false: () => 1,
    js(io) {
      const code = io.args.length ? io.args.join(" ") : io.stdin
      if (!code.trim()) return io.err("usage: js <expression>\n"), 2
      return evaluate(code, io, true)
    },
    node(io) {
      const [flag, ...rest] = io.args
      if (flag === "-e" || flag === "--eval") return evaluate(rest.join(" "), io, false)
      if (flag === "-p" || flag === "--print") return evaluate(rest.join(" "), io, true)
      if (flag && !flag.startsWith("-")) {
        try {
          return evaluate(fs.readFile(resolve(flag)), io, false)
        } catch (e) {
          return io.err(`node: ${flag}: ${errText(e)}\n`), 1
        }
      }
      if (io.stdin) return evaluate(io.stdin, io, false)
      io.err("usage: node -e <code> | node -p <expression> | node <file>\n")
      return 2
    },
  }

  /* ------------------------------- execution ------------------------------ */

  const glob = (chars: Ch[]): string[] => {
    const word = chars.map((c) => c.c).join("")
    if (!chars.some((c) => c.wild)) return [word]
    // Split into path segments, keeping the wildcard mask.
    const segs: Ch[][] = [[]]
    for (const c of chars) {
      if (c.c === "/") segs.push([])
      else segs[segs.length - 1].push(c)
    }
    const absolute = word.startsWith("/")
    let paths: string[] = [absolute ? "/" : ""]
    segs.forEach((seg, i) => {
      if (!seg.length) return
      const name = seg.map((c) => c.c).join("")
      const last = i === segs.length - 1
      const next: string[] = []
      for (const base of paths) {
        const join = (n: string) => (base === "" ? n : base.endsWith("/") ? base + n : `${base}/${n}`)
        if (!seg.some((c) => c.wild)) {
          if (fs.exists(resolve(join(name)))) next.push(join(name))
          continue
        }
        const re = new RegExp("^" + seg.map((c) => (c.wild ? (c.c === "*" ? "[^/]*" : "[^/]") : c.c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))).join("") + "$")
        let entries: { name: string; dir: boolean }[] = []
        try {
          entries = fs.readdir(resolve(base || "."))
        } catch {}
        for (const e of entries) if (re.test(e.name) && (name.startsWith(".") || !e.name.startsWith(".")) && (last || e.dir)) next.push(join(e.name))
      }
      paths = next
    })
    return paths.length ? paths.sort() : [word]
  }

  const runCommand = async (cmd: Command, stdin: string, toTerminal: boolean, gen: number): Promise<{ status: number; stdout: string }> => {
    const live = () => gen === generation
    const value = (v: string) => (v === "~/" ? (env.HOME === "/" ? "" : (env.HOME ?? "")) : (env[v] ?? ""))
    const expand = (w: Ch[]) => w.flatMap((ch) => (ch.v === undefined ? [ch] : Array.from(value(ch.v), (c) => ({ c, wild: false }))))
    cmd = { words: cmd.words.map(expand), redirects: cmd.redirects.map((r) => ({ ...r, target: expand(r.target) })) }
    const argv = cmd.words.flatMap(glob)
    let captured = ""
    let input = stdin
    let target: Redirect | undefined
    for (const r of cmd.redirects) {
      const path = r.target.map((c) => c.c).join("")
      if (r.op === "<") {
        try {
          input = fs.readFile(resolve(path))
        } catch (e) {
          emit(`sh: ${path}: ${errText(e)}\n`)
          return { status: 1, stdout: "" }
        }
      } else target = r
    }
    const direct = toTerminal && !target
    const io: Io = {
      args: argv.slice(1),
      stdin: input,
      out: (s) => {
        if (!live()) return
        if (direct) emit(s)
        else captured += s
      },
      err: (s) => live() && emit(s),
      tty: direct,
    }
    let status = 0
    // Leading NAME=value words set variables: for the command when one follows, for the shell otherwise.
    const assigns: [string, string][] = []
    while (argv.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(argv[0])) {
      const a = argv.shift()!
      assigns.push([a.slice(0, a.indexOf("=")), a.slice(a.indexOf("=") + 1)])
      io.args = argv.slice(1)
    }
    const saved = argv.length ? assigns.map(([k]) => [k, env[k]] as const) : []
    for (const [k, v] of assigns) env[k] = v
    const name = argv[0]
    if (name !== undefined) {
      const fn = custom[name]
      try {
        if (fn) status = await fn({ args: io.args, cwd, fs, print: io.out, env, stdin: input })
        else if (builtins[name]) status = await builtins[name](io)
        else {
          io.err(`${name}: command not found\n`)
          status = 127
        }
      } catch (e) {
        io.err(`${name}: ${errText(e)}\n`)
        status = 1
      }
    }
    for (const [k, v] of saved) {
      if (v === undefined) delete env[k]
      else env[k] = v
    }
    if (target && live()) {
      const path = target.target.map((c) => c.c).join("")
      try {
        const p = resolve(path)
        const prev = target.op === ">>" && fs.exists(p) ? fs.readFile(p) : ""
        fs.writeFile(p, prev + captured)
      } catch (e) {
        emit(`sh: ${path}: ${errText(e)}\n`)
        status = 1
      }
      captured = ""
    }
    return { status, stdout: captured }
  }

  const execute = async (text: string, gen: number) => {
    let list: Pipeline[]
    try {
      list = parse(tokenize(text))
    } catch (e) {
      if (!(e instanceof ParseError)) throw e
      emit(`sh: ${e.message}\n`)
      env["?"] = "2"
      return
    }
    let status = Number(env["?"])
    let join: Pipeline["join"] = ";"
    for (const p of list) {
      if ((join === "&&" && status !== 0) || (join === "||" && status === 0)) {
        join = p.join
        continue
      }
      let stdin = ""
      for (let i = 0; i < p.commands.length; i++) {
        const r = await runCommand(p.commands[i], stdin, i === p.commands.length - 1, gen)
        if (gen !== generation) return
        stdin = r.stdout
        status = r.status
      }
      env["?"] = String(status)
      join = p.join
    }
  }

  /* ------------------------------ line editor ----------------------------- */

  const submit = async () => {
    const text = line.join("")
    leaveLine()
    if (text.trim() && history[history.length - 1] !== text) history.push(text)
    hist = history.length
    draft = []
    line = []
    cursor = 0
    if (!text.trim()) return showPrompt()
    running = true
    const gen = generation
    try {
      await execute(text, gen)
    } catch (e) {
      if (gen === generation) emit(`sh: ${errText(e)}\n`)
    }
    if (gen !== generation) return
    running = false
    showPrompt()
    const t = typeahead
    typeahead = ""
    if (t) handle(t)
  }

  const interrupt = () => {
    if (running) {
      generation++
      running = false
      typeahead = ""
      out.emit("^C\r\n")
    } else {
      cursor = line.length
      redraw()
      out.emit("^C\r\n")
    }
    env["?"] = "130"
    hist = history.length
    showPrompt()
  }

  const wordStart = (from: number) => {
    let i = from
    while (i > 0 && /\s/.test(line[i - 1])) i--
    while (i > 0 && !/[\s/]/.test(line[i - 1])) i--
    return i
  }
  const wordEnd = (from: number) => {
    let i = from
    while (i < line.length && /[\s/]/.test(line[i])) i++
    while (i < line.length && !/[\s/]/.test(line[i])) i++
    return i
  }

  const insert = (s: string) => {
    const chars = Array.from(s)
    line.splice(cursor, 0, ...chars)
    cursor += chars.length
  }

  const complete = () => {
    const before = line.slice(0, cursor).join("")
    const m = before.match(/(?:^|[\s|;&<>])((?:\\.|[^\s|;&<>])*)$/)
    const word = (m?.[1] ?? "").replace(/\\(.)/g, "$1")
    const head = before.slice(0, before.length - (m?.[1].length ?? 0))
    const commandPosition = /^\s*$|(?:\|\||&&|[|;])\s*$/.test(head)
    const first = head.trim().split(/\s+/).pop()
    let candidates: { name: string; suffix: string; dir: boolean }[]
    let base = word
    if (commandPosition && !word.includes("/")) {
      candidates = [...new Set([...Object.keys(builtins), ...Object.keys(custom)])].filter((n) => n.startsWith(word)).sort().map((name) => ({ name, suffix: " ", dir: false }))
    } else {
      const slash = word.lastIndexOf("/")
      const dirPart = slash >= 0 ? word.slice(0, slash + 1) : ""
      base = word.slice(slash + 1)
      const lookup = dirPart.startsWith("~") ? home + dirPart.slice(1) : dirPart
      let entries: { name: string; dir: boolean }[] = []
      try {
        entries = fs.readdir(resolve(lookup || "."))
      } catch {}
      candidates = entries
        .filter((e) => e.name.startsWith(base) && (base.startsWith(".") || !e.name.startsWith(".")) && (first !== "cd" || e.dir))
        .map((e) => ({ name: e.name, suffix: e.dir ? "/" : " ", dir: e.dir }))
    }
    if (!candidates.length) return
    const esc = (s: string) => s.replace(/([\s\\'"|;&<>$*?])/g, "\\$1")
    if (candidates.length === 1) {
      insert(esc(candidates[0].name.slice(base.length)) + candidates[0].suffix)
      return redraw()
    }
    let common = candidates[0].name
    for (const c of candidates) while (!c.name.startsWith(common)) common = common.slice(0, -1)
    if (common.length > base.length) {
      insert(esc(common.slice(base.length)))
      return redraw()
    }
    const keep = cursor
    leaveLine()
    emit(columns(candidates.map((c) => ({ text: c.dir ? blue(c.name) + "/" : c.name, width: textWidth(c.name) + (c.dir ? 1 : 0) })), cols))
    cursor = keep
    out.emit(prompt())
    screen = cellAt(0)
    redraw()
  }

  const recall = (dir: -1 | 1) => {
    const next = hist + dir
    if (next < 0 || next > history.length) return
    if (hist === history.length) draft = line
    hist = next
    line = next === history.length ? draft : Array.from(history[next])
    cursor = line.length
    redraw()
  }

  const key = (k: string) => {
    switch (k) {
      case "left":
        if (cursor > 0) cursor--
        break
      case "right":
        if (cursor < line.length) cursor++
        break
      case "home":
        cursor = 0
        break
      case "end":
        cursor = line.length
        break
      case "wordLeft":
        cursor = wordStart(cursor)
        break
      case "wordRight":
        cursor = wordEnd(cursor)
        break
      case "backspace":
        if (cursor === 0) return
        line.splice(--cursor, 1)
        break
      case "delete":
        if (cursor >= line.length) return
        line.splice(cursor, 1)
        break
      case "killStart":
        killed = line.splice(0, cursor).join("")
        cursor = 0
        break
      case "killEnd":
        killed = line.splice(cursor).join("")
        break
      case "killWord": {
        const s = wordStart(cursor)
        killed = line.splice(s, cursor - s).join("")
        cursor = s
        break
      }
      case "killWordRight": {
        const e = wordEnd(cursor)
        killed = line.splice(cursor, e - cursor).join("")
        break
      }
      case "yank":
        insert(killed)
        break
      case "clearScreen":
        out.emit(`${ESC}H${ESC}2J`)
        screen = 0
        break
      case "up":
        return recall(-1)
      case "down":
        return recall(1)
    }
    redraw()
  }

  const CSI: Record<string, string> = { A: "up", B: "down", C: "right", D: "left", H: "home", F: "end" }
  const TILDE: Record<string, string> = { "1": "home", "7": "home", "4": "end", "8": "end", "3": "delete" }

  /** Feeds keystrokes (or pasted text) to the line editor. */
  function handle(data: string) {
    if (running) {
      const c = data.indexOf("\x03")
      if (c >= 0) {
        interrupt()
        data = data.slice(c + 1)
      } else {
        typeahead += data
        return
      }
    }
    let i = 0
    while (i < data.length) {
      const ch = data[i]
      if (ch === "\x1b") {
        const m = data.slice(i).match(/^\x1b(?:\[([0-9;]*)([A-Za-z~])|O([A-Za-z])|([\s\S]))?/)!
        i += m[0].length
        if (m[2]) {
          const mod = m[1]?.split(";")[1]
          if (m[2] === "~") {
            const k = TILDE[m[1]?.split(";")[0] ?? ""]
            if (k) key(k)
          } else if ((m[2] === "C" || m[2] === "D") && (mod === "5" || mod === "3")) key(m[2] === "C" ? "wordRight" : "wordLeft")
          else if (CSI[m[2]]) key(CSI[m[2]])
        } else if (m[3] && CSI[m[3]]) key(CSI[m[3]])
        else if (m[4] === "b" || m[4] === "B") key("wordLeft")
        else if (m[4] === "f" || m[4] === "F") key("wordRight")
        else if (m[4] === "d") key("killWordRight")
        else if (m[4] === "\x7f" || m[4] === "\b") key("killWord")
        continue
      }
      i++
      if (ch === "\r" || ch === "\n") {
        if (ch === "\r" && data[i] === "\n") i++
        void submit()
        if (running) {
          typeahead += data.slice(i)
          return
        }
        continue
      }
      const map: Record<string, string> = {
        "\x7f": "backspace",
        "\b": "backspace",
        "\x01": "home",
        "\x05": "end",
        "\x02": "left",
        "\x06": "right",
        "\x15": "killStart",
        "\x0b": "killEnd",
        "\x17": "killWord",
        "\x19": "yank",
        "\x0c": "clearScreen",
        "\x10": "up",
        "\x0e": "down",
      }
      if (map[ch]) key(map[ch])
      else if (ch === "\x03") interrupt()
      else if (ch === "\x04") key("delete")
      else if (ch === "\t") complete()
      else if (ch >= " ") {
        let text = ch
        while (i < data.length && data[i] >= " " && data[i] !== "\x7f") text += data[i++]
        insert(text)
        redraw()
      }
    }
  }

  return {
    write: (data) => handle(data),
    onData(cb) {
      const off = out.subscribe(cb)
      if (!started) {
        started = true
        showPrompt()
      } else if (out.size === 1 && !running) {
        // A new view attached: give it a fresh prompt with the current line.
        out.emit(`\x1b]0;${user}@${host}: ${tilde(cwd)}\x07` + prompt())
        screen = cellAt(0)
        redraw()
      }
      return off
    },
    resize(c) {
      if (c <= 0 || c === cols) return
      // The emulator keeps the edited line's rows as they were; repaint it for the new width.
      const rows = Math.floor(screen / cols)
      cols = c
      if (!started || running) return
      out.emit((rows ? `${ESC}${rows}A` : "") + `\r${ESC}J`)
      screen = 0
      redraw()
    },
    dispose() {
      generation++
    },
  }
}
