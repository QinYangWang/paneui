import { TagIcon } from "@paneui/ui/icons"
import { Badge } from "@paneui/ui/components/badge"

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
