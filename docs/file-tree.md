# File Tree

> Browses files and folders in a keyboard-navigable tree.

Page: https://paneui.dev/docs/file-tree/

## Installation

```bash
npx shadcn@latest add @paneui/file-tree
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/file-tree.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/icons`.

## Usage

```tsx
import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/ui/file-tree"
```

```tsx
<FileTree defaultExpanded={["app"]}>
  <FileTreeFolder name="app">
    <FileTreeFile name="page.tsx" />
  </FileTreeFolder>
  <FileTreeFile name="package.json" />
</FileTree>
```

## Composition

```text
FileTree
├── FileTreeFolder
│   ├── FileTreeFolder
│   └── FileTreeFile
└── FileTreeFile
```

## Examples

### Explicit Values

```tsx
"use client"

import * as React from "react"

import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

export default function FileTreeExplicitValues() {
  const [value, setValue] = React.useState<string | null>("doc-42")
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="frame-xl frame-p-2 bg-card shadow-surface">
        <FileTree label="Documents" value={value} onValueChange={setValue} defaultExpanded={["folder-7"]}>
          <FileTreeFolder value="folder-7" name="Guides">
            <FileTreeFile value="doc-41" name="install.md" />
            <FileTreeFile value="doc-42" name="theming.md" />
          </FileTreeFolder>
          <FileTreeFile value="doc-9" name="changelog.md" />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        Selected id: <span className="font-mono text-foreground">{value ?? "none"}</span>
      </p>
    </div>
  )
}
```

### From Data

```tsx
import { FileTree, type FileTreeNode } from "@/registry/base-nova/ui/file-tree"

const items: FileTreeNode[] = [
  {
    value: "2026",
    name: "2026",
    type: "folder",
    children: [
      {
        value: "2026/taxes",
        name: "Taxes",
        type: "folder",
        children: [
          { value: "2026/taxes/w2.pdf", name: "W-2.pdf", type: "file", meta: "84 KB" },
          { value: "2026/taxes/receipts.zip", name: "Receipts.zip", type: "file", meta: "12 MB" },
        ],
      },
      { value: "2026/lease.pdf", name: "Lease agreement.pdf", type: "file", meta: "1.2 MB" },
    ],
  },
  { value: "2025", name: "2025", type: "folder", children: [{ value: "2025/insurance.pdf", name: "Insurance.pdf", type: "file", meta: "640 KB" }] },
  { value: "passport.jpg", name: "Passport scan.jpg", type: "file", meta: "2.4 MB" },
]

export default function FileTreeItems() {
  return (
    <div className="w-80 frame-xl frame-p-2 bg-card shadow-surface">
      <FileTree label="Documents" items={items} defaultExpanded={["2026", "2026/taxes"]} defaultValue="2026/taxes/w2.pdf" />
    </div>
  )
}
```

### Controlled Expanded

```tsx
"use client"

import * as React from "react"

import { Button } from "@/registry/base-nova/ui/button"
import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

const ALL = ["src", "src/routes", "src/lib", "tests"]

export default function FileTreeControlledExpanded() {
  const [expanded, setExpanded] = React.useState<string[]>(["src"])
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="flex gap-2">
        <Button size="xs" variant="secondary" onClick={() => setExpanded(ALL)}>
          Expand all
        </Button>
        <Button size="xs" variant="ghost" onClick={() => setExpanded([])}>
          Collapse all
        </Button>
      </div>
      <div className="frame-xl frame-p-2 bg-card shadow-surface">
        <FileTree label="Repository" expanded={expanded} onExpandedChange={setExpanded}>
          <FileTreeFolder value="src" name="src">
            <FileTreeFolder value="src/routes" name="routes">
              <FileTreeFile value="src/routes/index.ts" name="index.ts" />
              <FileTreeFile value="src/routes/auth.ts" name="auth.ts" />
            </FileTreeFolder>
            <FileTreeFolder value="src/lib" name="lib">
              <FileTreeFile value="src/lib/db.ts" name="db.ts" />
            </FileTreeFolder>
            <FileTreeFile value="src/main.ts" name="main.ts" />
          </FileTreeFolder>
          <FileTreeFolder value="tests" name="tests">
            <FileTreeFile value="tests/auth.test.ts" name="auth.test.ts" />
          </FileTreeFolder>
          <FileTreeFile value="README.md" name="README.md" />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground tabular-nums">{expanded.length} folders open</p>
    </div>
  )
}
```

