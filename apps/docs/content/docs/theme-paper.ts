import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "The site's style: paper surfaces, serif titles and pill controls.", zh: "本站使用的风格：纸面、衬线标题与胶囊控件。" },
  usage: {
    imports: `/* your Tailwind CSS file, after the theme */
@import "./theme-paper.css";`,
    code: `<html data-style="paper">`,
  },
  examples: [],
  notes: [
    {
      title: "What changes",
      body: "Surfaces, greys and text turn warm, titles read `--font-heading` (a text serif), controls read `--radius-control` (pills), the base radius rises to `0.75rem` and shadows soften. Accent presets, radius presets and dark mode keep working on top.",
    },
    {
      title: "Fonts",
      body: "The title serif ships with the `fonts` item. Without it, titles fall back to the system serif.",
    },
  ],
  api: [],
} satisfies ComponentDoc
