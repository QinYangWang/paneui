import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Legend Below",
      description: "`legendPosition=\"bottom\"` stacks the legend under the ring; `maxSize` caps the ring's diameter.",
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "Give a segment `color` (any CSS colour, ideally a theme token) when the colour carries meaning.",
    },
    {
      id: "thin-ring",
      title: "Thin Ring",
      description: "Tune `thickness` and `gap` (viewBox units of a 200×200 box) and hide the legend with `showLegend={false}`.",
    },
    {
      id: "descriptions",
      title: "Descriptions",
      description: "A segment's `description` shows as a second line in the legend and is included in its accessible name and the data table.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "`activeId` and `onActiveChange` drive the highlighted segment from outside, e.g. to keep one always selected.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Each segment is a tab stop. Arrow keys cycle between segments, `Esc` blurs. The centre readout and legend follow the focused segment, and a hidden table mirrors the data for screen readers.",
    },
    {
      title: "Motion",
      body: "Segments draw in with a staggered spring and the hovered one thickens; with reduced motion they appear at once.",
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
        { name: "thickness", type: "number", default: "22", description: "Ring thickness in viewBox units." },
        { name: "gap", type: "number", default: "4", description: "Gap between segments in viewBox units." },
        {
          name: "formatValue",
          type: "(value: number) => string",
          default: "formatNumber",
          description: "Formats values in the centre, legend and tooltip.",
        },
        { name: "totalLabel", type: "string", default: `"Total"`, description: "Centre caption when nothing is hovered." },
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
