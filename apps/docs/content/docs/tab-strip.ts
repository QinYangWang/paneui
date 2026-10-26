import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches, closes and reorders document tabs.", "zh": "切换、关闭或重排文档标签。"},
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
    { id: "pill", title: { en: "Pill", zh: "胶囊" },  },
    { id: "overflow", title: { en: "Overflow", zh: "溢出" },  },
  ],
  notes: [
    { title: "Reorder", body: { en: "Pass `order` and `onReorder` and render children in that order to enable dragging; with reduced motion tabs move instantly. On touch screens a swipe scrolls the strip instead, so dragging is off and tabs and close buttons grow to 32px and 24px targets. Without them the strip is static.", zh: "传入 `order` 和 `onReorder` 并按该顺序渲染子元素即可启用拖拽；在减少动态效果下标签即时移动。在触摸屏上滑动会滚动标签条，因此禁用拖拽，标签和关闭按钮增大到 32px 和 24px 的点击目标。不传这些属性时标签条为静态。" } },
    { title: "Overflow", body: { en: "Extra tabs scroll sideways and the selected tab is kept in view.", zh: "多余的标签横向滚动，选中的标签保持在视野内。" } },
    { title: "Long titles", body: { en: "A truncated title shows its full text in a hint below the tab after 300ms of hover. The pointer can move into the hint to select and copy the text; pressing the tab closes it. Pass `hint` to show other text, or `hint={false}` to turn it off.", zh: "被截断的标题在悬停 300ms 后于标签下方的提示中显示全文。指针可以移入提示以选择和复制文本；按标签会关闭它。传 `hint` 显示其他文本，或 `hint={false}` 关闭。" } },
    { title: "Closing", body: { en: "With `onClose`, tabs show a close button on hover (always on the selected tab), close on middle click, and on ⌫ / Delete when focused. Set `closable={false}` on a tab to keep it.", zh: "有 `onClose` 时，标签在悬停时显示关闭按钮（选中的标签始终显示），中键点击可关闭，聚焦时按 ⌫ / Delete 也可关闭。在标签上设 `closable={false}` 可保留它。" } },
    { title: "Keyboard", body: { en: "The strip is a `tablist`. ← / → move and select, Home / End jump to the ends, and Enter or Space selects.", zh: "标签条是 `tablist`。← / → 移动并选中，Home / End 跳到两端，Enter 或 Space 选中。" } },
  ],
  api: [
    {
      name: "TabStrip",
      extends: "div",
      props: [
        { name: "value", type: "string | null", description: { en: "Selected tab (controlled).", zh: "选中的标签（受控）。" } },
        { name: "defaultValue", type: "string | null", description: { en: "Initial tab (uncontrolled).", zh: "初始标签（非受控）。" } },
        { name: "onValueChange", type: "(value: string) => void", description: { en: "Called when a tab is selected.", zh: "选中标签时调用。" } },
        { name: "order", type: "string[]", description: { en: "Tab values in display order; enables drag to reorder with `onReorder`.", zh: "按显示顺序排列的标签值；与 `onReorder` 配合启用拖拽重排。" } },
        { name: "onReorder", type: "(order: string[]) => void", description: { en: "Called with the new order while dragging.", zh: "拖拽过程中以新顺序调用。" } },
        { name: "onClose", type: "(value: string) => void", description: { en: "Shows close buttons and handles middle click / Delete.", zh: "显示关闭按钮并处理中键点击 / Delete。" } },
        { name: "variant", type: `"default" | "pill"`, default: `"default"`, description: { en: "Raised card (document tabs on the window band) or fill (panel tabs).", zh: "凸起卡片（窗口带上的文档标签）或填充（面板标签）。" } },
        { name: "actions", type: "ReactNode", description: { en: "Pinned after the scrolling tabs.", zh: "固定在滚动标签之后。" } },
      ],
    },
    {
      name: "TabStripItem",
      extends: "div",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Identifies the tab.", zh: "标识该标签。" } },
        { name: "icon", type: "ReactNode", description: { en: "Leading glyph, sized to 14px.", zh: "前置字形，尺寸为 14px。" } },
        { name: "closable", type: "boolean", description: { en: "Override whether this tab shows a close button.", zh: "覆盖该标签是否显示关闭按钮。" } },
        { name: "indicator", type: "boolean", description: { en: "Primary dot after the label.", zh: "标签后的主圆点。" } },
        { name: "disabled", type: "boolean", description: { en: "Dim and skip the tab.", zh: "使其变暗并跳过该标签。" } },
        { name: "hint", type: "ReactNode | false", description: { en: "Full text shown on hover while the title is truncated. Defaults to the title; `false` turns it off.", zh: "标题被截断时悬停显示的全文。默认为标题；`false` 关闭。" } },
      ],
      dataAttributes: [{ name: "data-selected", description: { en: "Present on the selected tab.", zh: "在选中的标签上存在。" } }],
    },
  ],
} satisfies ComponentDoc
