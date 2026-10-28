"use client"

import { useT } from "@/lib/site-locale"
import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSection } from "@paneui/ui/components/sidebar-nav"

const sections = [
  { label: { en: "Sections", zh: "章节" }, pages: [{ en: "Introduction", zh: "介绍" }, { en: "Installation", zh: "安装" }, { en: "Theming", zh: "主题" }] },
  { label: { en: "Forms", zh: "表单" }, pages: [{ en: "Button", zh: "按钮" }, { en: "Checkbox", zh: "复选框" }, { en: "Input", zh: "输入框" }] },
]

export default function SidebarNavCaptions() {
  const t = useT()
  return (
    <div className="flex h-80 w-60 flex-col overflow-hidden rounded-xl shadow-raised">
      <SidebarNav variant="fill" indicator="fill">
        <SidebarNavContent aria-label={t({ en: "Docs", zh: "文档" })} className="pt-3">
          {sections.map((s) => (
            <SidebarNavSection key={s.label.en} level="label" label={t(s.label)}>
              <SidebarNavList>
                {s.pages.map((p) => (
                  <SidebarNavLink key={p.en} href="#" active={p.en === "Button"}>
                    {t(p)}
                  </SidebarNavLink>
                ))}
              </SidebarNavList>
            </SidebarNavSection>
          ))}
        </SidebarNavContent>
      </SidebarNav>
    </div>
  )
}
