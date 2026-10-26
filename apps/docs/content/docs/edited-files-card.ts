import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Reviews and undoes an agent’s file changes.", "zh": "查看并撤销助手的文件修改。"},
  usage: {
    imports: `import { EditedFilesCard } from "@/components/ui/edited-files-card"`,
    code: `<EditedFilesCard
  files={[{ path: "src/app.tsx", oldText: before, newText: after }]}
  onUndo={revert}
  onReview={openReview}
/>`,
  },
  examples: [
    { id: "unified-diff", title: { en: "Unified Diff", zh: "统一差异" },  },
    { id: "collapsed", title: { en: "Collapsed", zh: "收起" },  },
  ],
  notes: [
    { title: "Narrow widths", body: { en: "Below 20rem of card width (phones, split panes), Undo shows only its glyph (its accessible name stays “Undo”) and the summary clips instead of running under the buttons.", zh: "当卡片宽度低于 20rem（手机、分屏）时，Undo 只显示其字形（无障碍名称仍为 “Undo”），摘要会被裁剪，而不会延伸到按钮下方。" } },
    { title: "Counts", body: { en: "Totals come from each file's diff rows, or a line comparison of `oldText` and `newText` (`oldText: null` is a new file). Rows expand to a `FileDiff` in its `row` variant, which loads the highlighter lazily.", zh: "总计来自每个文件的 diff 行，或对 `oldText` 和 `newText` 进行行比较（`oldText: null` 表示新文件）。行可展开为 `row` 变体的 `FileDiff`，它会延迟加载高亮器。" } },
    { title: "ACP", body: { en: "Fed directly from ACP `diff` tool-call content (`path`, `oldText`, `newText`), which is how the agent workspace template builds it at the end of each turn.", zh: "直接由 ACP 的 `diff` 工具调用内容（`path`、`oldText`、`newText`）提供，这是 agent 工作区模板在每轮结束时构建它的方式。" } },
  ],
  api: [
    {
      name: "EditedFilesCard",
      extends: "div",
      props: [
        { name: "files", type: "EditedFile[]", required: true, description: { en: "`{ path, diff?, oldText?, newText?, additions?, deletions? }` per file.", zh: "每个文件为 `{ path, diff?, oldText?, newText?, additions?, deletions? }`。" } },
        { name: "onUndo", type: "() => void", description: { en: "Shows Undo.", zh: "显示 Undo。" } },
        { name: "onReview", type: "() => void", description: { en: "Shows Review.", zh: "显示 Review。" } },
        { name: "onRevealFile", type: "(path: string) => void", description: { en: "Adds a reveal-in-folder button to each row.", zh: "为每行添加“在文件夹中显示”按钮。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Start with the file list open.", zh: "初始时文件列表为打开状态。" } },
        { name: "title", type: "ReactNode", description: { en: "Replace “Edited N files”.", zh: "替换“Edited N files”。" } },
      ],
      dataAttributes: [{ name: "data-open", description: { en: "Present while the file list is open.", zh: "文件列表打开时存在。" } }],
    },
  ],
} satisfies ComponentDoc
