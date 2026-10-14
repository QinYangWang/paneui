import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { VoiceOrb } from "@/components/ui/voice-orb"`,
    code: `<VoiceOrb state="listening" level={0.4} />`,
  },
  examples: [
    {
      id: "states",
      title: "States",
      description: "Each `state` has its own rhythm: `idle` breathes, `listening` and `speaking` swell with `level`, `thinking` swirls faster.",
    },
    {
      id: "colors",
      title: "Colors",
      description: "`colors` takes three hex pigments: base, highlight and deep shadow. The orb paints on a canvas, so theme tokens can't reach it.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Set a pixel diameter with `size`, or leave it out and size the square with a `className` such as `size-24`.",
    },
    {
      id: "speed",
      title: "Speed",
      description: "`speed` multiplies the animation clock; `0` freezes the motion while keeping the shape.",
    },
    {
      id: "level",
      title: "Level",
      description: "Drive `level` (0–1) from your audio pipeline; a `MotionValue` updates the orb without re-rendering. Here a slider stands in for the mic.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Under reduced motion the orb draws a single still frame per prop change instead of animating. It also pauses while offscreen or when the tab is hidden.",
    },
    {
      title: "Accessibility",
      body: 'The orb is `role="img"` labelled "Voice assistant {state}" unless you pass `aria-label`. Pair it with a visible caption for what the assistant is doing.',
    },
  ],
  api: [
    {
      name: "VoiceOrb",
      description: "A canvas-painted liquid orb for voice interfaces.",
      extends: "div",
      props: [
        { name: "state", type: `"idle" | "listening" | "thinking" | "speaking"`, default: `"idle"`, description: "Motion character of the orb." },
        { name: "level", type: "number | MotionValue<number>", default: "0", description: "Normalised audio level 0–1. A `MotionValue` updates without re-rendering." },
        {
          name: "analyser",
          type: "AnalyserNode | null",
          default: "null",
          description: "Caller-owned Web Audio analyser; when set, its RMS level drives the orb instead of `level`. The orb never opens a microphone.",
        },
        {
          name: "colors",
          type: "readonly [string, string, string]",
          default: `["#3b82f6", "#a5f3fc", "#312e81"]`,
          description: "Pigments as hex: base, highlight, deep shadow.",
        },
        { name: "size", type: "number", description: "Diameter in px. Without it the orb is `size-40` and follows `className`." },
        { name: "speed", type: "number", default: "1", description: "Animation speed multiplier." },
        { name: "aria-label", type: "string", default: `"Voice assistant {state}"`, description: "Accessible name of the orb." },
      ],
      dataAttributes: [{ name: "data-state", description: "The current `state`." }],
    },
  ],
} satisfies ComponentDoc
