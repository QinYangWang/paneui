import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TabStrip, TabStripItem } from "@/components/ui/tab-strip"`,
    code: `<TabStrip value={active} onValueChange={setActive} order={order} onReorder={setOrder} onClose={close}>
  {order.map((id) => (
    <TabStripItem key={id} value={id} icon={<FileIcon />}>{titles[id]}</TabStripItem>
  ))}
</TabStrip>`,
  },
  composition: `TabStrip
└── TabStripItem`,
  examples: [
    { id: "pill", title: "Pill", description: "Use `pill` for panel tabs inside a surface." },
    { id: "overflow", title: "Overflow", description: "Use `indicator` to mark tabs with unsaved changes." },
  ],
  notes: [
    { title: "Reorder", body: "Pass `order` and `onReorder` and render children in that order to enable dragging; with reduced motion tabs move instantly. On touch screens a swipe scrolls the strip instead, so dragging is off and tabs and close buttons grow to 32px and 24px targets. Without them the strip is static." },
    { title: "Overflow", body: "Extra tabs scroll sideways and the selected tab is kept in view." },
    { title: "Closing", body: "With `onClose`, tabs show a close button on hover (always on the selected tab), close on middle click, and on ⌫ / Delete when focused. Set `closable={false}` on a tab to keep it." },
    { title: "Keyboard", body: "The strip is a `tablist`. ← / → move and select, Home / End jump to the ends, and Enter or Space selects." },
  ],
  api: [
    {
      name: "TabStrip",
      extends: "div",
      props: [
        { name: "value", type: "string | null", description: "Selected tab (controlled)." },
        { name: "defaultValue", type: "string | null", description: "Initial tab (uncontrolled)." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called when a tab is selected." },
        { name: "order", type: "string[]", description: "Tab values in display order; enables drag to reorder with `onReorder`." },
        { name: "onReorder", type: "(order: string[]) => void", description: "Called with the new order while dragging." },
        { name: "onClose", type: "(value: string) => void", description: "Shows close buttons and handles middle click / Delete." },
        { name: "variant", type: `"default" | "pill"`, default: `"default"`, description: "Raised card (document tabs on the window band) or fill (panel tabs)." },
        { name: "actions", type: "ReactNode", description: "Pinned after the scrolling tabs." },
      ],
    },
    {
      name: "TabStripItem",
      extends: "div",
      props: [
        { name: "value", type: "string", required: true, description: "Identifies the tab." },
        { name: "icon", type: "ReactNode", description: "Leading glyph, sized to 14px." },
        { name: "closable", type: "boolean", description: "Override whether this tab shows a close button." },
        { name: "indicator", type: "boolean", description: "Primary dot after the label." },
        { name: "disabled", type: "boolean", description: "Dim and skip the tab." },
      ],
      dataAttributes: [{ name: "data-selected", description: "Present on the selected tab." }],
    },
  ],
} satisfies ComponentDoc
