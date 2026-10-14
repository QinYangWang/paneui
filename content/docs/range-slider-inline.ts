import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Slider", href: "https://base-ui.com/react/components/slider" },
  usage: {
    imports: `import { RangeSliderInline } from "@/components/ui/range-slider-inline"`,
    code: `<RangeSliderInline label="Volume" defaultValue={64} />`,
  },
  examples: [
    {
      id: "stops",
      title: "Stops",
      description: "Ten stop markers are on by default; `snapToStops` settles onto the nearest one when a drag or track press ends, and `showStops={false}` hides them.",
    },
    {
      id: "format",
      title: "Custom Range and Format",
      description: "Set `min`, `max` and `step`, and `formatValue` for the readout and the announced value.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "`value` / `onValueChange` for live updates and `onValueCommitted` to save once the gesture ends.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the slider and blocks input." },
  ],
  notes: [
    {
      title: "Motion",
      body: "The fill and thumb ease to clicked or keyed values over 300ms and track the pointer directly while dragging; the thumb is a single grey bar (darker while hovered or dragged) that fades out while it crosses the label or readout. At min and max the fill sits the same 4px inside the well on both ends. With reduced motion everything moves instantly.",
    },
    {
      title: "Related",
      body: "For a plain single or two-thumb slider, use [Slider](/docs/slider).",
    },
  ],
  api: [
    {
      name: "RangeSliderInline",
      description: "A raised fill inside an inset well, with the label and value printed on the track. Single value only.",
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
        { name: "label", type: "string", required: true, description: "Text inside the left edge of the well. Also the thumb's accessible name." },
        { name: "formatValue", type: "(value: number) => string", default: "String", description: "Formats the readout and the announced value." },
        { name: "showStops", type: "boolean", default: "true", description: "Paint ten evenly spaced stop markers." },
        { name: "snapToStops", type: "boolean", default: "false", description: "On pointer release, settle onto the nearest of the ten stops." },
      ],
      dataAttributes: [
        { name: "data-dragging", description: "Present on the root while dragging (Base UI)." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
