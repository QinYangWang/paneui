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
      description: "One entry in `snapPoints` gives a fixed-height sheet; the handle then only drags to close.",
    },
    {
      id: "controlled-snap",
      title: "Controlled Snap",
      description: "Pass `snap` and `onSnapChange` to move between heights from your own buttons.",
    },
    {
      id: "non-dismissible",
      title: "Non-dismissible",
      description: "`dismissible={false}` ignores drag-down, Esc and backdrop presses; only `BottomSheetClose` closes it.",
    },
    {
      id: "without-handle",
      title: "Without Handle",
      description: "`showHandle={false}` drops the grip; here the sheet is also opened with `open` and `onOpenChange`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The sheet springs between snap points and a flick moves a whole snap; the backdrop lightens as you drag down. With reduced motion it fades in and out and jumps between snaps.",
    },
    {
      title: "Keyboard",
      body: "The handle is a button: Enter or Space cycles to the next snap point (or collapses from the top one). Esc closes when `dismissible`.",
    },
  ],
  api: [
    {
      name: "BottomSheet",
      description: "Root. Holds the open state and the snap index.",
      extends: "Base UI Dialog.Root",
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
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the sheet opens or closes." },
      ],
    },
    {
      name: "BottomSheetTrigger",
      extends: "Base UI Dialog.Trigger",
      extendsHref: "https://base-ui.com/react/components/dialog#trigger",
      props: [],
    },
    {
      name: "BottomSheetContent",
      description: "The sheet (up to 576px wide) with its backdrop and portal. Always as tall as the highest snap.",
      extends: "Base UI Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        { name: "showHandle", type: "boolean", default: "true", description: "Render the grip at the top." },
      ],
    },
    {
      name: "BottomSheetHandle",
      description: "The grip: drag to resize or dismiss, press to cycle snap points. Rendered by `BottomSheetContent`.",
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
      extends: "Base UI Dialog.Title",
      extendsHref: "https://base-ui.com/react/components/dialog#title",
      props: [],
    },
    {
      name: "BottomSheetDescription",
      extends: "Base UI Dialog.Description",
      extendsHref: "https://base-ui.com/react/components/dialog#description",
      props: [],
    },
    {
      name: "BottomSheetClose",
      extends: "Base UI Dialog.Close",
      extendsHref: "https://base-ui.com/react/components/dialog#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
