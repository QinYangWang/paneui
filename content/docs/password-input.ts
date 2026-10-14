import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { PasswordInput } from "@/components/ui/password-input"`,
    code: `<PasswordInput autoComplete="current-password" />`,
  },
  examples: [],
  notes: [{ title: "Accessibility", body: "The reveal button is labelled \"Show password\" / \"Hide password\" and reports `aria-pressed`. Inside a `Field` the input is wired like any other control." }],
  api: [
    {
      name: "PasswordInput",
      extends: "Input",
      props: [
        { name: "revealed", type: "boolean", description: "Controlled visibility." },
        { name: "defaultRevealed", type: "boolean", default: "false", description: "Initial visibility." },
        { name: "onRevealedChange", type: "(revealed: boolean) => void", description: "Called when the eye button toggles." },
      ],
    },
  ],
} satisfies ComponentDoc
