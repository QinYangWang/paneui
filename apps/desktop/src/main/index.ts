import { join } from "node:path"

import { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme, shell, type IpcMainEvent, type IpcMainInvokeEvent, type MenuItemConstructorOptions } from "electron"

import type { HostCommand } from "../shared/bridge"
import { Folder } from "./folder"
import { Ptys, shellName } from "./pty"

const isMac = process.platform === "darwin"
/** The window band colour (`--shell`) in each theme, so the first frame and the window controls match the page. */
const SHELL = { light: { color: "#f7f7f7", symbolColor: "#0a0a0a" }, dark: { color: "#171717", symbolColor: "#fafafa" } }
const TITLE_BAR_HEIGHT = 36

let win: BrowserWindow | null = null
let folder: Folder | null = null
let ptys: Ptys | null = null

const send = (command: HostCommand) => win?.webContents.send("menu:command", command)

function createWindow() {
  const theme = nativeTheme.shouldUseDarkColors ? "dark" : "light"
  win = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 720,
    minHeight: 480,
    show: false,
    backgroundColor: SHELL[theme].color,
    // macOS: traffic lights inset over the page's own title bar. Elsewhere: native controls drawn over it.
    ...(isMac
      ? { titleBarStyle: "hiddenInset" as const, trafficLightPosition: { x: 14, y: 12 } }
      : { titleBarStyle: "hidden" as const, titleBarOverlay: { ...SHELL[theme], height: TITLE_BAR_HEIGHT } }),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true,
      spellcheck: false,
    },
  })
  ptys = new Ptys(win.webContents)

  win.once("ready-to-show", () => win?.show())
  win.on("closed", () => {
    ptys?.killAll()
    folder?.close()
    folder = null
    ptys = null
    win = null
  })

  // Links open in the browser; the window itself never navigates away.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//.test(url)) void shell.openExternal(url)
    return { action: "deny" }
  })
  win.webContents.on("will-navigate", (e, url) => {
    if (url !== win?.webContents.getURL()) e.preventDefault()
  })

  if (!app.isPackaged && process.env.ELECTRON_RENDERER_URL) void win.loadURL(process.env.ELECTRON_RENDERER_URL)
  else void win.loadFile(join(__dirname, "../renderer/index.html"))
}

/* ---------------------------------- IPC ---------------------------------- */

/** Only the app's own window may call in. */
function trusted(e: IpcMainInvokeEvent | IpcMainEvent) {
  return !!win && e.sender === win.webContents
}

function handle<A extends unknown[], R>(channel: string, fn: (...args: A) => R | Promise<R>) {
  ipcMain.handle(channel, (e, ...args) => {
    if (!trusted(e)) throw new Error("Untrusted sender")
    return fn(...(args as A))
  })
}

function listen<A extends unknown[]>(channel: string, fn: (...args: A) => void) {
  ipcMain.on(channel, (e, ...args) => {
    if (trusted(e)) fn(...(args as A))
  })
}

const open = () => {
  if (!folder) throw new Error("No folder is open")
  return folder
}
const str = (v: unknown) => {
  if (typeof v !== "string") throw new Error("Expected a string")
  return v
}

handle("folder:open", async () => {
  if (!win) return null
  const res = await dialog.showOpenDialog(win, { title: "Open Folder", properties: ["openDirectory", "createDirectory"] })
  const dir = res.canceled ? undefined : res.filePaths[0]
  if (!dir) return null
  const next = new Folder(dir)
  const data = await next.read()
  folder?.close()
  folder = next
  folder.watch((changes) => win?.webContents.send("fs:changes", changes))
  win.setTitle(data.name)
  app.addRecentDocument(dir)
  return data
})
handle("folder:close", () => {
  folder?.close()
  folder = null
  win?.setTitle(app.getName())
})
handle("fs:write", (p: unknown, content: unknown) => open().writeFile(str(p), str(content)))
handle("fs:mkdir", (p: unknown) => open().mkdir(str(p)))
handle("fs:rm", (p: unknown) => open().rm(str(p)))
handle("fs:rename", (a: unknown, b: unknown) => open().rename(str(a), str(b)))

