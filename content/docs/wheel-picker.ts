import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { WheelPicker } from "@/components/ui/wheel-picker"`,
    code: `<WheelPicker aria-label="Size" options={["S", "M", "L"]} defaultValue="M" />`,
  },
  composition: `WheelPickerGroup (optional)
└── WheelPicker`,
  examples: [
    {
      id: "single",
      title: "Single Wheel",
      description: "On its own a wheel has its own raised surface. Options can be strings or `{ value, label }` objects; `defaultValue` makes it uncontrolled.",
    },
    {
      id: "disabled-options",
      title: "Disabled Options",
      description: "Options with `disabled: true` are struck through, and the drum never rests on them: it nudges to the nearest enabled row.",
    },
    {
      id: "visible-count",
      title: "Rows and Height",
      description: "`visibleCount` sets how many rows show through the window (odd numbers look best) and `itemHeight` the row height in px.",
    },
    {
      id: "form",
      title: "In a Form",
      description: "Give each wheel a `name` to submit its value through a hidden input. `WheelPickerGroup` passes `visibleCount` and `itemHeight` down.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the wheel and stops scrolling, dragging and keys." },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The wheel is a `listbox`: Up/Down move one row, PageUp/PageDown a window, Home/End jump to the ends. Touch and trackpads scroll natively with momentum; mouse users can drag and fling.",
    },
    {
      title: "Motion",
      body: "Rows sit on a 3D drum that turns with the scroll position. With reduced motion the drum is flat, rows slide straight, and keyboard or click jumps are instant.",
    },
    {
      title: "Related",
      body: "Other pickers: [Color Picker](/docs/color-picker), [Date Range Picker](/docs/date-range-picker).",
    },
  ],
  api: [
    {
      name: "WheelPicker",
      description: "One iOS-style wheel.",
      extends: "div",
      props: [
        {
          name: "options",
          type: "readonly (string | { value: string; label: ReactNode; textValue?: string; disabled?: boolean })[]",
          required: true,
          description: "Rows of the wheel. `textValue` is the accessible text when `label` isn't a string.",
        },
        { name: "value", type: "string", description: "Controlled selected value." },
        { name: "defaultValue", type: "string", description: "Initial value when uncontrolled. Defaults to the first option." },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Fires once the drum settles on a new row (after momentum, snap, a click or a key).",
        },
        {
          name: "visibleCount",
          type: "number",
          default: "5 (or the group's)",
          description: "Rows visible through the window.",
        },
        { name: "itemHeight", type: "number", default: "36 (or the group's)", description: "Row height in px." },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the wheel and block interaction." },
        { name: "name", type: "string", description: "Name of a hidden input carrying the value, for forms." },
        { name: "aria-label", type: "string", description: "Accessible name for the listbox. Always set one." },
      ],
      dataAttributes: [{ name: "data-disabled", description: "Present when `disabled`." }],
    },
    {
      name: "WheelPickerGroup",
      description: "Lays several wheels side by side on one raised surface with a single selection band.",
      extends: "div",
      props: [
        { name: "itemHeight", type: "number", default: "36", description: "Row height for every wheel inside." },
        { name: "visibleCount", type: "number", default: "5", description: "Visible rows for every wheel inside." },
      ],
    },
  ],
} satisfies ComponentDoc
