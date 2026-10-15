import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
  examples: [{ id: "sizes", title: "Sizes", description: "Use `sm` in card headers and toolbars." }],
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
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "`sm` items are 24px tall, `default` 28px." },
      ],
    },
    { name: "SegmentedControlItem", extends: "Radio.Root", extendsHref: "https://base-ui.com/react/components/radio#root", props: [{ name: "value", type: "string", required: true, description: "This option's value." }] },
  ],
} satisfies ComponentDoc
