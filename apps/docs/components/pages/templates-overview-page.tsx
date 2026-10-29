"use client"

import { T, useT, type Localized } from "@/lib/site-locale"

import Link from "next/link"

import { ArrowUpRightIcon } from "@paneui/ui/icons"
import { Button } from "@paneui/ui/components/button"
import { DocHeader } from "@/components/docs/doc-layout"
import { SiteRoot, type SiteProps } from "@/components/site/site-root"

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** One template card, computed at build time in src/pages/docs/templates.astro. */
export type TemplateCard = { name: string; title: string; description: Localized }

const DESCRIPTION_ZH: Record<string, string> = {
  saas: "产品官网和后台的一整套页面。",
  vscode: "在浏览器里编辑项目、运行命令。",
  "agent-workspace": "和编程智能体对话，审阅它们的改动。",
  docs: "带搜索、导航和页面大纲的文档站。",
  blog: "按年份归档文章的个人博客。",
}

/*
 * Screenshots are made from the built site by `pnpm templates:shots` (light and dark, 1440×900)
 * into public/templates-shots; the card swaps them with the theme.
 */
function Shot({ name, title }: { name: string; title: string }) {
  return (
    <>
      <img src={`${BASE_PATH}/templates-shots/${name}-light.jpg`} alt={title} loading="lazy" width={1440} height={900} className="block w-full dark:hidden" />
      <img src={`${BASE_PATH}/templates-shots/${name}-dark.jpg`} alt={title} loading="lazy" width={1440} height={900} className="hidden w-full dark:block" />
    </>
  )
}

function Description({ name, text }: { name: string; text: Localized }) {
  const t = useT()
  const zh = DESCRIPTION_ZH[name]
  return <>{typeof text === "string" && zh ? t({ en: text, zh }) : t(text)}</>
}

export default function TemplatesOverviewPage({ site, templates }: { site: SiteProps; templates: TemplateCard[] }) {
  return (
    <SiteRoot {...site}>
      <div className="flex flex-col gap-10">
        <DocHeader
          href="/docs/templates"
          eyebrow="Docs"
          eyebrowHref="/docs"
          title="Templates"
          lede={{ en: "Whole apps built from the components. Install one and make it yours.", zh: "用组件搭好的完整应用。装上一个，改成你自己的。" }}
        />
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {templates.map((tpl) => (
            <article key={tpl.name} className="group/tpl flex flex-col gap-3">
              <div className="relative frame-xl overflow-hidden bg-shell shadow-raised">
                <Shot name={tpl.name} title={tpl.title} />
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-150 group-focus-within/tpl:opacity-100 group-hover/tpl:opacity-100 pointer-coarse:hidden">
                  <Button variant="secondary" nativeButton={false} render={<a href={`${BASE_PATH}/templates/${tpl.name}/`} target="_blank" rel="noreferrer" />}>
                    <T en="Live preview" zh="在线预览" />
                    <ArrowUpRightIcon data-icon="inline-end" />
                  </Button>
                  <Button nativeButton={false} render={<Link href={`/docs/${tpl.name}`} />}>
                    <T en="View details" zh="查看详情" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 px-1">
                <h2 className="text-ui-lg font-semibold">
                  <Link href={`/docs/${tpl.name}`} className="outline-none hover:underline focus-visible:underline">
                    {tpl.title}
                  </Link>
                </h2>
                <p className="text-ui text-muted-foreground">
                  <Description name={tpl.name} text={tpl.description} />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SiteRoot>
  )
}
