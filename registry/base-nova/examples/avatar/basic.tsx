import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base-nova/ui/avatar"

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">shadcn</span>
        <span className="text-xs text-muted-foreground">Maintainer</span>
      </div>
    </div>
  )
}
