import type { ComponentDoc } from "@/lib/doc-types"

export default {
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
      title: "Single Snap",
      description: "Use one snap point for short content; the handle then only drags to close.",
    },
    {
      id: "controlled-snap",
      title: "Controlled Snap",
      description: "Use `snap` and `onSnapChange` when your own buttons move the sheet between heights.",
    },
    {
      id: "non-dismissible",
      title: "Non-dismissible",
      description: "Use `dismissible={false}` when the reader must finish or cancel explicitly with `BottomSheetClose`.",
    },
    {
      id: "without-handle",
      title: "Without Handle",
      description: "Hide the handle when the sheet shouldn't be resized by dragging.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "A flick moves a whole snap. With reduced motion the sheet fades in and out and jumps between snaps.",
    },
    {
      title: "Keyboard",
      body: "The handle is a button, so Enter or Space cycles to the next snap point (or collapses from the top one). Esc closes when `dismissible`.",
    },
  ],
  api: [
    {
      name: "BottomSheet",
      description: "Root. Holds the open state and the snap index.",
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        {
          name: "snapPoints",
          type: "number[]",
          default: "[0.5, 0.92]",
          description: "Visible heights as fractions of the viewport, smallest first.",
        },
        { name: "defaultSnap", type: "number", default: "0", description: "Index into `snapPoints` each open starts at." },
        { name: "snap", type: "number", description: "Controlled snap index." },
        { name: "onSnapChange", type: "(index: number) => void", description: "Called when the sheet settles on a new snap." },
        {
          name: "dismissible",
          type: "boolean",
          default: "true",
          description: "Allow drag-down, Esc and backdrop press to close.",
        },
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Open on first render." },
        {
          name: "onOpenChange",
          type: "(open: boolean, details: Dialog.Root.ChangeEventDetails) => void",
          description: "Called when the sheet opens or closes, with the dialog's event details (`reason`, `event`, `cancel()`), like Drawer. A drag-down dismissal reports `reason: \"imperative-action\"`.",
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
      description: "The sheet (up to 576px wide) with its backdrop and portal. Always as tall as the highest snap.",
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        { name: "showHandle", type: "boolean", default: "true", description: "Render the grip at the top." },
      ],
    },
    {
      name: "BottomSheetHandle",
      description: "The grip. Drag it to resize or dismiss, press it to cycle snap points. Rendered by `BottomSheetContent`.",
      extends: "button",
      props: [],
    },
    {
      name: "BottomSheetHeader",
      description: "Doubles as a drag zone, ignoring presses on buttons, links and fields inside it.",
      extends: "div",
      props: [],
    },
    {
      name: "BottomSheetBody",
      description: "The scrolling area (`overscroll-contain`).",
      extends: "div",
      props: [],
    },
    {
      name: "BottomSheetFooter",
      description: "Bottom action row with a top border and safe-area padding.",
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
