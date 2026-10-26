import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Rolls only the digits that change.", "zh": "仅滚动发生变化的数字。"},
  usage: {
    imports: `import { DigitSwap } from "@/components/ui/digit-swap"`,
    code: `<DigitSwap value={count} />`,
  },
  examples: [
    {
      id: "auto-direction",
      title: { en: "Auto Direction", zh: "自动方向" },
    },
    {
      id: "odometer",
      title: { en: "Odometer", zh: "计数器" },
    },
    {
      id: "fixed-direction",
      title: { en: "Fixed Direction", zh: "固定方向" },
    },
    {
      id: "replay",
      title: { en: "Replay", zh: "重播" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Glyphs slide 60% and blur 2px while fading, with an ease-out curve. With reduced motion they only cross-fade, capped at 150ms and with no stagger.", zh: "字形滑动 60% 并模糊 2px 同时淡出，使用 ease-out 曲线。启用减少动态效果时仅交叉淡入淡出，上限 150ms 且无错开。" },
    },
    {
      title: "Accessibility",
      body: { en: "The full value is rendered once as screen-reader text; the animated glyphs are `aria-hidden`.", zh: "完整值作为屏幕阅读器文本渲染一次；动画字形为 `aria-hidden`。" },
    },
  ],
  api: [
    {
      name: "DigitSwap",
      description: { en: "Fixed-slot characters that roll when they change. Digits sit in `1ch` slots keyed from the right, so nothing jitters.", zh: "固定槽位字符，变化时滚动。数字位于按右侧键控的 `1ch` 槽位中，因此不会抖动。" },
      extends: "span",
      props: [
        {
          name: "value",
          type: "string | number",
          required: true,
          description: { en: "Number or pre-formatted string (`\"$1,204\"`, `\"•••• 4242\"`). Each character gets its own slot.", zh: "数字或预格式化字符串（`\"$1,204\"`、`\"•••• 4242\"`）。每个字符有自己的槽位。" },
        },
        {
          name: "direction",
          type: `"up" | "down" | "auto"`,
          default: `"auto"`,
          description: { en: "Where new glyphs enter from. `auto` picks `up` when the numeric value grows and `down` when it shrinks.", zh: "新字形进入的方向。`auto` 在数值增大时选 `up`，减小时选 `down`。" },
        },
        { name: "duration", type: "number", default: "0.32", description: { en: "Seconds per glyph roll.", zh: "每个字形滚动的秒数。" } },
        { name: "stagger", type: "number", default: "0.02", description: { en: "Seconds between neighbouring glyphs.", zh: "相邻字形之间的秒数。" } },
        {
          name: "staggerFrom",
          type: `"start" | "end"`,
          default: `"start"`,
          description: { en: "Which end the stagger starts from. `end` ripples right to left.", zh: "错开从哪一端开始。`end` 从右向左涟漪。" },
        },
        {
          name: "animationKey",
          type: "string | number",
          description: { en: "Change it to replay every glyph even when the characters are the same.", zh: "更改它以重播每个字形，即使字符相同。" },
        },
        {
          name: "suffixLength",
          type: "number",
          default: "0",
          description: { en: "Number of trailing characters that get `suffixClassName` (units, cents, `/mo`).", zh: "获得 `suffixClassName` 的末尾字符数（单位、分、`/mo`）。" },
        },
        { name: "glyphClassName", type: "string", description: { en: "Class for each animated glyph.", zh: "每个动画字形的类名。" } },
        { name: "suffixClassName", type: "string", description: { en: "Class for the trailing `suffixLength` slots.", zh: "末尾 `suffixLength` 个槽位的类名。" } },
      ],
      dataAttributes: [
        { name: "data-direction", description: { en: "`up` or `down`: the direction of the latest roll.", zh: "`up` 或 `down`：最近一次滚动的方向。" } },
      ],
    },
  ],
} satisfies ComponentDoc
