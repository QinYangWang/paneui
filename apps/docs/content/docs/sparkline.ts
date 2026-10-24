import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Small inline chart that shows a trend.", "zh": "在行内显示趋势。"},
  usage: {
    imports: `import { Sparkline } from "@/components/ui/sparkline"`,
    code: `<Sparkline values={[12, 14, 13, 17, 19, 22]} label="Revenue, up 83%" className="h-8 w-24 text-success" />`,
  },
  examples: [
    { id: "extrema", title: { en: "Minimum and maximum", zh: "最小值与最大值" } },
    { id: "variants", title: { en: "Variants", zh: "样式" },  },
    { id: "gaps", title: { en: "Gaps", zh: "缺失数据" },  },
  ],
  notes: [
    { title: "Colour and size", body: { en: "The chart draws in `currentColor`, so tint it with a text token (`text-success`, `text-chart-1`). It stretches to its box, so size it with `h-*` and `w-*` (default 36px tall, full width).", zh: "图表使用 `currentColor`，可在外层设置 `text-chart-1` 等颜色。使用 `h-*` 和 `w-*` 设置大小，默认高 36px、占满宽度。" } },
    { title: "Missing data", body: { en: "`null`, `undefined` and `NaN` are gaps. `bridge` joins the known points either side with a faint dashed line (bars get a faint stub), `break` leaves the space empty and `zero` plots 0. A series with no points, or one point, draws a flat dashed baseline, plus a dot for the point.", zh: "`null`、`undefined` 和 `NaN` 表示缺失值。`bridge` 用虚线连接两侧数据，`break` 留空，`zero` 按零绘制。没有数据时显示虚线基线；仅有一个值时额外显示一个点。" } },
    { title: "Accessibility", body: { en: "With `label` it is an `img` with that name; without one it is decorative (`aria-hidden`). Put the number it summarises in text next to it.", zh: "设置 `label` 后，图表具有图像角色和名称；否则使用 `aria-hidden` 隐藏。请在旁边用文字展示对应数值。" } },
  ],
  api: [
    {
      name: "Sparkline",
      extends: "svg",
      props: [
        { name: "extrema", type: "boolean", default: "false", description: { en: "Marks the first minimum and maximum on line and area charts.", zh: "标记折线图和面积图中首次出现的最小值与最大值。" } },
        { name: "values", type: "readonly (number | null | undefined)[]", required: true, description: { en: "The series, oldest first. `null`, `undefined` and `NaN` are missing points.", zh: "按时间顺序排列的数据。`null`、`undefined` 和 `NaN` 表示缺失值。" } },
        { name: "gap", type: `"bridge" | "break" | "zero"`, default: `"bridge"`, description: { en: "How missing points draw.", zh: "缺失值的绘制方式。" } },
        { name: "variant", type: `"area" | "line" | "bar"`, default: `"area"`, description: { en: "Shape.", zh: "图表形状。" } },
        { name: "label", type: "string", description: { en: "Accessible summary. Omit to make the chart decorative.", zh: "无障碍摘要。省略后图表仅作装饰。" } },
        { name: "animate", type: "boolean", default: "true", description: { en: "Draw in on mount (always off under reduced motion).", zh: "挂载时逐步显示；减少动态效果时关闭。" } },
      ],
    },
  ],
} satisfies ComponentDoc
