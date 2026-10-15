import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { chartColor, ChartLegend, ChartLegendItem } from "@/components/ui/chart-utils"`,
    code: `<ChartLegend>
  <ChartLegendItem color={chartColor(0)} value="42%">Rent</ChartLegendItem>
</ChartLegend>`,
  },
  examples: [
    {
      id: "number",
      title: "Chart Number",
      description: "Use `ChartNumber` for headline values that change with the selection.",
    },
    {
      id: "tooltip",
      title: "Tooltip",
      description: "Use `ChartTooltip` when you build your own chart from the scales and the size hook.",
    },
    {
      id: "legend",
      title: "Legend",
      description: "Use `inactive` for series toggled off and `highlighted` for the hovered one.",
    },
    {
      id: "scales",
      title: "Scales and Ticks",
      description: "Use `niceDomain` before `scale.ticks()` so axes land on round numbers.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "`useChartTransition`, `ChartNumber` and `ChartTooltip` all become instant under reduced motion.",
    },
    {
      title: "Accessibility",
      body: "`ChartNumber` keeps the final value in a screen-reader-only span, `ChartTooltip` is a polite live region, and `ChartDataTable` renders an `sr-only` table mirror of a chart's data.",
    },
  ],
  api: [
    {
      name: "ChartNumber",
      description: "Number that springs between values.",
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: "Value to show." },
        { name: "format", type: "(value: number) => string", default: "formatNumber", description: "Formatter applied to every frame." },
      ],
    },
    {
      name: "ChartTooltip",
      description: "In-chart floating surface that follows a data point. Place it inside a positioned chart container; no portal.",
      extends: "motion.div",
      extendsHref: "https://motion.dev/docs/react-motion-component",
      props: [
        { name: "x", type: "number", required: true, description: "Anchor x in px, relative to the chart container." },
        { name: "y", type: "number", required: true, description: "Anchor y in px." },
        { name: "open", type: "boolean", required: true, description: "Show or hide the tooltip." },
        { name: "bounds", type: "{ width: number; height: number }", required: true, description: "Container size, used to keep the tooltip inside it." },
        { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"top"`, description: "Preferred side." },
        { name: "offset", type: "number", default: "12", description: "Gap from the anchor in px." },
        { name: "avoidCollisions", type: "boolean", default: "true", description: "Flip to the opposite side when the preferred side leaves the bounds." },
      ],
      dataAttributes: [{ name: "data-side", description: "The side actually used after flipping." }],
    },
    { name: "ChartTooltipTitle", extends: "div", props: [] },
    {
      name: "ChartTooltipRow",
      extends: "div",
      props: [
        { name: "label", type: "ReactNode", required: true, description: "Series name." },
        { name: "value", type: "ReactNode", required: true, description: "Formatted value, right-aligned." },
        { name: "color", type: "string", description: "Swatch colour before the label." },
      ],
    },
    {
      name: "ChartSwatch",
      extends: "span",
      props: [{ name: "color", type: "string", required: true, description: "CSS colour of the swatch." }],
    },
    { name: "ChartLegend", description: "Wrapping row of legend items.", extends: "div", props: [] },
    {
      name: "ChartLegendItem",
      description: "Legend entry, rendered as a button.",
      extends: "button",
      props: [
        { name: "color", type: "string", required: true, description: "Series colour." },
        { name: "inactive", type: "boolean", description: "Dimmed with a hollow swatch (series toggled off)." },
        { name: "highlighted", type: "boolean", description: "Emphasised because the matching mark is hovered." },
        { name: "value", type: "ReactNode", description: "Optional trailing value (share, count…)." },
      ],
      dataAttributes: [
        { name: "data-inactive", description: "Present when `inactive`." },
        { name: "data-highlighted", description: "Present when `highlighted`." },
      ],
    },
    {
      name: "ChartDataTable",
      description: "Screen-reader-only table mirror of a chart. Takes no other props.",
      props: [
        { name: "caption", type: "string", required: true, description: "Table caption." },
        { name: "columns", type: "readonly string[]", required: true, description: "Column headers." },
        { name: "rows", type: "readonly (readonly ReactNode[])[]", required: true, description: "Rows; the first cell is the row header." },
      ],
    },
    {
      name: "chartColor",
      description: "`chartColor(index)` returns the series colour, `--chart-1…5` first (falling back to semantic tokens), then blends for indexes past five. `CHART_COLORS` holds the base five.",
      props: [{ name: "index", type: "number", required: true, description: "Series index." }],
    },
    {
      name: "chartAlpha",
      description: "`chartAlpha(color, percent)` mixes a colour toward transparent for fills.",
      props: [
        { name: "color", type: "string", required: true, description: "Any CSS colour." },
        { name: "percent", type: "number", required: true, description: "Opacity, 0–100." },
      ],
    },
    {
      name: "onFill",
      description: "`onFill(fill)` returns a readable label colour for text drawn on that fill, white on dark fills, near-black on light ones (CSS relative colour). Set it as the inline `fill` and keep a `fill-white` class as the fallback for browsers without relative colour. Used by treemap, candlestick and funnel labels.",
      props: [{ name: "fill", type: "string", required: true, description: "The fill colour behind the label (any CSS colour or `var(--token)`)." }],
    },
    {
      name: "scaleLinear",
      description: "`scaleLinear(domain, range)` maps values to pixels; the result also has `domain`, `range`, `invert(px)` and `ticks(count = 5)`.",
      props: [
        { name: "domain", type: "readonly [number, number]", required: true, description: "Input extent." },
        { name: "range", type: "readonly [number, number]", required: true, description: "Output extent in px." },
      ],
    },
    {
      name: "scaleBand",
      description: "`scaleBand(count, range, padding)` returns the x of band `i`, plus `bandwidth`, `step` and `indexAt(px)`.",
      props: [
        { name: "count", type: "number", required: true, description: "Number of bands." },
        { name: "range", type: "readonly [number, number]", required: true, description: "Output extent in px." },
        { name: "padding", type: "number", default: "0.2", description: "Share (0–1) of each step left empty." },
      ],
    },
    {
      name: "niceDomain",
      description: "`niceDomain([lo, hi], count = 5)` rounds a domain outward to tidy tick boundaries.",
      props: [],
    },
    {
      name: "formatCompact / formatNumber / formatPercent",
      description: "`formatCompact(1284000)` → `1.3M`; `formatNumber` keeps up to 2 decimals; `formatPercent(share, digits = 1)` turns 0.42 into `42.0%`. `clamp(value, min, max)` and `seededRandom(seed)`, for deterministic demo data, are also exported.",
      props: [],
    },
    {
      name: "useChartSize",
      description: "`const [ref, size] = useChartSize()` observes an element's content box with ResizeObserver.",
      props: [{ name: "initial", type: "{ width: number; height: number }", default: "{ width: 0, height: 0 }", description: "Size before the first measure." }],
    },
    {
      name: "useChartTransition",
      description: "Returns the house chart spring (`CHART_SPRING`), or `{ duration: 0 }` under reduced motion.",
      props: [{ name: "delay", type: "number", default: "0", description: "Delay in seconds." }],
    },
    {
      name: "useActiveId",
      description: "`const [active, setActive] = useActiveId(value, defaultValue, onChange)` holds the controlled or uncontrolled active id shared by the charts.",
      props: [
        { name: "controlled", type: "T | null | undefined", description: "Controlled value; `undefined` means uncontrolled." },
        { name: "defaultValue", type: "T | null | undefined", description: "Initial value when uncontrolled." },
        { name: "onChange", type: "(id: T | null) => void", description: "Called on every change." },
      ],
    },
    { name: "useChartId", description: "`useChartId(prefix)` returns a DOM-safe id for SVG defs.", props: [] },
    { name: "useHoverCapable", description: "`true` when the device matches `(hover: hover)`, for hover-vs-tap tooltips.", props: [] },
  ],
} satisfies ComponentDoc
