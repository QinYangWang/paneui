import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { ActionSwapCascadeButton } from "@/components/ui/action-swap-cascade"`,
    code: `<ActionSwapCascadeButton
  items={[
    { value: "subscribe", label: "Subscribe" },
    { value: "subscribed", label: "Subscribed" },
  ]}
/>`,
  },
  examples: [
    {
      id: "copy-reset",
      title: "Copy With Reset",
      description: "`resetAfter` returns the button to its first item after the given milliseconds, the classic Copy → Copied.",
    },
    {
      id: "sizes",
      title: "Sizes",
      description: "Every `Button` size works; the label width glides between states at each size.",
    },
    {
      id: "icon-only",
      title: "Icon Only",
      description: "`icon*` sizes turn on `iconOnly`, so only the glyph swaps. Give each item an `ariaLabel`.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Set `cycle={false}` and drive `value` yourself to step through async states like publishing.",
    },
    {
      id: "custom-slots",
      title: "Custom Slots",
      description: "Compose `ActionSwapCascadeIcon` and `ActionSwapCascadeText` inside your own `Button` when you need full control.",
    },
  ],
  notes: [
    {
      title: "Motion",
      body: "Plain-string labels roll letter by letter, left to right, while the button springs to the new width; non-string labels and icons roll as one piece. With reduced motion everything cross-fades.",
    },
    {
      title: "Related",
      body: "Same API with another animation: [Action Swap Blur](/docs/action-swap-blur) and [Action Swap Roll](/docs/action-swap-roll).",
    },
  ],
  api: [
    {
      name: "ActionSwapCascadeButton",
      description: "A `Button` that advances through `items` on click, swapping its icon and label.",
      extends: "Button",
      extendsHref: "/docs/button",
      props: [
        {
          name: "items",
          type: "ActionSwapItem[]",
          required: true,
          description: "States in order: `{ value: string; label: ReactNode; icon?: ReactNode; ariaLabel?: string }`.",
        },
        { name: "value", type: "string", description: "Controlled current item value." },
        { name: "defaultValue", type: "string", description: "Initial item value. Defaults to the first item." },
        {
          name: "onValueChange",
          type: "(value: string, item: ActionSwapItem) => void",
          description: "Called when the current item changes, including on reset.",
        },
        {
          name: "iconOnly",
          type: "boolean",
          default: "true for `icon*` sizes",
          description: "Hide the label and swap only the icon slot.",
        },
        {
          name: "cycle",
          type: "boolean",
          default: "true",
          description: "Advance to the next item on click. Turn off to drive `value` yourself.",
        },
        {
          name: "resetAfter",
          type: "number",
          description: "Milliseconds after which the button returns to its first item.",
        },
      ],
    },
    {
      name: "ActionSwapCascadeText",
      description: "Label slot. A new `value` rolls the text letter by letter (plain strings only).",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current label; changing it triggers the swap." },
        { name: "children", type: "ReactNode", required: true, description: "The label." },
        { name: "className", type: "string", description: "Merged onto the slot." },
      ],
    },
    {
      name: "ActionSwapCascadeIcon",
      description: "16px icon slot; the old glyph rolls out as the new one rolls in.",
      props: [
        { name: "value", type: "string", required: true, description: "Identity of the current icon; changing it triggers the swap." },
        { name: "children", type: "ReactNode", required: true, description: "The icon." },
        { name: "className", type: "string", description: "Merged onto the slot." },
      ],
    },
  ],
} satisfies ComponentDoc
