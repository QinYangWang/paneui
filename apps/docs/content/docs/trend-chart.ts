import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Plots how values change over time.", "zh": "展示数值随时间的变化。"},
  usage: {
    imports: `import { TrendChart } from "@/components/ui/trend-chart"`,
    code: `<TrendChart
  series={[{ id: "pro", label: "Pro" }, { id: "team", label: "Team" }]}
  data={[{ label: "Jan", values: { pro: 120, team: 80 } }, { label: "Feb", values: { pro: 140, team: 95 } }]}
  variant="area"
  stacked
/>`,
  },
  examples: [{ id: "single-series", title: { en: "Single Series", zh: "单系列" },  }],
  notes: [
    { title: "Which chart", body: { en: "TrendChart plots absolute values over time. For shares of a whole over time use [Composition Chart](/docs/composition-chart); for parts of one total, [Donut Chart](/docs/donut-chart).", zh: "TrendChart 绘制随时间变化的绝对值。若要表示随时间变化的总量占比，请使用 [Composition Chart](/docs/composition-chart)；若要表示一个总量的各组成部分，请使用 [Donut Chart](/docs/donut-chart)。" } },
    { title: "Interaction", body: { en: "Hovering (or tapping) shows a crosshair and a tooltip with every series and the stack total. Legend items toggle series. A hidden data table mirrors the values for screen readers.", zh: "悬停（或点按）会显示十字准线和包含所有系列及堆叠总计的提示。图例项可切换系列。一个隐藏的数据表为屏幕阅读器镜像这些值。" } },
    { title: "Motion", body: { en: "The plot wipes in left to right when the variant or the number of points changes; under reduced motion it appears at once.", zh: "当变体或点的数量变化时，绘图从左到右擦入；在减少动态效果下会立即出现。" } },
  ],
  api: [
    {
      name: "TrendChart",
      extends: "figure",
      props: [
        { name: "series", type: "{ id: string; label: string; color?: string }[]", required: true, description: { en: "Series, drawn in chart-1… unless `color` is set.", zh: "系列，除非设置了 `color`，否则按 chart-1… 绘制。" } },
        { name: "data", type: "{ label: string; values: Record<string, number> }[]", required: true, description: { en: "Points, in order.", zh: "数据点，按顺序。" } },
        { name: "variant", type: `"area" | "line" | "bar"`, default: `"area"`, description: { en: "Mark.", zh: "标记。" } },
        { name: "stacked", type: "boolean", default: "false", description: { en: "Stack areas and bars.", zh: "堆叠面积和柱形。" } },
        { name: "height", type: "number", default: "240", description: { en: "Plot height in px.", zh: "绘图高度（px）。" } },
        { name: "formatValue", type: "(v: number) => string", description: { en: "Tooltip values.", zh: "提示中的值。" } },
        { name: "formatAxis", type: "(v: number) => string", description: { en: "Axis ticks (default compact).", zh: "轴刻度（默认紧凑）。" } },
        { name: "maxXLabels", type: "number", default: "6", description: { en: "Most x labels shown.", zh: "最多显示的 x 轴标签数。" } },
        { name: "showLegend", type: "boolean", default: "true", description: { en: "Legend toggles (only with 2+ series).", zh: "图例切换（仅 2 个及以上系列时）。" } },
        { name: "showYAxis", type: "boolean", default: "true", description: { en: "Value axis labels.", zh: "数值轴标签。" } },
        { name: "label", type: "string", description: { en: "Accessible name.", zh: "无障碍名称。" } },
      ],
    },
  ],
} satisfies ComponentDoc
