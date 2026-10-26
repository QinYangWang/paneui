import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Opens a panel from the bottom of the page.", "zh": "从底部打开面板。"},
  baseUi: {
    name: "Dialog",
    href: "https://base-ui.com/react/components/dialog",
  },
  usage: {
    imports: `import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/components/ui/bottom-sheet"`,
    code: `<BottomSheet snapPoints={[0.45, 0.9]}>
  <BottomSheetTrigger render={<Button variant="secondary" />}>Open</BottomSheetTrigger>
  <BottomSheetContent>
    <BottomSheetHeader>
      <BottomSheetTitle>Friday, travel day</BottomSheetTitle>
    </BottomSheetHeader>
    <BottomSheetBody>…</BottomSheetBody>
  </BottomSheetContent>
</BottomSheet>`,
  },
  composition: `BottomSheet
├── BottomSheetTrigger
└── BottomSheetContent
    ├── BottomSheetHandle (added for you)
    ├── BottomSheetHeader
    │   ├── BottomSheetTitle
    │   └── BottomSheetDescription
    ├── BottomSheetBody
    └── BottomSheetFooter
        └── BottomSheetClose`,
  examples: [
    {
      id: "single-snap",
      title: { en: "Single Snap", zh: "单个停靠点" },
      description: { en: "Use one snap point for short content; the handle then only drags to close.", zh: "短内容只需一个停靠点。" },
    },
    {
      id: "controlled-snap",
      title: { en: "Controlled Snap", zh: "受控停靠点" },
    },
    {
      id: "non-dismissible",
      title: { en: "Non-dismissible", zh: "不可直接关闭" },
    },
    {
      id: "without-handle",
      title: { en: "Without Handle", zh: "无拖动柄" },
      description: { en: "Hide the handle when the sheet shouldn't be resized by dragging.", zh: "适用于不允许拖动调整高度的面板。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "A flick moves a whole snap. With reduced motion the sheet fades in and out and jumps between snaps.", zh: "轻扫移动整个吸附点。在减少动态效果下，工作表淡入淡出并在吸附点之间跳转。" },
    },
    {
      title: "Keyboard",
      body: { en: "The handle is a button, so Enter or Space cycles to the next snap point (or collapses from the top one). Esc closes when `dismissible`.", zh: "手柄是一个按钮，因此 Enter 或 Space 循环到下一个吸附点（或从顶部折叠）。当 `dismissible` 时，Esc 关闭。" },
    },
  ],
  api: [
    {
      name: "BottomSheet",
      description: { en: "Root. Holds the open state and the snap index.", zh: "根。持有打开状态和吸附索引。" },
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        {
          name: "snapPoints",
          type: "number[]",
          default: "[0.5, 0.92]",
          description: { en: "Visible heights as fractions of the viewport, smallest first.", zh: "可见高度作为视口的分数，从小到大。" },
        },
        { name: "defaultSnap", type: "number", default: "0", description: { en: "Index into `snapPoints` each open starts at.", zh: "每次打开时从 `snapPoints` 开始的索引。" } },
        { name: "snap", type: "number", description: { en: "Controlled snap index.", zh: "受控吸附索引。" } },
        { name: "onSnapChange", type: "(index: number) => void", description: { en: "Called when the sheet settles on a new snap.", zh: "当工作表停在新吸附点时调用。" } },
        {
          name: "dismissible",
          type: "boolean",
          default: "true",
          description: { en: "Allow drag-down, Esc and backdrop press to close.", zh: "允许向下拖动、Esc 和背景按压关闭。" },
        },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Open on first render.", zh: "首次渲染时打开。" } },
        {
          name: "onOpenChange",
          type: "(open: boolean, details: Dialog.Root.ChangeEventDetails) => void",
          description: { en: "Called when the sheet opens or closes, with the dialog's event details (`reason`, `event`, `cancel()`), like Drawer. A drag-down dismissal reports `reason: \"imperative-action\"`.", zh: "当工作表打开或关闭时调用，带有对话框的事件详情（`reason`、`event`、`cancel()`），类似 Drawer。向下拖动关闭报告 `reason: \"imperative-action\"`。" },
        },
      ],
    },
    {
      name: "BottomSheetTrigger",
      extends: "Dialog.Trigger",
      extendsHref: "https://base-ui.com/react/components/dialog#trigger",
      props: [],
    },
    {
      name: "BottomSheetContent",
      description: { en: "The sheet (up to 576px wide) with its backdrop and portal. Always as tall as the highest snap.", zh: "工作表（最宽 576px）及其背景和传送门。始终保持最高吸附点的高度。" },
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        { name: "showHandle", type: "boolean", default: "true", description: { en: "Render the grip at the top.", zh: "在顶部渲染抓手。" } },
      ],
    },
    {
      name: "BottomSheetHandle",
      description: { en: "The grip. Drag it to resize or dismiss, press it to cycle snap points. Rendered by `BottomSheetContent`.", zh: "抓手。拖动它调整大小或关闭，按下它循环吸附点。由 `BottomSheetContent` 渲染。" },
      extends: "button",
      props: [],
    },
    {
      name: "BottomSheetHeader",
      description: { en: "Doubles as a drag zone, ignoring presses on buttons, links and fields inside it.", zh: "兼作拖动区域，忽略内部按钮、链接和字段的按压。" },
      extends: "div",
      props: [],
    },
    {
      name: "BottomSheetBody",
      description: { en: "The scrolling area (`overscroll-contain`).", zh: "滚动区域（`overscroll-contain`）。" },
      extends: "div",
      props: [],
    },
    {
      name: "BottomSheetFooter",
      description: { en: "Bottom action row with a top border and safe-area padding.", zh: "底部操作行，带顶部边框和安全区域内边距。" },
      extends: "div",
      props: [],
    },
    {
      name: "BottomSheetTitle",
      extends: "Dialog.Title",
      extendsHref: "https://base-ui.com/react/components/dialog#title",
      props: [],
    },
    {
      name: "BottomSheetDescription",
      extends: "Dialog.Description",
      extendsHref: "https://base-ui.com/react/components/dialog#description",
      props: [],
    },
    {
      name: "BottomSheetClose",
      extends: "Dialog.Close",
      extendsHref: "https://base-ui.com/react/components/dialog#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
