import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Charts how each part's share of a whole changes over time.", "zh": "展示各部分占比随时间的变化。"},
  usage: {
    imports: `import { CompositionChart } from "@/components/ui/composition-chart"`,
    code: `<CompositionChart
  label="Traffic mix"
  series={[
    { id: "organic", label: "Organic" },
    { id: "paid", label: "Paid" },
  ]}
  data={[
    { label: "Jan", values: { organic: 4200, paid: 3100 } },
    { label: "Feb", values: { organic: 4500, paid: 2900 } },
  ]}
/>`,
  },
  examples: [
    {
      id: "area",
      title: { en: "Area", zh: "面积图" },
    },
    {
      id: "default-hidden",
      title: { en: "Default Hidden", zh: "默认隐藏" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Focus the plot, then `ArrowLeft` / `ArrowRight` step through periods, `Home` / `End` jump to the ends and `Esc` clears. Legend pills are buttons with `aria-pressed`.", zh: "聚焦图表，然后 `ArrowLeft` / `ArrowRight` 逐期步进，`Home` / `End` 跳到两端，`Esc` 清除。图例胶囊是带 `aria-pressed` 的按钮。" },
    },
  ],
  api: [
    {
      name: "CompositionChart",
      description: { en: "100% stacked chart of each visible series' share per period. The last visible series can't be hidden.", zh: "每个可见系列每期占比的 100% 堆叠图。最后一个可见系列不能被隐藏。" },
      extends: "section",
      props: [
        {
          name: "series",
          type: "{ id: string; label: string; color?: string }[]",
          required: true,
          description: { en: "Series in stacking order (bottom first). Colours default to the chart palette.", zh: "按堆叠顺序排列的系列（底部在前）。颜色默认为图表调色板。" },
        },
        {
          name: "data",
          type: "{ label: string; values: Record<string, number> }[]",
          required: true,
          description: { en: "Raw values per period keyed by series id; missing values count as 0.", zh: "按系列 id 键控的每期原始值；缺失值计为 0。" },
        },
        { name: "mode", type: `"bar" | "area"`, default: `"bar"`, description: { en: "Stacked bars or stacked areas.", zh: "堆叠柱或堆叠面积。" } },
        { name: "label", type: "string", default: `"Composition chart"`, description: { en: "Accessible name.", zh: "无障碍名称。" } },
        { name: "height", type: "number", default: "260", description: { en: "Plot height in px, including the x axis.", zh: "图表高度（px），包括 x 轴。" } },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: { en: "Raw values in the tooltip.", zh: "提示中的原始值。" } },
        { name: "showLegend", type: "boolean", default: "true", description: { en: "Show the toggleable legend.", zh: "显示可切换图例。" } },
        { name: "defaultHidden", type: "string[]", description: { en: "Series hidden on first render.", zh: "首次渲染时隐藏的系列。" } },
        {
          name: "hidden",
          type: "string[]",
          description: { en: "Controlled hidden series ids. Replaces the HTML `hidden` attribute, which the chart does not forward.", zh: "受控的隐藏系列 id。替代 HTML `hidden` 属性，图表不会转发该属性。" },
        },
        { name: "onHiddenChange", type: "(hidden: string[]) => void", description: { en: "Called when a series is toggled.", zh: "切换系列时调用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
