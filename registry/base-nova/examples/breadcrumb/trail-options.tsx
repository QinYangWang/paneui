import { BreadcrumbTrail } from "@/registry/base-nova/ui/breadcrumb"

const path = [
  { label: "Drive", href: "#" },
  { label: "Work", href: "#" },
  { label: "Clients", href: "#" },
  { label: "Acme", href: "#" },
  { label: "Contracts", href: "#" },
  { label: "Renewal 2027.pdf" },
]

export default function BreadcrumbTrailOptions() {
  return (
    <div className="flex flex-col items-start gap-4">
      <BreadcrumbTrail items={path} />
      <BreadcrumbTrail items={path} maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1} />
      <BreadcrumbTrail items={path} maxItems={10} separator="/" />
    </div>
  )
}
