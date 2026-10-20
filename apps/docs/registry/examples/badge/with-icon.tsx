import { CheckIcon, ClockIcon, WarningIcon } from "@paneui/ui/icons"
import { Badge } from "@paneui/ui/components/badge"

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
