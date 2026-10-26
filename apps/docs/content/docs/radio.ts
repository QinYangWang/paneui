import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Picks exactly one option from a short list.", "zh": "从一组选项中选择一项。"},
  baseUi: {
    name: "Radio Group",
    href: "https://base-ui.com/react/components/radio",
  },
  usage: {
    imports: `import { Label } from "@/components/ui/label"
import { Radio, RadioGroup } from "@/components/ui/radio"`,
    code: `<RadioGroup defaultValue="pro" aria-label="Plan">
  <Label>
    <Radio value="starter" />
    Starter
  </Label>
  <Label>
    <Radio value="pro" />
    Pro
  </Label>
</RadioGroup>`,
  },
  composition: `RadioGroup
└── Label
    └── Radio`,
  examples: [
    {
      id: "horizontal",
      title: { en: "Horizontal", zh: "横向" },
      description: { en: "Use for two or three short options that fit on one line.", zh: "适用于可放在同一行的少量短选项。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
      description: { en: "Use when other UI reacts to the choice.", zh: "适用于选择值与其他界面联动的场景。" },
    },
    {
      id: "choice-cards",
      title: { en: "Choice Cards", zh: "选项卡片" },
      description: { en: "Use when each option needs a description or price beside it.", zh: "适用于需要补充说明或价格的选项。" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
    },
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "A standalone `Radio` pops its dot in instead of gliding. With reduced motion the dot moves instantly.", zh: "独立的 `Radio` 会弹出其圆点，而不是滑动。启用减少动态效果时，圆点立即移动。" },
    },
    {
      title: "Keyboard",
      body: { en: "Tab moves into the group; arrow keys move and select.", zh: "Tab 进入组内；方向键移动并选择。" },
    },
  ],
  api: [
    {
      name: "RadioGroup",
      description: { en: "Groups radios and shares the gliding dot between them. A vertical stack with a 12px gap.", zh: "将单选按钮分组，并在它们之间共享滑动的圆点。垂直堆叠，间距 12px。" },
      extends: "RadioGroup",
      extendsHref: "https://base-ui.com/react/components/radio#radiogroup",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: { en: "Size of every radio inside: 14 / 16 / 20px.", zh: "内部每个单选按钮的大小：14 / 16 / 20px。" } },
        { name: "value", type: "Value", description: { en: "Controlled selected value.", zh: "受控的选中值。" } },
        { name: "defaultValue", type: "Value", description: { en: "Selected value on first render.", zh: "首次渲染时选中的值。" } },
        {
          name: "onValueChange",
          type: "(value: Value, details) => void",
          description: { en: "Called when the selection changes.", zh: "选中值变化时调用。" },
        },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable every radio.", zh: "禁用每个单选框。" } },
      ],
    },
    {
      name: "Radio",
      description: { en: "An 18px round control in an inset well.", zh: "内凹槽中的 18px 圆形控件。" },
      extends: "Radio.Root",
      extendsHref: "https://base-ui.com/react/components/radio#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, description: { en: "Overrides the group size. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`).", zh: "覆盖组的尺寸。在设置了尺寸的 `Field` 内，它会采用该字段的尺寸（`xs` 映射为 `sm`）。" } },
        { name: "value", type: "Value", required: true, description: { en: "Identifies this option in the group.", zh: "在组中标识此选项。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable this radio.", zh: "禁用此单选框。" } },
      ],
      dataAttributes: [
        { name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } },
        { name: "data-checked", description: { en: "Present when selected.", zh: "选中时存在。" } },
        { name: "data-disabled", description: { en: "Present when disabled.", zh: "禁用时存在。" } },
        { name: "data-invalid", description: { en: "Present when invalid inside a Field (destructive ring).", zh: "在 Field 内无效时呈现（破坏性焦点环）。" } },
      ],
    },
  ],
} satisfies ComponentDoc
