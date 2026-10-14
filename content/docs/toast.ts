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
      description: "`type` picks the leading icon: `success`, `error`, `warning`, `info` or `loading`. Leave it out for a plain toast.",
    },
    {
      id: "with-action",
      title: "With Action",
      description: "`actionProps` renders a small button under the text; use it for Undo and close the toast in its `onClick`.",
    },
    {
      id: "promise",
      title: "Promise",
      description: "`toast.promise()` shows a loading toast and swaps it for the success or error state when the promise settles.",
    },
    {
      id: "persistent",
      title: "Persistent",
      description: "`timeout: 0` keeps a toast until it is dismissed; `priority: \"high\"` announces it assertively. `toast.close()` with no id clears them all.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Toasts slide up from the bottom-right and stack with a small peek and scale. Hovering or focusing the stack expands it. Swipe right or down to dismiss.",
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
      extends: "Base UI Toast.Provider",
      extendsHref: "https://base-ui.com/react/components/toast#provider",
      props: [
        { name: "limit", type: "number", default: "3", description: "Toasts shown at once; older ones are hidden." },
        { name: "timeout", type: "number", default: "5000", description: "Default auto-dismiss in ms. `0` never dismisses." },
      ],
    },
    {
      name: "useToast",
      description: "Alias of Base UI `useToastManager`. Returns `{ toasts, add, update, close, promise }`; `add` returns the toast id.",
      extends: "Base UI Toast.useToastManager",
      extendsHref: "https://base-ui.com/react/components/toast#usetoastmanager",
      props: [
        { name: "title", type: "ReactNode", description: "First line, medium weight." },
        { name: "description", type: "ReactNode", description: "Muted second line." },
        {
          name: "type",
          type: `"success" | "error" | "warning" | "info" | "loading" | string`,
          description: "Known types get an icon; `loading` spins.",
        },
        { name: "timeout", type: "number", description: "Override the provider timeout for this toast." },
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
