import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Reveals a headline in sequence.", "zh": "逐步显示标题。"},
  usage: {
    imports: `import { TextReveal } from "@/components/ui/text-reveal"`,
    code: `<TextReveal as="h2" text="Your week, handled." className="text-2xl font-semibold" />`,
  },
  examples: [
    {
      id: "split-char",
      title: { en: "By Character", zh: "逐字" },
      description: { en: "Use for short headlines; letters of a word stay together when lines wrap.", zh: "适用于较短的标题。" },
    },
    {
      id: "lines",
      title: { en: "Multiple Lines", zh: "多行" },
      description: { en: "Use for multi-line headlines that should reveal as one sequence.", zh: "适用于需要连续显示的多行标题。" },
    },
    {
      id: "on-view",
      title: { en: "On Scroll Into View", zh: "进入视野时" },
    },
    {
      id: "custom-timing",
      title: { en: "Custom Timing", zh: "自定义时序" },
      description: { en: "Use when the reveal has to match the pace of surrounding motion.", zh: "适用于需要与周围动画同步的场景。" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "With reduced motion units only fade in, at half the stagger.", zh: "在减少动态效果下，单元仅淡入，交错间隔减半。" },
    },
    {
      title: "Accessibility",
      body: { en: "The element gets the full text as its `aria-label` and the animated pieces are `aria-hidden`, so screen readers read it once, whole.", zh: "元素将完整文本作为其 `aria-label`，动画部分为 `aria-hidden`，因此屏幕阅读器会完整读取一次。" },
    },
    {
      title: "Related",
      body: { en: "[Text Shimmer](/docs/text-shimmer), [Text Scramble](/docs/text-scramble), [Text Cascade](/docs/text-cascade).", zh: "[Text Shimmer](/docs/text-shimmer)、[Text Scramble](/docs/text-scramble)、[Text Cascade](/docs/text-cascade)。" },
    },
  ],
  api: [
    {
      name: "TextReveal",
      description: { en: "Reveals text word by word (or letter by letter). Set size, weight and color with `className`.", zh: "逐词（或逐字母）显示文本。通过 `className` 设置大小、粗细和颜色。" },
      extends: "HTML attributes",
      props: [
        { name: "text", type: "string | string[]", required: true, description: { en: "Text to reveal. An array renders one line per entry.", zh: "要显示的文本。数组会为每个条目渲染一行。" } },
        {
          name: "as",
          type: `"span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "blockquote"`,
          default: `"span"`,
          description: { en: "Element to render.", zh: "要渲染的元素。" },
        },
        { name: "split", type: `"word" | "char"`, default: `"word"`, description: { en: "Animate a word or a character at a time.", zh: "一次动画一个单词或一个字符。" } },
        {
          name: "trigger",
          type: `"mount" | "view"`,
          default: `"mount"`,
          description: { en: "Play on mount, or once 40% of the text has scrolled into view.", zh: "在挂载时播放，或在文本的 40% 滚动进入视图时播放。" },
        },
        { name: "once", type: "boolean", default: "true", description: { en: "With `trigger=\"view\"`, only play the first time.", zh: "当 `trigger=\"view\"` 时，仅播放第一次。" } },
        {
          name: "stagger",
          type: "number",
          default: "0.07 (word) / 0.025 (char)",
          description: { en: "Seconds between units.", zh: "单元之间的间隔秒数。" },
        },
        { name: "delay", type: "number", default: "0", description: { en: "Seconds before the first unit.", zh: "第一个单元之前的秒数。" } },
        { name: "blur", type: "number", default: "10", description: { en: "Starting blur in px.", zh: "初始模糊，单位 px。" } },
        { name: "offset", type: "string", default: `"45%"`, description: { en: "Starting vertical offset, relative to the unit's height.", zh: "起始垂直偏移，相对于单元的高度。" } },
        {
          name: "transition",
          type: "Transition",
          default: "{ type: \"spring\", stiffness: 170, damping: 24, mass: 1 }",
          description: { en: "motion/react transition merged over the default spring.", zh: "motion/react 过渡会合并到默认弹簧之上。" },
        },
      ],
    },
  ],
} satisfies ComponentDoc
