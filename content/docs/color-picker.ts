import type { ComponentDoc } from "@/lib/doc-types"

const POPOVER = "https://base-ui.com/react/components/popover"

export default {
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
      title: "With Alpha",
      description: "Set `alpha` on the root and add `ColorPickerAlpha`; values below full opacity come out as 8-digit hex.",
    },
    {
      id: "inline",
      title: "Inline",
      description: "Leave out the trigger and content to render the parts in place. `useColorPicker()` reads the colour for custom parts, here an RGB readout.",
    },
    {
      id: "commit",
      title: "Change vs Commit",
      description: "`onValueChange` fires continuously while dragging; `onValueCommit` fires once a gesture, key, preset or hex entry ends.",
    },
    {
      id: "swatch-trigger",
      title: "Swatch Trigger",
      description: "`showHex={false}` shrinks the trigger to the swatch (give it an `aria-label`); `align=\"end\"` pins the panel to its right edge.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` on the root disables the trigger and every part." },
  ],
  notes: [
    {
      title: "Keyboard",
      body: "The area thumb is a 2D slider: arrow keys nudge saturation and brightness 1% (Shift for 10%). Hue and alpha are Base UI sliders. The hex field commits on Enter or blur, reverts invalid input, and Escape restores the last value.",
    },
    {
      title: "Motion",
      body: "The panel opens over the trigger and unclips out of the chip's `rounded-lg` shape; the area thumb lifts into a loupe while dragging. With reduced motion the panel fades and the thumb barely scales.",
    },
    {
      title: "Related",
      body: "Other pickers: [Wheel Picker](/docs/wheel-picker), [Arc Picker](/docs/arc-picker), [Date Range Picker](/docs/date-range-picker).",
    },
  ],
  api: [
    {
      name: "ColorPicker",
      description: "Colour state plus the popover root. Parts also work inline without trigger and content.",
      extends: "Base UI Popover.Root",
      extendsHref: `${POPOVER}#root`,
      props: [
        { name: "value", type: "string", description: "Controlled hex colour (`#rrggbb` or `#rrggbbaa`)." },
        {
          name: "defaultValue",
          type: "string",
          default: "theme `--primary`",
          description: "Initial colour when uncontrolled. Without it the picker starts on the live `--primary` token (read after mount; `#3976ce`, the light primary, during server render).",
        },
        { name: "onValueChange", type: "(hex: string) => void", description: "Fires continuously while dragging or typing." },
        {
          name: "onValueCommit",
          type: "(hex: string) => void",
          description: "Fires when a gesture ends (pointer up, key, hex commit, preset).",
        },
        { name: "alpha", type: "boolean", default: "false", description: "Allow transparency; without it alpha is always 1." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable the trigger and all parts." },
      ],
    },
    {
      name: "ColorPickerTrigger",
      description: "Raised chip with the swatch and hex. Pass children to replace its content.",
      extends: "Base UI Popover.Trigger",
      extendsHref: `${POPOVER}#trigger`,
      props: [{ name: "showHex", type: "boolean", default: "true", description: "Show the hex label next to the swatch." }],
    },
    {
      name: "ColorPickerContent",
      description: "Portal, positioner and 256px popup that grows out of the trigger.",
      extends: "Base UI Popover.Popup",
      extendsHref: `${POPOVER}#popup`,
      props: [
        { name: "align", type: `"start" | "center" | "end"`, default: `"start"`, description: "Trigger edge the panel lines up with." },
        { name: "collisionPadding", type: "number | Padding", default: "8", description: "Space kept from the viewport edges." },
        {
          name: "triggerRadius",
          type: "string",
          default: `"var(--radius-lg)"`,
          description: "Corner radius (CSS length) of the trigger shape the panel morphs from. The default matches `ColorPickerTrigger`; change it only if you reshape the trigger.",
        },
      ],
    },
    {
      name: "ColorPickerArea",
      description: "Saturation (x) by brightness (y) plane with a draggable thumb.",
      extends: "div",
      props: [{ name: "label", type: "string", default: `"Saturation and brightness"`, description: "Accessible name of the thumb." }],
      dataAttributes: [{ name: "data-disabled", description: "Present when the picker is disabled." }],
    },
    {
      name: "ColorPickerHue",
      description: "Hue slider (0–360). Value, range and change handlers are owned by the picker; other props go to the slider root.",
      extends: "Base UI Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "label", type: "string", default: `"Hue"`, description: "Accessible name of the thumb." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this slider; the root's `disabled` also applies." },
      ],
    },
    {
      name: "ColorPickerAlpha",
      description: "Opacity slider over a checkerboard. Only meaningful with `alpha` on the root. Other props go to the slider root, as for `ColorPickerHue`.",
      extends: "Base UI Slider.Root",
      extendsHref: "https://base-ui.com/react/components/slider#root",
      props: [
        { name: "label", type: "string", default: `"Opacity"`, description: "Accessible name of the thumb." },
        { name: "disabled", type: "boolean", default: "false", description: "Disable this slider; the root's `disabled` also applies." },
      ],
    },
    {
      name: "ColorPickerHexInput",
      description: "Hex field in an inset well; complete 6 or 8-digit values apply while typing.",
      extends: "input",
      props: [{ name: "aria-label", type: "string", default: `"Hex colour"`, description: "Accessible name of the field." }],
    },
    {
      name: "ColorPickerSwatch",
      description: "The current colour over a checkerboard so transparency shows.",
      extends: "span",
      props: [],
    },
    { name: "ColorPickerPresets", description: "Wrapping group of preset buttons, labelled `Presets`.", extends: "div", props: [] },
    {
      name: "ColorPickerPreset",
      description: "One preset swatch button; `aria-pressed` when it matches the current colour.",
      extends: "button",
      props: [
        { name: "value", type: "string", required: true, description: "Hex colour applied on click." },
        { name: "label", type: "string", description: "Accessible name. Defaults to the hex value." },
      ],
    },
    {
      name: "useColorPicker",
      description: "Current colour and setters for custom parts. Use inside `ColorPicker`.",
      props: [
        { name: "hsva", type: "{ h: number; s: number; v: number; a: number }", description: "Current colour; `h` 0–360, others 0–1." },
        { name: "hex", type: "string", description: "Current colour as lowercase hex." },
        { name: "setHsva", type: "(next: Hsva, commit?: boolean) => void", description: "Set the colour; `commit` also fires `onValueCommit`." },
        { name: "commit", type: "() => void", description: "Fire `onValueCommit` with the current colour." },
        { name: "alpha", type: "boolean", description: "Whether alpha is enabled." },
        { name: "disabled", type: "boolean", description: "Whether the picker is disabled." },
      ],
    },
  ],
} satisfies ComponentDoc
