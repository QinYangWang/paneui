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
    { title: "Narrow widths", body: "Below 20rem of card width (phones, split panes), Undo shows only its glyph (its accessible name stays “Undo”) and the summary clips instead of running under the buttons." },
    { title: "Counts", body: "Totals come from each file's diff rows, or a line comparison of `oldText` and `newText` (`oldText: null` is a new file). Rows expand to a `FileDiff` in its `row` variant, which loads the highlighter lazily." },
    { title: "ACP", body: "Fed directly from ACP `diff` tool-call content (`path`, `oldText`, `newText`), which is how the agent workspace template builds it at the end of each turn." },
  ],
  api: [
    {
      name: "EditedFilesCard",
      extends: "div",
      props: [
        { name: "files", type: "EditedFile[]", required: true, description: "`{ path, diff?, oldText?, newText?, additions?, deletions? }` per file." },
        { name: "onUndo", type: "() => void", description: "Shows Undo." },
        { name: "onReview", type: "() => void", description: "Shows Review." },
        { name: "onRevealFile", type: "(path: string) => void", description: "Adds a reveal-in-folder button to each row." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Start with the file list open." },
        { name: "title", type: "ReactNode", description: "Replace “Edited N files”." },
      ],
      dataAttributes: [{ name: "data-open", description: "Present while the file list is open." }],
    },
  ],
} satisfies ComponentDoc
