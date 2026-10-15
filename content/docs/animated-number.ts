import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AnimatedNumber } from "@/components/ui/animated-number"`,
    code: `<AnimatedNumber value={1842} locale="en-US" />`,
  },
  examples: [
    {
      id: "live",
      title: "Live Updates",
      description: "Use `startOnView={false}` when the number is already on screen and updates live.",
    },
    {
      id: "from",
      title: "Start Value",
      description: "Use `from` to count down, or to start from a previous total.",
    },
    {
      id: "spring",
      title: "Spring",
      description: "Tune `stiffness`, `damping` and `mass` to match the pace of nearby motion.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "With reduced motion the number jumps to its value without counting. Screen readers get the final formatted value from a visually hidden copy.",
    },
    {
      title: "Related",
      body: "[Number Ticker](/docs/number-ticker) rolls each digit like an odometer instead.",
    },
  ],
  api: [
    {
      name: "AnimatedNumber",
      description: "A formatted number that counts to `value` on a spring.",
      extends: "span",
      props: [
        { name: "value", type: "number", required: true, description: "The number to count to." },
        { name: "from", type: "number", default: "0", description: "Where the count starts on first reveal." },
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
          description: "Wait until half the number scrolls into view before counting.",
        },
        { name: "stiffness", type: "number", default: "380", description: "Spring stiffness; higher settles faster." },
        { name: "damping", type: "number", default: "42", description: "Spring damping; the default is slightly overdamped so the count never overshoots, and lower values overshoot the target." },
        { name: "mass", type: "number", default: "0.7", description: "Spring mass." },
      ],
      dataAttributes: [{ name: "data-slot", description: `"animated-number"` }],
    },
  ],
} satisfies ComponentDoc
