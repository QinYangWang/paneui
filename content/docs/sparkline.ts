import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Small inline chart that shows a trend.", "zh": "在行内显示趋势。"},
  usage: {
    imports: `import { Sparkline } from "@/components/ui/sparkline"`,
    code: `<Sparkline values={[12, 14, 13, 17, 19, 22]} label="Revenue, up 83%" className="h-8 w-24 text-success" />`,
  },
  examples: [
    { id: "variants", title: { en: "Variants", zh: "样式" },  },
    { id: "gaps", title: { en: "Gaps", zh: "缺失数据" },  },
  ],
  notes: [
    { title: "Colour and size", body: "The chart draws in `currentColor`, so tint it with a text token (`text-success`, `text-chart-1`). It stretches to its box, so size it with `h-*` and `w-*` (default 36px tall, full width)." },
    { title: "Missing data", body: "`null`, `undefined` and `NaN` are gaps. `bridge` joins the known points either side with a faint dashed line (bars get a faint stub), `break` leaves the space empty and `zero` plots 0. A series with no points, or one point, draws a flat dashed baseline, plus a dot for the point." },
    { title: "Accessibility", body: "With `label` it is an `img` with that name; without one it is decorative (`aria-hidden`). Put the number it summarises in text next to it." },
  ],
  api: [
    {
      name: "Sparkline",
      extends: "svg",
      props: [
        { name: "values", type: "readonly (number | null | undefined)[]", required: true, description: "The series, oldest first. `null`, `undefined` and `NaN` are missing points." },
        { name: "gap", type: `"bridge" | "break" | "zero"`, default: `"bridge"`, description: "How missing points draw." },
        { name: "variant", type: `"area" | "line" | "bar"`, default: `"area"`, description: "Shape." },
        { name: "label", type: "string", description: "Accessible summary. Omit to make the chart decorative." },
        { name: "animate", type: "boolean", default: "true", description: "Draw in on mount (always off under reduced motion)." },
      ],
    },
  ],
} satisfies ComponentDoc
