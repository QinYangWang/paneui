import type { ComponentDoc } from "@/lib/doc-types"

export default {
  baseUi: { name: "Meter", href: "https://base-ui.com/react/components/meter" },
  usage: {
    imports: `import { UsageMeter } from "@/components/ui/usage-meter"`,
    code: `<UsageMeter label="Agent runs" value={8420} max={10000} unit="runs" description="Resets on Nov 1" />`,
  },
  examples: [{ id: "percent", title: "Percent and Thresholds", description: "`readout=\"percent\"` shows the share; `warnAt` and `dangerAt` move the colour thresholds." }],
  notes: [{ title: "Accessibility", body: "Renders a meter (`role=\"meter\"`) labelled by `label`, with value text like \"8,420 of 10,000 runs\"." }],
  api: [
    {
      name: "UsageMeter",
      extends: "Meter.Root",
      extendsHref: "https://base-ui.com/react/components/meter#root",
      props: [
        { name: "label", type: "ReactNode", required: true, description: "What is being measured." },
        { name: "value", type: "number", required: true, description: "Amount used." },
        { name: "max", type: "number", default: "100", description: "The quota." },
        { name: "unit", type: "string", description: "Suffix for the numbers." },
        { name: "description", type: "ReactNode", description: "Line under the bar." },
        { name: "warnAt", type: "number", default: "0.75", description: "Share where the bar turns warning." },
        { name: "dangerAt", type: "number", default: "0.9", description: "Share where it turns destructive." },
        { name: "readout", type: `"value" | "percent" | "none"`, default: `"value"`, description: "What the right side shows." },
        { name: "formatOptions", type: "Intl.NumberFormatOptions", description: "Number format for the readout." },
      ],
      dataAttributes: [{ name: "data-level", description: "`ok`, `warn` or `danger`." }],
    },
  ],
} satisfies ComponentDoc
