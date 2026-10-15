import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `/* app/globals.css, after Tailwind */
@import "./typeset.css";`,
    code: `<article className="typeset typeset-docs">{content}</article>`,
  },
  examples: [],
  api: [],
  notes: [
    {
      title: "Presets",
      body: "Use `typeset-docs` for notes and guides (14px), `typeset-reading` for articles (16px) and `typeset-chat` for messages and streamed answers (14px, tighter flow). Each preset only sets `--typeset-size`, `--typeset-leading` and `--typeset-flow`, so a one-off works too: `className=\"typeset [--typeset-flow:1.5em]\"`.",
    },
    {
      title: "Components inside prose",
      body: "Every library component carries `data-slot` and is skipped automatically. Wrap anything else in `not-typeset`. Utilities on an element override the typeset styles without `!important`.",
    },
    {
      title: "Streaming",
      body: "Spacing only flows downward (`margin-block-start`), so a new block never restyles the ones above it.",
    },
    {
      title: "Width",
      body: "Typeset sets no max width; add `max-w-reading` (68ch) on the container.",
    },
  ],
} satisfies ComponentDoc
