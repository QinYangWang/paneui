# Code Editor

> Edit projects and run commands in the browser.

Page: https://paneui.dev/docs/vscode/

## Installation

```bash
npx shadcn@latest add @paneui/vscode
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/vscode.json
```

Packages: `@monaco-editor/react`, `motion`, `simple-icons`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/command-palette`, `@paneui/bottom-sheet`, `@paneui/breadcrumb`, `@paneui/button`, `@paneui/context-menu`, `@paneui/dialog`, `@paneui/drawer`, `@paneui/file-tree`, `@paneui/icon-rail`, `@paneui/input`, `@paneui/loader`, `@paneui/menu`, `@paneui/resizable`, `@paneui/scroll-area`, `@paneui/switch`, `@paneui/tab-strip`, `@paneui/terminal`, `@paneui/textarea`, `@paneui/theme-toggle`, `@paneui/tooltip`, `@paneui/badge`, `@paneui/brand-icon`, `@paneui/action-swap-blur`.

## Usage

```tsx
// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-editor https://paneui.dev/r/vscode.json
// or into an existing one (replaces app/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/vscode.json
import { VsCodeApp } from "@/components/vscode/vscode"
```

```tsx
// app/page.tsx (installed for you: the editor is the home page)
export default function CodeEditorPage() {
  return <VsCodeApp />
}

// Real shells: run the terminal bridge, then open
// http://localhost:3000/?pty=ws://127.0.0.1:3457/?token=…
```

## Composition

```text
VsCodeApp
├── IconRail                    Explorer · Search · Source control · Extensions
├── ResizablePanelGroup
│   ├── sidebar                 Explorer (FileTree + ContextMenu) · SearchView · ScmView · ExtensionsView
│   └── shell-inset panel
│       ├── TabStrip            open files, dirty dots, reorder + close
│       ├── Breadcrumb          folder menus
│       ├── CodeEditor          one editor, a model per workspace file
│       └── BottomPanel         Problems · Output · Terminal (Terminal × n, splits)
├── StatusLine                  branch, problems, cursor, language
├── CommandPalette              ⇧⌘P commands · ⌘P files
├── parts/workspace.ts          the shared file system (localStorage, or a folder on disk)
└── parts/host.ts               optional desktop host: folders, shells, menu, title bar
```

## One file system

`parts/workspace.ts` is a synchronous in-memory file system that the explorer, the editor and every local terminal share (it implements the terminal's `ShellFs`). `touch a.ts` in a terminal shows up in the explorer, and `cat` prints what the editor saved. `code <file>` opens a file in the editor. Everything under the workspace root is kept in localStorage; **Workspace: Reset to the starter project** brings back the seed in `parts/seed.ts`.

## Buffers and saving

Open files are buffers (`parts/buffers.ts`). A tab shows a dot while its buffer differs from the file, ⌘S writes it and closing a dirty tab asks first. When a terminal command changes a file whose buffer is clean, the buffer follows it.

## The editor

The editor loads from a CDN on first use and shows a spinner meanwhile; if it cannot load it falls back to a plain text area on the same buffers. Its colours are read from the theme tokens and follow light, dark and the accent live. Every workspace file has a model, so imports resolve across files and Problems lists TypeScript errors for the whole workspace. To bundle it instead of the CDN, call `loader.config({ monaco })` from `@monaco-editor/react` with a local `monaco-editor` import, as the desktop app does.

## Real terminals

With `?pty=ws://…` in the URL every new terminal connects to the PTY bridge from the terminal item instead of the local shell. A real shell sees your disk, not the browser workspace, so the explorer and the terminal no longer share files in that mode.

## Desktop app

`apps/desktop` runs this template in a native window. It passes a `host` (`parts/host.ts`) to `VsCodeApp`: File › Open Folder loads a folder from disk, saves and explorer changes write back to it, changes made outside show up, and every terminal is your own shell started in that folder. The editor is bundled, so it works offline. Without a folder it shows the starter project. Install and run steps are in `apps/desktop/README.md`.

## Keyboard

⇧⌘P or F1 commands, ⌘P go to file, ⌘S save, ⌥⌘S save all, ⌘B sidebar, ⌃` or ⌘J panel, ⌃⇧` new terminal, ⇧⌘E explorer, ⇧⌘F search, ⌃⇧G source control, ⇧⌘X extensions, ⇧⌘M problems. In the explorer F2 renames and Delete deletes. Ctrl works for ⌘ on other platforms.

## Phones

Below `md` the sidebar opens in a drawer with the view rail at its foot, and the panel opens in a bottom sheet. Terminals keep their shells while the sheet is closed.
