import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Ranks items by a single measure.", "zh": "按数值排列并比较项目。"},
  usage: {
    imports: `import { BarList } from "@/components/ui/bar-list"`,
    code: `<BarList items={[{ name: "/pricing", value: 18420 }, { name: "/", value: 15210 }]} labels={["Page", "Visitors"]} />`,
  },
  examples: [{ id: "colors", title: { en: "Colour and Icons", zh: "颜色与图标" },  }],
  notes: [{ title: "When to use", body: { en: "Use it for a ranked breakdown of one measure, such as top pages or referrers. It sorts largest first unless `sort=\"none\"`, and under reduced motion the bars appear without growing.", zh: "用于对某一指标进行排名细分，例如热门页面或来源。除非 `sort=\"none\"`，否则按从大到小排序，并且在减少动态效果下，条形出现时不会增长。" } }],
  api: [
    {
      name: "BarList",
      extends: "ul",
      props: [
        { name: "items", type: "{ name: string; value: number; icon?: ReactNode; href?: string }[]", required: true, description: { en: "Rows.", zh: "行。" } },
        { name: "formatValue", type: "(value: number) => string", description: { en: "Number format.", zh: "数字格式。" } },
        { name: "sort", type: `"desc" | "none"`, default: `"desc"`, description: { en: "Order.", zh: "顺序。" } },
        { name: "color", type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8", default: "4", description: { en: "Chart token (1–8) for the bars.", zh: "条形的图表变量（1–8）。" } },
        { name: "labels", type: "[string, string]", description: { en: "Column headings.", zh: "列标题。" } },
      ],
    },
  ],
} satisfies ComponentDoc
