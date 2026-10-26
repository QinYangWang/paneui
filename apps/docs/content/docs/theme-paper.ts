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
      body: { en: "Surfaces, greys and text turn warm, titles read `--font-heading` (a text serif), controls read `--radius-control` (pills), the base radius rises to `0.75rem` and shadows soften. Accent presets, radius presets and dark mode keep working on top.", zh: "表面、灰色和文本变为暖色，标题使用 `--font-heading`（一种文本衬线字体），控件使用 `--radius-control`（药丸形），基础圆角升至 `0.75rem`，阴影变柔和。主题色预设、圆角预设和深色模式仍可在其上工作。" },
    },
    {
      title: "Fonts",
      body: { en: "The title serif ships with the `fonts` item. Without it, titles fall back to the system serif.", zh: "标题衬线字体随 `fonts` 项提供。没有它，标题回退到系统衬线字体。" },
    },
  ],
  api: [],
} satisfies ComponentDoc
