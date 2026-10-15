import { Avatar, AvatarFallback, AvatarImage } from "@/registry/base-nova/ui/avatar"

export default function AvatarBasic() {
  return (
    <div className="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="https://github.com/QinYangWang.png" alt="Qinyang" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="text-sm font-medium">Qinyang</span>
        <span className="text-xs text-muted-foreground">Maintainer</span>
      </div>
    </div>
  )
}
