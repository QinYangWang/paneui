import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Navigation",
      description: "`side=\"left\"` for a menu; each link is a `DrawerClose` so picking one closes the drawer.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `open` and `onOpenChange` to open it from anywhere and close it after an action.",
    },
    {
      id: "no-close-button",
      title: "Without Close Button",
      description: "`showClose={false}` hides the corner ×; give the user another way out, like a Done button.",
    },
    {
      id: "scrolling",
      title: "Scrolling Body",
      description: "Only `DrawerBody` scrolls, so the header and footer stay in place.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The panel slides in on a spring and exits on a stiffer one while the backdrop fades. With reduced motion both only fade.",
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
      description: "Bottom action row with a top border, pushed to the bottom.",
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
