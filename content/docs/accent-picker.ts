import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { AccentPicker, AccentPresets } from "@/components/ui/accent-picker"`,
    code: `// once, near the top of your root layout's <body>
<AccentPresets />

// in your appearance settings
<AccentPicker showLabels />`,
  },
  examples: [],
  notes: [
    { title: "How it works", body: "It sets `data-accent` on `<html>` (blue, the default, has no attribute) and stores the pick in `localStorage[\"accent\"]`. The preset roles ship inside the component as CSS and are injected once, so it works in any app with `@taimatsu/theme`. `AccentPresets` renders that CSS plus a pre-paint script so a reload never flashes the default." },
    { title: "Custom control", body: "`useAccent()` returns `[accent, setAccent]` for a menu or select of your own." },
  ],
  api: [
    {
      name: "AccentPicker",
      extends: "RadioGroup",
      props: [
        { name: "accents", type: "Accent[]", default: "all six", description: "Presets to offer, from `blue`, `neutral`, `green`, `orange`, `rose` and `violet`." },
        { name: "showLabels", type: "boolean", default: "false", description: "Names under the swatches." },
      ],
    },
    { name: "useAccent", description: "Returns `[accent, setAccent]`, kept in sync across pickers and tabs.", props: [] },
    { name: "AccentPresets", description: "`<style>` with the presets plus a pre-paint script.", props: [] },
  ],
} satisfies ComponentDoc
