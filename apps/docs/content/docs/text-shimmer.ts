import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Highlights text while work is in progress.", "zh": "通过文字高亮提示正在处理。"},
  usage: {
    imports: `import { TextShimmer } from "@/components/ui/text-shimmer"`,
    code: `<TextShimmer>Checking flight prices…</TextShimmer>`,
  },
  examples: [
    {
      id: "elements",
      title: { en: "Elements", zh: "元素" },
    },
    {
      id: "speed",
      title: { en: "Speed", zh: "速度" },
    },
    {
      id: "spread",
      title: { en: "Spread", zh: "展开范围" },
    },
    {
      id: "colors",
      title: { en: "Colors", zh: "颜色" },
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The sweep is a CSS keyframe animation shipped with the component. The band enters and leaves fully clear of the text, so the loop has no visible reset. Under `prefers-reduced-motion: reduce` it stops with the band resting mid-text.",
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
          description: "Width of the bright band; 14 spans about half the text.",
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
