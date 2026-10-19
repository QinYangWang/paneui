import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Slider that shows its label and value on the track.", "zh": "在滑轨上显示标签与数值。"},
  baseUi: { name: "Slider", href: "https://base-ui.com/react/components/slider" },
  usage: {
    imports: `import { RangeSliderInline } from "@/components/ui/range-slider-inline"`,
    code: `<RangeSliderInline label="Volume" defaultValue={64} />`,
  },
  examples: [
    {
      id: "stops",
      title: { en: "Stops", zh: "停靠点" },
    },
    {
      id: "format",
      title: { en: "Custom Range and Format", zh: "自定义范围与格式" },
      description: { en: "Use for units such as prices or percentages.", zh: "适用于价格或百分比等带单位的数值。" },
    },
    {
      id: "controlled",
      title: { en: "Controlled", zh: "受控" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" } },
  ],
  notes: [
    {
      title: "Motion",
      body: "Clicked or keyed values ease over 300ms, and drags track the pointer directly. The thumb fades out while it crosses the label or readout. With reduced motion everything moves instantly.",
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
      extends: "Slider.Root",
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
        { name: "snapToStops", type: "boolean", default: "false", description: "When a drag or track press ends, settle onto the nearest of the ten stops." },
      ],
      dataAttributes: [
        { name: "data-dragging", description: "Present on the root while dragging." },
        { name: "data-disabled", description: "Present when disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
