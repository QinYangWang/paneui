import { ScrollArea } from "@/registry/base-nova/ui/scroll-area"

const HOURS = Array.from({ length: 24 }, (_, h) => `${String(h).padStart(2, "0")}:00`)
const ROOMS = ["Atlas", "Birch", "Cedar", "Delta", "Elm", "Fjord", "Grove", "Harbor"]

export default function ScrollAreaBoth() {
  return (
    <ScrollArea orientation="both" className="h-72 w-full max-w-md rounded-xl bg-card shadow-raised">
      <div className="grid w-max grid-cols-[4rem_repeat(8,8rem)] text-sm">
        <div />
        {ROOMS.map((room) => (
          <div key={room} className="px-3 py-2 font-medium text-foreground">
            {room}
          </div>
        ))}
        {HOURS.map((hour, h) => (
          <div key={hour} className="contents">
            <div className="px-3 py-2 text-xs text-muted-foreground tabular-nums">{hour}</div>
            {ROOMS.map((room, r) => (
              <div key={room} className="px-3 py-2 text-muted-foreground">
                {(h + r) % 5 === 0 ? "Booked" : "Free"}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
