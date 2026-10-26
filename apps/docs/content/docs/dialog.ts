import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Asks for a decision or input in a modal window.", "zh": "请求用户决定或输入。"},
  baseUi: {
    name: "Dialog",
    href: "https://base-ui.com/react/components/dialog",
  },
  usage: {
    imports: `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"`,
    code: `<Dialog>
  <DialogTrigger render={<Button variant="secondary" />}>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Archive project?</DialogTitle>
      <DialogDescription>You can restore it from Settings.</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose render={<Button variant="secondary" />}>Cancel</DialogClose>
      <DialogClose render={<Button />}>Archive</DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
  },
  composition: `Dialog
├── DialogTrigger
└── DialogContent
    ├── DialogHeader
    │   ├── DialogTitle
    │   └── DialogDescription
    └── DialogFooter
        └── DialogClose`,
  examples: [
    {
      id: "destructive",
      title: { en: "Destructive", zh: "危险操作" },
    },
    {
      id: "with-form",
      title: { en: "With Form", zh: "带表单" },
    },
    {
      id: "no-close-button",
      title: { en: "No Close Button", zh: "无关闭按钮" },
    },
    {
      id: "long-content",
      title: { en: "Long Content", zh: "长内容" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The backdrop fades and the popup scales from 96% and rises 8px over 250ms; it scales back down as it closes. With reduced motion it only fades.", zh: "背景淡出，弹窗在 250ms 内从 96% 缩放并上移 8px；关闭时再缩放回去。启用减少动态效果时仅淡入淡出。" },
    },
    {
      title: "Accessibility",
      body: { en: "Focus is trapped inside the popup and returns to the trigger on close. `Esc` and a backdrop click close it. `DialogTitle` and `DialogDescription` label the dialog.", zh: "焦点被限制在弹窗内，关闭时返回触发器。`Esc` 和点击背景可关闭。`DialogTitle` 和 `DialogDescription` 为对话框提供标签。" },
    },
  ],
  api: [
    {
      name: "Dialog",
      description: { en: "Re-export of the primitive root.", zh: "重新导出 primitive 根。" },
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Initial state when uncontrolled.", zh: "非受控时的初始状态。" } },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: { en: "Called when the dialog opens or closes.", zh: "对话框打开或关闭时调用。" },
        },
      ],
    },
    {
      name: "DialogTrigger",
      description: { en: "Re-export. Use `render` to make a Button the trigger.", zh: "重新导出。使用 `render` 让 Button 成为触发器。" },
      extends: "Dialog.Trigger",
      extendsHref: "https://base-ui.com/react/components/dialog#trigger",
      props: [],
    },
    {
      name: "DialogContent",
      description: { en: "Portal, backdrop and centred popup (max-width 28rem, max-height the viewport minus 1rem each side). Taller content scrolls inside it with `overscroll-contain`, so the page doesn't scroll.", zh: "Portal、背景和居中弹窗（最大宽度 28rem，最大高度为视口每侧减去 1rem）。更高的内容在内部用 `overscroll-contain` 滚动，因此页面不会滚动。" },
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: { en: "Render the close button. It stays pinned while long content scrolls and comes last in the focus order.", zh: "渲染关闭按钮。长内容滚动时它保持固定，并在焦点顺序中位于最后。" },
        },
      ],
      dataAttributes: [
        { name: "data-starting-style", description: { en: "Present while opening (scaled down, transparent).", zh: "打开时存在（缩小、透明）。" } },
        { name: "data-ending-style", description: { en: "Present while closing.", zh: "关闭时存在。" } },
      ],
    },
    {
      name: "DialogHeader",
      description: { en: "Stacks title and description, with right padding to clear the close button.", zh: "堆叠标题和描述，右侧内边距以避开关闭按钮。" },
      extends: "div",
      props: [],
    },
    {
      name: "DialogFooter",
      description: { en: "Right-aligned action row.", zh: "右对齐的操作行。" },
      extends: "div",
      props: [],
    },
    {
      name: "DialogTitle",
      extends: "Dialog.Title",
      extendsHref: "https://base-ui.com/react/components/dialog#title",
      props: [],
    },
    {
      name: "DialogDescription",
      extends: "Dialog.Description",
      extendsHref: "https://base-ui.com/react/components/dialog#description",
      props: [],
    },
    {
      name: "DialogClose",
      description: { en: "Re-export. Closes the dialog when pressed.", zh: "重新导出。按下时关闭对话框。" },
      extends: "Dialog.Close",
      extendsHref: "https://base-ui.com/react/components/dialog#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
