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
      body: { en: "The scrambling characters are `aria-hidden`; screen readers read the final `value` from a visually hidden copy. The final value also sizes the box, so the width never jumps.", zh: "乱序字符为 `aria-hidden`；屏幕阅读器从视觉隐藏的副本中读取最终 `value`。最终值也决定框的大小，因此宽度不会跳动。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion the new value appears immediately and nothing scrambles. Related: [Text Shimmer](/docs/text-shimmer), [Text Cascade](/docs/text-cascade), [Text Reveal](/docs/text-reveal).", zh: "在减少动态效果下，新值立即出现，不会乱序。相关：[Text Shimmer](/docs/text-shimmer)、[Text Cascade](/docs/text-cascade)、[Text Reveal](/docs/text-reveal)。" },
    },
  ],
  api: [
    {
      name: "TextScramble",
      description: { en: "Scrambles from the previous `value` to the new one, resolving left to right.", zh: "从旧 `value` 乱序过渡到新值，从左到右解析。" },
      extends: "span",
      props: [
        {
          name: "value",
          type: "string",
          required: true,
          description: { en: "The text to show. Changing it scrambles from the old value to the new one.", zh: "要显示的文本。更改它会从旧值乱序过渡到新值。" },
        },
        {
          name: "duration",
          type: "number",
          default: "length × 34, clamped 360–900",
          description: { en: "Total animation time in ms.", zh: "总动画时间，单位 ms。" },
        },
        {
          name: "glyphs",
          type: "string",
          default: `"ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*+=?/"`,
          description: { en: "Characters sampled while a position is unresolved. An empty string disables scrambling.", zh: "位置未解析时采样的字符。空字符串禁用乱序。" },
        },
        {
          name: "scrambleOnMount",
          type: "boolean",
          default: "false",
          description: { en: "Also scramble in on first render.", zh: "首次渲染时也乱序进入。" },
        },
        { name: "onComplete", type: "() => void", description: { en: "Called once the new value has fully resolved.", zh: "新值完全解析后调用。" } },
      ],
      dataAttributes: [
        { name: "data-slot", description: { en: "\"text-scramble\" on the root, \"text-scramble-display\" on the animated layer.", zh: "根元素上为 \"text-scramble\"，动画层上为 \"text-scramble-display\"。" } },
      ],
    },
  ],
} satisfies ComponentDoc
