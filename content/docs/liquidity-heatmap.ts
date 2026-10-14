import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { LiquidityHeatmap } from "@/components/ui/liquidity-heatmap"`,
    code: `<LiquidityHeatmap
  label="BTC-USD liquidity"
  unit="BTC"
  snapshots={[
    { id: 1, label: "14:00", price: 64210, levels: [{ price: 64200, size: 12 }, { price: 64220, size: 40 }] },
    { id: 2, label: "14:01", price: 64215, levels: [{ price: 64200, size: 9 }, { price: 64220, size: 38 }] },
  ]}
/>`,
  },
  examples: [
    {
      id: "custom-data",
      title: "Custom Data",
      description: "Each snapshot is one column: resting `levels` per price plus an optional traded `price` for the trace.",
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "`lowColor` is thin liquidity and `highColor` the deepest walls; cells blend between them and fade in with size.",
    },
    {
      id: "gamma",
      title: "Gamma",
      description: "`gamma` below 1 lifts thin levels so they stay visible next to large walls; 1 is linear.",
    },
    {
      id: "no-trace",
      title: "No Trace",
      description: "`showTrace={false}` hides the traded-price line.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the plot, then the arrow keys move between time columns and price rows, `Home` / `End` jump to the first or last column and `Esc` clears.",
    },
    {
      title: "Motion",
      body: "Columns sweep in from the left and the price trace draws itself on mount; with reduced motion both appear at once.",
    },
  ],
  api: [
    {
      name: "LiquidityHeatmap",
      extends: "div",
      props: [
        {
          name: "snapshots",
          type: "{ id: string | number; label: string; levels: { price: number; size: number }[]; price?: number }[]",
          required: true,
          description: "One column per moment, oldest first. Duplicate ids and invalid levels are dropped; duplicate prices are summed.",
        },
        { name: "label", type: "string", default: `"Liquidity heatmap"`, description: "Accessible name." },
        { name: "height", type: "number", default: "320", description: "Height in px, including the time axis." },
        { name: "lowColor", type: "string", default: `"var(--chart-1, var(--primary))"`, description: "Colour of thin liquidity." },
        { name: "highColor", type: "string", default: `"var(--chart-3, var(--warning))"`, description: "Colour of the deepest walls." },
        { name: "gamma", type: "number", default: "0.6", description: "Exponent applied to size / max." },
        { name: "showTrace", type: "boolean", default: "true", description: "Draw the traded-price line." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show the thin-to-deep scale and price key." },
        { name: "formatPrice", type: "(price: number) => string", default: "2 decimals", description: "Price axis and tooltip." },
        { name: "formatSize", type: "(size: number) => string", default: "formatCompact", description: "Sizes in the tooltip and legend." },
        { name: "unit", type: "string", description: "Unit after sizes, e.g. `BTC`." },
      ],
    },
    {
      name: "LiquidityHeatmapLegend",
      description: "The scale shown under the chart, for use on its own.",
      extends: "div",
      props: [
        { name: "lowColor", type: "string", default: `"var(--chart-1, var(--primary))"`, description: "Must match the chart." },
        { name: "highColor", type: "string", default: `"var(--chart-3, var(--warning))"`, description: "Must match the chart." },
        { name: "stops", type: "number[]", default: "[0, 0.25, 0.5, 0.75, 1]", description: "Gradient stops." },
        { name: "max", type: "number", description: "Deepest size, printed after “Deep”." },
        { name: "formatSize", type: "(size: number) => string", default: "formatCompact", description: "Formats `max`." },
        { name: "unit", type: "string", description: "Unit after `max`." },
      ],
    },
    {
      name: "generateLiquiditySnapshots",
      description: "Deterministic demo data: `generateLiquiditySnapshots(count, options)`.",
      props: [
        { name: "count", type: "number", required: true, description: "Number of snapshots (first argument)." },
        { name: "seed", type: "number", default: "3", description: "Random seed." },
        { name: "start", type: "number", default: "100", description: "Starting price." },
        { name: "step", type: "number", default: "0.5", description: "Price band size. Snapshot `price` is rounded to its precision (at least 2 decimals)." },
        { name: "bands", type: "number", default: "24", description: "Number of price bands." },
        { name: "startTime", type: "number", default: "Date.UTC(2026, 0, 15, 14, 0)", description: "First snapshot time (ms)." },
        { name: "interval", type: "number", default: "60000", description: "Time between snapshots (ms)." },
        { name: "rand", type: "() => number", description: "Custom random source; overrides `seed`." },
      ],
    },
    {
      name: "buildLiquidityModel",
      description: "The normalising step behind the chart: `(snapshots) => { columns, prices, maximum }`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
