import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `/* your Tailwind CSS file, after the theme */
@import "./theme-accents.css";`,
    code: `<html data-accent="violet">`,
  },
  examples: [
    {
      id: "switch",
      title: "Switch at Runtime",
      description: "Use the attribute on a section when one part of a page needs its own accent.",
    },
  ],
  notes: [
    {
      title: "Presets",
      body: "`blue` (the default, also what no attribute gives), `neutral`, `green`, `orange`, `rose` and `violet`. Each sets the eight accent roles (`--primary` with its `-hover`, `-active`, `-foreground`, `-subtle`, `-subtle-hover` and `-border` variants, plus `--ring`), in light and under `.dark`. The values are the same as the single `theme-<name>` items, which bake one accent into the theme instead.",
    },
    {
      title: "Switching",
      body: "Set or remove the attribute with `document.documentElement.dataset.accent = \"rose\"`. To keep a pick across visits, store it and set the attribute in a pre-paint script, as the theme toggle does for `.dark`. For a ready-made control, see [Accent Picker](/docs/accent-picker).",
    },
    {
      title: "Radius presets",
      body: "`theme-radii` is the same idea for corners: `@import \"./theme-radii.css\"` and set `data-radius=\"none\" | \"sm\" | \"lg\" | \"xl\"` on `<html>` (no attribute or `default` is the theme radius). Install it from `/r/theme-radii.json`.",
    },
  ],
  api: [],
} satisfies ComponentDoc
