import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { VolumeProfile } from "@/components/ui/volume-profile"`,
    code: `<VolumeProfile
  label="ES session volume profile"
  data={[
    { price: 4510.25, volume: 120, buyVolume: 64 },
    { price: 4512.5, volume: 340, buyVolume: 150 },
    { price: 4515, volume: 90 },
  ]}
/>`,
  },
  examples: [
    {
      id: "single-tone",
      title: "Single Tone",
      description: "Leave out `buyVolume` for plain bars; `unit` and `formatPrice` set the labels.",
    },
    {
      id: "no-value-area",
      title: "No Value Area",
      description: "`valueArea={false}` hides the shaded band and the VAH / VAL guides, keeping only the point of control.",
    },
    {
      id: "bins",
      title: "Bins",
      description: "`bins` sets how many price rows the levels are grouped into. `showSummary={false}` drops the stat tiles.",
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "`color` tints the bars and value area, `pocColor` the point of control. `valueArea` takes any fraction, here 80%.",
    },
  ],
  notes: [
    {
      title: "How it's built",
      body: "Levels are binned into rows; the heaviest row is the point of control (POC), and the value area grows from it by adding the heavier neighbour until it holds `valueArea` of the volume.",
    },
    {
      title: "Keyboard",
      body: "Focus the plot, then `ArrowUp` / `ArrowDown` step through price rows (`Home` is the highest, `End` the lowest) and `Esc` clears.",
    },
  ],
  api: [
    {
      name: "VolumeProfile",
      extends: "section",
      props: [
        {
          name: "data",
          type: "{ price: number; volume: number; buyVolume?: number }[]",
          required: true,
          description: "Trades or levels. `buyVolume` (part of `volume`) draws a two-tone bar.",
        },
        { name: "label", type: "string", default: `"Volume profile"`, description: "Accessible name." },
        { name: "bins", type: "number", default: "24", description: "Number of price rows." },
        {
          name: "valueArea",
          type: "number | false",
          default: "0.7",
          description: "Share of volume inside the value area (0–1), or `false` to hide it.",
        },
        { name: "height", type: "number", default: "340", description: "Plot height in px." },
        { name: "unit", type: "string", default: `"contracts"`, description: "Volume unit in the summary and data table." },
        { name: "formatPrice", type: "(price: number) => string", default: "2 decimals", description: "Price labels." },
        { name: "formatVolume", type: "(volume: number) => string", default: "formatCompact", description: "Volume labels." },
        { name: "color", type: "string", default: `"var(--chart-1, var(--primary))"`, description: "Bar and value-area colour." },
        { name: "pocColor", type: "string", default: `"var(--chart-3, var(--warning))"`, description: "Point-of-control colour." },
        { name: "showSummary", type: "boolean", default: "true", description: "Show POC, VAH, VAL and total tiles." },
        { name: "activeId", type: "string | null", description: "Controlled inspected row (`row-<index>`, 0 = lowest price)." },
        { name: "defaultActiveId", type: "string | null", description: "Initially inspected row." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called when the inspected row changes." },
      ],
    },
    {
      name: "buildVolumeProfile",
      description: "The binning function behind the chart: `(data, bins, valueArea) => { rows, total, poc, vah, val }`. Use it to show the same numbers elsewhere.",
      props: [],
    },
  ],
} satisfies ComponentDoc
