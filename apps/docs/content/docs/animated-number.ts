import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Counts up to a number when it scrolls into view.", "zh": "在进入视野时开始计数。"},
  usage: {
    imports: `import { AnimatedNumber } from "@/components/ui/animated-number"`,
    code: `<AnimatedNumber value={1842} locale="en-US" />`,
  },
  examples: [
    {
      id: "live",
      title: { en: "Live Updates", zh: "实时更新" },
    },
    {
      id: "from",
      title: { en: "Start Value", zh: "起始值" },
    },
    {
      id: "spring",
      title: { en: "Spring", zh: "弹簧动画" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "With reduced motion the number jumps to its value without counting. Screen readers get the final formatted value from a visually hidden copy.", zh: "启用减少动态效果时，数字直接跳到目标值，不进行计数。屏幕阅读器从视觉上隐藏的副本获取最终格式化值。" },
    },
    {
      title: "Related",
      body: { en: "[Number Ticker](/docs/number-ticker) rolls each digit like an odometer instead.", zh: "改用 [Number Ticker](/docs/number-ticker) 让每个数字像里程表一样滚动。" },
    },
  ],
  api: [
    {
      name: "AnimatedNumber",
      description: { en: "A formatted number that counts to `value` on a spring.", zh: "一个格式化数字，以弹簧动画计数到 `value`。" },
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: { en: "The number to count to.", zh: "要计数到的数字。" } },
        { name: "from", type: "number", default: "0", description: { en: "Where the count starts on first reveal.", zh: "首次出现时计数的起始值。" } },
        {
          name: "locale",
          type: "string",
          default: "runtime locale",
          description: { en: "Locale for `Intl.NumberFormat`.", zh: "`Intl.NumberFormat` 的区域设置。" },
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: { en: "Currency, percent, compact, fraction digits and so on.", zh: "货币、百分比、紧凑格式、小数位数等。" },
        },
        {
          name: "startOnView",
          type: "boolean",
          default: "true",
          description: { en: "Wait until half the number scrolls into view before counting.", zh: "等待数字有一半滚入视口后再开始计数。" },
        },
        { name: "stiffness", type: "number", default: "380", description: { en: "Spring stiffness; higher settles faster.", zh: "弹簧刚度；越高稳定越快。" } },
        { name: "damping", type: "number", default: "42", description: { en: "Spring damping; the default is slightly overdamped so the count never overshoots, and lower values overshoot the target.", zh: "弹簧阻尼；默认略微过阻尼，使计数永不超出目标，较低的值会超出目标。" } },
        { name: "mass", type: "number", default: "0.7", description: { en: "Spring mass.", zh: "弹簧质量。" } },
      ],
      dataAttributes: [{ name: "data-slot", description: { en: "\"animated-number\"", zh: "\"animated-number\"" } }],
    },
  ],
} satisfies ComponentDoc
