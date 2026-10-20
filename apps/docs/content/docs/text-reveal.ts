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
      body: "With reduced motion units only fade in, at half the stagger.",
    },
    {
      title: "Accessibility",
      body: "The element gets the full text as its `aria-label` and the animated pieces are `aria-hidden`, so screen readers read it once, whole.",
    },
    {
      title: "Related",
      body: "[Text Shimmer](/docs/text-shimmer), [Text Scramble](/docs/text-scramble), [Text Cascade](/docs/text-cascade).",
    },
  ],
  api: [
    {
      name: "TextReveal",
      description: "Reveals text word by word (or letter by letter). Set size, weight and color with `className`.",
      extends: "HTML attributes",
      props: [
        { name: "text", type: "string | string[]", required: true, description: "Text to reveal. An array renders one line per entry." },
        {
          name: "as",
          type: `"span" | "p" | "div" | "h1" | "h2" | "h3" | "h4" | "blockquote"`,
          default: `"span"`,
          description: "Element to render.",
        },
        { name: "split", type: `"word" | "char"`, default: `"word"`, description: "Animate a word or a character at a time." },
        {
          name: "trigger",
          type: `"mount" | "view"`,
          default: `"mount"`,
          description: "Play on mount, or once 40% of the text has scrolled into view.",
        },
        { name: "once", type: "boolean", default: "true", description: "With `trigger=\"view\"`, only play the first time." },
        {
          name: "stagger",
          type: "number",
          default: "0.07 (word) / 0.025 (char)",
          description: "Seconds between units.",
        },
        { name: "delay", type: "number", default: "0", description: "Seconds before the first unit." },
        { name: "blur", type: "number", default: "10", description: "Starting blur in px." },
        { name: "offset", type: "string", default: `"45%"`, description: "Starting vertical offset, relative to the unit's height." },
        {
          name: "transition",
          type: "Transition",
          default: "{ type: \"spring\", stiffness: 170, damping: 24, mass: 1 }",
          description: "motion/react transition merged over the default spring.",
        },
      ],
    },
  ],
} satisfies ComponentDoc
