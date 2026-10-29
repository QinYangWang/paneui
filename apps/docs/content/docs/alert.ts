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
      body: { en: "The alert scales from 96% as it enters and reverses on dismiss, so the content below slides up. With reduced motion it only fades.", zh: "警报在进入时从 96% 缩放，在关闭时反向，因此下方内容向上滑动。在减少动态效果下仅淡入淡出。" },
    },
    {
      title: "Accessibility",
      body: { en: "`warning` and `destructive` alerts get `role=\"alert\"` so screen readers announce them at once; the others get `role=\"status\"`. Override with `role`.", zh: "`warning` 和 `destructive` 警报获得 `role=\"alert\"`，以便屏幕阅读器立即宣布它们；其他获得 `role=\"status\"`。用 `role` 覆盖。" },
    },
  ],
  api: [
    {
      name: "Alert",
      description: { en: "Inline message surface that animates in and out.", zh: "内联消息表面，动画进入和退出。" },
      extends: "motion.div",
      props: [
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: { en: "`sm` tightens the padding for cards, dialogs and forms.", zh: "`sm` 收紧内边距，用于卡片、对话框和表单。" } },
        {
          name: "variant",
          type: `"default" | "info" | "success" | "warning" | "destructive"`,
          default: `"default"`,
          description: { en: "Icon tint and default icon; destructive also tints the text.", zh: "图标颜色与默认图标；destructive 同时为文字着色。" },
        },
        { name: "open", type: "boolean", description: { en: "Controlled visibility. Hiding animates the alert out.", zh: "受控可见性。隐藏时警报动画退出。" } },
        { name: "defaultOpen", type: "boolean", default: "true", description: { en: "Visible on first render.", zh: "首次渲染时可见。" } },
        { name: "onOpenChange", type: "(open: boolean) => void", description: { en: "Called when the alert is shown or dismissed.", zh: "警报显示或关闭时调用。" } },
        {
          name: "role",
          type: `"alert" | "status"`,
          description: { en: "Defaults to `alert` for `warning` / `destructive` and `status` otherwise.", zh: "对于 `warning` / `destructive` 默认为 `alert`，否则为 `status`。" },
        },
        {
          name: "contentClassName",
          type: "string",
          description: { en: "Classes for the inner surface row; `className` goes on the outer element that animates height.", zh: "内部表面行的类；`className` 放在动画高度的外部元素上。" },
        },
      ],
      dataAttributes: [
        { name: "data-variant", description: { en: "The `variant` value.", zh: "`variant` 值。" } },
        { name: "data-size", description: { en: "The `size` value.", zh: "`size` 值。" } },
      ],
    },
    {
      name: "AlertIcon",
      description: { en: "A 16px icon in the variant's tone. Renders the variant's default icon unless children are given.", zh: "变体颜色的 16px 图标。除非给定 children，否则渲染变体的默认图标。" },
      extends: "span",
      props: [{ name: "children", type: "ReactNode", description: { en: "Icon to show instead of the default.", zh: "要替代默认图标的图标。" } }],
    },
    {
      name: "AlertContent",
      description: { en: "Stacks title and description beside the icon.", zh: "在图标旁纵向排列标题和描述。" },
      extends: "div",
      props: [],
    },
    { name: "AlertTitle", extends: "div", props: [] },
    {
      name: "AlertDescription",
      description: { en: "Muted text; links inside are underlined.", zh: "弱化文本；其中的链接带下划线。" },
      extends: "div",
      props: [],
    },
    {
      name: "AlertAction",
      description: { en: "Right-aligned slot for buttons.", zh: "右对齐的按钮槽位。" },
      extends: "div",
      props: [],
    },
    {
      name: "AlertClose",
      description: { en: "Round × button that dismisses the alert. Call `event.preventDefault()` in `onClick` to keep it open.", zh: "关闭提示的圆形 × 按钮。在 `onClick` 中调用 `event.preventDefault()` 可保持打开。" },
      extends: "button",
      props: [{ name: "children", type: "ReactNode", default: "<XIcon />", description: { en: "Replace the × icon.", zh: "替换 × 图标。" } }],
    },
    {
      name: "useAlert",
      description: { en: "Reads the nearest `Alert`. Throws outside one.", zh: "读取最近的 `Alert`。在外部会抛错。" },
      props: [
        { name: "open", type: "boolean", description: { en: "Whether the alert is visible.", zh: "提示是否可见。" } },
        { name: "variant", type: "AlertVariant", description: { en: "The alert's variant.", zh: "提示的变体。" } },
        { name: "size", type: "AlertSize", description: { en: "The alert's size.", zh: "提示的尺寸。" } },
        { name: "setOpen", type: "(open: boolean) => void", description: { en: "Show or hide the alert.", zh: "显示或隐藏提示。" } },
        { name: "dismiss", type: "() => void", description: { en: "Hide the alert with its exit animation.", zh: "以退出动画隐藏提示。" } },
      ],
    },
  ],
} satisfies ComponentDoc
