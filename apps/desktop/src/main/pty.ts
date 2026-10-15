import * as os from "node:os"
import * as path from "node:path"

import type { WebContents } from "electron"
import * as nodePty from "node-pty"

/** The user's login shell. */
export function userShell() {
  if (process.platform === "win32") return process.env.COMSPEC?.toLowerCase().includes("powershell") ? process.env.COMSPEC : "powershell.exe"
  return process.env.SHELL || (process.platform === "darwin" ? "/bin/zsh" : "/bin/bash")
}

export const shellName = () => path.basename(userShell()).replace(/\.exe$/i, "")

/** Real shells, one per terminal, owned by the window that asked for them. */
export class Ptys {
  private ptys = new Map<string, nodePty.IPty>()

  constructor(private contents: WebContents) {}

  spawn(id: string, opts: { cwd: string | null; cols: number; rows: number }) {
    if (this.ptys.has(id)) return
    const shell = userShell()
    const pty = nodePty.spawn(shell, process.platform === "win32" ? [] : ["-l"], {
      name: "xterm-256color",
      cols: Math.max(2, opts.cols | 0),
      rows: Math.max(1, opts.rows | 0),
      cwd: opts.cwd ?? os.homedir(),
      env: { ...process.env, TERM: "xterm-256color", COLORTERM: "truecolor" } as Record<string, string>,
    })
    this.ptys.set(id, pty)
    pty.onData((data) => !this.contents.isDestroyed() && this.contents.send("pty:data", id, data))
    pty.onExit(({ exitCode }) => {
      this.ptys.delete(id)
      if (!this.contents.isDestroyed()) this.contents.send("pty:exit", id, exitCode)
    })
  }

  write(id: string, data: string) {
    this.ptys.get(id)?.write(data)
  }

  resize(id: string, cols: number, rows: number) {
    try {
      this.ptys.get(id)?.resize(Math.max(2, cols | 0), Math.max(1, rows | 0))
    } catch {
      /* the shell already exited */
    }
  }

  kill(id: string) {
    const pty = this.ptys.get(id)
    this.ptys.delete(id)
    try {
      pty?.kill()
    } catch {
      /* already gone */
    }
  }

  killAll() {
    for (const id of [...this.ptys.keys()]) this.kill(id)
  }
}
