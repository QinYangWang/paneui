import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ChromaticTextReveal } from "@/components/ui/chromatic-text-reveal"`,
    code: `<ChromaticTextReveal prefix="Built to feel" words={["fast", "calm"]} />`,
  },
  examples: [
    {
      id: "play-once",
      title: "Play Once",
      description: "Set `loop={false}` to stop on the last word instead of cycling back to the first.",
    },
    {
      id: "single-word",
      title: "Single Word",
      description: "Leave out `prefix` and pass one word for a one-off headline reveal; `delay` holds it back after it scrolls into view.",
    },
    {
      id: "custom-colors",
      title: "Custom Colors",
      description: "`colors` takes the three channel colours that split apart and converge; theme variables work.",
    },
    {
      id: "timing",
      title: "Timing",
      description: "`duration` sets the sweep length and `pauseDuration` how long each word rests.",
    },
    {
      id: "inline",
      title: "Inline",
      description: "It renders a `span`, so it flows inside a sentence. `startOnView={false}` starts it on mount.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Each word sweeps in through a left-to-right mask while its colour channels slide back together and the blur clears. With reduced motion the channels are skipped and words cross-fade.",
    },
    {
      title: "Accessibility",
      body: "The animated text is `aria-hidden`; screen readers read the prefix and the first word once. The slot reserves the widest word, so the line never reflows.",
    },
  ],
  api: [
    {
      name: "ChromaticTextReveal",
      extends: "span",
      props: [
        { name: "words", type: "string[]", required: true, description: "Final words, revealed one after another." },
        { name: "prefix", type: "string", description: "Fixed text before the cycling word." },
        {
          name: "colors",
          type: "[string, string, string]",
          default: "red, green and blue `oklch()` channels",
          description: "Three channel colours that split apart and converge.",
        },
        { name: "duration", type: "number", default: "0.9", description: "Seconds the reveal sweep takes." },
        { name: "pauseDuration", type: "number", default: "1.8", description: "Seconds a word rests before the next one." },
        { name: "delay", type: "number", default: "0", description: "Seconds before the first reveal." },
        { name: "loop", type: "boolean", default: "true", description: "Go back to the first word after the last one." },
        {
          name: "startOnView",
          type: "boolean",
          default: "true",
          description: "Wait until 40% of the text scrolls into view.",
        },
      ],
    },
  ],
} satisfies ComponentDoc
