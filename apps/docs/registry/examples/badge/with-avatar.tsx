import { Badge, BadgeAvatar } from "@paneui/ui/components/badge"

const vendors = [
  { initial: "A", name: "Acme Hosting" },
  { initial: "N", name: "Northwind" },
  { initial: "L", name: "Linear" },
]

export default function BadgeWithAvatar() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {vendors.map((vendor) => (
        <Badge key={vendor.name}>
          <BadgeAvatar>{vendor.initial}</BadgeAvatar>
          {vendor.name}
        </Badge>
      ))}
    </div>
  )
}
