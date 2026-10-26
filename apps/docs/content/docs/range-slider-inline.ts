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
      body: { en: "Clicked or keyed values ease over 300ms, and drags track the pointer directly. The thumb fades out while it crosses the label or readout. With reduced motion everything moves instantly.", zh: "点击或按键触发的值在 300ms 内缓动，拖动时直接跟随指针。滑块越过标签或读数时会淡出。开启减少动态效果时，一切即时变化。" },
    },
    {
      title: "Related",
      body: { en: "For a plain single or two-thumb slider, use [Slider](/docs/slider).", zh: "如需普通的单滑块或双滑块，请使用 [Slider](/docs/slider)。" },
    },
  ],
  api: [
    {
      name: "RangeSliderInline",
      description: { en: "A raised fill inside an inset well, with the label and value printed on the track. Single value only.", zh: "内凹槽中的凸起填充，标签和值印在轨道上。仅支持单值。" },
      extends: "Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "value", type: "number", description: { en: "Controlled value.", zh: "受控的值。" } },
        { name: "defaultValue", type: "number", default: "min", description: { en: "Initial value when uncontrolled.", zh: "非受控时的初始值。" } },
        {
          name: "onValueChange",
          type: "(value: number, details: Slider.Root.ChangeEventDetails) => void",
          description: { en: "Called on every change, with a single number rather than an array.", zh: "每次变化时调用，传入单个数字而非数组。" },
        },
        { name: "min", type: "number", default: "0", description: { en: "Lowest value.", zh: "最低值。" } },
        { name: "max", type: "number", default: "100", description: { en: "Highest value.", zh: "最高值。" } },
        { name: "step", type: "number", default: "1", description: { en: "Value granularity.", zh: "值的粒度。" } },
        { name: "label", type: "string", required: true, description: { en: "Text inside the left edge of the well. Also the thumb's accessible name.", zh: "槽左边缘内的文本。也作为滑块的辅助名称。" } },
        { name: "formatValue", type: "(value: number) => string", default: "String", description: { en: "Formats the readout and the announced value.", zh: "格式化读数和播报的值。" } },
        { name: "showStops", type: "boolean", default: "true", description: { en: "Paint ten evenly spaced stop markers.", zh: "绘制十个等距的档位标记。" } },
        { name: "snapToStops", type: "boolean", default: "false", description: { en: "When a drag or track press ends, settle onto the nearest of the ten stops.", zh: "拖动或按下轨道结束时，吸附到十个档位中最近的一个。" } },
      ],
      dataAttributes: [
        { name: "data-dragging", description: { en: "Present on the root while dragging.", zh: "拖动时存在于根节点上。" } },
        { name: "data-disabled", description: { en: "Present when disabled.", zh: "禁用时存在。" } },
      ],
    },
  ],
} satisfies ComponentDoc
