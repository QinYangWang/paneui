import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { CompositionChart } from "@/components/ui/composition-chart"`,
    code: `<CompositionChart
  label="Traffic mix"
  series={[
    { id: "organic", label: "Organic" },
    { id: "paid", label: "Paid" },
  ]}
  data={[
    { label: "Jan", values: { organic: 4200, paid: 3100 } },
    { label: "Feb", values: { organic: 4500, paid: 2900 } },
  ]}
/>`,
  },
  examples: [
    {
      id: "area",
      title: "Area",
      description: "Use `mode=\"area\"` for many periods, where the trend matters more than any single one.",
    },
    {
      id: "default-hidden",
      title: "Default Hidden",
      description: "Use `defaultHidden` to start minor series switched off.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `hidden` with `onHiddenChange` to reset series from outside, like a Show all button.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the plot, then `ArrowLeft` / `ArrowRight` step through periods, `Home` / `End` jump to the ends and `Esc` clears. Legend pills are buttons with `aria-pressed`.",
    },
  ],
  api: [
    {
      name: "CompositionChart",
      description: "100% stacked chart of each visible series' share per period. The last visible series can't be hidden.",
      extends: "section",
      props: [
        {
          name: "series",
          type: "{ id: string; label: string; color?: string }[]",
          required: true,
          description: "Series in stacking order (bottom first). Colours default to the chart palette.",
        },
        {
          name: "data",
          type: "{ label: string; values: Record<string, number> }[]",
          required: true,
          description: "Raw values per period keyed by series id; missing values count as 0.",
        },
        { name: "mode", type: `"bar" | "area"`, default: `"bar"`, description: "Stacked bars or stacked areas." },
        { name: "label", type: "string", default: `"Composition chart"`, description: "Accessible name." },
        { name: "height", type: "number", default: "260", description: "Plot height in px, including the x axis." },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: "Raw values in the tooltip." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show the toggleable legend." },
        { name: "defaultHidden", type: "string[]", description: "Series hidden on first render." },
        {
          name: "hidden",
          type: "string[]",
          description: "Controlled hidden series ids. Replaces the HTML `hidden` attribute, which the chart does not forward.",
        },
        { name: "onHiddenChange", type: "(hidden: string[]) => void", description: "Called when a series is toggled." },
      ],
    },
  ],
} satisfies ComponentDoc
