import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Button", href: "https://base-ui.com/react/components/button" },
  usage: {
    imports: `import { ExpandingArrowButton } from "@/components/ui/expanding-arrow-button"`,
    code: `<ExpandingArrowButton>Continue to checkout</ExpandingArrowButton>`,
  },
  examples: [
    {
      id: "accents",
      title: "Accents",
      description: "Use token classes in `accentClassName` for a different accent, and in `labelClassName` for cases like `tabular-nums` on a count.",
    },
    {
      id: "as-link",
      title: "As Link",
      description: "Use `render` with `nativeButton={false}` when the button navigates, to render an anchor or router `Link`.",
    },
    { id: "disabled", title: "Disabled" },
  ],
  notes: [
    {
      title: "Motion",
      body: "The sweep runs on hover and on keyboard focus, over 500ms. With reduced motion the tile changes width instantly and nothing slides.",
    },
  ],
  api: [
    {
      name: "ExpandingArrowButton",
      description: "Button whose accent tile sweeps across on hover or focus.",
      extends: "Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        { name: "accentClassName", type: "string", description: "Classes for the accent tile (e.g. a different background)." },
        { name: "labelClassName", type: "string", description: "Classes for the label." },
      ],
    },
  ],
} satisfies ComponentDoc
