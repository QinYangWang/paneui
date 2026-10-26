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
      body: { en: "Each letter moves on a spring (460 / 32 / 0.55) and exits take half the stagger. With reduced motion the word cross-fades and the width snaps. Screen readers read the current `text` once from a hidden copy.", zh: "每个字母以弹簧（460 / 32 / 0.55）移动，退场耗时是交错间隔的一半。在减少动态效果下，单词交叉淡入淡出，宽度直接跳变。屏幕阅读器从隐藏副本中读取当前 `text` 一次。" },
    },
    {
      title: "Related",
      body: { en: "[Text Shimmer](/docs/text-shimmer), [Text Scramble](/docs/text-scramble), [Text Reveal](/docs/text-reveal). [Reasoning Text](/docs/reasoning-text) uses it for streamed labels.", zh: "[Text Shimmer](/docs/text-shimmer)、[Text Scramble](/docs/text-scramble)、[Text Reveal](/docs/text-reveal)。[Reasoning Text](/docs/reasoning-text) 用它来处理流式标签。" },
    },
  ],
  api: [
    {
      name: "TextCascade",
      description: { en: "Letter-by-letter slot roll between the previous and current `text`.", zh: "在上一段和当前 `text` 之间逐字符滚动切换。" },
      extends: "motion.span",
      props: [
        {
          name: "text",
          type: "string",
          required: true,
          description: { en: "Current text. Changing it rolls the letters, left to right, to the new value.", zh: "当前文本。更改它会将字母从左到右滚动到新值。" },
        },
        { name: "stagger", type: "number", default: "0.025", description: { en: "Seconds between neighbouring letters.", zh: "相邻字母之间的间隔秒数。" } },
        {
          name: "animateWidth",
          type: "boolean",
          default: "true",
          description: { en: "Glide the wrapper between the old and new widths (otherwise it snaps).", zh: "在旧宽度和新宽度之间平滑过渡包装器（否则直接跳变）。" },
        },
      ],
      dataAttributes: [{ name: "data-slot", description: { en: "\"text-cascade\"", zh: "\"text-cascade\"" } }],
    },
    {
      name: "useContentWidth",
      description: { en: "`const [ref, width] = useContentWidth<HTMLSpanElement>()` tracks an in-flow sizer's rendered width with a ResizeObserver so a wrapper can animate to it. `SWAP_SPRING`, `WIDTH_SPRING` and `EASE_OUT` are exported too.", zh: "`const [ref, width] = useContentWidth<HTMLSpanElement>()` 使用 ResizeObserver 跟踪流内尺寸器的渲染宽度，以便包装器可以动画到该宽度。`SWAP_SPRING`、`WIDTH_SPRING` 和 `EASE_OUT` 也会导出。" },
      props: [],
    },
  ],
} satisfies ComponentDoc
