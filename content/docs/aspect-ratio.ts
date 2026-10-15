import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    code: `<AspectRatio ratio={16 / 9}>
  <div className="absolute inset-0 bg-muted" />
</AspectRatio>`,
  },
  composition: `AspectRatio
└── AspectRatioImage (optional)`,
  examples: [
    {
      id: "ratios",
      title: "Ratios",
      description: "Use `contentClassName` to style the content layer, such as centring a label.",
    },
    {
      id: "with-image",
      title: "With Image",
      description: "Use `AspectRatioImage` for photos so the crop scales cleanly when the ratio changes.",
    },
    {
      id: "radius",
      title: "Radius",
      description: "Use `radius` instead of a `rounded-*` class so corners stay true mid-animation.",
    },
    {
      id: "not-animated",
      title: "Without Animation",
      description: "Use `animated={false}` when ratio changes shouldn't draw attention.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Ratio changes run as a motion layout animation with a bounce-free spring. With reduced motion the frame jumps straight to its new shape.",
    },
  ],
  api: [
    {
      name: "AspectRatio",
      description: "A full-width frame locked to a ratio, with a muted well background.",
      extends: "motion.div",
      props: [
        { name: "ratio", type: "number", default: "1", description: "Width divided by height, e.g. `16 / 9`. Invalid values fall back to 1." },
        { name: "animated", type: "boolean", default: "true", description: "Animate ratio changes. Reduced motion always skips the movement." },
        { name: "radius", type: "number", default: "20", description: "Corner radius in px." },
        { name: "contentClassName", type: "string", description: "Classes for the absolutely positioned content layer." },
      ],
    },
    {
      name: "AspectRatioImage",
      description: "Cover-cropped image for `AspectRatio`, sized from its real `width` and `height`. Must be used inside it.",
      extends: "motion.img",
      props: [
        { name: "alt", type: "string", required: true, description: "Alternative text." },
        { name: "width", type: "number", required: true, description: "Intrinsic width in px." },
        { name: "height", type: "number", required: true, description: "Intrinsic height in px." },
        { name: "draggable", type: "boolean", default: "false", description: "Native image dragging." },
      ],
    },
  ],
} satisfies ComponentDoc
