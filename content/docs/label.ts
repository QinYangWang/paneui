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
      description:
        "A label wrapping a disabled control mutes its text (the control dims itself). A label placed right after a disabled control dims too, for native inputs (`:disabled`) and the library's Checkbox, Switch and Radio (`data-disabled`). For a field row, mark a `group` parent with `data-disabled=\"true\"`.",
    },
  ],
  notes: [
    {
      title: "Disabled styles",
      body: "Checkbox, Switch and Radio render a `span` with `data-disabled`, so the label matches it with `has-data-disabled` (wrapping) and `peer-data-disabled` (sibling; Checkbox and Switch carry the `peer` class) as well as the native `has-disabled` / `peer-disabled`.",
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
