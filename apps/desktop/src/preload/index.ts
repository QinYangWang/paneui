import { contextBridge, ipcRenderer, type IpcRendererEvent } from "electron"

import type { DesktopBridge } from "../shared/bridge"

/** Subscribe to a main-process event; returns the unsubscribe function. */
function on<A extends unknown[]>(channel: string, cb: (...args: A) => void) {
  const listener = (_e: IpcRendererEvent, ...args: unknown[]) => cb(...(args as A))
  ipcRenderer.on(channel, listener)
  return () => {
    ipcRenderer.removeListener(channel, listener)
  }
}

// A narrow API: named operations only, never ipcRenderer itself.
const bridge: DesktopBridge = {
  platform: process.platform,
  shellName: String(ipcRenderer.sendSync("shell:name")),
  openFolder: () => ipcRenderer.invoke("folder:open"),
  closeFolder: () => ipcRenderer.invoke("folder:close"),
  fs: {
    writeFile: (path, content) => ipcRenderer.invoke("fs:write", path, content),
    mkdir: (path) => ipcRenderer.invoke("fs:mkdir", path),
    rm: (path) => ipcRenderer.invoke("fs:rm", path),
    rename: (from, to) => ipcRenderer.invoke("fs:rename", from, to),
  },
  onChanges: (cb) => on("fs:changes", cb),
  pty: {
    spawn: (id, opts) => ipcRenderer.invoke("pty:spawn", id, opts),
    write: (id, data) => ipcRenderer.send("pty:write", id, data),
    resize: (id, cols, rows) => ipcRenderer.send("pty:resize", id, cols, rows),
    kill: (id) => ipcRenderer.send("pty:kill", id),
    onData: (cb) => on("pty:data", cb),
    onExit: (cb) => on("pty:exit", cb),
  },
  onCommand: (cb) => on("menu:command", cb),
  systemDark: () => ipcRenderer.sendSync("theme:system") === true,
  onSystemTheme: (cb) => on("theme:system", cb),
  setTheme: (theme) => ipcRenderer.send("theme:set", theme),
}

contextBridge.exposeInMainWorld("desktop", bridge)
