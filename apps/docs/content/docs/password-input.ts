import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Password field with a button to show or hide it.", "zh": "输入密码并按需显示。"},
  usage: {
    imports: `import { PasswordInput } from "@/components/ui/password-input"`,
    code: `<PasswordInput autoComplete="current-password" />`,
  },
  examples: [
    { id: "sizes", title: { en: "Sizes", zh: "尺寸" } },
  ],
  notes: [{ title: "Accessibility", body: { en: "The reveal button is labelled \"Show password\" / \"Hide password\" and reports `aria-pressed`. Inside a `Field` the input is wired like any other control.", zh: "显示按钮的标签为“显示密码”/“隐藏密码”，并报告 `aria-pressed`。放在 `Field` 中时，输入框的接线方式与其他控件相同。" } }],
  api: [
    {
      name: "PasswordInput",
      extends: "Input",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: { en: "Same heights as Input; the reveal button shrinks with it.", zh: "高度与 Input 相同；显示按钮也会随之缩小。" } },
        { name: "revealed", type: "boolean", description: { en: "Controlled visibility.", zh: "受控的可见性。" } },
        { name: "defaultRevealed", type: "boolean", default: "false", description: { en: "Initial visibility.", zh: "初始可见性。" } },
        { name: "onRevealedChange", type: "(revealed: boolean) => void", description: { en: "Called when the eye button toggles.", zh: "眼睛按钮切换时调用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
