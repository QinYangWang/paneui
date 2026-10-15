import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"`,
    code: `<ResizablePanelGroup direction="horizontal" autoSaveId="workspace">
  <ResizablePanel id="sidebar" defaultSize="240px" minSize="200px" collapsible>…</ResizablePanel>
  <ResizableHandle />
  <ResizablePanel id="main">…</ResizablePanel>
</ResizablePanelGroup>`,
  },
  composition: `ResizablePanelGroup
├── ResizablePanel
├── ResizableHandle
└── ResizablePanel`,
  examples: [
    { id: "collapsible", title: "Collapsible", description: "Use for sidebars that can be dragged shut or toggled from a button." },
    { id: "with-handle", title: "With Handle", description: "Use where the divider is easy to miss." },
  ],
  notes: [
    { title: "Sizes", body: "Sizes are percentages of the group, or pixel strings like `\"240px\"` for `defaultSize`, `minSize`, `maxSize` and `collapsedSize` (converted with the group's current size). Panels without `defaultSize` share what is left." },
    { title: "Persistence", body: "`autoSaveId` stores sizes and collapsed state in `localStorage[\"resizable:<id>\"]` when a drag, key press or collapse settles. The saved layout is used only while the set of panel ids is unchanged." },
    { title: "Keyboard", body: "The divider is a focusable `separator`. Arrow keys move it 2% (10% with Shift), Enter collapses or expands the collapsible neighbour, double click resets every panel to its default." },
    { title: "Motion", body: "Panels follow the pointer exactly while dragging; collapse and expand ease `flex-grow` over 200ms, instant with reduced motion. The primary guide on the divider appears after a 150ms hover." },
  ],
  api: [
    {
      name: "ResizablePanelGroup",
      description: "Flex container that owns the sizes.",
      extends: "div",
      props: [
        { name: "direction", type: `"horizontal" | "vertical"`, default: `"horizontal"`, description: "Lay panels out in a row or a column." },
        { name: "autoSaveId", type: "string", description: "Persist the layout under this key." },
        { name: "onLayout", type: "(sizes: number[]) => void", description: "Called with percentages whenever the layout settles." },
        { name: "handleRef", type: "Ref<ResizablePanelGroupHandle>", description: "Imperative handle with `collapse(id)`, `expand(id)`, `toggle(id)`, `isCollapsed(id)`, `getSizes()`, `setSizes(sizes)` and `reset()`." },
      ],
      dataAttributes: [{ name: "data-dragging", description: "Present while a divider is dragged." }],
    },
    {
      name: "ResizablePanel",
      extends: "div",
      props: [
        { name: "id", type: "string", description: "Stable id for the imperative API and saved layouts." },
        { name: "defaultSize", type: "number | `${number}px`", description: "Initial size." },
        { name: "minSize", type: "number | `${number}px`", default: "0", description: "Smallest size while dragging." },
        { name: "maxSize", type: "number | `${number}px`", default: "100", description: "Largest size while dragging." },
        { name: "collapsible", type: "boolean", default: "false", description: "Snap to `collapsedSize` when dragged past half of `minSize`." },
        { name: "collapsedSize", type: "number | `${number}px`", default: "0", description: "Size when collapsed." },
        { name: "onCollapsedChange", type: "(collapsed: boolean) => void", description: "Called when the panel collapses or expands." },
      ],
      dataAttributes: [{ name: "data-collapsed", description: "Present while collapsed." }],
    },
    {
      name: "ResizableHandle",
      extends: "div",
      props: [
        { name: "variant", type: `"line" | "hidden"`, default: `"line"`, description: "`hidden` drops the resting hairline; the guide still shows on hover and drag." },
        { name: "withHandle", type: "boolean", default: "false", description: "Show a grip in the middle." },
        { name: "keyboardStep", type: "number", default: "2", description: "Percent per arrow key press." },
      ],
      dataAttributes: [{ name: "data-active", description: "Present while this divider is dragged." }],
    },
  ],
} satisfies ComponentDoc
