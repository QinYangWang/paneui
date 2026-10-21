import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: { en: "Opt-in style with warm paper, serif titles and pill controls.", zh: "可选的纸张风格：暖色纸面、衬线标题与胶囊控件。" },
  usage: {
    imports: `/* your Tailwind CSS file, after the theme */
@import "./theme-paper.css";`,
    code: `<html data-style="paper">`,
  },
  examples: [
    {
      id: "section",
      title: { en: "One Section", zh: "局部区域" },
      description: { en: "Use the attribute on a section to preview the style before switching the whole page.", zh: "适用于在切换整页之前先在局部预览。" },
    },
  ],
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
