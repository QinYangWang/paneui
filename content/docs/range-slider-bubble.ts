import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Slider",
    href: "https://base-ui.com/react/components/slider",
  },
  usage: {
    imports: `import { RangeSliderBubble } from "@/components/ui/range-slider-bubble"`,
    code: `<RangeSliderBubble label="Max price" min={40} max={400} defaultValue={160} formatValue={(v) => \`$\${v}\`} />`,
  },
  examples: [
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `value` and `onValueChange` to mirror the value elsewhere; `onValueChange` receives a plain number.",
    },
    {
      id: "format-value",
      title: "Format Value",
      description: "`formatValue` sets the bubble text and the announced value. Combine it with `step` for coarse values.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "Add `disabled` to dim the slider and block dragging and keyboard input.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "The bubble pops out on grab or keyboard focus, leans into the direction of travel and squashes with drag speed. With reduced motion it only fades in and out and stays upright.",
    },
    {
      title: "Related",
      body: "[Range Slider Inline](/docs/range-slider-inline), [Range Slider Fluid](/docs/range-slider-fluid), [Range Slider Wave](/docs/range-slider-wave), [Range Slider Ruler](/docs/range-slider-ruler).",
    },
  ],
  api: [
    {
      name: "RangeSliderBubble",
      description: "Single-thumb slider with a value bubble above the thumb.",
      extends: "Base UI Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "value", type: "number", description: "Controlled value." },
        { name: "defaultValue", type: "number", default: "min", description: "Initial value when uncontrolled." },
        {
          name: "onValueChange",
          type: "(value: number, details: Slider.Root.ChangeEventDetails) => void",
          description: "Called as the value changes.",
        },
        { name: "min", type: "number", default: "0", description: "Lowest value." },
        { name: "max", type: "number", default: "100", description: "Highest value." },
        { name: "step", type: "number", default: "1", description: "Increment between values." },
        {
          name: "formatValue",
          type: "(value: number) => string",
          default: "String",
          description: "Formats the bubble text and the thumb's `aria-valuetext`.",
        },
        { name: "label", type: "string", description: "Accessible name of the thumb." },
      ],
      dataAttributes: [
        { name: "data-disabled", description: "Present when disabled (root dims to 50%)." },
        { name: "data-dragging", description: "On the thumb while it is being dragged (thumb scales up)." },
      ],
    },
  ],
} satisfies ComponentDoc
