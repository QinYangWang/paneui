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
      body: { en: "The chart is focusable. `ArrowLeft` / `ArrowRight` step through candles, `Home` / `End` jump to the first or last, and `Escape` clears the crosshair. The readout follows the inspected candle.", zh: "图表可聚焦。`ArrowLeft` / `ArrowRight` 逐步浏览蜡烛，`Home` / `End` 跳到第一个或最后一个，`Escape` 清除十字准线。读数跟随所检查的蜡烛。" },
    },
    {
      title: "Accessibility",
      body: { en: "The readout is a polite live region, and a visually hidden table lists every candle's time, OHLC and volume.", zh: "读数是礼貌的实时区域，视觉上隐藏的表格列出了每根蜡烛的时间、OHLC 和成交量。" },
    },
  ],
  api: [
    {
      name: "CandlestickChart",
      description: { en: "OHLC candlestick chart with volume pane, crosshair and last-price line. Past 60 candles the bars tighten automatically.", zh: "带成交量窗格、十字准线和最新价线的 OHLC 蜡烛图。超过 60 根蜡烛后，柱会自动收紧。" },
      extends: "div",
      props: [
        { name: "candles", type: "readonly Candle[]", required: true, description: { en: "Candles in time order.", zh: "按时间顺序的蜡烛。" } },
        { name: "label", type: "string", default: `"Candlestick chart"`, description: { en: "Accessible name for the chart and data table.", zh: "图表和数据表的无障碍名称。" } },
        { name: "height", type: "number", default: "320", description: { en: "Plot height in px, including the time row.", zh: "绘图区高度（px），包括时间行。" } },
        { name: "lastPrice", type: "number", description: { en: "Price on the last-price line; defaults to the last close.", zh: "最新价线上的价格；默认为最新收盘价。" } },
        { name: "formatPrice", type: "(price: number) => string", default: "2-decimal en-US", description: { en: "Formats prices on the axis, readout and table.", zh: "格式化轴、读数和表格中的价格。" } },
        { name: "formatVolume", type: "(volume: number) => string", default: "formatCompact", description: { en: "Formats volume in the readout and table.", zh: "格式化读数和表格中的成交量。" } },
        { name: "formatTime", type: "(time: number) => string", default: "HH:mm (UTC)", description: { en: "Formats `time` on the axis, readout and table.", zh: "格式化轴、读数和表格中的 `time`。" } },
        { name: "showVolume", type: "boolean", default: "true", description: { en: "Show the volume pane.", zh: "显示成交量窗格。" } },
        { name: "showReadout", type: "boolean", default: "true", description: { en: "Show the OHLC readout above the chart.", zh: "在图表上方显示 OHLC 读数。" } },
        { name: "volumeRatio", type: "number", default: "0.2", description: { en: "Share of the plot height used by the volume pane.", zh: "成交量窗格占绘图区高度的比例。" } },
      ],
    },
    {
      name: "Candle",
      description: { en: "One candle.", zh: "一根蜡烛。" },
      props: [
        { name: "time", type: "number", required: true, description: { en: "Unique, ordered key, such as a timestamp (ms) or any increasing number.", zh: "唯一且有序的键，例如时间戳（毫秒）或任何递增数字。" } },
        { name: "open", type: "number", required: true, description: { en: "Opening price.", zh: "开盘价。" } },
        { name: "high", type: "number", required: true, description: { en: "Highest price.", zh: "最高价。" } },
        { name: "low", type: "number", required: true, description: { en: "Lowest price.", zh: "最低价。" } },
        { name: "close", type: "number", required: true, description: { en: "Closing price.", zh: "收盘价。" } },
        { name: "volume", type: "number", description: { en: "Traded volume.", zh: "成交量。" } },
      ],
    },
    {
      name: "generateCandles",
      description: { en: "`generateCandles(count, options?)` makes deterministic random-walk candles for demos and tests.", zh: "`generateCandles(count, options?)` 为演示和测试生成确定性的随机游走蜡烛。" },
      props: [
        { name: "count", type: "number", required: true, description: { en: "Number of candles.", zh: "蜡烛数量。" } },
        { name: "seed", type: "number", default: "7", description: { en: "Random seed.", zh: "随机种子。" } },
        { name: "start", type: "number", default: "100", description: { en: "First open price.", zh: "第一个开盘价。" } },
        { name: "startTime", type: "number", default: "Date.UTC(2026, 0, 5, 9, 30)", description: { en: "Time of the first candle (ms).", zh: "第一根蜡烛的时间（毫秒）。" } },
        { name: "interval", type: "number", default: "60_000", description: { en: "Milliseconds between candles.", zh: "蜡烛之间的毫秒数。" } },
        { name: "volatility", type: "number", default: "0.006", description: { en: "Relative size of each move.", zh: "每次移动的相对大小。" } },
      ],
    },
  ],
} satisfies ComponentDoc
