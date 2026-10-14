import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ArcPicker } from "@/components/ui/arc-picker"`,
    code: `<ArcPicker
  aria-label="Roast level"
  options={[
    { value: "light", label: "Light" },
    { value: "medium", label: "Medium" },
    { value: "dark", label: "Dark" },
  ]}
  defaultValue="medium"
/>`,
  },
  examples: [
    {
      id: "sides",
      title: "Sides",
      description: "`side` is the edge the arc bows toward. `top` and `bottom` scroll horizontally, `left` and `right` (the default) vertically.",
    },
    {
      id: "curve",
      title: "Curve and Density",
      description: "A larger `radius` gives a gentler curve; `visibleCount` and `itemSpacing` set how many labels fit and how far apart they sit.",
    },
    {
      id: "form",
      title: "In a Form",
      description: "`name` adds a hidden input carrying the selected value.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the arc and ignores wheel, drag and keys." },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "It is a `radiogroup` with one tab stop on the selected label. Arrow keys step to the previous or next enabled option, Home and End jump to the ends; disabled options are skipped. Mouse wheel and drag (with momentum) also move it.",
    },
    {
      title: "Motion",
      body: "Labels ride the arc on a spring and the selection pill stretches to the apex label's width. With reduced motion snaps and the pill resize are instant.",
    },
    {
      title: "Related",
      body: "Other pickers: [Wheel Picker](/docs/wheel-picker), [Color Picker](/docs/color-picker), [Date Range Picker](/docs/date-range-picker).",
    },
  ],
  api: [
    {
      name: "ArcPicker",
      description: "Radial single-choice picker. The selection changes live as options pass the apex. Sizes itself to its labels unless you set a width.",
      extends: "div",
      props: [
        {
          name: "options",
          type: "readonly { value: string; label: string; disabled?: boolean }[]",
          required: true,
          description: "Choices in order. Disabled options are struck through and never selected.",
        },
        { name: "value", type: "string", description: "Controlled selected value." },
        { name: "defaultValue", type: "string", description: "Initial value when uncontrolled. Defaults to the first enabled option." },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Fires live for every enabled option the arc passes while scrolling, dragging or coasting.",
        },
        { name: "side", type: `"top" | "bottom" | "left" | "right"`, default: `"right"`, description: "Edge the arc bows toward." },
        { name: "radius", type: "number", default: "260", description: "Circle radius in px (minimum 120); larger is gentler." },
        { name: "itemSpacing", type: "number", default: "44", description: "Minimum spacing between labels along the arc, in px." },
        { name: "visibleCount", type: "number", default: "7", description: "Labels shown on the arc at once (minimum 3)." },
        { name: "disabled", type: "boolean", default: "false", description: "Dim the picker and block interaction." },
        { name: "name", type: "string", description: "Name of a hidden input for forms." },
        { name: "aria-label", type: "string", default: `"Choose an option"`, description: "Accessible name of the radiogroup." },
      ],
      dataAttributes: [
        { name: "data-side", description: "The `side` the arc bows toward." },
        { name: "data-disabled", description: "Present when `disabled`." },
      ],
    },
  ],
} satisfies ComponentDoc