handle("pty:spawn", (id: unknown, opts: { cwd: string | null; cols: number; rows: number }) => {
  // A terminal in the open folder starts there; otherwise in the home folder.
  const cwd = folder && typeof opts?.cwd === "string" ? folder.resolve(opts.cwd) : null
  ptys?.spawn(str(id), { cwd, cols: Number(opts?.cols) || 80, rows: Number(opts?.rows) || 24 })
  return shellName()
})
listen("pty:write", (id: unknown, data: unknown) => ptys?.write(str(id), str(data)))
listen("pty:resize", (id: unknown, cols: unknown, rows: unknown) => ptys?.resize(str(id), Number(cols), Number(rows)))
listen("pty:kill", (id: unknown) => ptys?.kill(str(id)))

ipcMain.on("theme:system", (e) => {
  e.returnValue = nativeTheme.shouldUseDarkColors
})
nativeTheme.on("updated", () => win?.webContents.send("theme:system", nativeTheme.shouldUseDarkColors))

ipcMain.on("shell:name", (e) => {
  e.returnValue = shellName()
})

listen("theme:set", (theme: unknown) => {
  if (!win || (theme !== "light" && theme !== "dark")) return
  win.setBackgroundColor(SHELL[theme].color)
  if (!isMac) win.setTitleBarOverlay({ ...SHELL[theme], height: TITLE_BAR_HEIGHT })
})

/* ---------------------------------- menu --------------------------------- */

/** Shortcuts the page already handles are shown in the menu but not registered, so they fire once. */
const shown = (accelerator: string) => ({ accelerator, registerAccelerator: false })

function buildMenu() {
  const template: MenuItemConstructorOptions[] = [
    ...(isMac ? [{ role: "appMenu" as const }] : []),
    {
      label: "File",
      submenu: [
        { label: "New File…", click: () => send("new-file") },
        { label: "New Folder…", click: () => send("new-folder") },
        { type: "separator" },
        { label: "Open Folder…", accelerator: "CmdOrCtrl+O", click: () => send("open-folder") },
        { label: "Close Folder", click: () => send("close-folder") },
        { type: "separator" },
        { label: "Save", ...shown("CmdOrCtrl+S"), click: () => send("save") },
        { label: "Save All", ...shown("Alt+CmdOrCtrl+S"), click: () => send("save-all") },
        { type: "separator" },
        isMac ? { role: "close" } : { role: "quit" },
      ],
    },
    { role: "editMenu" },
    {
      label: "View",
      submenu: [
        { label: "Command Palette…", ...shown("Shift+CmdOrCtrl+P"), click: () => send("commands") },
        { label: "Go to File…", ...shown("CmdOrCtrl+P"), click: () => send("files") },
        { type: "separator" },
        { label: "Toggle Sidebar", ...shown("CmdOrCtrl+B"), click: () => send("toggle-sidebar") },
        { label: "Toggle Panel", ...shown("CmdOrCtrl+J"), click: () => send("toggle-panel") },
        { label: "New Terminal", ...shown("Ctrl+Shift+`"), click: () => send("new-terminal") },
        { type: "separator" },
        { role: "reload" },
        { role: "toggleDevTools" },
        { type: "separator" },
        { role: "resetZoom" },
        { role: "zoomIn" },
        { role: "zoomOut" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    { role: "windowMenu" },
  ]
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

/* -------------------------------- lifecycle ------------------------------ */

app.whenReady().then(() => {
  buildMenu()
  createWindow()
  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (!isMac) app.quit()
})

// No other windows, webviews or remote content.
app.on("web-contents-created", (_e, contents) => {
  contents.on("will-attach-webview", (e) => e.preventDefault())
})
