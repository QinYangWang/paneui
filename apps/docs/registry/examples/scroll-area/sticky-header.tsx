import { ScrollArea } from "@paneui/ui/components/scroll-area"

const MEMBERS = [
  ["Mina Park", "Design"],
  ["Leo Chen", "Engineering"],
  ["Ava Ruiz", "Product"],
  ["Sam Okafor", "Engineering"],
  ["Noor Haddad", "Research"],
  ["Kai Tanaka", "Design"],
  ["Iris Novak", "Support"],
  ["Omar Said", "Engineering"],
  ["Lena Vogel", "Marketing"],
  ["Ravi Shah", "Finance"],
]

export default function ScrollAreaStickyHeader() {
  return (
    <ScrollArea scrollbarMargin={{ top: 40 }} className="h-72 w-full max-w-sm rounded-xl bg-card shadow-raised">
      <div className="sticky top-0 z-10 flex h-10 items-center border-b border-border bg-card px-4 text-sm font-medium text-foreground">
        Team · {MEMBERS.length}
      </div>
      <ul>
        {MEMBERS.map(([name, team]) => (
          <li key={name} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
            <span className="text-foreground">{name}</span>
            <span className="text-muted-foreground">{team}</span>
          </li>
        ))}
      </ul>
    </ScrollArea>
  )
}
