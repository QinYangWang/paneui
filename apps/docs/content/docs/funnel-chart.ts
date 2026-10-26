import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how much drops off at each step of a process.", "zh": "展示流程各阶段的流失。"},
  usage: {
    imports: `import { FunnelChart } from "@/components/ui/funnel-chart"`,
    code: `<FunnelChart
  label="Signup funnel"
  unit="users"
  stages={[
    { id: "visit", label: "Visited", value: 18420 },
    { id: "signup", label: "Signed up", value: 6210 },
    { id: "paid", label: "Upgraded", value: 612 },
  ]}
/>`,
  },
  examples: [
    {
      id: "single-color",
      title: { en: "Single Color", zh: "单色" },
    },
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
    },
    {
      id: "descriptions",
      title: { en: "Descriptions", zh: "说明" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "Each stage is a tab stop; the arrow keys along the funnel's direction move to the next or previous stage. The tooltip shows share of the first stage, conversion from the previous one and the drop-off.", zh: "每一级都是一个 Tab 停靠点；沿漏斗方向的箭头键会移动到下一级或上一级。提示显示相对第一级的占比、相对上一级的转化率以及流失。" },
    },
  ],
  api: [
    {
      name: "FunnelChart",
      extends: "section",
      props: [
        {
          name: "stages",
          type: "{ id: string; label: string; value: number; color?: string; description?: string }[]",
          required: true,
          description: { en: "Stages from top to bottom. Duplicate ids and negative values are skipped.", zh: "从上到下的阶段。重复 id 和负值会被跳过。" },
        },
        {
          name: "direction",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: { en: "Vertical stacks rows with a values column; horizontal flows left to right with a label row.", zh: "垂直时堆叠行并带数值列；水平时从左到右排列并带标签行。" },
        },
        { name: "label", type: "string", default: `"Funnel"`, description: { en: "Accessible name.", zh: "无障碍名称。" } },
        { name: "unit", type: "string", description: { en: "Noun after values in the tooltip.", zh: "提示中数值后的名词。" } },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: { en: "Formats stage values.", zh: "格式化阶段数值。" } },
        {
          name: "size",
          type: "number",
          default: "56 vertical / 220 horizontal",
          description: { en: "Vertical: height of each stage row. Horizontal: plot height.", zh: "垂直：每个阶段行的高度。水平：绘图高度。" },
        },
        { name: "gap", type: "number", default: "4", description: { en: "Gap between stages in px.", zh: "阶段之间的间距，单位 px。" } },
        { name: "color", type: "string", description: { en: "One colour for every stage, fading toward the background by depth (readable in light and dark).", zh: "所有阶段使用一种颜色，按深度向背景渐隐（在浅色和深色模式下都可读）。" } },
        {
          name: "minRatio",
          type: "number",
          default: "0.08",
          description: { en: "Smallest drawn thickness as a fraction of the largest stage.", zh: "最小绘制厚度占最大阶段的比例。" },
        },
        { name: "activeId", type: "string | null", description: { en: "Controlled highlighted stage.", zh: "受控的高亮阶段。" } },
        { name: "defaultActiveId", type: "string | null", description: { en: "Initially highlighted stage.", zh: "初始高亮的阶段。" } },
        { name: "onActiveChange", type: "(id: string | null) => void", description: { en: "Called when the highlighted stage changes.", zh: "高亮阶段变化时调用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
