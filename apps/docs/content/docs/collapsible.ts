import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows and hides a section of content.", "zh": "展开或收起一段内容。"},
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
      title: { en: "Default Open", zh: "默认展开" },
    },
    {
      id: "show-more",
      title: { en: "Show More", zh: "显示更多" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    {
      id: "disabled",
      title: { en: "Disabled", zh: "禁用" },
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
      props: [
        { name: "typeset", type: 'boolean | "docs" | "reading" | "chat"', default: "false", description: "Turn prose styles back on for the panel content inside a `typeset` container, or name a preset when it stands alone." },
      ],
      dataAttributes: [
        { name: "data-starting-style / data-ending-style", description: "Set during the open and close transitions." },
      ],
    },
  ],
} satisfies ComponentDoc
