import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Toast",
    href: "https://base-ui.com/react/components/toast",
  },
  usage: {
    imports: `import { ToastProvider, useToast } from "@/components/ui/toast"`,
    code: `// Once, at the root of your app
<ToastProvider>{children}</ToastProvider>

// Anywhere inside it
const toast = useToast()
toast.add({ title: "Saved", description: "Your changes are live.", type: "success" })`,
  },
  examples: [
    {
      id: "types",
      title: "Types",
      description: "Use `type` to match the outcome, or leave it out for a plain notice.",
    },
    {
      id: "with-action",
      title: "With Action",
      description: "Use for Undo, closing the toast in the action's `onClick`.",
    },
    {
      id: "promise",
      title: "Promise",
      description: "Use for saves and uploads that take a moment; the toast follows the promise to success or error.",
    },
    {
      id: "persistent",
      title: "Persistent",
      description: "Use `timeout: 0` for messages the user must act on, and `priority: \"high\"` when they are urgent.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Hovering or focusing the stack expands it, and swiping right or down dismisses a toast.",
    },
    {
      title: "Accessibility",
      body: "Toasts are announced in a live region. Timers pause while the stack is hovered or focused, and `F6` moves focus into the viewport.",
    },
  ],
  api: [
    {
      name: "ToastProvider",
      description: "Wrap your app once. Renders the viewport (fixed bottom-right) and the stacked toasts.",
      extends: "Toast.Provider",
      extendsHref: "https://base-ui.com/react/components/toast#provider",
      props: [
        { name: "limit", type: "number", default: "3", description: "Toasts shown at once; older ones are hidden." },
        { name: "timeout", type: "number", default: "5000", description: "Default auto-dismiss in ms. `0` never dismisses." },
      ],
    },
    {
      name: "useToast",
      description: "Alias of the toast primitive's `useToastManager`. Returns `{ toasts, add, update, close, promise }`; `add` returns the toast id and `close()` with no id clears every toast.",
      extends: "Toast.useToastManager",
      extendsHref: "https://base-ui.com/react/components/toast#usetoastmanager",
      props: [
        { name: "title", type: "ReactNode", description: "First line, medium weight." },
        { name: "description", type: "ReactNode", description: "Muted second line." },
        {
          name: "type",
          type: `"success" | "error" | "warning" | "info" | "loading" | string`,
          description: "Known types get an icon; `loading` spins.",
        },
        { name: "timeout", type: "number", description: "Override the provider timeout for this toast; `0` keeps it until dismissed." },
        { name: "priority", type: `"low" | "high"`, default: `"low"`, description: "How urgently screen readers announce it." },
        {
          name: "actionProps",
          type: "ComponentProps<\"button\">",
          description: "Renders an action button; pass `children` and `onClick`.",
        },
        { name: "onClose", type: "() => void", description: "Called when the toast starts closing." },
      ],
    },
  ],
} satisfies ComponentDoc
