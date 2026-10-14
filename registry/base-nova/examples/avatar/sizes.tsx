import { Avatar, AvatarFallback } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatar } from "@/registry/base-nova/ui/generated-avatar"

const sizes = ["xs", "sm", "md", "lg", "xl"] as const

export default function AvatarSizes() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-end gap-3">
        {sizes.map((size) => (
          <Avatar key={size} size={size}>
            <AvatarFallback>QW</AvatarFallback>
          </Avatar>
        ))}
      </div>
      <div className="flex items-end gap-3">
        {sizes.map((size) => (
          <GeneratedAvatar key={size} seed="mika" size={size} shape="rounded" />
        ))}
      </div>
    </div>
  )
}
