import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Scrambles text into its new value when it changes.", "zh": "以字符变化呈现新文本。"},
  usage: {
    imports: `import { TextScramble } from "@/components/ui/text-scramble"`,
    code: `<TextScramble value={status} />`,
  },
  examples: [
    {
      id: "on-mount",
      title: { en: "Scramble On Mount", zh: "挂载时打乱" },
    },
    {
      id: "glyphs",
      title: { en: "Custom Glyphs", zh: "自定义字符" },
      description: { en: "Use a narrower set, such as hex digits, to match the kind of value shown.", zh: "适用于十六进制等有固定字符集的文本。" },
    },
    {
      id: "duration",
      title: { en: "Duration", zh: "时长" },
    },
    {
      id: "on-complete",
      title: { en: "On Complete", zh: "完成回调" },
      description: { en: "Use to start the next step once the text settles.", zh: "适用于文字稳定后开始下一步的流程。" },
    },
  ],
  notes: [
    {
      title: "Accessibility",
      body: "The scrambling characters are `aria-hidden`; screen readers read the final `value` from a visually hidden copy. The final value also sizes the box, so the width never jumps.",
    },
    {
      title: "Motion",
      body: "With reduced motion the new value appears immediately and nothing scrambles. Related: [Text Shimmer](/docs/text-shimmer), [Text Cascade](/docs/text-cascade), [Text Reveal](/docs/text-reveal).",
    },
  ],
  api: [
    {
      name: "TextScramble",
      description: "Scrambles from the previous `value` to the new one, resolving left to right.",
      extends: "span",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: "The text to show. Changing it scrambles from the old value to the new one.",
        },
        {
          name: "duration",
          type: "number",
          default: "length × 34, clamped 360–900",
          description: "Total animation time in ms.",
        },
        {
          name: "glyphs",
          type: "string",
          default: `"ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?/"`,
          description: "Characters sampled while a position is unresolved. An empty string disables scrambling.",
        },
        {
          name: "scrambleOnMount",
          type: "boolean",
          default: "false",
          description: "Also scramble in on first render.",
        },
        { name: "onComplete", type: "() => void", description: "Called once the new value has fully resolved." },
      ],
      dataAttributes: [
        { name: "data-slot", description: `"text-scramble" on the root, "text-scramble-display" on the animated layer.` },
      ],
    },
  ],
} satisfies ComponentDoc
