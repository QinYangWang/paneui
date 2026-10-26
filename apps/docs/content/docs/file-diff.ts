import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows one file's changes as a diff, even while streaming.", "zh": "显示文件修改差异。"},
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { FileDiff } from "@/components/ui/file-diff"`,
    code: `<FileDiff filename="lib/slots.ts" diff={diff} />`,
  },
  examples: [
    {
      id: "split",
      title: { en: "Split View", zh: "分栏视图" },
    },
    {
      id: "two-files",
      title: { en: "Two Files", zh: "两个文件" },
    },
    {
      id: "accept-reject",
      title: { en: "Accept or Reject Changes", zh: "接受或拒绝修改" },
    },
    {
      id: "collapse-on-complete",
      title: { en: "Collapse on Complete", zh: "完成后收起" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "plain",
      title: { en: "Without Line Numbers or Copy", zh: "无行号或复制" },
    },
    {
      id: "pre-parsed",
      title: { en: "Pre-parsed Lines", zh: "预解析行" },
    },
  ],
  notes: [
    {
      title: "Renderer",
      body: { en: "The bundled diff renderer draws the rows inside a shadow root, themed with this library's tokens (`--code` surface, 12px `font-mono`, `success` / `destructive` for changes); light and dark syntax colours follow the `html.dark` class. It loads on demand in the browser (about 200 KB gzipped, with grammars per language). During static export and until it arrives, plain unhighlighted rows show.", zh: "捆绑的 diff 渲染器在 shadow root 内绘制行，使用此库的变量进行主题化（`--code` 表面、12px `font-mono`、更改用 `success` / `destructive`）；浅色和深色语法颜色跟随 `html.dark` 类。它在浏览器中按需加载（约 200 KB gzip 压缩，按语言包含语法）。在静态导出期间以及它到达之前，显示普通的未高亮行。" },
    },
    {
      title: "Motion",
      body: { en: "While `status` is `streaming`, the newest row slides in with a primary flash and the view follows the end. Under reduced motion rows appear without movement and the chevron stops rotating.", zh: "当 `status` 为 `streaming` 时，最新行以主色闪烁滑入，视图跟随末尾。在减少动态效果下，行出现时无移动，chevron 停止旋转。" },
    },
    {
      title: "Accessibility",
      body: { en: "The header is a collapsible trigger and reads out \"N additions, N deletions\". The rows sit in a region labelled \"Changes to {filename}\"; the Unified / Split switch is a radio group.", zh: "头部是可折叠触发器，读出“N 处新增，N 处删除”。行位于标记为“{filename} 的更改”的区域中；Unified / Split 切换是单选组。" },
    },
  ],
  api: [
    {
      name: "FileDiff",
      description: { en: "Disclosure for one file change with live +/− counts, rendering a unified or split diff.", zh: "用于单个文件更改的展开组件，带实时 +/− 计数，渲染统一或拆分 diff。" },
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [
        { name: "filename", type: "string", required: true, description: { en: "File path in the header; the directory part is dimmed. Also infers the language.", zh: "头部中的文件路径；目录部分会变暗。同时推断语言。" } },
        { name: "diff", type: "string", default: `""`, description: { en: "Unified diff text for one file. Ignored when `lines`, `oldFile`/`newFile` or `fileDiff` are given.", zh: "单个文件的统一 diff 文本。当给出 `lines`、`oldFile`/`newFile` 或 `fileDiff` 时忽略。" } },
        { name: "lines", type: "FileDiffLine[]", description: { en: "Pre-parsed rows, e.g. appended one by one while an agent streams.", zh: "预解析的行，例如在 agent 流式传输时逐行追加。" } },
        { name: "oldFile", type: "string | null", description: { en: "Old contents for a two-file diff (`null` when the file is new). Unchanged regions become expandable.", zh: "用于双文件 diff 的旧内容（文件为新文件时为 `null`）。未更改的区域可展开。" } },
        { name: "newFile", type: "string | null", description: { en: "New contents for a two-file diff (`null` when the file was deleted).", zh: "用于双文件 diff 的新内容（文件被删除时为 `null`）。" } },
        { name: "fileDiff", type: "FileDiffMetadata", description: { en: "An already parsed diff (from `parseDiffFromFile`, `parsePatchFiles` or `diffAcceptRejectHunk`). Wins over every other source.", zh: "已解析的 diff（来自 `parseDiffFromFile`、`parsePatchFiles` 或 `diffAcceptRejectHunk`）。优先于所有其他来源。" } },
        { name: "language", type: "string", description: { en: "Syntax language id, inferred from `filename` when omitted.", zh: "语法语言 id，省略时从 `filename` 推断。" } },
        { name: "status", type: `"streaming" | "complete"`, default: `"complete"`, description: { en: "`streaming` shows a spinner, flashes new rows in and follows the end.", zh: "`streaming` 显示加载指示器，闪烁新行并跟随末尾。" } },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Initial open state when uncontrolled.", zh: "非受控时的初始打开状态。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the disclosure opens or closes.", zh: "展开项打开或关闭时调用。" } },
        { name: "collapseOnComplete", type: "boolean", default: "false", description: { en: "Fold the diff away when `status` goes from `streaming` to `complete`; it reopens when streaming starts again.", zh: "当 `status` 从 `streaming` 变为 `complete` 时收起 diff；再次开始流式传输时重新打开。" } },
        { name: "diffStyle", type: `"unified" | "split"`, description: { en: "Controlled layout.", zh: "受控布局。" } },
        { name: "defaultDiffStyle", type: `"unified" | "split"`, default: `"unified"`, description: { en: "Initial layout when uncontrolled.", zh: "非受控时的初始布局。" } },
        { name: "onDiffStyleChange", type: `(style: "unified" | "split") => void`, description: { en: "Called when the header switch changes the layout.", zh: "头部切换更改布局时调用。" } },
        { name: "diffStyleToggle", type: "boolean", default: "false", description: { en: "Show the Unified / Split switch in the header.", zh: "在头部显示 Unified / Split 切换。" } },
        { name: "inlineChanges", type: `boolean | "word-alt" | "word" | "word-line" | "char"`, default: "true", description: { en: "Highlight the changed part of each modified line. `true` is `\"word-alt\"`; `false` turns it off.", zh: "高亮每个修改行中更改的部分。`true` 等同于 `\"word-alt\"`；`false` 关闭。" } },
        { name: "indicators", type: `"bars" | "classic" | "none"`, default: `"bars"`, description: { en: "Mark changed lines with a coloured bar, with `+`/`-` signs, or by background only.", zh: "用彩色条、`+`/`-` 符号或仅背景标记更改的行。" } },
        { name: "wrap", type: "boolean", default: "false", description: { en: "Wrap long lines instead of scrolling sideways.", zh: "长行换行而不是横向滚动。" } },
        { name: "maxHeight", type: "number", default: "320", description: { en: "Max height of the rows area in px.", zh: "行区域的最大高度，单位为 px。" } },
        { name: "showLineNumbers", type: "boolean", default: "true", description: { en: "Show line numbers.", zh: "显示行号。" } },
        { name: "copyable", type: "boolean", default: "true", description: { en: "Show a button that copies the new file contents.", zh: "显示复制新文件内容的按钮。" } },
        { name: "lineAnnotations", type: "DiffLineAnnotation<A>[]", description: { en: "Rows of your own UI pinned under diff lines, each `{ side: \"additions\" | \"deletions\", lineNumber, metadata }`.", zh: "固定于 diff 行下方的自定义 UI 行，每个为 `{ side: \"additions\" | \"deletions\", lineNumber, metadata }`。" } },
        { name: "renderAnnotation", type: "(annotation: DiffLineAnnotation<A>) => ReactNode", description: { en: "Renders each annotation (comments, accept/reject buttons…).", zh: "渲染每个注释（评论、接受/拒绝按钮……）。" } },
        { name: "options", type: "FileDiffOptions", description: { en: "Extra renderer options merged over the defaults, e.g. `hunkSeparators`, `expandUnchanged`, `enableLineSelection`.", zh: "合并到默认值之上的额外渲染器选项，例如 `hunkSeparators`、`expandUnchanged`、`enableLineSelection`。" } },
        { name: "variant", type: `"card" | "row"`, default: `"card"`, description: { en: "`row` drops the card surface and moves the chevron to the end, for lists of files such as `EditedFilesCard`.", zh: "`row` 去掉卡片表面并将 chevron 移到末尾，用于诸如 `EditedFilesCard` 的文件列表。" } },
        { name: "actions", type: "ReactNode", description: { en: "Extra header controls before the copy button (reveal in folder, open in editor).", zh: "复制按钮之前的额外头部控件（在文件夹中显示、在编辑器中打开）。" } },
      ],
      dataAttributes: [
        { name: "data-status", description: { en: "`streaming` or `complete`.", zh: "`streaming` 或 `complete`。" } },
        { name: "data-diff-style", description: { en: "`unified` or `split`.", zh: "`unified` 或 `split`。" } },
      ],
    },
    {
      name: "parseUnifiedDiff",
      description: { en: "`(diff: string) => FileDiffLine[]`. Parses one file's `git diff` output; file headers are dropped.", zh: "`(diff: string) => FileDiffLine[]`。解析单个文件的 `git diff` 输出；文件头会被丢弃。" },
      props: [],
    },
    {
      name: "FileDiffLine",
      description: { en: "One row of a diff.", zh: "diff 的一行。" },
      props: [
        { name: "type", type: `"added" | "removed" | "context" | "hunk"`, required: true, description: { en: "Row kind.", zh: "行类型。" } },
        { name: "content", type: "string", required: true, description: { en: "Line text without the leading sign; the full `@@` header for hunks.", zh: "不含前导符号的行文本；hunk 则为完整的 `@@` 头。" } },
        { name: "oldLine", type: "number", description: { en: "Line number in the old file.", zh: "旧文件中的行号。" } },
        { name: "newLine", type: "number", description: { en: "Line number in the new file.", zh: "新文件中的行号。" } },
      ],
    },
  ],
} satisfies ComponentDoc
