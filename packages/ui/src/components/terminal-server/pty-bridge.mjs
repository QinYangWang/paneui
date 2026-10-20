#!/usr/bin/env node
/**
 * PTY bridge for the Terminal component.
 *
 * Browsers can't start a shell, so this small Node server does it for them:
 *
 *   browser ── WebSocket ──► pty-bridge ── pseudo-terminal ──► $SHELL
 *
 * Protocol, one WebSocket per terminal:
 * - text frames carry raw terminal data both ways (keystrokes in, output out);
 * - a text frame that parses as {"type":"resize","cols":n,"rows":n} resizes the PTY.
 * The socket closes with code 1000 when the shell exits.
 *
 * Usage:
 *   node terminal-server/pty-bridge.mjs [--port 3457] [--host 127.0.0.1] [--token <secret>] [--cwd <dir>] [--shell <path>]
 *
 * Every connection must present the token as ?token=… (printed at start, or
 * PTY_BRIDGE_TOKEN). Anyone holding it can run commands as you, so keep the
 * default 127.0.0.1 binding.
 *
 * Requires Node 18+, `ws` and a PTY binding (`node-pty`); see README.md.
 */
import { randomBytes, timingSafeEqual } from "node:crypto"
import { existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import os from "node:os"
import path from "node:path"
import { WebSocketServer } from "ws"

/* --------------------------------- options -------------------------------- */

function arg(name, fallback) {
  const i = process.argv.indexOf(`--${name}`)
  return i > 0 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}

const PORT = Number(arg("port", process.env.PTY_BRIDGE_PORT ?? 3457))
const HOST = arg("host", process.env.PTY_BRIDGE_HOST ?? "127.0.0.1")
const TOKEN = arg("token", process.env.PTY_BRIDGE_TOKEN ?? randomBytes(12).toString("hex"))
const CWD = path.resolve(arg("cwd", process.env.PTY_BRIDGE_CWD ?? os.homedir()))
const SHELL = arg("shell", process.env.PTY_BRIDGE_SHELL ?? process.env.SHELL ?? (process.platform === "win32" ? "powershell.exe" : "/bin/bash"))
const ORIGINS = (process.env.PTY_BRIDGE_ORIGINS ?? "").split(",").map((s) => s.trim()).filter(Boolean)
const VERBOSE = process.argv.includes("--verbose") || process.env.PTY_BRIDGE_VERBOSE === "1"

if (!existsSync(CWD) || !statSync(CWD).isDirectory()) {
  console.error(`pty-bridge: --cwd ${CWD} is not a directory`)
  process.exit(1)
}

const log = (...a) => VERBOSE && console.error("[pty-bridge]", ...a)

/* ---------------------------------- binding --------------------------------- */

async function loadPty() {
  for (const name of ["node-pty", "@homebridge/node-pty-prebuilt-multiarch"]) {
    try {
      const mod = await import(name)
      return mod.default ?? mod
    } catch (e) {
      log(`${name}: ${e.message}`)
    }
  }
  console.error("pty-bridge: no PTY binding found. Run `npm install node-pty` next to this file (see README.md).")
  process.exit(1)
}

const pty = await loadPty()

/* ---------------------------------- server ---------------------------------- */

function tokenOk(given) {
  const a = Buffer.from(String(given ?? ""))
  const b = Buffer.from(TOKEN)
  return a.length === b.length && timingSafeEqual(a, b)
}

const clamp = (n, lo, hi, d) => (Number.isFinite(n) ? Math.min(hi, Math.max(lo, Math.floor(n))) : d)

const server = createServer((_, res) => {
  res.writeHead(426, { "content-type": "text/plain" })
  res.end("WebSocket only\n")
})
const wss = new WebSocketServer({ noServer: true })

server.on("upgrade", (req, socket, head) => {
  const url = new URL(req.url ?? "/", "http://localhost")
  const origin = req.headers.origin
  if (!tokenOk(url.searchParams.get("token"))) {
    log("rejected: bad token")
    socket.end("HTTP/1.1 401 Unauthorized\r\n\r\n")
    return
  }
  if (ORIGINS.length && origin && !ORIGINS.includes(origin)) {
    log("rejected: origin", origin)
    socket.end("HTTP/1.1 403 Forbidden\r\n\r\n")
    return
  }
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, url))
})

wss.on("connection", (ws, url) => {
  const cols = clamp(Number(url.searchParams.get("cols")), 2, 1000, 80)
  const rows = clamp(Number(url.searchParams.get("rows")), 1, 500, 24)
  const env = { ...process.env, TERM: "xterm-256color", COLORTERM: "truecolor" }
  delete env.PTY_BRIDGE_TOKEN
  let term
  try {
    term = pty.spawn(SHELL, [], { name: "xterm-256color", cols, rows, cwd: CWD, env })
  } catch (e) {
    ws.send(`\r\npty-bridge: can't start ${SHELL}: ${e.message}\r\n`)
    ws.close(1011)
    return
  }
  log(`pid ${term.pid}: ${SHELL} in ${CWD}`)

  // Batch output per tick so fast commands don't send one frame per byte.
  let buffered = ""
  let scheduled = false
  term.onData((d) => {
    buffered += d
    if (scheduled) return
    scheduled = true
    setImmediate(() => {
      scheduled = false
      if (ws.readyState === ws.OPEN && buffered) ws.send(buffered)
      buffered = ""
    })
  })
  term.onExit(({ exitCode }) => {
    log(`pid ${term.pid} exited ${exitCode}`)
    setImmediate(() => ws.close(1000))
  })

  ws.on("message", (raw, isBinary) => {
    const data = raw.toString()
    if (!isBinary && data.startsWith('{"type":')) {
      try {
        const msg = JSON.parse(data)
        if (msg.type === "resize") {
          term.resize(clamp(msg.cols, 2, 1000, 80), clamp(msg.rows, 1, 500, 24))
          return
        }
      } catch {
        // not a control frame: fall through and type it
      }
    }
    term.write(data)
  })
  ws.on("close", () => {
    try {
      term.kill()
    } catch {
      // already gone
    }
  })
})

server.listen(PORT, HOST, () => {
  console.log("PTY bridge ready")
  console.log(`  shell    ${SHELL}`)
  console.log(`  cwd      ${CWD}`)
  console.log(`  address  ws://${HOST}:${PORT}`)
  console.log(`  token    ${TOKEN}`)
  console.log(`  url      ws://${HOST}:${PORT}/?token=${TOKEN}`)
})

for (const sig of ["SIGINT", "SIGTERM"]) process.on(sig, () => process.exit(0))
