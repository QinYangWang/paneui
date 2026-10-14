import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { RangeSliderRuler } from "@/components/ui/range-slider-ruler"`,
    code: `<RangeSliderRuler label="Body weight" unit="kg" min={30} max={150} step={0.5} defaultValue={72.5} />`,
  },
  examples: [
    {
      id: "uncontrolled",
      title: "Uncontrolled",
      description: "Give a `defaultValue` and let the ruler keep its own state. Without a `unit` the readout is the bare number.",
    },
    {
      id: "committed",
      title: "On Value Committed",
      description: "`onValueCommitted` fires once a drag, flick, wheel or key press has settled, so you can save without reacting to every tick.",
    },
    {
      id: "scale",
      title: "Scale Density",
      description: "`gap` sets the pixels between steps and `majorEvery` how often a tall, labelled tick appears.",
    },
    {
      id: "disabled",
      title: "Disabled",
      description: "`disabled` dims the ruler, removes it from the tab order and ignores pointer, wheel and keys.",
    },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The scale is a `role=\"slider\"`. Arrow keys move one `step`, Page Up / Page Down move `step × majorEvery`, Home and End jump to the ends. Horizontal trackpad scroll also nudges it.",
    },
    {
      title: "Related",
      body: "[Range Slider Inline](/docs/range-slider-inline), [Range Slider Fluid](/docs/range-slider-fluid), [Range Slider Wave](/docs/range-slider-wave), [Range Slider Bubble](/docs/range-slider-bubble).",
    },
  ],
  api: [
    {
      name: "RangeSliderRuler",
      description: "Fixed needle over a draggable scale that coasts after a flick and snaps to the nearest tick. With reduced motion it jumps instead of springing.",
      extends: "div",
      props: [
        { name: "value", type: "number", description: "Controlled value." },
        { name: "defaultValue", type: "number", default: "min", description: "Initial value when uncontrolled." },
        { name: "onValueChange", type: "(value: number) => void", description: "Called whenever the value under the needle changes." },
        {
          name: "onValueCommitted",
          type: "(value: number) => void",
          description: "Called once a drag, flick, wheel or key press has settled.",
        },
        { name: "min", type: "number", default: "0", description: "Lowest value." },
        { name: "max", type: "number", default: "100", description: "Highest value. If it is off the step grid, the scale ends on the last whole step below it (min 0, max 11, step 3 ends at 9), never above." },
        { name: "step", type: "number", default: "1", description: "Value between two ticks; its decimals set the readout precision." },
        { name: "gap", type: "number", default: "12", description: "Pixels between two steps on the scale." },
        { name: "majorEvery", type: "number", default: "5", description: "Every Nth step is a tall, labelled tick." },
        { name: "unit", type: "string", description: "Unit after the readout, e.g. `\"kg\"`." },
        { name: "label", type: "string", description: "Accessible name; also shown above the readout." },
        { name: "disabled", type: "boolean", default: "false", description: "Dims the ruler and ignores input." },
      ],
      dataAttributes: [
        { name: "data-disabled", description: "On the root when disabled." },
        { name: "data-grabbing", description: "On the scale while it is being dragged." },
      ],
    },
  ],
} satisfies ComponentDoc
