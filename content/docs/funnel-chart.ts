import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how much drops off at each step of a process.", "zh": "展示流程各阶段的流失。"},
  usage: {
    imports: `import { FunnelChart } from "@/components/ui/funnel-chart"`,
    code: `<FunnelChart
  label="Signup funnel"
  unit="users"
  stages={[
    { id: "visit", label: "Visited", value: 18420 },
    { id: "signup", label: "Signed up", value: 6210 },
    { id: "paid", label: "Upgraded", value: 612 },
  ]}
/>`,
  },
  examples: [
    {
      id: "single-color",
      title: { en: "Single Color", zh: "单色" },
    },
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
    },
    {
      id: "descriptions",
      title: { en: "Descriptions", zh: "说明" },
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Each stage is a tab stop; the arrow keys along the funnel's direction move to the next or previous stage. The tooltip shows share of the first stage, conversion from the previous one and the drop-off.",
    },
  ],
  api: [
    {
      name: "FunnelChart",
      extends: "section",
      props: [
        {
          name: "stages",
          type: "{ id: string; label: string; value: number; color?: string; description?: string }[]",
          required: true,
          description: "Stages from top to bottom. Duplicate ids and negative values are skipped.",
        },
        {
          name: "direction",
          type: `"vertical" | "horizontal"`,
          default: `"vertical"`,
          description: "Vertical stacks rows with a values column; horizontal flows left to right with a label row.",
        },
        { name: "label", type: "string", default: `"Funnel"`, description: "Accessible name." },
        { name: "unit", type: "string", description: "Noun after values in the tooltip." },
        { name: "formatValue", type: "(value: number) => string", default: "formatNumber", description: "Formats stage values." },
        {
          name: "size",
          type: "number",
          default: "56 vertical / 220 horizontal",
          description: "Vertical: height of each stage row. Horizontal: plot height.",
        },
        { name: "gap", type: "number", default: "4", description: "Gap between stages in px." },
        { name: "color", type: "string", description: "One colour for every stage, fading toward the background by depth (readable in light and dark)." },
        {
          name: "minRatio",
          type: "number",
          default: "0.08",
          description: "Smallest drawn thickness as a fraction of the largest stage.",
        },
        { name: "activeId", type: "string | null", description: "Controlled highlighted stage." },
        { name: "defaultActiveId", type: "string | null", description: "Initially highlighted stage." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called when the highlighted stage changes." },
      ],
    },
  ],
} satisfies ComponentDoc
