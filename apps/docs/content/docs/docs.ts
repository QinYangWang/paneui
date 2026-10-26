import type { ComponentDoc } from "@/lib/doc-types"

export default {
  summary: {"en": "Documentation site layout with search, navigation and a page outline.", "zh": "为文档站点提供导航和搜索。"},
  usage: {
    imports: `// One command, into a new app:
// pnpm dlx shadcn@latest init -d -n my-docs https://paneui.dev/r/docs.json
// or into an existing one (adds app/docs/page.tsx):
// pnpm dlx shadcn@latest add https://paneui.dev/r/docs.json
import { DocsTemplate } from "@/components/docs-template/docs"`,
    code: `// app/docs/page.tsx (installed for you)
export default function DocsPage() {
  return <DocsTemplate />
}

// Another layout: "classic" | "notebook" | "flux" | "spacious" | "home"
<DocsTemplate layout="notebook" />`,
  },
  composition: `DocsTemplate                 layout, search palette, navigation drawer
├── parts/layouts.tsx        ClassicLayout · NotebookLayout · FluxLayout · SpaciousLayout · HomeLayout
├── parts/chrome.tsx         DocsHeader, SectionTabs (NavigationMenu), SearchButton, Brand
├── parts/docs-nav.tsx       SidebarNav page tree
├── parts/article-chrome.tsx PageHeader with Breadcrumb, feedback, pager Cards
├── parts/article.tsx        typeset article with Alert and CodeBlock
├── parts/site.ts            sections, pages, search items
└── Outline / OutlinePopover the page outline`,
  examples: [
    { id: "classic", title: { en: "Classic", zh: "经典" }, description: { en: "Use for most product docs: the page tree stays in view and the outline sits beside the text.", zh: "适用于需要持续显示页面树的产品文档。" } },
    { id: "notebook", title: { en: "Notebook", zh: "笔记本" }, description: { en: "Use when the docs split into a few large sections, so the sidebar only lists the current one.", zh: "适用于按大章节组织的文档。" } },
    { id: "flux", title: { en: "Flux", zh: "流式" }, description: { en: "Use for short docs or a single guide, where the text should own the screen.", zh: "适用于短文档或单篇指南。" } },
    { id: "spacious", title: { en: "Spacious", zh: "宽松" }, description: { en: "Use for long-form reading such as tutorials and essays.", zh: "适用于教程和长篇文章。" } },
    { id: "home", title: { en: "Home", zh: "首页" }, description: { en: "Use as the landing page that sends readers to each section.", zh: "适用于引导读者进入各章节的首页。" } },
  ],
  notes: [
    {
      title: "Layouts",
      body: { en: "Each layout composes the same parts and only moves the navigation and the outline. Edit `parts/site.ts` for your sections and pages, or add a layout in `parts/layouts.tsx` from the same parts.", zh: "每个布局组合相同的部件，只移动导航和大纲。在 `parts/site.ts` 中编辑你的区块和页面，或用相同的部件在 `parts/layouts.tsx` 中添加布局。" },
    },
    {
      title: "Responsive",
      body: { en: "Below `lg` the sidebar moves into a drawer behind the menu button, and below `xl` the outline becomes the On this page button. Flux keeps its bar at every width; Notebook's tabs scroll sideways on phones.", zh: "低于 `lg` 时侧边栏移入菜单按钮后的抽屉，低于 `xl` 时大纲变为 On this page 按钮。Flux 在任何宽度都保留其栏；Notebook 的标签在手机上横向滚动。" },
    },
  ],
  api: [
    {
      name: "DocsTemplate",
      props: [
        {
          name: "layout",
          type: `"classic" | "notebook" | "flux" | "spacious" | "home"`,
          default: `"classic"`,
          description: { en: "Where the navigation and the outline go.", zh: "导航和大纲的位置。" },
        },
      ],
    },
  ],
} satisfies ComponentDoc
