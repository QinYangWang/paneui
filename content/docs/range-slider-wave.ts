import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Slider", href: "https://base-ui.com/react/components/slider" },
  usage: {
    imports: `import { RangeSliderWave } from "@/components/ui/range-slider-wave"`,
    code: `<RangeSliderWave label="Bass boost" defaultValue={58} />`,
  },
  examples: [
    {
      id: "bars",
      title: "Bars and Spread",
      description: "`bars` sets how many equalizer bars there are and `spread` how many bars wide the crest is.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "A centred range (`min={-12}`, `max={12}`) driven by `value` / `onValueChange`, with a reset.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the slider and blocks input." },
  ],
  notes: [
    {
      title: "Motion",
      body: "Bars rise into a crest around the value on a spring, staggered by distance, and stretch taller while pressed. With reduced motion bars sit at two fixed heights (filled and unfilled) without animating.",
    },
    {
      title: "Related",
      body: "Other range sliders: [Range Slider Inline](/docs/range-slider-inline), [Range Slider Fluid](/docs/range-slider-fluid), [Range Slider Bubble](/docs/range-slider-bubble), [Range Slider Ruler](/docs/range-slider-ruler).",
    },
  ],
  api: [
    {
      name: "RangeSliderWave",
      description: "Equalizer slider: bars up to the value are primary and crest around it. Single value only.",
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
        { name: "bars", type: "number", default: "28", description: "Number of equalizer bars." },
        { name: "spread", type: "number", default: "2.4", description: "Crest width in bars; bigger spreads the bell wider." },
        { name: "label", type: "string", description: "Heading row above the bars. Also the accessible name of the thumb." },
        {
          name: "aria-label / aria-labelledby",
          type: "string",
          description: "Name the thumb without a visible `label` (forwarded to the thumb's input). Without any of the three, a dev-only console warning fires.",
        },
        { name: "formatValue", type: "(value: number) => string", default: "String", description: "Formats the readout in the heading row and the announced value." },
      ],
      dataAttributes: [{ name: "data-disabled", description: "Present when disabled." }],
    },
  ],
} satisfies ComponentDoc
