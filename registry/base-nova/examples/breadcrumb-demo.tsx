"use client"

import { FolderIcon, HomeIcon } from "@/components/icons"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbTrail,
} from "@/registry/base-nova/ui/breadcrumb"

export default function BreadcrumbDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">
              <HomeIcon />
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis
              items={[
                { label: "Projects", href: "#", icon: <FolderIcon /> },
                { label: "taimatsu/ui", href: "#", icon: <FolderIcon /> },
              ]}
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <BreadcrumbTrail
        maxItems={3}
        items={[
          { label: "Drive", href: "#" },
          { label: "Taxes", href: "#" },
          { label: "2026", href: "#" },
          { label: "Receipts", href: "#" },
          { label: "October.pdf" },
        ]}
      />
    </div>
  )
}
