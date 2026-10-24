import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Switches a setting between a few options.", "zh": "在少量选项间切换。"},
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { SegmentedControl, SegmentedControlItem } from "@/components/ui/segmented-control"`,
    code: `<SegmentedControl value={cycle} onValueChange={setCycle} aria-label="Billing cycle">
  <SegmentedControlItem value="monthly">Monthly</SegmentedControlItem>
  <SegmentedControlItem value="yearly">Yearly</SegmentedControlItem>
</SegmentedControl>`,
  },
  composition: `SegmentedControl
└── SegmentedControlItem`,
  examples: [{ id: "rtl", title: { en: "RTL and disabled", zh: "从右到左与禁用" } },{ id: "sizes", title: { en: "Sizes", zh: "尺寸" },  }],
  notes: [
    { title: "Tabs or segmented control?", body: { en: "Use Tabs when the options switch panels of content. Use a segmented control when they change a value, like a billing cycle or theme. It is a radio group, so arrow keys move the selection.", zh: "切换内容面板时使用 Tabs；改变计费周期或主题等值时使用分段控件。方向键可切换选项。" } },
    { title: "Motion", body: { en: "Under reduced motion the thumb fades without sliding.", zh: "减少动态效果时，选中背景淡入而不滑动。" } },
  ],
  api: [
    {
      name: "SegmentedControl",
      extends: "RadioGroup",
      extendsHref: "https://base-ui.com/react/components/radio#radiogroup",
      props: [
        { name: "value", type: "string", description: { en: "Controlled value.", zh: "受控值。" } },
        { name: "defaultValue", type: "string", description: { en: "Initial value.", zh: "初始值。" } },
        { name: "onValueChange", type: "(value: string) => void", description: { en: "Called with the new value.", zh: "值改变时调用。" } },
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Inherits control-size unless explicitly set. Outer height 24 / 28 / 32 / 36px, the Button heights; items are 4px shorter.", zh: "未指定时继承控件尺寸。外部高度为 24 / 28 / 32 / 36px，选项高度减少 4px。" } },
      ],
    },
    { name: "SegmentedControlItem", extends: "Radio.Root", extendsHref: "https://base-ui.com/react/components/radio#root", props: [{ name: "value", type: "string", required: true, description: { en: "This option's value.", zh: "此选项的值。" } }] },
  ],
} satisfies ComponentDoc
