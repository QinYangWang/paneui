import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { TextShimmer } from "@/components/ui/text-shimmer"`,
    code: `<TextShimmer>Checking flight prices…</TextShimmer>`,
  },
  examples: [
    {
      id: "elements",
      title: "Elements",
      description: "Use `as` when the shimmer is a heading or paragraph rather than inline text.",
    },
    {
      id: "speed",
      title: "Speed",
      description: "Use a longer `duration` for long waits.",
    },
    {
      id: "spread",
      title: "Spread",
      description: "Use a wider `spread` on large headings.",
    },
    {
      id: "colors",
      title: "Colors",
      description:
        "Use on coloured surfaces, setting `--shimmer-base` and `--shimmer-highlight` through `style`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The sweep is a CSS keyframe animation shipped with the component. Under `prefers-reduced-motion: reduce` it stops and the gradient rests at its midpoint.",
    },
    {
      title: "Related",
      body: "[Text Scramble](/docs/text-scramble), [Text Cascade](/docs/text-cascade), [Text Reveal](/docs/text-reveal).",
    },
  ],
  api: [
    {
      name: "TextShimmer",
      description: "Text with a looping highlight swept across it via a clipped background gradient.",
      extends: "HTML element (span by default)",
      props: [
        {
          name: "as",
          type: `"span" | "p" | "div" | "h1" | "h2" | "h3" | "h4"`,
          default: `"span"`,
          description: "Element to render.",
        },
        { name: "duration", type: "number", default: "2.2", description: "Seconds for one sweep." },
        {
          name: "spread",
          type: "number",
          default: "14",
          description: "Width of the bright band, as a percentage of the gradient.",
        },
        {
          name: "style",
          type: "CSSProperties",
          description: "Merged over the generated gradient and animation; set `--shimmer-base` / `--shimmer-highlight` here.",
        },
      ],
      dataAttributes: [{ name: "data-slot", description: `"text-shimmer"` }],
    },
  ],
} satisfies ComponentDoc
