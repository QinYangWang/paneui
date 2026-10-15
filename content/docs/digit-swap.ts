import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { DigitSwap } from "@/components/ui/digit-swap"`,
    code: `<DigitSwap value={count} />`,
  },
  examples: [
    {
      id: "auto-direction",
      title: "Auto Direction",
      description: "Keep the default `direction=\"auto\"` for values that can rise or fall.",
    },
    {
      id: "odometer",
      title: "Odometer",
      description: "Use `staggerFrom=\"end\"` for counters, so a carry ripples right to left.",
    },
    {
      id: "fixed-direction",
      title: "Fixed Direction",
      description: "Pin `direction=\"down\"` (or `\"up\"`) for clocks and countdowns, where every tick should move the same way.",
    },
    {
      id: "replay",
      title: "Replay",
      description: "Change `animationKey` to replay the roll on reveal when the value hasn't changed.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Glyphs slide 60% and blur 2px while fading, with an ease-out curve. With reduced motion they only cross-fade, capped at 150ms and with no stagger.",
    },
    {
      title: "Accessibility",
      body: "The full value is rendered once as screen-reader text; the animated glyphs are `aria-hidden`.",
    },
  ],
  api: [
    {
      name: "DigitSwap",
      description: "Fixed-slot characters that roll when they change. Digits sit in `1ch` slots keyed from the right, so nothing jitters.",
      extends: "span",
      props: [
        {
          name: "value",
          type: "string | number",
          required: true,
          description: "Number or pre-formatted string (`\"$1,204\"`, `\"•••• 4242\"`). Each character gets its own slot.",
        },
        {
          name: "direction",
          type: `"up" | "down" | "auto"`,
          default: `"auto"`,
          description: "Where new glyphs enter from. `auto` picks `up` when the numeric value grows and `down` when it shrinks.",
        },
        { name: "duration", type: "number", default: "0.32", description: "Seconds per glyph roll." },
        { name: "stagger", type: "number", default: "0.02", description: "Seconds between neighbouring glyphs." },
        {
          name: "staggerFrom",
          type: `"start" | "end"`,
          default: `"start"`,
          description: "Which end the stagger starts from. `end` ripples right to left.",
        },
        {
          name: "animationKey",
          type: "string | number",
          description: "Change it to replay every glyph even when the characters are the same.",
        },
        {
          name: "suffixLength",
          type: "number",
          default: "0",
          description: "Number of trailing characters that get `suffixClassName` (units, cents, `/mo`).",
        },
        { name: "glyphClassName", type: "string", description: "Class for each animated glyph." },
        { name: "suffixClassName", type: "string", description: "Class for the trailing `suffixLength` slots." },
      ],
      dataAttributes: [
        { name: "data-direction", description: "`up` or `down`: the direction of the latest roll." },
      ],
    },
  ],
} satisfies ComponentDoc
