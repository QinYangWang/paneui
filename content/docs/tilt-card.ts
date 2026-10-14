import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TiltCard, TiltCardLayer } from "@/components/ui/tilt-card"`,
    code: `<TiltCard className="w-64 p-5">
  <TiltCardLayer depth={24}>Pro plan</TiltCardLayer>
</TiltCard>`,
  },
  composition: `TiltCard
└── TiltCardLayer (optional, nestable)`,
  examples: [
    {
      id: "max-tilt",
      title: "Tilt Amount",
      description: "`max` is the tilt in degrees at the card's edges.",
    },
    {
      id: "no-glare",
      title: "Without Glare",
      description: "`glare={false}` drops the cursor-tracked highlight and `scale={1}` keeps the card from growing on hover.",
    },
    {
      id: "layers",
      title: "Parallax Layers",
      description: "Nest `TiltCardLayer`s with different `depth` values to lift parts off the surface; a lower `perspective` exaggerates the depth.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Tilt and scale follow the pointer on a spring and settle back on leave. Mouse and pen only; touch never tilts. With reduced motion the card stays flat and the glare is not rendered.",
    },
  ],
  api: [
    {
      name: "TiltCard",
      description: "A raised `rounded-2xl` card that tilts toward the pointer in 3D.",
      extends: "div",
      props: [
        { name: "max", type: "number", default: "10", description: "Maximum tilt in degrees at the card's edges." },
        { name: "glare", type: "boolean", default: "true", description: "Show the cursor-tracked glare." },
        { name: "scale", type: "number", default: "1.02", description: "Scale while hovered." },
        { name: "perspective", type: "number", default: "900", description: "CSS perspective distance in px. Changes apply live." },
      ],
    },
    {
      name: "TiltCardLayer",
      description: "Lifts its content toward the viewer inside a `TiltCard`.",
      extends: "div",
      props: [{ name: "depth", type: "number", default: "24", description: "`translateZ` distance in px." }],
    },
  ],
} satisfies ComponentDoc
