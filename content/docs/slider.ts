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
      description: "Pass `value` and `onValueChange` to show the value elsewhere.",
    },
    {
      id: "vertical",
      title: "Vertical",
      description: "`orientation=\"vertical\"` fills its parent's height (at least 160px).",
    },
    {
      id: "tick-count",
      title: "Tick Count",
      description: "`ticks` as a number draws that many evenly spaced dots; `ticks` as `true` draws one per step.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the slider and blocks dragging." },
  ],
  notes: [
    {
      title: "Motion",
      body: "The thumb grows on hover and while dragging, and the value bubble scales in. With reduced motion these transitions are off.",
    },
    {
      title: "Keyboard",
      body: "Arrow keys move the focused thumb by `step`; Page Up / Page Down and Home / End jump further, from Base UI.",
    },
    {
      title: "Related",
      body: "For styled range pickers see [Range Slider Bubble](/docs/range-slider-bubble), [Range Slider Fluid](/docs/range-slider-fluid), [Range Slider Inline](/docs/range-slider-inline), [Range Slider Ruler](/docs/range-slider-ruler) and [Range Slider Wave](/docs/range-slider-wave).",
    },
  ],
  api: [
    {
      name: "Slider",
      description: "Inset track, primary fill and a raised thumb. Pass an array value for a range.",
      extends: "Base UI Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        {
          name: "ticks",
          type: "boolean | number",
          description: "Dots along the track: `true` = one per step, a number = that many evenly spaced (2–101).",
        },
        {
          name: "showValue",
          type: `boolean | "always"`,
          description: "Value bubble over each thumb: on hover, focus and drag, or always.",
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
          description: "Layout direction.",
        },
        {
          name: "thumbAlignment",
          type: `"edge" | "center"`,
          default: `"edge"`,
          description: "`edge` keeps the thumb inside the track at both ends (Base UI defaults to `center`).",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formats the value bubble, e.g. currency.",
        },
      ],
      dataAttributes: [
        { name: "data-dragging", description: "On the thumb while it is dragged (scaled up)." },
        { name: "data-active", description: "On a tick (`data-slot=\"slider-tick\"`) inside the selected range." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
