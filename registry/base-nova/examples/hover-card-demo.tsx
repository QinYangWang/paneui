import { Avatar, AvatarFallback } from "@/registry/base-nova/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/registry/base-nova/ui/hover-card"

export default function HoverCardDemo() {
  return (
    <p className="text-ui text-muted-foreground">
      Reviewed by{" "}
      <HoverCard>
        <HoverCardTrigger href="#">
          @mira
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <p className="font-semibold">Mira Chen</p>
              <p className="text-muted-foreground">Design systems at Acme. Maintains the token pipeline.</p>
              <p className="text-ui-sm text-muted-foreground">Joined March 2024</p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </p>
  )
}
