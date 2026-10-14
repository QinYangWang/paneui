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
      description: "`accentClassName` restyles the sweeping tile, e.g. a different token background and text colour.",
    },
    {
      id: "as-link",
      title: "As Link",
      description: "Render an anchor (or router `Link`) with `render` and `nativeButton={false}`.",
    },
    { id: "disabled", title: "Disabled" },
  ],
  notes: [
    {
      title: "Motion",
      body: "On hover or keyboard focus the tile widens across the button (500ms) and a staggered trail of dotted chevrons fades in. With reduced motion the tile changes width instantly and nothing slides.",
    },
  ],
  api: [
    {
      name: "ExpandingArrowButton",
      description: "Raised pill with an accent tile that sweeps across on hover or focus.",
      extends: "Base UI Button",
      extendsHref: "https://base-ui.com/react/components/button#api-reference",
      props: [
        { name: "accentClassName", type: "string", description: "Classes for the accent tile (e.g. a different background)." },
        { name: "labelClassName", type: "string", description: "Classes for the label." },
      ],
    },
  ],
} satisfies ComponentDoc
