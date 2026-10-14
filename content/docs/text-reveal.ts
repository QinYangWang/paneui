import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TextReveal } from "@/components/ui/text-reveal"`,
    code: `<TextReveal as="h2" text="Your week, handled." className="text-2xl font-semibold" />`,
  },
  examples: [
    {
      id: "split-char",
      title: "By Character",
      description: "`split=\"char\"` reveals one letter at a time; letters of a word stay together when lines wrap.",
    },
    {
      id: "lines",
      title: "Multiple Lines",
      description: "Pass an array to `text` for one line per entry, revealed as one sequence.",
    },
    {
      id: "on-view",
      title: "On Scroll Into View",
      description:
        "`trigger=\"view\"` waits until 40% of the text is visible; `once={false}` replays it each time. Shown inside a scrolling box.",
    },
    {
      id: "custom-timing",
      title: "Custom Timing",
      description: "Tune `stagger`, `delay`, `blur`, `offset` and the spring `transition`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Each word or letter rises from `offset`, un-blurs and fades in on a spring. With reduced motion units only fade, at half the stagger.",
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
          description: "Play on mount, or when the text scrolls into view.",
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
