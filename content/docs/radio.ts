import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Horizontal",
      description: "`RadioGroup` is a vertical stack; add `flex-row` and a gap for a row.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `value` and `onValueChange` to react to the choice.",
    },
    {
      id: "choice-cards",
      title: "Choice Cards",
      description: "Wrap each option in a surface and ring it with `has-data-checked:` when its radio is selected.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "`disabled` on the group disables every radio; set it on one `Radio` to disable only that option.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Inside a `RadioGroup` the selected dot glides from one radio to the next on a spring; a standalone `Radio` pops its dot in instead. With reduced motion the dot moves instantly.",
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
        { name: "value", type: "Value", required: true, description: "Identifies this option in the group." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this radio." },
      ],
      dataAttributes: [
        { name: "data-checked", description: "Present when selected." },
        { name: "data-disabled", description: "Present when disabled." },
        { name: "data-invalid", description: "Present when invalid inside a Field (destructive ring)." },
      ],
    },
  ],
} satisfies ComponentDoc
