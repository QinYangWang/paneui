import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Sparkline } from "@/components/ui/sparkline"`,
    code: `<Sparkline values={[12, 14, 13, 17, 19, 22]} label="Revenue, up 83%" className="h-8 w-24 text-success" />`,
  },
  examples: [
    { id: "variants", title: "Variants", description: "`area` (default) adds a soft wash under the line, `line` is the stroke alone, `bar` draws a column per value with the latest one at full strength." },
  ],
  notes: [
    { title: "Colour and size", body: "The chart draws in `currentColor`, so tint it with a text token (`text-success`, `text-chart-1`). It stretches to its box: size it with `h-*` and `w-*` (default 36px tall, full width)." },
    { title: "Accessibility", body: "With `label` it is an `img` with that name; without one it is decorative (`aria-hidden`). Put the number it summarises in text next to it." },
  ],
  api: [
    {
      name: "Sparkline",
      extends: "svg",
      props: [
        { name: "values", type: "readonly number[]", required: true, description: "The series, oldest first." },
        { name: "variant", type: `"area" | "line" | "bar"`, default: `"area"`, description: "Shape." },
        { name: "label", type: "string", description: "Accessible summary. Omit to make the chart decorative." },
        { name: "animate", type: "boolean", default: "true", description: "Draw in on mount (always off under reduced motion)." },
      ],
    },
  ],
} satisfies ComponentDoc
