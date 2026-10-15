import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `/* app/globals.css, after Tailwind */
@import "./typeset.css";`,
    code: `<article className="typeset typeset-docs">{content}</article>`,
  },
  examples: [
    {
      id: "content-slots",
      title: "Prose in Tabs",
      description: "Use `typeset` on a tab, accordion or collapsible panel (or `CardContent`) when its content is prose.",
    },
    {
      id: "nested",
      title: "Nested Panels",
    },
  ],
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
      title: "Prose inside components",
      body: "A component slot with `.typeset` or `data-typeset` styles its own content as prose again, inheriting the surrounding preset; components inside it stay skipped. `TabsPanel`, `AccordionPanel`, `CollapsiblePanel` and `CardContent` take a `typeset` prop that sets the attribute (and lets the accordion content keep the prose size and colour). `data-typeset=\"docs\"`, `\"reading\"` or `\"chat\"` picks a preset where there is no container. Re-enabling works three levels deep.",
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
