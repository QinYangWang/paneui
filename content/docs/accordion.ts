import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Accordion",
    href: "https://base-ui.com/react/components/accordion",
  },
  usage: {
    imports: `import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "@/components/ui/accordion"`,
    code: `<Accordion defaultValue={["item-1"]}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionPanel>Yes. It follows the WAI-ARIA accordion pattern.</AccordionPanel>
  </AccordionItem>
</Accordion>`,
  },
  composition: `Accordion
└── AccordionItem
    ├── AccordionTrigger
    └── AccordionPanel`,
  examples: [
    {
      id: "basic",
      title: "Basic",
      description: "Use for FAQs and settings where one open answer at a time is enough.",
    },
    {
      id: "multiple",
      title: "Multiple",
      description: "Use `multiple` when readers compare several answers side by side.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
    {
      id: "with-icons",
      title: "With icons",
      description: "Use icons when readers scan the list by topic.",
    },
    {
      id: "ghost",
      title: "Borderless",
      description:
        "Use the borderless variant inside cards or panels that already have a frame.",
    },
    {
      id: "ghost-multiple",
      title: "Borderless, multiple",
    },
    {
      id: "ghost-disabled",
      title: "Borderless, disabled",
    },
    {
      id: "ghost-with-icons",
      title: "Borderless, with icons",
      description:
        "Use one icon family (solid) per list so the bare glyphs line up.",
    },
    {
      id: "rtl",
      title: "RTL",
      description: `For right-to-left languages, wrap the tree in \`DirectionProvider\` and set \`dir="rtl"\` on its root.`,
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The panel height springs open (about 8% overshoot) and eases shut without bounce. With reduced motion the panel opens instantly.",
    },
  ],
  api: [
    {
      name: "Accordion",
      description: "The container. Single-open by default.",
      extends: "Accordion.Root",
      extendsHref: "https://base-ui.com/react/components/accordion#root",
      props: [
        {
          name: "variant",
          type: `"default" | "ghost"`,
          default: `"default"`,
          description:
            "`default` is an inset well of raised rows; `ghost` is borderless, with spacing between items and rows that fill on hover.",
        },
        {
          name: "defaultValue",
          type: "any[]",
          description: "Values of the items open on first render.",
        },
        { name: "value", type: "any[]", description: "Controlled open items." },
        {
          name: "onValueChange",
          type: "(value: any[]) => void",
          description: "Called when items open or close.",
        },
        {
          name: "multiple",
          type: "boolean",
          default: "false",
          description: "Allow more than one open item.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable every item.",
        },
      ],
    },
    {
      name: "AccordionItem",
      extends: "Accordion.Item",
      extendsHref: "https://base-ui.com/react/components/accordion#item",
      props: [
        {
          name: "value",
          type: "any",
          description: "Identifies the item in `value` / `defaultValue`.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disable this item.",
        },
      ],
      dataAttributes: [
        {
          name: "data-open",
          description: "Present while the item is open (raised card in `default`, soft fill in `ghost`).",
        },
      ],
    },
    {
      name: "AccordionTrigger",
      extends: "Accordion.Trigger",
      extendsHref: "https://base-ui.com/react/components/accordion#trigger",
      props: [
        {
          name: "icon",
          type: "ReactNode",
          description:
            "Leading icon. In `default` it sits in a round chip that turns primary when open; in `ghost` it is bare at 16px and muted until open. The panel text lines up with the label.",
        },
      ],
    },
    {
      name: "AccordionPanel",
      extends: "Accordion.Panel",
      extendsHref: "https://base-ui.com/react/components/accordion#panel",
      props: [
        {
          name: "keepMounted",
          type: "boolean",
          default: "false",
          description: "Keep the content in the DOM while closed.",
        },
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: "Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone. The content then keeps the surrounding text size and colour." },
      ],
    },
  ],
} satisfies ComponentDoc
