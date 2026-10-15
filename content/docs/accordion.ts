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
      description: "One item open at a time. Set the open item with `defaultValue`.",
    },
    {
      id: "multiple",
      title: "Multiple",
      description: "Add `multiple` to let several items stay open.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Pass `disabled` to an `AccordionItem`.",
    },
    {
      id: "with-icons",
      title: "With icons",
      description: "`AccordionTrigger` takes an `icon` that sits in a chip before the label and tints when open.",
    },
    {
      id: "ghost",
      title: "Borderless",
      description:
        "`variant=\"ghost\"` drops the well: items are separated by spacing, rows fill on hover and the open item keeps a soft fill.",
    },
    {
      id: "ghost-multiple",
      title: "Borderless, multiple",
      description: "`multiple` works the same on the borderless variant.",
    },
    {
      id: "ghost-disabled",
      title: "Borderless, disabled",
      description: "A disabled item dims and stops responding to hover and clicks.",
    },
    {
      id: "ghost-with-icons",
      title: "Borderless, with icons",
      description:
        "On the borderless variant the `icon` sits bare at 16px, muted until its item opens, and the panel text lines up with the label. Use one icon family (solid) per list.",
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
            "`default`: an inset well holding raised rows. `ghost`: borderless, items separated by spacing with hover-fill rows.",
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
            "Leading icon. `default`: in a round chip that turns primary when open. `ghost`: bare 16px, muted until open.",
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
      ],
    },
  ],
} satisfies ComponentDoc
