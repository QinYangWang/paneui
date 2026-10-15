import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
  examples: [{ id: "textarea", title: "Any Control", description: "Wrap controls that are not field-aware with `FieldControl render={<Textarea />}` to get the label, `aria-invalid` and descriptions wired up." }],
  notes: [
    { title: "Validation", body: "Validate however you like and pass the message to `FieldError`; it renders only while it has children and slides open. `invalid` on `Field` marks the control `aria-invalid`, which turns its ring destructive." },
    { title: "Accessibility", body: "The field links the label to the control and the description and error to it with `aria-describedby`." },
  ],
  api: [
    { name: "Field", extends: "Field.Root", extendsHref: "https://base-ui.com/react/components/field#root", props: [{ name: "invalid", type: "boolean", description: "Marks the control invalid." }, { name: "disabled", type: "boolean", description: "Disables the control and dims the label." }] },
    { name: "FieldError", extends: "Field.Error", description: "The message; nothing renders while it is empty.", props: [{ name: "children", type: "ReactNode", description: "The message." }] },
    { name: "FieldControl", extends: "Field.Control", description: "Makes any element a field control via `render`.", props: [] },
    { name: "FieldLabelRow", extends: "div", description: "Label with something at the end, e.g. a \"Forgot password?\" link.", props: [] },
    { name: "FieldGroup", extends: "div", description: "Stacks fields 16px apart.", props: [] },
  ],
} satisfies ComponentDoc
