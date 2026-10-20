# Edited Files Card

> Reviews and undoes an agent’s file changes.

Page: https://paneui.dev/docs/edited-files-card/

## Installation

```bash
npx shadcn@latest add @paneui/edited-files-card
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/edited-files-card.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`, `@paneui/button`, `@paneui/file-diff`.

## Usage

```tsx
import { EditedFilesCard } from "@/components/ui/edited-files-card"
```

```tsx
<EditedFilesCard
  files={[{ path: "src/app.tsx", oldText: before, newText: after }]}
  onUndo={revert}
  onReview={openReview}
/>
```

## Examples

### Unified Diff

```tsx
import { EditedFilesCard } from "@/registry/base-nova/ui/edited-files-card"

const DIFF = `@@ -1,4 +1,5 @@
 export const config = {
-  retries: 1,
+  retries: 3,
+  backoff: "exponential",
   timeout: 30_000,
 }`

export default function EditedFilesCardUnifiedDiff() {
  return (
    <div className="w-full max-w-lg">
      <EditedFilesCard files={[{ path: "src/http/config.ts", diff: DIFF }]} defaultOpen />
    </div>
  )
}
```

### Collapsed

```tsx
import { EditedFilesCard } from "@/registry/base-nova/ui/edited-files-card"

export default function EditedFilesCardCollapsed() {
  return (
    <div className="w-full max-w-lg">
      <EditedFilesCard
        defaultOpen={false}
        onReview={() => undefined}
        files={[
          { path: "app/page.tsx", additions: 42, deletions: 7 },
          { path: "app/layout.tsx", additions: 3, deletions: 1 },
        ]}
      />
    </div>
  )
}
```

## Narrow widths

Below 20rem of card width (phones, split panes), Undo shows only its glyph (its accessible name stays “Undo”) and the summary clips instead of running under the buttons.

## Counts

Totals come from each file's diff rows, or a line comparison of `oldText` and `newText` (`oldText: null` is a new file). Rows expand to a `FileDiff` in its `row` variant, which loads the highlighter lazily.

## ACP

Fed directly from ACP `diff` tool-call content (`path`, `oldText`, `newText`), which is how the agent workspace template builds it at the end of each turn.

## API Reference

### EditedFilesCard

Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `files` (required) | `EditedFile[]` | — | `{ path, diff?, oldText?, newText?, additions?, deletions? }` per file. |
| `onUndo` | `() => void` | — | Shows Undo. |
| `onReview` | `() => void` | — | Shows Review. |
| `onRevealFile` | `(path: string) => void` | — | Adds a reveal-in-folder button to each row. |
| `defaultOpen` | `boolean` | `true` | Start with the file list open. |
| `title` | `ReactNode` | — | Replace “Edited N files”. |

| Data attribute | Description |
| --- | --- |
| `data-open` | Present while the file list is open. |
