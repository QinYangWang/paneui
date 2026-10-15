import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TrendChart } from "@/components/ui/trend-chart"`,
    code: `<TrendChart
  series={[{ id: "pro", label: "Pro" }, { id: "team", label: "Team" }]}
  data={[{ label: "Jan", values: { pro: 120, team: 80 } }, { label: "Feb", values: { pro: 140, team: 95 } }]}
  variant="area"
  stacked
/>`,
  },
  examples: [{ id: "single-series", title: "Single Series", description: "Use `color` to pin a lone series to a colour that carries meaning, e.g. `var(--chart-5)`." }],
  notes: [
    { title: "Which chart", body: "TrendChart plots absolute values over time. For shares of a whole over time use [Composition Chart](/docs/composition-chart); for parts of one total, [Donut Chart](/docs/donut-chart)." },
    { title: "Interaction", body: "Hovering (or tapping) shows a crosshair and a tooltip with every series and the stack total. Legend items toggle series. A hidden data table mirrors the values for screen readers." },
    { title: "Motion", body: "The plot wipes in left to right when the variant or the number of points changes; under reduced motion it appears at once." },
  ],
  api: [
    {
      name: "TrendChart",
      extends: "figure",
      props: [
        { name: "series", type: "{ id: string; label: string; color?: string }[]", required: true, description: "Series, drawn in chart-1… unless `color` is set." },
        { name: "data", type: "{ label: string; values: Record<string, number> }[]", required: true, description: "Points, in order." },
        { name: "variant", type: `"area" | "line" | "bar"`, default: `"area"`, description: "Mark." },
        { name: "stacked", type: "boolean", default: "false", description: "Stack areas and bars." },
        { name: "height", type: "number", default: "240", description: "Plot height in px." },
        { name: "formatValue", type: "(v: number) => string", description: "Tooltip values." },
        { name: "formatAxis", type: "(v: number) => string", description: "Axis ticks (default compact)." },
        { name: "maxXLabels", type: "number", default: "6", description: "Most x labels shown." },
        { name: "showLegend", type: "boolean", default: "true", description: "Legend toggles (only with 2+ series)." },
        { name: "showYAxis", type: "boolean", default: "true", description: "Value axis labels." },
        { name: "label", type: "string", description: "Accessible name." },
      ],
    },
  ],
} satisfies ComponentDoc
