import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Edit projects and run commands in the browser.", "zh": "在浏览器中编辑项目并运行命令。"},
  usage: {
    imports: `// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-editor https://paneui.dev/r/vscode.json
// or into an existing one (replaces app/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/vscode.json
import { VsCodeApp } from "@/components/vscode/vscode"`,
    code: `// app/page.tsx (installed for you: the editor is the home page)
export default function CodeEditorPage() {
  return <VsCodeApp />
}

// Real shells: run the terminal bridge, then open
// http://localhost:3000/?pty=ws://127.0.0.1:3457/?token=…`,
  },
  composition: `VsCodeApp
├── SidebarRail                 Explorer · Search · Source control · Extensions
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
└── parts/host.ts               optional desktop host: folders, shells, menu, title bar`,
  examples: [],
  api: [],
  notes: [
    {
      title: "One file system",
      body: { en: "`parts/workspace.ts` is a synchronous in-memory file system that the explorer, the editor and every local terminal share (it implements the terminal's `ShellFs`). `touch a.ts` in a terminal shows up in the explorer, and `cat` prints what the editor saved. `code <file>` opens a file in the editor. Everything under the workspace root is kept in localStorage; **Workspace: Reset to the starter project** brings back the seed in `parts/seed.ts`.", zh: "`parts/workspace.ts` 是一个同步的内存文件系统，供资源管理器、编辑器和每个本地终端共享（它实现了终端的 `ShellFs`）。在终端中 `touch a.ts` 会出现在资源管理器中，`cat` 会打印编辑器保存的内容。`code <file>` 在编辑器中打开文件。工作区根目录下的所有内容都保存在 localStorage 中；**Workspace: Reset to the starter project** 会恢复 `parts/seed.ts` 中的种子数据。" },
    },
    {
      title: "Buffers and saving",
      body: { en: "Open files are buffers (`parts/buffers.ts`). A tab shows a dot while its buffer differs from the file, ⌘S writes it and closing a dirty tab asks first. When a terminal command changes a file whose buffer is clean, the buffer follows it.", zh: "打开的文件是缓冲区（`parts/buffers.ts`）。当缓冲区与文件不同时，标签页会显示一个点，⌘S 写入，关闭脏标签页前会先询问。当终端命令更改了一个缓冲区干净的文件时，缓冲区会跟随变更。" },
    },
    {
      title: "The editor",
      body: { en: "The editor loads from a CDN on first use and shows a spinner meanwhile; if it cannot load it falls back to a plain text area on the same buffers. Its colours are read from the theme tokens and follow light, dark and the accent live. Every workspace file has a model, so imports resolve across files and Problems lists TypeScript errors for the whole workspace. To bundle it instead of the CDN, call `loader.config({ monaco })` from `@monaco-editor/react` with a local `monaco-editor` import, as the desktop app does.", zh: "编辑器首次使用时从 CDN 加载，期间显示 spinner；如果无法加载，则回退到基于相同缓冲区的纯文本区域。其颜色从主题变量读取，并实时跟随浅色、深色和主题色。每个工作区文件都有一个 model，因此导入可跨文件解析，Problems 会列出整个工作区的 TypeScript 错误。若要代替 CDN 进行打包，请从 `@monaco-editor/react` 调用 `loader.config({ monaco })` 并使用本地 `monaco-editor` 导入，如桌面应用所做的那样。" },
    },
    {
      title: "Real terminals",
      body: { en: "With `?pty=ws://…` in the URL every new terminal connects to the PTY bridge from the terminal item instead of the local shell. A real shell sees your disk, not the browser workspace, so the explorer and the terminal no longer share files in that mode.", zh: "当 URL 中带有 `?pty=ws://…` 时，每个新终端会从终端项连接到 PTY 桥接器，而不是本地 shell。真实 shell 看到的是你的磁盘，而不是浏览器工作区，因此在该模式下资源管理器和终端不再共享文件。" },
    },
    {
      title: "Desktop app",
      body: { en: "`apps/desktop` runs this template in a native window. It passes a `host` (`parts/host.ts`) to `VsCodeApp`: File › Open Folder loads a folder from disk, saves and explorer changes write back to it, changes made outside show up, and every terminal is your own shell started in that folder. The editor is bundled, so it works offline. Without a folder it shows the starter project. Install and run steps are in `apps/desktop/README.md`.", zh: "`apps/desktop` 在原生窗口中运行此模板。它向 `VsCodeApp` 传递一个 `host`（`parts/host.ts`）：File › Open Folder 从磁盘加载文件夹，保存和资源管理器更改会写回磁盘，外部更改会显示，每个终端都是在那个文件夹中启动的你自己的 shell。编辑器已打包，因此可离线工作。没有文件夹时显示起始项目。安装和运行步骤见 `apps/desktop/README.md`。" },
    },
    {
      title: "Keyboard",
      body: { en: "⇧⌘P or F1 commands, ⌘P go to file, ⌘S save, ⌥⌘S save all, ⌘B sidebar, ⌃` or ⌘J panel, ⌃⇧` new terminal, ⇧⌘E explorer, ⇧⌘F search, ⌃⇧G source control, ⇧⌘X extensions, ⇧⌘M problems. In the explorer F2 renames and Delete deletes. Ctrl works for ⌘ on other platforms.", zh: "⇧⌘P 或 F1 打开命令，⌘P 跳转到文件，⌘S 保存，⌥⌘S 全部保存，⌘B 侧栏，⌃` 或 ⌘J 面板，⌃⇧` 新建终端，⇧⌘E 资源管理器，⇧⌘F 搜索，⌃⇧G 源代码管理，⇧⌘X 扩展，⇧⌘M 问题。在资源管理器中 F2 重命名，Delete 删除。其他平台用 Ctrl 代替 ⌘。" },
    },
    {
      title: "Phones",
      body: { en: "Below `md` the sidebar opens in a drawer with the view rail at its foot, and the panel opens in a bottom sheet. Terminals keep their shells while the sheet is closed.", zh: "低于 `md` 时，侧边栏在抽屉中打开，视图栏位于其底部，面板在底部工作表中打开。工作表关闭时，终端保持其 shell。" },
    },
  ],
} satisfies ComponentDoc
