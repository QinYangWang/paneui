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
      body: "A standalone `Radio` pops its dot in instead of gliding. With reduced motion the dot moves instantly.",
    },
    {
      title: "Keyboard",
      body: "Tab moves into the group; arrow keys move and select.",
    },
  ],
  api: [
    {
      name: "RadioGroup",
      description: "Groups radios and shares the gliding dot between them. A vertical stack with a 12px gap.",
      extends: "RadioGroup",
      extendsHref: "https://base-ui.com/react/components/radio#radiogroup",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Size of every radio inside: 14 / 16 / 20px." },
        { name: "value", type: "Value", description: "Controlled selected value." },
        { name: "defaultValue", type: "Value", description: "Selected value on first render." },
        {
          name: "onValueChange",
          type: "(value: Value, details) => void",
          description: "Called when the selection changes.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disable every radio." },
      ],
    },
    {
      name: "Radio",
      description: "An 18px round control in an inset well.",
      extends: "Radio.Root",
      extendsHref: "https://base-ui.com/react/components/radio#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, description: "Overrides the group size. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`)." },
        { name: "value", type: "Value", required: true, description: "Identifies this option in the group." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this radio." },
      ],
      dataAttributes: [
        { name: "data-size", description: "The resolved size." },
        { name: "data-checked", description: "Present when selected." },
        { name: "data-disabled", description: "Present when disabled." },
        { name: "data-invalid", description: "Present when invalid inside a Field (destructive ring)." },
      ],
    },
  ],
} satisfies ComponentDoc
