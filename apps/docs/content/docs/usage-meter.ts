import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Shows how much of a quota has been used.", "zh": "显示配额使用量。"},
  baseUi: { name: "Meter", href: "https://base-ui.com/react/components/meter" },
  usage: {
    imports: `import { UsageMeter } from "@/components/ui/usage-meter"`,
    code: `<UsageMeter label="Agent runs" value={8420} max={10000} unit="runs" description="Resets on Nov 1" />`,
  },
  examples: [{ id: "percent", title: { en: "Percent and Thresholds", zh: "百分比与阈值" },  }],
  notes: [{ title: "Accessibility", body: { en: "Renders a meter (`role=\"meter\"`) labelled by `label`, with value text like \"8,420 of 10,000 runs\".", zh: "渲染一个由 `label` 标记的仪表（`role=\"meter\"`），值文本如「8,420 of 10,000 runs」。" } }],
  api: [
    {
      name: "UsageMeter",
      extends: "Meter.Root",
      extendsHref: "https://base-ui.com/react/components/meter#root",
      props: [
        { name: "label", type: "ReactNode", required: true, description: { en: "What is being measured.", zh: "被测量的内容。" } },
        { name: "value", type: "number", required: true, description: { en: "Amount used.", zh: "已用量。" } },
        { name: "max", type: "number", default: "100", description: { en: "The quota.", zh: "配额。" } },
        { name: "unit", type: "string", description: { en: "Suffix for the numbers.", zh: "数字的后缀。" } },
        { name: "description", type: "ReactNode", description: { en: "Line under the bar.", zh: "条下方的行。" } },
        { name: "warnAt", type: "number", default: "0.75", description: { en: "Share where the bar turns warning.", zh: "条形转为警告的比例。" } },
        { name: "dangerAt", type: "number", default: "0.9", description: { en: "Share where it turns destructive.", zh: "条形转为破坏性的比例。" } },
        { name: "readout", type: `"value" | "percent" | "none"`, default: `"value"`, description: { en: "What the right side shows.", zh: "右侧显示的内容。" } },
        { name: "formatOptions", type: "Intl.NumberFormatOptions", description: { en: "Number format for the readout.", zh: "读数的数字格式。" } },
      ],
      dataAttributes: [{ name: "data-level", description: { en: "`ok`, `warn` or `danger`.", zh: "`ok`、`warn` 或 `danger`。" } }],
    },
  ],
} satisfies ComponentDoc
