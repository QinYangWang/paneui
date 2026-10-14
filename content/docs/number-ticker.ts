import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { NumberTicker } from "@/components/ui/number-ticker"`,
    code: `<NumberTicker value={1284.5} locale="en-US" format={{ style: "currency", currency: "USD" }} />`,
  },
  examples: [
    {
      id: "formats",
      title: "Formats",
      description: "`format` takes any `Intl.NumberFormat` options: currency, percent or compact notation. Separators and symbols stay static; only digits roll.",
    },
    {
      id: "stagger",
      title: "Stagger and Transition",
      description: "`stagger` sets the seconds between neighbouring digits (rippling from the right) and `transition` replaces the roll spring.",
    },
    {
      id: "live",
      title: "Live Counter",
      description: "Set `startOnView={false}` for numbers that update on their own; `digitClassName` styles each rolling column.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Each digit is a column of 0–9 that springs to place. With reduced motion digits jump straight to their value. The formatted number is read from a visually hidden copy for screen readers.",
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
          default: `{ type: "spring", stiffness: 140, damping: 20, mass: 0.9 }`,
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
