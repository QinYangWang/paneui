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
      description: "The tinted container. Single-open by default.",
      extends: "Base UI Accordion.Root",
      extendsHref: "https://base-ui.com/react/components/accordion#root",
      props: [
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
      extends: "Base UI Accordion.Item",
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
          description: "Present while the item is open (raised card style).",
        },
      ],
    },
    {
      name: "AccordionTrigger",
      extends: "Base UI Accordion.Trigger",
      extendsHref: "https://base-ui.com/react/components/accordion#trigger",
      props: [
        {
          name: "icon",
          type: "ReactNode",
          description: "Leading icon, shown in a round chip that turns primary when open.",
        },
      ],
    },
    {
      name: "AccordionPanel",
      extends: "Base UI Accordion.Panel",
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
