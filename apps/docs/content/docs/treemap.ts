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
      body: "Each tile is focusable. `Tab` in, then `ArrowRight` / `ArrowDown` and `ArrowLeft` / `ArrowUp` move between tiles and `Home` / `End` jump to the ends. Focus shows the tooltip.",
    },
    {
      title: "Accessibility",
      body: "Every tile has an `aria-label` with its group, value and share, and a visually hidden data table lists all tiles for screen readers. Labels hide on tiles too small to hold them.",
    },
  ],
  api: [
    {
      name: "Treemap",
      description: "Squarified treemap with one level of grouping, tooltip and legend.",
      extends: "section",
      props: [
        { name: "data", type: "readonly TreemapNode[]", required: true, description: "Top-level nodes; nodes with `children` become groups." },
        { name: "label", type: "string", default: `"Treemap"`, description: "Accessible name for the chart, legend and data table." },
        { name: "height", type: "number", default: "320", description: "Chart height in px; width fills the container." },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: "Formats values in the tooltip, labels and table." },
        { name: "gap", type: "number", default: "3", description: "Space between tiles in px." },
        { name: "groupPadding", type: "number", default: "3", description: "Inset of child tiles inside a group, in px." },
        { name: "radius", type: "number", default: "10", description: "Tile corner radius in px." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show the legend of top-level nodes." },
        { name: "activeId", type: "string | null", description: "Controlled highlighted tile." },
        { name: "defaultActiveId", type: "string | null", description: "Initially highlighted tile." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called on hover, focus and leave." },
      ],
    },
    {
      name: "TreemapNode",
      description: "One node of `data`.",
      props: [
        { name: "id", type: "string", required: true, description: "Stable id." },
        { name: "label", type: "string", required: true, description: "Tile and legend label." },
        { name: "value", type: "number", description: "Leaf value. Ignored when `children` is given (the group sums them)." },
        { name: "children", type: "TreemapNode[]", description: "Child leaves (one level is drawn)." },
        { name: "color", type: "string", description: "Overrides the palette colour; groups pass theirs down and shade each child a step darker." },
        { name: "description", type: "string", description: "Extra line in the tooltip." },
      ],
    },
    {
      name: "squarify",
      description: "`(values: readonly number[], rect: { x, y, w, h }) => Rect[]`. The squarified layout algorithm, exported for custom treemaps.",
      props: [],
    },
  ],
} satisfies ComponentDoc
