import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { AnimatedBadge } from "@/components/ui/animated-badge"`,
    code: `<AnimatedBadge status="success">Deployed</AnimatedBadge>`,
  },
  examples: [
    {
      id: "statuses",
      title: "Statuses",
      description: "Each `status` maps to a `Badge` tone and its own glyph: a dot, a spinner, a drawn check or cross, a nudging warning, or info.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "`sm`, `default` and `lg`; `lg` is 32px tall with a 16px glyph.",
    },
    {
      id: "counter",
      title: "Rolling Label",
      description: "Change the label (or `contentKey`) and the text rolls to the new value while the glyph swaps with the status.",
    },
    {
      id: "pulse",
      title: "Pulse",
      description: "`pulse` adds a soft ping ring behind the glyph for live or syncing states.",
    },
    {
      id: "custom-icon",
      title: "Custom Icon",
      description: "Replace the status glyph with `icon`, or hide it with `showIcon={false}`.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Glyphs swap with a spring rise, slight rotation and blur; checks and crosses draw in. With reduced motion glyphs cross-fade, the spinner pulses instead of rotating and the ping ring is hidden.",
    },
    {
      title: "Accessibility",
      body: "The badge has `role=\"status\"`, so label changes are announced politely. Glyphs are `aria-hidden`.",
    },
  ],
  api: [
    {
      name: "AnimatedBadge",
      description: "A status `Badge` whose glyph and label roll between states.",
      extends: "span",
      props: [
        {
          name: "status",
          type: `"idle" | "loading" | "success" | "error" | "warning" | "info"`,
          default: `"idle"`,
          description: "Sets the tone and glyph: `chip`, `primary`, `success`, `destructive`, `warning` and `primary` badge variants.",
        },
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Height, padding and glyph size." },
        { name: "children", type: "ReactNode", description: "Label. Rolls when it changes." },
        { name: "icon", type: "ReactNode", description: "Replace the built-in status glyph." },
        { name: "showIcon", type: "boolean", default: "true", description: "Show the glyph slot." },
        { name: "pulse", type: "boolean", default: "false", description: "Soft ping ring behind the glyph." },
        {
          name: "contentKey",
          type: "string | number",
          description: "Identity of the label; defaults to the text itself, or the status. Change it to roll the label.",
        },
      ],
      dataAttributes: [{ name: "data-status", description: "The current `status`." }],
    },
  ],
} satisfies ComponentDoc
