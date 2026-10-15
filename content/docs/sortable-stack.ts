import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { SortableStack, SortableStackContent, SortableStackHandle, SortableStackItem } from "@/components/ui/sortable-stack"`,
    code: `<SortableStack defaultItems={tasks} getItemLabel={(t) => t.title}>
  {(items) =>
    items.map((t) => (
      <SortableStackItem key={t.id} id={t.id}>
        <SortableStackHandle />
        <SortableStackContent>{t.title}</SortableStackContent>
      </SortableStackItem>
    ))
  }
</SortableStack>`,
  },
  composition: `SortableStack
├── SortableStackItem
│   ├── SortableStackHandle
│   └── SortableStackContent
└── SortableStackUndo (automatic, or in footer)`,
  examples: [
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when you save the order or show it elsewhere.",
    },
    {
      id: "move-to-top",
      title: "Move to Top",
      description: "Use for shortcut buttons like Move to top, which `moveItem` makes undoable too.",
    },
    {
      id: "custom-undo",
      title: "Custom Undo",
      description: "Use when undo belongs in your own control instead of the built-in pill.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Rows move only from their handle. With a handle focused, Up/Down move the row one step and Home/End send it to the top or bottom; focus stays on the handle and the new position is announced.",
    },
    {
      title: "Motion",
      body: "The dragged row scales to 1.025. With reduced motion rows jump into place without scaling.",
    },
  ],
  api: [
    {
      name: "SortableStack",
      description: "Drag-to-reorder list. Items need a string `id`.",
      props: [
        { name: "items", type: "T[]", description: "Controlled rows in order." },
        { name: "defaultItems", type: "T[]", default: "[]", description: "Initial rows when uncontrolled." },
        { name: "onItemsChange", type: "(items: T[]) => void", description: "Called with the new order after a drag, key move or undo." },
        {
          name: "getItemLabel",
          type: "(item: T) => string",
          required: true,
          description: "Readable name per row, used in handle labels and announcements.",
        },
        {
          name: "children",
          type: "(items: T[]) => ReactNode",
          required: true,
          description: "Render the rows in their current order.",
        },
        { name: "label", type: "string", default: `"Sortable list"`, description: "Accessible name of the list." },
        { name: "disabled", type: "boolean", default: "false", description: "Lock the order; handles are disabled and rows can't be dragged." },
        { name: "showUndo", type: "boolean", default: "true", description: "Render the Undo pill under the list." },
        { name: "footer", type: "ReactNode", description: "Extra content under the list, inside the stack's context." },
        { name: "className", type: "string", description: "Merged onto the wrapper." },
      ],
    },
    {
      name: "SortableStackItem",
      description: "One row.",
      props: [
        { name: "id", type: "string", required: true, description: "The item's id." },
        { name: "className", type: "string", description: "Merged onto the row." },
        { name: "style", type: "CSSProperties", description: "Inline style for the row." },
        { name: "children", type: "ReactNode", description: "Handle and content." },
      ],
      dataAttributes: [{ name: "data-dragging", description: "Present while the row is dragged." }],
    },
    {
      name: "SortableStackHandle",
      description: "Grip button that starts the drag and owns keyboard reordering. Labelled with the row's name and position.",
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: "grip icon", description: "Replace the grip icon." }],
    },
    { name: "SortableStackContent", description: "Content area of a row.", extends: "div", props: [] },
    {
      name: "SortableStackUndo",
      description: "Restores the order from before the last move. Hidden until there is something to undo.",
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-visible", description: "Present while an undo is available." }],
    },
    {
      name: "useSortableStack",
      description: "Order and actions for custom controls. Use inside `SortableStack`.",
      props: [
        { name: "ids", type: "string[]", description: "Current order of ids." },
        { name: "moveItem", type: `(id: string, by: -1 | 1 | "first" | "last") => void`, description: "Move a row; undoable." },
        { name: "undo", type: "() => void", description: "Restore the previous order." },
        { name: "canUndo", type: "boolean", description: "Whether an undo is available." },
        { name: "disabled", type: "boolean", description: "Whether the stack is disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
