import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TextScramble } from "@/components/ui/text-scramble"`,
    code: `<TextScramble value={status} />`,
  },
  examples: [
    {
      id: "on-mount",
      title: "Scramble On Mount",
      description: "Add `scrambleOnMount` to decode the first value too; remount with a `key` to replay it.",
    },
    {
      id: "glyphs",
      title: "Custom Glyphs",
      description: "`glyphs` sets the characters sampled while a position is unresolved, here hexadecimal only.",
    },
    {
      id: "duration",
      title: "Duration",
      description: "`duration` fixes the total time in ms; left unset it scales with the text length between 360 and 900ms.",
    },
    {
      id: "on-complete",
      title: "On Complete",
      description: "`onComplete` fires once the new `value` has fully resolved.",
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
