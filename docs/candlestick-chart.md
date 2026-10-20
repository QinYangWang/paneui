# Candlestick Chart

> Charts price movement over time with volume.

Page: https://paneui.dev/docs/candlestick-chart/

## Installation

```bash
npx shadcn@latest add @paneui/candlestick-chart
```

Without the `@paneui` namespace in components.json:

```bash
npx shadcn@latest add https://paneui.dev/r/candlestick-chart.json
```

Packages: `motion`.

Registry items it builds on: `@paneui/theme`, `@paneui/chart-utils`.

## Usage

```tsx
import { CandlestickChart, generateCandles } from "@/components/ui/candlestick-chart"
```

```tsx
<CandlestickChart candles={generateCandles(40)} label="ACME one-minute candles" />
```

## Examples

### Daily Candles

```tsx
"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const DAY = 86_400_000
const CANDLES = generateCandles(30, { seed: 4, start: 412.5, startTime: Date.UTC(2026, 8, 1), interval: DAY, volatility: 0.018 })

const hkd = (p: number) => `HK$${p.toFixed(2)}`
const date = (t: number) => new Date(t).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" })

export default function CandlestickChartDaily() {
  return <CandlestickChart candles={CANDLES} label="Tencent daily candles, September" formatPrice={hkd} formatTime={date} height={280} className="max-w-2xl" />
}
```

### Without Volume

```tsx
"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(36, { seed: 21, start: 1.0842, volatility: 0.0012 })

export default function CandlestickChartWithoutVolume() {
  return (
    <CandlestickChart
      candles={CANDLES}
      label="EUR/USD one-minute candles"
      formatPrice={(p) => p.toFixed(4)}
      showVolume={false}
      height={260}
      className="max-w-2xl"
    />
  )
}
```

### Compact

```tsx
"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(24, { seed: 9, start: 61250, volatility: 0.004, interval: 300_000 })

export default function CandlestickChartCompact() {
  const last = CANDLES[CANDLES.length - 1]
  return (
    <div className="flex w-full max-w-sm flex-col gap-2 rounded-2xl bg-card p-4 shadow-raised">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">BTC · 5m</span>
        <span className="text-sm font-semibold tabular-nums">${Math.round(last.close).toLocaleString("en-US")}</span>
      </div>
      <CandlestickChart
        candles={CANDLES}
        label="Bitcoin five-minute candles"
        formatPrice={(p) => `${Math.round(p / 1000)}k`}
        showReadout={false}
        showVolume={false}
        height={140}
      />
    </div>
  )
}
```

### Last Price

```tsx
"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(32, { seed: 15, start: 228.4 })
const AFTER_HOURS = CANDLES[CANDLES.length - 1].close * 0.988

export default function CandlestickChartLastPrice() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-2">
      <CandlestickChart candles={CANDLES} label="AAPL with after-hours quote" lastPrice={AFTER_HOURS} height={280} />
      <p className="text-xs text-muted-foreground tabular-nums">After hours: {AFTER_HOURS.toFixed(2)}</p>
    </div>
  )
}
```

### Volume Ratio

```tsx
"use client"

import { CandlestickChart, generateCandles } from "@/registry/base-nova/ui/candlestick-chart"

const CANDLES = generateCandles(90, { seed: 33, start: 54.1, volatility: 0.009 })

export default function CandlestickChartVolumeRatio() {
  return <CandlestickChart candles={CANDLES} label="Ninety one-minute candles" volumeRatio={0.35} height={320} className="max-w-2xl" />
}
```

## Keyboard

The chart is focusable. `ArrowLeft` / `ArrowRight` step through candles, `Home` / `End` jump to the first or last, and `Escape` clears the crosshair. The readout follows the inspected candle.

## Accessibility

The readout is a polite live region, and a visually hidden table lists every candle's time, OHLC and volume.

## API Reference

### CandlestickChart

OHLC candlestick chart with volume pane, crosshair and last-price line. Past 60 candles the bars tighten automatically. Also accepts every prop of `div`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `candles` (required) | `readonly Candle[]` | — | Candles in time order. |
| `label` | `string` | `"Candlestick chart"` | Accessible name for the chart and data table. |
| `height` | `number` | `320` | Plot height in px, including the time row. |
| `lastPrice` | `number` | — | Price on the last-price line; defaults to the last close. |
| `formatPrice` | `(price: number) => string` | `2-decimal en-US` | Formats prices on the axis, readout and table. |
| `formatVolume` | `(volume: number) => string` | `formatCompact` | Formats volume in the readout and table. |
| `formatTime` | `(time: number) => string` | `HH:mm (UTC)` | Formats `time` on the axis, readout and table. |
| `showVolume` | `boolean` | `true` | Show the volume pane. |
| `showReadout` | `boolean` | `true` | Show the OHLC readout above the chart. |
| `volumeRatio` | `number` | `0.2` | Share of the plot height used by the volume pane. |

### Candle

One candle.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `time` (required) | `number` | — | Unique, ordered key, such as a timestamp (ms) or any increasing number. |
| `open` (required) | `number` | — | Opening price. |
| `high` (required) | `number` | — | Highest price. |
| `low` (required) | `number` | — | Lowest price. |
| `close` (required) | `number` | — | Closing price. |
| `volume` | `number` | — | Traded volume. |

### generateCandles

`generateCandles(count, options?)` makes deterministic random-walk candles for demos and tests.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `count` (required) | `number` | — | Number of candles. |
| `seed` | `number` | `7` | Random seed. |
| `start` | `number` | `100` | First open price. |
| `startTime` | `number` | `Date.UTC(2026, 0, 5, 9, 30)` | Time of the first candle (ms). |
| `interval` | `number` | `60_000` | Milliseconds between candles. |
| `volatility` | `number` | `0.006` | Relative size of each move. |
