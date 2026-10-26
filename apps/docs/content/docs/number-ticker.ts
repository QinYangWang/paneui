import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Number whose digits roll to each new value.", "zh": "滚动显示数值变化。"},
  usage: {
    imports: `import { NumberTicker } from "@/components/ui/number-ticker"`,
    code: `<NumberTicker value={1284.5} locale="en-US" format={{ style: "currency", currency: "USD" }} />`,
  },
  examples: [
    {
      id: "formats",
      title: { en: "Formats", zh: "格式" },
      description: { en: "Use for currency, percentages or compact counts.", zh: "适用于金额、百分比或缩写计数。" },
    },
    {
      id: "stagger",
      title: { en: "Stagger and Transition", zh: "交错与过渡" },
      description: { en: "Use when the default roll feels too fast or too even.", zh: "适用于默认滚动节奏不合适的场景。" },
    },
    {
      id: "live",
      title: { en: "Live Counter", zh: "实时计数" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: { en: "Only digits roll; separators and symbols stay still. With reduced motion digits jump straight to their value. The formatted number is read from a visually hidden copy for screen readers.", zh: "只有数字滚动；分隔符和符号保持不动。在减少动态效果下，数字直接跳到其值。格式化后的数字从视觉隐藏的副本中读取，供屏幕阅读器使用。" },
    },
    {
      title: "Related",
      body: { en: "[Animated Number](/docs/animated-number) counts smoothly instead of rolling digits; [Digit Swap](/docs/digit-swap).", zh: "[Animated Number](/docs/animated-number) 平滑计数而不是滚动数字；[Digit Swap](/docs/digit-swap)。" },
    },
  ],
  api: [
    {
      name: "NumberTicker",
      description: { en: "A number whose digits roll like an odometer when `value` changes.", zh: "一个数字，当 `value` 变化时其数字像里程表一样滚动。" },
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: { en: "The number to show.", zh: "要显示的数字。" } },
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
          description: { en: "Hold every digit at 0 until half the number scrolls into view, then roll.", zh: "每个数字保持在 0，直到数字的一半滚入视野，然后滚动。" },
        },
        {
          name: "stagger",
          type: "number",
          default: "0.045",
          description: { en: "Seconds between neighbouring digits, rippling from the right.", zh: "相邻数字之间的秒数，从右侧开始涟漪。" },
        },
        {
          name: "transition",
          type: "Transition",
          default: `{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }`,
          description: { en: "motion transition merged over the default spring.", zh: "合并到默认弹簧上的 motion transition。" },
        },
        { name: "digitClassName", type: "string", description: { en: "Classes for each rolling digit column.", zh: "每个滚动数字列的类名。" } },
      ],
      dataAttributes: [
        { name: "data-slot", description: { en: "\"number-ticker\" on the root, \"number-ticker-digit\" on each digit column.", zh: "根上为 \"number-ticker\"，每个数字列上为 \"number-ticker-digit\"。" } },
      ],
    },
  ],
} satisfies ComponentDoc
