import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Slider",
    href: "https://base-ui.com/react/components/slider",
  },
  usage: {
    imports: `import { Slider } from "@/components/ui/slider"`,
    code: `<Slider defaultValue={40} aria-label="Creativity" />`,
  },
  examples: [
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when the value is shown or used elsewhere.",
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "Use in tall, narrow spaces such as a mixer column.",
    },
    {
      id: "tick-count",
      title: "Tick Count",
      description: "Use when the steps matter, such as a rating.",
    },
    { id: "disabled", title: "Disabled" },
    { id: "sizes", title: "Sizes" },
  ],
  notes: [
    {
      title: "Motion",
      body: "With reduced motion the thumb and value bubble don't animate.",
    },
    {
      title: "Keyboard",
      body: "Arrow keys move the focused thumb by `step`; Page Up / Page Down and Home / End jump further.",
    },
    {
      title: "Related",
      body: "For a single value with the label on the track, see [Range Slider Inline](/docs/range-slider-inline).",
    },
  ],
  api: [
    {
      name: "Slider",
      description: "Inset track, primary fill and a raised thumb. Pass an array value for a range.",
      extends: "Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "size", type: `"sm" | "default" | "lg"`, default: `"default"`, description: "Thumb 16 / 20 / 24px on a 6 / 8 / 10px track. Inside a sized `Field` it takes the field's size (`xs` maps to `sm`)." },
        {
          name: "ticks",
          type: "boolean | number",
          description: "Dots along the track. `true` draws one per step; a number (2–101) draws that many, evenly spaced.",
        },
        {
          name: "showValue",
          type: `boolean | "always"`,
          description: "`true` shows a value bubble over each thumb on hover, focus and drag; `\"always\"` keeps it up.",
        },
        {
          name: "getThumbLabel",
          type: "(index: number) => string",
          description: "Accessible label per thumb, e.g. `(i) => (i ? \"Max\" : \"Min\")` for a range.",
        },
        { name: "min", type: "number", default: "0", description: "Lowest value." },
        { name: "max", type: "number", default: "100", description: "Highest value." },
        { name: "step", type: "number", default: "1", description: "Step between values." },
        {
          name: "orientation",
          type: `"horizontal" | "vertical"`,
          default: `"horizontal"`,
          description: "Layout direction. Vertical fills the parent's height, at least 160px.",
        },
        {
          name: "thumbAlignment",
          type: `"edge" | "center"`,
          default: `"edge"`,
          description: "`edge` keeps the thumb inside the track at both ends (the primitive defaults to `center`).",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formats the value bubble, e.g. currency.",
        },
      ],
      dataAttributes: [
        { name: "data-size", description: "On the root, the resolved size." },
        { name: "data-dragging", description: "On the thumb while it is dragged (scaled up)." },
        { name: "data-active", description: "On a tick (`data-slot=\"slider-tick\"`) inside the selected range." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
