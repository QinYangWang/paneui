import type { HostChange, HostCommand, HostFolder } from "@/registry/base-nova/templates/vscode/parts/host"

export type { HostChange, HostCommand, HostFolder }

/** What the preload script puts on `window.desktop`. */
export interface DesktopBridge {
  platform: string
  /** The user's shell, for terminal titles. */
  shellName: string
  openFolder(): Promise<HostFolder | null>
  closeFolder(): Promise<void>
  fs: {
    writeFile(path: string, content: string): Promise<void>
    mkdir(path: string): Promise<void>
    rm(path: string): Promise<void>
    rename(from: string, to: string): Promise<void>
  }
  onChanges(cb: (changes: HostChange[]) => void): () => void
  pty: {
    /** Starts a shell under `id` (chosen by the caller). Resolves with the shell's name. */
    spawn(id: string, opts: { cwd: string | null; cols: number; rows: number }): Promise<string>
    write(id: string, data: string): void
    resize(id: string, cols: number, rows: number): void
    kill(id: string): void
    onData(cb: (id: string, data: string) => void): () => void
    onExit(cb: (id: string, code: number) => void): () => void
  }
  onCommand(cb: (command: HostCommand) => void): () => void
  /** Whether the system theme is dark right now. */
  systemDark(): boolean
  /** System theme changes. */
  onSystemTheme(cb: (dark: boolean) => void): () => void
  /** Tell the window which theme the page shows (title bar overlay colours). */
  setTheme(theme: "light" | "dark"): void
}
