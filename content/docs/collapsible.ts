import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Collapsible",
    href: "https://base-ui.com/react/components/collapsible",
  },
  usage: {
    imports: `import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@/components/ui/collapsible"`,
    code: `<Collapsible>
  <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
  <CollapsiblePanel>Retry failed tasks automatically.</CollapsiblePanel>
</Collapsible>`,
  },
  composition: `Collapsible
├── CollapsibleTrigger
└── CollapsiblePanel`,
  examples: [
    {
      id: "default-open",
      title: "Default Open",
    },
    {
      id: "show-more",
      title: "Show More",
      description: "Use `chevron={false}` for a show-more button below a truncated panel.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use `open` and `onOpenChange` when something else also toggles the panel.",
    },
    {
      id: "disabled",
      title: "Disabled",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The panel height eases open while the content fades in, slides down 4px and un-blurs; the chevron turns 180°. With reduced motion the panel opens instantly.",
    },
  ],
  api: [
    {
      name: "Collapsible",
      description: "Unstyled vertical stack; bring your own surface.",
      extends: "Collapsible.Root",
      extendsHref: "https://base-ui.com/react/components/collapsible#root",
      props: [],
    },
    {
      name: "CollapsibleTrigger",
      description: "A 36px row that tints while open.",
      extends: "Collapsible.Trigger",
      extendsHref: "https://base-ui.com/react/components/collapsible#trigger",
      props: [
        {
          name: "chevron",
          type: "boolean",
          default: "true",
          description: "Show the trailing chevron that rotates when open.",
        },
      ],
      dataAttributes: [{ name: "data-panel-open", description: "Present while the panel is open." }],
    },
    {
      name: "CollapsiblePanel",
      description: "Animates its height; the children sit in an inner wrapper that fades and slides.",
      extends: "Collapsible.Panel",
      extendsHref: "https://base-ui.com/react/components/collapsible#panel",
      props: [],
      dataAttributes: [
        { name: "data-starting-style / data-ending-style", description: "Set during the open and close transitions." },
      ],
    },
  ],
} satisfies ComponentDoc
