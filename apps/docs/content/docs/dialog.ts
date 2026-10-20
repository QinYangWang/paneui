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
      body: "The backdrop fades and the popup scales from 96% and rises 8px over 250ms; it scales back down as it closes. With reduced motion it only fades.",
    },
    {
      title: "Accessibility",
      body: "Focus is trapped inside the popup and returns to the trigger on close. `Esc` and a backdrop click close it. `DialogTitle` and `DialogDescription` label the dialog.",
    },
  ],
  api: [
    {
      name: "Dialog",
      description: "Re-export of the primitive root.",
      extends: "Dialog.Root",
      extendsHref: "https://base-ui.com/react/components/dialog#root",
      props: [
        { name: "open", type: "boolean", description: "Controlled open state." },
        { name: "defaultOpen", type: "boolean", default: "false", description: "Initial state when uncontrolled." },
        {
          name: "onOpenChange",
          type: "(open: boolean, eventDetails) => void",
          description: "Called when the dialog opens or closes.",
        },
      ],
    },
    {
      name: "DialogTrigger",
      description: "Re-export. Use `render` to make a Button the trigger.",
      extends: "Dialog.Trigger",
      extendsHref: "https://base-ui.com/react/components/dialog#trigger",
      props: [],
    },
    {
      name: "DialogContent",
      description: "Portal, backdrop and centred popup (max-width 28rem, max-height the viewport minus 1rem each side). Taller content scrolls inside it with `overscroll-contain`, so the page doesn't scroll.",
      extends: "Dialog.Popup",
      extendsHref: "https://base-ui.com/react/components/dialog#popup",
      props: [
        {
          name: "showClose",
          type: "boolean",
          default: "true",
          description: "Render the close button. It stays pinned while long content scrolls and comes last in the focus order.",
        },
      ],
      dataAttributes: [
        { name: "data-starting-style", description: "Present while opening (scaled down, transparent)." },
        { name: "data-ending-style", description: "Present while closing." },
      ],
    },
    {
      name: "DialogHeader",
      description: "Stacks title and description, with right padding to clear the close button.",
      extends: "div",
      props: [],
    },
    {
      name: "DialogFooter",
      description: "Right-aligned action row.",
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
      description: "Re-export. Closes the dialog when pressed.",
      extends: "Dialog.Close",
      extendsHref: "https://base-ui.com/react/components/dialog#close",
      props: [],
    },
  ],
} satisfies ComponentDoc
