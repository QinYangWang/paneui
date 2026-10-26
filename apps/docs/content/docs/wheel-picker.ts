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
      body: { en: "The wheel is a `listbox`. Up/Down move one row, PageUp/PageDown a window, and Home/End jump to the ends. Touch and trackpads scroll natively with momentum; mouse users can drag and fling. The drum never rests on a disabled option and nudges to the nearest enabled row.", zh: "滚轮是一个 `listbox`。Up/Down 移动一行，PageUp/PageDown 移动一屏，Home/End 跳到两端。触摸和触控板以原生惯性滚动；鼠标用户可以拖动和甩动。滚轮不会停在禁用的选项上，并会微调到最近的启用行。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion the drum is flat, rows slide straight, and keyboard or click jumps are instant.", zh: "在减少动态效果下，滚轮是平的，行直接滑动，键盘或点击跳转立即完成。" },
    },
    {
      title: "Related",
      body: { en: "Other pickers: [Color Picker](/docs/color-picker), [Date Range Picker](/docs/date-range-picker).", zh: "其他选择器：[Color Picker](/docs/color-picker)、[Date Range Picker](/docs/date-range-picker)。" },
    },
  ],
  api: [
    {
      name: "WheelPicker",
      description: { en: "One scroll wheel.", zh: "一个滚动轮。" },
      extends: "div",
      props: [
        {
          name: "options",
          type: "readonly (string | { value: string; label: ReactNode; textValue?: string; disabled?: boolean })[]",
          required: true,
          description: { en: "Rows of the wheel. `textValue` is the accessible text when `label` isn't a string.", zh: "滚轮的行。当 `label` 不是字符串时，`textValue` 是无障碍文本。" },
        },
        { name: "value", type: "string", description: { en: "Controlled selected value.", zh: "受控的选中值。" } },
        { name: "defaultValue", type: "string", description: { en: "Initial value when uncontrolled. Defaults to the first option.", zh: "非受控时的初始值。默认为第一个选项。" } },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: { en: "Fires once the drum settles on a new row (after momentum, snap, a click or a key).", zh: "当滚轮停在新的行上时触发一次（在惯性、吸附、点击或按键之后）。" },
        },
        {
          name: "visibleCount",
          type: "number",
          default: "5 (or the group's)",
          description: { en: "Rows visible through the window.", zh: "窗口中可见的行数。" },
        },
        { name: "itemHeight", type: "number", default: "36 (or the group's)", description: { en: "Row height in px.", zh: "行高，单位为 px。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Dim the wheel and stop scrolling, dragging and keys.", zh: "使滚轮变暗，并停止滚动、拖动和按键。" } },
        { name: "name", type: "string", description: { en: "Name of a hidden input carrying the value, for forms.", zh: "携带该值的隐藏 input 的名称，用于表单。" } },
        { name: "aria-label", type: "string", description: { en: "Accessible name for the listbox. Always set one.", zh: "列表箱的无障碍名称。请始终设置一个。" } },
      ],
      dataAttributes: [{ name: "data-disabled", description: { en: "Present when `disabled`.", zh: "当 `disabled` 时存在。" } }],
    },
    {
      name: "WheelPickerGroup",
      description: { en: "Lays several wheels side by side on one raised surface with a single selection band.", zh: "将多个滚轮并排放在一个凸起的表面上，并共用一个选择带。" },
      extends: "div",
      props: [
        { name: "itemHeight", type: "number", default: "36", description: { en: "Row height for every wheel inside.", zh: "内部每个滚轮的行高。" } },
        { name: "visibleCount", type: "number", default: "5", description: { en: "Visible rows for every wheel inside.", zh: "内部每个滚轮的可见行数。" } },
      ],
    },
  ],
} satisfies ComponentDoc