### Open File and Icons

```tsx
"use client"

import * as React from "react"

import { LockIcon } from "@/components/icons"
import { FileTree, FileTreeFile, FileTreeFolder } from "@/registry/base-nova/ui/file-tree"

export default function FileTreeOpenFile() {
  const [opened, setOpened] = React.useState<string | null>(null)
  return (
    <div className="flex w-72 flex-col gap-2">
      <div className="frame-xl frame-p-2 bg-card shadow-surface">
        <FileTree label="Site" defaultExpanded={["public", "pages"]} onOpenFile={(node) => setOpened(node.name)}>
          <FileTreeFolder value="pages" name="pages">
            <FileTreeFile value="index.html" name="index.html" />
            <FileTreeFile value="about.html" name="about.html" />
          </FileTreeFolder>
          <FileTreeFolder value="public" name="public">
            <FileTreeFile value="hero.png" name="hero.png" />
            <FileTreeFile value="logo.svg" name="logo.svg" />
          </FileTreeFolder>
          <FileTreeFile value="secrets" name="secrets.env" icon={<LockIcon />} disabled />
        </FileTree>
      </div>
      <p className="px-2 text-xs text-muted-foreground">
        {opened ? (
          <>
            Opened <span className="font-medium text-foreground">{opened}</span>
          </>
        ) : (
          "Click a file, or focus it and press Enter, to open it."
        )}
      </p>
    </div>
  )
}
```

## Keyboard

Follows the WAI-ARIA tree pattern. ↑ / ↓ move, → opens a folder or enters it, ← closes it or goes to the parent, Home / End jump, Enter or Space activates, `*` expands every sibling folder, and typing jumps to the next matching name.

## Values

A node without `value` uses its path from the root: `app` for a top-level folder, `app/page.tsx` for a file in it. `defaultExpanded`, `value` and `onValueChange` all use these paths. Two nodes with the same value log a warning in development.

## Icons

A file gets its icon and tint from its extension, and an unknown extension gets a plain file. `getFileKind(name)` returns the same icon and tint for use elsewhere.

## Motion

Under reduced motion, rows only fade in and the selection fill jumps instead of gliding.

## API Reference

### FileTree

The tree. Reads its `FileTreeFolder` / `FileTreeFile` children (or `items`) into one keyboard-navigable list. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `items` | `FileTreeItem[]` | — | Data alternative to declarative children; `value` is optional as on the parts. |
| `value` | `string \| null` | — | Controlled selected node. |
| `defaultValue` | `string \| null` | `null` | Initial selection when uncontrolled. |
| `onValueChange` | `(value: string, node: FileTreeNode) => void` | — | Called when a node is selected. |
| `expanded` | `string[]` | — | Controlled open folder values. |
| `defaultExpanded` | `string[]` | `[]` | Folders open on first render. |
| `onExpandedChange` | `(expanded: string[]) => void` | — | Called when folders open or close. |
| `onOpenFile` | `(node: FileTreeNode) => void` | — | Called when a file (not a folder) is activated with Enter or a click. |
| `indent` | `number` | `12` | Indent per level, px. |
| `label` | `string` | `"Files"` | Accessible name of the tree. |

| Data attribute | Description |
| --- | --- |
| `data-type` | `file` or `folder`, on each row. |
| `data-selected` | On the selected row. |

### FileTreeFolder

Declarative folder; renders nothing on its own. Nest folders and files inside it.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `value` | `string` | path (`parent/name`) | Unique id. Defaults to the path from the root. |
| `name` (required) | `string` | — | Label; also used for typeahead. |
| `icon` | `ReactNode` | — | Replaces the chevron. Folders have no folder icon; the chevron is their only leading mark. |
| `meta` | `ReactNode` | — | Trailing content (status dot, size, badge). |
| `disabled` | `boolean` | — | Dim it and ignore activation. |
| `className` | `string` | — | Class for the row. |

### FileTreeFile

Declarative file; renders nothing on its own. Same props as `FileTreeFolder`, without children.

### FileTreeNode

A resolved entry, as passed to `onValueChange` and `onOpenFile`: the folder props with a required `value`, plus `type: "file" | "folder"` and `children?: FileTreeNode[]`. `FileTreeItem` is the input form for `items`, with `value` optional.
