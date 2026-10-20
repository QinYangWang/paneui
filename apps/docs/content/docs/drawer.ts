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
      body: "The panel exits on a stiffer spring than it enters. With reduced motion the panel and backdrop only fade.",
    },
    {
      title: "Keyboard",
      body: "Focus moves into the drawer and is trapped there; Esc or a backdrop press closes it.",
    },
  ],
  api: [
    {
      name: "Drawer",
      description: "Root. Holds the open state and the side.",
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        {
          name: "side",
          type: `"left" | "right"`,
          default: `"right"`,
          description: "Edge the panel slides in from.",
        },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Open on first render." },
        {
          name: "onOpenChange",
          type: "(open: boolean, details) => void",
          description: "Called when the drawer opens or closes.",
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
      description: "The floating panel (up to 384px wide, 8px from the edges) with its backdrop and portal.",
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: "Show the round × button in the top-right corner.",
        },
      ],
      dataAttributes: [{ name: "data-side", description: "`left` or `right`." }],
    },
    {
      name: "DrawerHeader",
      description: "Padded top area; leaves room on the right for the close button.",
      extends: "div",
      props: [],
    },
    {
      name: "DrawerBody",
      description: "The scrolling area (`overscroll-contain`).",
      extends: "div",
      props: [],
    },
    {
      name: "DrawerFooter",
      description: "Action row pinned to the bottom of the panel.",
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
