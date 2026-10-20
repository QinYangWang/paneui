import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Connects form labels, controls and feedback.", "zh": "关联表单标签、输入与提示。"},
  baseUi: { name: "Field", href: "https://base-ui.com/react/components/field" },
  usage: {
    imports: `import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"`,
    code: `<Field invalid={!!error}>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" />
  <FieldDescription>We never share it.</FieldDescription>
  <FieldError>{error}</FieldError>
</Field>`,
  },
  composition: `FieldGroup
└── Field
    ├── FieldLabel (or FieldLabelRow)
    ├── Input / Select / FieldControl
    ├── FieldDescription
    └── FieldError`,
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" },  },
    { id: "textarea", title: { en: "Any Control", zh: "任意控件" },  },
  ],
  notes: [
    { title: "Validation", body: "Validate however you like and pass the message to `FieldError`; it renders only while it has children. `invalid` on `Field` sets `aria-invalid` on the control, which turns its ring destructive." },
    { title: "Accessibility", body: "The field links the label to the control and the description and error to it with `aria-describedby`." },
  ],
  api: [
    { name: "Field", extends: "Field.Root", extendsHref: "https://base-ui.com/react/components/field#root", props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, description: "Sizes the label and every control inside (Input, Textarea, PasswordInput, Select and Combobox triggers, MultiSelect, Checkbox, Radio, Switch, Slider). A control's own `size` wins." },
        { name: "invalid", type: "boolean", description: "Marks the control invalid." },
        { name: "disabled", type: "boolean", description: "Disables the control and dims the label." },
      ],
      dataAttributes: [{ name: "data-size", description: "The resolved size." }],
    },
    { name: "FieldError", extends: "Field.Error", description: "The message; nothing renders while it is empty.", props: [{ name: "children", type: "ReactNode", description: "The message." }] },
    { name: "FieldControl", extends: "Field.Control", description: "Makes any element a field control via `render`.", props: [] },
    { name: "FieldLabelRow", extends: "div", description: "Label with something at the end, e.g. a \"Forgot password?\" link.", props: [] },
    { name: "FieldGroup", extends: "div", description: "Stacks fields 16px apart.", props: [] },
  ],
} satisfies ComponentDoc
