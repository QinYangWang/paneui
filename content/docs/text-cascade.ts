import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TextCascade } from "@/components/ui/text-cascade"`,
    code: `<TextCascade text={status} />`,
  },
  examples: [
    {
      id: "stagger",
      title: "Stagger",
      description: "`stagger` sets the seconds between neighbouring letters (default `0.025`); `0` rolls the whole word at once.",
    },
    {
      id: "fixed-width",
      title: "Width",
      description: "By default the wrapper glides to the new word's width; `animateWidth={false}` snaps it, so surrounding text jumps.",
    },
    {
      id: "headline",
      title: "Headline",
      description: "Inherits the surrounding type, so it drops into a heading as the rotating word.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Old letters lift out as new ones land, each on a spring (460 / 32 / 0.55), with exits at half the stagger. With reduced motion the word cross-fades and the width snaps. Screen readers read the current `text` once from a hidden copy.",
    },
    {
      title: "Related",
      body: "[Text Shimmer](/docs/text-shimmer), [Text Scramble](/docs/text-scramble), [Text Reveal](/docs/text-reveal). [Action Swap Cascade](/docs/action-swap-cascade) uses it inside a button.",
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
      description: "Hook: `const [ref, width] = useContentWidth<HTMLSpanElement>()`. Tracks an in-flow sizer's rendered width with a ResizeObserver so a wrapper can animate to it. Also exported: `SWAP_SPRING`, `WIDTH_SPRING`, `EASE_OUT`.",
      props: [],
    },
  ],
} satisfies ComponentDoc
