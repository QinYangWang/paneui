import type { ComponentDoc } from "@/lib/doc-types"

export default {
  usage: {
    imports: `import { BarList } from "@/components/ui/bar-list"`,
    code: `<BarList items={[{ name: "/pricing", value: 18420 }, { name: "/", value: 15210 }]} labels={["Page", "Visitors"]} />`,
  },
  examples: [{ id: "colors", title: "Colour and Icons", description: "Use `icon` and `href` when each row leads to its own detail page." }],
  notes: [{ title: "When to use", body: "Use it for a ranked breakdown of one measure, such as top pages or referrers. It sorts largest first unless `sort=\"none\"`, and under reduced motion the bars appear without growing." }],
  api: [
    {
      name: "BarList",
      extends: "ul",
      props: [
        { name: "items", type: "{ name: string; value: number; icon?: ReactNode; href?: string }[]", required: true, description: "Rows." },
        { name: "formatValue", type: "(value: number) => string", description: "Number format." },
        { name: "sort", type: `"desc" | "none"`, default: `"desc"`, description: "Order." },
        { name: "color", type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8", default: "4", description: "Chart token (1–8) for the bars." },
        { name: "labels", type: "[string, string]", description: "Column headings." },
      ],
    },
  ],
} satisfies ComponentDoc
