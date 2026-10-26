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
    { title: "Tone", body: { en: "`StatCardDelta` takes its tone from the sign, success for a rise, destructive for a fall and neutral at zero. Pass `invert` for metrics where up is bad (churn, latency, errors). `StatCardSparkline` follows the same tone unless you give it a text colour.", zh: "`StatCardDelta` 根据符号决定色调：上升为 success，下降为 destructive，零为 neutral。对于上升为坏的指标（流失、延迟、错误），传入 `invert`。`StatCardSparkline` 沿用相同色调，除非你给它一个文本颜色。" } },
  ],
  api: [
    { name: "StatCard", extends: "div", description: { en: "Raised card (`rounded-xl`, `shadow-raised`, 16px padding) that shares the delta's tone with the sparkline.", zh: "凸起卡片（`rounded-xl`、`shadow-raised`、16px 内边距），将 delta 的色调与 sparkline 共享。" }, props: [], dataAttributes: [{ name: "data-tone", description: { en: "`positive`, `negative` or `neutral`, from the delta.", zh: "`positive`、`negative` 或 `neutral`，来自 delta。" } }] },
    {
      name: "StatCardDelta",
      extends: "Badge",
      props: [
        { name: "value", type: "number", required: true, description: { en: "The change; its sign sets the arrow.", zh: "变化量；其符号决定箭头。" } },
        { name: "unit", type: "string", default: `"%"`, description: { en: "Suffix after the number.", zh: "数字后的后缀。" } },
        { name: "invert", type: "boolean", default: "false", description: { en: "A rise is bad.", zh: "上升为坏。" } },
        { name: "precision", type: "number", default: "1", description: { en: "Decimal places.", zh: "小数位数。" } },
      ],
    },
    { name: "StatCardSparkline", extends: "Sparkline", description: { en: "A 96 × 36 sparkline tinted by the card's tone.", zh: "一个 96 × 36 的 sparkline，由卡片的色调着色。" }, props: [] },
    { name: "StatCardLabel, StatCardValue, StatCardHint, StatCardHeader, StatCardFooter", extends: "div", description: { en: "Layout parts. The value is `text-2xl` semibold with tabular numbers.", zh: "布局部件。值为 `text-2xl` 半粗体，使用等宽数字。" }, props: [] },
  ],
} satisfies ComponentDoc
