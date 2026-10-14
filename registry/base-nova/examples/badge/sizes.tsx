import { Badge } from "@/registry/base-nova/ui/badge"

export default function BadgeSizes() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge>Chip</Badge>
        <Badge variant="primary">Beta</Badge>
        <Badge variant="success">Paid</Badge>
        <Badge variant="outline">Draft</Badge>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge size="sm">Chip</Badge>
        <Badge size="sm" variant="primary">
          Beta
        </Badge>
        <Badge size="sm" variant="success">
          Paid
        </Badge>
        <Badge size="sm" variant="outline">
          Draft
        </Badge>
      </div>
    </div>
  )
}
