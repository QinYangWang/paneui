import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Radio Group", href: "https://base-ui.com/react/components/radio" },
  usage: {
    imports: `import { ColorSelector, ColorSwatch } from "@/components/ui/color-selector"`,
    code: `<ColorSelector aria-label="Accent colour" defaultValue="blue">
  <ColorSwatch value="blue" color="oklch(0.6 0.19 255)" label="Blue" />
  <ColorSwatch value="rose" color="oklch(0.64 0.2 10)" label="Rose" />
</ColorSelector>`,
  },
  composition: `ColorSelector
└── ColorSwatch`,
  examples: [
    {
      id: "sizes",
      title: "Sizes",
      description: "`size` on `ColorSelector` sets every swatch to 20px (`sm`), 28px (`default`) or 36px (`lg`) and adjusts the gap.",
    },
    {
      id: "css-values",
      title: "CSS Values",
      description: "Leave out `color` and the swatch paints its `value` directly, so theme tokens like `var(--primary)` work as values.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Disable one `ColorSwatch`, or the whole `ColorSelector` with `disabled`. Uncontrolled here via `defaultValue`.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "It is a radio group: `Tab` focuses the selected swatch and the arrow keys move the choice. Give the group an `aria-label`; each swatch is labelled by `label` (or `value`).",
    },
    {
      title: "Motion",
      body: "The selection ring glides between swatches on a spring (420 / 32 / 0.6). With reduced motion it moves instantly.",
    },
  ],
  api: [
    {
      name: "ColorSelector",
      description: "Radio group of colour swatches.",
      extends: "Base UI RadioGroup",
      extendsHref: "https://base-ui.com/react/components/radio#radio-group",
      props: [
        { name: "value", type: "string", description: "Controlled selected swatch value." },
        { name: "defaultValue", type: "string", description: "Initially selected swatch value." },
        {
          name: "onValueChange",
          type: "(value: string, details) => void",
          description: "Called when the selection changes.",
        },
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Swatch size for every child." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable the whole group." },
      ],
      dataAttributes: [
        { name: "data-size", description: "The `size` value (also set on each swatch)." },
        { name: "data-disabled", description: "Present when the group is disabled." },
      ],
    },
    {
      name: "ColorSwatch",
      description: "One round swatch.",
      extends: "Base UI Radio.Root",
      extendsHref: "https://base-ui.com/react/components/radio#root",
      props: [
        { name: "value", type: "string", required: true, description: "Identifies the swatch in the group." },
        { name: "color", type: "string", default: "value", description: "Any CSS colour to paint. Falls back to `value`." },
        {
          name: "label",
          type: "string",
          default: "value",
          description: "Accessible name and native tooltip.",
        },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this swatch." },
      ],
      dataAttributes: [
        { name: "data-checked", description: "Present on the selected swatch." },
        { name: "data-disabled", description: "Present when the swatch is disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
