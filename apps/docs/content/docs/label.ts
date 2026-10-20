import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Names a form control.", "zh": "为表单控件命名。"},
  usage: {
    imports: `import { Label } from "@/components/ui/label"`,
    code: `<Label htmlFor="email">Email</Label>`,
  },
  examples: [
    {
      id: "with-input",
      title: { en: "With Input", zh: "带输入框" },
    },
    {
      id: "with-checkbox",
      title: { en: "With Checkbox", zh: "带复选框" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
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
