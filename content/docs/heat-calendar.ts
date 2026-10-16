import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { HeatCalendar } from "@/components/ui/heat-calendar"`,
    code: `<HeatCalendar
  label="Commit activity"
  unit="commits"
  weeks={12}
  data={[
    { date: "2026-10-12", count: 4 },
    { date: "2026-10-13", count: 9 },
  ]}
/>`,
  },
  composition: `HeatCalendar
├── HeatCalendarGrid
│   └── HeatCalendarTooltip
├── HeatCalendarSummary
└── HeatCalendarLegend`,
  examples: [
    {
      id: "monday-start",
      title: "Monday Start",
      description: "Set `weekStartsOn={1}` where weeks start on Monday.",
    },
    {
      id: "full-year",
      title: "Full Year",
      description: "Use 53 `weeks` for a full year, with `maxCount` so one busy day doesn't wash out the rest.",
    },
    {
      id: "custom-composition",
      title: "Custom Composition",
      description: "Arrange the parts yourself when you need another layout or your own tooltip body.",
    },
    {
      id: "default-selection",
      title: "Default Selection",
      description: "Pass `defaultSelection` to open with a range already totalled, such as the current week.",
    },
  ],
  notes: [
    {
      title: "Selecting ranges",
      body: "Drag across days with the pointer. With the keyboard, the arrow keys move between days, `Enter` or `Space` starts and then ends a range, `Shift` + arrows extend it and `Esc` clears.",
    },
    {
      title: "Dates",
      body: "All dates are UTC `YYYY-MM-DD` strings. Days after `endDate` render as empty placeholders, and the grid starts scrolled to the latest week.",
    },
  ],
  api: [
    {
      name: "HeatCalendar",
      description: "Root and context. Without children it renders the grid with tooltip, then summary and legend.",
      extends: "div",
      props: [
        { name: "data", type: "{ date: string; count: number }[]", required: true, description: "Daily counts; duplicates are summed." },
        { name: "endDate", type: "string", default: "latest date in data", description: "Last UTC day shown." },
        { name: "weeks", type: "number", default: "26", description: "Number of week columns." },
        { name: "weekStartsOn", type: "0 | 1", default: "0", description: "0 = Sunday, 1 = Monday." },
        { name: "unit", type: "string", default: `"contributions"`, description: "Noun after every count." },
        { name: "color", type: "string", default: `"var(--chart-4, var(--success))"`, description: "The single hue; strength maps to count." },
        { name: "maxCount", type: "number", default: "visible maximum", description: "Count that maps to the strongest level." },
        { name: "cellSize", type: "number", default: "12", description: "Cell size in px." },
        { name: "gap", type: "number", default: "3", description: "Gap between cells in px." },
        { name: "label", type: "string", default: `"Activity calendar"`, description: "Accessible name." },
        { name: "selection", type: "{ start: string; end?: string } | null", description: "Controlled selected range." },
        { name: "defaultSelection", type: "{ start: string; end?: string } | null", default: "null", description: "Initially selected range." },
        { name: "onSelectionChange", type: "(selection) => void", description: "Called when a range is started, finished or cleared." },
        { name: "children", type: "ReactNode", description: "Custom composition of parts." },
      ],
    },
    {
      name: "HeatCalendarGrid",
      description: "The scrollable day grid with month and weekday labels.",
      props: [
        { name: "children", type: "ReactNode", default: "<HeatCalendarTooltip />", description: "Overlay rendered over the grid." },
        { name: "className", type: "string", description: "Classes for the outer element." },
      ],
      dataAttributes: [
        { name: "data-level", description: "On each cell: 0 (empty) to 4 (strongest)." },
        { name: "data-selected", description: "On cells inside the selected range." },
      ],
    },
    {
      name: "HeatCalendarTooltip",
      props: [
        {
          name: "children",
          type: "(day: { date: string; time: number; count: number; level: number }) => ReactNode",
          description: "Custom body for the hovered or focused day.",
        },
        { name: "className", type: "string", description: "Classes for the tooltip." },
      ],
    },
    { name: "HeatCalendarSummary", description: "Total for the period, or for the selected range with active days and Clear.", extends: "div", props: [] },
    { name: "HeatCalendarLegend", description: "Less-to-more swatch scale.", extends: "div", props: [] },
    {
      name: "useHeatCalendar",
      description: "Reads the root context (days, totals, selection, colours) to build your own parts.",
      props: [],
    },
    {
      name: "generateHeatCalendarData",
      description: "Deterministic demo data with quieter weekends, called as `generateHeatCalendarData(rand, options)`.",
      props: [
        { name: "rand", type: "() => number", required: true, description: "Random source (first argument)." },
        { name: "endDate", type: "string", default: `"2026-10-13"`, description: "Last day generated." },
        { name: "days", type: "number", default: "371", description: "Number of days." },
        { name: "intensity", type: "number", default: "9", description: "Rough maximum daily count." },
      ],
    },
  ],
} satisfies ComponentDoc
