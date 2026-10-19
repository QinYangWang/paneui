import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Title, context and actions at the top of an app page.", "zh": "显示页面标题与操作。"},
  usage: {
    imports: `import {
  PageHeader,
  PageHeaderActions,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-header"`,
    code: `<PageHeader>
  <PageHeaderContent>
    <PageHeaderTitle>Customers</PageHeaderTitle>
    <PageHeaderDescription>Everyone with an active workspace.</PageHeaderDescription>
  </PageHeaderContent>
  <PageHeaderActions>
    <Button size="sm">Add customer</Button>
  </PageHeaderActions>
</PageHeader>`,
  },
  composition: `PageHeader
├── PageHeaderContent
│   ├── PageHeaderEyebrow
│   ├── PageHeaderTitle
│   └── PageHeaderDescription
└── PageHeaderActions`,
  examples: [
    { id: "basic", title: { en: "Basic", zh: "基础" } },
    {
      id: "reading",
      title: { en: "Reading Page", zh: "阅读页面" },
    },
  ],
  notes: [{ title: "Layout", body: "Actions wrap under the title on narrow screens. The title is the page's `h1`." }],
  api: [
    {
      name: "PageHeader",
      extends: "header",
      props: [
        {
          name: "size",
          type: `"default" | "lg"`,
          default: `"default"`,
          description: "`lg` sets a `text-3xl` title and `text-lg` lede, aligns actions with the title, and gives a direct eyebrow or description its own row.",
        },
      ],
    },
    { name: "PageHeaderTitle", extends: "h1", description: "`text-2xl` semibold, balanced wrapping.", props: [] },
    { name: "PageHeaderEyebrow", extends: "div", description: "Small line above the title, such as a breadcrumb or status.", props: [] },
  ],
} satisfies ComponentDoc
