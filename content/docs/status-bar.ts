import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { StatusBar } from "@/components/ui/status-bar"`,
    code: `<StatusBar
  title="API"
  label="API status, last 3 days"
  data={[
    { id: "d1", label: "Oct 11", status: "operational" },
    { id: "d2", label: "Oct 12", status: "degraded", description: "Slow p95" },
    { id: "d3", label: "Oct 13", status: "operational" },
  ]}
/>`,
  },
  examples: [
    {
      id: "custom-statuses",
      title: "Custom Statuses",
      description: "Use when your states differ from the defaults.",
    },
    {
      id: "hourly",
      title: "Hourly",
      description: "Use for short windows such as the last 24 hours.",
    },
    {
      id: "compact",
      title: "Compact",
      description: "Use when stacking several services in one view.",
    },
    {
      id: "no-data",
      title: "No Data",
      description: "Use for periods before monitoring started.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Focus the bars, then `ArrowLeft` / `ArrowRight` move between periods, `Home` / `End` jump to the ends and `Esc` clears. On touch, tapping a bar shows its tooltip.",
    },
    {
      title: "Motion",
      body: "With reduced motion the bars don't stagger in and the status dot doesn't pulse.",
    },
  ],
  api: [
    {
      name: "StatusBar",
      extends: "section",
      props: [
        {
          name: "data",
          type: "{ id: string; label: string; status: string; description?: string }[]",
          required: true,
          description: "One bar per period, oldest first. `status` is a key of `statuses`.",
        },
        {
          name: "statuses",
          type: "Record<string, { label: string; color: string; weight?: number | null }>",
          default: "STATUS_BAR_STATUSES",
          description: "Status definitions. Each `weight` feeds the uptime figure (1 up, 0 down, `null` not counted); `nodata` is left out of uptime. Defaults to `STATUS_BAR_STATUSES`.",
        },
        { name: "label", type: "string", default: `"Status history"`, description: "Accessible name; also the header title fallback." },
        { name: "title", type: "React.ReactNode", description: "Service name in the header row; any node (e.g. name plus a badge). Replaces the HTML `title` tooltip attribute." },
        { name: "height", type: "number", default: "36", description: "Bar height in px." },
        { name: "gap", type: "number", default: "3", description: "Gap between bars in px." },
        { name: "showHeader", type: "boolean", default: "true", description: "Show the status dot, title, current status and uptime." },
        { name: "showLegend", type: "boolean", default: "true", description: "Show counts per status that appears." },
        { name: "startLabel", type: "string", default: "`${n} periods ago`", description: "Caption under the left end." },
        { name: "endLabel", type: "string", default: `"Today"`, description: "Caption under the right end." },
        { name: "activeId", type: "string | null", description: "Controlled inspected period." },
        { name: "defaultActiveId", type: "string | null", description: "Initially inspected period." },
        { name: "onActiveChange", type: "(id: string | null) => void", description: "Called when the inspected period changes." },
      ],
    },
    {
      name: "STATUS_BAR_STATUSES",
      description: "The default `statuses` map. Spread it to add your own: `{ ...STATUS_BAR_STATUSES, partial: { … } }`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
