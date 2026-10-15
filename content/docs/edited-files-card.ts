import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { EditedFilesCard } from "@/components/ui/edited-files-card"`,
    code: `<EditedFilesCard
  files={[{ path: "src/app.tsx", oldText: before, newText: after }]}
  onUndo={revert}
  onReview={openReview}
/>`,
  },
  examples: [
    { id: "unified-diff", title: "Unified Diff", description: "Files can carry a unified `diff` instead of the two versions." },
    { id: "collapsed", title: "Collapsed", description: "`defaultOpen={false}` shows just the summary; `additions` / `deletions` give counts without any diff text." },
  ],
  notes: [
    { title: "Narrow widths", body: "The card is a size container: under 20rem (phones, split panes) Undo keeps only its glyph (its accessible name stays “Undo”) and the summary clips instead of running under the buttons." },
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
