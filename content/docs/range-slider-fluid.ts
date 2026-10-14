import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Slider", href: "https://base-ui.com/react/components/slider" },
  usage: {
    imports: `import { RangeSliderFluid } from "@/components/ui/range-slider-fluid"`,
    code: `<RangeSliderFluid label="Opacity" defaultValue={72} />`,
  },
  examples: [
    {
      id: "format",
      title: "Custom Range and Format",
      description: "`formatValue` controls the right-hand text, e.g. a multiplier or an `Off` state at zero. The default appends `%`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Drive it with `value` / `onValueChange`, here alongside preset buttons.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the pill and blocks input." },
  ],
  notes: [
    {
      title: "Motion",
      body: "The primary fill glides to the value on a spring and the pill swells slightly while pressed; the text flips to the on-primary colour exactly where the fill covers it. With reduced motion the fill jumps and the pill doesn't scale.",
    },
    {
      title: "Related",
      body: "Other range sliders: [Range Slider Inline](/docs/range-slider-inline), [Range Slider Wave](/docs/range-slider-wave), [Range Slider Bubble](/docs/range-slider-bubble), [Range Slider Ruler](/docs/range-slider-ruler).",
    },
  ],
  api: [
    {
      name: "RangeSliderFluid",
      description: "Thumbless slider: the whole pill is the control. Single value only.",
      extends: "Base UI Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "value", type: "number", description: "Controlled value." },
        { name: "defaultValue", type: "number", default: "min", description: "Initial value when uncontrolled." },
        {
          name: "onValueChange",
          type: "(value: number, details: Slider.Root.ChangeEventDetails) => void",
          description: "Called on every change, with a single number rather than an array.",
        },
        { name: "min", type: "number", default: "0", description: "Lowest value." },
        { name: "max", type: "number", default: "100", description: "Highest value." },
        { name: "step", type: "number", default: "1", description: "Value granularity." },
        { name: "label", type: "string", description: "Text on the left of the pill. Also the accessible name; set it, since there is no visible thumb." },
        { name: "formatValue", type: "(value: number) => string", default: 'v => v + "%"', description: "Formats the value on the right and the announced value." },
      ],
      dataAttributes: [{ name: "data-disabled", description: "Present when disabled." }],
    },
  ],
} satisfies ComponentDoc
