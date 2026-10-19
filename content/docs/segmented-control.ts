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
  examples: [{ id: "sizes", title: { en: "Sizes", zh: "尺寸" },  }],
  notes: [
    { title: "Tabs or segmented control?", body: "Use Tabs when the options switch panels of content. Use a segmented control when they change a value, like a billing cycle or theme. It is a radio group, so arrow keys move the selection." },
    { title: "Motion", body: "Under reduced motion the thumb moves instantly." },
  ],
  api: [
    {
      name: "SegmentedControl",
      extends: "RadioGroup",
      extendsHref: "https://base-ui.com/react/components/radio#radiogroup",
      props: [
        { name: "value", type: "string", description: "Controlled value." },
        { name: "defaultValue", type: "string", description: "Initial value." },
        { name: "onValueChange", type: "(value: string) => void", description: "Called with the new value." },
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Outer height 24 / 28 / 32 / 36px, the Button heights; items are 4px shorter." },
      ],
    },
    { name: "SegmentedControlItem", extends: "Radio.Root", extendsHref: "https://base-ui.com/react/components/radio#root", props: [{ name: "value", type: "string", required: true, description: "This option's value." }] },
  ],
} satisfies ComponentDoc
