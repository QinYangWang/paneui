import type { TerminalTransport } from "@paneui/ui/components/terminal"

import type { DesktopBridge } from "../shared/bridge"

let next = 0

/**
 * A terminal transport over the preload bridge: the main process runs a real
 * shell for it. The shell starts when the terminal first listens, at the
 * terminal's size, so its first prompt is never lost.
 */
export function createIpcTransport(pty: DesktopBridge["pty"], opts: { cwd: string | null }): TerminalTransport {
  const id = `pty-${Date.now().toString(36)}-${++next}`
  const listeners = new Set<(data: string) => void>()
  let size = { cols: 80, rows: 24 }
  let started = false
  let exited = false
  let offData: (() => void) | null = null
  let offExit: (() => void) | null = null
  const emit = (data: string) => listeners.forEach((l) => l(data))

  const start = () => {
    if (started) return
    started = true
    offData = pty.onData((pid, data) => pid === id && emit(data))
    offExit = pty.onExit((pid, code) => {
      if (pid !== id) return
      exited = true
      emit(`\r\n\x1b[2m[Process exited with code ${code}]\x1b[0m\r\n`)
    })
    pty.spawn(id, { cwd: opts.cwd, ...size }).catch((e: unknown) => {
      exited = true
      emit(`\x1b[31mCouldn't start a shell: ${e instanceof Error ? e.message : String(e)}\x1b[0m\r\n`)
    })
  }

  return {
    write(data) {
      if (started && !exited) pty.write(id, data)
    },
    onData(cb) {
      listeners.add(cb)
      // Let the terminal fit itself first, so the shell starts at the right size.
      setTimeout(start, 0)
      return () => {
        listeners.delete(cb)
      }
    },
    resize(cols, rows) {
      size = { cols, rows }
      if (started && !exited) pty.resize(id, cols, rows)
    },
    dispose() {
      offData?.()
      offExit?.()
      listeners.clear()
      if (started && !exited) pty.kill(id)
      exited = true
    },
  }
}
