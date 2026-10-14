import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { BarList } from "@/components/ui/bar-list"`,
    code: `<BarList items={[{ name: "/pricing", value: 18420 }, { name: "/", value: 15210 }]} labels={["Page", "Visitors"]} />`,
  },
  examples: [{ id: "colors", title: "Colour and Icons", description: "`color` picks a chart token (1–8); items take an `icon` and an `href`." }],
  notes: [{ title: "When to use", body: "For a ranked breakdown of one measure (top pages, referrers, countries). It sorts largest first unless `sort=\"none\"`; bars grow in with a spring and simply appear under reduced motion." }],
  api: [
    {
      name: "BarList",
      extends: "ul",
      props: [
        { name: "items", type: "{ name: string; value: number; icon?: ReactNode; href?: string }[]", required: true, description: "Rows." },
        { name: "formatValue", type: "(value: number) => string", description: "Number format." },
        { name: "sort", type: `"desc" | "none"`, default: `"desc"`, description: "Order." },
        { name: "color", type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8", default: "4", description: "Chart token for the bars." },
        { name: "labels", type: "[string, string]", description: "Column headings." },
      ],
    },
  ],
} satisfies ComponentDoc
