import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Side panel for navigation or secondary tasks over the page.", "zh": "在侧边处理导航或次要任务。"},
  baseUi: {
    name: "Dialog",
    href: "https://base-ui.com/react/components/dialog",
  },
  usage: {
    imports: `import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"`,
    code: `<Drawer side="right">
  <DrawerTrigger render={<Button variant="secondary" />}>Open</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Agent settings</DrawerTitle>
    </DrawerHeader>
    <DrawerBody>…</DrawerBody>
  </DrawerContent>
</Drawer>`,
  },
  composition: `Drawer
├── DrawerTrigger
└── DrawerContent
    ├── DrawerHeader
    │   ├── DrawerTitle
    │   └── DrawerDescription
    ├── DrawerBody
    └── DrawerFooter
        └── DrawerClose`,
  examples: [
    {
      id: "navigation",
      title: { en: "Navigation", zh: "导航" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "no-close-button",
      title: { en: "Without Close Button", zh: "无关闭按钮" },
    },
    {
      id: "scrolling",
      title: { en: "Scrolling Body", zh: "正文滚动" },
    },
    {
      id: "rtl",
      title: { en: "RTL", zh: "从右到左" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "The panel exits on a stiffer spring than it enters. With reduced motion the panel and backdrop only fade.", zh: "面板退出的弹簧比进入时更硬。在减少动态效果下，面板和背景只淡入淡出。" },
    },
    {
      title: "Keyboard",
      body: { en: "Focus moves into the drawer and is trapped there; Esc or a backdrop press closes it.", zh: "焦点移入抽屉并被困在其中；按 Esc 或点击背景可关闭。" },
    },
  ],
  api: [
    {
      name: "Drawer",
      description: { en: "Root. Holds the open state and the side.", zh: "根组件。持有打开状态和侧边。" },
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        {
          name: "side",
          type: `"left" | "right"`,
          default: `"right"`,
          description: { en: "Edge the panel slides in from.", zh: "面板滑入的边缘。" },
        },
        { name: "open", type: "boolean", description: { en: "Controlled open state.", zh: "受控的打开状态。" } },
        { name: "defaultOpen", type: "boolean", default: "false", description: { en: "Open on first render.", zh: "首次渲染时打开。" } },
        {
          name: "onOpenChange",
          type: "(open: boolean, details) => void",
          description: { en: "Called when the drawer opens or closes.", zh: "抽屉打开或关闭时调用。" },
        },
      ],
    },
    {
      name: "DrawerTrigger",
      extends: "Dialog.Trigger",
      extendsHref: "https://base-ui.com/react/components/dialog#trigger",
      props: [],
    },
    {
      name: "DrawerContent",
      description: { en: "The floating panel (up to 384px wide, 8px from the edges) with its backdrop and portal.", zh: "浮动面板（最宽 384px，距边缘 8px），含背景和传送门。" },
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: { en: "Show the round × button in the top-right corner.", zh: "在右上角显示圆形 × 按钮。" },
        },
      ],
      dataAttributes: [{ name: "data-side", description: { en: "`left` or `right`.", zh: "`left` 或 `right`。" } }],
    },
    {
      name: "DrawerHeader",
      description: { en: "Padded top area; leaves room on the right for the close button.", zh: "带内边距的顶部区域；右侧留出关闭按钮的空间。" },
      extends: "div",
      props: [],
    },
    {
      name: "DrawerBody",
      description: { en: "The scrolling area (`overscroll-contain`).", zh: "滚动区域（`overscroll-contain`）。" },
      extends: "div",
      props: [],
    },
    {
      name: "DrawerFooter",
      description: { en: "Action row pinned to the bottom of the panel.", zh: "固定在面板底部的操作行。" },
      extends: "div",
      props: [],
    },
    {
      name: "DrawerTitle",
      extends: "Dialog.Title",
      extendsHref: "https://base-ui.com/react/components/dialog#title",
      props: [],
    },
    {
      name: "DrawerDescription",
      extends: "Dialog.Description",
      extendsHref: "https://base-ui.com/react/components/dialog#description",
      props: [],
    },
    {
      name: "DrawerClose",
      extends: "Dialog.Close",
      extendsHref: "https://base-ui.com/react/components/dialog#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
