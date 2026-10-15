import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Alert, AlertClose, AlertContent, AlertDescription, AlertIcon, AlertTitle } from "@/components/ui/alert"`,
    code: `<Alert variant="info">
  <AlertIcon />
  <AlertContent>
    <AlertTitle>Calendar connected</AlertTitle>
    <AlertDescription>New events show up within a minute.</AlertDescription>
  </AlertContent>
  <AlertClose />
</Alert>`,
  },
  composition: `Alert
├── AlertIcon
├── AlertContent
│   ├── AlertTitle
│   └── AlertDescription
├── AlertAction
└── AlertClose`,
  examples: [
    { id: "variants", title: "Variants", description: "Use `warning` and `destructive` only when the user has to act; they are announced as alerts." },
    {
      id: "default-variant",
      title: "Default",
      description: "Use `default` for plain notices that carry no status.",
    },
    {
      id: "custom-icon",
      title: "Custom Icon",
      description: "Pass an icon to `AlertIcon` when the message needs a more specific glyph than the variant's.",
    },
    {
      id: "actions",
      title: "Actions",
      description: "Use `AlertAction` when the reader can act on the message right away.",
    },
    {
      id: "use-alert",
      title: "Custom Dismiss",
      description: "Call `useAlert().dismiss` when a child, like an action button, should close the alert.",
    },
    { id: "small", title: "Small", description: "Use inside cards, dialogs and forms." },
  ],
  notes: [
    {
      title: "Motion",
      body: "The alert scales from 96% as it enters and reverses on dismiss, so the content below slides up. With reduced motion it only fades.",
    },
    {
      title: "Accessibility",
      body: "`warning` and `destructive` alerts get `role=\"alert\"` so screen readers announce them at once; the others get `role=\"status\"`. Override with `role`.",
    },
  ],
  api: [
    {
      name: "Alert",
      description: "Inline message surface that animates in and out.",
      extends: "motion.div",
      props: [
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "`sm` uses 10px padding, a 14px radius and the 24px icon chip; `default` 14px, 18px and 32px." },
        {
          name: "variant",
          type: `"default" | "info" | "success" | "warning" | "destructive"`,
          default: `"default"`,
          description: "Background tint, icon chip tone and default icon.",
        },
        { name: "open", type: "boolean", description: "Controlled visibility. Hiding animates the alert out." },
        { name: "defaultOpen", type: "boolean", default: "true", description: "Visible on first render." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the alert is shown or dismissed." },
        {
          name: "role",
          type: `"alert" | "status"`,
          description: "Defaults to `alert` for `warning` / `destructive` and `status` otherwise.",
        },
        {
          name: "contentClassName",
          type: "string",
          description: "Classes for the inner surface row; `className` goes on the outer element that animates height.",
        },
      ],
      dataAttributes: [
        { name: "data-variant", description: "The `variant` value." },
        { name: "data-size", description: "The `size` value." },
      ],
    },
    {
      name: "AlertIcon",
      description: "An `IconChip` in the variant's tone. Renders the variant's default icon unless children are given.",
      extends: "span",
      props: [{ name: "children", type: "ReactNode", description: "Icon to show instead of the default." }],
    },
    {
      name: "AlertContent",
      description: "Stacks title and description beside the icon.",
      extends: "div",
      props: [],
    },
    { name: "AlertTitle", extends: "div", props: [] },
    {
      name: "AlertDescription",
      description: "Muted text; links inside are underlined.",
      extends: "div",
      props: [],
    },
    {
      name: "AlertAction",
      description: "Right-aligned slot for buttons.",
      extends: "div",
      props: [],
    },
    {
      name: "AlertClose",
      description: "Round × button that dismisses the alert. Call `event.preventDefault()` in `onClick` to keep it open.",
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: "<XIcon />", description: "Replace the × icon." }],
    },
    {
      name: "useAlert",
      description: "Reads the nearest `Alert`. Throws outside one.",
      props: [
        { name: "open", type: "boolean", description: "Whether the alert is visible." },
        { name: "variant", type: "AlertVariant", description: "The alert's variant." },
        { name: "size", type: "AlertSize", description: "The alert's size." },
        { name: "setOpen", type: "(open: boolean) => void", description: "Show or hide the alert." },
        { name: "dismiss", type: "() => void", description: "Hide the alert with its exit animation." },
      ],
    },
  ],
} satisfies ComponentDoc
