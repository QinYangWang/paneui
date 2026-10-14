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
      description: "`ratio` is width divided by height. `contentClassName` styles the content layer, here to centre a label.",
    },
    {
      id: "with-image",
      title: "With Image",
      description: "`AspectRatioImage` cover-crops an image from its real `width` and `height`, so the crop scales smoothly as the frame springs to a new ratio.",
    },
    {
      id: "radius",
      title: "Radius",
      description: "Set corners with `radius` (px) rather than a `rounded-*` class so they stay true while the frame is scaled mid-animation.",
    },
    {
      id: "not-animated",
      title: "Without Animation",
      description: "`animated={false}` snaps to the new ratio instead of springing.",
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
      description: "Cover-cropped image for `AspectRatio`. Must be used inside it.",
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
