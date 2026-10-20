import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Picks values with a scrolling wheel.", "zh": "通过滚轮选择数值。"},
  usage: {
    imports: `import { WheelPicker } from "@/components/ui/wheel-picker"`,
    code: `<WheelPicker aria-label="Size" options={["S", "M", "L"]} defaultValue="M" />`,
  },
  composition: `WheelPickerGroup (optional)
└── WheelPicker`,
  examples: [
    {
      id: "single",
      title: { en: "Single Wheel", zh: "单个滚轮" },
      description: { en: "Use a single wheel for one short list, such as sizes or quantities.", zh: "适用于尺码或数量等短列表。" },
    },
    {
      id: "disabled-options",
      title: { en: "Disabled Options", zh: "禁用选项" },
      description: { en: "Use for options that exist but can't be picked right now.", zh: "适用于暂时无法选择的选项。" },
    },
    {
      id: "visible-count",
      title: { en: "Rows and Height", zh: "行数与高度" },
    },
    {
      id: "form",
      title: { en: "In a Form", zh: "用于表单" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The wheel is a `listbox`. Up/Down move one row, PageUp/PageDown a window, and Home/End jump to the ends. Touch and trackpads scroll natively with momentum; mouse users can drag and fling. The drum never rests on a disabled option and nudges to the nearest enabled row.",
    },
    {
      title: "Motion",
      body: "With reduced motion the drum is flat, rows slide straight, and keyboard or click jumps are instant.",
    },
    {
      title: "Related",
      body: "Other pickers: [Color Picker](/docs/color-picker), [Date Range Picker](/docs/date-range-picker).",
    },
  ],
  api: [
    {
      name: "WheelPicker",
      description: "One scroll wheel.",
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
        { name: "disabled", type: "boolean", default: "false", description: "Dim the wheel and stop scrolling, dragging and keys." },
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
