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
      body: "Each segment is a tab stop. Arrow keys cycle between segments, `Esc` blurs. The centre readout and legend follow the focused segment, and a hidden table mirrors the data for screen readers.",
    },
    {
      title: "Motion",
      body: "With reduced motion, segments appear at once instead of drawing in.",
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
          description: "Slices in order. Non-positive values are skipped. `description` shows under the label in the legend and is read with the segment.",
        },
        { name: "label", type: "string", default: `"Donut chart"`, description: "Accessible name of the chart." },
        { name: "thickness", type: "number", default: "22", description: "Ring thickness in viewBox units (the box is 200×200)." },
        { name: "gap", type: "number", default: "4", description: "Gap between segments in viewBox units. Ends are rounded when every segment is long enough for round caps; otherwise all ends are square, so small segments never overlap their neighbours." },
        {
          name: "formatValue",
          type: "(value: number) => string",
          default: "formatNumber",
          description: "Formats values in the centre, legend and tooltip.",
        },
        { name: "totalLabel", type: "string", default: "the locale's", description: "Centre caption when nothing is hovered." },
        { name: "maxSize", type: "number", default: "240", description: "Max ring diameter in px; it shrinks with its container." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show the value / share legend." },
        {
          name: "legendPosition",
          type: `"side" | "bottom"`,
          default: `"side"`,
          description: "`side` sits beside the ring from the `sm` breakpoint.",
        },
        { name: "activeId", type: "string | null", description: "Controlled highlighted segment." },
        { name: "defaultActiveId", type: "string | null", description: "Initially highlighted segment." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called on hover, focus and leave." },
      ],
    },
  ],
} satisfies ComponentDoc
