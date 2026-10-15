import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: {
    name: "Number Field",
    href: "https://base-ui.com/react/components/number-field",
  },
  usage: {
    imports: `import { Stepper } from "@/components/ui/stepper"`,
    code: `<Stepper aria-label="Guests" defaultValue={2} min={1} max={8} />`,
  },
  examples: [
    { id: "sizes", title: "Sizes", description: "Use `sm` in toolbars and dense rows." },
    {
      id: "with-unit",
      title: "With Unit",
      description: "Use `unit` when the number needs a word after it, e.g. \"nights\".",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Use when other UI reads the value; it is `null` while the field is empty.",
    },
    {
      id: "decimals",
      title: "Decimals",
      description: "Use for prices and measurements, pairing a fractional `step` with `format` to fix the digits.",
    },
    {
      id: "localized",
      title: "Localized",
      description: "Use when your UI is translated, passing the button labels along with `locale`.",
    },
    { id: "disabled", title: "Disabled" },
  ],
  notes: [
    {
      title: "Motion",
      body: "With reduced motion the rolling digits cross-fade instead.",
    },
    {
      title: "Keyboard",
      body: "Click the number to type a value. Arrow Up and Arrow Down step it. The − and + buttons switch off at `min` and `max`.",
    },
  ],
  api: [
    {
      name: "Stepper",
      description: "Number field with − and + step buttons.",
      extends: "NumberField.Root",
      extendsHref: "https://base-ui.com/react/components/number-field#root",
      props: [
        {
          name: "aria-label",
          type: "string",
          description: "Accessible name, applied to the value input (not the root).",
        },
        { name: "decrementLabel", type: "string", default: `"Decrease"`, description: "Accessible name of the − button; translate it with the rest of your UI." },
        { name: "incrementLabel", type: "string", default: `"Increase"`, description: "Accessible name of the + button." },
        { name: "unit", type: "ReactNode", description: "Text after the number, e.g. \"guests\". Visual only." },
        { name: "size", type: `"sm" | "default"`, default: `"default"`, description: "Control height (32 / 40px)." },
        { name: "value", type: "number | null", description: "Controlled value." },
        { name: "defaultValue", type: "number", description: "Value on first render." },
        {
          name: "onValueChange",
          type: "(value: number | null, details) => void",
          description: "Called when the value changes.",
        },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          description: "Formats both the input and the rolling display, e.g. currency.",
        },
        { name: "locale", type: "Intl.LocalesArgument", description: "Locale used by `format`." },
      ],
      dataAttributes: [{ name: "data-disabled", description: "Present on the group when disabled." }],
    },
  ],
} satisfies ComponentDoc
