import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { CandlestickChart, generateCandles } from "@/components/ui/candlestick-chart"`,
    code: `<CandlestickChart candles={generateCandles(40)} label="ACME one-minute candles" />`,
  },
  examples: [
    {
      id: "daily",
      title: "Daily Candles",
      description: "Pass `formatTime` and `formatPrice` for your interval and currency; `time` is any increasing number, here a UTC day.",
    },
    {
      id: "without-volume",
      title: "Without Volume",
      description: "`showVolume={false}` gives the whole plot to price; the volume pane is also empty when candles have no `volume`.",
    },
    {
      id: "compact",
      title: "Compact",
      description: "`showReadout={false}` drops the OHLC header for small cards; a smaller `height` keeps it tight.",
    },
    {
      id: "last-price",
      title: "Last Price",
      description: "`lastPrice` moves the dashed last-price line off the final close, e.g. for an after-hours quote. It turns green or red against the previous close.",
    },
    {
      id: "volume-ratio",
      title: "Volume Ratio",
      description: "`volumeRatio` sets the share of the plot used by the volume pane (default `0.2`). Past 60 candles the bars tighten automatically.",
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
      description: "OHLC candlestick chart with volume pane, crosshair and last-price line.",
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
        { name: "time", type: "number", required: true, description: "Unique, ordered key: a timestamp (ms) or any increasing number." },
        { name: "open", type: "number", required: true, description: "Opening price." },
        { name: "high", type: "number", required: true, description: "Highest price." },
        { name: "low", type: "number", required: true, description: "Lowest price." },
        { name: "close", type: "number", required: true, description: "Closing price." },
        { name: "volume", type: "number", description: "Traded volume." },
      ],
    },
    {
      name: "generateCandles",
      description: "Deterministic random-walk candles for demos and tests: `generateCandles(count, options?)`.",
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
