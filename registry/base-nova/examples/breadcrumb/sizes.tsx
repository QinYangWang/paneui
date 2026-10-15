import { BreadcrumbTrail } from "@/registry/base-nova/ui/breadcrumb"

const items = [{ label: "Workspace", href: "#" }, { label: "Projects", href: "#" }, { label: "Atlas" }]

export default function BreadcrumbSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <BreadcrumbTrail key={size} size={size} items={items} />
      ))}
    </div>
  )
}
