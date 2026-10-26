import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Compares parts of a total as sized tiles.", "zh": "用面积比较各部分的占比。"},
  usage: {
    imports: `import { Treemap } from "@/components/ui/treemap"`,
    code: `<Treemap
  label="Spend by category"
  data={[
    { id: "rent", label: "Rent", value: 1800 },
    { id: "food", label: "Food", value: 620 },
  ]}
/>`,
  },
  examples: [
    {
      id: "flat",
      title: { en: "Flat", zh: "扁平" },
      description: { en: "Use when the data has no natural groups.", zh: "适用于没有自然分组的数据。" },
    },
    {
      id: "custom-colors",
      title: { en: "Custom Colors", zh: "自定义颜色" },
    },
    {
      id: "spacing",
      title: { en: "Gap, Padding and Radius", zh: "间距、内边距与圆角" },
    },
    {
      id: "controlled",
      title: { en: "Controlled Active Tile", zh: "受控高亮区域" },
      description: { en: "Use when a list outside the chart should highlight the same tile.", zh: "适用于与外部列表联动高亮的图表。" },
    },
    {
      id: "compact",
      title: { en: "Compact", zh: "紧凑" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Each tile is focusable. `Tab` in, then `ArrowRight` / `ArrowDown` and `ArrowLeft` / `ArrowUp` move between tiles and `Home` / `End` jump to the ends. Focus shows the tooltip.", zh: "每个瓦片都可聚焦。用 `Tab` 进入，然后 `ArrowRight` / `ArrowDown` 和 `ArrowLeft` / `ArrowUp` 在瓦片间移动，`Home` / `End` 跳到两端。聚焦时显示提示。" },
    },
    {
      title: "Accessibility",
      body: { en: "Every tile has an `aria-label` with its group, value and share, and a visually hidden data table lists all tiles for screen readers. Labels hide on tiles too small to hold them.", zh: "每个瓦片都有一个 `aria-label`，包含其分组、值和占比，另有一个视觉隐藏的数据表为屏幕阅读器列出所有瓦片。过小无法容纳标签的瓦片上会隐藏标签。" },
    },
  ],
  api: [
    {
      name: "Treemap",
      description: { en: "Squarified treemap with one level of grouping, tooltip and legend.", zh: "带一级分组的 squarified 矩形树图，含提示和图例。" },
      extends: "section",
      props: [
        { name: "data", type: "readonly TreemapNode[]", required: true, description: { en: "Top-level nodes; nodes with `children` become groups.", zh: "顶层节点；带 `children` 的节点成为分组。" } },
        { name: "label", type: "string", default: `"Treemap"`, description: { en: "Accessible name for the chart, legend and data table.", zh: "图表、图例和数据表的无障碍名称。" } },
        { name: "height", type: "number", default: "320", description: { en: "Chart height in px; width fills the container.", zh: "图表高度（px）；宽度填满容器。" } },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: { en: "Formats values in the tooltip, labels and table.", zh: "格式化提示、标签和表格中的值。" } },
        { name: "gap", type: "number", default: "3", description: { en: "Space between tiles in px.", zh: "瓦片之间的间距（px）。" } },
        { name: "groupPadding", type: "number", default: "3", description: { en: "Inset of child tiles inside a group, in px.", zh: "分组内子瓦片的内缩（px）。" } },
        { name: "radius", type: "number", default: "10", description: { en: "Tile corner radius in px.", zh: "瓦片圆角半径（px）。" } },
        { name: "showLegend", type: "boolean", default: "true", description: { en: "Show the legend of top-level nodes.", zh: "显示顶层节点的图例。" } },
        { name: "activeId", type: "string | null", description: { en: "Controlled highlighted tile.", zh: "受控的高亮瓦片。" } },
        { name: "defaultActiveId", type: "string | null", description: { en: "Initially highlighted tile.", zh: "初始高亮的瓦片。" } },
        { name: "onActiveChange", type: "(id: string | null) => void", description: { en: "Called on hover, focus and leave.", zh: "在悬停、聚焦和离开时调用。" } },
      ],
    },
    {
      name: "TreemapNode",
      description: { en: "One node of `data`.", zh: "`data` 中的一个节点。" },
      props: [
        { name: "id", type: "string", required: true, description: { en: "Stable id.", zh: "稳定的 id。" } },
        { name: "label", type: "string", required: true, description: { en: "Tile and legend label.", zh: "瓦片和图例的标签。" } },
        { name: "value", type: "number", description: { en: "Leaf value. Ignored when `children` is given (the group sums them).", zh: "叶子值。提供 `children` 时忽略（由分组求和）。" } },
        { name: "children", type: "TreemapNode[]", description: { en: "Child leaves (one level is drawn).", zh: "子叶子（只绘制一层）。" } },
        { name: "color", type: "string", description: { en: "Overrides the palette colour; groups pass theirs down and shade each child a step darker.", zh: "覆盖调色板颜色；分组向下传递自己的颜色，并将每个子项加深一档。" } },
        { name: "description", type: "string", description: { en: "Extra line in the tooltip.", zh: "提示中的额外一行。" } },
      ],
    },
    {
      name: "squarify",
      description: { en: "`(values: readonly number[], rect: { x, y, w, h }) => Rect[]`. The squarified layout algorithm, exported for custom treemaps.", zh: "`(values: readonly number[], rect: { x, y, w, h }) => Rect[]`。squarified 布局算法，导出以供自定义矩形树图使用。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
