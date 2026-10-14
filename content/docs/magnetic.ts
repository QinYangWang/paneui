import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { Magnetic } from "@/components/ui/magnetic"`,
    code: `<Magnetic>
  <a href="/pricing">Pricing</a>
</Magnetic>`,
  },
  examples: [
    {
      id: "strength",
      title: "Strength",
      description: "`strength` is the fraction of the cursor's offset from centre the content follows (default `0.3`).",
    },
    {
      id: "range",
      title: "Range",
      description: "`range` extends the pull zone that many pixels beyond the element's edges (default `24`).",
    },
    {
      id: "spring",
      title: "Spring and Disabled",
      description: "`spring` tunes the follow and snap back; `disabled` turns the effect off so the content sits still.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Only fine pointers (mouse, pen) on hover-capable devices get the effect, and it is off entirely under `prefers-reduced-motion: reduce`. The wrapper never moves, only its inner span, so layout is unaffected.",
    },
    {
      title: "Related",
      body: "[Magnetic Button](/docs/button-magnetic) applies this to a Button with a layered label.",
    },
  ],
  api: [
    {
      name: "Magnetic",
      description: "Wraps any element so it leans toward a nearby cursor, then springs home.",
      extends: "span",
      props: [
        { name: "children", type: "ReactNode", required: true, description: "Content that moves." },
        {
          name: "strength",
          type: "number",
          default: "0.3",
          description: "Fraction of the cursor's offset from centre the content follows.",
        },
        { name: "range", type: "number", default: "24", description: "Extra pull zone around the element, in px." },
        { name: "disabled", type: "boolean", default: "false", description: "Turn the effect off." },
        {
          name: "spring",
          type: "{ stiffness?: number; damping?: number; mass?: number }",
          default: "{ stiffness: 220, damping: 16, mass: 0.35 }",
          description: "Spring for the follow and the snap back, merged over the default.",
        },
      ],
      dataAttributes: [{ name: "data-slot", description: `"magnetic"` }],
    },
  ],
} satisfies ComponentDoc
