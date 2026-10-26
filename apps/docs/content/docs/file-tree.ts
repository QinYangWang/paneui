import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Browses files and folders in a keyboard-navigable tree.", "zh": "浏览文件与文件夹。"},
  usage: {
    imports: `import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/ui/file-tree"`,
    code: `<FileTree defaultExpanded={["app"]}>
  <FileTreeFolder name="app">
    <FileTreeFile name="page.tsx" />
  </FileTreeFolder>
  <FileTreeFile name="package.json" />
</FileTree>`,
  },
  composition: `FileTree
├── FileTreeFolder
│   ├── FileTreeFolder
│   └── FileTreeFile
└── FileTreeFile`,
  examples: [
    {
      id: "explicit-values",
      title: { en: "Explicit Values", zh: "明确数值" },
    },
    {
      id: "items",
      title: { en: "From Data", zh: "根据数据" },
    },
    {
      id: "controlled-expanded",
      title: { en: "Controlled Expanded", zh: "受控展开" },
    },
    {
      id: "open-file",
      title: { en: "Open File and Icons", zh: "打开文件与图标" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Follows the WAI-ARIA tree pattern. ↑ / ↓ move, → opens a folder or enters it, ← closes it or goes to the parent, Home / End jump, Enter or Space activates, `*` expands every sibling folder, and typing jumps to the next matching name.",
    },
    {
      title: "Values",
      body: "A node without `value` uses its path from the root: `app` for a top-level folder, `app/page.tsx` for a file in it. `defaultExpanded`, `value` and `onValueChange` all use these paths. Two nodes with the same value log a warning in development.",
    },
    {
      title: "Icons",
      body: "A file gets its icon and tint from its extension, and an unknown extension gets a plain file. `getFileKind(name)` returns the same icon and tint for use elsewhere.",
    },
    {
      title: "Motion",
      body: "Under reduced motion, rows only fade in and the selection fill jumps instead of gliding.",
    },
  ],
  api: [
    {
      name: "FileTree",
      description: "The tree. Reads its `FileTreeFolder` / `FileTreeFile` children (or `items`) into one keyboard-navigable list.",
      extends: "div",
      props: [
        { name: "items", type: "FileTreeItem[]", description: "Data alternative to declarative children; `value` is optional as on the parts." },
        { name: "value", type: "string | null", description: "Controlled selected node." },
        { name: "defaultValue", type: "string | null", default: "null", description: "Initial selection when uncontrolled." },
        { name: "onValueChange", type: "(value: string, node: FileTreeNode) => void", description: "Called when a node is selected." },
        { name: "expanded", type: "string[]", description: "Controlled open folder values." },
        { name: "defaultExpanded", type: "string[]", default: "[]", description: "Folders open on first render." },
        { name: "onExpandedChange", type: "(expanded: string[]) => void", description: "Called when folders open or close." },
        { name: "onOpenFile", type: "(node: FileTreeNode) => void", description: "Called when a file (not a folder) is activated with Enter or a click." },
        { name: "indent", type: "number", default: "12", description: "Indent per level, px." },
        { name: "variant", type: '"default" | "ghost"', default: '"default"', description: "Card surface, or none inside a sidebar." },
        { name: "label", type: "string", default: `"Files"`, description: "Accessible name of the tree." },
      ],
      dataAttributes: [
        { name: "data-type", description: "`file` or `folder`, on each row." },
        { name: "data-selected", description: "On the selected row." },
      ],
    },
    {
      name: "FileTreeFolder",
      description: "Declarative folder; renders nothing on its own. Nest folders and files inside it.",
      props: [
        { name: "value", type: "string", default: "path (`parent/name`)", description: "Unique id. Defaults to the path from the root." },
        { name: "name", type: "string", required: true, description: "Label; also used for typeahead." },
        { name: "icon", type: "ReactNode", description: "Replaces the chevron. Folders have no folder icon; the chevron is their only leading mark." },
        { name: "meta", type: "ReactNode", description: "Trailing content (status dot, size, badge)." },
        { name: "disabled", type: "boolean", description: "Dim it and ignore activation." },
        { name: "className", type: "string", description: "Class for the row." },
      ],
    },
    {
      name: "FileTreeFile",
      description: "Declarative file; renders nothing on its own. Same props as `FileTreeFolder`, without children.",
      props: [],
    },
    {
      name: "FileTreeNode",
      description: "A resolved entry, as passed to `onValueChange` and `onOpenFile`: the folder props with a required `value`, plus `type: \"file\" | \"folder\"` and `children?: FileTreeNode[]`. `FileTreeItem` is the input form for `items`, with `value` optional.",
      props: [],
    },
  ],
} satisfies ComponentDoc
