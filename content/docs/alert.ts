import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows a message that needs attention.", "zh": "显示需要用户留意的消息。"},
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
    { id: "variants", title: { en: "Variants", zh: "样式" },  },
    {
      id: "default-variant",
      title: { en: "Default", zh: "默认" },
    },
    {
      id: "custom-icon",
      title: { en: "Custom Icon", zh: "自定义图标" },
    },
    {
      id: "actions",
      title: { en: "Actions", zh: "操作" },
    },
    {
      id: "use-alert",
      title: { en: "Custom Dismiss", zh: "自定义关闭" },
    },
    { id: "small", title: { en: "Small", zh: "小尺寸" }, description: { en: "Use inside cards, dialogs and forms.", zh: "适用于卡片、对话框或表单内的提示。" } },
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
