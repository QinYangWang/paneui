import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how parts make up a whole as a ring.", "zh": "展示各部分的占比。"},
  usage: {
    imports: `import { DonutChart } from "@/components/ui/donut-chart"`,
    code: `<DonutChart
  label="Revenue by plan"
  totalLabel="Revenue"
  segments={[
    { id: "pro", label: "Pro", value: 48200 },
    { id: "team", label: "Team", value: 26400 },
    { id: "free", label: "Free", value: 3100 },
  ]}
/>`,
  },
  examples: [
    {
      id: "legend-bottom",
      title: { en: "Legend Below", zh: "底部图例" },
    },
    {
      id: "custom-colors",
      title: { en: "Custom Colors", zh: "自定义颜色" },
    },
    {
      id: "thin-ring",
      title: { en: "Thin Ring", zh: "细环" },
    },
    {
      id: "descriptions",
      title: { en: "Descriptions", zh: "说明" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Each segment is a tab stop. Arrow keys cycle between segments, `Esc` blurs. The centre readout and legend follow the focused segment, and a hidden table mirrors the data for screen readers.", zh: "每个分段是一个 Tab 停靠点。方向键在分段间循环，`Esc` 失焦。中央读数和图例跟随聚焦的分段，隐藏的表格为屏幕阅读器镜像数据。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion, segments appear at once instead of drawing in.", zh: "启用减少动态效果时，分段立即出现而非绘制。" },
    },
  ],
  api: [
    {
      name: "DonutChart",
      extends: "div",
      props: [
        {
          name: "segments",
          type: "{ id: string; label: string; value: number; color?: string; description?: string }[]",
          required: true,
          description: { en: "Slices in order. Non-positive values are skipped. `description` shows under the label in the legend and is read with the segment.", zh: "按顺序的扇区。非正值会被跳过。`description` 显示在图例中标签下方，并与分段一起朗读。" },
        },
        { name: "label", type: "string", default: `"Donut chart"`, description: { en: "Accessible name of the chart.", zh: "图表的无障碍名称。" } },
        { name: "thickness", type: "number", default: "22", description: { en: "Ring thickness in viewBox units (the box is 200×200).", zh: "环形厚度，单位为 viewBox 单位（画布为 200×200）。" } },
        { name: "gap", type: "number", default: "4", description: { en: "Gap between segments in viewBox units. Ends are rounded when every segment is long enough for round caps; otherwise all ends are square, so small segments never overlap their neighbours.", zh: "分段之间的间隙，单位为 viewBox 单位。当所有分段都足够长以使用圆头端帽时，端点四舍五入；否则所有端点均为方形，因此小分段不会与相邻分段重叠。" } },
        {
          name: "formatValue",
          type: "(value: number) => string",
          default: "formatNumber",
          description: { en: "Formats values in the centre, legend and tooltip.", zh: "在中央、图例和提示中格式化值。" },
        },
        { name: "totalLabel", type: "string", default: "the locale's", description: { en: "Centre caption when nothing is hovered.", zh: "未悬停时的中央标题。" } },
        { name: "maxSize", type: "number", default: "240", description: { en: "Max ring diameter in px; it shrinks with its container.", zh: "环形最大直径，单位为 px；随容器缩小。" } },
        { name: "showLegend", type: "boolean", default: "true", description: { en: "Show the value / share legend.", zh: "显示值/占比图例。" } },
        {
          name: "legendPosition",
          type: `"side" | "bottom"`,
          default: `"side"`,
          description: { en: "`side` sits beside the ring from the `sm` breakpoint.", zh: "从 `sm` 断点起，`side` 位于环形旁边。" },
        },
        { name: "activeId", type: "string | null", description: { en: "Controlled highlighted segment.", zh: "受控高亮分段。" } },
        { name: "defaultActiveId", type: "string | null", description: { en: "Initially highlighted segment.", zh: "初始高亮分段。" } },
        { name: "onActiveChange", type: "(id: string | null) => void", description: { en: "Called on hover, focus and leave.", zh: "在悬停、聚焦和离开时调用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
