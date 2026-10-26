import type { ComponentDoc } from "@/lib/doc-types"

const POPOVER = "https://base-ui.com/react/components/popover"

export default {
  summary: {"en": "Picks a colour by dragging, entering hex or choosing a preset.", "zh": "选择或输入颜色。"},
  baseUi: { name: "Popover", href: POPOVER },
  usage: {
    imports: `import { ColorPicker, ColorPickerArea, ColorPickerContent, ColorPickerHue, ColorPickerTrigger } from "@/components/ui/color-picker"`,
    code: `<ColorPicker>
  <ColorPickerTrigger />
  <ColorPickerContent>
    <ColorPickerArea />
    <ColorPickerHue />
  </ColorPickerContent>
</ColorPicker>`,
  },
  composition: `ColorPicker
├── ColorPickerTrigger
│   └── ColorPickerSwatch (default content)
└── ColorPickerContent
    ├── ColorPickerArea
    ├── ColorPickerHue
    ├── ColorPickerAlpha
    ├── ColorPickerSwatch
    ├── ColorPickerHexInput
    └── ColorPickerPresets
        └── ColorPickerPreset`,
  examples: [
    {
      id: "with-alpha",
      title: { en: "With Alpha", zh: "带透明度" },
    },
    {
      id: "inline",
      title: { en: "Inline", zh: "行内" },
    },
    {
      id: "commit",
      title: { en: "Change vs Commit", zh: "实时变化与提交" },
    },
    {
      id: "swatch-trigger",
      title: { en: "Swatch Trigger", zh: "色块触发器" },
    },
    { id: "disabled", title: { en: "Disabled", zh: "禁用" },  },
  ],
  notes: [
    {
      title: "Keyboard",
      body: { en: "The area thumb is a 2D slider; arrow keys nudge saturation and brightness 1% (Shift for 10%). Hue and alpha are sliders. The hex field commits on Enter or blur, reverts invalid input, and Escape restores the last value.", zh: "区域滑块是二维滑块；方向键微调饱和度和亮度 1%（Shift 为 10%）。色相和 alpha 是滑块。十六进制字段在按 Enter 或失焦时提交，无效输入会还原，Escape 恢复上一个值。" },
    },
    {
      title: "Motion",
      body: { en: "With reduced motion the panel fades instead of growing from the trigger, and the area thumb barely scales while dragging.", zh: "在减少动态效果下，面板淡出而不是从触发器长出，拖动时区域滑块几乎不缩放。" },
    },
    {
      title: "Related",
      body: { en: "See also [Wheel Picker](/docs/wheel-picker) and [Date Range Picker](/docs/date-range-picker).", zh: "另见 [Wheel Picker](/docs/wheel-picker) 和 [Date Range Picker](/docs/date-range-picker)。" },
    },
  ],
  api: [
    {
      name: "ColorPicker",
      description: { en: "Colour state plus the popover root. Parts also work inline without trigger and content.", zh: "颜色状态加弹出层根。各部分也可内联使用，无需触发器和内容。" },
      extends: "Popover.Root",
      extendsHref: `${POPOVER}#root`,
      props: [
        { name: "value", type: "string", description: { en: "Controlled hex colour (`#rrggbb` or `#rrggbbaa`).", zh: "受控的十六进制颜色（`#rrggbb` 或 `#rrggbbaa`）。" } },
        {
          name: "defaultValue",
          type: "string",
          default: "theme `--primary`",
          description: { en: "Initial colour when uncontrolled. Without it the picker starts on the live `--primary` token (read after mount; `#171717`, the default light primary, during server render).", zh: "非受控时的初始颜色。没有它时选择器从实时 `--primary` 变量开始（挂载后读取；服务端渲染期间为 `#171717`，即默认浅色主题色）。" },
        },
        { name: "onValueChange", type: "(hex: string) => void", description: { en: "Fires continuously while dragging or typing.", zh: "拖动或输入时持续触发。" } },
        {
          name: "onValueCommit",
          type: "(hex: string) => void",
          description: { en: "Fires once when a gesture ends (pointer up, key, hex commit, preset); `onValueChange` fires continuously while dragging.", zh: "手势结束时触发一次（指针抬起、按键、十六进制提交、预设）；`onValueChange` 在拖动时持续触发。" },
        },
        { name: "alpha", type: "boolean", default: "false", description: { en: "Allow transparency; without it alpha is always 1.", zh: "允许透明度；没有它时 alpha 始终为 1。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable the trigger and all parts.", zh: "禁用触发器和所有部分。" } },
      ],
    },
    {
      name: "ColorPickerTrigger",
      description: { en: "Raised chip with the swatch and hex. Pass children to replace its content.", zh: "带色块和十六进制的凸起小标签。传入子元素以替换其内容。" },
      extends: "Popover.Trigger",
      extendsHref: `${POPOVER}#trigger`,
      props: [{ name: "showHex", type: "boolean", default: "true", description: { en: "Show the hex label next to the swatch.", zh: "在色块旁显示十六进制标签。" } }],
    },
    {
      name: "ColorPickerContent",
      description: { en: "Portal, positioner and 256px popup that grows out of the trigger.", zh: "传送门、定位器和 256px 从触发器长出的弹出层。" },
      extends: "Popover.Popup",
      extendsHref: `${POPOVER}#popup`,
      props: [
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: { en: "Trigger edge the panel lines up with.", zh: "面板对齐的触发器边缘。" } },
        { name: "collisionPadding", type: "number | Padding", default: "8", description: { en: "Space kept from the viewport edges.", zh: "与视口边缘保留的间距。" } },
        {
          name: "triggerRadius",
          type: "string",
          default: `"var(--radius-lg)"`,
          description: { en: "Corner radius (CSS length) of the trigger shape the panel morphs from. The default matches `ColorPickerTrigger`; change it only if you reshape the trigger.", zh: "面板从其变形而来的触发器形状的圆角半径（CSS 长度）。默认与 `ColorPickerTrigger` 匹配；仅当你重塑触发器时才更改。" },
        },
      ],
    },
    {
      name: "ColorPickerArea",
      description: { en: "Saturation (x) by brightness (y) plane with a draggable thumb.", zh: "饱和度（x）乘亮度（y）平面，带可拖动的滑块。" },
      extends: "div",
      props: [{ name: "label", type: "string", default: "the locale's", description: { en: "Accessible name of the thumb.", zh: "滑块的无障碍名称。" } }],
      dataAttributes: [{ name: "data-disabled", description: { en: "Present when the picker is disabled.", zh: "选择器禁用时存在。" } }],
    },
    {
      name: "ColorPickerHue",
      description: { en: "Hue slider (0–360). Value, range and change handlers are owned by the picker; other props go to the slider root.", zh: "色相滑块（0–360）。值、范围和变更处理器由选择器拥有；其他属性传给滑块根。" },
      extends: "Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "label", type: "string", default: "the locale's", description: { en: "Accessible name of the thumb.", zh: "滑块的无障碍名称。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable this slider; the root's `disabled` also applies.", zh: "禁用此滑块；根的 `disabled` 也会生效。" } },
      ],
    },
    {
      name: "ColorPickerAlpha",
      description: { en: "Opacity slider over a checkerboard. Only meaningful with `alpha` on the root. Other props go to the slider root, as for `ColorPickerHue`.", zh: "棋盘格上的不透明度滑块。仅在根上设置 `alpha` 时有意义。其他属性传给滑块根，与 `ColorPickerHue` 相同。" },
      extends: "Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "label", type: "string", default: "the locale's", description: { en: "Accessible name of the thumb.", zh: "滑块的无障碍名称。" } },
        { name: "disabled", type: "boolean", default: "false", description: { en: "Disable this slider; the root's `disabled` also applies.", zh: "禁用此滑块；根的 `disabled` 也会生效。" } },
      ],
    },
    {
      name: "ColorPickerHexInput",
      description: { en: "Hex field in an inset well; full 6 or 8-digit values apply while typing, and values below full opacity come out as 8-digit hex.", zh: "内嵌槽中的十六进制字段；完整 6 位或 8 位值在输入时应用，低于完全不透明度的值会输出为 8 位十六进制。" },
      extends: "input",
      props: [{ name: "aria-label", type: "string", default: "the locale's", description: { en: "Accessible name of the field.", zh: "字段的无障碍名称。" } }],
    },
    {
      name: "ColorPickerSwatch",
      description: { en: "The current colour over a checkerboard so transparency shows (20px; resize with `size-*`).", zh: "棋盘格上的当前颜色，以便显示透明度（20px；用 `size-*` 调整大小）。" },
      extends: "span",
      props: [],
    },
    { name: "ColorPickerPresets", description: { en: "Wrapping group of preset buttons, labelled `Presets`.", zh: "预设按钮的换行分组，标签为 `Presets`。" }, extends: "div", props: [] },
    {
      name: "ColorPickerPreset",
      description: { en: "One preset swatch button, an 18px swatch in a 24px hit area, with a ring when `aria-pressed` (it matches the current colour).", zh: "单个预设色块按钮，18px 色块位于 24px 点击区域内，`aria-pressed` 时（与当前颜色匹配）显示环。" },
      extends: "button",
      props: [
        { name: "value", type: "string", required: true, description: { en: "Hex colour applied on click.", zh: "点击时应用的十六进制颜色。" } },
        { name: "label", type: "string", description: { en: "Accessible name. Defaults to the hex value.", zh: "无障碍名称。默认为十六进制值。" } },
      ],
    },
    {
      name: "useColorPicker",
      description: { en: "Current colour and setters for custom parts. Use inside `ColorPicker`.", zh: "当前颜色和用于自定义部分的 setter。在 `ColorPicker` 内使用。" },
      props: [
        { name: "hsva", type: "{ h: number; s: number; v: number; a: number }", description: { en: "Current colour; `h` 0–360, others 0–1.", zh: "当前颜色；`h` 为 0–360，其他为 0–1。" } },
        { name: "hex", type: "string", description: { en: "Current colour as lowercase hex.", zh: "当前颜色的小写十六进制。" } },
        { name: "setHsva", type: "(next: Hsva, commit?: boolean) => void", description: { en: "Set the colour; `commit` also fires `onValueCommit`.", zh: "设置颜色；`commit` 还会触发 `onValueCommit`。" } },
        { name: "commit", type: "() => void", description: { en: "Fire `onValueCommit` with the current colour.", zh: "用当前颜色触发 `onValueCommit`。" } },
        { name: "alpha", type: "boolean", description: { en: "Whether alpha is enabled.", zh: "是否启用 alpha。" } },
        { name: "disabled", type: "boolean", description: { en: "Whether the picker is disabled.", zh: "选择器是否禁用。" } },
      ],
    },
  ],
} satisfies ComponentDoc
