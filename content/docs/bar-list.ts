import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Ranks items by a single measure.", "zh": "按数值排列并比较项目。"},
  usage: {
    imports: `import { BarList } from "@/components/ui/bar-list"`,
    code: `<BarList items={[{ name: "/pricing", value: 18420 }, { name: "/", value: 15210 }]} labels={["Page", "Visitors"]} />`,
  },
  examples: [{ id: "colors", title: { en: "Colour and Icons", zh: "颜色与图标" },  }],
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
