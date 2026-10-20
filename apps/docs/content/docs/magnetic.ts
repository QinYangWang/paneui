import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Makes any element lean toward a nearby cursor.", "zh": "让元素响应附近的指针。"},
  usage: {
    imports: `import { Magnetic } from "@/components/ui/magnetic"`,
    code: `<Magnetic>
  <a href="/pricing">Pricing</a>
</Magnetic>`,
  },
  examples: [
    {
      id: "strength",
      title: { en: "Strength", zh: "强度" },
    },
    {
      id: "range",
      title: { en: "Range", zh: "范围" },
    },
    {
      id: "spring",
      title: { en: "Spring and Disabled", zh: "弹簧动画与禁用" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Only fine pointers (mouse, pen) on hover-capable devices get the effect, and it is off entirely under `prefers-reduced-motion: reduce`. The wrapper never moves, only its inner span, so layout is unaffected.",
    },
    {
      title: "Related",
      body: "Wrap a [Button](/docs/button), or any other element, to make it lean toward the cursor.",
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
