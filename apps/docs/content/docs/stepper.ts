import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Adjusts a number up or down in fixed steps.", "zh": "按固定步长调整数值。"},
  baseUi: {
    name: "Number Field",
    href: "https://base-ui.com/react/components/number-field",
  },
  usage: {
    imports: `import { Stepper } from "@/components/ui/stepper"`,
    code: `<Stepper aria-label="Guests" defaultValue={2} min={1} max={8} />`,
  },
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
    {
      id: "with-unit",
      title: { en: "With Unit", zh: "带单位" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "decimals",
      title: { en: "Decimals", zh: "小数" },
    },
    {
      id: "localized",
      title: { en: "Localized", zh: "本地化" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "With reduced motion the rolling digits cross-fade instead.", zh: "在减少动态效果下，滚动的数字改为交叉淡入。" },
    },
    {
      title: "Keyboard",
      body: { en: "Click the number to type a value. Arrow Up and Arrow Down step it. The − and + buttons switch off at `min` and `max`.", zh: "点击数字以输入值。Up 和 Down 键步进。− 和 + 按钮在 `min` 和 `max` 处禁用。" },
    },
  ],
  api: [
    {
      name: "Stepper",
      description: { en: "Number field with − and + step buttons.", zh: "带 − 和 + 步进按钮的数字字段。" },
      extends: "NumberField.Root",
      extendsHref: "https://base-ui.com/react/components/number-field#root",
      props: [
        {
          name: "aria-label",
          type: "string",
          description: { en: "Accessible name, applied to the value input (not the root).", zh: "无障碍名称，应用于值输入（而非根元素）。" },
        },
        { name: "decrementLabel", type: "string", default: `"Decrease"`, description: { en: "Accessible name of the − button; translate it with the rest of your UI.", zh: "− 按钮的无障碍名称；与你的其余 UI 一起翻译。" } },
        { name: "incrementLabel", type: "string", default: `"Increase"`, description: { en: "Accessible name of the + button.", zh: "+ 按钮的无障碍名称。" } },
        { name: "unit", type: "ReactNode", description: { en: "Text after the number, e.g. \"guests\". Visual only.", zh: "数字后的文本，例如 \"guests\"。仅视觉。" } },
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: { en: "Control height (32 / 40px).", zh: "控件高度（32 / 40px）。" } },
        { name: "value", type: "number | null", description: { en: "Controlled value.", zh: "受控的值。" } },
        { name: "defaultValue", type: "number", description: { en: "Value on first render.", zh: "首次渲染时的值。" } },
        {
          name: "onValueChange",
          type: "(value: number | null, details) => void",
          description: { en: "Called when the value changes.", zh: "值变化时调用。" },
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: { en: "Formats both the input and the rolling display, e.g. currency.", zh: "格式化输入和滚动显示，例如货币。" },
        },
        { name: "locale", type: "Intl.LocalesArgument", description: { en: "Locale used by `format`.", zh: "`format` 使用的区域设置。" } },
      ],
      dataAttributes: [{ name: "data-disabled", description: { en: "Present on the group when disabled.", zh: "禁用时出现在组上。" } }],
    },
  ],
} satisfies ComponentDoc
