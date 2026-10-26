import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows brief notifications that dismiss themselves.", "zh": "显示短暂通知。"},
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
      title: { en: "Types", zh: "类型" },
    },
    {
      id: "with-action",
      title: { en: "With Action", zh: "带操作" },
    },
    {
      id: "promise",
      title: { en: "Promise", zh: "异步操作" },
      description: { en: "Use for saves and uploads that take a moment; the toast follows the promise to success or error.", zh: "适用于保存或上传等异步操作。" },
    },
    {
      id: "persistent",
      title: { en: "Persistent", zh: "持续显示" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Hovering or focusing the stack expands it, and swiping right or down dismisses a toast.", zh: "悬停或聚焦堆叠会将其展开，向右或向下滑动可关闭提示。" },
    },
    {
      title: "Accessibility",
      body: { en: "Toasts are announced in a live region. Timers pause while the stack is hovered or focused, and `F6` moves focus into the viewport.", zh: "提示会在一个实时区域中播报。悬停或聚焦堆叠时计时器暂停，按 `F6` 可将焦点移入视口。" },
    },
  ],
  api: [
    {
      name: "ToastProvider",
      description: { en: "Wrap your app once. Renders the viewport (fixed bottom-right) and the stacked toasts.", zh: "在应用中包裹一次。渲染视口（固定在右下角）和堆叠的提示。" },
      extends: "Toast.Provider",
      extendsHref: "https://base-ui.com/react/components/toast#provider",
      props: [
        { name: "limit", type: "number", default: "3", description: { en: "Toasts shown at once; older ones are hidden.", zh: "同时显示的提示数量；更早的提示会被隐藏。" } },
        { name: "timeout", type: "number", default: "5000", description: { en: "Default auto-dismiss in ms. `0` never dismisses.", zh: "默认自动关闭时间，单位为 ms。`0` 表示永不关闭。" } },
      ],
    },
    {
      name: "useToast",
      description: { en: "Alias of the toast primitive's `useToastManager`. Returns `{ toasts, add, update, close, promise }`; `add` returns the toast id and `close()` with no id clears every toast.", zh: "toast 原语的 `useToastManager` 的别名。返回 `{ toasts, add, update, close, promise }`；`add` 返回 toast id，不带 id 调用 `close()` 会清除所有提示。" },
      extends: "Toast.useToastManager",
      extendsHref: "https://base-ui.com/react/components/toast#usetoastmanager",
      props: [
        { name: "title", type: "ReactNode", description: { en: "First line, medium weight.", zh: "第一行，中等字重。" } },
        { name: "description", type: "ReactNode", description: { en: "Muted second line.", zh: "弱化的第二行。" } },
        {
          name: "type",
          type: `"success" | "error" | "warning" | "info" | "loading" | string`,
          description: { en: "Known types get an icon; `loading` spins.", zh: "已知类型会显示图标；`loading` 会旋转。" },
        },
        { name: "timeout", type: "number", description: { en: "Override the provider timeout for this toast; `0` keeps it until dismissed.", zh: "覆盖此提示的 provider 超时；`0` 表示保留到被关闭。" } },
        { name: "priority", type: `"low" | "high"`, default: `"low"`, description: { en: "How urgently screen readers announce it.", zh: "屏幕阅读器播报的紧急程度。" } },
        {
          name: "actionProps",
          type: "ComponentProps<\"button\">",
          description: { en: "Renders an action button; pass `children` and `onClick`.", zh: "渲染一个操作按钮；传入 `children` 和 `onClick`。" },
        },
        { name: "onClose", type: "() => void", description: { en: "Called when the toast starts closing.", zh: "提示开始关闭时调用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
