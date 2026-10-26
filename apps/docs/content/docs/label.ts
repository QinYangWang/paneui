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
      body: { en: "Checkbox, Switch and Radio render a `span` with `data-disabled`, so the label matches it with `has-data-disabled` (wrapping) and `peer-data-disabled` (sibling; Checkbox and Switch carry the `peer` class) as well as the native `has-disabled` / `peer-disabled`.", zh: "Checkbox、Switch 和 Radio 渲染带有 `data-disabled` 的 `span`，因此标签通过 `has-data-disabled`（包裹）和 `peer-data-disabled`（兄弟；Checkbox 和 Switch 带有 `peer` 类）以及原生 `has-disabled` / `peer-disabled` 与之匹配。" },
    },
  ],
  api: [
    {
      name: "Label",
      description:
        { en: "A `font-medium` text label laid out as a row with an 8px gap. It adds no props of its own.", zh: "`font-medium` 文本标签，以 8px 间隙的行布局。它不添加自己的 props。" },
      extends: "label",
      props: [],
    },
  ],
} satisfies ComponentDoc
