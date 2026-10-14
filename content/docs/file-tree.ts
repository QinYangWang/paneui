import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { FileTree, FileTreeFile, FileTreeFolder } from "@/components/ui/file-tree"`,
    code: `<FileTree defaultExpanded={["app"]}>
  <FileTreeFolder value="app" name="app">
    <FileTreeFile value="page.tsx" name="page.tsx" />
  </FileTreeFolder>
  <FileTreeFile value="package.json" name="package.json" />
</FileTree>`,
  },
  composition: `FileTree
├── FileTreeFolder
│   ├── FileTreeFolder
│   └── FileTreeFile
└── FileTreeFile`,
  examples: [
    {
      id: "items",
      title: "From Data",
      description: "Pass a nested `items` array of `FileTreeNode` instead of children; `meta` adds trailing content like a file size.",
    },
    {
      id: "controlled-expanded",
      title: "Controlled Expanded",
      description: "Control which folders are open with `expanded` and `onExpandedChange`.",
    },
    {
      id: "open-file",
      title: "Open File and Icons",
      description: "`onOpenFile` fires when a file is clicked or activated with Enter. Each node takes an `icon`, and `indent` sets px per level.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Follows the WAI-ARIA tree pattern: ↑ / ↓ move, → opens a folder or enters it, ← closes it or goes to the parent, Home / End jump, Enter or Space activates, `*` expands every sibling folder, and typing jumps to the next matching name.",
    },
    {
      title: "Motion",
      body: "Rows slide and unblur in as folders open, indent guides draw down, and the selection fill glides between rows. Under reduced motion rows only fade and the fill jumps.",
    },
  ],
  api: [
    {
      name: "FileTree",
      description: "The tree. Reads its `FileTreeFolder` / `FileTreeFile` children (or `items`) into one keyboard-navigable list.",
      extends: "div",
      props: [
        { name: "items", type: "FileTreeNode[]", description: "Data alternative to declarative children." },
        { name: "value", type: "string | null", description: "Controlled selected node." },
        { name: "defaultValue", type: "string | null", default: "null", description: "Initial selection when uncontrolled." },
        { name: "onValueChange", type: "(value: string, node: FileTreeNode) => void", description: "Called when a node is selected." },
        { name: "expanded", type: "string[]", description: "Controlled open folder values." },
        { name: "defaultExpanded", type: "string[]", default: "[]", description: "Folders open on first render." },
        { name: "onExpandedChange", type: "(expanded: string[]) => void", description: "Called when folders open or close." },
        { name: "onOpenFile", type: "(node: FileTreeNode) => void", description: "Called when a file (not a folder) is activated with Enter or a click." },
        { name: "indent", type: "number", default: "8", description: "Indent per level, px (VS Code explorer default)." },
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
        { name: "value", type: "string", required: true, description: "Unique id." },
        { name: "name", type: "string", required: true, description: "Label; also used for typeahead." },
        { name: "icon", type: "ReactNode", description: "Replaces the folder icon." },
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
      description: "Type of each entry in `items`: the folder props plus `type: \"file\" | \"folder\"` and `children?: FileTreeNode[]`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
