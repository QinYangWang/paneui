import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Status line that shows an agent is still working.", "zh": "提示助手仍在处理。"},
  usage: {
    imports: `import { ReasoningText } from "@/components/ui/reasoning-text"`,
    code: `<ReasoningText phrases={["Thinking", "Reading the docs", "Drafting a reply"]} />`,
  },
  examples: [
    {
      id: "spinners",
      title: { en: "Spinners", zh: "加载图标" },
      description: { en: "Use to match the spinner to the tone of your interface.", zh: "让加载图标与界面风格保持一致。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled Index", zh: "受控索引" },
      description: { en: "Use when you know the agent's real current step; it then stops cycling on its own.", zh: "适用于已知助手当前工作步骤的场景。" },
    },
    {
      id: "custom-indicator",
      title: { en: "Custom Indicator", zh: "自定义指示器" },
      description: { en: "Use when your product already has its own loading mark.", zh: "适用于产品已有加载标志的场景。" },
    },
    {
      id: "no-ellipsis",
      title: { en: "Without Ellipsis", zh: "无省略号" },
      description: { en: "Use when your phrases carry their own punctuation.", zh: "适用于文本自带标点的场景。" },
    },
    {
      id: "ascii-spinner",
      title: { en: "ASCII Spinner", zh: "字符加载图标" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion the swap mode cross-fades instead of blurring and rolling, the cascade mask stops sweeping, and `AsciiSpinner` holds its first frame with a soft pulse.",
    },
    {
      title: "Accessibility",
      body: 'The line is a polite `role="status"` region. The current phrase is read from a screen-reader-only copy; the animated text and the spinner are `aria-hidden`.',
    },
  ],
  api: [
    {
      name: "ReasoningText",
      description: "A spinner plus a shimmering phrase that cycles while the agent works.",
      extends: "span",
      props: [
        {
          name: "phrases",
          type: "string[]",
          default: `["Thinking", "Reading the context", "Weighing the options", "Drafting a reply"]`,
          description: "Phrases cycled while the agent works. A single phrase never changes.",
        },
        { name: "mode", type: `"swap" | "cascade" | "scramble"`, default: `"swap"`, description: "Transition between phrases. `swap` blurs and rolls, `cascade` rolls letter by letter, `scramble` scrambles the letters." },
        { name: "interval", type: "number", default: "2400", description: "Milliseconds each phrase stays up." },
        { name: "index", type: "number", description: "Controlled phrase index; when set, the component stops cycling on its own." },
        { name: "shimmerDuration", type: "number", default: "1.8", description: "Seconds per shimmer sweep." },
        { name: "indicator", type: "ReactNode", description: "Leading glyph. Defaults to an `AsciiSpinner`; pass `null` to hide." },
        { name: "spinner", type: `"braille" | "dots" | "line" | "star"`, default: `"braille"`, description: "Frame set used by the default indicator." },
        { name: "ellipsis", type: "boolean", default: "true", description: "Append an ellipsis to every phrase." },
      ],
      dataAttributes: [{ name: "data-mode", description: "The current `mode`." }],
    },
    {
      name: "AsciiSpinner",
      description: "A decorative monospace glyph that ticks through terminal spinner frames.",
      extends: "span",
      props: [
        { name: "kind", type: `"braille" | "dots" | "line" | "star"`, default: `"braille"`, description: "Which frame set to cycle." },
        { name: "interval", type: "number", default: "80", description: "Milliseconds per frame." },
      ],
    },
  ],
} satisfies ComponentDoc
