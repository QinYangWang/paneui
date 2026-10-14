import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { PriceTargetFan } from "@/components/ui/price-target-fan"`,
    code: `<PriceTargetFan
  symbol="ACME"
  history={[
    { date: "2026-09-25", price: 158.2 },
    { date: "2026-10-02", price: 161.9 },
    { date: "2026-10-09", price: 162.4 },
  ]}
  targets={[
    { key: "high", label: "High", price: 218 },
    { key: "average", label: "Average", price: 182 },
    { key: "low", label: "Low", price: 140 },
  ]}
/>`,
  },
  composition: `PriceTargetFan
├── PriceTargetFanHeader
└── PriceTargetFanPlot
    ├── PriceTargetFanAxes
    ├── PriceTargetFanTargets
    ├── PriceTargetFanHistory
    ├── PriceTargetFanNow
    ├── PriceTargetFanCursor
    └── PriceTargetFanTooltip (overlay)`,
  examples: [
    {
      id: "many-targets",
      title: "Many Targets",
      description: "Any number of targets works; the fan spans the extremes. Highest is green and lowest red by default, or set `color` per target.",
    },
    {
      id: "default-active",
      title: "Default Active",
      description: "`defaultActive={{ type: \"target\", key }}` highlights a target on load. `current` overrides the last close.",
    },
    {
      id: "custom-composition",
      title: "Custom Composition",
      description: "Render `PriceTargetFanPlot` on its own (no header) with your choice of SVG layers, and set the `horizon` date.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the plot, then `ArrowLeft` / `ArrowRight` scrub weekly history and continue into the projection (`Shift` moves 5 steps), `Home` / `End` jump to the first close or the horizon and `Esc` clears.",
    },
    {
      title: "Projection",
      body: "Each target is drawn as a straight line from the current price to its price at `horizon`. The header follows the middle target (usually the average) while scrubbing.",
    },
  ],
  api: [
    {
      name: "PriceTargetFan",
      description: "Root and context. Without children it renders the header and the plot.",
      extends: "div",
      props: [
        { name: "history", type: "{ date: string; price: number }[]", required: true, description: "Past closes, UTC `YYYY-MM-DD`." },
        {
          name: "targets",
          type: "{ key: string; label: string; price: number; analysts?: number; color?: string }[]",
          required: true,
          description: "Usually high, average and low.",
        },
        { name: "current", type: "number", default: "last history price", description: "Last traded price; the fan starts here." },
        { name: "horizon", type: "string", default: "12 months after the last close", description: "Target date, UTC `YYYY-MM-DD`. The header caption follows it (`6-month horizon`, `18-month horizon`)." },
        { name: "label", type: "string", default: `"Analyst price targets"`, description: "Accessible name." },
        { name: "symbol", type: "string", description: "Ticker shown in the header." },
        { name: "formatPrice", type: "(v: number) => string", default: "2 decimals", description: "Formats prices." },
        {
          name: "active",
          type: `{ type: "history"; index: number } | { type: "forecast"; t: number } | { type: "target"; key: string } | null`,
          description: "Controlled cursor: a history point, a fraction of the way to the horizon, or a target.",
        },
        { name: "defaultActive", type: "same as active", default: "null", description: "Initial cursor." },
        { name: "onActiveChange", type: "(active) => void", description: "Called while scrubbing or hovering a target." },
        { name: "children", type: "ReactNode", description: "Custom composition of parts." },
      ],
    },
    {
      name: "PriceTargetFanHeader",
      description: "Price at the cursor with change vs now, and the middle target's upside on the right.",
      extends: "div",
      props: [{ name: "children", type: "ReactNode", description: "Replaces the right-hand target summary." }],
    },
    {
      name: "PriceTargetFanPlot",
      description: "Interactive SVG plot. Children are SVG layers; `overlay` is HTML on top.",
      extends: "div",
      props: [
        { name: "height", type: "number", default: "260", description: "Plot height in px." },
        { name: "children", type: "ReactNode", default: "Axes, Targets, History, Now, Cursor", description: "SVG layers." },
        { name: "overlay", type: "ReactNode", default: "<PriceTargetFanTooltip />", description: "HTML overlay." },
      ],
    },
    { name: "PriceTargetFanAxes", description: "Price gridlines and date ticks.", props: [{ name: "className", type: "string", description: "" }] },
    { name: "PriceTargetFanHistory", description: "The past price line.", props: [{ name: "className", type: "string", description: "" }] },
    {
      name: "PriceTargetFanTargets",
      description: "The fan band, projection lines and target labels.",
      props: [{ name: "className", type: "string", description: "" }],
    },
    { name: "PriceTargetFanNow", description: "Marker at the current price.", props: [{ name: "className", type: "string", description: "" }] },
    { name: "PriceTargetFanCursor", description: "Vertical cursor line and dots.", props: [{ name: "className", type: "string", description: "" }] },
    {
      name: "PriceTargetFanTooltip",
      props: [
        { name: "children", type: "(active) => ReactNode", description: "Custom body for the active item." },
        { name: "className", type: "string", description: "Classes for the tooltip." },
      ],
    },
    { name: "usePriceTargetFan", description: "Root context: targets, history, `projectAt(t)`, active.", props: [] },
    { name: "usePriceTargetFanPlot", description: "Plot context inside `PriceTargetFanPlot`: scales `x` / `y`, plot box, `nowX` / `nowY`.", props: [] },
    {
      name: "generatePriceHistory",
      description: "Deterministic weekly closes: `generatePriceHistory(rand, options)`.",
      props: [
        { name: "rand", type: "() => number", required: true, description: "Random source (first argument)." },
        { name: "endDate", type: "string", default: `"2026-10-09"`, description: "Last close." },
        { name: "weeks", type: "number", default: "52", description: "Number of weekly closes." },
        { name: "start", type: "number", default: "100", description: "First price." },
        { name: "drift", type: "number", default: "0.004", description: "Average weekly change." },
        { name: "vol", type: "number", default: "0.035", description: "Weekly volatility." },
      ],
    },
  ],
} satisfies ComponentDoc
