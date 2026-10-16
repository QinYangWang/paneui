"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"

import { SidebarNav, SidebarNavContent, SidebarNavLink, SidebarNavList, SidebarNavSearch, SidebarNavSection } from "@/registry/base-nova/ui/sidebar-nav"

export default function SidebarNavRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl" className="flex h-80 w-64 flex-col overflow-hidden rounded-xl bg-background shadow-raised">
        <SidebarNav>
          <SidebarNavSearch shortcut="⌘K">بحث</SidebarNavSearch>
          <SidebarNavContent aria-label="التوثيق">
            <SidebarNavSection label="البداية">
              <SidebarNavList>
                <SidebarNavLink href="#">مقدمة</SidebarNavLink>
                <SidebarNavLink href="#" active>
                  التثبيت
                </SidebarNavLink>
              </SidebarNavList>
            </SidebarNavSection>
            <SidebarNavSection label="المكونات" count={2}>
              <SidebarNavSection level="group" label="النماذج" count={2}>
                <SidebarNavList>
                  <SidebarNavLink href="#">زر</SidebarNavLink>
                  <SidebarNavLink href="#">حقل إدخال</SidebarNavLink>
                </SidebarNavList>
              </SidebarNavSection>
            </SidebarNavSection>
          </SidebarNavContent>
        </SidebarNav>
      </div>
    </DirectionProvider>
  )
}
