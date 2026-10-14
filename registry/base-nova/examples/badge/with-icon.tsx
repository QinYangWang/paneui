import { CheckIcon, ClockIcon, WarningIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"

export default function BadgeWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Badge variant="success">
        <CheckIcon />
        Delivered
      </Badge>
      <Badge variant="warning">
        <ClockIcon />
        Due Friday
      </Badge>
      <Badge variant="destructive" size="sm">
        <WarningIcon />
        Overdue
      </Badge>
    </div>
  )
}
