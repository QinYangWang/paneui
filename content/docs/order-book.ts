import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { OrderBook } from "@/components/ui/order-book"`,
    code: `<OrderBook
  baseSymbol="ETH"
  bids={[{ price: 3412.0, size: 2.4 }, { price: 3411.5, size: 5.1 }]}
  asks={[{ price: 3412.5, size: 1.8 }, { price: 3413.0, size: 3.6 }]}
/>`,
  },
  composition: `OrderBook
├── OrderBookHeader
├── OrderBookSide side="ask"
├── OrderBookSpread
├── OrderBookSide side="bid"
├── OrderBookBalance
└── OrderBookDepthSummary`,
  examples: [
    {
      id: "custom-composition",
      title: "Custom Composition",
      description: "Pass parts as children to choose what renders; here just the two sides and the spread.",
    },
    {
      id: "default-active",
      title: "Default Active Level",
      description: "`defaultActiveLevel` inspects a level on load: it and every better level on its side are highlighted and totalled.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "`activeLevel` / `onActiveLevelChange` track the inspected level, and `onLevelSelect` makes rows buttons, e.g. to fill an order ticket.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Every row is focusable (a button when `onLevelSelect` is set); focusing a row inspects it like hovering does. The spread and depth summary are live regions.",
    },
    {
      title: "Motion",
      body: "Rows slide into place when prices shift, depth bars spring to their new size and a row flashes green or red when its size grows or shrinks. With reduced motion, rows and the last-price arrow cross-fade instead of moving.",
    },
  ],
  api: [
    {
      name: "OrderBook",
      description: "Root card and context. Without children it renders every part in the order above.",
      extends: "div",
      props: [
        { name: "bids", type: "{ price: number; size: number }[]", required: true, description: "Buy levels in any order; duplicates are merged." },
        { name: "asks", type: "{ price: number; size: number }[]", required: true, description: "Sell levels in any order." },
        { name: "levels", type: "number", default: "8", description: "Nearest levels shown per side." },
        { name: "lastPrice", type: "number", default: "mid price", description: "Last trade, shown in the spread row with an up/down arrow." },
        { name: "label", type: "string", default: `"Order book"`, description: "Accessible name." },
        { name: "baseSymbol", type: "string", default: `""`, description: "Size unit in the header and summary." },
        { name: "quoteSymbol", type: "string", default: `"USD"`, description: "Price unit in the header and summary." },
        { name: "formatPrice", type: "(v: number) => string", default: "2 decimals", description: "Formats prices." },
        { name: "formatSize", type: "(v: number) => string", default: "formatCompact", description: "Formats sizes and totals." },
        {
          name: "activeLevel",
          type: `{ side: "bid" | "ask"; price: number } | null`,
          description: "Controlled inspected level, addressed by price so it survives updates.",
        },
        { name: "defaultActiveLevel", type: `{ side: "bid" | "ask"; price: number } | null`, default: "null", description: "Initially inspected level." },
        { name: "onActiveLevelChange", type: "(level) => void", description: "Called on hover, focus and leave." },
        {
          name: "onLevelSelect",
          type: `(level: { price: number; size: number; total: number }, side: "bid" | "ask") => void`,
          description: "Makes rows clickable buttons.",
        },
        { name: "children", type: "ReactNode", description: "Custom composition of parts." },
      ],
    },
    { name: "OrderBookHeader", description: "Price / Size / Total column labels.", extends: "div", props: [] },
    {
      name: "OrderBookSide",
      description: "One side's rows with cumulative depth bars. Asks render best-last so they meet the spread.",
      extends: "ul",
      props: [{ name: "side", type: `"bid" | "ask"`, required: true, description: "Which side to render." }],
      dataAttributes: [{ name: "data-side", description: "`bid` or `ask`." }],
    },
    { name: "OrderBookSpread", description: "Last price with direction, spread and spread in bps.", extends: "div", props: [] },
    { name: "OrderBookBalance", description: "Bid vs ask share of the visible volume, as a meter.", extends: "div", props: [] },
    {
      name: "OrderBookDepthSummary",
      description: "Size, average price and notional to sweep through the inspected level.",
      extends: "div",
      props: [],
    },
    {
      name: "useOrderBook",
      description: "Reads the root context (normalised `bids` / `asks`, `spread`, `mid`, `active`, formatters…) to build your own parts.",
      props: [],
    },
    {
      name: "generateOrderBook",
      description: "Deterministic demo book: `generateOrderBook(rand, options)` returns `{ bids, asks }`.",
      props: [
        { name: "rand", type: "() => number", required: true, description: "Random source (first argument), e.g. `seededRandom(8)`." },
        { name: "mid", type: "number", default: "100", description: "Mid price." },
        { name: "tick", type: "number", default: "0.5", description: "Price step between levels." },
        { name: "levels", type: "number", default: "12", description: "Levels per side." },
        { name: "baseSize", type: "number", default: "2", description: "Typical size per level." },
      ],
    },
  ],
} satisfies ComponentDoc
