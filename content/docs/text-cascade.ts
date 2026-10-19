import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Rolls text letter by letter whenever its value changes.", "zh": "逐字切换文本。"},
  usage: {
    imports: `import { TextCascade } from "@/components/ui/text-cascade"`,
    code: `<TextCascade text={status} />`,
  },
  examples: [
    {
      id: "stagger",
      title: { en: "Stagger", zh: "交错" },
    },
    {
      id: "fixed-width",
      title: { en: "Width", zh: "宽度" },
    },
    {
      id: "headline",
      title: { en: "Headline", zh: "标题" },
      description: { en: "Use as the rotating word in a heading; it inherits the surrounding type.", zh: "适用于标题中的轮换词。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Each letter moves on a spring (460 / 32 / 0.55) and exits take half the stagger. With reduced motion the word cross-fades and the width snaps. Screen readers read the current `text` once from a hidden copy.",
    },
    {
      title: "Related",
      body: "[Text Shimmer](/docs/text-shimmer), [Text Scramble](/docs/text-scramble), [Text Reveal](/docs/text-reveal). [Reasoning Text](/docs/reasoning-text) uses it for streamed labels.",
    },
  ],
  api: [
    {
      name: "TextCascade",
      description: "Letter-by-letter slot roll between the previous and current `text`.",
      extends: "motion.span",
      props: [
        {
          name: "text",
          type: "string",
          required: true,
          description: "Current text. Changing it rolls the letters, left to right, to the new value.",
        },
        { name: "stagger", type: "number", default: "0.025", description: "Seconds between neighbouring letters." },
        {
          name: "animateWidth",
          type: "boolean",
          default: "true",
          description: "Glide the wrapper between the old and new widths (otherwise it snaps).",
        },
      ],
      dataAttributes: [{ name: "data-slot", description: `"text-cascade"` }],
    },
    {
      name: "useContentWidth",
      description: "`const [ref, width] = useContentWidth<HTMLSpanElement>()` tracks an in-flow sizer's rendered width with a ResizeObserver so a wrapper can animate to it. `SWAP_SPRING`, `WIDTH_SPRING` and `EASE_OUT` are exported too.",
      props: [],
    },
  ],
} satisfies ComponentDoc
