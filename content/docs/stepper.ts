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
    { id: "sizes", title: "Sizes", description: "`sm` is 32px tall, `default` is 40px." },
    {
      id: "with-unit",
      title: "With Unit",
      description: "`unit` adds muted text after the number, e.g. \"nights\". It is visual only.",
    },
    {
      id: "controlled",
      title: "Controlled",
      description: "Pass `value` and `onValueChange`; the value is `null` while the field is empty.",
    },
    {
      id: "decimals",
      title: "Decimals",
      description: "Combine a fractional `step` with `format` (Intl.NumberFormat options) to keep the digits fixed.",
    },
    {
      id: "localized",
      title: "Localized",
      description: "`decrementLabel` and `incrementLabel` name the − and + buttons; pass them with `locale` for a fully translated control.",
    },
    { id: "disabled", title: "Disabled", description: "`disabled` dims the whole control." },
  ],
  notes: [
    {
      title: "Motion",
      body: "Changed digits roll up or down in the direction of the change on a spring, with a slight blur. With reduced motion they cross-fade instead.",
    },
    {
      title: "Keyboard",
      body: "Click the number to type a value. Arrow Up and Arrow Down step it. The − and + buttons switch off at `min` and `max`.",
    },
  ],
  api: [
    {
      name: "Stepper",
      description: "A − value + control with a rolling number display.",
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
