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
  notes: [{ title: "Accessibility", body: "The reveal button is labelled \"Show password\" / \"Hide password\" and reports `aria-pressed`. Inside a `Field` the input is wired like any other control." }],
  api: [
    {
      name: "PasswordInput",
      extends: "Input",
      props: [
        { name: "size", type: `"xs" | "sm" | "default" | "lg"`, default: `"default"`, description: "Same heights as Input; the reveal button shrinks with it." },
        { name: "revealed", type: "boolean", description: "Controlled visibility." },
        { name: "defaultRevealed", type: "boolean", default: "false", description: "Initial visibility." },
        { name: "onRevealedChange", type: "(revealed: boolean) => void", description: "Called when the eye button toggles." },
      ],
    },
  ],
} satisfies ComponentDoc
