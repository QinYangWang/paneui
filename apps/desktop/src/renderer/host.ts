import type { VsCodeHost } from "@/registry/base-nova/templates/vscode/parts/host"

import type { DesktopBridge } from "../shared/bridge"
import { createIpcTransport } from "./ipc-transport"

/** The editor's host on top of the preload bridge. */
export function createDesktopHost(bridge: DesktopBridge): VsCodeHost {
  return {
    openFolder: () => bridge.openFolder(),
    closeFolder: () => bridge.closeFolder(),
    fs: bridge.fs,
    onChanges: (cb) => bridge.onChanges(cb),
    terminal: ({ cwd }) => createIpcTransport(bridge.pty, { cwd }),
    shellName: bridge.shellName,
    onCommand: (cb) => bridge.onCommand(cb),
    titleBar: { controls: bridge.platform === "darwin" ? "left" : "right" },
  }
}
