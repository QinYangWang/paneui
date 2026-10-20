import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Charts price movement over time with volume.", "zh": "展示价格走势与成交量。"},
  usage: {
    imports: `import { CandlestickChart, generateCandles } from "@/components/ui/candlestick-chart"`,
    code: `<CandlestickChart candles={generateCandles(40)} label="ACME one-minute candles" />`,
  },
  examples: [
    {
      id: "daily",
      title: { en: "Daily Candles", zh: "日线" },
    },
    {
      id: "without-volume",
      title: { en: "Without Volume", zh: "无成交量" },
    },
    {
      id: "compact",
      title: { en: "Compact", zh: "紧凑" },
    },
    {
      id: "last-price",
      title: { en: "Last Price", zh: "最新价格" },
    },
    {
      id: "volume-ratio",
      title: { en: "Volume Ratio", zh: "成交量占比" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The chart is focusable. `ArrowLeft` / `ArrowRight` step through candles, `Home` / `End` jump to the first or last, and `Escape` clears the crosshair. The readout follows the inspected candle.",
    },
    {
      title: "Accessibility",
      body: "The readout is a polite live region, and a visually hidden table lists every candle's time, OHLC and volume.",
    },
  ],
  api: [
    {
      name: "CandlestickChart",
      description: "OHLC candlestick chart with volume pane, crosshair and last-price line. Past 60 candles the bars tighten automatically.",
      extends: "div",
      props: [
        { name: "candles", type: "readonly Candle[]", required: true, description: "Candles in time order." },
        { name: "label", type: "string", default: `"Candlestick chart"`, description: "Accessible name for the chart and data table." },
        { name: "height", type: "number", default: "320", description: "Plot height in px, including the time row." },
        { name: "lastPrice", type: "number", description: "Price on the last-price line; defaults to the last close." },
        { name: "formatPrice", type: "(price: number) => string", default: "2-decimal en-US", description: "Formats prices on the axis, readout and table." },
        { name: "formatVolume", type: "(volume: number) => string", default: "formatCompact", description: "Formats volume in the readout and table." },
        { name: "formatTime", type: "(time: number) => string", default: "HH:mm (UTC)", description: "Formats `time` on the axis, readout and table." },
        { name: "showVolume", type: "boolean", default: "true", description: "Show the volume pane." },
        { name: "showReadout", type: "boolean", default: "true", description: "Show the OHLC readout above the chart." },
        { name: "volumeRatio", type: "number", default: "0.2", description: "Share of the plot height used by the volume pane." },
      ],
    },
    {
      name: "Candle",
      description: "One candle.",
      props: [
        { name: "time", type: "number", required: true, description: "Unique, ordered key, such as a timestamp (ms) or any increasing number." },
        { name: "open", type: "number", required: true, description: "Opening price." },
        { name: "high", type: "number", required: true, description: "Highest price." },
        { name: "low", type: "number", required: true, description: "Lowest price." },
        { name: "close", type: "number", required: true, description: "Closing price." },
        { name: "volume", type: "number", description: "Traded volume." },
      ],
    },
    {
      name: "generateCandles",
      description: "`generateCandles(count, options?)` makes deterministic random-walk candles for demos and tests.",
      props: [
        { name: "count", type: "number", required: true, description: "Number of candles." },
        { name: "seed", type: "number", default: "7", description: "Random seed." },
        { name: "start", type: "number", default: "100", description: "First open price." },
        { name: "startTime", type: "number", default: "Date.UTC(2026, 0, 5, 9, 30)", description: "Time of the first candle (ms)." },
        { name: "interval", type: "number", default: "60_000", description: "Milliseconds between candles." },
        { name: "volatility", type: "number", default: "0.006", description: "Relative size of each move." },
      ],
    },
  ],
} satisfies ComponentDoc
