import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Label } from "@/components/ui/label"`,
    code: `<Label htmlFor="email">Email</Label>`,
  },
  examples: [
    {
      id: "with-input",
      title: "With Input",
      description: "Point `htmlFor` at the field's `id`.",
    },
    {
      id: "with-checkbox",
      title: "With Checkbox",
      description: "Wrap a control to make the whole row clickable. Add `font-normal` for option labels.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Inside a `group` element with `data-disabled=\"true\"`, the label dims and ignores the pointer.",
    },
  ],
  api: [
    {
      name: "Label",
      description:
        "A `font-medium` text label laid out as a row with an 8px gap. It adds no props of its own.",
      extends: "label",
      props: [],
    },
  ],
} satisfies ComponentDoc
