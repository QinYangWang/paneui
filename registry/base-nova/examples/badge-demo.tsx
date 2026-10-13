import { BoltIcon } from "@/components/icons"
import { Badge, BadgeAvatar } from "@/registry/base-nova/ui/badge"

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge>
        <BadgeAvatar>C</BadgeAvatar>
        Cone King
      </Badge>
      <Badge variant="success">7 days</Badge>
      <Badge variant="primary">
        <BoltIcon />
        Fast
      </Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="destructive">No signal</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  )
}
