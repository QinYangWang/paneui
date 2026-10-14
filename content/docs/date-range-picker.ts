import type { ComponentDoc } from "@/lib/doc-types"

const POPOVER = "https://base-ui.com/react/components/popover"

export default {
  baseUi: { name: "Popover", href: POPOVER },
  usage: {
    imports: `import { DateRangePicker, DateRangePickerCalendar, DateRangePickerContent, DateRangePickerTrigger } from "@/components/ui/date-range-picker"`,
    code: `<DateRangePicker>
  <DateRangePickerTrigger />
  <DateRangePickerContent>
    <DateRangePickerCalendar />
  </DateRangePickerContent>
</DateRangePicker>`,
  },
  composition: `DateRangePicker
├── DateRangePickerTrigger
└── DateRangePickerContent
    ├── DateRangePickerPresets
    │   └── DateRangePickerPreset
    ├── DateRangePickerCalendar
    │   └── DateRangePickerGrid (one per month)
    └── DateRangePickerFooter
        ├── DateRangePickerSummary
        └── DateRangePickerClear`,
  examples: [
    {
      id: "inline",
      title: "Inline",
      description: "Drop the trigger and content to render the calendar in place. `unit` on the summary names the length (`day`/`days` here).",
    },
    {
      id: "unavailable-dates",
      title: "Unavailable Dates",
      description: "`min` blocks the past and `isDateDisabled` marks booked nights; a range can't span a disabled day. `closeOnComplete` closes once both ends are picked.",
    },
    {
      id: "locale",
      title: "Locale",
      description: "`locale` drives month, weekday and range formatting through `Intl`; `weekStartsOn` overrides the first weekday. `unit={null}` hides the length.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Control the range with `value` / `onValueChange` and the popup with `open` / `onOpenChange`, here limited to the last 90 days with `min` and `max`.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "Each month is a `grid` with one tab stop. Arrows move by day and week, Home/End to the week's edges, PageUp/PageDown by month (with Shift, by year). Enter or Space picks the start, then the end; while choosing the end the range previews.",
    },
    {
      title: "Motion",
      body: "Month titles and grids slide in the direction you page. With reduced motion they only cross-fade.",
    },
    {
      title: "Related",
      body: "Other pickers: [Wheel Picker](/docs/wheel-picker), [Color Picker](/docs/color-picker).",
    },
  ],
  api: [
    {
      name: "DateRangePicker",
      description: "Range state plus the popover root. Dates are local-midnight `Date`s.",
      extends: "Base UI Popover.Root",
      extendsHref: `${POPOVER}#root`,
      props: [
        { name: "value", type: "{ from?: Date; to?: Date }", description: "Controlled range." },
        { name: "defaultValue", type: "{ from?: Date; to?: Date }", default: "{}", description: "Initial range when uncontrolled." },
        { name: "onValueChange", type: "(range: DateRange) => void", description: "Called on every pick, clear or preset." },
        { name: "locale", type: "string", default: "the browser's", description: "BCP 47 locale for names and formatting." },
        {
          name: "weekStartsOn",
          type: "number",
          default: "the locale's",
          description: "First column: `0` Sunday … `6` Saturday.",
        },
        { name: "numberOfMonths", type: "1 | 2", default: "1", description: "Months shown side by side." },
        { name: "min", type: "Date", description: "Earliest selectable day." },
        { name: "max", type: "Date", description: "Latest selectable day." },
        { name: "isDateDisabled", type: "(date: Date) => boolean", description: "Extra rule for unavailable days." },
        { name: "closeOnComplete", type: "boolean", default: "false", description: "Close the popover once both ends are picked." },
      ],
    },
    {
      name: "DateRangePickerTrigger",
      description: "Raised pill with a calendar icon and the formatted range (`Intl.formatRange`).",
      extends: "Base UI Popover.Trigger",
      extendsHref: `${POPOVER}#trigger`,
      props: [
        { name: "placeholder", type: "string", default: `"Pick dates"`, description: "Shown while nothing is selected." },
        {
          name: "formatOptions",
          type: "Intl.DateTimeFormatOptions",
          default: `{ month: "short", day: "numeric", year: "numeric" }`,
          description: "How the range is formatted.",
        },
      ],
      dataAttributes: [{ name: "data-placeholder", description: "Present while showing the placeholder." }],
    },
    {
      name: "DateRangePickerContent",
      description: "The library `PopoverContent` with tighter padding and auto width.",
      extends: "PopoverContent",
      extendsHref: "/docs/popover",
      props: [{ name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Trigger edge the panel lines up with." }],
    },
    {
      name: "DateRangePickerCalendar",
      description: "Month titles, previous/next buttons and one grid per visible month.",
      extends: "div",
      props: [],
    },
    {
      name: "DateRangePickerGrid",
      description: "One month's day grid with roving focus. Used by the calendar; render it yourself for custom layouts.",
      extends: "div",
      props: [
        { name: "month", type: "Date", required: true, description: "Any day in the month to show." },
        { name: "hideOutsideDays", type: "boolean", default: "false", description: "Leave days of neighbouring months blank." },
      ],
      dataAttributes: [
        { name: "data-selected", description: "On a day button that is the start or end." },
        { name: "data-in-range", description: "On days between start and end." },
        { name: "data-preview-end", description: "On the hovered or focused end while choosing." },
        { name: "data-outside", description: "On days from a neighbouring month." },
      ],
    },
    {
      name: "DateRangePickerSummary",
      description: "\"Mar 3 – 9 · 6 nights\", or a prompt for the next pick. Announced politely.",
      extends: "p",
      props: [
        {
          name: "unit",
          type: "[string, string] | null",
          default: `["night", "nights"]`,
          description: "Singular and plural for the length; `null` hides it.",
        },
        { name: "formatOptions", type: "Intl.DateTimeFormatOptions", default: `{ month: "short", day: "numeric" }`, description: "How the range is formatted." },
      ],
    },
    { name: "DateRangePickerFooter", description: "Row under the calendar, separated by a hairline.", extends: "div", props: [] },
    {
      name: "DateRangePickerClear",
      description: "Clears the range. Disabled while nothing is selected.",
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: `"Clear"`, description: "Button label." }],
    },
    { name: "DateRangePickerPresets", description: "Vertical group of presets, labelled `Presets`.", extends: "div", props: [] },
    {
      name: "DateRangePickerPreset",
      description: "Quick range button; `aria-pressed` when it matches the selection.",
      extends: "button",
      props: [
        {
          name: "range",
          type: "DateRange | (() => DateRange)",
          required: true,
          description: "The range to apply. A function is evaluated at click time, e.g. for \"Last 7 days\".",
        },
      ],
    },
    {
      name: "useDateRangePicker",
      description: "Picker state and actions for custom parts. Use inside `DateRangePicker`.",
      props: [
        { name: "range", type: "DateRange", description: "Current range." },
        { name: "setRange", type: "(next: DateRange) => void", description: "Replace the range." },
        { name: "selectDate", type: "(date: Date) => void", description: "Pick a day as if clicked." },
        { name: "clear", type: "() => void", description: "Clear the range." },
        { name: "month", type: "Date", description: "First visible month." },
        { name: "setMonth", type: "(month: Date) => void", description: "Page to a month." },
        { name: "isDisabled", type: "(date: Date) => boolean", description: "Whether a day is unavailable." },
        { name: "close", type: "() => void", description: "Close the popover (no-op inline)." },
      ],
    },
  ],
} satisfies ComponentDoc
