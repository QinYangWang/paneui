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
      body: "Only digits roll; separators and symbols stay still. With reduced motion digits jump straight to their value. The formatted number is read from a visually hidden copy for screen readers.",
    },
    {
      title: "Related",
      body: "[Animated Number](/docs/animated-number) counts smoothly instead of rolling digits; [Digit Swap](/docs/digit-swap).",
    },
  ],
  api: [
    {
      name: "NumberTicker",
      description: "A number whose digits roll like an odometer when `value` changes.",
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: "The number to show." },
        {
          name: "locale",
          type: "string",
          default: "runtime locale",
          description: "Locale for `Intl.NumberFormat`.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Currency, percent, compact, fraction digits and so on.",
        },
        {
          name: "startOnView",
          type: "boolean",
          default: "true",
          description: "Hold every digit at 0 until half the number scrolls into view, then roll.",
        },
        {
          name: "stagger",
          type: "number",
          default: "0.045",
          description: "Seconds between neighbouring digits, rippling from the right.",
        },
        {
          name: "transition",
          type: "Transition",
          default: `{ type: "spring", stiffness: 380, damping: 30, mass: 0.7 }`,
          description: "motion transition merged over the default spring.",
        },
        { name: "digitClassName", type: "string", description: "Classes for each rolling digit column." },
      ],
      dataAttributes: [
        { name: "data-slot", description: `"number-ticker" on the root, "number-ticker-digit" on each digit column.` },
      ],
    },
  ],
} satisfies ComponentDoc
