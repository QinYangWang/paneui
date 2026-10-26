import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "List the user can reorder by dragging or keyboard.", "zh": "通过拖动或键盘调整列表顺序。"},
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
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when you save the order or show it elsewhere.", zh: "适用于需要保存或共享排序的场景。" },
    },
    {
      id: "move-to-top",
      title: { en: "Move to Top", zh: "移至顶部" },
    },
    {
      id: "custom-undo",
      title: { en: "Custom Undo", zh: "自定义撤销" },
      description: { en: "Use when undo belongs in your own control instead of the built-in pill.", zh: "适用于由外部控件处理撤销的场景。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Rows move only from their handle. With a handle focused, Up/Down move the row one step and Home/End send it to the top or bottom; focus stays on the handle and the new position is announced.", zh: "行只能从其手柄移动。手柄聚焦时，Up/Down 将行移动一步，Home/End 将其送到顶部或底部；焦点保持在手柄上并播报新位置。" },
    },
    {
      title: "Motion",
      body: { en: "The dragged row scales to 1.025. With reduced motion rows jump into place without scaling.", zh: "被拖动的行放大到 1.025。在减少动态效果下，行跳入位置而不放大。" },
    },
  ],
  api: [
    {
      name: "SortableStack",
      description: { en: "Drag-to-reorder list. Items need a string `id`.", zh: "拖动重排列表。项需要字符串 `id`。" },
      props: [
        { name: "items", type: "T[]", description: { en: "Controlled rows in order.", zh: "受控的行，按顺序。" } },
        { name: "defaultItems", type: "T[]", default: "[]", description: { en: "Initial rows when uncontrolled.", zh: "非受控时的初始行。" } },
        { name: "onItemsChange", type: "(items: T[]) => void", description: { en: "Called with the new order after a drag, key move or undo.", zh: "在拖动、按键移动或撤销后以新顺序调用。" } },
        {
          name: "getItemLabel",
          type: "(item: T) => string",
          required: true,
          description: { en: "Readable name per row, used in handle labels and announcements.", zh: "每行的可读名称，用于手柄标签和播报。" },
        },
        {
          name: "children",
          type: "(items: T[]) => ReactNode",
          required: true,
          description: { en: "Render the rows in their current order.", zh: "按当前顺序渲染行。" },
        },
        { name: "label", type: "string", default: `"Sortable list"`, description: { en: "Accessible name of the list.", zh: "列表的无障碍名称。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Lock the order; handles are disabled and rows can't be dragged.", zh: "锁定顺序；手柄禁用且行不能拖动。" } },
        { name: "showUndo", type: "boolean", default: "true", description: { en: "Render the Undo pill under the list.", zh: "在列表下渲染 Undo 药丸。" } },
        { name: "footer", type: "ReactNode", description: { en: "Extra content under the list, inside the stack's context.", zh: "列表下的额外内容，位于堆栈的上下文内。" } },
        { name: "className", type: "string", description: { en: "Merged onto the wrapper.", zh: "合并到包装器上。" } },
      ],
    },
    {
      name: "SortableStackItem",
      description: { en: "One row.", zh: "一行。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "The item's id.", zh: "项的 id。" } },
        { name: "className", type: "string", description: { en: "Merged onto the row.", zh: "合并到行上。" } },
        { name: "style", type: "CSSProperties", description: { en: "Inline style for the row.", zh: "行的内联样式。" } },
        { name: "children", type: "ReactNode", description: { en: "Handle and content.", zh: "手柄和内容。" } },
      ],
      dataAttributes: [{ name: "data-dragging", description: { en: "Present while the row is dragged.", zh: "行被拖动时存在。" } }],
    },
    {
      name: "SortableStackHandle",
      description: { en: "Grip button that starts the drag and owns keyboard reordering. Labelled with the row's name and position.", zh: "启动拖动并负责键盘重排的抓握按钮。以行的名称和位置标注。" },
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: "grip icon", description: { en: "Replace the grip icon.", zh: "替换抓握图标。" } }],
    },
    { name: "SortableStackContent", description: { en: "Content area of a row.", zh: "行的内容区域。" }, extends: "div", props: [] },
    {
      name: "SortableStackUndo",
      description: { en: "Restores the order from before the last move. Hidden until there is something to undo.", zh: "恢复上次移动前的顺序。在无可撤销内容前隐藏。" },
      extends: "button",
      props: [],
      dataAttributes: [{ name: "data-visible", description: { en: "Present while an undo is available.", zh: "可撤销时存在。" } }],
    },
    {
      name: "useSortableStack",
      description: { en: "Order and actions for custom controls. Use inside `SortableStack`.", zh: "自定义控件的顺序和操作。在 `SortableStack` 内使用。" },
      props: [
        { name: "ids", type: "string[]", description: { en: "Current order of ids.", zh: "id 的当前顺序。" } },
        { name: "moveItem", type: `(id: string, by: -1 | 1 | "first" | "last") => void`, description: { en: "Move a row; undoable.", zh: "移动一行；可撤销。" } },
        { name: "undo", type: "() => void", description: { en: "Restore the previous order.", zh: "恢复上一个顺序。" } },
        { name: "canUndo", type: "boolean", description: { en: "Whether an undo is available.", zh: "是否有可用的撤销。" } },
        { name: "disabled", type: "boolean", description: { en: "Whether the stack is disabled.", zh: "堆栈是否禁用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
