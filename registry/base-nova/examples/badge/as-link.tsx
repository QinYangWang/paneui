import { TagIcon } from "@/components/icons"
import { Badge } from "@/registry/base-nova/ui/badge"

const tags = ["design", "accessibility", "motion"]

export default function BadgeAsLink() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tags.map((tag) => (
        <Badge key={tag} render={<a href={`#${tag}`} />}>
          <TagIcon />
          {tag}
        </Badge>
      ))}
    </div>
  )
}
