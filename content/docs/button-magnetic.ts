import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { MagneticButton } from "@/components/ui/button-magnetic"`,
    code: `<MagneticButton>Get started</MagneticButton>`,
  },
  examples: [
    {
      id: "variants",
      title: "Variants",
      description: "Every Button `variant` and `size` passes through, including `data-icon` icons.",
    },
    {
      id: "label-strength",
      title: "Label Strength",
      description: "`labelStrength` leans the label further than the button for depth; `0` turns the inner layer off.",
    },
    {
      id: "disabled",
      title: "Disabled and Wrapper",
      description: "`disabled` stops both layers moving. Put margins on `wrapperClassName`, the outer element that holds the pull zone.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Mouse and pen only, and off under reduced motion (see [Magnetic](/docs/magnetic)).",
    },
    {
      title: "Related",
      body: "[Button](/docs/button), [Stateful Button](/docs/button-stateful), [Magnetic](/docs/magnetic).",
    },
  ],
  api: [
    {
      name: "MagneticButton",
      description: "Our Button pulled toward the cursor, with the label leaning a little further.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        { name: "strength", type: "number", default: "0.3", description: "Fraction of the cursor offset the button follows." },
        { name: "range", type: "number", default: "28", description: "Pull zone around the button, in px." },
        {
          name: "labelStrength",
          type: "number",
          default: "0.12",
          description: "Extra lean on the label on top of the button's own pull. `0` disables it.",
        },
        { name: "wrapperClassName", type: "string", description: "Class for the outer magnetic wrapper (layout, margins)." },
        {
          name: "spring",
          type: "{ stiffness?: number; damping?: number; mass?: number }",
          description: "Spring for the button's follow (see Magnetic).",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the button and both magnetic layers." },
      ],
    },
  ],
} satisfies ComponentDoc
