import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Turns a single setting on or off.", "zh": "开启或关闭一项设置。"},
  baseUi: {
    name: "Switch",
    href: "https://base-ui.com/react/components/switch",
  },
  usage: {
    imports: `import { Switch } from "@/components/ui/switch"`,
    code: `<Switch defaultChecked />`,
  },
  examples: [
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "with-description",
      title: { en: "With Description", zh: "带说明" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    {
      id: "read-only",
      title: { en: "Read Only", zh: "只读" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The thumb slides over 300ms with an overshoot curve and the track colour fades over 200ms.", zh: "滑块以 300ms 过冲曲线滑动，轨道颜色在 200ms 内淡变。" },
    },
    {
      title: "Keyboard",
      body: { en: "`Space` and `Enter` toggle the focused switch. It renders `role=\"switch\"` with a hidden checkbox, so it works inside forms with `name`.", zh: "`Space` 和 `Enter` 切换聚焦的开关。它渲染 `role=\"switch\"` 并带一个隐藏复选框，因此在带 `name` 的表单中可用。" },
    },
  ],
  api: [
    {
      name: "Switch",
      description: { en: "Track and thumb in one part.", zh: "轨道和滑块合为一个部分。" },
      extends: "Switch.Root",
      extendsHref: "https://base-ui.com/react/components/switch#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Track 26×16 / 32×20 / 40×24px. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`).", zh: "轨道 26×16 / 32×20 / 40×24px。在指定尺寸的 `Field` 内采用字段的尺寸（`xs` 映射为 `sm`）。" } },
        { name: "checked", type: "boolean", description: { en: "Controlled state.", zh: "受控状态。" } },
        { name: "defaultChecked", type: "boolean", default: "false", description: { en: "Initial state when uncontrolled.", zh: "非受控时的初始状态。" } },
        {
          name: "onCheckedChange",
          type: "(checked: boolean, eventDetails) => void",
          description: { en: "Called when the switch is toggled.", zh: "切换开关时调用。" },
        },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Dims the switch and blocks interaction.", zh: "使开关变暗并阻止交互。" } },
        { name: "readOnly", type: "boolean", default: "false", description: { en: "Focusable but can't be toggled.", zh: "可聚焦但无法切换。" } },
        { name: "name", type: "string", description: { en: "Submits the value with a form.", zh: "随表单提交值。" } },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } },
        { name: "data-checked", description: { en: "Present when on.", zh: "开启时存在。" } },
        { name: "data-unchecked", description: { en: "Present when off.", zh: "关闭时存在。" } },
        { name: "data-disabled", description: { en: "Present when disabled.", zh: "禁用时存在。" } },
      ],
    },
  ],
} satisfies ComponentDoc
