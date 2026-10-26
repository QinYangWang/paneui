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
    { title: "Validation", body: { en: "Validate however you like and pass the message to `FieldError`; it renders only while it has children. `invalid` on `Field` sets `aria-invalid` on the control, which turns its ring destructive.", zh: "以任意方式校验并将消息传给 `FieldError`；它仅在有子元素时渲染。`Field` 上的 `invalid` 会在控件上设置 `aria-invalid`，从而将其焦点环变为破坏性颜色。" } },
    { title: "Accessibility", body: { en: "The field links the label to the control and the description and error to it with `aria-describedby`.", zh: "字段使用 `aria-describedby` 将标签、描述和错误与控件关联。" } },
  ],
  api: [
    { name: "Field", extends: "Field.Root", extendsHref: "https://base-ui.com/react/components/field#root", props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, description: { en: "Sizes the label and every control inside (Input, Textarea, PasswordInput, Select and Combobox triggers, MultiSelect, Checkbox, Radio, Switch, Slider). A control's own `size` wins.", zh: "设置标签和其中每个控件（Input、Textarea、PasswordInput、Select 和 Combobox 触发器、MultiSelect、Checkbox、Radio、Switch、Slider）的尺寸。控件自身的 `size` 优先。" } },
        { name: "invalid", type: "boolean", description: { en: "Marks the control invalid.", zh: "将控件标记为无效。" } },
        { name: "disabled", type: "boolean", description: { en: "Disables the control and dims the label.", zh: "禁用控件并使标签变暗。" } },
      ],
      dataAttributes: [{ name: "data-size", description: { en: "The resolved size.", zh: "解析后的尺寸。" } }],
    },
    { name: "FieldError", extends: "Field.Error", description: { en: "The message; nothing renders while it is empty.", zh: "消息；为空时不渲染任何内容。" }, props: [{ name: "children", type: "ReactNode", description: { en: "The message.", zh: "消息。" } }] },
    { name: "FieldControl", extends: "Field.Control", description: { en: "Makes any element a field control via `render`.", zh: "通过 `render` 将任意元素变为字段控件。" }, props: [] },
    { name: "FieldLabelRow", extends: "div", description: { en: "Label with something at the end, e.g. a \"Forgot password?\" link.", zh: "末尾带内容的标签，例如“忘记密码？”链接。" }, props: [] },
    { name: "FieldGroup", extends: "div", description: { en: "Stacks fields 16px apart.", zh: "以 16px 间距堆叠字段。" }, props: [] },
  ],
} satisfies ComponentDoc
