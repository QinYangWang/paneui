import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ReturnsCalendar } from "@/components/ui/returns-calendar"`,
    code: `<ReturnsCalendar
  label="Fund monthly returns"
  data={[
    { year: 2025, returns: [1.2, -0.8, 2.1, 0.4, -1.5, 3.0, 0.9, 1.1, -0.2, 0.6, 1.8, 0.3] },
    { year: 2026, returns: [0.7, 1.4, -2.2, 1.0, 0.5, -0.4, 2.3, 0.8, 1.1, null, null, null] },
  ]}
/>`,
  },
  composition: `ReturnsCalendar
├── ReturnsCalendarGrid
│   └── ReturnsCalendarTooltip
└── ReturnsCalendarSummary`,
  examples: [
    {
      id: "years-view",
      title: "Years View",
      description: "`defaultView=\"years\"` shows one tile per year with its compounded return. Use `view` / `onViewChange` to switch from outside.",
    },
    {
      id: "default-selection",
      title: "Default Selection",
      description: "`defaultSelection` picks a span of months; the summary compounds it. Click a cell to select, shift-click to extend.",
    },
    {
      id: "range-and-digits",
      title: "Range and Digits",
      description: "`range` fixes the move that gets full colour (so small returns stay pale) and `digits` sets decimals.",
    },
    {
      id: "custom-tooltip",
      title: "Custom Tooltip",
      description: "Compose the parts and pass `ReturnsCalendarTooltip` a function child that receives `title`, `value`, `note` and `kind`.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "In the months grid, the arrow keys move a month (left/right) or a year (up/down), `Home` / `End` jump to January or December, `Enter` or `Space` selects and `Esc` clears.",
    },
    {
      title: "Compounding",
      body: "Year totals and range summaries compound monthly returns (`∏(1 + r) − 1`) rather than adding them. Months set to `null` are skipped.",
    },
  ],
  api: [
    {
      name: "ReturnsCalendar",
      description: "Root and context. Without children it renders the grid with tooltip and the summary.",
      extends: "div",
      props: [
        {
          name: "data",
          type: "{ year: number; returns: (number | null)[] }[]",
          required: true,
          description: "Twelve monthly returns in percent per year; `null` = no data.",
        },
        { name: "label", type: "string", default: `"Monthly returns"`, description: "Accessible name." },
        { name: "view", type: `"months" | "years"`, description: "Controlled view." },
        { name: "defaultView", type: `"months" | "years"`, default: `"months"`, description: "Initial view." },
        { name: "onViewChange", type: `(view: "months" | "years") => void`, description: "Called when the view changes." },
        {
          name: "selection",
          type: "{ start: { year: number; month: number }; end?: { year: number; month: number } } | null",
          description: "Controlled selected span. `month` is 0–11.",
        },
        { name: "defaultSelection", type: "same as selection", default: "null", description: "Initially selected span." },
        { name: "onSelectionChange", type: "(selection) => void", description: "Called when the selection changes." },
        { name: "range", type: "number", default: "largest monthly move", description: "|return| that maps to full colour strength." },
        { name: "digits", type: "number", default: "1", description: "Decimal places on cells and tooltips." },
        { name: "children", type: "ReactNode", description: "Custom composition of parts." },
      ],
    },
    {
      name: "ReturnsCalendarGrid",
      description: "Months table or year tiles, depending on the view.",
      props: [
        { name: "children", type: "ReactNode", default: "<ReturnsCalendarTooltip />", description: "Overlay rendered over the grid." },
        { name: "className", type: "string", description: "Classes for the outer element." },
      ],
    },
    {
      name: "ReturnsCalendarTooltip",
      props: [
        {
          name: "children",
          type: `(data: { title: string; value: number; note: string | null; kind: "month" | "year" }) => ReactNode`,
          description: "Custom body for the hovered cell.",
        },
        { name: "className", type: "string", description: "Classes for the tooltip." },
      ],
    },
    {
      name: "ReturnsCalendarSummary",
      description: "Compounded return, average month and hit rate for the selection, or for all data.",
      extends: "div",
      props: [],
    },
    { name: "useReturnsCalendar", description: "Reads the root context to build your own parts.", props: [] },
  ],
} satisfies ComponentDoc
