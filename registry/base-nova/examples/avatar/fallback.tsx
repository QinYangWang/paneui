import { UserIcon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base-nova/ui/avatar"
import { GeneratedAvatarImage } from "@/registry/base-nova/ui/generated-avatar"

export default function AvatarFallbackExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar size="lg">
        <AvatarImage src="/missing-photo.png" alt="Ada Lovelace" />
        <AvatarFallback delay={300}>AL</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>
          <UserIcon />
        </AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarImage src="/missing-photo.png" alt="Grace Hopper" />
        <AvatarFallback>
          <GeneratedAvatarImage seed="grace@example.com" gender="female" />
        </AvatarFallback>
      </Avatar>
    </div>
  )
}
