import { Button } from "@paneui/ui/components/button"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@paneui/ui/components/hover-card"

export default function HoverCardSides() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side}>
          <HoverCardTrigger variant="plain" render={<Button variant="secondary" size="sm" />} delay={200}>
            {side}
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-48">
            Opens on the {side}.
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  )
}
