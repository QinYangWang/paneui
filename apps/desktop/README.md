# Desktop code editor

The `vscode` template in a native window. It imports the template from this repo's source, so changes to
`registry/base-nova/templates/vscode` show up here.

- **Folders on disk.** File › Open Folder loads a folder. Saves and explorer changes write to it, and changes made
  elsewhere show up. `node_modules`, `.git` and build folders are skipped, as are binary files and files over 1 MB.
  Without a folder the editor shows the starter project in memory.
- **Real terminals.** Each terminal is your login shell, started in the open folder (your home folder before one is
  open).
- **Offline editor.** The editor and its language workers are bundled.
- **Native window.** Inset window controls on macOS and drawn-over controls elsewhere, a native menu, and the system
  theme.

## Install

Needs Node 22 and pnpm. The app has its own install, separate from the docs site.

```sh
cd apps/desktop
pnpm install
```

`pnpm install` rebuilds the native PTY module for the desktop runtime. Run `pnpm rebuild` after upgrading it. On
Linux the rebuild needs `python3`, `make` and a C++ compiler.

If the desktop runtime download was skipped, fetch it with `node node_modules/electron/install.js`.

## Run

```sh
pnpm dev     # with hot reload
pnpm build   # writes out/
pnpm start   # runs the build
```

`pnpm typecheck` checks the app and the template code it imports.

## How it fits together

| Path | Does |
| --- | --- |
| `src/main/index.ts` | Window, native menu, IPC handlers |
| `src/main/folder.ts` | Reads the open folder, writes inside it only, watches it |
| `src/main/pty.ts` | One shell per terminal |
| `src/preload/index.ts` | The only API the page sees (`window.desktop`) |
| `src/renderer/host.ts` | Turns that API into the template's `host` prop |
| `src/renderer/ipc-transport.ts` | Terminal transport over IPC |
| `src/renderer/monaco.ts` | Points the editor at the bundled copy |

The page runs with context isolation, a sandboxed preload, no Node access and a strict content security policy.
Links open in your browser.

Packaging into an installer isn't set up yet.
