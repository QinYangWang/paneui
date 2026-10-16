"use client"

import { DirectionProvider } from "@base-ui/react/direction-provider"
import { HomeIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbRtl() {
  return (
    <DirectionProvider direction="rtl">
      <div dir="rtl">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <HomeIcon />
                الرئيسية
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">المكونات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </DirectionProvider>
  )
}
