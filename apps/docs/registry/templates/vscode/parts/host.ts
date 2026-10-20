import type { TerminalTransport } from "@paneui/ui/components/terminal"

/** A folder read from disk. Paths are relative to its root, `/`-separated. */
export type HostFolder = {
  name: string
  files: Record<string, string>
  dirs: string[]
  /** Files left out (too large, binary, or past the file limit). */
  skipped: number
}

/** Writes to the open folder. Paths are relative to its root. */
export interface HostFs {
  writeFile(path: string, content: string): Promise<void>
  mkdir(path: string): Promise<void>
  rm(path: string): Promise<void>
  rename(from: string, to: string): Promise<void>
}

/** A change made on disk by something else (another editor, a build, git). */
export type HostChange = { type: "write"; path: string; content: string } | { type: "mkdir"; path: string } | { type: "rm"; path: string }

/** Commands a native menu can send. */
export type HostCommand =
  | "open-folder"
  | "close-folder"
  | "save"
  | "save-all"
  | "new-file"
  | "new-folder"
  | "commands"
  | "files"
  | "toggle-sidebar"
  | "toggle-panel"
  | "new-terminal"

/**
 * What a desktop shell gives the editor. Every member is optional; without a
 * host the editor runs on its in-browser workspace.
 */
export interface VsCodeHost {
  /** Ask for a folder; resolves null when cancelled. */
  openFolder?: () => Promise<HostFolder | null>
  /** Stop working on the open folder. */
  closeFolder?: () => Promise<void> | void
  /** Required with `openFolder`. */
  fs?: HostFs
  /** Changes on disk while a folder is open. Returns an unsubscribe function. */
  onChanges?: (cb: (changes: HostChange[]) => void) => () => void
  /** A real shell for each new terminal. `cwd` is relative to the open folder; null when none is open. */
  terminal?: (opts: { cwd: string | null; folder: boolean }) => TerminalTransport
  /** Shell name shown in terminal titles. */
  shellName?: string
  onCommand?: (cb: (command: HostCommand) => void) => () => void
  /** Draw a title bar that drags the window, with room for the window controls on one side. */
  titleBar?: { controls: "left" | "right" | "none" }
}
