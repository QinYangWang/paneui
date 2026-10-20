import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Card for a key metric and how it changed.", "zh": "展示关键指标与变化。"},
  usage: {
    imports: `import {
  StatCard,
  StatCardDelta,
  StatCardFooter,
  StatCardHeader,
  StatCardHint,
  StatCardLabel,
  StatCardSparkline,
  StatCardValue,
} from "@/components/ui/stat-card"`,
    code: `<StatCard>
  <StatCardHeader>
    <StatCardLabel>Recurring revenue</StatCardLabel>
    <StatCardDelta value={12.4} />
  </StatCardHeader>
  <StatCardValue>$48,210</StatCardValue>
  <StatCardFooter>
    <StatCardHint>vs. last month</StatCardHint>
    <StatCardSparkline values={trend} />
  </StatCardFooter>
</StatCard>`,
  },
  composition: `StatCard
├── StatCardHeader
│   ├── StatCardLabel
│   └── StatCardDelta
├── StatCardValue
└── StatCardFooter
    ├── StatCardHint
    └── StatCardSparkline`,
  examples: [
    { id: "with-ticker", title: { en: "With Number Ticker", zh: "带滚动数值" }, description: { en: "Use for live numbers that change while the page is open.", zh: "适用于页面打开后持续变化的指标。" } },
  ],
  notes: [
    { title: "Tone", body: "`StatCardDelta` takes its tone from the sign, success for a rise, destructive for a fall and neutral at zero. Pass `invert` for metrics where up is bad (churn, latency, errors). `StatCardSparkline` follows the same tone unless you give it a text colour." },
  ],
  api: [
    { name: "StatCard", extends: "div", description: "Raised card (`rounded-xl`, `shadow-raised`, 16px padding) that shares the delta's tone with the sparkline.", props: [], dataAttributes: [{ name: "data-tone", description: "`positive`, `negative` or `neutral`, from the delta." }] },
    {
      name: "StatCardDelta",
      extends: "Badge",
      props: [
        { name: "value", type: "number", required: true, description: "The change; its sign sets the arrow." },
        { name: "unit", type: "string", default: `"%"`, description: "Suffix after the number." },
        { name: "invert", type: "boolean", default: "false", description: "A rise is bad." },
        { name: "precision", type: "number", default: "1", description: "Decimal places." },
      ],
    },
    { name: "StatCardSparkline", extends: "Sparkline", description: "A 96 × 36 sparkline tinted by the card's tone.", props: [] },
    { name: "StatCardLabel, StatCardValue, StatCardHint, StatCardHeader, StatCardFooter", extends: "div", description: "Layout parts. The value is `text-2xl` semibold with tabular numbers.", props: [] },
  ],
} satisfies ComponentDoc
